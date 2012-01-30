(function(E){var F=E("body").width();
var D=E("body").height();
E.doOnWindowResize=function(A){clearTimeout(this.doRes);
this.doRes=setTimeout(function(){E(A).adjastPos();
F=E("body").width();
D=E("body").height()
},400)
};
E.fn.adjastPos=function(H){clearTimeout(this.doRes);
var A=E(this).attr("options");
if(!A.mantainOnWindow){return 
}if(!H){H=20
}var C=E("body").width();
var B=E("body").height();
this.each(function(){if((E(this).offset().left+E(this).outerWidth())>C||(E(this).offset().top+E(this).outerHeight())>B){var J=(E(this).offset().left+E(this).outerWidth())>C?C-E(this).outerWidth()-H:E(this).offset().left;
var G=(E(this).offset().top+E(this).outerHeight())>B?B-E(this).outerHeight()-H:E(this).offset().top;
G=(G>0)?G:0;
E(this).animate({left:J,top:G},550)
}})
};
jQuery.fn.buildContainers=function(B){var A=this;
return this.each(function(){if(E(this).is("[inited=true]")){return 
}this.options={containment:"document",elementsPath:"elements/",onCollapse:function(){},onBeforeIconize:function(){},onIconize:function(){},onClose:function(){},onResize:function(){},onDrag:function(){},onRestore:function(){},onLoad:function(){},mantainOnWindow:true,collapseEffect:"slide",effectDuration:300};
E.extend(this.options,B);
if(this.options.mantainOnWindow){E("body").resize(function(){E.doOnWindowResize(A)
})
}var K=E(this);
K.attr("inited","true");
K.attr("iconized","false");
K.attr("collapsed","false");
K.attr("closed","false");
K.attr("options",this.options);
if(!K.css("position")=="absolute"){K.css({position:"relative"})
}if(E.metadata){E.metadata.setType("class");
if(K.metadata().skin){K.attr("skin",K.metadata().skin)
}if(K.metadata().collapsed){K.attr("collapsed",K.metadata().collapsed)
}if(K.metadata().iconized){K.attr("iconized",K.metadata().iconized)
}if(K.metadata().icon){K.attr("icon",K.metadata().icon)
}if(K.metadata().buttons){K.attr("buttons",K.metadata().buttons)
}if(K.metadata().content){K.attr("content",K.metadata().content)
}if(K.metadata().aspectRatio){K.attr("aspectRatio",K.metadata().aspectRatio)
}if(K.metadata().grid){K.attr("grid",K.metadata().grid)
}if(K.metadata().gridx){K.attr("gridx",K.metadata().gridx)
}if(K.metadata().gridy){K.attr("gridy",K.metadata().gridy)
}if(K.metadata().handles){K.attr("handles",K.metadata().handles)
}if(K.metadata().dock){K.attr("dock",K.metadata().dock)
}if(K.metadata().closed){K.attr("closed",K.metadata().closed)
}if(K.metadata().rememberMe){K.attr("rememberMe",K.metadata().rememberMe)
}if(K.metadata().width){K.attr("width",K.metadata().width)
}if(K.metadata().height){K.attr("height",K.metadata().height)
}}if(K.attr("rememberMe")=="true"){K.attr("width",K.mb_getCookie("width")!=null?K.mb_getCookie("width"):K.attr("width"));
K.attr("height",K.mb_getCookie("height")!=null?K.mb_getCookie("height"):K.attr("height"));
K.attr("closed",K.mb_getCookie("closed")!=null?K.mb_getCookie("closed"):K.attr("closed"));
K.attr("collapsed",K.mb_getCookie("collapsed")!=null?K.mb_getCookie("collapsed"):K.attr("collapsed"));
K.attr("iconized",K.mb_getCookie("iconized")!=null?K.mb_getCookie("iconized"):K.attr("iconized"));
K.css("left",K.mb_getCookie("x")!=null?K.mb_getCookie("x"):K.css("left"));
K.css("top",K.mb_getCookie("y")!=null?K.mb_getCookie("y"):K.css("top"))
}if(K.attr("content")){K.mb_changeContainerContent(K.attr("content"))
}K.addClass(K.attr("skin"));
K.find(".n:first").attr("unselectable","on");
if(!K.find(".n:first").html()){K.find(".n:first").html("&nbsp;")
}K.containerSetIcon(K.attr("icon"),this.options.elementsPath);
if(K.attr("buttons")){K.containerSetButtons(K.attr("buttons"),this.options)
}K.css({width:"99.9%"});
if(K.attr("width")){var L=E.browser.msie?K.attr("width"):K.attr("width")+"px";
K.css({width:L})
}if(K.attr("height")){K.find(".c:first , .mbcontainercontent:first").css("height",K.attr("height")-K.find(".n:first").outerHeight()-(K.find(".s:first").outerHeight()))
}else{if(E.browser.safari){K.find(".mbcontainercontent:first").css("padding-bottom",5)
}}var M=E("body").height();
if(K.outerHeight()>M){K.find(".c:first , .mbcontainercontent:first").css("height",(M-20)-K.find(".n:first").outerHeight()-(K.find(".s:first").outerHeight()))
}if(K.hasClass("draggable")){var N="absolute";
K.css({position:N,margin:0});
K.find(".n:first").css({cursor:"move"});
K.mb_BringToFront();
K.draggable({handle:".n:first",delay:0,containment:this.options.containment,stop:function(){var G=E(this).attr("options");
if(G.onDrag){G.onDrag(E(this))
}if(K.attr("rememberMe")){K.mb_setCookie("x",K.css("left"));
K.mb_setCookie("y",K.css("top"))
}}});
if(K.attr("grid")||(K.attr("gridx")&&K.attr("gridy"))){var C=K.attr("grid")?[K.attr("grid"),K.attr("grid")]:[K.attr("gridx"),K.attr("gridy")];
K.draggable("option","grid",C)
}K.bind("mousedown",function(){E(this).mb_BringToFront()
})
}if(K.hasClass("resizable")){K.containerResize()
}if(K.attr("collapsed")=="true"){K.attr("collapsed","false");
K.containerCollapse(this.options)
}if(K.attr("iconized")=="true"){K.attr("iconized","false");
K.containerIconize(this.options)
}if(K.mb_getState("closed")){K.attr("closed","false");
K.mb_close()
}setTimeout(function(){var G=K.attr("options");
if(G.onLoad){G.onLoad(K)
}K.css("visibility","hidden");
K.adjastPos()
},1000)
})
};
jQuery.fn.containerResize=function(){var B=E(this);
var H=B.hasClass("draggable");
var A=B.attr("handles")?B.attr("handles"):"s";
var C=B.attr("aspectRatio")?B.attr("aspectRatio"):false;
B.resizable({handles:H?"":A,aspectRatio:C,minWidth:350,minHeight:150,iframeFix:true,helper:"mbproxy",start:function(J,G){E(B).resizable("option","maxHeight",E("body").height()-(E(B).offset().top)-5);
E(B).resizable("option","maxWidth",E("body").width()-E(B).offset().left-5);
G.helper.mb_BringToFront()
},stop:function(){var G=E(this);
var N=G.outerHeight()-B.find(".n:first").outerHeight()-(B.find(".s:first").outerHeight());
B.find(".c:first , .mbcontainercontent:first").css({height:N});
if(!H&&!B.attr("handles")){var L=B.attr("width")&&B.attr("width")>0?B.attr("width"):"99.9%";
B.css({width:L})
}var M=B.attr("options");
if(M.onResize){M.onResize(B)
}if(B.attr("rememberMe")){B.mb_setCookie("width",B.outerWidth());
B.mb_setCookie("height",B.outerHeight())
}}});
B.resizable("option","maxHeight",E("document").outerHeight()-(B.offset().top+B.outerHeight())-10);
B.find(".ui-resizable-n").addClass("mb-resize").addClass("mb-resize-resizable-n");
B.find(".ui-resizable-e").addClass("mb-resize").addClass("mb-resize-resizable-e");
B.find(".ui-resizable-w").addClass("mb-resize").addClass("mb-resize-resizable-w");
B.find(".ui-resizable-s").addClass("mb-resize").addClass("mb-resize-resizable-s");
B.find(".ui-resizable-se").addClass("mb-resize").addClass("mb-resize-resizable-se")
};
jQuery.fn.containerSetIcon=function(C,B){var A=E(this);
if(C&&C!=""){A.find(".ne:first").prepend("<img class='icon' src='"+B+"icons/"+C+"' style='position:absolute'/>");
A.find(".n:first").css({paddingLeft:25})
}else{A.find(".n:first").css({paddingLeft:0})
}};
jQuery.fn.containerSetButtons=function(M,C){var L=E(this);
if(!C){C=L.attr("options")
}var A=C.elementsPath;
if(M!=""){var N=M.split(",");
L.find(".ne:first").append("<div class='buttonBar'></div>");
for(var K in N){if(N[K]=="c"){L.find(".buttonBar:first").append("<img src='"+A+L.attr("skin")+"/close.png' class='close'/>");
L.find(".close:first").bind("click",function(){L.mb_close();
if(C.onClose){C.onClose(L)
}})
}if(N[K]=="m"){L.find(".buttonBar:first").append("<img src='"+A+L.attr("skin")+"/min.png' class='collapsedContainer'/>");
L.find(".collapsedContainer:first").bind("click",function(){L.containerCollapse(C)
});
L.find(".n:first").bind("dblclick",function(){L.containerCollapse(C)
})
}if(N[K]=="p"){L.find(".buttonBar:first").append("<img src='"+A+L.attr("skin")+"/print.png' class='printContainer'/>");
L.find(".printContainer:first").bind("click",function(){})
}if(N[K]=="i"){L.find(".buttonBar:first").append("<img src='"+A+L.attr("skin")+"/iconize.png' class='iconizeContainer'/>");
L.find(".iconizeContainer:first").bind("click",function(){L.containerIconize(C)
})
}}var B=E.browser.mozilla||E.browser.safari;
if(B){L.find(".buttonBar:first img").css({opacity:0.5,cursor:"pointer",mozUserSelect:"none",khtmlUserSelect:"none"}).mouseover(function(){E(this).fadeTo(200,1)
}).mouseout(function(){if(B){E(this).fadeTo(200,0.5)
}})
}L.find(".buttonBar:first img").attr("unselectable","on")
}};
jQuery.fn.containerCollapse=function(A){this.each(function(){var B=E(this);
if(!A){A=B.attr("options")
}if(!B.mb_getState("collapsed")){B.attr("w",B.outerWidth());
B.attr("h",B.outerHeight());
if(A.collapseEffect=="fade"){B.find(".o:first").fadeOut(A.effectDuration,function(){})
}else{B.find(".icon:first").hide();
B.find(".o:first").slideUp(A.effectDuration,function(){});
B.animate({height:B.find(".n:first").outerHeight()+B.find(".s:first").outerHeight()},A.effectDuration,function(){B.find(".icon:first").show()
})
}B.attr("collapsed","true");
B.find(".collapsedContainer:first").attr("src",A.elementsPath+B.attr("skin")+"/max.png");
B.resizable("disable");
if(A.onCollapse){A.onCollapse(B)
}}else{if(A.collapseEffect=="fade"){B.find(".o:first").fadeIn(A.effectDuration,function(){})
}else{B.find(".o:first").slideDown(A.effectDuration,function(){});
B.find(".icon:first").hide();
B.animate({height:B.attr("h")},A.effectDuration,function(){B.find(".icon:first").show()
})
}if(B.hasClass("resizable")){B.resizable("enable")
}B.attr("collapsed","false");
B.find(".collapsedContainer:first").attr("src",A.elementsPath+B.attr("skin")+"/min.png")
}if(B.attr("rememberMe")){B.mb_setCookie("collapsed",B.mb_getState("collapsed"))
}})
};
jQuery.fn.containerIconize=function(A){var B=E(this);
if(!A){A=B.attr("options")
}return this.each(function(){if(A.onBeforeIconize){A.onBeforeIconize()
}B.attr("iconized","true");
if(B.attr("collapsed")=="false"){B.attr("h",B.outerHeight())
}B.attr("w",B.attr("width")&&B.attr("width")>0?(!B.hasClass("resizable")?B.attr("width"):B.width()):!B.attr("handles")?"99.9%":B.width());
B.attr("t",B.css("top"));
B.attr("l",B.css("left"));
B.resizable("disable");
var L=0;
var K=B.css("top");
var J=B;
if(B.attr("dock")){J=E("#"+B.attr("dock"));
var C=J.find("img").size();
L=E("#"+B.attr("dock")).offset().left+(32*C);
K=E("#"+B.attr("dock")).offset().top
}this.dockIcon=E("<img src='"+A.elementsPath+"icons/"+(B.attr("icon")?B.attr("icon"):"restore.png")+"' class='restoreContainer' width='32'/>").appendTo(J).css("cursor","pointer").hide().attr("contTitle",B.find(".n:first").text()).bind("click",function(){B.attr("iconized","false");
if(B.is(".draggable")){B.css({top:E(this).offset().top,left:E(this).offset().left})
}else{B.css({left:"auto",top:"auto"})
}B.show();
if(!E.browser.msie){B.find(".no:first").fadeIn("fast");
if(B.attr("collapsed")=="false"){B.animate({height:B.attr("h"),width:B.attr("w"),left:B.attr("l"),top:B.attr("t")},A.effectDuration,function(){if(B.hasClass("draggable")){B.mb_BringToFront()
}});
B.find(".c:first , .mbcontainercontent:first").css("height",B.attr("h")-B.find(".n:first").outerHeight()-(B.find(".s:first").outerHeight()))
}else{B.animate({height:"60px",width:B.attr("w"),left:B.attr("l"),top:B.attr("t")},A.effectDuration)
}}else{B.find(".no:first").show();
if(B.attr("collapsed")=="false"){B.css({height:B.attr("h"),width:B.attr("w"),left:B.attr("l"),top:B.attr("t")},A.effectDuration);
B.find(".c:first , .mbcontainercontent:first").css("height",B.attr("h")-B.find(".n:first").outerHeight()-(B.find(".s:first").outerHeight()))
}else{B.css({height:"60px",width:B.attr("w"),left:B.attr("l"),top:B.attr("t")},A.effectDuration)
}}if(B.hasClass("resizable")&&B.attr("collapsed")=="false"){B.resizable("enable")
}E(this).remove();
if(B.hasClass("draggable")){B.mb_BringToFront()
}E(".iconLabel").remove();
B.attr("restored",true);
if(A.onRestore){A.onRestore(B)
}if(B.attr("rememberMe")){B.mb_setCookie("restored",B.mb_getState("restored"));
B.mb_setCookie("closed",false);
B.mb_setCookie("iconized",false);
B.mb_setCookie("collapsed",false)
}if(A.mantainOnWindow){E.doOnWindowResize(B)
}}).bind("mouseenter",function(){var G="<div class='iconLabel'>"+E(this).attr("contTitle")+"</div>";
E("body").append(G);
E(".iconLabel").hide().css({position:"absolute",top:E(this).offset().top-20,left:E(this).offset().left+15,opacity:0.9}).fadeIn("slow").mb_BringToFront()
}).bind("mouseleave",function(){E(".iconLabel").fadeOut("fast",function(){E(this).remove()
})
});
if(!E.browser.msie){B.find(".mbcontainercontent:first").css("overflow","hidden");
B.find(".no:first").slideUp("fast");
B.animate({height:"32px",width:"32px",left:L,top:K},A.effectDuration,function(){E(this.dockIcon).show();
if(B.attr("dock")){B.hide()
}})
}else{B.find(".no:first").hide();
B.css({height:"32px",width:"32px",left:L,top:K});
E(this.dockIcon).show();
if(B.attr("dock")){B.hide()
}}if(A.onIconize){A.onIconize(B)
}if(B.attr("rememberMe")){B.mb_setCookie("iconized",B.mb_getState("iconized"))
}})
};
jQuery.fn.mb_resizeTo=function(J,A,I){if(I||I==undefined){I=200
}else{I=0
}var B=E(this);
if(B.mb_getState("closed")||B.mb_getState("iconized")){if(B.attr("rememberMe")){B.mb_setCookie("width",B.attr("w"));
B.mb_setCookie("height",B.attr("h"))
}return 
}if(!A){A=B.outerWidth()
}if(!J){J=B.outerHeight()
}var C=J-B.find(".n:first").outerHeight()-(B.find(".s:first").outerHeight());
B.find(".c:first , .mbcontainercontent:first").animate({height:C},I);
B.animate({height:J,width:A},I,function(){B.adjastPos();
var G=B.attr("options");
if(G.onResize){G.onResize(B)
}if(B.attr("rememberMe")){B.mb_setCookie("width",B.outerWidth());
B.mb_setCookie("height",B.outerHeight())
}})
};
jQuery.fn.mb_iconize=function(){var A=E(this);
var B=A.get(0);
if(!A.mb_getState("closed")){if(A.mb_getState("iconized")){var C=B.dockIcon;
E(C).click();
A.mb_BringToFront()
}else{A.containerIconize();
if(B.options.onIconize){B.options.onIconize(E(B))
}}}return A
};
jQuery.fn.mb_open=function(B,J){var C=E(this);
var A=C.css("top");
var K=C.css("left");
C.css("top",A).css("left",K);
var L=C.get(0);
if(C.mb_getState("closed")){if(B){if(!J){J=""
}C.mb_changeContainerContent(B,J)
}C.css("visibility","visible");
C.attr("closed","false");
if(C.attr("rememberMe")){C.mb_setCookie("closed",false);
C.mb_setCookie("restored",true)
}C.mb_BringToFront();
C.attr("restored",true);
if(!C.mb_getState("collapsed")){C.mb_resizeTo(350,500,false)
}if(L.options.onRestore){L.options.onRestore(E(L))
}}return C
};
jQuery.fn.mb_close=function(){var A=E(this).get(0);
var B=E(this);
if(!B.mb_getState("closed")&&!B.mb_getState("iconized")){B.css("visibility","hidden")
}if(A.options.onClose){A.options.onClose(E(A))
}B.attr("closed","true");
if(B.attr("rememberMe")){B.mb_setCookie("closed",true)
}return E(this)
};
jQuery.fn.mb_toggle=function(){if(!E(this).mb_getState("closed")&&!E(this).mb_getState("iconized")){E(this).containerCollapse()
}return E(this)
};
jQuery.fn.mb_BringToFront=jQuery.fn.mb_bringToFront=function(){var A=10;
E("*").each(function(){if(E(this).css("position")=="absolute"){var B=parseInt(E(this).css("zIndex"));
A=B>A?parseInt(E(this).css("zIndex")):A
}});
E(this).css("zIndex",A+=1);
return A
};
jQuery.fn.mb_changeContent=function(C,B){var A=E(this);
if(!B){B=""
}E.ajax({type:"POST",url:C,data:B,success:function(H){A.html(H)
}})
};
jQuery.fn.mb_changeContainerContent=function(B,A){E(this).find(".mbcontainercontent:first").mb_changeContent(B,A)
};
jQuery.fn.mb_getState=function(B){var A=E(this).attr(B);
A=A=="true";
return A
};
jQuery.fn.mb_fullscreen=function(){var A=E(this);
if(A.mb_getState("iconized")||A.mb_getState("collapsed")||A.mb_getState("closed")){A.attr("w",E("body").width()-40);
A.attr("h",E("body").height()-40);
A.attr("t",20);
A.attr("l",20);
A.css("height","");
return 
}A.animate({top:20,left:20,position:"relative"},200,function(){if(A.attr("rememberMe")){A.mb_setCookie("x",E(this).css("left"));
A.mb_setCookie("y",E(this).css("top"))
}});
A.mb_resizeTo(E("body").height()-40,E("body").width()-40);
A.attr("w",E(this).outerWidth());
A.attr("h",E(this).outerHeight());
A.attr("t",E(this).offset().top);
A.attr("l",E(this).offset().left);
A.css("height","");
A.mb_bringToFront();
return A
};
jQuery.fn.mb_centerOnWindow=function(O){var C=E(this);
var M=E("body").width();
var A=E("body").height();
var B=C.outerWidth();
var P=C.outerHeight();
var L=(M-B)/2;
var N=((A-P)/2)>0?(A-P)/2:10;
if(O){C.animate({top:N,left:L},300,function(){if(C.attr("rememberMe")){C.mb_setCookie("x",E(this).css("left"));
C.mb_setCookie("y",E(this).css("top"))
}})
}else{C.css({top:N,left:L});
if(C.attr("rememberMe")){C.mb_setCookie("x",E(this).css("left"));
C.mb_setCookie("y",E(this).css("top"))
}}return C
};
jQuery.fn.mb_setCookie=function(B,A,J){var K=E(this).attr("id");
if(!K){K=""
}if(J){var C=new Date(),L;
C.setTime(C.getTime()+(J*24*60*60*1000));
L="; expires="+C.toGMTString()
}else{L=""
}document.cookie=B+"_"+K+"="+A+L+"; path=/"
};
jQuery.fn.mb_getCookie=function(C){var J=E(this).attr("id");
if(!J){J=""
}var A=C+"_"+J+"=";
var K=document.cookie.split(";");
for(var B=0;
B<K.length;
B++){var L=K[B];
while(L.charAt(0)==" "){L=L.substring(1,L.length)
}if(L.indexOf(A)==0){return L.substring(A.length,L.length)
}}return null
};
jQuery.fn.mb_removeCookie=function(A){E(this).createCookie(A,"",-1)
}
})(jQuery);