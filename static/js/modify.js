var blogModify = function(form) {
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/blog/update',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            console.log('响应', response)
            var res = JSON.parse(response)
        }
    }
    ajax(request)
}

var bindClick = function(id) {
    var button = e('#id-button-submit')
    button.addEventListener('click', function(event) {
        log("click")
        var textShow = e('#id-input-content')
        var title = e('#id-text-title')
        var form = {
            id: id,
            title: e('#id-text-title').value,
            author: 'gen',
            content: e('#id-input-content').value,
        }
        if(form.content === '') {
            log("error1")
            textShow.value = '请至少输入一个字'
            textShow.classList.add('warning')
            setTimeout(function() {
                var textShow = e('#id-input-content')
                textShow.classList.remove('warning')
                textShow.value = ''
            }, 1000)
        }
        if(form.title === '') {
            log("error2")
            title.value = '请至少输入一个字'
            title.classList.add('warning')
            setTimeout(function() {
                var title = e('#id-text-title')
                title.classList.remove('warning')
                title.value = ''
            }, 1000)
        } 
        if(form.content !== '' && form.title !== ''){
            log('form', form)
            // 提交成功之后，需要跳转然后返回 list 页面
            // 这里虽然没有学习 窗口的知识，但是暂时可以使用 css 来替代
            blogModify(form)
            title.value = '发布成功'
            title.classList.add('post-success')
            textShow.classList.add('post-success')
            setTimeout(function() {
                var title = e('#id-text-title')
                var textShow = e('#id-input-content')
                title.classList.remove('post-success')
                textShow.classList.remove('post-success')
                title.value = ''
                textShow.value = '' 
            }, 1000)
        }
    })
}

var modifyPage = function(b) {
    var title = b.title
    var content = b.content
    var titleArea = e('#id-text-title')
    var contentArea = e('#id-input-content')
    log("title", title)
    log("content", content)
    titleArea.value = title
    contentArea.value = content
    bindClick(b.id) 
}

var blogContent = function(blogs, id) {
    console.log("blogContent", id)
    for(var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        if(b !== null) {
            if(b.id === id) {
                console.log("modifyPage", b)
                modifyPage(b)
            }
        }
    }
}

var blogid = function(blogs) {
    var request = {
        method: 'GET',
        url: '/api/blog/changeId',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            console.log('blogid callback\n', response)
            var id = JSON.parse(response)
            blogContent(blogs, id)
        }
    }
    console.log("blogid")
    ajax(request)
}

var blogAll = function(id) {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            console.log('blogAll callback\n', response)
            console.log('响应\n', response)
            var blogs = JSON.parse(response)
            blogid(blogs)
        }
    }
    console.log("blogAll")
    ajax(request)
}

var __main = function() {
    blogAll()
}

__main()