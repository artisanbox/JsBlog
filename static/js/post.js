var blogNew = function(form) {
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/blog/add',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            console.log('响应', response)
            var res = JSON.parse(response)
        }
    }
    ajax(request)
}

var bindClick = function() {
    var button = e('#id-button-submit')
    button.addEventListener('click', function(event) {
        log("click")
        var textShow = e('#id-input-content')
        var title = e('#id-text-title')
        var form = {
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
            blogNew(form)
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

var __main = function() {
    bindClick()
}

__main()