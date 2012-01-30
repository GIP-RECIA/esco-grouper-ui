(function(A){A.widget("ui.sortable",A.extend({},A.ui.mouse,{_init:function(){var B=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?(/left|right/).test(this.items[0].item.css("float")):false;
this.offset=this.element.offset();
this._mouseInit()
},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
this._mouseDestroy();
for(var B=this.items.length-1;
B>=0;
B--){this.items[B].item.removeData("sortable-item")
}},_mouseCapture:function(G,C){if(this.reverting){return false
}if(this.options.disabled||this.options.type=="static"){return false
}this._refreshItems(G);
var F=null,E=this,D=A(G.target).parents().each(function(){if(A.data(this,"sortable-item")==E){F=A(this);
return false
}});
if(A.data(G.target,"sortable-item")==E){F=A(G.target)
}if(!F){return false
}if(this.options.handle&&!C){var B=false;
A(this.options.handle,F).find("*").andSelf().each(function(){if(this==G.target){B=true
}});
if(!B){return false
}}this.currentItem=F;
this._removeCurrentsFromItems();
return true
},_mouseStart:function(G,C,D){var B=this.options,E=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(G);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
A.extend(this.offset,{click:{left:G.pageX-this.offset.left,top:G.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(G);
this.originalPageX=G.pageX;
this.originalPageY=G.pageY;
if(B.cursorAt){this._adjustOffsetFromHelper(B.cursorAt)
}this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
if(this.helper[0]!=this.currentItem[0]){this.currentItem.hide()
}this._createPlaceholder();
if(B.containment){this._setContainment()
}if(B.cursor){if(A("body").css("cursor")){this._storedCursor=A("body").css("cursor")
}A("body").css("cursor",B.cursor)
}if(B.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")
}this.helper.css("opacity",B.opacity)
}if(B.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")
}this.helper.css("zIndex",B.zIndex)
}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()
}this._trigger("start",G,this._uiHash());
if(!this._preserveHelperProportions){this._cacheHelperProportions()
}if(!D){for(var F=this.containers.length-1;
F>=0;
F--){this.containers[F]._trigger("activate",G,E._uiHash(this))
}}if(A.ui.ddmanager){A.ui.ddmanager.current=this
}if(A.ui.ddmanager&&!B.dropBehaviour){A.ui.ddmanager.prepareOffsets(this,G)
}this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(G);
return true
},_mouseDrag:function(D){this.position=this._generatePosition(D);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs
}if(this.options.scroll){var E=this.options,F=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-D.pageY<E.scrollSensitivity){this.scrollParent[0].scrollTop=F=this.scrollParent[0].scrollTop+E.scrollSpeed
}else{if(D.pageY-this.overflowOffset.top<E.scrollSensitivity){this.scrollParent[0].scrollTop=F=this.scrollParent[0].scrollTop-E.scrollSpeed
}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-D.pageX<E.scrollSensitivity){this.scrollParent[0].scrollLeft=F=this.scrollParent[0].scrollLeft+E.scrollSpeed
}else{if(D.pageX-this.overflowOffset.left<E.scrollSensitivity){this.scrollParent[0].scrollLeft=F=this.scrollParent[0].scrollLeft-E.scrollSpeed
}}}else{if(D.pageY-A(document).scrollTop()<E.scrollSensitivity){F=A(document).scrollTop(A(document).scrollTop()-E.scrollSpeed)
}else{if(A(window).height()-(D.pageY-A(document).scrollTop())<E.scrollSensitivity){F=A(document).scrollTop(A(document).scrollTop()+E.scrollSpeed)
}}if(D.pageX-A(document).scrollLeft()<E.scrollSensitivity){F=A(document).scrollLeft(A(document).scrollLeft()-E.scrollSpeed)
}else{if(A(window).width()-(D.pageX-A(document).scrollLeft())<E.scrollSensitivity){F=A(document).scrollLeft(A(document).scrollLeft()+E.scrollSpeed)
}}}if(F!==false&&A.ui.ddmanager&&!E.dropBehaviour){A.ui.ddmanager.prepareOffsets(this,D)
}}this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}for(var H=this.items.length-1;
H>=0;
H--){var C=this.items[H],B=C.item[0],G=this._intersectsWithPointer(C);
if(!G){continue
}if(B!=this.currentItem[0]&&this.placeholder[G==1?"next":"prev"]()[0]!=B&&!A.ui.contains(this.placeholder[0],B)&&(this.options.type=="semi-dynamic"?!A.ui.contains(this.element[0],B):true)){this.direction=G==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(C)){this._rearrange(D,C)
}else{break
}this._trigger("change",D,this._uiHash());
break
}}this._contactContainers(D);
if(A.ui.ddmanager){A.ui.ddmanager.drag(this,D)
}this._trigger("sort",D,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false
},_mouseStop:function(E,B){if(!E){return 
}if(A.ui.ddmanager&&!this.options.dropBehaviour){A.ui.ddmanager.drop(this,E)
}if(this.options.revert){var D=this;
var C=D.placeholder.offset();
D.reverting=true;
A(this.helper).animate({left:C.left-this.offset.parent.left-D.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:C.top-this.offset.parent.top-D.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){D._clear(E)
})
}else{this._clear(E,B)
}return false
},cancel:function(){var B=this;
if(this.dragging){this._mouseUp();
if(this.options.helper=="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}for(var C=this.containers.length-1;
C>=0;
C--){this.containers[C]._trigger("deactivate",null,B._uiHash(this));
if(this.containers[C].containerCache.over){this.containers[C]._trigger("out",null,B._uiHash(this));
this.containers[C].containerCache.over=0
}}}if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])
}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()
}A.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
if(this.domPosition.prev){A(this.domPosition.prev).after(this.currentItem)
}else{A(this.domPosition.parent).prepend(this.currentItem)
}return true
},serialize:function(C){var D=this._getItemsAsjQuery(C&&C.connected);
var B=[];
C=C||{};
A(D).each(function(){var E=(A(C.item||this).attr(C.attribute||"id")||"").match(C.expression||(/(.+)[-=_](.+)/));
if(E){B.push((C.key||E[1]+"[]")+"="+(C.key&&C.expression?E[1]:E[2]))
}});
return B.join("&")
},toArray:function(C){var D=this._getItemsAsjQuery(C&&C.connected);
var B=[];
C=C||{};
D.each(function(){B.push(A(C.item||this).attr(C.attribute||"id")||"")
});
return B
},_intersectsWith:function(G){var M=this.positionAbs.left,K=M+this.helperProportions.width,F=this.positionAbs.top,E=F+this.helperProportions.height;
var L=G.left,J=L+G.width,H=G.top,D=H+G.height;
var I=this.offset.click.top,C=this.offset.click.left;
var B=(F+I)>H&&(F+I)<D&&(M+C)>L&&(M+C)<J;
if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>G[this.floating?"width":"height"])){return B
}else{return(L<M+(this.helperProportions.width/2)&&K-(this.helperProportions.width/2)<J&&H<F+(this.helperProportions.height/2)&&E-(this.helperProportions.height/2)<D)
}},_intersectsWithPointer:function(F){var G=A.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,F.top,F.height),E=A.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,F.left,F.width),D=G&&E,C=this._getDragVerticalDirection(),B=this._getDragHorizontalDirection();
if(!D){return false
}return this.floating?(((B&&B=="right")||C=="down")?2:1):(C&&(C=="down"?2:1))
},_intersectsWithSides:function(B){var E=A.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,B.top+(B.height/2),B.height),F=A.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,B.left+(B.width/2),B.width),D=this._getDragVerticalDirection(),C=this._getDragHorizontalDirection();
if(this.floating&&C){return((C=="right"&&F)||(C=="left"&&!F))
}else{return D&&((D=="down"&&E)||(D=="up"&&!E))
}},_getDragVerticalDirection:function(){var B=this.positionAbs.top-this.lastPositionAbs.top;
return B!=0&&(B>0?"down":"up")
},_getDragHorizontalDirection:function(){var B=this.positionAbs.left-this.lastPositionAbs.left;
return B!=0&&(B>0?"right":"left")
},refresh:function(B){this._refreshItems(B);
this.refreshPositions()
},_connectWith:function(){var B=this.options;
return B.connectWith.constructor==String?[B.connectWith]:B.connectWith
},_getItemsAsjQuery:function(G){var F=this;
var C=[];
var J=[];
var D=this._connectWith();
if(D&&G){for(var I=D.length-1;
I>=0;
I--){var E=A(D[I]);
for(var H=E.length-1;
H>=0;
H--){var B=A.data(E[H],"sortable");
if(B&&B!=this&&!B.options.disabled){J.push([A.isFunction(B.options.items)?B.options.items.call(B.element):A(B.options.items,B.element).not(".ui-sortable-helper"),B])
}}}}J.push([A.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):A(this.options.items,this.element).not(".ui-sortable-helper"),this]);
for(var I=J.length-1;
I>=0;
I--){J[I][0].each(function(){C.push(this)
})
}return A(C)
},_removeCurrentsFromItems:function(){var C=this.currentItem.find(":data(sortable-item)");
for(var B=0;
B<this.items.length;
B++){for(var D=0;
D<C.length;
D++){if(C[D]==this.items[B].item[0]){this.items.splice(B,1)
}}}},_refreshItems:function(K){this.items=[];
this.containers=[this];
var C=this.items;
var J=this;
var N=[[A.isFunction(this.options.items)?this.options.items.call(this.element[0],K,{item:this.currentItem}):A(this.options.items,this.element),this]];
var F=this._connectWith();
if(F){for(var M=F.length-1;
M>=0;
M--){var G=A(F[M]);
for(var B=G.length-1;
B>=0;
B--){var E=A.data(G[B],"sortable");
if(E&&E!=this&&!E.options.disabled){N.push([A.isFunction(E.options.items)?E.options.items.call(E.element[0],K,{item:this.currentItem}):A(E.options.items,E.element),E]);
this.containers.push(E)
}}}}for(var M=N.length-1;
M>=0;
M--){var D=N[M][1];
var L=N[M][0];
for(var B=0,H=L.length;
B<H;
B++){var I=A(L[B]);
I.data("sortable-item",D);
C.push({item:I,instance:D,width:0,height:0,left:0,top:0})
}}},refreshPositions:function(D){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()
}for(var F=this.items.length-1;
F>=0;
F--){var B=this.items[F];
if(B.instance!=this.currentContainer&&this.currentContainer&&B.item[0]!=this.currentItem[0]){continue
}var E=this.options.toleranceElement?A(this.options.toleranceElement,B.item):B.item;
if(!D){B.width=E.outerWidth();
B.height=E.outerHeight()
}var C=E.offset();
B.left=C.left;
B.top=C.top
}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)
}else{for(var F=this.containers.length-1;
F>=0;
F--){var C=this.containers[F].element.offset();
this.containers[F].containerCache.left=C.left;
this.containers[F].containerCache.top=C.top;
this.containers[F].containerCache.width=this.containers[F].element.outerWidth();
this.containers[F].containerCache.height=this.containers[F].element.outerHeight()
}}},_createPlaceholder:function(B){var D=B||this,C=D.options;
if(!C.placeholder||C.placeholder.constructor==String){var E=C.placeholder;
C.placeholder={element:function(){var F=A(document.createElement(D.currentItem[0].nodeName)).addClass(E||D.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!E){F.style.visibility="hidden"
}return F
},update:function(F,G){if(E&&!C.forcePlaceholderSize){return 
}if(!G.height()){G.height(D.currentItem.innerHeight()-parseInt(D.currentItem.css("paddingTop")||0,10)-parseInt(D.currentItem.css("paddingBottom")||0,10))
}if(!G.width()){G.width(D.currentItem.innerWidth()-parseInt(D.currentItem.css("paddingLeft")||0,10)-parseInt(D.currentItem.css("paddingRight")||0,10))
}}}
}D.placeholder=A(C.placeholder.element.call(D.element,D.currentItem));
D.currentItem.after(D.placeholder);
C.placeholder.update(D,D.placeholder)
},_contactContainers:function(H){for(var C=this.containers.length-1;
C>=0;
C--){if(this._intersectsWith(this.containers[C].containerCache)){if(!this.containers[C].containerCache.over){if(this.currentContainer!=this.containers[C]){var G=10000;
var E=null;
var B=this.positionAbs[this.containers[C].floating?"left":"top"];
for(var F=this.items.length-1;
F>=0;
F--){if(!A.ui.contains(this.containers[C].element[0],this.items[F].item[0])){continue
}var D=this.items[F][this.containers[C].floating?"left":"top"];
if(Math.abs(D-B)<G){G=Math.abs(D-B);
E=this.items[F]
}}if(!E&&!this.options.dropOnEmpty){continue
}this.currentContainer=this.containers[C];
E?this._rearrange(H,E,null,true):this._rearrange(H,null,this.containers[C].element,true);
this._trigger("change",H,this._uiHash());
this.containers[C]._trigger("change",H,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder)
}this.containers[C]._trigger("over",H,this._uiHash(this));
this.containers[C].containerCache.over=1
}}else{if(this.containers[C].containerCache.over){this.containers[C]._trigger("out",H,this._uiHash(this));
this.containers[C].containerCache.over=0
}}}},_createHelper:function(B){var C=this.options;
var D=A.isFunction(C.helper)?A(C.helper.apply(this.element[0],[B,this.currentItem])):(C.helper=="clone"?this.currentItem.clone():this.currentItem);
if(!D.parents("body").length){A(C.appendTo!="parent"?C.appendTo:this.currentItem[0].parentNode)[0].appendChild(D[0])
}if(D[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}
}if(D[0].style.width==""||C.forceHelperSize){D.width(this.currentItem.width())
}if(D[0].style.height==""||C.forceHelperSize){D.height(this.currentItem.height())
}return D
},_adjustOffsetFromHelper:function(B){if(B.left!=undefined){this.offset.click.left=B.left+this.margins.left
}if(B.right!=undefined){this.offset.click.left=this.helperProportions.width-B.right+this.margins.left
}if(B.top!=undefined){this.offset.click.top=B.top+this.margins.top
}if(B.bottom!=undefined){this.offset.click.top=this.helperProportions.height-B.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var B=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0])){B.left+=this.scrollParent.scrollLeft();
B.top+=this.scrollParent.scrollTop()
}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&A.browser.msie)){B={top:0,left:0}
}return{top:B.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:B.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var B=this.currentItem.position();
return{top:B.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:B.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var C=this.options;
if(C.containment=="parent"){C.containment=this.helper[0].parentNode
}if(C.containment=="document"||C.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,A(C.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(A(C.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(C.containment)){var E=A(C.containment)[0];
var B=A(C.containment).offset();
var D=(A(E).css("overflow")!="hidden");
this.containment=[B.left+(parseInt(A(E).css("borderLeftWidth"),10)||0)+(parseInt(A(E).css("paddingLeft"),10)||0)-this.margins.left,B.top+(parseInt(A(E).css("borderTopWidth"),10)||0)+(parseInt(A(E).css("paddingTop"),10)||0)-this.margins.top,B.left+(D?Math.max(E.scrollWidth,E.offsetWidth):E.offsetWidth)-(parseInt(A(E).css("borderLeftWidth"),10)||0)-(parseInt(A(E).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,B.top+(D?Math.max(E.scrollHeight,E.offsetHeight):E.offsetHeight)-(parseInt(A(E).css("borderTopWidth"),10)||0)-(parseInt(A(E).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}},_convertPositionTo:function(G,D){if(!D){D=this.position
}var E=G=="absolute"?1:-1;
var F=this.options,C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,B=(/(html|body)/i).test(C[0].tagName);
return{top:(D.top+this.offset.relative.top*E+this.offset.parent.top*E-(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(B?0:C.scrollTop()))*E)),left:(D.left+this.offset.relative.left*E+this.offset.parent.left*E-(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():B?0:C.scrollLeft())*E))}
},_generatePosition:function(C){var I=this.options,B=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,G=(/(html|body)/i).test(B[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()
}var E=C.pageX;
var D=C.pageY;
if(this.originalPosition){if(this.containment){if(C.pageX-this.offset.click.left<this.containment[0]){E=this.containment[0]+this.offset.click.left
}if(C.pageY-this.offset.click.top<this.containment[1]){D=this.containment[1]+this.offset.click.top
}if(C.pageX-this.offset.click.left>this.containment[2]){E=this.containment[2]+this.offset.click.left
}if(C.pageY-this.offset.click.top>this.containment[3]){D=this.containment[3]+this.offset.click.top
}}if(I.grid){var H=this.originalPageY+Math.round((D-this.originalPageY)/I.grid[1])*I.grid[1];
D=this.containment?(!(H-this.offset.click.top<this.containment[1]||H-this.offset.click.top>this.containment[3])?H:(!(H-this.offset.click.top<this.containment[1])?H-I.grid[1]:H+I.grid[1])):H;
var F=this.originalPageX+Math.round((E-this.originalPageX)/I.grid[0])*I.grid[0];
E=this.containment?(!(F-this.offset.click.left<this.containment[0]||F-this.offset.click.left>this.containment[2])?F:(!(F-this.offset.click.left<this.containment[0])?F-I.grid[0]:F+I.grid[0])):F
}}return{top:(D-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(G?0:B.scrollTop())))),left:(E-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():G?0:B.scrollLeft())))}
},_rearrange:function(D,C,E,G){E?E[0].appendChild(this.placeholder[0]):C.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?C.item[0]:C.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;
var F=this,B=this.counter;
window.setTimeout(function(){if(B==F.counter){F.refreshPositions(!G)
}},0)
},_clear:function(F,B){this.reverting=false;
var C=[],D=this;
if(!this._noFinalSort&&this.currentItem[0].parentNode){this.placeholder.before(this.currentItem)
}this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){for(var E in this._storedCSS){if(this._storedCSS[E]=="auto"||this._storedCSS[E]=="static"){this._storedCSS[E]=""
}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}if(this.fromOutside&&!B){C.push(function(G){this._trigger("receive",G,this._uiHash(this.fromOutside))
})
}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!B){C.push(function(G){this._trigger("update",G,this._uiHash())
})
}if(!A.ui.contains(this.element[0],this.currentItem[0])){if(!B){C.push(function(G){this._trigger("remove",G,this._uiHash())
})
}for(var E=this.containers.length-1;
E>=0;
E--){if(A.ui.contains(this.containers[E].element[0],this.currentItem[0])&&!B){C.push((function(G){return function(H){G._trigger("receive",H,this._uiHash(this))
}
}).call(this,this.containers[E]));
C.push((function(G){return function(H){G._trigger("update",H,this._uiHash(this))
}
}).call(this,this.containers[E]))
}}}for(var E=this.containers.length-1;
E>=0;
E--){if(!B){C.push((function(G){return function(H){G._trigger("deactivate",H,this._uiHash(this))
}
}).call(this,this.containers[E]))
}if(this.containers[E].containerCache.over){C.push((function(G){return function(H){G._trigger("out",H,this._uiHash(this))
}
}).call(this,this.containers[E]));
this.containers[E].containerCache.over=0
}}if(this._storedCursor){A("body").css("cursor",this._storedCursor)
}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)
}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)
}this.dragging=false;
if(this.cancelHelperRemoval){if(!B){this._trigger("beforeStop",F,this._uiHash());
for(var E=0;
E<C.length;
E++){C[E].call(this,F)
}this._trigger("stop",F,this._uiHash())
}return false
}if(!B){this._trigger("beforeStop",F,this._uiHash())
}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(this.helper[0]!=this.currentItem[0]){this.helper.remove()
}this.helper=null;
if(!B){for(var E=0;
E<C.length;
E++){C[E].call(this,F)
}this._trigger("stop",F,this._uiHash())
}this.fromOutside=false;
return true
},_trigger:function(){if(A.widget.prototype._trigger.apply(this,arguments)===false){this.cancel()
}},_uiHash:function(C){var B=C||this;
return{helper:B.helper,placeholder:B.placeholder||A([]),position:B.position,absolutePosition:B.positionAbs,offset:B.positionAbs,item:B.currentItem,sender:C?C.element:null}
}}));
A.extend(A.ui.sortable,{getter:"serialize toArray",version:"1.7.2",eventPrefix:"sort",defaults:{appendTo:"parent",axis:false,cancel:":input,option",connectWith:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000}})
})(jQuery);