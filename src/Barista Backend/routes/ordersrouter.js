const userRoutes = (app, fs) => {
    // variables
    const dataPath = './data/orders.json';
  
    // READ
    app.get('/orders', (req, res) => {
      fs.readFile(dataPath, (err, data) => {
        if (err) {
          throw err;
        }



        
  
        res.send(JSON.parse(data));
      });
    });
  };
  
  module.exports = userRoutes;
