(function(B){B.effects.pulsate=function(A){return this.queue(function(){var K=B(this);
var H=B.effects.setMode(K,A.options.mode||"show");
var I=A.options.times||5;
var J=A.duration?A.duration/2:B.fx.speeds._default/2;
if(H=="hide"){I--
}if(K.is(":hidden")){K.css("opacity",0);
K.show();
K.animate({opacity:1},J,A.options.easing);
I=I-2
}for(var L=0;
L<I;
L++){K.animate({opacity:0},J,A.options.easing).animate({opacity:1},J,A.options.easing)
}if(H=="hide"){K.animate({opacity:0},J,A.options.easing,function(){K.hide();
if(A.callback){A.callback.apply(this,arguments)
}})
}else{K.animate({opacity:0},J,A.options.easing).animate({opacity:1},J,A.options.easing,function(){if(A.callback){A.callback.apply(this,arguments)
}})
}K.queue("fx",function(){K.dequeue()
});
K.dequeue()
})
}
})(jQuery);