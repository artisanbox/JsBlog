var blogTemplate = function(blog) {
    var id = blog.id
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
    <div class="admin-article-details">
        <div class="admin-article-title">
            <a href="/blog?id=${id}"><h2>[文章]${title}</h2></a>
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
                <a class="article-modified-action" href="/remove?id=${id}">删除</a>
            </span>
            <ver-line></ver-line>
            <span class="admin-article-modify">
                <a class="article-modified-action" href="/change?id=${id}">修改</a>
            </span>
        </div>
    </div>
    `
    
    return t
}

var insertBlogAll = function(blogs) {
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        if(b !== null) {
            var t = blogTemplate(b)
            html += t
        }
    }
    // 把数据写入 .gua-blogs 中, 直接用覆盖式写入
    var div = document.querySelector('.admin-article-list')
    div.innerHTML = html
}

var getAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            console.log('响应', response)
            var blogs = JSON.parse(response)
            insertBlogAll(blogs)
        }
    }
    console.log("dudududuududu")
    ajax(request)
}

var __main = function() {
    getAll()
}

__main()
    