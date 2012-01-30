(function(A){A.widget("ui.draggable",A.extend({},A.ui.mouse,{_init:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"
}(this.options.addClasses&&this.element.addClass("ui-draggable"));
(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));
this._mouseInit()
},destroy:function(){if(!this.element.data("draggable")){return 
}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy()
},_mouseCapture:function(B){var C=this.options;
if(this.helper||C.disabled||A(B.target).is(".ui-resizable-handle")){return false
}this.handle=this._getHandle(B);
if(!this.handle){return false
}return true
},_mouseStart:function(B){var C=this.options;
this.helper=this._createHelper(B);
this._cacheHelperProportions();
if(A.ui.ddmanager){A.ui.ddmanager.current=this
}this._cacheMargins();
this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent();
this.offset=this.element.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
A.extend(this.offset,{click:{left:B.pageX-this.offset.left,top:B.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(B);
this.originalPageX=B.pageX;
this.originalPageY=B.pageY;
if(C.cursorAt){this._adjustOffsetFromHelper(C.cursorAt)
}if(C.containment){this._setContainment()
}this._trigger("start",B);
this._cacheHelperProportions();
if(A.ui.ddmanager&&!C.dropBehaviour){A.ui.ddmanager.prepareOffsets(this,B)
}this.helper.addClass("ui-draggable-dragging");
this._mouseDrag(B,true);
return true
},_mouseDrag:function(D,C){this.position=this._generatePosition(D);
this.positionAbs=this._convertPositionTo("absolute");
if(!C){var B=this._uiHash();
this._trigger("drag",D,B);
this.position=B.position
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}if(A.ui.ddmanager){A.ui.ddmanager.drag(this,D)
}return false
},_mouseStop:function(B){var C=false;
if(A.ui.ddmanager&&!this.options.dropBehaviour){C=A.ui.ddmanager.drop(this,B)
}if(this.dropped){C=this.dropped;
this.dropped=false
}if((this.options.revert=="invalid"&&!C)||(this.options.revert=="valid"&&C)||this.options.revert===true||(A.isFunction(this.options.revert)&&this.options.revert.call(this.element,C))){var D=this;
A(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){D._trigger("stop",B);
D._clear()
})
}else{this._trigger("stop",B);
this._clear()
}return false
},_getHandle:function(B){var C=!this.options.handle||!A(this.options.handle,this.element).length?true:false;
A(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==B.target){C=true
}});
return C
},_createHelper:function(B){var C=this.options;
var D=A.isFunction(C.helper)?A(C.helper.apply(this.element[0],[B])):(C.helper=="clone"?this.element.clone():this.element);
if(!D.parents("body").length){D.appendTo((C.appendTo=="parent"?this.element[0].parentNode:C.appendTo))
}if(D[0]!=this.element[0]&&!(/(fixed|absolute)/).test(D.css("position"))){D.css("position","absolute")
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
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var B=this.element.position();
return{top:B.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:B.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var C=this.options;
if(C.containment=="parent"){C.containment=this.helper[0].parentNode
}if(C.containment=="document"||C.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,A(C.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(A(C.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(C.containment)&&C.containment.constructor!=Array){var E=A(C.containment)[0];
if(!E){return 
}var B=A(C.containment).offset();
var D=(A(E).css("overflow")!="hidden");
this.containment=[B.left+(parseInt(A(E).css("borderLeftWidth"),10)||0)+(parseInt(A(E).css("paddingLeft"),10)||0)-this.margins.left,B.top+(parseInt(A(E).css("borderTopWidth"),10)||0)+(parseInt(A(E).css("paddingTop"),10)||0)-this.margins.top,B.left+(D?Math.max(E.scrollWidth,E.offsetWidth):E.offsetWidth)-(parseInt(A(E).css("borderLeftWidth"),10)||0)-(parseInt(A(E).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,B.top+(D?Math.max(E.scrollHeight,E.offsetHeight):E.offsetHeight)-(parseInt(A(E).css("borderTopWidth"),10)||0)-(parseInt(A(E).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}else{if(C.containment.constructor==Array){this.containment=C.containment
}}},_convertPositionTo:function(G,D){if(!D){D=this.position
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
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()
}this.helper=null;
this.cancelHelperRemoval=false
},_trigger:function(D,B,C){C=C||this._uiHash();
A.ui.plugin.call(this,D,[B,C]);
if(D=="drag"){this.positionAbs=this._convertPositionTo("absolute")
}return A.widget.prototype._trigger.call(this,D,B,C)
},plugins:{},_uiHash:function(B){return{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,offset:this.positionAbs}
}}));
A.extend(A.ui.draggable,{version:"1.7.2",eventPrefix:"drag",defaults:{addClasses:true,appendTo:"parent",axis:false,cancel:":input,option",connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false}});
A.ui.plugin.add("draggable","connectToSortable",{start:function(E,B){var F=A(this).data("draggable"),C=F.options,D=A.extend({},B,{item:F.element});
F.sortables=[];
A(C.connectToSortable).each(function(){var G=A.data(this,"sortable");
if(G&&!G.options.disabled){F.sortables.push({instance:G,shouldRevert:G.options.revert});
G._refreshItems();
G._trigger("activate",E,D)
}})
},stop:function(E,C){var B=A(this).data("draggable"),D=A.extend({},C,{item:B.element});
A.each(B.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;
B.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;
if(this.shouldRevert){this.instance.options.revert=true
}this.instance._mouseStop(E);
this.instance.options.helper=this.instance.options._helper;
if(B.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})
}}else{this.instance.cancelHelperRemoval=false;
this.instance._trigger("deactivate",E,D)
}})
},drag:function(E,C){var B=A(this).data("draggable"),D=this;
var F=function(M){var I=this.offset.click.top,H=this.offset.click.left;
var K=this.positionAbs.top,O=this.positionAbs.left;
var N=M.height,G=M.width;
var J=M.top,L=M.left;
return A.ui.isOver(K+I,O+H,J,L,N,G)
};
A.each(B.sortables,function(G){this.instance.positionAbs=B.positionAbs;
this.instance.helperProportions=B.helperProportions;
this.instance.offset.click=B.offset.click;
if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=A(D).clone().appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return C.helper[0]
};
E.target=this.instance.currentItem[0];
this.instance._mouseCapture(E,true);
this.instance._mouseStart(E,true,true);
this.instance.offset.click.top=B.offset.click.top;
this.instance.offset.click.left=B.offset.click.left;
this.instance.offset.parent.left-=B.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=B.offset.parent.top-this.instance.offset.parent.top;
B._trigger("toSortable",E);
B.dropped=this.instance.element;
B.currentItem=B.element;
this.instance.fromOutside=B
}if(this.instance.currentItem){this.instance._mouseDrag(E)
}}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;
this.instance.options.revert=false;
this.instance._trigger("out",E,this.instance._uiHash(this.instance));
this.instance._mouseStop(E,true);
this.instance.options.helper=this.instance.options._helper;
this.instance.currentItem.remove();
if(this.instance.placeholder){this.instance.placeholder.remove()
}B._trigger("fromSortable",E);
B.dropped=false
}}})
}});
A.ui.plugin.add("draggable","cursor",{start:function(E,B){var D=A("body"),C=A(this).data("draggable").options;
if(D.css("cursor")){C._cursor=D.css("cursor")
}D.css("cursor",C.cursor)
},stop:function(D,B){var C=A(this).data("draggable").options;
if(C._cursor){A("body").css("cursor",C._cursor)
}}});
A.ui.plugin.add("draggable","iframeFix",{start:function(D,B){var C=A(this).data("draggable").options;
A(C.iframeFix===true?"iframe":C.iframeFix).each(function(){A('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(A(this).offset()).appendTo("body")
})
},stop:function(B,C){A("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
})
}});
A.ui.plugin.add("draggable","opacity",{start:function(E,B){var D=A(B.helper),C=A(this).data("draggable").options;
if(D.css("opacity")){C._opacity=D.css("opacity")
}D.css("opacity",C.opacity)
},stop:function(D,B){var C=A(this).data("draggable").options;
if(C._opacity){A(B.helper).css("opacity",C._opacity)
}}});
A.ui.plugin.add("draggable","scroll",{start:function(B,C){var D=A(this).data("draggable");
if(D.scrollParent[0]!=document&&D.scrollParent[0].tagName!="HTML"){D.overflowOffset=D.scrollParent.offset()
}},drag:function(F,B){var E=A(this).data("draggable"),C=E.options,D=false;
if(E.scrollParent[0]!=document&&E.scrollParent[0].tagName!="HTML"){if(!C.axis||C.axis!="x"){if((E.overflowOffset.top+E.scrollParent[0].offsetHeight)-F.pageY<C.scrollSensitivity){E.scrollParent[0].scrollTop=D=E.scrollParent[0].scrollTop+C.scrollSpeed
}else{if(F.pageY-E.overflowOffset.top<C.scrollSensitivity){E.scrollParent[0].scrollTop=D=E.scrollParent[0].scrollTop-C.scrollSpeed
}}}if(!C.axis||C.axis!="y"){if((E.overflowOffset.left+E.scrollParent[0].offsetWidth)-F.pageX<C.scrollSensitivity){E.scrollParent[0].scrollLeft=D=E.scrollParent[0].scrollLeft+C.scrollSpeed
}else{if(F.pageX-E.overflowOffset.left<C.scrollSensitivity){E.scrollParent[0].scrollLeft=D=E.scrollParent[0].scrollLeft-C.scrollSpeed
}}}}else{if(!C.axis||C.axis!="x"){if(F.pageY-A(document).scrollTop()<C.scrollSensitivity){D=A(document).scrollTop(A(document).scrollTop()-C.scrollSpeed)
}else{if(A(window).height()-(F.pageY-A(document).scrollTop())<C.scrollSensitivity){D=A(document).scrollTop(A(document).scrollTop()+C.scrollSpeed)
}}}if(!C.axis||C.axis!="y"){if(F.pageX-A(document).scrollLeft()<C.scrollSensitivity){D=A(document).scrollLeft(A(document).scrollLeft()-C.scrollSpeed)
}else{if(A(window).width()-(F.pageX-A(document).scrollLeft())<C.scrollSensitivity){D=A(document).scrollLeft(A(document).scrollLeft()+C.scrollSpeed)
}}}}if(D!==false&&A.ui.ddmanager&&!C.dropBehaviour){A.ui.ddmanager.prepareOffsets(E,F)
}}});
A.ui.plugin.add("draggable","snap",{start:function(E,B){var D=A(this).data("draggable"),C=D.options;
D.snapElements=[];
A(C.snap.constructor!=String?(C.snap.items||":data(draggable)"):C.snap).each(function(){var G=A(this);
var F=G.offset();
if(this!=D.element[0]){D.snapElements.push({item:this,width:G.outerWidth(),height:G.outerHeight(),top:F.top,left:F.left})
}})
},drag:function(I,F){var S=A(this).data("draggable"),G=S.options;
var M=G.snapTolerance;
var L=F.offset.left,K=L+S.helperProportions.width,R=F.offset.top,Q=R+S.helperProportions.height;
for(var J=S.snapElements.length-1;
J>=0;
J--){var H=S.snapElements[J].left,E=H+S.snapElements[J].width,D=S.snapElements[J].top,O=D+S.snapElements[J].height;
if(!((H-M<L&&L<E+M&&D-M<R&&R<O+M)||(H-M<L&&L<E+M&&D-M<Q&&Q<O+M)||(H-M<K&&K<E+M&&D-M<R&&R<O+M)||(H-M<K&&K<E+M&&D-M<Q&&Q<O+M))){if(S.snapElements[J].snapping){(S.options.snap.release&&S.options.snap.release.call(S.element,I,A.extend(S._uiHash(),{snapItem:S.snapElements[J].item})))
}S.snapElements[J].snapping=false;
continue
}if(G.snapMode!="inner"){var P=Math.abs(D-Q)<=M;
var N=Math.abs(O-R)<=M;
var B=Math.abs(H-K)<=M;
var C=Math.abs(E-L)<=M;
if(P){F.position.top=S._convertPositionTo("relative",{top:D-S.helperProportions.height,left:0}).top-S.margins.top
}if(N){F.position.top=S._convertPositionTo("relative",{top:O,left:0}).top-S.margins.top
}if(B){F.position.left=S._convertPositionTo("relative",{top:0,left:H-S.helperProportions.width}).left-S.margins.left
}if(C){F.position.left=S._convertPositionTo("relative",{top:0,left:E}).left-S.margins.left
}}var T=(P||N||B||C);
if(G.snapMode!="outer"){var P=Math.abs(D-R)<=M;
var N=Math.abs(O-Q)<=M;
var B=Math.abs(H-L)<=M;
var C=Math.abs(E-K)<=M;
if(P){F.position.top=S._convertPositionTo("relative",{top:D,left:0}).top-S.margins.top
}if(N){F.position.top=S._convertPositionTo("relative",{top:O-S.helperProportions.height,left:0}).top-S.margins.top
}if(B){F.position.left=S._convertPositionTo("relative",{top:0,left:H}).left-S.margins.left
}if(C){F.position.left=S._convertPositionTo("relative",{top:0,left:E-S.helperProportions.width}).left-S.margins.left
}}if(!S.snapElements[J].snapping&&(P||N||B||C||T)){(S.options.snap.snap&&S.options.snap.snap.call(S.element,I,A.extend(S._uiHash(),{snapItem:S.snapElements[J].item})))
}S.snapElements[J].snapping=(P||N||B||C||T)
}}});
A.ui.plugin.add("draggable","stack",{start:function(D,E){var C=A(this).data("draggable").options;
var B=A.makeArray(A(C.stack.group)).sort(function(G,F){return(parseInt(A(G).css("zIndex"),10)||C.stack.min)-(parseInt(A(F).css("zIndex"),10)||C.stack.min)
});
A(B).each(function(F){this.style.zIndex=C.stack.min+F
});
this[0].style.zIndex=C.stack.min+B.length
}});
A.ui.plugin.add("draggable","zIndex",{start:function(E,B){var D=A(B.helper),C=A(this).data("draggable").options;
if(D.css("zIndex")){C._zIndex=D.css("zIndex")
}D.css("zIndex",C.zIndex)
},stop:function(D,B){var C=A(this).data("draggable").options;
if(C._zIndex){A(B.helper).css("zIndex",C._zIndex)
}}})
})(jQuery);