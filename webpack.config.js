const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    watch: isDevelopment,
    devtool: isDevelopment && 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=__[name]__[local]___[hash:base64:5]',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
    ]
};
