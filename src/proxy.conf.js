const PROXY_CONFIG = [
    {
        context: ['/loginformsbackend'],
        target: 'http://localhost:8080/',
        secure: false,
        logLevel: 'debug',
        pathRewrite: {'^/loginformsbackend': ''},
        changeOrigin: true
    }
];

module.exports = PROXY_CONFIG;
