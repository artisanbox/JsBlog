var addNav = function() {
    var html = `
    <div class="logo-container">
            <div class="admin">
                <h2>博客前台</h2>
            </div>
    </div>
    <div class="nav-details">
        <a class="index" href="/">index</a>
        <a class="index" href="/admin">admin</a>
        <a class="index" href="#">about</a>
    </div>
    <div class="icon">
        <twitter class="icon-details"></twitter>
        <facebook class="icon-details"></facebook>
        <subscribe class="icon-details"></subscribe>
    </div>
    `
    var div = document.querySelector('.nav')
    div.innerHTML = html
}

var addFooter = function() {
    var html = `
    <div class="footer-content">
        <div class="footer-info">
            <div class="footer-text">
                <p>Onextrapixel is, and always has been an independent body. We strive to share the best web resources for designers, artists, and individuals who are passionate about web design.</p>
            </div>
        </div>
    </div>
    <div class="footer-copyright">
        <p class="copyright">Copyright © 2020 All Rights Reserved Powered by juantu.cn</p>
    </div>
    `
    var div = document.querySelector('#main-footer')
    div.innerHTML = html
}

var __main = function() {
    addNav()
    addFooter()
}
__main()