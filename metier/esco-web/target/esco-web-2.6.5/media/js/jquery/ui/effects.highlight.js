(function(B){B.effects.highlight=function(A){return this.queue(function(){var J=B(this),K=["backgroundImage","backgroundColor","opacity"];
var M=B.effects.setMode(J,A.options.mode||"show");
var L=A.options.color||"#ffff99";
var N=J.css("backgroundColor");
B.effects.save(J,K);
J.show();
J.css({backgroundImage:"none",backgroundColor:L});
var I={backgroundColor:N};
if(M=="hide"){I.opacity=0
}J.animate(I,{queue:false,duration:A.duration,easing:A.options.easing,complete:function(){if(M=="hide"){J.hide()
}B.effects.restore(J,K);
if(M=="show"&&B.browser.msie){this.style.removeAttribute("filter")
}if(A.callback){A.callback.apply(this,arguments)
}J.dequeue()
}})
})
}
})(jQuery);