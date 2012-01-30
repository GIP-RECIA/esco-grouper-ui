(function(B){B.fn.bgIframe=B.fn.bgiframe=function(F){if(B.browser.msie&&parseInt(B.browser.version)<=6){F=B.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:"javascript:false;"},F||{});
var E=function(C){return C&&C.constructor==Number?C+"px":C
},A='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+F.src+'"style="display:block;position:absolute;z-index:-1;'+(F.opacity!==false?"filter:Alpha(Opacity='0');":"")+"top:"+(F.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')":E(F.top))+";left:"+(F.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')":E(F.left))+";width:"+(F.width=="auto"?"expression(this.parentNode.offsetWidth+'px')":E(F.width))+";height:"+(F.height=="auto"?"expression(this.parentNode.offsetHeight+'px')":E(F.height))+';"/>';
return this.each(function(){if(B("> iframe.bgiframe",this).length==0){this.insertBefore(document.createElement(A),this.firstChild)
}})
}return this
};
if(!B.browser.version){B.browser.version=navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1]
}})(jQuery);