var path = require('path');

module.exports = {
    mode: 'production',
    entry: './Components/myt-react-confirm/',
    externals : {
        react: 'react',
        'myt-react-snippets': 'myt-react-snippets'
    },
    output: {
        path: path.resolve('lib'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css?$/, 
                exclude: /(node_modules)/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}