(function(A){A.fn.bgIframe=A.fn.bgiframe=function(B){if(A.browser.msie&&parseInt(A.browser.version)<=6){B=A.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:"javascript:false;"},B||{});
var C=function(E){return E&&E.constructor==Number?E+"px":E
},D='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+B.src+'"style="display:block;position:absolute;z-index:-1;'+(B.opacity!==false?"filter:Alpha(Opacity='0');":"")+"top:"+(B.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')":C(B.top))+";left:"+(B.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')":C(B.left))+";width:"+(B.width=="auto"?"expression(this.parentNode.offsetWidth+'px')":C(B.width))+";height:"+(B.height=="auto"?"expression(this.parentNode.offsetHeight+'px')":C(B.height))+';"/>';
return this.each(function(){if(A("> iframe.bgiframe",this).length==0){this.insertBefore(document.createElement(D),this.firstChild)
}})
}return this
};
if(!A.browser.version){A.browser.version=navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1]
}})(jQuery);