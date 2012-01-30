(function(A){A.effects.highlight=function(B){return this.queue(function(){var G=A(this),F=["backgroundImage","backgroundColor","opacity"];
var D=A.effects.setMode(G,B.options.mode||"show");
var E=B.options.color||"#ffff99";
var C=G.css("backgroundColor");
A.effects.save(G,F);
G.show();
G.css({backgroundImage:"none",backgroundColor:E});
var H={backgroundColor:C};
if(D=="hide"){H.opacity=0
}G.animate(H,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){if(D=="hide"){G.hide()
}A.effects.restore(G,F);
if(D=="show"&&A.browser.msie){this.style.removeAttribute("filter")
}if(B.callback){B.callback.apply(this,arguments)
}G.dequeue()
}})
})
}
})(jQuery);