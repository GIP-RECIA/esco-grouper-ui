(function(A){A.effects.blind=function(B){return this.queue(function(){var H=A(this),G=["position","top","left"];
var D=A.effects.setMode(H,B.options.mode||"hide");
var C=B.options.direction||"vertical";
A.effects.save(H,G);
H.show();
var F=A.effects.createWrapper(H).css({overflow:"hidden"});
var I=(C=="vertical")?"height":"width";
var E=(C=="vertical")?F.height():F.width();
if(D=="show"){F.css(I,0)
}var J={};
J[I]=D=="show"?E:0;
F.animate(J,B.duration,B.options.easing,function(){if(D=="hide"){H.hide()
}A.effects.restore(H,G);
A.effects.removeWrapper(H);
if(B.callback){B.callback.apply(H[0],arguments)
}H.dequeue()
})
})
}
})(jQuery);