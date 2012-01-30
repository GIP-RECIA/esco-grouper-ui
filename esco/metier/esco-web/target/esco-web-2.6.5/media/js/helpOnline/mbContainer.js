(function(C){var B=C("body").width();
var A=C("body").height();
C.doOnWindowResize=function(D){clearTimeout(this.doRes);
this.doRes=setTimeout(function(){C(D).adjastPos();
B=C("body").width();
A=C("body").height()
},400)
};
C.fn.adjastPos=function(D){clearTimeout(this.doRes);
var G=C(this).attr("options");
if(!G.mantainOnWindow){return 
}if(!D){D=20
}var E=C("body").width();
var F=C("body").height();
this.each(function(){if((C(this).offset().left+C(this).outerWidth())>E||(C(this).offset().top+C(this).outerHeight())>F){var H=(C(this).offset().left+C(this).outerWidth())>E?E-C(this).outerWidth()-D:C(this).offset().left;
var I=(C(this).offset().top+C(this).outerHeight())>F?F-C(this).outerHeight()-D:C(this).offset().top;
I=(I>0)?I:0;
C(this).animate({left:H,top:I},550)
}})
};
jQuery.fn.buildContainers=function(D){var E=this;
return this.each(function(){if(C(this).is("[inited=true]")){return 
}this.options={containment:"document",elementsPath:"elements/",onCollapse:function(){},onBeforeIconize:function(){},onIconize:function(){},onClose:function(){},onResize:function(){},onDrag:function(){},onRestore:function(){},onLoad:function(){},mantainOnWindow:true,collapseEffect:"slide",effectDuration:300};
C.extend(this.options,D);
if(this.options.mantainOnWindow){C("body").resize(function(){C.doOnWindowResize(E)
})
}var I=C(this);
I.attr("inited","true");
I.attr("iconized","false");
I.attr("collapsed","false");
I.attr("closed","false");
I.attr("options",this.options);
if(!I.css("position")=="absolute"){I.css({position:"relative"})
}if(C.metadata){C.metadata.setType("class");
if(I.metadata().skin){I.attr("skin",I.metadata().skin)
}if(I.metadata().collapsed){I.attr("collapsed",I.metadata().collapsed)
}if(I.metadata().iconized){I.attr("iconized",I.metadata().iconized)
}if(I.metadata().icon){I.attr("icon",I.metadata().icon)
}if(I.metadata().buttons){I.attr("buttons",I.metadata().buttons)
}if(I.metadata().content){I.attr("content",I.metadata().content)
}if(I.metadata().aspectRatio){I.attr("aspectRatio",I.metadata().aspectRatio)
}if(I.metadata().grid){I.attr("grid",I.metadata().grid)
}if(I.metadata().gridx){I.attr("gridx",I.metadata().gridx)
}if(I.metadata().gridy){I.attr("gridy",I.metadata().gridy)
}if(I.metadata().handles){I.attr("handles",I.metadata().handles)
}if(I.metadata().dock){I.attr("dock",I.metadata().dock)
}if(I.metadata().closed){I.attr("closed",I.metadata().closed)
}if(I.metadata().rememberMe){I.attr("rememberMe",I.metadata().rememberMe)
}if(I.metadata().width){I.attr("width",I.metadata().width)
}if(I.metadata().height){I.attr("height",I.metadata().height)
}}if(I.attr("rememberMe")=="true"){I.attr("width",I.mb_getCookie("width")!=null?I.mb_getCookie("width"):I.attr("width"));
I.attr("height",I.mb_getCookie("height")!=null?I.mb_getCookie("height"):I.attr("height"));
I.attr("closed",I.mb_getCookie("closed")!=null?I.mb_getCookie("closed"):I.attr("closed"));
I.attr("collapsed",I.mb_getCookie("collapsed")!=null?I.mb_getCookie("collapsed"):I.attr("collapsed"));
I.attr("iconized",I.mb_getCookie("iconized")!=null?I.mb_getCookie("iconized"):I.attr("iconized"));
I.css("left",I.mb_getCookie("x")!=null?I.mb_getCookie("x"):I.css("left"));
I.css("top",I.mb_getCookie("y")!=null?I.mb_getCookie("y"):I.css("top"))
}if(I.attr("content")){I.mb_changeContainerContent(I.attr("content"))
}I.addClass(I.attr("skin"));
I.find(".n:first").attr("unselectable","on");
if(!I.find(".n:first").html()){I.find(".n:first").html("&nbsp;")
}I.containerSetIcon(I.attr("icon"),this.options.elementsPath);
if(I.attr("buttons")){I.containerSetButtons(I.attr("buttons"),this.options)
}I.css({width:"99.9%"});
if(I.attr("width")){var H=C.browser.msie?I.attr("width"):I.attr("width")+"px";
I.css({width:H})
}if(I.attr("height")){I.find(".c:first , .mbcontainercontent:first").css("height",I.attr("height")-I.find(".n:first").outerHeight()-(I.find(".s:first").outerHeight()))
}else{if(C.browser.safari){I.find(".mbcontainercontent:first").css("padding-bottom",5)
}}var G=C("body").height();
if(I.outerHeight()>G){I.find(".c:first , .mbcontainercontent:first").css("height",(G-20)-I.find(".n:first").outerHeight()-(I.find(".s:first").outerHeight()))
}if(I.hasClass("draggable")){var F="absolute";
I.css({position:F,margin:0});
I.find(".n:first").css({cursor:"move"});
I.mb_BringToFront();
I.draggable({handle:".n:first",delay:0,containment:this.options.containment,stop:function(){var K=C(this).attr("options");
if(K.onDrag){K.onDrag(C(this))
}if(I.attr("rememberMe")){I.mb_setCookie("x",I.css("left"));
I.mb_setCookie("y",I.css("top"))
}}});
if(I.attr("grid")||(I.attr("gridx")&&I.attr("gridy"))){var J=I.attr("grid")?[I.attr("grid"),I.attr("grid")]:[I.attr("gridx"),I.attr("gridy")];
I.draggable("option","grid",J)
}I.bind("mousedown",function(){C(this).mb_BringToFront()
})
}if(I.hasClass("resizable")){I.containerResize()
}if(I.attr("collapsed")=="true"){I.attr("collapsed","false");
I.containerCollapse(this.options)
}if(I.attr("iconized")=="true"){I.attr("iconized","false");
I.containerIconize(this.options)
}if(I.mb_getState("closed")){I.attr("closed","false");
I.mb_close()
}setTimeout(function(){var K=I.attr("options");
if(K.onLoad){K.onLoad(I)
}I.css("visibility","hidden");
I.adjastPos()
},1000)
})
};
jQuery.fn.containerResize=function(){var F=C(this);
var D=F.hasClass("draggable");
var G=F.attr("handles")?F.attr("handles"):"s";
var E=F.attr("aspectRatio")?F.attr("aspectRatio"):false;
F.resizable({handles:D?"":G,aspectRatio:E,minWidth:350,minHeight:150,iframeFix:true,helper:"mbproxy",start:function(H,I){C(F).resizable("option","maxHeight",C("body").height()-(C(F).offset().top)-5);
C(F).resizable("option","maxWidth",C("body").width()-C(F).offset().left-5);
I.helper.mb_BringToFront()
},stop:function(){var K=C(this);
var H=K.outerHeight()-F.find(".n:first").outerHeight()-(F.find(".s:first").outerHeight());
F.find(".c:first , .mbcontainercontent:first").css({height:H});
if(!D&&!F.attr("handles")){var J=F.attr("width")&&F.attr("width")>0?F.attr("width"):"99.9%";
F.css({width:J})
}var I=F.attr("options");
if(I.onResize){I.onResize(F)
}if(F.attr("rememberMe")){F.mb_setCookie("width",F.outerWidth());
F.mb_setCookie("height",F.outerHeight())
}}});
F.resizable("option","maxHeight",C("document").outerHeight()-(F.offset().top+F.outerHeight())-10);
F.find(".ui-resizable-n").addClass("mb-resize").addClass("mb-resize-resizable-n");
F.find(".ui-resizable-e").addClass("mb-resize").addClass("mb-resize-resizable-e");
F.find(".ui-resizable-w").addClass("mb-resize").addClass("mb-resize-resizable-w");
F.find(".ui-resizable-s").addClass("mb-resize").addClass("mb-resize-resizable-s");
F.find(".ui-resizable-se").addClass("mb-resize").addClass("mb-resize-resizable-se")
};
jQuery.fn.containerSetIcon=function(D,E){var F=C(this);
if(D&&D!=""){F.find(".ne:first").prepend("<img class='icon' src='"+E+"icons/"+D+"' style='position:absolute'/>");
F.find(".n:first").css({paddingLeft:25})
}else{F.find(".n:first").css({paddingLeft:0})
}};
jQuery.fn.containerSetButtons=function(E,H){var F=C(this);
if(!H){H=F.attr("options")
}var J=H.elementsPath;
if(E!=""){var D=E.split(",");
F.find(".ne:first").append("<div class='buttonBar'></div>");
for(var G in D){if(D[G]=="c"){F.find(".buttonBar:first").append("<img src='"+J+F.attr("skin")+"/close.png' class='close'/>");
F.find(".close:first").bind("click",function(){F.mb_close();
if(H.onClose){H.onClose(F)
}})
}if(D[G]=="m"){F.find(".buttonBar:first").append("<img src='"+J+F.attr("skin")+"/min.png' class='collapsedContainer'/>");
F.find(".collapsedContainer:first").bind("click",function(){F.containerCollapse(H)
});
F.find(".n:first").bind("dblclick",function(){F.containerCollapse(H)
})
}if(D[G]=="p"){F.find(".buttonBar:first").append("<img src='"+J+F.attr("skin")+"/print.png' class='printContainer'/>");
F.find(".printContainer:first").bind("click",function(){})
}if(D[G]=="i"){F.find(".buttonBar:first").append("<img src='"+J+F.attr("skin")+"/iconize.png' class='iconizeContainer'/>");
F.find(".iconizeContainer:first").bind("click",function(){F.containerIconize(H)
})
}}var I=C.browser.mozilla||C.browser.safari;
if(I){F.find(".buttonBar:first img").css({opacity:0.5,cursor:"pointer",mozUserSelect:"none",khtmlUserSelect:"none"}).mouseover(function(){C(this).fadeTo(200,1)
}).mouseout(function(){if(I){C(this).fadeTo(200,0.5)
}})
}F.find(".buttonBar:first img").attr("unselectable","on")
}};
jQuery.fn.containerCollapse=function(D){this.each(function(){var E=C(this);
if(!D){D=E.attr("options")
}if(!E.mb_getState("collapsed")){E.attr("w",E.outerWidth());
E.attr("h",E.outerHeight());
if(D.collapseEffect=="fade"){E.find(".o:first").fadeOut(D.effectDuration,function(){})
}else{E.find(".icon:first").hide();
E.find(".o:first").slideUp(D.effectDuration,function(){});
E.animate({height:E.find(".n:first").outerHeight()+E.find(".s:first").outerHeight()},D.effectDuration,function(){E.find(".icon:first").show()
})
}E.attr("collapsed","true");
E.find(".collapsedContainer:first").attr("src",D.elementsPath+E.attr("skin")+"/max.png");
E.resizable("disable");
if(D.onCollapse){D.onCollapse(E)
}}else{if(D.collapseEffect=="fade"){E.find(".o:first").fadeIn(D.effectDuration,function(){})
}else{E.find(".o:first").slideDown(D.effectDuration,function(){});
E.find(".icon:first").hide();
E.animate({height:E.attr("h")},D.effectDuration,function(){E.find(".icon:first").show()
})
}if(E.hasClass("resizable")){E.resizable("enable")
}E.attr("collapsed","false");
E.find(".collapsedContainer:first").attr("src",D.elementsPath+E.attr("skin")+"/min.png")
}if(E.attr("rememberMe")){E.mb_setCookie("collapsed",E.mb_getState("collapsed"))
}})
};
jQuery.fn.containerIconize=function(E){var D=C(this);
if(!E){E=D.attr("options")
}return this.each(function(){if(E.onBeforeIconize){E.onBeforeIconize()
}D.attr("iconized","true");
if(D.attr("collapsed")=="false"){D.attr("h",D.outerHeight())
}D.attr("w",D.attr("width")&&D.attr("width")>0?(!D.hasClass("resizable")?D.attr("width"):D.width()):!D.attr("handles")?"99.9%":D.width());
D.attr("t",D.css("top"));
D.attr("l",D.css("left"));
D.resizable("disable");
var F=0;
var G=D.css("top");
var H=D;
if(D.attr("dock")){H=C("#"+D.attr("dock"));
var I=H.find("img").size();
F=C("#"+D.attr("dock")).offset().left+(32*I);
G=C("#"+D.attr("dock")).offset().top
}this.dockIcon=C("<img src='"+E.elementsPath+"icons/"+(D.attr("icon")?D.attr("icon"):"restore.png")+"' class='restoreContainer' width='32'/>").appendTo(H).css("cursor","pointer").hide().attr("contTitle",D.find(".n:first").text()).bind("click",function(){D.attr("iconized","false");
if(D.is(".draggable")){D.css({top:C(this).offset().top,left:C(this).offset().left})
}else{D.css({left:"auto",top:"auto"})
}D.show();
if(!C.browser.msie){D.find(".no:first").fadeIn("fast");
if(D.attr("collapsed")=="false"){D.animate({height:D.attr("h"),width:D.attr("w"),left:D.attr("l"),top:D.attr("t")},E.effectDuration,function(){if(D.hasClass("draggable")){D.mb_BringToFront()
}});
D.find(".c:first , .mbcontainercontent:first").css("height",D.attr("h")-D.find(".n:first").outerHeight()-(D.find(".s:first").outerHeight()))
}else{D.animate({height:"60px",width:D.attr("w"),left:D.attr("l"),top:D.attr("t")},E.effectDuration)
}}else{D.find(".no:first").show();
if(D.attr("collapsed")=="false"){D.css({height:D.attr("h"),width:D.attr("w"),left:D.attr("l"),top:D.attr("t")},E.effectDuration);
D.find(".c:first , .mbcontainercontent:first").css("height",D.attr("h")-D.find(".n:first").outerHeight()-(D.find(".s:first").outerHeight()))
}else{D.css({height:"60px",width:D.attr("w"),left:D.attr("l"),top:D.attr("t")},E.effectDuration)
}}if(D.hasClass("resizable")&&D.attr("collapsed")=="false"){D.resizable("enable")
}C(this).remove();
if(D.hasClass("draggable")){D.mb_BringToFront()
}C(".iconLabel").remove();
D.attr("restored",true);
if(E.onRestore){E.onRestore(D)
}if(D.attr("rememberMe")){D.mb_setCookie("restored",D.mb_getState("restored"));
D.mb_setCookie("closed",false);
D.mb_setCookie("iconized",false);
D.mb_setCookie("collapsed",false)
}if(E.mantainOnWindow){C.doOnWindowResize(D)
}}).bind("mouseenter",function(){var J="<div class='iconLabel'>"+C(this).attr("contTitle")+"</div>";
C("body").append(J);
C(".iconLabel").hide().css({position:"absolute",top:C(this).offset().top-20,left:C(this).offset().left+15,opacity:0.9}).fadeIn("slow").mb_BringToFront()
}).bind("mouseleave",function(){C(".iconLabel").fadeOut("fast",function(){C(this).remove()
})
});
if(!C.browser.msie){D.find(".mbcontainercontent:first").css("overflow","hidden");
D.find(".no:first").slideUp("fast");
D.animate({height:"32px",width:"32px",left:F,top:G},E.effectDuration,function(){C(this.dockIcon).show();
if(D.attr("dock")){D.hide()
}})
}else{D.find(".no:first").hide();
D.css({height:"32px",width:"32px",left:F,top:G});
C(this.dockIcon).show();
if(D.attr("dock")){D.hide()
}}if(E.onIconize){E.onIconize(D)
}if(D.attr("rememberMe")){D.mb_setCookie("iconized",D.mb_getState("iconized"))
}})
};
jQuery.fn.mb_resizeTo=function(D,H,E){if(E||E==undefined){E=200
}else{E=0
}var G=C(this);
if(G.mb_getState("closed")||G.mb_getState("iconized")){if(G.attr("rememberMe")){G.mb_setCookie("width",G.attr("w"));
G.mb_setCookie("height",G.attr("h"))
}return 
}if(!H){H=G.outerWidth()
}if(!D){D=G.outerHeight()
}var F=D-G.find(".n:first").outerHeight()-(G.find(".s:first").outerHeight());
G.find(".c:first , .mbcontainercontent:first").animate({height:F},E);
G.animate({height:D,width:H},E,function(){G.adjastPos();
var I=G.attr("options");
if(I.onResize){I.onResize(G)
}if(G.attr("rememberMe")){G.mb_setCookie("width",G.outerWidth());
G.mb_setCookie("height",G.outerHeight())
}})
};
jQuery.fn.mb_iconize=function(){var F=C(this);
var E=F.get(0);
if(!F.mb_getState("closed")){if(F.mb_getState("iconized")){var D=E.dockIcon;
C(D).click();
F.mb_BringToFront()
}else{F.containerIconize();
if(E.options.onIconize){E.options.onIconize(C(E))
}}}return F
};
jQuery.fn.mb_open=function(H,F){var G=C(this);
var I=G.css("top");
var E=G.css("left");
G.css("top",I).css("left",E);
var D=G.get(0);
if(G.mb_getState("closed")){if(H){if(!F){F=""
}G.mb_changeContainerContent(H,F)
}G.css("visibility","visible");
G.attr("closed","false");
if(G.attr("rememberMe")){G.mb_setCookie("closed",false);
G.mb_setCookie("restored",true)
}G.mb_BringToFront();
G.attr("restored",true);
if(!G.mb_getState("collapsed")){G.mb_resizeTo(350,500,false)
}if(D.options.onRestore){D.options.onRestore(C(D))
}}return G
};
jQuery.fn.mb_close=function(){var E=C(this).get(0);
var D=C(this);
if(!D.mb_getState("closed")&&!D.mb_getState("iconized")){D.css("visibility","hidden")
}if(E.options.onClose){E.options.onClose(C(E))
}D.attr("closed","true");
if(D.attr("rememberMe")){D.mb_setCookie("closed",true)
}return C(this)
};
jQuery.fn.mb_toggle=function(){if(!C(this).mb_getState("closed")&&!C(this).mb_getState("iconized")){C(this).containerCollapse()
}return C(this)
};
jQuery.fn.mb_BringToFront=jQuery.fn.mb_bringToFront=function(){var D=10;
C("*").each(function(){if(C(this).css("position")=="absolute"){var E=parseInt(C(this).css("zIndex"));
D=E>D?parseInt(C(this).css("zIndex")):D
}});
C(this).css("zIndex",D+=1);
return D
};
jQuery.fn.mb_changeContent=function(D,E){var F=C(this);
if(!E){E=""
}C.ajax({type:"POST",url:D,data:E,success:function(G){F.html(G)
}})
};
jQuery.fn.mb_changeContainerContent=function(D,E){C(this).find(".mbcontainercontent:first").mb_changeContent(D,E)
};
jQuery.fn.mb_getState=function(D){var E=C(this).attr(D);
E=E=="true";
return E
};
jQuery.fn.mb_fullscreen=function(){var D=C(this);
if(D.mb_getState("iconized")||D.mb_getState("collapsed")||D.mb_getState("closed")){D.attr("w",C("body").width()-40);
D.attr("h",C("body").height()-40);
D.attr("t",20);
D.attr("l",20);
D.css("height","");
return 
}D.animate({top:20,left:20,position:"relative"},200,function(){if(D.attr("rememberMe")){D.mb_setCookie("x",C(this).css("left"));
D.mb_setCookie("y",C(this).css("top"))
}});
D.mb_resizeTo(C("body").height()-40,C("body").width()-40);
D.attr("w",C(this).outerWidth());
D.attr("h",C(this).outerHeight());
D.attr("t",C(this).offset().top);
D.attr("l",C(this).offset().left);
D.css("height","");
D.mb_bringToFront();
return D
};
jQuery.fn.mb_centerOnWindow=function(E){var I=C(this);
var G=C("body").width();
var K=C("body").height();
var J=I.outerWidth();
var D=I.outerHeight();
var H=(G-J)/2;
var F=((K-D)/2)>0?(K-D)/2:10;
if(E){I.animate({top:F,left:H},300,function(){if(I.attr("rememberMe")){I.mb_setCookie("x",C(this).css("left"));
I.mb_setCookie("y",C(this).css("top"))
}})
}else{I.css({top:F,left:H});
if(I.attr("rememberMe")){I.mb_setCookie("x",C(this).css("left"));
I.mb_setCookie("y",C(this).css("top"))
}}return I
};
jQuery.fn.mb_setCookie=function(H,I,F){var E=C(this).attr("id");
if(!E){E=""
}if(F){var G=new Date(),D;
G.setTime(G.getTime()+(F*24*60*60*1000));
D="; expires="+G.toGMTString()
}else{D=""
}document.cookie=H+"_"+E+"="+I+D+"; path=/"
};
jQuery.fn.mb_getCookie=function(G){var F=C(this).attr("id");
if(!F){F=""
}var I=G+"_"+F+"=";
var E=document.cookie.split(";");
for(var H=0;
H<E.length;
H++){var D=E[H];
while(D.charAt(0)==" "){D=D.substring(1,D.length)
}if(D.indexOf(I)==0){return D.substring(I.length,D.length)
}}return null
};
jQuery.fn.mb_removeCookie=function(D){C(this).createCookie(D,"",-1)
}
})(jQuery);