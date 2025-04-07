const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

let outputPath = process.env.OUTPUT_PATH || 'dist';
const buildMode = process.env.WEBPACK_BUILD_MODE || 'development';
console.log('Webpack build mode: ', buildMode);
console.log('Webpack build output path: ', outputPath);
// outputPath = '/Users/luantran/Documents/Research/pnpm-cra/tiptap-extensions/dist'

const envPlugin =
  buildMode === 'development'
    ? new Dotenv({ path: '.env.local' })
    : new Dotenv({ path: '.env' });

module.exports = {
  mode: buildMode,
  entry: {
    main: './src/index.ts',
    vendor: ['react', 'lodash'],
  },
  plugins: [new MiniCssExtractPlugin()],
  watch: false,
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 * 1024, // 10Mb
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
      path.resolve(__dirname, './'),
      'node_modules',
    ],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
    },
    fallback: {
      path: require.resolve('path-browserify'),
      crypto: false,
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
  },
  externals: {
    react: 'react',
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, outputPath),
    globalObject: 'this',
  },
};
