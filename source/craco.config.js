const path = require('path');
// 配合按需加载antd 和 修改主题使用
const CracoLessPlugin = require('craco-less');
// 显示打包进度条用的
const WebpackBar = require('webpackbar');
// 打包完成后移动文件
const FileManagerPlugin = require('filemanager-webpack-plugin');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = ({ env }) => {
    return {
        webpack: {
            plugins: [
                new WebpackBar(),
                new FileManagerPlugin({
                    events: {
                        onEnd: {
                            copy: [
                                {
                                    source: './build/**',
                                    destination: '../'
                                }
                            ]
                        }
                    }
                })
            ],
            alias: {
                '@': resolve('src')
            },
            // configure 这里可以拿到 create-react-app 的所有 webpack配置，某些在外面修改不了的配置，可以在这配置
            configure: (webpackConfig, { env, paths }) => {
                // webpackConfig.devtool =
                //     env !== 'production' ? 'eval-source-map' : '';

                // console.log(`🚀 ~ webpackConfig`, webpackConfig);
                return webpackConfig;
            }
        },
        // 下面是 antd 的按需加载用的，不用每次导入css文件
        babel: {
            plugins: [
                [
                    'import',
                    {
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        style: true
                    }
                ]
            ]
        },
        plugins: [
            {
                plugin: CracoLessPlugin,
                options: {
                    lessLoaderOptions: {
                        lessOptions: {
                            modifyVars: {
                                '@primary-color': '#1890ff'
                            }, //主题颜色
                            javascriptEnabled: true
                        }
                    }
                }
            }
        ]
    };
};
