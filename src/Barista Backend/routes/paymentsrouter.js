const userRoutes = (app, fs) => {
    // variables
    const dataPath = './data/payments.json';
  
    // READ
    app.get('/payments', (req, res) => {
      fs.readFile(dataPath, (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
      });
    });
  };
  
  module.exports = userRoutes;
