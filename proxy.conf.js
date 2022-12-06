const PROXY_CONFIG = [
    {
        context: [
            "/orders",
            "/prices",
            "/payments",
            "/customers",      
            "/menu",         
            "/proxy"
        ],
        target: "http://localhost:3000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;