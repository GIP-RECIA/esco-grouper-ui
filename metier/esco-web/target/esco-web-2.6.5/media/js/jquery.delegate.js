(function(B){B.each({focus:"focusin",blur:"focusout"},function(A,D){B.event.special[D]={setup:function(){if(B.browser.msie){return false
}this.addEventListener(A,B.event.special[D].handler,true)
},teardown:function(){if(B.browser.msie){return false
}this.removeEventListener(A,B.event.special[D].handler,true)
},handler:function(C){arguments[0]=B.event.fix(C);
arguments[0].type=D;
return B.event.handle.apply(this,arguments)
}}
});
B.extend(B.fn,{delegate:function(E,F,A){return this.bind(E,function(D){var C=B(D.target);
if(C.is(F)){return A.apply(C,arguments)
}})
},triggerEvent:function(D,A){return this.triggerHandler(D,[jQuery.event.fix({type:D,target:A})])
}})
})(jQuery);