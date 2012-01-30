(function(B){B.widget("ui.sortable",B.extend({},B.ui.mouse,{_init:function(){var A=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?(/left|right/).test(this.items[0].item.css("float")):false;
this.offset=this.element.offset();
this._mouseInit()
},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
this._mouseDestroy();
for(var A=this.items.length-1;
A>=0;
A--){this.items[A].item.removeData("sortable-item")
}},_mouseCapture:function(A,K){if(this.reverting){return false
}if(this.options.disabled||this.options.type=="static"){return false
}this._refreshItems(A);
var H=null,I=this,J=B(A.target).parents().each(function(){if(B.data(this,"sortable-item")==I){H=B(this);
return false
}});
if(B.data(A.target,"sortable-item")==I){H=B(A.target)
}if(!H){return false
}if(this.options.handle&&!K){var L=false;
B(this.options.handle,H).find("*").andSelf().each(function(){if(this==A.target){L=true
}});
if(!L){return false
}}this.currentItem=H;
this._removeCurrentsFromItems();
return true
},_mouseStart:function(A,K,J){var L=this.options,I=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(A);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
B.extend(this.offset,{click:{left:A.pageX-this.offset.left,top:A.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(A);
this.originalPageX=A.pageX;
this.originalPageY=A.pageY;
if(L.cursorAt){this._adjustOffsetFromHelper(L.cursorAt)
}this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
if(this.helper[0]!=this.currentItem[0]){this.currentItem.hide()
}this._createPlaceholder();
if(L.containment){this._setContainment()
}if(L.cursor){if(B("body").css("cursor")){this._storedCursor=B("body").css("cursor")
}B("body").css("cursor",L.cursor)
}if(L.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")
}this.helper.css("opacity",L.opacity)
}if(L.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")
}this.helper.css("zIndex",L.zIndex)
}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()
}this._trigger("start",A,this._uiHash());
if(!this._preserveHelperProportions){this._cacheHelperProportions()
}if(!J){for(var H=this.containers.length-1;
H>=0;
H--){this.containers[H]._trigger("activate",A,I._uiHash(this))
}}if(B.ui.ddmanager){B.ui.ddmanager.current=this
}if(B.ui.ddmanager&&!L.dropBehaviour){B.ui.ddmanager.prepareOffsets(this,A)
}this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(A);
return true
},_mouseDrag:function(L){this.position=this._generatePosition(L);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs
}if(this.options.scroll){var K=this.options,J=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-L.pageY<K.scrollSensitivity){this.scrollParent[0].scrollTop=J=this.scrollParent[0].scrollTop+K.scrollSpeed
}else{if(L.pageY-this.overflowOffset.top<K.scrollSensitivity){this.scrollParent[0].scrollTop=J=this.scrollParent[0].scrollTop-K.scrollSpeed
}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-L.pageX<K.scrollSensitivity){this.scrollParent[0].scrollLeft=J=this.scrollParent[0].scrollLeft+K.scrollSpeed
}else{if(L.pageX-this.overflowOffset.left<K.scrollSensitivity){this.scrollParent[0].scrollLeft=J=this.scrollParent[0].scrollLeft-K.scrollSpeed
}}}else{if(L.pageY-B(document).scrollTop()<K.scrollSensitivity){J=B(document).scrollTop(B(document).scrollTop()-K.scrollSpeed)
}else{if(B(window).height()-(L.pageY-B(document).scrollTop())<K.scrollSensitivity){J=B(document).scrollTop(B(document).scrollTop()+K.scrollSpeed)
}}if(L.pageX-B(document).scrollLeft()<K.scrollSensitivity){J=B(document).scrollLeft(B(document).scrollLeft()-K.scrollSpeed)
}else{if(B(window).width()-(L.pageX-B(document).scrollLeft())<K.scrollSensitivity){J=B(document).scrollLeft(B(document).scrollLeft()+K.scrollSpeed)
}}}if(J!==false&&B.ui.ddmanager&&!K.dropBehaviour){B.ui.ddmanager.prepareOffsets(this,L)
}}this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}for(var A=this.items.length-1;
A>=0;
A--){var M=this.items[A],N=M.item[0],I=this._intersectsWithPointer(M);
if(!I){continue
}if(N!=this.currentItem[0]&&this.placeholder[I==1?"next":"prev"]()[0]!=N&&!B.ui.contains(this.placeholder[0],N)&&(this.options.type=="semi-dynamic"?!B.ui.contains(this.element[0],N):true)){this.direction=I==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(M)){this._rearrange(L,M)
}else{break
}this._trigger("change",L,this._uiHash());
break
}}this._contactContainers(L);
if(B.ui.ddmanager){B.ui.ddmanager.drag(this,L)
}this._trigger("sort",L,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false
},_mouseStop:function(A,H){if(!A){return 
}if(B.ui.ddmanager&&!this.options.dropBehaviour){B.ui.ddmanager.drop(this,A)
}if(this.options.revert){var F=this;
var G=F.placeholder.offset();
F.reverting=true;
B(this.helper).animate({left:G.left-this.offset.parent.left-F.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:G.top-this.offset.parent.top-F.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){F._clear(A)
})
}else{this._clear(A,H)
}return false
},cancel:function(){var D=this;
if(this.dragging){this._mouseUp();
if(this.options.helper=="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}for(var A=this.containers.length-1;
A>=0;
A--){this.containers[A]._trigger("deactivate",null,D._uiHash(this));
if(this.containers[A].containerCache.over){this.containers[A]._trigger("out",null,D._uiHash(this));
this.containers[A].containerCache.over=0
}}}if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])
}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()
}B.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
if(this.domPosition.prev){B(this.domPosition.prev).after(this.currentItem)
}else{B(this.domPosition.parent).prepend(this.currentItem)
}return true
},serialize:function(E){var A=this._getItemsAsjQuery(E&&E.connected);
var F=[];
E=E||{};
B(A).each(function(){var C=(B(E.item||this).attr(E.attribute||"id")||"").match(E.expression||(/(.+)[-=_](.+)/));
if(C){F.push((E.key||C[1]+"[]")+"="+(E.key&&E.expression?C[1]:C[2]))
}});
return F.join("&")
},toArray:function(E){var A=this._getItemsAsjQuery(E&&E.connected);
var F=[];
E=E||{};
A.each(function(){F.push(B(E.item||this).attr(E.attribute||"id")||"")
});
return F
},_intersectsWith:function(V){var P=this.positionAbs.left,R=P+this.helperProportions.width,W=this.positionAbs.top,X=W+this.helperProportions.height;
var Q=V.left,S=Q+V.width,U=V.top,A=U+V.height;
var T=this.offset.click.top,N=this.offset.click.left;
var O=(W+T)>U&&(W+T)<A&&(P+N)>Q&&(P+N)<S;
if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>V[this.floating?"width":"height"])){return O
}else{return(Q<P+(this.helperProportions.width/2)&&R-(this.helperProportions.width/2)<S&&U<W+(this.helperProportions.height/2)&&X-(this.helperProportions.height/2)<A)
}},_intersectsWithPointer:function(H){var A=B.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,H.top,H.height),I=B.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,H.left,H.width),J=A&&I,K=this._getDragVerticalDirection(),L=this._getDragHorizontalDirection();
if(!J){return false
}return this.floating?(((L&&L=="right")||K=="down")?2:1):(K&&(K=="down"?2:1))
},_intersectsWithSides:function(J){var G=B.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,J.top+(J.height/2),J.height),A=B.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,J.left+(J.width/2),J.width),H=this._getDragVerticalDirection(),I=this._getDragHorizontalDirection();
if(this.floating&&I){return((I=="right"&&A)||(I=="left"&&!A))
}else{return H&&((H=="down"&&G)||(H=="up"&&!G))
}},_getDragVerticalDirection:function(){var A=this.positionAbs.top-this.lastPositionAbs.top;
return A!=0&&(A>0?"down":"up")
},_getDragHorizontalDirection:function(){var A=this.positionAbs.left-this.lastPositionAbs.left;
return A!=0&&(A>0?"right":"left")
},refresh:function(A){this._refreshItems(A);
this.refreshPositions()
},_connectWith:function(){var A=this.options;
return A.connectWith.constructor==String?[A.connectWith]:A.connectWith
},_getItemsAsjQuery:function(P){var Q=this;
var K=[];
var M=[];
var A=this._connectWith();
if(A&&P){for(var N=A.length-1;
N>=0;
N--){var R=B(A[N]);
for(var O=R.length-1;
O>=0;
O--){var L=B.data(R[O],"sortable");
if(L&&L!=this&&!L.options.disabled){M.push([B.isFunction(L.options.items)?L.options.items.call(L.element):B(L.options.items,L.element).not(".ui-sortable-helper"),L])
}}}}M.push([B.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):B(this.options.items,this.element).not(".ui-sortable-helper"),this]);
for(var N=M.length-1;
N>=0;
N--){M[N][0].each(function(){K.push(this)
})
}return B(K)
},_removeCurrentsFromItems:function(){var E=this.currentItem.find(":data(sortable-item)");
for(var F=0;
F<this.items.length;
F++){for(var A=0;
A<E.length;
A++){if(E[A]==this.items[F].item[0]){this.items.splice(F,1)
}}}},_refreshItems:function(T){this.items=[];
this.containers=[this];
var O=this.items;
var U=this;
var Q=[[B.isFunction(this.options.items)?this.options.items.call(this.element[0],T,{item:this.currentItem}):B(this.options.items,this.element),this]];
var Y=this._connectWith();
if(Y){for(var R=Y.length-1;
R>=0;
R--){var X=B(Y[R]);
for(var P=X.length-1;
P>=0;
P--){var Z=B.data(X[P],"sortable");
if(Z&&Z!=this&&!Z.options.disabled){Q.push([B.isFunction(Z.options.items)?Z.options.items.call(Z.element[0],T,{item:this.currentItem}):B(Z.options.items,Z.element),Z]);
this.containers.push(Z)
}}}}for(var R=Q.length-1;
R>=0;
R--){var A=Q[R][1];
var S=Q[R][0];
for(var P=0,W=S.length;
P<W;
P++){var V=B(S[P]);
V.data("sortable-item",A);
O.push({item:V,instance:A,width:0,height:0,left:0,top:0})
}}},refreshPositions:function(H){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()
}for(var A=this.items.length-1;
A>=0;
A--){var J=this.items[A];
if(J.instance!=this.currentContainer&&this.currentContainer&&J.item[0]!=this.currentItem[0]){continue
}var G=this.options.toleranceElement?B(this.options.toleranceElement,J.item):J.item;
if(!H){J.width=G.outerWidth();
J.height=G.outerHeight()
}var I=G.offset();
J.left=I.left;
J.top=I.top
}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)
}else{for(var A=this.containers.length-1;
A>=0;
A--){var I=this.containers[A].element.offset();
this.containers[A].containerCache.left=I.left;
this.containers[A].containerCache.top=I.top;
this.containers[A].containerCache.width=this.containers[A].element.outerWidth();
this.containers[A].containerCache.height=this.containers[A].element.outerHeight()
}}},_createPlaceholder:function(H){var F=H||this,G=F.options;
if(!G.placeholder||G.placeholder.constructor==String){var A=G.placeholder;
G.placeholder={element:function(){var C=B(document.createElement(F.currentItem[0].nodeName)).addClass(A||F.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!A){C.style.visibility="hidden"
}return C
},update:function(D,C){if(A&&!G.forcePlaceholderSize){return 
}if(!C.height()){C.height(F.currentItem.innerHeight()-parseInt(F.currentItem.css("paddingTop")||0,10)-parseInt(F.currentItem.css("paddingBottom")||0,10))
}if(!C.width()){C.width(F.currentItem.innerWidth()-parseInt(F.currentItem.css("paddingLeft")||0,10)-parseInt(F.currentItem.css("paddingRight")||0,10))
}}}
}F.placeholder=B(G.placeholder.element.call(F.element,F.currentItem));
F.currentItem.after(F.placeholder);
G.placeholder.update(F,F.placeholder)
},_contactContainers:function(A){for(var M=this.containers.length-1;
M>=0;
M--){if(this._intersectsWith(this.containers[M].containerCache)){if(!this.containers[M].containerCache.over){if(this.currentContainer!=this.containers[M]){var I=10000;
var K=null;
var N=this.positionAbs[this.containers[M].floating?"left":"top"];
for(var J=this.items.length-1;
J>=0;
J--){if(!B.ui.contains(this.containers[M].element[0],this.items[J].item[0])){continue
}var L=this.items[J][this.containers[M].floating?"left":"top"];
if(Math.abs(L-N)<I){I=Math.abs(L-N);
K=this.items[J]
}}if(!K&&!this.options.dropOnEmpty){continue
}this.currentContainer=this.containers[M];
K?this._rearrange(A,K,null,true):this._rearrange(A,null,this.containers[M].element,true);
this._trigger("change",A,this._uiHash());
this.containers[M]._trigger("change",A,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder)
}this.containers[M]._trigger("over",A,this._uiHash(this));
this.containers[M].containerCache.over=1
}}else{if(this.containers[M].containerCache.over){this.containers[M]._trigger("out",A,this._uiHash(this));
this.containers[M].containerCache.over=0
}}}},_createHelper:function(F){var E=this.options;
var A=B.isFunction(E.helper)?B(E.helper.apply(this.element[0],[F,this.currentItem])):(E.helper=="clone"?this.currentItem.clone():this.currentItem);
if(!A.parents("body").length){B(E.appendTo!="parent"?E.appendTo:this.currentItem[0].parentNode)[0].appendChild(A[0])
}if(A[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}
}if(A[0].style.width==""||E.forceHelperSize){A.width(this.currentItem.width())
}if(A[0].style.height==""||E.forceHelperSize){A.height(this.currentItem.height())
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
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var A=this.currentItem.position();
return{top:A.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:A.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var G=this.options;
if(G.containment=="parent"){G.containment=this.helper[0].parentNode
}if(G.containment=="document"||G.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,B(G.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(B(G.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(G.containment)){var A=B(G.containment)[0];
var H=B(G.containment).offset();
var F=(B(A).css("overflow")!="hidden");
this.containment=[H.left+(parseInt(B(A).css("borderLeftWidth"),10)||0)+(parseInt(B(A).css("paddingLeft"),10)||0)-this.margins.left,H.top+(parseInt(B(A).css("borderTopWidth"),10)||0)+(parseInt(B(A).css("paddingTop"),10)||0)-this.margins.top,H.left+(F?Math.max(A.scrollWidth,A.offsetWidth):A.offsetWidth)-(parseInt(B(A).css("borderLeftWidth"),10)||0)-(parseInt(B(A).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,H.top+(F?Math.max(A.scrollHeight,A.offsetHeight):A.offsetHeight)-(parseInt(B(A).css("borderTopWidth"),10)||0)-(parseInt(B(A).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}},_convertPositionTo:function(A,J){if(!J){J=this.position
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
},_rearrange:function(J,K,I,A){I?I[0].appendChild(this.placeholder[0]):K.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?K.item[0]:K.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;
var H=this,L=this.counter;
window.setTimeout(function(){if(L==H.counter){H.refreshPositions(!A)
}},0)
},_clear:function(A,J){this.reverting=false;
var I=[],H=this;
if(!this._noFinalSort&&this.currentItem[0].parentNode){this.placeholder.before(this.currentItem)
}this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){for(var G in this._storedCSS){if(this._storedCSS[G]=="auto"||this._storedCSS[G]=="static"){this._storedCSS[G]=""
}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}if(this.fromOutside&&!J){I.push(function(C){this._trigger("receive",C,this._uiHash(this.fromOutside))
})
}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!J){I.push(function(C){this._trigger("update",C,this._uiHash())
})
}if(!B.ui.contains(this.element[0],this.currentItem[0])){if(!J){I.push(function(C){this._trigger("remove",C,this._uiHash())
})
}for(var G=this.containers.length-1;
G>=0;
G--){if(B.ui.contains(this.containers[G].element[0],this.currentItem[0])&&!J){I.push((function(C){return function(D){C._trigger("receive",D,this._uiHash(this))
}
}).call(this,this.containers[G]));
I.push((function(C){return function(D){C._trigger("update",D,this._uiHash(this))
}
}).call(this,this.containers[G]))
}}}for(var G=this.containers.length-1;
G>=0;
G--){if(!J){I.push((function(C){return function(D){C._trigger("deactivate",D,this._uiHash(this))
}
}).call(this,this.containers[G]))
}if(this.containers[G].containerCache.over){I.push((function(C){return function(D){C._trigger("out",D,this._uiHash(this))
}
}).call(this,this.containers[G]));
this.containers[G].containerCache.over=0
}}if(this._storedCursor){B("body").css("cursor",this._storedCursor)
}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)
}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)
}this.dragging=false;
if(this.cancelHelperRemoval){if(!J){this._trigger("beforeStop",A,this._uiHash());
for(var G=0;
G<I.length;
G++){I[G].call(this,A)
}this._trigger("stop",A,this._uiHash())
}return false
}if(!J){this._trigger("beforeStop",A,this._uiHash())
}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(this.helper[0]!=this.currentItem[0]){this.helper.remove()
}this.helper=null;
if(!J){for(var G=0;
G<I.length;
G++){I[G].call(this,A)
}this._trigger("stop",A,this._uiHash())
}this.fromOutside=false;
return true
},_trigger:function(){if(B.widget.prototype._trigger.apply(this,arguments)===false){this.cancel()
}},_uiHash:function(A){var D=A||this;
return{helper:D.helper,placeholder:D.placeholder||B([]),position:D.position,absolutePosition:D.positionAbs,offset:D.positionAbs,item:D.currentItem,sender:A?A.element:null}
}}));
B.extend(B.ui.sortable,{getter:"serialize toArray",version:"1.7.2",eventPrefix:"sort",defaults:{appendTo:"parent",axis:false,cancel:":input,option",connectWith:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000}})
})(jQuery);