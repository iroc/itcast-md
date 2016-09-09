var fs = require('fs')
var marked = require('marked')
var path = require('path')

// 第三方包，opener 可以自动打开指定文件
var opener = require('opener')

// 加上第二个参数：编码格式 utf8 ，会自动帮你 toString()，就不用自己手动调用 toString() 了
var templateStr = fs.readFileSync(path.join(__dirname, 'template.itcast'), 'utf8')

module.exports = function (filePath) {
  // 读取 markdown 文件内容
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      throw err
    }

    // 生成 html 格式字符串
    data = marked(data)
    data = templateStr.replace('^_^', data)
    var distPath = './' + path.parse(filePath).name + '.html'

    // 写入到当前目录下的 html 文件
    fs.writeFile(distPath, data, function (err) {
      if (err) {
        throw err
      }
      
      console.log('编译markdown文件成功')

      // 直接调用，指定路径，自动打开
      opener(distPath)
    })
  }) 
}
