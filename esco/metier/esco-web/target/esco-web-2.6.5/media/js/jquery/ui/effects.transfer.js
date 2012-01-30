(function(B){B.effects.transfer=function(A){return this.queue(function(){var I=B(this),M=B(A.options.to),J=M.offset(),N={top:J.top,left:J.left,height:M.innerHeight(),width:M.innerWidth()},K=I.offset(),L=B('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(A.options.className).css({top:K.top,left:K.left,height:I.innerHeight(),width:I.innerWidth(),position:"absolute"}).animate(N,A.duration,A.options.easing,function(){L.remove();
(A.callback&&A.callback.apply(I[0],arguments));
I.dequeue()
})
})
}
})(jQuery);