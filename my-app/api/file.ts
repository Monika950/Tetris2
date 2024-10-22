export const openFile = (fileName) => {
    fetch('http://localhost:3000/file/open', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fileName })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(err => {
      console.error('Error:', err);
    });
  };

export const writeToFile = (fileContent) => {
    fetch('http://localhost:3000/file/write', {
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
    fetch('http://localhost:3000/file/close', {
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
