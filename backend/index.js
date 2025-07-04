const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors()); 
app.use(express.json());

const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gameLogs';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const { Schema, model } = mongoose;

const GameActionSchema = new Schema({
  socketId: String,
  event: String,
  timestamp: { type: Date, default: Date.now },
  sessionId: String
});

const GameAction = model('GameAction', GameActionSchema);

const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5174","http://localhost:5173","http://my-app:5173"],
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('error', (error) => {
    console.error('Socket encountered error:', error);
  });

  socket.on('gameStart', () => {
    console.log("Game started by client:", socket.id);
    socket.emit('gameStartAck', { message: "Game started on server" });
  });

  socket.on('gameAction', (actionData) => {
    // if (fileDescriptor) {
    //   const actionLine = `${actionData.event}\n`;
    //   fs.write(fileDescriptor, actionLine, (err) => {
    //     if (err) {
    //       console.error("Error writing action to file:", err);
    //     } else {
    //       console.log("Action recorded:", actionLine.trim());
    //     }
    //   });
    // } else {
    //   console.warn("No file is open; action not recorded.");
    // }
      const action = new GameAction({
    socketId: socket.id,
    event: actionData.event,
    sessionId: actionData.sessionId || 'default-session'  // if using session IDs
  });

  action.save().then(() => {
    console.log('Action saved to MongoDB:', action.event);
  }).catch(err => {
    console.error('Failed to save action:', err);
  });

  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


let fileDescriptor = null; 

app.post('/file/open', (req, res) => {
  const date = new Date();
  const fileName = `${date.getTime().toString()}.txt`; 
  
  try {
    fileDescriptor = fs.openSync(fileName, 'w'); 
    console.log(`File ${fileName} opened successfully with file descriptor: ${fileDescriptor}`);
    res.status(200).json({ message: 'File opened successfully', fileName });
  } catch (err) {
    console.error('Error opening the file:', err);
    res.status(500).json({ message: 'Failed to open the file', error: err.message });
  }
  })

// app.post('/file/write', (req, res) => {
//     const { content } = req.body;
    
//     if (!fileDescriptor) {
//       return res.status(400).json({ message: 'File not opened yet. Please open the file first.' });
//     }
  
//     fs.write(fileDescriptor, content, (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Failed to write to the file', error: err });
//       }
//       res.status(200).json({ message: 'Content written to the file successfully bla' });
//     });
//   });

  app.post('/file/close', (req, res) => {
    try {
      if (fileDescriptor) {
        fs.closeSync(fileDescriptor); 
        console.log('File closed successfully.');
        res.status(200).json({ message: 'File closed successfully' });
      } else {
        res.status(400).json({ message: 'No file is currently open' });
      }
    } catch (err) {
      console.error('Error closing the file:', err);
      res.status(500).json({ message: 'Failed to close the file', error: err.message });
    }
  });

  // app.get('/file/read', (req, res) => {
  //   const fileName = req.query.fileName;
  
  //   if (!fileName) {
  //     return res.status(400).json({ message: 'No file name provided' });
  //   }
  
  //   const filePath = path.join(__dirname, fileName);
  
  //   fs.access(filePath, fs.constants.F_OK, (err) => {
  //     if (err) {
  //       return res.status(404).json({ message: 'File not found' });
  //     }
  
  //     fs.readFile(filePath, 'utf8', (err, data) => {
  //       if (err) {
  //         return res.status(500).json({ message: 'Error reading file', error: err.message });
  //       }
  //       console.log('File Content:', data)
  //       res.status(200).json({ content: data });
  //     });
  //   });
  // });

  app.get('/file/read', async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ message: 'No session ID provided' });
  }

  try {
    const actions = await GameAction.find({ sessionId }).sort({ timestamp: 1 });
    res.status(200).json({ actions });
  } catch (err) {
    console.error('Error reading from DB:', err);
    res.status(500).json({ message: 'Failed to fetch actions', error: err.message });
  }
});


  // app.get('/files', (req, res) => {
  //   //const directoryPath = path.join(__dirname, 'your-folder');
  //   const directoryPath = __dirname;  
  
  //   fs.readdir(directoryPath, (err, files) => {
  //     if (err) {
  //       console.error('Error reading directory:', err);
  //       return res.status(500).json({ message: 'Failed to read directory', error: err.message });
  //     }
  
  //     const txtFiles = files.filter(file => path.extname(file) === '.txt');
  
  //     res.json({ files: txtFiles });
  //   });
  // });
  app.get('/files', async (req, res) => {
  try {
    const sessions = await GameAction.distinct('sessionId');
    res.status(200).json({ sessions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get sessions', error: err.message });
  }
});


server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// конуру
// vitest
//react testing library
// greshka ako ne e svurzan kum survura
