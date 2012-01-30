(function(B){B.effects.drop=function(A){return this.queue(function(){var L=B(this),M=["position","top","left","opacity"];
var P=B.effects.setMode(L,A.options.mode||"hide");
var Q=A.options.direction||"left";
B.effects.save(L,M);
L.show();
B.effects.createWrapper(L);
var K=(Q=="up"||Q=="down")?"top":"left";
var N=(Q=="up"||Q=="left")?"pos":"neg";
var O=A.options.distance||(K=="top"?L.outerHeight({margin:true})/2:L.outerWidth({margin:true})/2);
if(P=="show"){L.css("opacity",0).css(K,N=="pos"?-O:O)
}var R={opacity:P=="show"?1:0};
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