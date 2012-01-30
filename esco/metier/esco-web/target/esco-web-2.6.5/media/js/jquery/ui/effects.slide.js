(function(A){A.effects.slide=function(B){return this.queue(function(){var I=A(this),H=["position","top","left"];
var E=A.effects.setMode(I,B.options.mode||"show");
var D=B.options.direction||"left";
A.effects.save(I,H);
I.show();
A.effects.createWrapper(I).css({overflow:"hidden"});
var J=(D=="up"||D=="down")?"top":"left";
var G=(D=="up"||D=="left")?"pos":"neg";
var F=B.options.distance||(J=="top"?I.outerHeight({margin:true}):I.outerWidth({margin:true}));
if(E=="show"){I.css(J,G=="pos"?-F:F)
}var C={};
C[J]=(E=="show"?(G=="pos"?"+=":"-="):(G=="pos"?"-=":"+="))+F;
I.animate(C,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){if(E=="hide"){I.hide()
}A.effects.restore(I,H);
A.effects.removeWrapper(I);
if(B.callback){B.callback.apply(this,arguments)
}I.dequeue()
}})
})
}
})(jQuery);