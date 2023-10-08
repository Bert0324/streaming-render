import type { Configuration } from 'webpack';
import 'webpack-dev-server';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin  from "css-minimizer-webpack-plugin";

export default {
  mode: 'development',
  entry: {
		client: './src/client/main.tsx',
	},
  devtool: 'inline-source-map',
  output: {
    filename: `[name].[contenthash].js`,
    path: resolve(__dirname, '../dist/client'),
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: `${resolve(__dirname, '../public')}/index.html`,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contentHash:8].css'
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
	},
	devServer: {
		static: {
			directory: resolve(__dirname, '../dist/client')
		},
		compress: true,
		port: 8081,
		open: true,
		client: false,
		proxy: {}
	}
} satisfies Configuration;