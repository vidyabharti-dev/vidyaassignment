const userRoutes = (app, fs) => {
    // variables
    const dataPath = './data/prices.json';
  
    // READ
    app.get('/prices', (req, res) => {
     
      fs.readFile(dataPath,  (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
        
        
      });
    });
  };
  
  module.exports = userRoutes;
