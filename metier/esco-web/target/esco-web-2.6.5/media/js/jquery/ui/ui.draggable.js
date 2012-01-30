(function(B){B.widget("ui.draggable",B.extend({},B.ui.mouse,{_init:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"
}(this.options.addClasses&&this.element.addClass("ui-draggable"));
(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));
this._mouseInit()
},destroy:function(){if(!this.element.data("draggable")){return 
}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy()
},_mouseCapture:function(D){var A=this.options;
if(this.helper||A.disabled||B(D.target).is(".ui-resizable-handle")){return false
}this.handle=this._getHandle(D);
if(!this.handle){return false
}return true
},_mouseStart:function(D){var A=this.options;
this.helper=this._createHelper(D);
this._cacheHelperProportions();
if(B.ui.ddmanager){B.ui.ddmanager.current=this
}this._cacheMargins();
this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent();
this.offset=this.element.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
B.extend(this.offset,{click:{left:D.pageX-this.offset.left,top:D.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(D);
this.originalPageX=D.pageX;
this.originalPageY=D.pageY;
if(A.cursorAt){this._adjustOffsetFromHelper(A.cursorAt)
}if(A.containment){this._setContainment()
}this._trigger("start",D);
this._cacheHelperProportions();
if(B.ui.ddmanager&&!A.dropBehaviour){B.ui.ddmanager.prepareOffsets(this,D)
}this.helper.addClass("ui-draggable-dragging");
this._mouseDrag(D,true);
return true
},_mouseDrag:function(A,E){this.position=this._generatePosition(A);
this.positionAbs=this._convertPositionTo("absolute");
if(!E){var F=this._uiHash();
this._trigger("drag",A,F);
this.position=F.position
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}if(B.ui.ddmanager){B.ui.ddmanager.drag(this,A)
}return false
},_mouseStop:function(F){var E=false;
if(B.ui.ddmanager&&!this.options.dropBehaviour){E=B.ui.ddmanager.drop(this,F)
}if(this.dropped){E=this.dropped;
this.dropped=false
}if((this.options.revert=="invalid"&&!E)||(this.options.revert=="valid"&&E)||this.options.revert===true||(B.isFunction(this.options.revert)&&this.options.revert.call(this.element,E))){var A=this;
B(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){A._trigger("stop",F);
A._clear()
})
}else{this._trigger("stop",F);
this._clear()
}return false
},_getHandle:function(D){var A=!this.options.handle||!B(this.options.handle,this.element).length?true:false;
B(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==D.target){A=true
}});
return A
},_createHelper:function(F){var E=this.options;
var A=B.isFunction(E.helper)?B(E.helper.apply(this.element[0],[F])):(E.helper=="clone"?this.element.clone():this.element);
if(!A.parents("body").length){A.appendTo((E.appendTo=="parent"?this.element[0].parentNode:E.appendTo))
}if(A[0]!=this.element[0]&&!(/(fixed|absolute)/).test(A.css("position"))){A.css("position","absolute")
}return A
},_adjustOffsetFromHelper:function(A){if(A.left!=undefined){this.offset.click.left=A.left+this.margins.left
}if(A.right!=undefined){this.offset.click.left=this.helperProportions.width-A.right+this.margins.left
}if(A.top!=undefined){this.offset.click.top=A.top+this.margins.top
}if(A.bottom!=undefined){this.offset.click.top=this.helperProportions.height-A.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var A=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&B.ui.contains(this.scrollParent[0],this.offsetParent[0])){A.left+=this.scrollParent.scrollLeft();
A.top+=this.scrollParent.scrollTop()
}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&B.browser.msie)){A={top:0,left:0}
}return{top:A.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:A.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var A=this.element.position();
return{top:A.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:A.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var G=this.options;
if(G.containment=="parent"){G.containment=this.helper[0].parentNode
}if(G.containment=="document"||G.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,B(G.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(B(G.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(G.containment)&&G.containment.constructor!=Array){var A=B(G.containment)[0];
if(!A){return 
}var H=B(G.containment).offset();
var F=(B(A).css("overflow")!="hidden");
this.containment=[H.left+(parseInt(B(A).css("borderLeftWidth"),10)||0)+(parseInt(B(A).css("paddingLeft"),10)||0)-this.margins.left,H.top+(parseInt(B(A).css("borderTopWidth"),10)||0)+(parseInt(B(A).css("paddingTop"),10)||0)-this.margins.top,H.left+(F?Math.max(A.scrollWidth,A.offsetWidth):A.offsetWidth)-(parseInt(B(A).css("borderLeftWidth"),10)||0)-(parseInt(B(A).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,H.top+(F?Math.max(A.scrollHeight,A.offsetHeight):A.offsetHeight)-(parseInt(B(A).css("borderTopWidth"),10)||0)-(parseInt(B(A).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}else{if(G.containment.constructor==Array){this.containment=G.containment
}}},_convertPositionTo:function(A,J){if(!J){J=this.position
}var I=A=="absolute"?1:-1;
var H=this.options,K=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&B.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,L=(/(html|body)/i).test(K[0].tagName);
return{top:(J.top+this.offset.relative.top*I+this.offset.parent.top*I-(B.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(L?0:K.scrollTop()))*I)),left:(J.left+this.offset.relative.left*I+this.offset.parent.left*I-(B.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():L?0:K.scrollLeft())*I))}
},_generatePosition:function(O){var A=this.options,P=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&B.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,K=(/(html|body)/i).test(P[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()
}var M=O.pageX;
var N=O.pageY;
if(this.originalPosition){if(this.containment){if(O.pageX-this.offset.click.left<this.containment[0]){M=this.containment[0]+this.offset.click.left
}if(O.pageY-this.offset.click.top<this.containment[1]){N=this.containment[1]+this.offset.click.top
}if(O.pageX-this.offset.click.left>this.containment[2]){M=this.containment[2]+this.offset.click.left
}if(O.pageY-this.offset.click.top>this.containment[3]){N=this.containment[3]+this.offset.click.top
}}if(A.grid){var J=this.originalPageY+Math.round((N-this.originalPageY)/A.grid[1])*A.grid[1];
N=this.containment?(!(J-this.offset.click.top<this.containment[1]||J-this.offset.click.top>this.containment[3])?J:(!(J-this.offset.click.top<this.containment[1])?J-A.grid[1]:J+A.grid[1])):J;
var L=this.originalPageX+Math.round((M-this.originalPageX)/A.grid[0])*A.grid[0];
M=this.containment?(!(L-this.offset.click.left<this.containment[0]||L-this.offset.click.left>this.containment[2])?L:(!(L-this.offset.click.left<this.containment[0])?L-A.grid[0]:L+A.grid[0])):L
}}return{top:(N-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(B.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(K?0:P.scrollTop())))),left:(M-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(B.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():K?0:P.scrollLeft())))}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()
}this.helper=null;
this.cancelHelperRemoval=false
},_trigger:function(A,F,E){E=E||this._uiHash();
B.ui.plugin.call(this,A,[F,E]);
if(A=="drag"){this.positionAbs=this._convertPositionTo("absolute")
}return B.widget.prototype._trigger.call(this,A,F,E)
},plugins:{},_uiHash:function(A){return{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,offset:this.positionAbs}
}}));
B.extend(B.ui.draggable,{version:"1.7.2",eventPrefix:"drag",defaults:{addClasses:true,appendTo:"parent",axis:false,cancel:":input,option",connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false}});
B.ui.plugin.add("draggable","connectToSortable",{start:function(G,J){var A=B(this).data("draggable"),I=A.options,H=B.extend({},J,{item:A.element});
A.sortables=[];
B(I.connectToSortable).each(function(){var C=B.data(this,"sortable");
if(C&&!C.options.disabled){A.sortables.push({instance:C,shouldRevert:C.options.revert});
C._refreshItems();
C._trigger("activate",G,H)
}})
},stop:function(A,G){var H=B(this).data("draggable"),F=B.extend({},G,{item:H.element});
B.each(H.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;
H.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;
if(this.shouldRevert){this.instance.options.revert=true
}this.instance._mouseStop(A);
this.instance.options.helper=this.instance.options._helper;
if(H.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})
}}else{this.instance.cancelHelperRemoval=false;
this.instance._trigger("deactivate",A,F)
}})
},drag:function(G,I){var J=B(this).data("draggable"),H=this;
var A=function(E){var R=this.offset.click.top,S=this.offset.click.left;
var P=this.positionAbs.top,C=this.positionAbs.left;
var D=E.height,T=E.width;
var Q=E.top,F=E.left;
return B.ui.isOver(P+R,C+S,Q,F,D,T)
};
B.each(J.sortables,function(C){this.instance.positionAbs=J.positionAbs;
this.instance.helperProportions=J.helperProportions;
this.instance.offset.click=J.offset.click;
if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=B(H).clone().appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return I.helper[0]
};
G.target=this.instance.currentItem[0];
this.instance._mouseCapture(G,true);
this.instance._mouseStart(G,true,true);
this.instance.offset.click.top=J.offset.click.top;
this.instance.offset.click.left=J.offset.click.left;
this.instance.offset.parent.left-=J.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=J.offset.parent.top-this.instance.offset.parent.top;
J._trigger("toSortable",G);
J.dropped=this.instance.element;
J.currentItem=J.element;
this.instance.fromOutside=J
}if(this.instance.currentItem){this.instance._mouseDrag(G)
}}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;
this.instance.options.revert=false;
this.instance._trigger("out",G,this.instance._uiHash(this.instance));
this.instance._mouseStop(G,true);
this.instance.options.helper=this.instance.options._helper;
this.instance.currentItem.remove();
if(this.instance.placeholder){this.instance.placeholder.remove()
}J._trigger("fromSortable",G);
J.dropped=false
}}})
}});
B.ui.plugin.add("draggable","cursor",{start:function(A,H){var F=B("body"),G=B(this).data("draggable").options;
if(F.css("cursor")){G._cursor=F.css("cursor")
}F.css("cursor",G.cursor)
},stop:function(A,F){var E=B(this).data("draggable").options;
if(E._cursor){B("body").css("cursor",E._cursor)
}}});
B.ui.plugin.add("draggable","iframeFix",{start:function(A,F){var E=B(this).data("draggable").options;
B(E.iframeFix===true?"iframe":E.iframeFix).each(function(){B('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(B(this).offset()).appendTo("body")
})
},stop:function(D,A){B("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
})
}});
B.ui.plugin.add("draggable","opacity",{start:function(A,H){var F=B(H.helper),G=B(this).data("draggable").options;
if(F.css("opacity")){G._opacity=F.css("opacity")
}F.css("opacity",G.opacity)
},stop:function(A,F){var E=B(this).data("draggable").options;
if(E._opacity){B(F.helper).css("opacity",E._opacity)
}}});
B.ui.plugin.add("draggable","scroll",{start:function(F,E){var A=B(this).data("draggable");
if(A.scrollParent[0]!=document&&A.scrollParent[0].tagName!="HTML"){A.overflowOffset=A.scrollParent.offset()
}},drag:function(A,J){var G=B(this).data("draggable"),I=G.options,H=false;
if(G.scrollParent[0]!=document&&G.scrollParent[0].tagName!="HTML"){if(!I.axis||I.axis!="x"){if((G.overflowOffset.top+G.scrollParent[0].offsetHeight)-A.pageY<I.scrollSensitivity){G.scrollParent[0].scrollTop=H=G.scrollParent[0].scrollTop+I.scrollSpeed
}else{if(A.pageY-G.overflowOffset.top<I.scrollSensitivity){G.scrollParent[0].scrollTop=H=G.scrollParent[0].scrollTop-I.scrollSpeed
}}}if(!I.axis||I.axis!="y"){if((G.overflowOffset.left+G.scrollParent[0].offsetWidth)-A.pageX<I.scrollSensitivity){G.scrollParent[0].scrollLeft=H=G.scrollParent[0].scrollLeft+I.scrollSpeed
}else{if(A.pageX-G.overflowOffset.left<I.scrollSensitivity){G.scrollParent[0].scrollLeft=H=G.scrollParent[0].scrollLeft-I.scrollSpeed
}}}}else{if(!I.axis||I.axis!="x"){if(A.pageY-B(document).scrollTop()<I.scrollSensitivity){H=B(document).scrollTop(B(document).scrollTop()-I.scrollSpeed)
}else{if(B(window).height()-(A.pageY-B(document).scrollTop())<I.scrollSensitivity){H=B(document).scrollTop(B(document).scrollTop()+I.scrollSpeed)
}}}if(!I.axis||I.axis!="y"){if(A.pageX-B(document).scrollLeft()<I.scrollSensitivity){H=B(document).scrollLeft(B(document).scrollLeft()-I.scrollSpeed)
}else{if(B(window).width()-(A.pageX-B(document).scrollLeft())<I.scrollSensitivity){H=B(document).scrollLeft(B(document).scrollLeft()+I.scrollSpeed)
}}}}if(H!==false&&B.ui.ddmanager&&!I.dropBehaviour){B.ui.ddmanager.prepareOffsets(G,A)
}}});
B.ui.plugin.add("draggable","snap",{start:function(A,H){var F=B(this).data("draggable"),G=F.options;
F.snapElements=[];
B(G.snap.constructor!=String?(G.snap.items||":data(draggable)"):G.snap).each(function(){var C=B(this);
var D=C.offset();
if(this!=F.element[0]){F.snapElements.push({item:this,width:C.outerWidth(),height:C.outerHeight(),top:D.top,left:D.left})
}})
},drag:function(e,h){var U=B(this).data("draggable"),g=U.options;
var a=g.snapTolerance;
var b=h.offset.left,c=b+U.helperProportions.width,V=h.offset.top,W=V+U.helperProportions.height;
for(var d=U.snapElements.length-1;
d>=0;
d--){var f=U.snapElements[d].left,i=f+U.snapElements[d].width,j=U.snapElements[d].top,Y=j+U.snapElements[d].height;
if(!((f-a<b&&b<i+a&&j-a<V&&V<Y+a)||(f-a<b&&b<i+a&&j-a<W&&W<Y+a)||(f-a<c&&c<i+a&&j-a<V&&V<Y+a)||(f-a<c&&c<i+a&&j-a<W&&W<Y+a))){if(U.snapElements[d].snapping){(U.options.snap.release&&U.options.snap.release.call(U.element,e,B.extend(U._uiHash(),{snapItem:U.snapElements[d].item})))
}U.snapElements[d].snapping=false;
continue
}if(g.snapMode!="inner"){var X=Math.abs(j-W)<=a;
var Z=Math.abs(Y-V)<=a;
var l=Math.abs(f-c)<=a;
var k=Math.abs(i-b)<=a;
if(X){h.position.top=U._convertPositionTo("relative",{top:j-U.helperProportions.height,left:0}).top-U.margins.top
}if(Z){h.position.top=U._convertPositionTo("relative",{top:Y,left:0}).top-U.margins.top
}if(l){h.position.left=U._convertPositionTo("relative",{top:0,left:f-U.helperProportions.width}).left-U.margins.left
}if(k){h.position.left=U._convertPositionTo("relative",{top:0,left:i}).left-U.margins.left
}}var A=(X||Z||l||k);
if(g.snapMode!="outer"){var X=Math.abs(j-V)<=a;
var Z=Math.abs(Y-W)<=a;
var l=Math.abs(f-b)<=a;
var k=Math.abs(i-c)<=a;
if(X){h.position.top=U._convertPositionTo("relative",{top:j,left:0}).top-U.margins.top
}if(Z){h.position.top=U._convertPositionTo("relative",{top:Y-U.helperProportions.height,left:0}).top-U.margins.top
}if(l){h.position.left=U._convertPositionTo("relative",{top:0,left:f}).left-U.margins.left
}if(k){h.position.left=U._convertPositionTo("relative",{top:0,left:i-U.helperProportions.width}).left-U.margins.left
}}if(!U.snapElements[d].snapping&&(X||Z||l||k||A)){(U.options.snap.snap&&U.options.snap.snap.call(U.element,e,B.extend(U._uiHash(),{snapItem:U.snapElements[d].item})))
}U.snapElements[d].snapping=(X||Z||l||k||A)
}}});
B.ui.plugin.add("draggable","stack",{start:function(F,A){var G=B(this).data("draggable").options;
var H=B.makeArray(B(G.stack.group)).sort(function(C,D){return(parseInt(B(C).css("zIndex"),10)||G.stack.min)-(parseInt(B(D).css("zIndex"),10)||G.stack.min)
});
B(H).each(function(C){this.style.zIndex=G.stack.min+C
});
this[0].style.zIndex=G.stack.min+H.length
}});
B.ui.plugin.add("draggable","zIndex",{start:function(A,H){var F=B(H.helper),G=B(this).data("draggable").options;
if(F.css("zIndex")){G._zIndex=F.css("zIndex")
}F.css("zIndex",G.zIndex)
},stop:function(A,F){var E=B(this).data("draggable").options;
if(E._zIndex){B(F.helper).css("zIndex",E._zIndex)
}}})
})(jQuery);