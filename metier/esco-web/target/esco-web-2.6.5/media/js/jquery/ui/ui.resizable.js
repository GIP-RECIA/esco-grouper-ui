(function(D){D.widget("ui.resizable",D.extend({},D.ui.mouse,{_init:function(){var M=this,A=this.options;
this.element.addClass("ui-resizable");
D.extend(this,{_aspectRatio:!!(A.aspectRatio),aspectRatio:A.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:A.helper||A.ghost||A.animate?A.helper||"ui-resizable-helper":null});
if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){if(/relative/.test(this.element.css("position"))&&D.browser.opera){this.element.css({position:"relative",top:"auto",left:"auto"})
}this.element.wrap(D('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));
this.element=this.element.parent().data("resizable",this.element.data("resizable"));
this.elementIsWrapper=true;
this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});
this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});
this.originalResizeStyle=this.originalElement.css("resize");
this.originalElement.css("resize","none");
this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));
this.originalElement.css({margin:this.originalElement.css("margin")});
this._proportionallyResize()
}this.handles=A.handles||(!D(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});
if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"
}var B=this.handles.split(",");
this.handles={};
for(var C=0;
C<B.length;
C++){var K=D.trim(B[C]),L="ui-resizable-"+K;
var N=D('<div class="ui-resizable-handle '+L+'"></div>');
if(/sw|se|ne|nw/.test(K)){N.css({zIndex:++A.zIndex})
}if("se"==K){N.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
}this.handles[K]=".ui-resizable-"+K;
this.element.append(N)
}}this._renderAxis=function(J){J=J||this.element;
for(var H in this.handles){if(this.handles[H].constructor==String){this.handles[H]=D(this.handles[H],this.element).show()
}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var G=D(this.handles[H],this.element),P=0;
P=/sw|ne|nw|se|n|s/.test(H)?G.outerHeight():G.outerWidth();
var I=["padding",/ne|nw|n/.test(H)?"Top":/se|sw|s/.test(H)?"Bottom":/^e$/.test(H)?"Right":"Left"].join("");
J.css(I,P);
this._proportionallyResize()
}if(!D(this.handles[H]).length){continue
}}};
this._renderAxis(this.element);
this._handles=D(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!M.resizing){if(this.className){var G=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}M.axis=G&&G[1]?G[1]:"se"
}});
if(A.autoHide){this._handles.hide();
D(this.element).addClass("ui-resizable-autohide").hover(function(){D(this).removeClass("ui-resizable-autohide");
M._handles.show()
},function(){if(!M.resizing){D(this).addClass("ui-resizable-autohide");
M._handles.hide()
}})
}this._mouseInit()
},destroy:function(){this._mouseDestroy();
var B=function(C){D(C).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
};
if(this.elementIsWrapper){B(this.element);
var A=this.element;
A.parent().append(this.originalElement.css({position:A.css("position"),width:A.outerWidth(),height:A.outerHeight(),top:A.css("top"),left:A.css("left")})).end().remove()
}this.originalElement.css("resize",this.originalResizeStyle);
B(this.originalElement)
},_mouseCapture:function(C){var B=false;
for(var A in this.handles){if(D(this.handles[A])[0]==C.target){B=true
}}return this.options.disabled||!!B
},_mouseStart:function(A){var M=this.options,B=this.element.position(),C=this.element;
this.resizing=true;
this.documentScroll={top:D(document).scrollTop(),left:D(document).scrollLeft()};
if(C.is(".ui-draggable")||(/absolute/).test(C.css("position"))){C.css({position:"absolute",top:B.top,left:B.left})
}if(D.browser.opera&&(/relative/).test(C.css("position"))){C.css({position:"relative",top:"auto",left:"auto"})
}this._renderProxy();
var K=E(this.helper.css("left")),N=E(this.helper.css("top"));
if(M.containment){K+=D(M.containment).scrollLeft()||0;
N+=D(M.containment).scrollTop()||0
}this.offset=this.helper.offset();
this.position={left:K,top:N};
this.size=this._helper?{width:C.outerWidth(),height:C.outerHeight()}:{width:C.width(),height:C.height()};
this.originalSize=this._helper?{width:C.outerWidth(),height:C.outerHeight()}:{width:C.width(),height:C.height()};
this.originalPosition={left:K,top:N};
this.sizeDiff={width:C.outerWidth()-C.width(),height:C.outerHeight()-C.height()};
this.originalMousePosition={left:A.pageX,top:A.pageY};
this.aspectRatio=(typeof M.aspectRatio=="number")?M.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);
var L=D(".ui-resizable-"+this.axis).css("cursor");
D("body").css("cursor",L=="auto"?this.axis+"-resize":L);
C.addClass("ui-resizable-resizing");
this._propagate("start",A);
return true
},_mouseDrag:function(T){var U=this.helper,V=this.options,B={},Z=this,R=this.originalMousePosition,A=this.axis;
var X=(T.pageX-R.left)||0,Y=(T.pageY-R.top)||0;
var S=this._change[A];
if(!S){return false
}var C=S.apply(this,[T,X,Y]),Q=D.browser.msie&&D.browser.version<7,W=this.sizeDiff;
if(this._aspectRatio||T.shiftKey){C=this._updateRatio(C,T)
}C=this._respectSize(C,T);
this._propagate("resize",T);
U.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});
if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()
}this._updateCache(C);
this._trigger("resize",T,this.ui());
return false
},_mouseStop:function(N){this.resizing=false;
var C=this.options,S=this;
if(this._helper){var O=this._proportionallyResizeElements,Q=O.length&&(/textarea/i).test(O[0].nodeName),P=Q&&D.ui.hasScroll(O[0],"left")?0:S.sizeDiff.height,A=Q?0:S.sizeDiff.width;
var R={width:(S.size.width-A),height:(S.size.height-P)},B=(parseInt(S.element.css("left"),10)+(S.position.left-S.originalPosition.left))||null,T=(parseInt(S.element.css("top"),10)+(S.position.top-S.originalPosition.top))||null;
if(!C.animate){this.element.css(D.extend(R,{top:T,left:B}))
}S.helper.height(S.size.height);
S.helper.width(S.size.width);
if(this._helper&&!C.animate){this._proportionallyResize()
}}D("body").css("cursor","auto");
this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",N);
if(this._helper){this.helper.remove()
}return false
},_updateCache:function(B){var A=this.options;
this.offset=this.helper.offset();
if(F(B.left)){this.position.left=B.left
}if(F(B.top)){this.position.top=B.top
}if(F(B.height)){this.size.height=B.height
}if(F(B.width)){this.size.width=B.width
}},_updateRatio:function(A,B){var K=this.options,J=this.position,C=this.size,L=this.axis;
if(A.height){A.width=(C.height*this.aspectRatio)
}else{if(A.width){A.height=(C.width/this.aspectRatio)
}}if(L=="sw"){A.left=J.left+(C.width-A.width);
A.top=null
}if(L=="nw"){A.top=J.top+(C.height-A.height);
A.left=J.left+(C.width-A.width)
}return A
},_respectSize:function(d,U){var T=this.helper,c=this.options,W=this._aspectRatio||U.shiftKey,X=this.axis,C=F(d.width)&&c.maxWidth&&(c.maxWidth<d.width),b=F(d.height)&&c.maxHeight&&(c.maxHeight<d.height),A=F(d.width)&&c.minWidth&&(c.minWidth>d.width),Z=F(d.height)&&c.minHeight&&(c.minHeight>d.height);
if(A){d.width=c.minWidth
}if(Z){d.height=c.minHeight
}if(C){d.width=c.maxWidth
}if(b){d.height=c.maxHeight
}var V=this.originalPosition.left+this.originalSize.width,Y=this.position.top+this.size.height;
var S=/sw|nw|w/.test(X),B=/nw|ne|n/.test(X);
if(A&&S){d.left=V-c.minWidth
}if(C&&S){d.left=V-c.maxWidth
}if(Z&&B){d.top=Y-c.minHeight
}if(b&&B){d.top=Y-c.maxHeight
}var a=!d.width&&!d.height;
if(a&&!d.left&&d.top){d.top=null
}else{if(a&&!d.top&&d.left){d.left=null
}}return d
},_proportionallyResize:function(){var J=this.options;
if(!this._proportionallyResizeElements.length){return 
}var B=this.helper||this.element;
for(var C=0;
C<this._proportionallyResizeElements.length;
C++){var A=this._proportionallyResizeElements[C];
if(!this.borderDif){var K=[A.css("borderTopWidth"),A.css("borderRightWidth"),A.css("borderBottomWidth"),A.css("borderLeftWidth")],L=[A.css("paddingTop"),A.css("paddingRight"),A.css("paddingBottom"),A.css("paddingLeft")];
this.borderDif=D.map(K,function(I,G){var H=parseInt(I,10)||0,N=parseInt(L[G],10)||0;
return H+N
})
}if(D.browser.msie&&!(!(D(B).is(":hidden")||D(B).parents(":hidden").length))){continue
}A.css({height:(B.height()-this.borderDif[0]-this.borderDif[2])||0,width:(B.width()-this.borderDif[1]-this.borderDif[3])||0})
}},_renderProxy:function(){var B=this.element,I=this.options;
this.elementOffset=B.offset();
if(this._helper){this.helper=this.helper||D('<div style="overflow:hidden;"></div>');
var C=D.browser.msie&&D.browser.version<7,A=(C?1:0),J=(C?2:-1);
this.helper.addClass(this._helper).css({width:this.element.outerWidth()+J,height:this.element.outerHeight()+J,position:"absolute",left:this.elementOffset.left-A+"px",top:this.elementOffset.top-A+"px",zIndex:++I.zIndex});
this.helper.appendTo("body").disableSelection()
}else{this.helper=this.element
}},_change:{e:function(B,C,A){return{width:this.originalSize.width+C}
},w:function(A,C,J){var K=this.options,B=this.originalSize,L=this.originalPosition;
return{left:L.left+C,width:B.width-C}
},n:function(A,C,J){var K=this.options,B=this.originalSize,L=this.originalPosition;
return{top:L.top+J,height:B.height-J}
},s:function(B,C,A){return{height:this.originalSize.height+A}
},se:function(B,C,A){return D.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[B,C,A]))
},sw:function(B,C,A){return D.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[B,C,A]))
},ne:function(B,C,A){return D.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[B,C,A]))
},nw:function(B,C,A){return D.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[B,C,A]))
}},_propagate:function(A,B){D.ui.plugin.call(this,A,[B,this.ui()]);
(A!="resize"&&this._trigger(A,B,this.ui()))
},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
}}));
D.extend(D.ui.resizable,{version:"1.7.2",eventPrefix:"resize",defaults:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,cancel:":input,option",containment:false,delay:0,distance:1,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000}});
D.ui.plugin.add("resizable","alsoResize",{start:function(A,H){var B=D(this).data("resizable"),C=B.options;
_store=function(G){D(G).each(function(){D(this).data("resizable-alsoresize",{width:parseInt(D(this).width(),10),height:parseInt(D(this).height(),10),left:parseInt(D(this).css("left"),10),top:parseInt(D(this).css("top"),10)})
})
};
if(typeof (C.alsoResize)=="object"&&!C.alsoResize.parentNode){if(C.alsoResize.length){C.alsoResize=C.alsoResize[0];
_store(C.alsoResize)
}else{D.each(C.alsoResize,function(J,G){_store(J)
})
}}else{_store(C.alsoResize)
}},resize:function(C,M){var A=D(this).data("resizable"),O=A.options,P=A.originalSize,N=A.originalPosition;
var B={height:(A.size.height-P.height)||0,width:(A.size.width-P.width)||0,top:(A.position.top-N.top)||0,left:(A.position.left-N.left)||0},L=function(G,H){D(G).each(function(){var R=D(this),K=D(this).data("resizable-alsoresize"),I={},J=H&&H.length?H:["width","height","top","left"];
D.each(J||["width","height","top","left"],function(V,Q){var U=(K[Q]||0)+(B[Q]||0);
if(U&&U>=0){I[Q]=U||null
}});
if(/relative/.test(R.css("position"))&&D.browser.opera){A._revertToRelativePosition=true;
R.css({position:"absolute",top:"auto",left:"auto"})
}R.css(I)
})
};
if(typeof (O.alsoResize)=="object"&&!O.alsoResize.nodeType){D.each(O.alsoResize,function(G,H){L(G,H)
})
}else{L(O.alsoResize)
}},stop:function(C,B){var A=D(this).data("resizable");
if(A._revertToRelativePosition&&D.browser.opera){A._revertToRelativePosition=false;
el.css({position:"relative"})
}D(this).removeData("resizable-alsoresize-start")
}});
D.ui.plugin.add("resizable","animate",{stop:function(O,U){var T=D(this).data("resizable"),C=T.options;
var P=T._proportionallyResizeElements,S=P.length&&(/textarea/i).test(P[0].nodeName),R=S&&D.ui.hasScroll(P[0],"left")?0:T.sizeDiff.height,A=S?0:T.sizeDiff.width;
var Q={width:(T.size.width-A),height:(T.size.height-R)},B=(parseInt(T.element.css("left"),10)+(T.position.left-T.originalPosition.left))||null,V=(parseInt(T.element.css("top"),10)+(T.position.top-T.originalPosition.top))||null;
T.element.animate(D.extend(Q,V&&B?{top:V,left:B}:{}),{duration:C.animateDuration,easing:C.animateEasing,step:function(){var G={width:parseInt(T.element.css("width"),10),height:parseInt(T.element.css("height"),10),top:parseInt(T.element.css("top"),10),left:parseInt(T.element.css("left"),10)};
if(P&&P.length){D(P[0]).css({width:G.width,height:G.height})
}T._updateCache(G);
T._propagate("resize",O)
}})
}});
D.ui.plugin.add("resizable","containment",{start:function(A,R){var b=D(this).data("resizable"),X=b.options,V=b.element;
var Z=X.containment,W=(Z instanceof D)?Z.get(0):(/parent/.test(Z))?V.parent().get(0):Z;
if(!W){return 
}b.containerElement=D(W);
if(/document/.test(Z)||Z==document){b.containerOffset={left:0,top:0};
b.containerPosition={left:0,top:0};
b.parentData={element:D(document),left:0,top:0,width:D(document).width(),height:D(document).height()||document.body.parentNode.scrollHeight}
}else{var T=D(W),B=[];
D(["Top","Right","Left","Bottom"]).each(function(G,H){B[G]=E(T.css("padding"+H))
});
b.containerOffset=T.offset();
b.containerPosition=T.position();
b.containerSize={height:(T.innerHeight()-B[3]),width:(T.innerWidth()-B[1])};
var S=b.containerOffset,a=b.containerSize.height,U=b.containerSize.width,C=(D.ui.hasScroll(W,"left")?W.scrollWidth:U),Y=(D.ui.hasScroll(W)?W.scrollHeight:a);
b.parentData={element:W,left:S.left,top:S.top,width:C,height:Y}
}},resize:function(U,X){var C=D(this).data("resizable"),c=C.options,V=C.containerSize,Y=C.containerOffset,b=C.size,Z=C.position,W=C._aspectRatio||U.shiftKey,d={top:0,left:0},A=C.containerElement;
if(A[0]!=document&&(/static/).test(A.css("position"))){d=Y
}if(Z.left<(C._helper?Y.left:0)){C.size.width=C.size.width+(C._helper?(C.position.left-Y.left):(C.position.left-d.left));
if(W){C.size.height=C.size.width/c.aspectRatio
}C.position.left=c.helper?Y.left:0
}if(Z.top<(C._helper?Y.top:0)){C.size.height=C.size.height+(C._helper?(C.position.top-Y.top):C.position.top);
if(W){C.size.width=C.size.height*c.aspectRatio
}C.position.top=C._helper?Y.top:0
}C.offset.left=C.parentData.left+C.position.left;
C.offset.top=C.parentData.top+C.position.top;
var B=Math.abs((C._helper?C.offset.left-d.left:(C.offset.left-d.left))+C.sizeDiff.width),T=Math.abs((C._helper?C.offset.top-d.top:(C.offset.top-Y.top))+C.sizeDiff.height);
var S=C.containerElement.get(0)==C.element.parent().get(0),a=/relative|absolute/.test(C.containerElement.css("position"));
if(S&&a){B-=C.parentData.left
}if(B+C.size.width>=C.parentData.width){C.size.width=C.parentData.width-B;
if(W){C.size.height=C.size.width/C.aspectRatio
}}if(T+C.size.height>=C.parentData.height){C.size.height=C.parentData.height-T;
if(W){C.size.width=C.size.height*C.aspectRatio
}}},stop:function(U,A){var V=D(this).data("resizable"),S=V.options,C=V.position,B=V.containerOffset,T=V.containerPosition,R=V.containerElement;
var Q=D(V.helper),W=Q.offset(),X=Q.outerWidth()-V.sizeDiff.width,P=Q.outerHeight()-V.sizeDiff.height;
if(V._helper&&!S.animate&&(/relative/).test(R.css("position"))){D(this).css({left:W.left-T.left-B.left,width:X,height:P})
}if(V._helper&&!S.animate&&(/static/).test(R.css("position"))){D(this).css({left:W.left-T.left-B.left,width:X,height:P})
}}});
D.ui.plugin.add("resizable","ghost",{start:function(A,J){var C=D(this).data("resizable"),I=C.options,B=C.size;
C.ghost=C.originalElement.clone();
C.ghost.css({opacity:0.25,display:"block",position:"relative",height:B.height,width:B.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof I.ghost=="string"?I.ghost:"");
C.ghost.appendTo(C.helper)
},resize:function(A,H){var B=D(this).data("resizable"),C=B.options;
if(B.ghost){B.ghost.css({position:"relative",height:B.size.height,width:B.size.width})
}},stop:function(A,H){var B=D(this).data("resizable"),C=B.options;
if(B.ghost&&B.helper){B.helper.get(0).removeChild(B.ghost.get(0))
}}});
D.ui.plugin.add("resizable","grid",{resize:function(S,V){var T=D(this).data("resizable"),P=T.options,B=T.size,O=T.originalSize,C=T.originalPosition,U=T.axis,A=P._aspectRatio||S.shiftKey;
P.grid=typeof P.grid=="number"?[P.grid,P.grid]:P.grid;
var Q=Math.round((B.width-O.width)/(P.grid[0]||1))*(P.grid[0]||1),R=Math.round((B.height-O.height)/(P.grid[1]||1))*(P.grid[1]||1);
if(/^(se|s|e)$/.test(U)){T.size.width=O.width+Q;
T.size.height=O.height+R
}else{if(/^(ne)$/.test(U)){T.size.width=O.width+Q;
T.size.height=O.height+R;
T.position.top=C.top-R
}else{if(/^(sw)$/.test(U)){T.size.width=O.width+Q;
T.size.height=O.height+R;
T.position.left=C.left-Q
}else{T.size.width=O.width+Q;
T.size.height=O.height+R;
T.position.top=C.top-R;
T.position.left=C.left-Q
}}}}});
var E=function(A){return parseInt(A,10)||0
};
var F=function(A){return !isNaN(parseInt(A,10))
}
})(jQuery);