// 引入 express 并且创建一个 express 实例赋值给 app
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

// 配置静态文件目录
app.use(express.static('static'))

// 加载 blog.js 模块
const blog = require('./model/blog')
const comment = require('./model/comment')

var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function(err, data){
        console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

var findId = function(curId) {
    console.log(typeof blog, blog, Object.keys(blog))
    var flag = false
    var blogs = blog.all()
    // console.log("blogs", blogs)
    console.log("blogs length", blogs.length)
    for(var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        console.log("curblog", b)
        if(b != null) {
            console.log("b not null", b)
            console.log('b.id', b.id)
            if(b.id == curId) {
                flag = true
            }
        }
    }
    return flag
}

// 是用户访问主页的路径
var route = 'template/'
app.get('/', function(request, response) {
    var path = route + 'index.html'
    sendHtml(path, response)
})

app.get('/blog', function(request, response) {
    console.log('query', request.query)
    gId = String(request.query.id)
    cId = String(request.query.comment)
    // 需要把 id 存起来
    // 发送 postPage 页面后去获取这个 id
    if(JSON.stringify(request.query) === '{}') {
        var path = route + '404.html'
    } else {
        if(findId(gId)) {
            console.log("finded ")
            var path = route + 'postPage.html'
        } else {
            console.log("Unfinded ")
            var path = route + '404.html'
        }
        
    }
    sendHtml(path, response)
})

app.get('/admin', function(request, response) {
    var path = route + 'admin.html'
    sendHtml(path, response)
})

app.get('/post', function(request, response) {
    var path = route + 'post.html'
    sendHtml(path, response)
})

app.get('/remove',function(request, response) {
    var delId = request.query.id
    var commentId = request.query.comment
    // 获取到 要删除的 id 直接 删除即可
    // 在数据库中 删除
    if (delId != undefined) {
        var blogs = blog.all()
        for(var i = 0; i < blogs.length; i++) {
            var b = blogs[i]
            console.log("curBlogs", b)
            if(b != null) {
                if(b.id == delId) {
                    console.log("Blogs delete begin")
                    blogs.splice(i, 1);
                }
            }
        }
        blog.save()

        var comments = comment.all()
        for(var i = 0; i < comments.length; i++) {
            var c = comments[i]
            console.log("curComments", c)
            if(c != null) {
                if(c.blogId == delId) {
                    console.log("Comments delete begin")
                    comments.splice(i, 1);
                }
            }
        }
        comment.save()
        
        var path = route + 'admin.html'
        sendHtml(path, response)
    } else if (commentId != undefined){
        console.log("commentId", commentId)
        var comments = comment.all()
        for(var i = 0; i < comments.length; i++) {
            var c = comments[i]
            console.log("curComments", c)
            if(c != null) {
                if(c.blogId == commentId) {
                    console.log("Comments delete begin")
                    comments.splice(i, 1);
                }
            }
        }
        comment.save()
        
        var path = route + 'comment.html'
        sendHtml(path, response)
    } else {
        var path = route + '404.html'
        sendHtml(path, response)
    }
})

app.get('/change',function(request, response) {
    changeId = request.query.id
    var path = route + 'modify.html'
    sendHtml(path, response)
})

app.get('/comment',function(request, response) {
    changeId = request.query.id
    var path = route + 'comment.html'
    sendHtml(path, response)
})

// ***
// api 系列路径都是用来和前端 ajax 交互数据的
var gId = '-1'
var cId = '-1'
app.get('/api/blog/gId',function(request, response) {
    if(gId != '-1') {
        response.send(gId)
    }
})

app.get('/api/comment/cId',function(request, response) {
    if(cId != '-1') {
        response.send(cId)
    }
})

var changeId = '-1'
app.get('/api/blog/changeId',function(request, response) {
    if(changeId != '-1') {
        console.log("changeId", changeId)
        response.send(changeId)
    } 
})

app.get('/api/blog/all', function(request, response) {
    // 加载数据并返回
    console.log(typeof blog, blog, Object.keys(blog))
    var blogs = blog.all()
    var r = JSON.stringify(blogs)
    response.send(r)
})

app.post('/api/blog/add', function(request, response) {
    // 浏览器发过来的数据我们一般称之为 form (表单)
    var form = request.body
    // 插入新数据并返回
    var b = blog.new(form)
    var r = JSON.stringify(b)
    response.send(r)
})
  
app.post('/api/blog/update', function(request, response) {
    // 浏览器发过来的数据我们一般称之为 form (表单)
    var form = request.body
    // 插入新数据并返回
    var blogs = blog.all()
    for(var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        if(b !== null) {
            if(b.id == form.id) {
                b.title = form.title
                b.content = form.content
                blog.save()
            }
        }
    }
})

app.get('/api/comment/all', function(request, response) {
    // 加载数据并返回
    console.log(typeof blog, blog, Object.keys(blog))
    var c = comment.all()
    var r = JSON.stringify(c)
    response.send(r)
})

app.post('/api/comment/add', function(request, response) {
    // 浏览器发过来的数据我们一般称之为 form (表单)
    var form = request.body
    // 插入新数据并返回
    var b = comment.new(form)
    var r = JSON.stringify(b)
    response.send(r)
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

  console.log(`博客访问地址为 http://${host}:${port}`)
})