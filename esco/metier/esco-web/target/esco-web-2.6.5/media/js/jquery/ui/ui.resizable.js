(function(A){A.widget("ui.resizable",A.extend({},A.ui.mouse,{_init:function(){var E=this,J=this.options;
this.element.addClass("ui-resizable");
A.extend(this,{_aspectRatio:!!(J.aspectRatio),aspectRatio:J.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:J.helper||J.ghost||J.animate?J.helper||"ui-resizable-helper":null});
if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){if(/relative/.test(this.element.css("position"))&&A.browser.opera){this.element.css({position:"relative",top:"auto",left:"auto"})
}this.element.wrap(A('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));
this.element=this.element.parent().data("resizable",this.element.data("resizable"));
this.elementIsWrapper=true;
this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});
this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});
this.originalResizeStyle=this.originalElement.css("resize");
this.originalElement.css("resize","none");
this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));
this.originalElement.css({margin:this.originalElement.css("margin")});
this._proportionallyResize()
}this.handles=J.handles||(!A(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});
if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"
}var I=this.handles.split(",");
this.handles={};
for(var H=0;
H<I.length;
H++){var G=A.trim(I[H]),F="ui-resizable-"+G;
var D=A('<div class="ui-resizable-handle '+F+'"></div>');
if(/sw|se|ne|nw/.test(G)){D.css({zIndex:++J.zIndex})
}if("se"==G){D.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
}this.handles[G]=".ui-resizable-"+G;
this.element.append(D)
}}this._renderAxis=function(N){N=N||this.element;
for(var K in this.handles){if(this.handles[K].constructor==String){this.handles[K]=A(this.handles[K],this.element).show()
}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var L=A(this.handles[K],this.element),M=0;
M=/sw|ne|nw|se|n|s/.test(K)?L.outerHeight():L.outerWidth();
var O=["padding",/ne|nw|n/.test(K)?"Top":/se|sw|s/.test(K)?"Bottom":/^e$/.test(K)?"Right":"Left"].join("");
N.css(O,M);
this._proportionallyResize()
}if(!A(this.handles[K]).length){continue
}}};
this._renderAxis(this.element);
this._handles=A(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!E.resizing){if(this.className){var K=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}E.axis=K&&K[1]?K[1]:"se"
}});
if(J.autoHide){this._handles.hide();
A(this.element).addClass("ui-resizable-autohide").hover(function(){A(this).removeClass("ui-resizable-autohide");
E._handles.show()
},function(){if(!E.resizing){A(this).addClass("ui-resizable-autohide");
E._handles.hide()
}})
}this._mouseInit()
},destroy:function(){this._mouseDestroy();
var D=function(F){A(F).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
};
if(this.elementIsWrapper){D(this.element);
var E=this.element;
E.parent().append(this.originalElement.css({position:E.css("position"),width:E.outerWidth(),height:E.outerHeight(),top:E.css("top"),left:E.css("left")})).end().remove()
}this.originalElement.css("resize",this.originalResizeStyle);
D(this.originalElement)
},_mouseCapture:function(D){var E=false;
for(var F in this.handles){if(A(this.handles[F])[0]==D.target){E=true
}}return this.options.disabled||!!E
},_mouseStart:function(J){var E=this.options,I=this.element.position(),H=this.element;
this.resizing=true;
this.documentScroll={top:A(document).scrollTop(),left:A(document).scrollLeft()};
if(H.is(".ui-draggable")||(/absolute/).test(H.css("position"))){H.css({position:"absolute",top:I.top,left:I.left})
}if(A.browser.opera&&(/relative/).test(H.css("position"))){H.css({position:"relative",top:"auto",left:"auto"})
}this._renderProxy();
var G=C(this.helper.css("left")),D=C(this.helper.css("top"));
if(E.containment){G+=A(E.containment).scrollLeft()||0;
D+=A(E.containment).scrollTop()||0
}this.offset=this.helper.offset();
this.position={left:G,top:D};
this.size=this._helper?{width:H.outerWidth(),height:H.outerHeight()}:{width:H.width(),height:H.height()};
this.originalSize=this._helper?{width:H.outerWidth(),height:H.outerHeight()}:{width:H.width(),height:H.height()};
this.originalPosition={left:G,top:D};
this.sizeDiff={width:H.outerWidth()-H.width(),height:H.outerHeight()-H.height()};
this.originalMousePosition={left:J.pageX,top:J.pageY};
this.aspectRatio=(typeof E.aspectRatio=="number")?E.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);
var F=A(".ui-resizable-"+this.axis).css("cursor");
A("body").css("cursor",F=="auto"?this.axis+"-resize":F);
H.addClass("ui-resizable-resizing");
this._propagate("start",J);
return true
},_mouseDrag:function(K){var J=this.helper,I=this.options,P={},E=this,M=this.originalMousePosition,D=this.axis;
var G=(K.pageX-M.left)||0,F=(K.pageY-M.top)||0;
var L=this._change[D];
if(!L){return false
}var O=L.apply(this,[K,G,F]),N=A.browser.msie&&A.browser.version<7,H=this.sizeDiff;
if(this._aspectRatio||K.shiftKey){O=this._updateRatio(O,K)
}O=this._respectSize(O,K);
this._propagate("resize",K);
J.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});
if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()
}this._updateCache(O);
this._trigger("resize",K,this.ui());
return false
},_mouseStop:function(K){this.resizing=false;
var L=this.options,F=this;
if(this._helper){var J=this._proportionallyResizeElements,H=J.length&&(/textarea/i).test(J[0].nodeName),I=H&&A.ui.hasScroll(J[0],"left")?0:F.sizeDiff.height,D=H?0:F.sizeDiff.width;
var G={width:(F.size.width-D),height:(F.size.height-I)},M=(parseInt(F.element.css("left"),10)+(F.position.left-F.originalPosition.left))||null,E=(parseInt(F.element.css("top"),10)+(F.position.top-F.originalPosition.top))||null;
if(!L.animate){this.element.css(A.extend(G,{top:E,left:M}))
}F.helper.height(F.size.height);
F.helper.width(F.size.width);
if(this._helper&&!L.animate){this._proportionallyResize()
}}A("body").css("cursor","auto");
this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",K);
if(this._helper){this.helper.remove()
}return false
},_updateCache:function(D){var E=this.options;
this.offset=this.helper.offset();
if(B(D.left)){this.position.left=D.left
}if(B(D.top)){this.position.top=D.top
}if(B(D.height)){this.size.height=D.height
}if(B(D.width)){this.size.width=D.width
}},_updateRatio:function(I,H){var E=this.options,F=this.position,G=this.size,D=this.axis;
if(I.height){I.width=(G.height*this.aspectRatio)
}else{if(I.width){I.height=(G.width/this.aspectRatio)
}}if(D=="sw"){I.left=F.left+(G.width-I.width);
I.top=null
}if(D=="nw"){I.top=F.top+(G.height-I.height);
I.left=F.left+(G.width-I.width)
}return I
},_respectSize:function(E,N){var O=this.helper,F=this.options,L=this._aspectRatio||N.shiftKey,K=this.axis,Q=B(E.width)&&F.maxWidth&&(F.maxWidth<E.width),G=B(E.height)&&F.maxHeight&&(F.maxHeight<E.height),D=B(E.width)&&F.minWidth&&(F.minWidth>E.width),I=B(E.height)&&F.minHeight&&(F.minHeight>E.height);
if(D){E.width=F.minWidth
}if(I){E.height=F.minHeight
}if(Q){E.width=F.maxWidth
}if(G){E.height=F.maxHeight
}var M=this.originalPosition.left+this.originalSize.width,J=this.position.top+this.size.height;
var P=/sw|nw|w/.test(K),R=/nw|ne|n/.test(K);
if(D&&P){E.left=M-F.minWidth
}if(Q&&P){E.left=M-F.maxWidth
}if(I&&R){E.top=J-F.minHeight
}if(G&&R){E.top=J-F.maxHeight
}var H=!E.width&&!E.height;
if(H&&!E.left&&E.top){E.top=null
}else{if(H&&!E.top&&E.left){E.left=null
}}return E
},_proportionallyResize:function(){var F=this.options;
if(!this._proportionallyResizeElements.length){return 
}var H=this.helper||this.element;
for(var G=0;
G<this._proportionallyResizeElements.length;
G++){var I=this._proportionallyResizeElements[G];
if(!this.borderDif){var E=[I.css("borderTopWidth"),I.css("borderRightWidth"),I.css("borderBottomWidth"),I.css("borderLeftWidth")],D=[I.css("paddingTop"),I.css("paddingRight"),I.css("paddingBottom"),I.css("paddingLeft")];
this.borderDif=A.map(E,function(J,L){var K=parseInt(J,10)||0,M=parseInt(D[L],10)||0;
return K+M
})
}if(A.browser.msie&&!(!(A(H).is(":hidden")||A(H).parents(":hidden").length))){continue
}I.css({height:(H.height()-this.borderDif[0]-this.borderDif[2])||0,width:(H.width()-this.borderDif[1]-this.borderDif[3])||0})
}},_renderProxy:function(){var G=this.element,E=this.options;
this.elementOffset=G.offset();
if(this._helper){this.helper=this.helper||A('<div style="overflow:hidden;"></div>');
var F=A.browser.msie&&A.browser.version<7,H=(F?1:0),D=(F?2:-1);
this.helper.addClass(this._helper).css({width:this.element.outerWidth()+D,height:this.element.outerHeight()+D,position:"absolute",left:this.elementOffset.left-H+"px",top:this.elementOffset.top-H+"px",zIndex:++E.zIndex});
this.helper.appendTo("body").disableSelection()
}else{this.helper=this.element
}},_change:{e:function(E,D,F){return{width:this.originalSize.width+D}
},w:function(I,G,F){var E=this.options,H=this.originalSize,D=this.originalPosition;
return{left:D.left+G,width:H.width-G}
},n:function(I,G,F){var E=this.options,H=this.originalSize,D=this.originalPosition;
return{top:D.top+F,height:H.height-F}
},s:function(E,D,F){return{height:this.originalSize.height+F}
},se:function(E,D,F){return A.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[E,D,F]))
},sw:function(E,D,F){return A.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[E,D,F]))
},ne:function(E,D,F){return A.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[E,D,F]))
},nw:function(E,D,F){return A.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[E,D,F]))
}},_propagate:function(E,D){A.ui.plugin.call(this,E,[D,this.ui()]);
(E!="resize"&&this._trigger(E,D,this.ui()))
},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
}}));
A.extend(A.ui.resizable,{version:"1.7.2",eventPrefix:"resize",defaults:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,cancel:":input,option",containment:false,delay:0,distance:1,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000}});
A.ui.plugin.add("resizable","alsoResize",{start:function(G,D){var F=A(this).data("resizable"),E=F.options;
_store=function(H){A(H).each(function(){A(this).data("resizable-alsoresize",{width:parseInt(A(this).width(),10),height:parseInt(A(this).height(),10),left:parseInt(A(this).css("left"),10),top:parseInt(A(this).css("top"),10)})
})
};
if(typeof (E.alsoResize)=="object"&&!E.alsoResize.parentNode){if(E.alsoResize.length){E.alsoResize=E.alsoResize[0];
_store(E.alsoResize)
}else{A.each(E.alsoResize,function(H,I){_store(H)
})
}}else{_store(E.alsoResize)
}},resize:function(I,G){var K=A(this).data("resizable"),E=K.options,D=K.originalSize,F=K.originalPosition;
var J={height:(K.size.height-D.height)||0,width:(K.size.width-D.width)||0,top:(K.position.top-F.top)||0,left:(K.position.left-F.left)||0},H=function(L,M){A(L).each(function(){var N=A(this),O=A(this).data("resizable-alsoresize"),Q={},P=M&&M.length?M:["width","height","top","left"];
A.each(P||["width","height","top","left"],function(R,T){var S=(O[T]||0)+(J[T]||0);
if(S&&S>=0){Q[T]=S||null
}});
if(/relative/.test(N.css("position"))&&A.browser.opera){K._revertToRelativePosition=true;
N.css({position:"absolute",top:"auto",left:"auto"})
}N.css(Q)
})
};
if(typeof (E.alsoResize)=="object"&&!E.alsoResize.nodeType){A.each(E.alsoResize,function(L,M){H(L,M)
})
}else{H(E.alsoResize)
}},stop:function(D,E){var F=A(this).data("resizable");
if(F._revertToRelativePosition&&A.browser.opera){F._revertToRelativePosition=false;
el.css({position:"relative"})
}A(this).removeData("resizable-alsoresize-start")
}});
A.ui.plugin.add("resizable","animate",{stop:function(L,F){var G=A(this).data("resizable"),M=G.options;
var K=G._proportionallyResizeElements,H=K.length&&(/textarea/i).test(K[0].nodeName),I=H&&A.ui.hasScroll(K[0],"left")?0:G.sizeDiff.height,D=H?0:G.sizeDiff.width;
var J={width:(G.size.width-D),height:(G.size.height-I)},N=(parseInt(G.element.css("left"),10)+(G.position.left-G.originalPosition.left))||null,E=(parseInt(G.element.css("top"),10)+(G.position.top-G.originalPosition.top))||null;
G.element.animate(A.extend(J,E&&N?{top:E,left:N}:{}),{duration:M.animateDuration,easing:M.animateEasing,step:function(){var O={width:parseInt(G.element.css("width"),10),height:parseInt(G.element.css("height"),10),top:parseInt(G.element.css("top"),10),left:parseInt(G.element.css("left"),10)};
if(K&&K.length){A(K[0]).css({width:O.width,height:O.height})
}G._updateCache(O);
G._propagate("resize",L)
}})
}});
A.ui.plugin.add("resizable","containment",{start:function(D,O){var E=A(this).data("resizable"),I=E.options,K=E.element;
var G=I.containment,J=(G instanceof A)?G.get(0):(/parent/.test(G))?K.parent().get(0):G;
if(!J){return 
}E.containerElement=A(J);
if(/document/.test(G)||G==document){E.containerOffset={left:0,top:0};
E.containerPosition={left:0,top:0};
E.parentData={element:A(document),left:0,top:0,width:A(document).width(),height:A(document).height()||document.body.parentNode.scrollHeight}
}else{var M=A(J),Q=[];
A(["Top","Right","Left","Bottom"]).each(function(S,R){Q[S]=C(M.css("padding"+R))
});
E.containerOffset=M.offset();
E.containerPosition=M.position();
E.containerSize={height:(M.innerHeight()-Q[3]),width:(M.innerWidth()-Q[1])};
var N=E.containerOffset,F=E.containerSize.height,L=E.containerSize.width,P=(A.ui.hasScroll(J,"left")?J.scrollWidth:L),H=(A.ui.hasScroll(J)?J.scrollHeight:F);
E.parentData={element:J,left:N.left,top:N.top,width:P,height:H}
}},resize:function(N,K){var Q=A(this).data("resizable"),F=Q.options,M=Q.containerSize,J=Q.containerOffset,G=Q.size,I=Q.position,L=Q._aspectRatio||N.shiftKey,E={top:0,left:0},D=Q.containerElement;
if(D[0]!=document&&(/static/).test(D.css("position"))){E=J
}if(I.left<(Q._helper?J.left:0)){Q.size.width=Q.size.width+(Q._helper?(Q.position.left-J.left):(Q.position.left-E.left));
if(L){Q.size.height=Q.size.width/F.aspectRatio
}Q.position.left=F.helper?J.left:0
}if(I.top<(Q._helper?J.top:0)){Q.size.height=Q.size.height+(Q._helper?(Q.position.top-J.top):Q.position.top);
if(L){Q.size.width=Q.size.height*F.aspectRatio
}Q.position.top=Q._helper?J.top:0
}Q.offset.left=Q.parentData.left+Q.position.left;
Q.offset.top=Q.parentData.top+Q.position.top;
var R=Math.abs((Q._helper?Q.offset.left-E.left:(Q.offset.left-E.left))+Q.sizeDiff.width),O=Math.abs((Q._helper?Q.offset.top-E.top:(Q.offset.top-J.top))+Q.sizeDiff.height);
var P=Q.containerElement.get(0)==Q.element.parent().get(0),H=/relative|absolute/.test(Q.containerElement.css("position"));
if(P&&H){R-=Q.parentData.left
}if(R+Q.size.width>=Q.parentData.width){Q.size.width=Q.parentData.width-R;
if(L){Q.size.height=Q.size.width/Q.aspectRatio
}}if(O+Q.size.height>=Q.parentData.height){Q.size.height=Q.parentData.height-O;
if(L){Q.size.width=Q.size.height*Q.aspectRatio
}}},stop:function(H,D){var G=A(this).data("resizable"),J=G.options,N=G.position,O=G.containerOffset,I=G.containerPosition,K=G.containerElement;
var L=A(G.helper),F=L.offset(),E=L.outerWidth()-G.sizeDiff.width,M=L.outerHeight()-G.sizeDiff.height;
if(G._helper&&!J.animate&&(/relative/).test(K.css("position"))){A(this).css({left:F.left-I.left-O.left,width:E,height:M})
}if(G._helper&&!J.animate&&(/static/).test(K.css("position"))){A(this).css({left:F.left-I.left-O.left,width:E,height:M})
}}});
A.ui.plugin.add("resizable","ghost",{start:function(H,D){var F=A(this).data("resizable"),E=F.options,G=F.size;
F.ghost=F.originalElement.clone();
F.ghost.css({opacity:0.25,display:"block",position:"relative",height:G.height,width:G.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof E.ghost=="string"?E.ghost:"");
F.ghost.appendTo(F.helper)
},resize:function(G,D){var F=A(this).data("resizable"),E=F.options;
if(F.ghost){F.ghost.css({position:"relative",height:F.size.height,width:F.size.width})
}},stop:function(G,D){var F=A(this).data("resizable"),E=F.options;
if(F.ghost&&F.helper){F.helper.get(0).removeChild(F.ghost.get(0))
}}});
A.ui.plugin.add("resizable","grid",{resize:function(H,E){var G=A(this).data("resizable"),K=G.options,N=G.size,L=G.originalSize,M=G.originalPosition,F=G.axis,D=K._aspectRatio||H.shiftKey;
K.grid=typeof K.grid=="number"?[K.grid,K.grid]:K.grid;
var J=Math.round((N.width-L.width)/(K.grid[0]||1))*(K.grid[0]||1),I=Math.round((N.height-L.height)/(K.grid[1]||1))*(K.grid[1]||1);
if(/^(se|s|e)$/.test(F)){G.size.width=L.width+J;
G.size.height=L.height+I
}else{if(/^(ne)$/.test(F)){G.size.width=L.width+J;
G.size.height=L.height+I;
G.position.top=M.top-I
}else{if(/^(sw)$/.test(F)){G.size.width=L.width+J;
G.size.height=L.height+I;
G.position.left=M.left-J
}else{G.size.width=L.width+J;
G.size.height=L.height+I;
G.position.top=M.top-I;
G.position.left=M.left-J
}}}}});
var C=function(D){return parseInt(D,10)||0
};
var B=function(D){return !isNaN(parseInt(D,10))
}
})(jQuery);