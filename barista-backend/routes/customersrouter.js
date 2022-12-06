const userRoutes = (app, fs) => {
    // variables
    const dataPath = './data/orders.json';
    let customers = new Set();
    // READ
    app.get('/customers', (req, res) => {
      fs.readFile(dataPath, (err, data) => {
        if (err) {
          throw err;
        }

        this.customers = JSON.parse(data);
        this.customers = [...new Set(this.customers.map((user) => user.user))];
       // [...new Set(data.map((user) => user.user))];


  
        res.send(this.customers);
      });
    });
  };
  
  module.exports = userRoutes;
