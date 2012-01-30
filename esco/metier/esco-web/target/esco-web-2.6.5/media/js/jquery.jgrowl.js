(function(A){A.jGrowl=function(B,C){if(A("#jGrowl").size()==0){A('<div id="jGrowl"></div>').addClass(A.jGrowl.defaults.position).appendTo("body")
}A("#jGrowl").jGrowl(B,C)
};
A.fn.jGrowl=function(D,C){if(A.isFunction(this.each)){var B=arguments;
return this.each(function(){var E=this;
if(A(this).data("jGrowl.instance")==undefined){A(this).data("jGrowl.instance",A.extend(new A.fn.jGrowl(),{notifications:[],element:null,interval:null}));
A(this).data("jGrowl.instance").startup(this)
}if(A.isFunction(A(this).data("jGrowl.instance")[D])){A(this).data("jGrowl.instance")[D].apply(A(this).data("jGrowl.instance"),A.makeArray(B).slice(1))
}else{A(this).data("jGrowl.instance").create(D,C)
}})
}};
A.extend(A.fn.jGrowl.prototype,{defaults:{pool:0,header:"",group:"",sticky:false,position:"top-right",glue:"after",theme:"default",corners:"10px",check:250,life:3000,speed:"normal",easing:"swing",closer:true,closeTemplate:"&times;",closerTemplate:"<div>[ close all ]</div>",log:function(B,D,C){},beforeOpen:function(B,D,C){},open:function(B,D,C){},beforeClose:function(B,D,C){},close:function(B,D,C){},animateOpen:{opacity:"show"},animateClose:{opacity:"hide"}},notifications:[],element:null,interval:null,create:function(B,C){var C=A.extend({},this.defaults,C);
this.notifications[this.notifications.length]={message:B,options:C};
C.log.apply(this.element,[this.element,B,C])
},render:function(B){var D=this;
var E=B.message;
var C=B.options;
var B=A('<div class="jGrowl-notification'+((C.group!=undefined&&C.group!="")?" "+C.group:"")+'"><div class="close">'+C.closeTemplate+'</div><div class="header">'+C.header+'</div><div class="message">'+E+"</div></div>").data("jGrowl",C).addClass(C.theme).children("div.close").bind("click.jGrowl",function(){A(this).parent().trigger("jGrowl.close")
}).parent();
(C.glue=="after")?A("div.jGrowl-notification:last",this.element).after(B):A("div.jGrowl-notification:first",this.element).before(B);
A(B).bind("mouseover.jGrowl",function(){A(this).data("jGrowl").pause=true
}).bind("mouseout.jGrowl",function(){A(this).data("jGrowl").pause=false
}).bind("jGrowl.beforeOpen",function(){C.beforeOpen.apply(D.element,[D.element,E,C])
}).bind("jGrowl.open",function(){C.open.apply(D.element,[D.element,E,C])
}).bind("jGrowl.beforeClose",function(){C.beforeClose.apply(D.element,[D.element,E,C])
}).bind("jGrowl.close",function(){A(this).data("jGrowl").pause=true;
A(this).trigger("jGrowl.beforeClose").animate(C.animateClose,C.speed,C.easing,function(){A(this).remove();
C.close.apply(D.element,[D.element,E,C])
})
}).trigger("jGrowl.beforeOpen").animate(C.animateOpen,C.speed,C.easing,function(){A(this).data("jGrowl").created=new Date()
}).trigger("jGrowl.open");
if(A.fn.corner!=undefined){A(B).corner(C.corners)
}if(A("div.jGrowl-notification:parent",this.element).size()>1&&A("div.jGrowl-closer",this.element).size()==0&&this.defaults.closer!=false){A(this.defaults.closerTemplate).addClass("jGrowl-closer").addClass(this.defaults.theme).appendTo(this.element).animate(this.defaults.animateOpen,this.defaults.speed,this.defaults.easing).bind("click.jGrowl",function(){A(this).siblings().children("div.close").trigger("click.jGrowl");
if(A.isFunction(D.defaults.closer)){D.defaults.closer.apply(A(this).parent()[0],[A(this).parent()[0]])
}})
}},update:function(){A(this.element).find("div.jGrowl-notification:parent").each(function(){if(A(this).data("jGrowl")!=undefined&&A(this).data("jGrowl").created!=undefined&&(A(this).data("jGrowl").created.getTime()+A(this).data("jGrowl").life)<(new Date()).getTime()&&A(this).data("jGrowl").sticky!=true&&(A(this).data("jGrowl").pause==undefined||A(this).data("jGrowl").pause!=true)){A(this).trigger("jGrowl.close")
}});
if(this.notifications.length>0&&(this.defaults.pool==0||A(this.element).find("div.jGrowl-notification:parent").size()<this.defaults.pool)){this.render(this.notifications.shift())
}if(A(this.element).find("div.jGrowl-notification:parent").size()<2){A(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose,this.defaults.speed,this.defaults.easing,function(){A(this).remove()
})
}},startup:function(B){this.element=A(B).addClass("jGrowl").append('<div class="jGrowl-notification"></div>');
this.interval=setInterval(function(){A(B).data("jGrowl.instance").update()
},this.defaults.check);
if(A.browser.msie&&parseInt(A.browser.version)<7&&!window.XMLHttpRequest){A(this.element).addClass("ie6")
}},shutdown:function(){A(this.element).removeClass("jGrowl").find("div.jGrowl-notification").remove();
clearInterval(this.interval)
}});
A.jGrowl.defaults=A.fn.jGrowl.prototype.defaults
})(jQuery);