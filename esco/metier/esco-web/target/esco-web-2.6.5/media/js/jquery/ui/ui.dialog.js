(function(A){var C={dragStart:"start.draggable",drag:"drag.draggable",dragStop:"stop.draggable",maxHeight:"maxHeight.resizable",minHeight:"minHeight.resizable",maxWidth:"maxWidth.resizable",minWidth:"minWidth.resizable",resizeStart:"start.resizable",resize:"drag.resizable",resizeStop:"stop.resizable"},B="ui-dialog ui-widget ui-widget-content ui-corner-all ";
A.widget("ui.dialog",{_init:function(){this.originalTitle=this.element.attr("title");
var F=this,G=this.options,D=G.title||this.originalTitle||"&nbsp;",I=A.ui.dialog.getTitleId(this.element),E=(this.uiDialog=A("<div/>")).appendTo(document.body).hide().addClass(B+G.dialogClass).css({position:"absolute",overflow:"hidden",zIndex:G.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(N){(G.closeOnEscape&&N.keyCode&&N.keyCode==A.ui.keyCode.ESCAPE&&F.close(N))
}).attr({role:"dialog","aria-labelledby":I}).mousedown(function(N){F.moveToTop(false,N)
}),K=this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(E),J=(this.uiDialogTitlebar=A("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(E),M=A('<a href="#"/>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){M.addClass("ui-state-hover")
},function(){M.removeClass("ui-state-hover")
}).focus(function(){M.addClass("ui-state-focus")
}).blur(function(){M.removeClass("ui-state-focus")
}).mousedown(function(N){N.stopPropagation()
}).click(function(N){F.close(N);
return false
}).appendTo(J),L=(this.uiDialogTitlebarCloseText=A("<span/>")).addClass("ui-icon ui-icon-closethick").text(G.closeText).appendTo(M),H=A("<span/>").addClass("ui-dialog-title").attr("id",I).html(D).prependTo(J);
J.find("*").add(J).disableSelection();
(G.draggable&&A.fn.draggable&&this._makeDraggable());
(G.resizable&&A.fn.resizable&&this._makeResizable());
this._createButtons(G.buttons);
this._isOpen=false;
(G.bgiframe&&A.fn.bgiframe&&E.bgiframe());
(G.autoOpen&&this.open())
},destroy:function(){(this.overlay&&this.overlay.destroy());
this.uiDialog.hide();
this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
this.uiDialog.remove();
(this.originalTitle&&this.element.attr("title",this.originalTitle))
},close:function(E){var F=this;
if(false===F._trigger("beforeclose",E)){return 
}(F.overlay&&F.overlay.destroy());
F.uiDialog.unbind("keypress.ui-dialog");
(F.options.hide?F.uiDialog.hide(F.options.hide,function(){F._trigger("close",E)
}):F.uiDialog.hide()&&F._trigger("close",E));
A.ui.dialog.overlay.resize();
F._isOpen=false;
if(F.options.modal){var D=0;
A(".ui-dialog").each(function(){if(this!=F.uiDialog[0]){D=Math.max(D,A(this).css("z-index"))
}});
A.ui.dialog.maxZ=D
}},isOpen:function(){return this._isOpen
},moveToTop:function(E,D){if((this.options.modal&&!E)||(!this.options.stack&&!this.options.modal)){return this._trigger("focus",D)
}if(this.options.zIndex>A.ui.dialog.maxZ){A.ui.dialog.maxZ=this.options.zIndex
}(this.overlay&&this.overlay.$el.css("z-index",A.ui.dialog.overlay.maxZ=++A.ui.dialog.maxZ));
var F={scrollTop:this.element.attr("scrollTop"),scrollLeft:this.element.attr("scrollLeft")};
this.uiDialog.css("z-index",++A.ui.dialog.maxZ);
this.element.attr(F);
this._trigger("focus",D)
},open:function(){if(this._isOpen){return 
}var E=this.options,D=this.uiDialog;
this.overlay=E.modal?new A.ui.dialog.overlay(this):null;
(D.next().length&&D.appendTo("body"));
this._size();
this._position(E.position);
D.show(E.show);
this.moveToTop(true);
(E.modal&&D.bind("keypress.ui-dialog",function(H){if(H.keyCode!=A.ui.keyCode.TAB){return 
}var G=A(":tabbable",this),I=G.filter(":first")[0],F=G.filter(":last")[0];
if(H.target==F&&!H.shiftKey){setTimeout(function(){I.focus()
},1)
}else{if(H.target==I&&H.shiftKey){setTimeout(function(){F.focus()
},1)
}}}));
A([]).add(D.find(".ui-dialog-content :tabbable:first")).add(D.find(".ui-dialog-buttonpane :tabbable:first")).add(D).filter(":first").focus();
this._trigger("open");
this._isOpen=true
},_createButtons:function(E){var D=this,F=false,G=A("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
this.uiDialog.find(".ui-dialog-buttonpane").remove();
(typeof E=="object"&&E!==null&&A.each(E,function(){return !(F=true)
}));
if(F){A.each(E,function(H,I){A('<button type="button"></button>').addClass("ui-state-default ui-corner-all").text(H).click(function(){I.apply(D.element[0],arguments)
}).hover(function(){A(this).addClass("ui-state-hover")
},function(){A(this).removeClass("ui-state-hover")
}).focus(function(){A(this).addClass("ui-state-focus")
}).blur(function(){A(this).removeClass("ui-state-focus")
}).appendTo(G)
});
G.appendTo(this.uiDialog)
}},_makeDraggable:function(){var F=this,E=this.options,D;
this.uiDialog.draggable({cancel:".ui-dialog-content",handle:".ui-dialog-titlebar",containment:"document",start:function(){D=E.height;
A(this).height(A(this).height()).addClass("ui-dialog-dragging");
(E.dragStart&&E.dragStart.apply(F.element[0],arguments))
},drag:function(){(E.drag&&E.drag.apply(F.element[0],arguments))
},stop:function(){A(this).removeClass("ui-dialog-dragging").height(D);
(E.dragStop&&E.dragStop.apply(F.element[0],arguments));
A.ui.dialog.overlay.resize()
}})
},_makeResizable:function(E){E=(E===undefined?this.options.resizable:E);
var F=this,D=this.options,G=typeof E=="string"?E:"n,e,s,w,se,sw,ne,nw";
this.uiDialog.resizable({cancel:".ui-dialog-content",alsoResize:this.element,maxWidth:D.maxWidth,maxHeight:D.maxHeight,minWidth:D.minWidth,minHeight:D.minHeight,start:function(){A(this).addClass("ui-dialog-resizing");
(D.resizeStart&&D.resizeStart.apply(F.element[0],arguments))
},resize:function(){(D.resize&&D.resize.apply(F.element[0],arguments))
},handles:G,stop:function(){A(this).removeClass("ui-dialog-resizing");
D.height=A(this).height();
D.width=A(this).width();
(D.resizeStop&&D.resizeStop.apply(F.element[0],arguments));
A.ui.dialog.overlay.resize()
}}).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_position:function(F){var G=A(window),H=A(document),I=H.scrollTop(),E=H.scrollLeft(),D=I;
if(A.inArray(F,["center","top","right","bottom","left"])>=0){F=[F=="right"||F=="left"?F:"center",F=="top"||F=="bottom"?F:"middle"]
}if(F.constructor!=Array){F=["center","middle"]
}if(F[0].constructor==Number){E+=F[0]
}else{switch(F[0]){case"left":E+=0;
break;
case"right":E+=G.width()-this.uiDialog.outerWidth();
break;
default:case"center":E+=(G.width()-this.uiDialog.outerWidth())/2
}}if(F[1].constructor==Number){I+=F[1]
}else{switch(F[1]){case"top":I+=0;
break;
case"bottom":I+=G.height()-this.uiDialog.outerHeight();
break;
default:case"middle":I+=(G.height()-this.uiDialog.outerHeight())/2
}}I=Math.max(I,D);
this.uiDialog.css({top:I,left:E})
},_setData:function(G,D){(C[G]&&this.uiDialog.data(C[G],D));
switch(G){case"buttons":this._createButtons(D);
break;
case"closeText":this.uiDialogTitlebarCloseText.text(D);
break;
case"dialogClass":this.uiDialog.removeClass(this.options.dialogClass).addClass(B+D);
break;
case"draggable":(D?this._makeDraggable():this.uiDialog.draggable("destroy"));
break;
case"height":this.uiDialog.height(D);
break;
case"position":this._position(D);
break;
case"resizable":var F=this.uiDialog,E=this.uiDialog.is(":data(resizable)");
(E&&!D&&F.resizable("destroy"));
(E&&typeof D=="string"&&F.resizable("option","handles",D));
(E||this._makeResizable(D));
break;
case"title":A(".ui-dialog-title",this.uiDialogTitlebar).html(D||"&nbsp;");
break;
case"width":this.uiDialog.width(D);
break
}A.widget.prototype._setData.apply(this,arguments)
},_size:function(){var E=this.options;
this.element.css({height:0,minHeight:0,width:"auto"});
var D=this.uiDialog.css({height:"auto",width:E.width}).height();
this.element.css({minHeight:Math.max(E.minHeight-D,0),height:E.height=="auto"?"auto":Math.max(E.height-D,0)})
}});
A.extend(A.ui.dialog,{version:"1.7.2",defaults:{autoOpen:true,bgiframe:false,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:"center",resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},getter:"isOpen",uuid:0,maxZ:0,getTitleId:function(D){return"ui-dialog-title-"+(D.attr("id")||++this.uuid)
},overlay:function(D){this.$el=A.ui.dialog.overlay.create(D)
}});
A.extend(A.ui.dialog.overlay,{instances:[],maxZ:0,events:A.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(D){return D+".dialog-overlay"
}).join(" "),create:function(E){if(this.instances.length===0){setTimeout(function(){if(A.ui.dialog.overlay.instances.length){A(document).bind(A.ui.dialog.overlay.events,function(F){var G=A(F.target).parents(".ui-dialog").css("zIndex")||0;
return(G>A.ui.dialog.overlay.maxZ)
})
}},1);
A(document).bind("keydown.dialog-overlay",function(F){(E.options.closeOnEscape&&F.keyCode&&F.keyCode==A.ui.keyCode.ESCAPE&&E.close(F))
});
A(window).bind("resize.dialog-overlay",A.ui.dialog.overlay.resize)
}var D=A("<div></div>").appendTo(document.body).addClass("ui-widget-overlay").css({width:this.width(),height:this.height()});
(E.options.bgiframe&&A.fn.bgiframe&&D.bgiframe());
this.instances.push(D);
return D
},destroy:function(D){this.instances.splice(A.inArray(this.instances,D),1);
if(this.instances.length===0){A([document,window]).unbind(".dialog-overlay")
}D.remove();
var E=0;
A.each(this.instances,function(){E=Math.max(E,this.css("z-index"))
});
this.maxZ=E
},height:function(){if(A.browser.msie&&A.browser.version<7){var E=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
var D=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
if(E<D){return A(window).height()+"px"
}else{return E+"px"
}}else{return A(document).height()+"px"
}},width:function(){if(A.browser.msie&&A.browser.version<7){var D=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
var E=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
if(D<E){return A(window).width()+"px"
}else{return D+"px"
}}else{return A(document).width()+"px"
}},resize:function(){var D=A([]);
A.each(A.ui.dialog.overlay.instances,function(){D=D.add(this)
});
D.css({width:0,height:0}).css({width:A.ui.dialog.overlay.width(),height:A.ui.dialog.overlay.height()})
}});
A.extend(A.ui.dialog.overlay.prototype,{destroy:function(){A.ui.dialog.overlay.destroy(this.$el)
}})
})(jQuery);