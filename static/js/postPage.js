var titleTemplate = function(blog) {
    var title = blog.title
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString() 
    var author = blog.author
    var t = `
    <h2>${title}</h2>
    <span class="author">
        ${author}
    </span>
    <ver-line></ver-line>
    <span class="date">
        ${time}
    </span>
    `
    return t
}

var contentTemplate = function(s) {
    var t = `
    <p class="article-line">${s}</p>
    `
    return t
}

var insertToLine = function(b) {
    var html = ''
    var content = b.content
    var lineList = content.split('\n')
    // console.log("lineList", lineList)
    for(var i = 0; i < lineList.length; i++) {
        var line = lineList[i]
        // console.log("line", line)
        var t = contentTemplate(line)
        html += t
    }
    return html
}

var insertContent = function(blogs, id) {
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        if(b !== null) {
            if(b.id === id) {
                // console.log("b", b)
                html = insertToLine(b)
            }
        }
    }
    // 把数据写入 .article-text 中, 直接用覆盖式写入
    // console.log("html", html)
    var div = document.querySelector('.article-text')
    div.innerHTML = html
}

var insertTitle = function(blogs, id) {
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        if(b !== null) {
            if(b.id === id) {
                // console.log("b", b)
                html = titleTemplate(b)
            }
        }
    }
    // console.log("html", html)
    var div = document.querySelector('.article-title')
    div.innerHTML = html
}

var blogAll = function(id) {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            // console.log('响应', response)
            var blogs = JSON.parse(response)
            insertContent(blogs, id)
            insertTitle(blogs, id)
        }
    }
    // console.log("dudududuududu")
    ajax(request)
}

var getCurId
var blogid = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/gId',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            console.log('id:', response)
            var id = JSON.parse(response)
            blogAll(parseInt(id))
            getCurId = parseInt(id)
        }
    }
    ajax(request)
}

var commentTemplate = function(comment) {
    var author = comment.author
    var content = comment.content
    var d = new Date(comment.created_time * 1000)
    var time = d.toLocaleString()
    var id = comment.id
    var website = comment.website
    // log("time", time)
    var t = 
    `
    <div class="comment-cell" id="id-comment-${id}">
        <div class="comment-author">
            <a href="${website}">${author}</a>
            <p class="comment-date">${time}</p>
        </div>
        <div class="comment-content-2">
            <p>${content}</p>
        </div>
    </div>
    `
    return t
}

var insertComment = function(comments) {
    var html = ''
    for (var i = 0; i < comments.length; i++) {
        var c = comments[i]
        if(c !== null && c.blogId === getCurId) {
            var t = commentTemplate(c)
            html += t
        }
    }
    // 把数据写入 .article-text 中, 直接用覆盖式写入
    // console.log("html", html)
    var div = document.querySelector('.comment-list')
    div.innerHTML = html
}

var commentAll = function() {
    var request = {
        method: 'GET',
        url: '/api/comment/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            // log('响应', response)
            var comments = JSON.parse(response)
            insertComment(comments)
        }
    }
    ajax(request)
}

var commentNew = function(form) {
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/comment/add',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            // console.log('响应', response)
            var res = JSON.parse(response)
        }
    }
    ajax(request)
}

var bindClick = function() {
    var button = e('.comment-button')
    button.addEventListener('click', function(event) {
        var form = {
            author: e('#id-input-name').value,
            content: e('#id-input-content').value,
            blogId: getCurId,
            website: e('#id-input-website').value,
            email: e('#id-input-email').value,
            created_time: Math.floor(new Date() / 1000),
        }
        log("form", form)
        var html = commentTemplate(form)
        var commentList = e('.comment-list')
        appendHtml(commentList, html)
        commentNew(form)
    })
}

var scrollToComment = function(cId) {
    var selector = 'id-comment-' + cId
    var comment = document.getElementById(selector);
    comment.scrollIntoView({
        block: "start",
    })
}

var commentId = function() {
    var request = {
        method: 'GET',
        url: '/api/comment/cId',
        contentType: 'application/json',
        callback: function(response) {
            // 下面要使用这样的方法来进行判断
            if(response == typeof(undefined)) {
                // console.log('错误响应', response)
            } else {
                // console.log('正常响应', response)
                var cId = JSON.parse(response)
                // console.log('cId', cId)
                scrollToComment(cId)
            }
        }
    }
    ajax(request)    
}

var __main = function() {
    // 载入博客列表
    blogid()
    bindClick()
    commentAll()
    commentId()
}

__main()
