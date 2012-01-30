(function(B){B.effects.blind=function(A){return this.queue(function(){var M=B(this),N=["position","top","left"];
var Q=B.effects.setMode(M,A.options.mode||"hide");
var R=A.options.direction||"vertical";
B.effects.save(M,N);
M.show();
var O=B.effects.createWrapper(M).css({overflow:"hidden"});
var L=(R=="vertical")?"height":"width";
var P=(R=="vertical")?O.height():O.width();
if(Q=="show"){O.css(L,0)
}var K={};
K[L]=Q=="show"?P:0;
O.animate(K,A.duration,A.options.easing,function(){if(Q=="hide"){M.hide()
}B.effects.restore(M,N);
B.effects.removeWrapper(M);
if(A.callback){A.callback.apply(M[0],arguments)
}M.dequeue()
})
})
}
})(jQuery);