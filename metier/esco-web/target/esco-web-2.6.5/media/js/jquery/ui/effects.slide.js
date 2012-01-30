(function(B){B.effects.slide=function(A){return this.queue(function(){var L=B(this),M=["position","top","left"];
var P=B.effects.setMode(L,A.options.mode||"show");
var Q=A.options.direction||"left";
B.effects.save(L,M);
L.show();
B.effects.createWrapper(L).css({overflow:"hidden"});
var K=(Q=="up"||Q=="down")?"top":"left";
var N=(Q=="up"||Q=="left")?"pos":"neg";
var O=A.options.distance||(K=="top"?L.outerHeight({margin:true}):L.outerWidth({margin:true}));
if(P=="show"){L.css(K,N=="pos"?-O:O)
}var R={};
R[K]=(P=="show"?(N=="pos"?"+=":"-="):(N=="pos"?"-=":"+="))+O;
L.animate(R,{queue:false,duration:A.duration,easing:A.options.easing,complete:function(){if(P=="hide"){L.hide()
}B.effects.restore(L,M);
B.effects.removeWrapper(L);
if(A.callback){A.callback.apply(this,arguments)
}L.dequeue()
}})
})
}
})(jQuery);