var fs = require('fs')
var blogFilePath = 'db/blog.json'

// 这是一个用来存储 Blog 数据的对象
const ModelBlog = function(form) {
    this.title = form.title || ''
    this.author = form.author || ''
    this.content = form.content || ''
    // 生成一个 unix 时间
    this.created_time = Math.floor(new Date() / 1000)
}

const loadBlogs = function(callback) {
    var content = fs.readFileSync(blogFilePath, 'utf8')
    var blogs = JSON.parse(content)
    return blogs
}

/*
b 这个对象是我们要导出给别的代码用的对象
它有一个 data 属性用来存储所有的 blogs 对象
它有 all 方法返回一个包含所有 blog 的数组
它有 new 方法来在数据中插入一个新的 blog 并且返回
他有 save 方法来保存更改到文件中
*/
var b = {
    data: loadBlogs()
}

b.all = function() {
    return this.data
}

b.new = function(form) {
    var m = new ModelBlog(form)
    // console.log('new blog', form, m)
    // 设置新数据的 id
    var d = this.data[this.data.length-1]
    if (this.data.length == 0) {
        m.id = 1
    } else if (d == null) {
        m.id = this.data.length + 1
    } else {
        m.id = d.id + 1
    }
    // 把 数据 加入 this.data 数组
    this.data.push(m)
    // 把 最新数据 保存到文件中
    this.save()
    // 返回新建的数据
    return m
}

b.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(blogFilePath, s, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('blog 保存成功')
        }
    })
}

// 导出一个对象的时候用 module.exports = 对象 的方式
module.exports = b
