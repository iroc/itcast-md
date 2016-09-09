#!/usr/bin/env node

// 上面的命令的意思：找到 node 的执行环境，然后使用 node 执行当前脚本程序
// 加入上面这条命令，意思就是，在终端中执行 npm link 的时候，npm 会自动找到 node可执行文件的路径
// 如果不加上上面的命令，否则生成的 .cmd 文件就有问题，无法使用

// 当你配置为全局命令行工具的时候，在输入 itcast 命令的时候，
// 实际上就是通过 node 在执行你指定的脚本文件
// itcast 等价于 node itcast.js

var fs = require('fs')
var packageJson = require('../package.json')
var build = require('../lib/build')
var preview = require('../lib/preview')

var args = process.argv.slice(2)

var command = args[0]

switch (command) {
  case 'build':
    // 生成指定markdown文件到html文件
    build(args[1])
    break;
  case 'preview':
    // 预览markdown文件，实际刷新
    preview(args[1])
    break;
  case 'help':
    console.log('itcast build markdown文件名 -- 根据指定的markdown文件生成html文件')
    console.log('itcast preview markdown文件名 -- 根据指定的markdown文件实时预览html文件')
    break;
  case '--version':
    console.log(packageJson.version)
    break;
  default:

    break;
}
