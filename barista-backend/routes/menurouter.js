const userRoutes = (app, fs) => {
    // variables
    const dataPath = './data/prices.json';
    class Option {
        variant;
        price;
    }
    // READ
    app.get('/menu', (req, res) => {

        fs.readFile(dataPath, (err, data) => {
            if (err) {
                throw err;
            }
            this.productList = JSON.parse(data)
            for (let product of this.productList) {

                let options = [];
                product.options = [];
                for (let variant in product.prices) {
                    let option = new Option();
                    option.variant = variant;
                    option.price = product.prices[variant];
                    options.push(option);
                }
                product["options"] = options;

            }

            res.send(this.productList);


        });
    });
};

module.exports = userRoutes;
