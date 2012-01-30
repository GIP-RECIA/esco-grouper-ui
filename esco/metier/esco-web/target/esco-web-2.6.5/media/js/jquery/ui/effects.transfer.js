(function(A){A.effects.transfer=function(B){return this.queue(function(){var H=A(this),D=A(B.options.to),G=D.offset(),C={top:G.top,left:G.left,height:D.innerHeight(),width:D.innerWidth()},F=H.offset(),E=A('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(B.options.className).css({top:F.top,left:F.left,height:H.innerHeight(),width:H.innerWidth(),position:"absolute"}).animate(C,B.duration,B.options.easing,function(){E.remove();
(B.callback&&B.callback.apply(H[0],arguments));
H.dequeue()
})
})
}
})(jQuery);