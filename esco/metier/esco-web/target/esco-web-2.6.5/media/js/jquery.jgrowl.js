(function(B){B.jGrowl=function(D,A){if(B("#jGrowl").size()==0){B('<div id="jGrowl"></div>').addClass(B.jGrowl.defaults.position).appendTo("body")
}B("#jGrowl").jGrowl(D,A)
};
B.fn.jGrowl=function(A,E){if(B.isFunction(this.each)){var F=arguments;
return this.each(function(){var C=this;
if(B(this).data("jGrowl.instance")==undefined){B(this).data("jGrowl.instance",B.extend(new B.fn.jGrowl(),{notifications:[],element:null,interval:null}));
B(this).data("jGrowl.instance").startup(this)
}if(B.isFunction(B(this).data("jGrowl.instance")[A])){B(this).data("jGrowl.instance")[A].apply(B(this).data("jGrowl.instance"),B.makeArray(F).slice(1))
}else{B(this).data("jGrowl.instance").create(A,E)
}})
}};
B.extend(B.fn.jGrowl.prototype,{defaults:{pool:0,header:"",group:"",sticky:false,position:"top-right",glue:"after",theme:"default",corners:"10px",check:250,life:3000,speed:"normal",easing:"swing",closer:true,closeTemplate:"&times;",closerTemplate:"<div>[ close all ]</div>",log:function(F,A,E){},beforeOpen:function(F,A,E){},open:function(F,A,E){},beforeClose:function(F,A,E){},close:function(F,A,E){},animateOpen:{opacity:"show"},animateClose:{opacity:"hide"}},notifications:[],element:null,interval:null,create:function(D,A){var A=B.extend({},this.defaults,A);
this.notifications[this.notifications.length]={message:D,options:A};
A.log.apply(this.element,[this.element,D,A])
},render:function(H){var F=this;
var A=H.message;
var G=H.options;
var H=B('<div class="jGrowl-notification'+((G.group!=undefined&&G.group!="")?" "+G.group:"")+'"><div class="close">'+G.closeTemplate+'</div><div class="header">'+G.header+'</div><div class="message">'+A+"</div></div>").data("jGrowl",G).addClass(G.theme).children("div.close").bind("click.jGrowl",function(){B(this).parent().trigger("jGrowl.close")
}).parent();
(G.glue=="after")?B("div.jGrowl-notification:last",this.element).after(H):B("div.jGrowl-notification:first",this.element).before(H);
B(H).bind("mouseover.jGrowl",function(){B(this).data("jGrowl").pause=true
}).bind("mouseout.jGrowl",function(){B(this).data("jGrowl").pause=false
}).bind("jGrowl.beforeOpen",function(){G.beforeOpen.apply(F.element,[F.element,A,G])
}).bind("jGrowl.open",function(){G.open.apply(F.element,[F.element,A,G])
}).bind("jGrowl.beforeClose",function(){G.beforeClose.apply(F.element,[F.element,A,G])
}).bind("jGrowl.close",function(){B(this).data("jGrowl").pause=true;
B(this).trigger("jGrowl.beforeClose").animate(G.animateClose,G.speed,G.easing,function(){B(this).remove();
G.close.apply(F.element,[F.element,A,G])
})
}).trigger("jGrowl.beforeOpen").animate(G.animateOpen,G.speed,G.easing,function(){B(this).data("jGrowl").created=new Date()
}).trigger("jGrowl.open");
if(B.fn.corner!=undefined){B(H).corner(G.corners)
}if(B("div.jGrowl-notification:parent",this.element).size()>1&&B("div.jGrowl-closer",this.element).size()==0&&this.defaults.closer!=false){B(this.defaults.closerTemplate).addClass("jGrowl-closer").addClass(this.defaults.theme).appendTo(this.element).animate(this.defaults.animateOpen,this.defaults.speed,this.defaults.easing).bind("click.jGrowl",function(){B(this).siblings().children("div.close").trigger("click.jGrowl");
if(B.isFunction(F.defaults.closer)){F.defaults.closer.apply(B(this).parent()[0],[B(this).parent()[0]])
}})
}},update:function(){B(this.element).find("div.jGrowl-notification:parent").each(function(){if(B(this).data("jGrowl")!=undefined&&B(this).data("jGrowl").created!=undefined&&(B(this).data("jGrowl").created.getTime()+B(this).data("jGrowl").life)<(new Date()).getTime()&&B(this).data("jGrowl").sticky!=true&&(B(this).data("jGrowl").pause==undefined||B(this).data("jGrowl").pause!=true)){B(this).trigger("jGrowl.close")
}});
if(this.notifications.length>0&&(this.defaults.pool==0||B(this.element).find("div.jGrowl-notification:parent").size()<this.defaults.pool)){this.render(this.notifications.shift())
}if(B(this.element).find("div.jGrowl-notification:parent").size()<2){B(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose,this.defaults.speed,this.defaults.easing,function(){B(this).remove()
})
}},startup:function(A){this.element=B(A).addClass("jGrowl").append('<div class="jGrowl-notification"></div>');
this.interval=setInterval(function(){B(A).data("jGrowl.instance").update()
},this.defaults.check);
if(B.browser.msie&&parseInt(B.browser.version)<7&&!window.XMLHttpRequest){B(this.element).addClass("ie6")
}},shutdown:function(){B(this.element).removeClass("jGrowl").find("div.jGrowl-notification").remove();
clearInterval(this.interval)
}});
B.jGrowl.defaults=B.fn.jGrowl.prototype.defaults
})(jQuery);