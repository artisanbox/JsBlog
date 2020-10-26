var blogTemplate = function(blog) {
    var id = blog.id
    var content = blog.content.slice(0, 20)
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
    <div class="blog-container">
        <div class="blog-post">
            <h3 class="post-title">
                <a class="p-title" href="/blog?id=${id}">${title}</a>
            </h3>
            <div class="post-excerpt">
                <p>${content}</p>
            </div>
            <div class="post-meta">
                <span class="author">
                    ${author}
                </span>
                <ver-line></ver-line>
                <span class="date">
                    ${time}
                </span>
            </div>
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
    var div = document.querySelector('.wrap')
    div.innerHTML = html
}

var blogAll = function() {
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
    ajax(request)
}

var __main = function() {
    // 载入博客列表
    blogAll()
}

__main()