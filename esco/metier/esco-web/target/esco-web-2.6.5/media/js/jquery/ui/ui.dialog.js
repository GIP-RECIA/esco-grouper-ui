(function(D){var E={dragStart:"start.draggable",drag:"drag.draggable",dragStop:"stop.draggable",maxHeight:"maxHeight.resizable",minHeight:"minHeight.resizable",maxWidth:"maxWidth.resizable",minWidth:"minWidth.resizable",resizeStart:"start.resizable",resize:"drag.resizable",resizeStop:"stop.resizable"},F="ui-dialog ui-widget ui-widget-content ui-corner-all ";
D.widget("ui.dialog",{_init:function(){this.originalTitle=this.element.attr("title");
var S=this,R=this.options,A=R.title||this.originalTitle||"&nbsp;",P=D.ui.dialog.getTitleId(this.element),T=(this.uiDialog=D("<div/>")).appendTo(document.body).hide().addClass(F+R.dialogClass).css({position:"absolute",overflow:"hidden",zIndex:R.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(G){(R.closeOnEscape&&G.keyCode&&G.keyCode==D.ui.keyCode.ESCAPE&&S.close(G))
}).attr({role:"dialog","aria-labelledby":P}).mousedown(function(G){S.moveToTop(false,G)
}),N=this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(T),O=(this.uiDialogTitlebar=D("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(T),B=D('<a href="#"/>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){B.addClass("ui-state-hover")
},function(){B.removeClass("ui-state-hover")
}).focus(function(){B.addClass("ui-state-focus")
}).blur(function(){B.removeClass("ui-state-focus")
}).mousedown(function(G){G.stopPropagation()
}).click(function(G){S.close(G);
return false
}).appendTo(O),C=(this.uiDialogTitlebarCloseText=D("<span/>")).addClass("ui-icon ui-icon-closethick").text(R.closeText).appendTo(B),Q=D("<span/>").addClass("ui-dialog-title").attr("id",P).html(A).prependTo(O);
O.find("*").add(O).disableSelection();
(R.draggable&&D.fn.draggable&&this._makeDraggable());
(R.resizable&&D.fn.resizable&&this._makeResizable());
this._createButtons(R.buttons);
this._isOpen=false;
(R.bgiframe&&D.fn.bgiframe&&T.bgiframe());
(R.autoOpen&&this.open())
},destroy:function(){(this.overlay&&this.overlay.destroy());
this.uiDialog.hide();
this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
this.uiDialog.remove();
(this.originalTitle&&this.element.attr("title",this.originalTitle))
},close:function(B){var A=this;
if(false===A._trigger("beforeclose",B)){return 
}(A.overlay&&A.overlay.destroy());
A.uiDialog.unbind("keypress.ui-dialog");
(A.options.hide?A.uiDialog.hide(A.options.hide,function(){A._trigger("close",B)
}):A.uiDialog.hide()&&A._trigger("close",B));
D.ui.dialog.overlay.resize();
A._isOpen=false;
if(A.options.modal){var C=0;
D(".ui-dialog").each(function(){if(this!=A.uiDialog[0]){C=Math.max(C,D(this).css("z-index"))
}});
D.ui.dialog.maxZ=C
}},isOpen:function(){return this._isOpen
},moveToTop:function(B,C){if((this.options.modal&&!B)||(!this.options.stack&&!this.options.modal)){return this._trigger("focus",C)
}if(this.options.zIndex>D.ui.dialog.maxZ){D.ui.dialog.maxZ=this.options.zIndex
}(this.overlay&&this.overlay.$el.css("z-index",D.ui.dialog.overlay.maxZ=++D.ui.dialog.maxZ));
var A={scrollTop:this.element.attr("scrollTop"),scrollLeft:this.element.attr("scrollLeft")};
this.uiDialog.css("z-index",++D.ui.dialog.maxZ);
this.element.attr(A);
this._trigger("focus",C)
},open:function(){if(this._isOpen){return 
}var A=this.options,B=this.uiDialog;
this.overlay=A.modal?new D.ui.dialog.overlay(this):null;
(B.next().length&&B.appendTo("body"));
this._size();
this._position(A.position);
B.show(A.show);
this.moveToTop(true);
(A.modal&&B.bind("keypress.ui-dialog",function(J){if(J.keyCode!=D.ui.keyCode.TAB){return 
}var K=D(":tabbable",this),C=K.filter(":first")[0],L=K.filter(":last")[0];
if(J.target==L&&!J.shiftKey){setTimeout(function(){C.focus()
},1)
}else{if(J.target==C&&J.shiftKey){setTimeout(function(){L.focus()
},1)
}}}));
D([]).add(B.find(".ui-dialog-content :tabbable:first")).add(B.find(".ui-dialog-buttonpane :tabbable:first")).add(B).filter(":first").focus();
this._trigger("open");
this._isOpen=true
},_createButtons:function(C){var H=this,B=false,A=D("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
this.uiDialog.find(".ui-dialog-buttonpane").remove();
(typeof C=="object"&&C!==null&&D.each(C,function(){return !(B=true)
}));
if(B){D.each(C,function(J,G){D('<button type="button"></button>').addClass("ui-state-default ui-corner-all").text(J).click(function(){G.apply(H.element[0],arguments)
}).hover(function(){D(this).addClass("ui-state-hover")
},function(){D(this).removeClass("ui-state-hover")
}).focus(function(){D(this).addClass("ui-state-focus")
}).blur(function(){D(this).removeClass("ui-state-focus")
}).appendTo(A)
});
A.appendTo(this.uiDialog)
}},_makeDraggable:function(){var A=this,B=this.options,C;
this.uiDialog.draggable({cancel:".ui-dialog-content",handle:".ui-dialog-titlebar",containment:"document",start:function(){C=B.height;
D(this).height(D(this).height()).addClass("ui-dialog-dragging");
(B.dragStart&&B.dragStart.apply(A.element[0],arguments))
},drag:function(){(B.drag&&B.drag.apply(A.element[0],arguments))
},stop:function(){D(this).removeClass("ui-dialog-dragging").height(C);
(B.dragStop&&B.dragStop.apply(A.element[0],arguments));
D.ui.dialog.overlay.resize()
}})
},_makeResizable:function(C){C=(C===undefined?this.options.resizable:C);
var B=this,H=this.options,A=typeof C=="string"?C:"n,e,s,w,se,sw,ne,nw";
this.uiDialog.resizable({cancel:".ui-dialog-content",alsoResize:this.element,maxWidth:H.maxWidth,maxHeight:H.maxHeight,minWidth:H.minWidth,minHeight:H.minHeight,start:function(){D(this).addClass("ui-dialog-resizing");
(H.resizeStart&&H.resizeStart.apply(B.element[0],arguments))
},resize:function(){(H.resize&&H.resize.apply(B.element[0],arguments))
},handles:A,stop:function(){D(this).removeClass("ui-dialog-resizing");
H.height=D(this).height();
H.width=D(this).width();
(H.resizeStop&&H.resizeStop.apply(B.element[0],arguments));
D.ui.dialog.overlay.resize()
}}).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_position:function(J){var C=D(window),B=D(document),A=B.scrollTop(),K=B.scrollLeft(),L=A;
if(D.inArray(J,["center","top","right","bottom","left"])>=0){J=[J=="right"||J=="left"?J:"center",J=="top"||J=="bottom"?J:"middle"]
}if(J.constructor!=Array){J=["center","middle"]
}if(J[0].constructor==Number){K+=J[0]
}else{switch(J[0]){case"left":K+=0;
break;
case"right":K+=C.width()-this.uiDialog.outerWidth();
break;
default:case"center":K+=(C.width()-this.uiDialog.outerWidth())/2
}}if(J[1].constructor==Number){A+=J[1]
}else{switch(J[1]){case"top":A+=0;
break;
case"bottom":A+=C.height()-this.uiDialog.outerHeight();
break;
default:case"middle":A+=(C.height()-this.uiDialog.outerHeight())/2
}}A=Math.max(A,L);
this.uiDialog.css({top:A,left:K})
},_setData:function(A,H){(E[A]&&this.uiDialog.data(E[A],H));
switch(A){case"buttons":this._createButtons(H);
break;
case"closeText":this.uiDialogTitlebarCloseText.text(H);
break;
case"dialogClass":this.uiDialog.removeClass(this.options.dialogClass).addClass(F+H);
break;
case"draggable":(H?this._makeDraggable():this.uiDialog.draggable("destroy"));
break;
case"height":this.uiDialog.height(H);
break;
case"position":this._position(H);
break;
case"resizable":var B=this.uiDialog,C=this.uiDialog.is(":data(resizable)");
(C&&!H&&B.resizable("destroy"));
(C&&typeof H=="string"&&B.resizable("option","handles",H));
(C||this._makeResizable(H));
break;
case"title":D(".ui-dialog-title",this.uiDialogTitlebar).html(H||"&nbsp;");
break;
case"width":this.uiDialog.width(H);
break
}D.widget.prototype._setData.apply(this,arguments)
},_size:function(){var A=this.options;
this.element.css({height:0,minHeight:0,width:"auto"});
var B=this.uiDialog.css({height:"auto",width:A.width}).height();
this.element.css({minHeight:Math.max(A.minHeight-B,0),height:A.height=="auto"?"auto":Math.max(A.height-B,0)})
}});
D.extend(D.ui.dialog,{version:"1.7.2",defaults:{autoOpen:true,bgiframe:false,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:"center",resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},getter:"isOpen",uuid:0,maxZ:0,getTitleId:function(A){return"ui-dialog-title-"+(A.attr("id")||++this.uuid)
},overlay:function(A){this.$el=D.ui.dialog.overlay.create(A)
}});
D.extend(D.ui.dialog.overlay,{instances:[],maxZ:0,events:D.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(A){return A+".dialog-overlay"
}).join(" "),create:function(A){if(this.instances.length===0){setTimeout(function(){if(D.ui.dialog.overlay.instances.length){D(document).bind(D.ui.dialog.overlay.events,function(H){var C=D(H.target).parents(".ui-dialog").css("zIndex")||0;
return(C>D.ui.dialog.overlay.maxZ)
})
}},1);
D(document).bind("keydown.dialog-overlay",function(C){(A.options.closeOnEscape&&C.keyCode&&C.keyCode==D.ui.keyCode.ESCAPE&&A.close(C))
});
D(window).bind("resize.dialog-overlay",D.ui.dialog.overlay.resize)
}var B=D("<div></div>").appendTo(document.body).addClass("ui-widget-overlay").css({width:this.width(),height:this.height()});
(A.options.bgiframe&&D.fn.bgiframe&&B.bgiframe());
this.instances.push(B);
return B
},destroy:function(B){this.instances.splice(D.inArray(this.instances,B),1);
if(this.instances.length===0){D([document,window]).unbind(".dialog-overlay")
}B.remove();
var A=0;
D.each(this.instances,function(){A=Math.max(A,this.css("z-index"))
});
this.maxZ=A
},height:function(){if(D.browser.msie&&D.browser.version<7){var A=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
var B=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
if(A<B){return D(window).height()+"px"
}else{return A+"px"
}}else{return D(document).height()+"px"
}},width:function(){if(D.browser.msie&&D.browser.version<7){var B=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
var A=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
if(B<A){return D(window).width()+"px"
}else{return B+"px"
}}else{return D(document).width()+"px"
}},resize:function(){var A=D([]);
D.each(D.ui.dialog.overlay.instances,function(){A=A.add(this)
});
A.css({width:0,height:0}).css({width:D.ui.dialog.overlay.width(),height:D.ui.dialog.overlay.height()})
}});
D.extend(D.ui.dialog.overlay.prototype,{destroy:function(){D.ui.dialog.overlay.destroy(this.$el)
}})
})(jQuery);