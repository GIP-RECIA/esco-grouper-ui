(function(A){A.effects.explode=function(B){return this.queue(function(){var E=B.options.pieces?Math.round(Math.sqrt(B.options.pieces)):3;
var I=B.options.pieces?Math.round(Math.sqrt(B.options.pieces)):3;
B.options.mode=B.options.mode=="toggle"?(A(this).is(":visible")?"hide":"show"):B.options.mode;
var D=A(this).show().css("visibility","hidden");
var F=D.offset();
F.top-=parseInt(D.css("marginTop"),10)||0;
F.left-=parseInt(D.css("marginLeft"),10)||0;
var C=D.outerWidth(true);
var G=D.outerHeight(true);
for(var J=0;
J<E;
J++){for(var H=0;
H<I;
H++){D.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-H*(C/I),top:-J*(G/E)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:C/I,height:G/E,left:F.left+H*(C/I)+(B.options.mode=="show"?(H-Math.floor(I/2))*(C/I):0),top:F.top+J*(G/E)+(B.options.mode=="show"?(J-Math.floor(E/2))*(G/E):0),opacity:B.options.mode=="show"?0:1}).animate({left:F.left+H*(C/I)+(B.options.mode=="show"?0:(H-Math.floor(I/2))*(C/I)),top:F.top+J*(G/E)+(B.options.mode=="show"?0:(J-Math.floor(E/2))*(G/E)),opacity:B.options.mode=="show"?1:0},B.duration||500)
}}setTimeout(function(){B.options.mode=="show"?D.css({visibility:"visible"}):D.css({visibility:"visible"}).hide();
if(B.callback){B.callback.apply(D[0])
}D.dequeue();
A("div.ui-effects-explode").remove()
},B.duration||500)
})
}
})(jQuery);