# 终端 markdown 文件转换预览器

> 床前明月光，疑是地上霜，hello，world
> 教室局域网npm镜像地址：http://192.168.44.36:7001

## 1. 将 markdown 格式字符串转换为 html 格式字符串

使用社区提供的一个包：[marked](https://www.npmjs.com/package/marked)

1. 本地项目安装：`npm install --save marked`
2. 基本用法如下：

```js
var marked = require('marked')
var htmlStr = marked('# hello world')
console.log(htmlStr) // => <h1>hello world</h1>
```

## 2. 实现文件变化浏览器自刷新

使用第三方包 [Browsersync](https://www.browsersync.io/) 可以帮助我们事先浏览器自动刷新。

- 本地项目安装（以管理员权限启动cmd）：`npm install --save browser-sync`

基本使用：

```js
// 1. 加载包，直接调用 create()
var bs = require("browser-sync").create()

// 2. 初始化一个服务器
bs.init({
  server: './'
})

// 3. 刷新变化的 html 文件
bs.reload('*.html')
```
## 3. 命令行程序

需求：想要在终端中的任何目录执行自定义命令，作为一个工具来使用

### 3.1 手动配置

1. 找到全局包安装路径：`npm root -g`
2. 将项目复制到全局包安装路径下
3. 来到你的全举包安装路径的上一级路径 npm
4. 随便找到一个 .cmd 后缀的文件，复制一份
5. 将复制的 .cmd 文件，改个名字，该名字就是你想要在终端中使用的命令名称
6. 编辑 .cmd 文件，修改里面的路径，指向你刚才复制的全局包项目路径

```
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\你的全局包路径下的js文件路径" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\你的全局包路径下的js文件路径" %*
)
```

接下来就可以在终端中直接使用该命令了。


### 3.2 使用命令自动配置

- 在 package.json 文件中加入 bin 字段，如下：

```
"bin": {
  "itcast": "./bin/itcast.js"
}
```

bin 字段是一个对象，里面是键值对的形式，键表示要使用的命令名称，值表示要执行的文件路径。

注意：在所要执行的脚本代码中，第一行的位置加入如下内容（只需要入口文件有该语句即可）

```js
#!/usr/bin/env node
```

- 在项目根目录下执行：`npm link`

执行完 `npm link` 之后，npm 会自动在全局报包安装路径下添加一个对你当前项目的快捷方式映射。
同时会自动在全局包安装路径的上一级目录npm下生成一个 `命令名.cmd` 文件。

因为 *.cmd 文件所属目录已经被配置到环境变量中了。

所以，当你在执行 itcast 的时候，实际上，根据环境变量找到了 itcast.cmd 这个可执行文件。

然后，itcast.cmd 文件中是 DOS 脚本命令（windows上专有的脚本命令）。
它内部，自动帮你去使用 node 执行 你所指定的脚本路径。

## 4. 发布到 npm

- 先在 npm 上注册一个账号（注意：必须将你的镜像源切换到 npm 官方镜像源）
  + 可以在 npmjs.com 网站注册
  + 也可以在终端执行 `npm adduser` 命令注册

- npm publish
