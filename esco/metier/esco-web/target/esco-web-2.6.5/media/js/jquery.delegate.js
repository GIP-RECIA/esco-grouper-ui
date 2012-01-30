(function(A){A.each({focus:"focusin",blur:"focusout"},function(C,B){A.event.special[B]={setup:function(){if(A.browser.msie){return false
}this.addEventListener(C,A.event.special[B].handler,true)
},teardown:function(){if(A.browser.msie){return false
}this.removeEventListener(C,A.event.special[B].handler,true)
},handler:function(D){arguments[0]=A.event.fix(D);
arguments[0].type=B;
return A.event.handle.apply(this,arguments)
}}
});
A.extend(A.fn,{delegate:function(C,B,D){return this.bind(C,function(E){var F=A(E.target);
if(F.is(B)){return D.apply(F,arguments)
}})
},triggerEvent:function(B,C){return this.triggerHandler(B,[jQuery.event.fix({type:B,target:C})])
}})
})(jQuery);