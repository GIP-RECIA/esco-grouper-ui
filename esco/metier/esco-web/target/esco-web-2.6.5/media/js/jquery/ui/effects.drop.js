(function(A){A.effects.drop=function(B){return this.queue(function(){var I=A(this),H=["position","top","left","opacity"];
var E=A.effects.setMode(I,B.options.mode||"hide");
var D=B.options.direction||"left";
A.effects.save(I,H);
I.show();
A.effects.createWrapper(I);
var J=(D=="up"||D=="down")?"top":"left";
var G=(D=="up"||D=="left")?"pos":"neg";
var F=B.options.distance||(J=="top"?I.outerHeight({margin:true})/2:I.outerWidth({margin:true})/2);
if(E=="show"){I.css("opacity",0).css(J,G=="pos"?-F:F)
}var C={opacity:E=="show"?1:0};
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