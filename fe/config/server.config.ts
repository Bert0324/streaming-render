import type { Configuration } from 'webpack';
import 'webpack-dev-server';
import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin  from "css-minimizer-webpack-plugin";

export default {
  mode: 'development',
  entry: {
		server: './src/server/main.tsx'
	},
  devtool: 'inline-source-map',
  output: {
    filename: `[name].[contenthash:8].js`,
    path: resolve(__dirname, '../dist/server'),
  },
	module: {
		rules: [
			{
				test: /\.(tsx|ts|js)?$/,
				loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript",
            "@babel/preset-react"
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread",
            ["import", {
              "libraryName": "lodash",
              "libraryDirectory": "",
              "camel2DashComponentName": false
            }]
          ]
        },
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
					use: {
							loader: 'url-loader',
							options: {
									limit: 5 * 1024,
									outputPath: 'images/'
							}
					}
			},
			{
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'isomorphic-style-loader', "css-loader", "less-loader"],
      },
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css'
	})
	],
	optimization: {
			minimizer: [
					new TerserWebpackPlugin({}),
					new CssMinimizerPlugin(),
			],
			splitChunks: {
					// whether for async imported files
					chunks: 'all',
					cacheGroups: {
							// third party codes
							vendor: {
									name: 'vendor',
									// larger number means higher priority
									priority: 1,
									test: /node_modules/,
									minSize: 0,
									minChunks: 1
							},
							// common codes
							common: {
									name: 'common',
									priority: 0,
									minSize: 0,
									// at least used 2 times
									minChunks: 2
							}
					}
			}
	}
} satisfies Configuration;