(function(B){B.effects.clip=function(A){return this.queue(function(){var N=B(this),S=["position","top","left","height","width"];
var T=B.effects.setMode(N,A.options.mode||"hide");
var R=A.options.direction||"vertical";
B.effects.save(N,S);
N.show();
var Q=B.effects.createWrapper(N).css({overflow:"hidden"});
var O=N[0].tagName=="IMG"?Q:N;
var M={size:(R=="vertical")?"height":"width",position:(R=="vertical")?"top":"left"};
var P=(R=="vertical")?O.height():O.width();
if(T=="show"){O.css(M.size,0);
O.css(M.position,P/2)
}var L={};
L[M.size]=T=="show"?P:0;
L[M.position]=T=="show"?0:P/2;
O.animate(L,{queue:false,duration:A.duration,easing:A.options.easing,complete:function(){if(T=="hide"){N.hide()
}B.effects.restore(N,S);
B.effects.removeWrapper(N);
if(A.callback){A.callback.apply(N[0],arguments)
}N.dequeue()
}})
})
}
})(jQuery);