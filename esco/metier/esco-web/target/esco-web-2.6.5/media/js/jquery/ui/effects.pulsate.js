(function(A){A.effects.pulsate=function(B){return this.queue(function(){var D=A(this);
var G=A.effects.setMode(D,B.options.mode||"show");
var F=B.options.times||5;
var E=B.duration?B.duration/2:A.fx.speeds._default/2;
if(G=="hide"){F--
}if(D.is(":hidden")){D.css("opacity",0);
D.show();
D.animate({opacity:1},E,B.options.easing);
F=F-2
}for(var C=0;
C<F;
C++){D.animate({opacity:0},E,B.options.easing).animate({opacity:1},E,B.options.easing)
}if(G=="hide"){D.animate({opacity:0},E,B.options.easing,function(){D.hide();
if(B.callback){B.callback.apply(this,arguments)
}})
}else{D.animate({opacity:0},E,B.options.easing).animate({opacity:1},E,B.options.easing,function(){if(B.callback){B.callback.apply(this,arguments)
}})
}D.queue("fx",function(){D.dequeue()
});
D.dequeue()
})
}
})(jQuery);