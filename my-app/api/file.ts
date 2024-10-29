export const openFile = () => {
    return fetch('http://localhost:3000/file/open', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(err => {
      console.error('Error:', err);
    });
  };

export const writeFile = (fileContent: string) => {
    return fetch('http://localhost:3000/file/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: fileContent })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(err => {
      console.error('Error:', err);
    });
  };

export const closeFile = () => {
    return fetch('http://localhost:3000/file/close', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(err => {
      console.error('Error:', err);
    });
  };

export const getGames = () => {
  return fetch('http://localhost:3000/files', {
    method: 'GET',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    return response.json();
  })
  .then(data => {
    console.log('Games:', data.files);
    return data.files; 
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

export const readFile = (file:string) => {
  return fetch(`http://localhost:3000/file/read?fileName=${file}`, {
    method: 'GET',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to read file: ' + file);
    }
    return response.json();
  })
  .then(data => {
    console.log('File content successfully retrieved:', data.content);
    return data.content;
  })
  .catch(error => {
    console.error('Error reading file:', error); 
  });
};
