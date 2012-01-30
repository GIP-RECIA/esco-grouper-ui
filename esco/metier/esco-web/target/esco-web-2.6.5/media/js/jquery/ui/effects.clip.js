(function(A){A.effects.clip=function(B){return this.queue(function(){var K=A(this),F=["position","top","left","height","width"];
var E=A.effects.setMode(K,B.options.mode||"hide");
var G=B.options.direction||"vertical";
A.effects.save(K,F);
K.show();
var H=A.effects.createWrapper(K).css({overflow:"hidden"});
var J=K[0].tagName=="IMG"?H:K;
var C={size:(G=="vertical")?"height":"width",position:(G=="vertical")?"top":"left"};
var I=(G=="vertical")?J.height():J.width();
if(E=="show"){J.css(C.size,0);
J.css(C.position,I/2)
}var D={};
D[C.size]=E=="show"?I:0;
D[C.position]=E=="show"?0:I/2;
J.animate(D,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){if(E=="hide"){K.hide()
}A.effects.restore(K,F);
A.effects.removeWrapper(K);
if(B.callback){B.callback.apply(K[0],arguments)
}K.dequeue()
}})
})
}
})(jQuery);