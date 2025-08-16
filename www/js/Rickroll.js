window.bod=document.body
bod.innerHTML=null
window.url='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0'
window.cre=function(){return document.createElement('iframe')}
window.set=function(fra){fra.src=url; return fra}
window.add=function(fra){bod.appendChild(fra)}
window.cou=0,window.max=20,window.int=1000
window.cle=function(){clearInterval(fun)}
window.ana=function(){add(set(cre()));cou++==max-1?cle():void(0)}
setInterval(window.ana,int)