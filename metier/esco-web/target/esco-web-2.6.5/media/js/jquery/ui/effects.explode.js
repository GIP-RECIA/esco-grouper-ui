(function(B){B.effects.explode=function(A){return this.queue(function(){var P=A.options.pieces?Math.round(Math.sqrt(A.options.pieces)):3;
var L=A.options.pieces?Math.round(Math.sqrt(A.options.pieces)):3;
A.options.mode=A.options.mode=="toggle"?(B(this).is(":visible")?"hide":"show"):A.options.mode;
var Q=B(this).show().css("visibility","hidden");
var O=Q.offset();
O.top-=parseInt(Q.css("marginTop"),10)||0;
O.left-=parseInt(Q.css("marginLeft"),10)||0;
var R=Q.outerWidth(true);
var N=Q.outerHeight(true);
for(var K=0;
K<P;
K++){for(var M=0;
M<L;
M++){Q.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-M*(R/L),top:-K*(N/P)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:R/L,height:N/P,left:O.left+M*(R/L)+(A.options.mode=="show"?(M-Math.floor(L/2))*(R/L):0),top:O.top+K*(N/P)+(A.options.mode=="show"?(K-Math.floor(P/2))*(N/P):0),opacity:A.options.mode=="show"?0:1}).animate({left:O.left+M*(R/L)+(A.options.mode=="show"?0:(M-Math.floor(L/2))*(R/L)),top:O.top+K*(N/P)+(A.options.mode=="show"?0:(K-Math.floor(P/2))*(N/P)),opacity:A.options.mode=="show"?1:0},A.duration||500)
}}setTimeout(function(){A.options.mode=="show"?Q.css({visibility:"visible"}):Q.css({visibility:"visible"}).hide();
if(A.callback){A.callback.apply(Q[0])
}Q.dequeue();
B("div.ui-effects-explode").remove()
},A.duration||500)
})
}
})(jQuery);