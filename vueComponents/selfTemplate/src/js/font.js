function setFontHtml(){
    const clientWidth = document.body.clientWidth > 750 ? 375 : document.body.clientWidth;
    const standardWidth = 375
    const res = (clientWidth / standardWidth) * 10
    document.getElementsByTagName('html')[0].setAttribute('style','font-size:' + res.toFixed(2) + 'px')
}
setFontHtml();
window.onresize = function(){
    setFontHtml();
}