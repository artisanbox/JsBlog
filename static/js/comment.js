var blogFromId = function(id) {
    for(var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        if(blog != null && blog.id == id) {
            return blog
        }
    }
}

var commentTemplate = function(comment) {
    var blogId = comment.blogId
    var blog = blogFromId(blogId)
    var blogTitle = blog.title
    log("blogFromId", blog)
    var id = comment.id
    var content = comment.content
    var author = comment.author
    var d = new Date(comment.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
    <div class="admin-article-details">
        <div class="admin-article-title">
            <a href="/blog?id=${blogId}&&comment=${id}"><h2>[评论]${content}</h2></a>
        </div>
        <div class="admin-article-title">
            <a id="id-comment-blog" href="/blog?id=${blogId}"><h2>[来源]${blogTitle}</h2></a>
        </div>
        <div class="post-meta">
            <span class="author">
                ${author}
            </span>
            <ver-line></ver-line>
            <span class="date">
                ${time}
            </span>
            <ver-line></ver-line>
            <span class="admin-article-modify">
                <a class="article-modified-action" href="/remove?comment=${id}">删除</a>
            </span>
            <ver-line></ver-line>
            <span class="admin-article-modify">
                <a class="article-modified-action" href="#">修改</a>
            </span>
        </div>
    </div>
    `
    return t
}

var insertCommentAll = function(comments) {
    var html = ''
    for (var i = 0; i < comments.length; i++) {
        var b = comments[i]
        if(b !== null) {
            var t = commentTemplate(b)
            html += t
        }
    }
    // 把数据写入 .gua-blogs 中, 直接用覆盖式写入
    var div = document.querySelector('.admin-article-list')
    div.innerHTML = html
}

var commentAll = function() {
    var request = {
        method: 'GET',
        url: '/api/comment/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            console.log('响应', response)
            var comments = JSON.parse(response)
            insertCommentAll(comments)
        }
    }
    ajax(request)
}

var blogs 
var blogAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            console.log('响应', response)
            blogs = JSON.parse(response)
        }
    }
    console.log("dudududuududu")
    ajax(request)
}

var __main = function() {
    // 载入博客列表
    blogAll()
    commentAll()
}

__main()