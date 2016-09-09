var fs = require('fs')
var path = require('path')

var marked = require('marked')

// 1. 加载包，直接调用 create()
var bs = require("browser-sync").create()

// 2. 初始化一个服务器
bs.init({
  server: './'
})

// 监视文件的变化
// 当文件发生变化，将md格式的字符串转换为html字符串
// 然后将 html 格式字符串写入到一个新的文件中
var filePath = path.join(__dirname, '../README.md')
var distPath = path.join(__dirname, '../README.html')

var templateStr = fs.readFileSync(path.join(__dirname, 'template.itcast'), 'utf8')

fs.watchFile(filePath, {
  persistent: true,
  interval: 500
}, function(curr, prev) {
  
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      throw err
    }

    // 将 markdown 格式字符串转换为 html 格式字符串
    data = marked(data)

    var htmlStr = templateStr.replace('^_^', data)

    fs.writeFile(distPath, htmlStr, function (err) {
      if (err) {
        return console.log('写入文件失败')
      }
      console.log('markdown文件转换html文件成功')

      // 3. 刷新变化的 html 文件
      bs.reload('*.html')
    })
  })
})
