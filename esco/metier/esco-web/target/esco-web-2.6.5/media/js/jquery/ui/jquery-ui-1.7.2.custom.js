jQuery.ui||(function(J){var M=J.fn.remove,R=J.browser.mozilla&&(parseFloat(J.browser.version)<1.9);
J.ui={version:"1.7.2",plugin:{add:function(A,E,C){var D=J.ui[A].prototype;
for(var B in C){D.plugins[B]=D.plugins[B]||[];
D.plugins[B].push([E,C[B]])
}},call:function(B,E,A){var C=B.plugins[E];
if(!C||!B.element[0].parentNode){return 
}for(var D=0;
D<C.length;
D++){if(B.options[C[D][0]]){C[D][1].apply(B.element,A)
}}}},contains:function(A,B){return document.compareDocumentPosition?A.compareDocumentPosition(B)&16:A!==B&&A.contains(B)
},hasScroll:function(D,B){if(J(D).css("overflow")=="hidden"){return false
}var C=(B&&B=="left")?"scrollLeft":"scrollTop",A=false;
if(D[C]>0){return true
}D[C]=1;
A=(D[C]>0);
D[C]=0;
return A
},isOverAxis:function(C,A,B){return(C>A)&&(C<(A+B))
},isOver:function(B,F,C,D,A,E){return J.ui.isOverAxis(B,C,A)&&J.ui.isOverAxis(F,D,E)
},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};
if(R){var P=J.attr,Q=J.fn.removeAttr,N="http://www.w3.org/2005/07/aaa",L=/^aria-/,K=/^wairole:/;
J.attr=function(B,C,A){var D=A!==undefined;
return(C=="role"?(D?P.call(this,B,C,"wairole:"+A):(P.apply(this,arguments)||"").replace(K,"")):(L.test(C)?(D?B.setAttributeNS(N,C.replace(L,"aaa:"),A):P.call(this,B,C.replace(L,"aaa:"))):P.apply(this,arguments)))
};
J.fn.removeAttr=function(A){return(L.test(A)?this.each(function(){this.removeAttributeNS(N,A.replace(L,""))
}):Q.call(this,A))
}
}J.fn.extend({remove:function(){J("*",this).add(this).each(function(){J(this).triggerHandler("remove")
});
return M.apply(this,arguments)
},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")
},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false
})
},scrollParent:function(){var A;
if((J.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){A=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(J.curCSS(this,"position",1))&&(/(auto|scroll)/).test(J.curCSS(this,"overflow",1)+J.curCSS(this,"overflow-y",1)+J.curCSS(this,"overflow-x",1))
}).eq(0)
}else{A=this.parents().filter(function(){return(/(auto|scroll)/).test(J.curCSS(this,"overflow",1)+J.curCSS(this,"overflow-y",1)+J.curCSS(this,"overflow-x",1))
}).eq(0)
}return(/fixed/).test(this.css("position"))||!A.length?J(document):A
}});
J.extend(J.expr[":"],{data:function(B,C,A){return !!J.data(B,A[3])
},focusable:function(C){var B=C.nodeName.toLowerCase(),A=J.attr(C,"tabindex");
return(/input|select|textarea|button|object/.test(B)?!C.disabled:"a"==B||"area"==B?C.href||!isNaN(A):!isNaN(A))&&!J(C)["area"==B?"parents":"closest"](":hidden").length
},tabbable:function(A){var B=J.attr(A,"tabindex");
return(isNaN(B)||B>=0)&&J(A).is(":focusable")
}});
function O(D,C,B,E){function F(G){var H=J[D][C][G]||[];
return(typeof H=="string"?H.split(/,?\s+/):H)
}var A=F("getter");
if(E.length==1&&typeof E[0]=="string"){A=A.concat(F("getterSetter"))
}return(J.inArray(B,A)!=-1)
}J.widget=function(C,A){var B=C.split(".")[0];
C=C.split(".")[1];
J.fn[C]=function(D){var F=(typeof D=="string"),E=Array.prototype.slice.call(arguments,1);
if(F&&D.substring(0,1)=="_"){return this
}if(F&&O(B,C,D,E)){var G=J.data(this[0],C);
return(G?G[D].apply(G,E):undefined)
}return this.each(function(){var H=J.data(this,C);
(!H&&!F&&J.data(this,C,new J[B][C](this,D))._init());
(H&&F&&J.isFunction(H[D])&&H[D].apply(H,E))
})
};
J[B]=J[B]||{};
J[B][C]=function(D,E){var F=this;
this.namespace=B;
this.widgetName=C;
this.widgetEventPrefix=J[B][C].eventPrefix||C;
this.widgetBaseClass=B+"-"+C;
this.options=J.extend({},J.widget.defaults,J[B][C].defaults,J.metadata&&J.metadata.get(D)[C],E);
this.element=J(D).bind("setData."+C,function(H,I,G){if(H.target==D){return F._setData(I,G)
}}).bind("getData."+C,function(G,H){if(G.target==D){return F._getData(H)
}}).bind("remove",function(){return F.destroy()
})
};
J[B][C].prototype=J.extend({},J.widget.prototype,A);
J[B][C].getterSetter="option"
};
J.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").removeAttr("aria-disabled")
},option:function(A,D){var B=A,C=this;
if(typeof A=="string"){if(D===undefined){return this._getData(A)
}B={};
B[A]=D
}J.each(B,function(F,E){C._setData(F,E)
})
},_getData:function(A){return this.options[A]
},_setData:function(B,A){this.options[B]=A;
if(B=="disabled"){this.element[A?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",A)
}},enable:function(){this._setData("disabled",false)
},disable:function(){this._setData("disabled",true)
},_trigger:function(E,D,C){var A=this.options[E],G=(E==this.widgetEventPrefix?E:this.widgetEventPrefix+E);
D=J.Event(D);
D.type=G;
if(D.originalEvent){for(var F=J.event.props.length,B;
F;
){B=J.event.props[--F];
D[B]=D.originalEvent[B]
}}this.element.trigger(D,C);
return !(J.isFunction(A)&&A.call(this.element[0],D,C)===false||D.isDefaultPrevented())
}};
J.widget.defaults={disabled:false};
J.ui.mouse={_mouseInit:function(){var A=this;
this.element.bind("mousedown."+this.widgetName,function(B){return A._mouseDown(B)
}).bind("click."+this.widgetName,function(B){if(A._preventClickEvent){A._preventClickEvent=false;
B.stopImmediatePropagation();
return false
}});
if(J.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");
this.element.attr("unselectable","on")
}this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);
(J.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))
},_mouseDown:function(A){A.originalEvent=A.originalEvent||{};
if(A.originalEvent.mouseHandled){return 
}(this._mouseStarted&&this._mouseUp(A));
this._mouseDownEvent=A;
var B=this,D=(A.which==1),C=(typeof this.options.cancel=="string"?J(A.target).parents().add(A.target).filter(this.options.cancel).length:false);
if(!D||C||!this._mouseCapture(A)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){B.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(A)&&this._mouseDelayMet(A)){this._mouseStarted=(this._mouseStart(A)!==false);
if(!this._mouseStarted){A.preventDefault();
return true
}}this._mouseMoveDelegate=function(E){return B._mouseMove(E)
};
this._mouseUpDelegate=function(E){return B._mouseUp(E)
};
J(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
(J.browser.safari||A.preventDefault());
A.originalEvent.mouseHandled=true;
return true
},_mouseMove:function(A){if(J.browser.msie&&!A.button){return this._mouseUp(A)
}if(this._mouseStarted){this._mouseDrag(A);
return A.preventDefault()
}if(this._mouseDistanceMet(A)&&this._mouseDelayMet(A)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,A)!==false);
(this._mouseStarted?this._mouseDrag(A):this._mouseUp(A))
}return !this._mouseStarted
},_mouseUp:function(A){J(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
this._preventClickEvent=(A.target==this._mouseDownEvent.target);
this._mouseStop(A)
}return false
},_mouseDistanceMet:function(A){return(Math.max(Math.abs(this._mouseDownEvent.pageX-A.pageX),Math.abs(this._mouseDownEvent.pageY-A.pageY))>=this.options.distance)
},_mouseDelayMet:function(A){return this.mouseDelayMet
},_mouseStart:function(A){},_mouseDrag:function(A){},_mouseStop:function(A){},_mouseCapture:function(A){return true
}};
J.ui.mouse.defaults={cancel:null,distance:1,delay:0}
})(jQuery);
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
(function(B){B.widget("ui.droppable",{_init:function(){var A=this.options,D=A.accept;
this.isover=0;
this.isout=1;
this.options.accept=this.options.accept&&B.isFunction(this.options.accept)?this.options.accept:function(C){return C.is(D)
};
this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};
B.ui.ddmanager.droppables[this.options.scope]=B.ui.ddmanager.droppables[this.options.scope]||[];
B.ui.ddmanager.droppables[this.options.scope].push(this);
(this.options.addClasses&&this.element.addClass("ui-droppable"))
},destroy:function(){var D=B.ui.ddmanager.droppables[this.options.scope];
for(var A=0;
A<D.length;
A++){if(D[A]==this){D.splice(A,1)
}}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable")
},_setData:function(D,A){if(D=="accept"){this.options.accept=A&&B.isFunction(A)?A:function(C){return C.is(A)
}
}else{B.widget.prototype._setData.apply(this,arguments)
}},_activate:function(A){var D=B.ui.ddmanager.current;
if(this.options.activeClass){this.element.addClass(this.options.activeClass)
}(D&&this._trigger("activate",A,this.ui(D)))
},_deactivate:function(A){var D=B.ui.ddmanager.current;
if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}(D&&this._trigger("deactivate",A,this.ui(D)))
},_over:function(A){var D=B.ui.ddmanager.current;
if(!D||(D.currentItem||D.element)[0]==this.element[0]){return 
}if(this.options.accept.call(this.element[0],(D.currentItem||D.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)
}this._trigger("over",A,this.ui(D))
}},_out:function(A){var D=B.ui.ddmanager.current;
if(!D||(D.currentItem||D.element)[0]==this.element[0]){return 
}if(this.options.accept.call(this.element[0],(D.currentItem||D.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("out",A,this.ui(D))
}},_drop:function(A,H){var F=H||B.ui.ddmanager.current;
if(!F||(F.currentItem||F.element)[0]==this.element[0]){return false
}var G=false;
this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var C=B.data(this,"droppable");
if(C.options.greedy&&B.ui.intersect(F,B.extend(C,{offset:C.element.offset()}),C.options.tolerance)){G=true;
return false
}});
if(G){return false
}if(this.options.accept.call(this.element[0],(F.currentItem||F.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("drop",A,this.ui(F));
return this.element
}return false
},ui:function(A){return{draggable:(A.currentItem||A.element),helper:A.helper,position:A.position,absolutePosition:A.positionAbs,offset:A.positionAbs}
}});
B.extend(B.ui.droppable,{version:"1.7.2",eventPrefix:"drop",defaults:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"}});
B.ui.intersect=function(Z,b,A){if(!b.offset){return false
}var S=(Z.positionAbs||Z.position.absolute).left,X=S+Z.helperProportions.width,P=(Z.positionAbs||Z.position.absolute).top,Q=P+Z.helperProportions.height;
var V=b.offset.left,Y=V+b.proportions.width,a=b.offset.top,R=a+b.proportions.height;
switch(A){case"fit":return(V<S&&X<Y&&a<P&&Q<R);
break;
case"intersect":return(V<S+(Z.helperProportions.width/2)&&X-(Z.helperProportions.width/2)<Y&&a<P+(Z.helperProportions.height/2)&&Q-(Z.helperProportions.height/2)<R);
break;
case"pointer":var U=((Z.positionAbs||Z.position.absolute).left+(Z.clickOffset||Z.offset.click).left),T=((Z.positionAbs||Z.position.absolute).top+(Z.clickOffset||Z.offset.click).top),W=B.ui.isOver(T,U,a,V,b.proportions.height,b.proportions.width);
return W;
break;
case"touch":return((P>=a&&P<=R)||(Q>=a&&Q<=R)||(P<a&&Q>R))&&((S>=V&&S<=Y)||(X>=V&&X<=Y)||(S<V&&X>Y));
break;
default:return false;
break
}};
B.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(M,K){var J=B.ui.ddmanager.droppables[M.options.scope];
var L=K?K.type:null;
var A=(M.currentItem||M.element).find(":data(droppable)").andSelf();
droppablesLoop:for(var I=0;
I<J.length;
I++){if(J[I].options.disabled||(M&&!J[I].options.accept.call(J[I].element[0],(M.currentItem||M.element)))){continue
}for(var N=0;
N<A.length;
N++){if(A[N]==J[I].element[0]){J[I].proportions.height=0;
continue droppablesLoop
}}J[I].visible=J[I].element.css("display")!="none";
if(!J[I].visible){continue
}J[I].offset=J[I].element.offset();
J[I].proportions={width:J[I].element[0].offsetWidth,height:J[I].element[0].offsetHeight};
if(L=="mousedown"){J[I]._activate.call(J[I],K)
}}},drop:function(A,F){var E=false;
B.each(B.ui.ddmanager.droppables[A.options.scope],function(){if(!this.options){return 
}if(!this.options.disabled&&this.visible&&B.ui.intersect(A,this,this.options.tolerance)){E=this._drop.call(this,F)
}if(!this.options.disabled&&this.visible&&this.options.accept.call(this.element[0],(A.currentItem||A.element))){this.isout=1;
this.isover=0;
this._deactivate.call(this,F)
}});
return E
},drag:function(D,A){if(D.options.refreshPositions){B.ui.ddmanager.prepareOffsets(D,A)
}B.each(B.ui.ddmanager.droppables[D.options.scope],function(){if(this.options.disabled||this.greedyChild||!this.visible){return 
}var I=B.ui.intersect(D,this,this.options.tolerance);
var C=!I&&this.isover==1?"isout":(I&&this.isover==0?"isover":null);
if(!C){return 
}var H;
if(this.options.greedy){var J=this.element.parents(":data(droppable):eq(0)");
if(J.length){H=B.data(J[0],"droppable");
H.greedyChild=(C=="isover"?1:0)
}}if(H&&C=="isover"){H.isover=0;
H.isout=1;
H._out.call(H,A)
}this[C]=1;
this[C=="isout"?"isover":"isout"]=0;
this[C=="isover"?"_over":"_out"].call(this,A);
if(H&&C=="isout"){H.isout=0;
H.isover=1;
H._over.call(H,A)
}})
}}
})(jQuery);
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
(function(B){B.widget("ui.selectable",B.extend({},B.ui.mouse,{_init:function(){var D=this;
this.element.addClass("ui-selectable");
this.dragged=false;
var A;
this.refresh=function(){A=B(D.options.filter,D.element[0]);
A.each(function(){var F=B(this);
var C=F.offset();
B.data(this,"selectable-item",{element:this,$element:F,left:C.left,top:C.top,right:C.left+F.outerWidth(),bottom:C.top+F.outerHeight(),startselected:false,selected:F.hasClass("ui-selected"),selecting:F.hasClass("ui-selecting"),unselecting:F.hasClass("ui-unselecting")})
})
};
this.refresh();
this.selectees=A.addClass("ui-selectee");
this._mouseInit();
this.helper=B(document.createElement("div")).css({border:"1px dotted black"}).addClass("ui-selectable-helper")
},destroy:function(){this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
this._mouseDestroy()
},_mouseStart:function(E){var A=this;
this.opos=[E.pageX,E.pageY];
if(this.options.disabled){return 
}var F=this.options;
this.selectees=B(F.filter,this.element[0]);
this._trigger("start",E);
B(F.appendTo).append(this.helper);
this.helper.css({"z-index":100,position:"absolute",left:E.clientX,top:E.clientY,width:0,height:0});
if(F.autoRefresh){this.refresh()
}this.selectees.filter(".ui-selected").each(function(){var C=B.data(this,"selectable-item");
C.startselected=true;
if(!E.metaKey){C.$element.removeClass("ui-selected");
C.selected=false;
C.$element.addClass("ui-unselecting");
C.unselecting=true;
A._trigger("unselecting",E,{unselecting:C.element})
}});
B(E.target).parents().andSelf().each(function(){var C=B.data(this,"selectable-item");
if(C){C.$element.removeClass("ui-unselecting").addClass("ui-selecting");
C.unselecting=false;
C.selecting=true;
C.selected=true;
A._trigger("selecting",E,{selecting:C.element});
return false
}})
},_mouseDrag:function(K){var N=this;
this.dragged=true;
if(this.options.disabled){return 
}var O=this.options;
var M=this.opos[0],A=this.opos[1],P=K.pageX,J=K.pageY;
if(M>P){var L=P;
P=M;
M=L
}if(A>J){var L=J;
J=A;
A=L
}this.helper.css({left:M,top:A,width:P-M,height:J-A});
this.selectees.each(function(){var D=B.data(this,"selectable-item");
if(!D||D.element==N.element[0]){return 
}var C=false;
if(O.tolerance=="touch"){C=(!(D.left>P||D.right<M||D.top>J||D.bottom<A))
}else{if(O.tolerance=="fit"){C=(D.left>M&&D.right<P&&D.top>A&&D.bottom<J)
}}if(C){if(D.selected){D.$element.removeClass("ui-selected");
D.selected=false
}if(D.unselecting){D.$element.removeClass("ui-unselecting");
D.unselecting=false
}if(!D.selecting){D.$element.addClass("ui-selecting");
D.selecting=true;
N._trigger("selecting",K,{selecting:D.element})
}}else{if(D.selecting){if(K.metaKey&&D.startselected){D.$element.removeClass("ui-selecting");
D.selecting=false;
D.$element.addClass("ui-selected");
D.selected=true
}else{D.$element.removeClass("ui-selecting");
D.selecting=false;
if(D.startselected){D.$element.addClass("ui-unselecting");
D.unselecting=true
}N._trigger("unselecting",K,{unselecting:D.element})
}}if(D.selected){if(!K.metaKey&&!D.startselected){D.$element.removeClass("ui-selected");
D.selected=false;
D.$element.addClass("ui-unselecting");
D.unselecting=true;
N._trigger("unselecting",K,{unselecting:D.element})
}}}});
return false
},_mouseStop:function(E){var A=this;
this.dragged=false;
var F=this.options;
B(".ui-unselecting",this.element[0]).each(function(){var C=B.data(this,"selectable-item");
C.$element.removeClass("ui-unselecting");
C.unselecting=false;
C.startselected=false;
A._trigger("unselected",E,{unselected:C.element})
});
B(".ui-selecting",this.element[0]).each(function(){var C=B.data(this,"selectable-item");
C.$element.removeClass("ui-selecting").addClass("ui-selected");
C.selecting=false;
C.selected=true;
C.startselected=true;
A._trigger("selected",E,{selected:C.element})
});
this._trigger("stop",E);
this.helper.remove();
return false
}}));
B.extend(B.ui.selectable,{version:"1.7.2",defaults:{appendTo:"body",autoRefresh:true,cancel:":input,option",delay:0,distance:0,filter:"*",tolerance:"touch"}})
})(jQuery);
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
(function(B){B.widget("ui.accordion",{_init:function(){var E=this.options,A=this;
this.running=0;
if(E.collapsible==B.ui.accordion.defaults.collapsible&&E.alwaysOpen!=B.ui.accordion.defaults.alwaysOpen){E.collapsible=!E.alwaysOpen
}if(E.navigation){var F=this.element.find("a").filter(E.navigationFilter);
if(F.length){if(F.filter(E.header).length){this.active=F
}else{this.active=F.parent().parent().prev();
F.addClass("ui-accordion-content-active")
}}}this.element.addClass("ui-accordion ui-widget ui-helper-reset");
if(this.element[0].nodeName=="UL"){this.element.children("li").addClass("ui-accordion-li-fix")
}this.headers=this.element.find(E.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){B(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){B(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){B(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){B(this).removeClass("ui-state-focus")
});
this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
this.active=this._findActive(this.active||E.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
this.active.next().addClass("ui-accordion-content-active");
B("<span/>").addClass("ui-icon "+E.icons.header).prependTo(this.headers);
this.active.find(".ui-icon").toggleClass(E.icons.header).toggleClass(E.icons.headerSelected);
if(B.browser.msie){this.element.find("a").css("zoom","1")
}this.resize();
this.element.attr("role","tablist");
this.headers.attr("role","tab").bind("keydown",function(C){return A._keydown(C)
}).next().attr("role","tabpanel");
this.headers.not(this.active||"").attr("aria-expanded","false").attr("tabIndex","-1").next().hide();
if(!this.active.length){this.headers.eq(0).attr("tabIndex","0")
}else{this.active.attr("aria-expanded","true").attr("tabIndex","0")
}if(!B.browser.safari){this.headers.find("a").attr("tabIndex","-1")
}if(E.event){this.headers.bind((E.event)+".accordion",function(C){return A._clickHandler.call(A,C,this)
})
}},destroy:function(){var A=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
this.headers.find("a").removeAttr("tabindex");
this.headers.children(".ui-icon").remove();
var D=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
if(A.autoHeight||A.fillHeight){D.css("height","")
}},_setData:function(D,A){if(D=="alwaysOpen"){D="collapsible";
A=!A
}B.widget.prototype._setData.apply(this,arguments)
},_keydown:function(A){var J=this.options,K=B.ui.keyCode;
if(J.disabled||A.altKey||A.ctrlKey){return 
}var H=this.headers.length;
var L=this.headers.index(A.target);
var I=false;
switch(A.keyCode){case K.RIGHT:case K.DOWN:I=this.headers[(L+1)%H];
break;
case K.LEFT:case K.UP:I=this.headers[(L-1+H)%H];
break;
case K.SPACE:case K.ENTER:return this._clickHandler({target:A.target},A.target)
}if(I){B(A.target).attr("tabIndex","-1");
B(I).attr("tabIndex","0");
I.focus();
return false
}return true
},resize:function(){var G=this.options,H;
if(G.fillSpace){if(B.browser.msie){var F=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}H=this.element.parent().height();
if(B.browser.msie){this.element.parent().css("overflow",F)
}this.headers.each(function(){H-=B(this).outerHeight()
});
var A=0;
this.headers.next().each(function(){A=Math.max(A,B(this).innerHeight()-B(this).height())
}).height(Math.max(0,H-A)).css("overflow","auto")
}else{if(G.autoHeight){H=0;
this.headers.next().each(function(){H=Math.max(H,B(this).outerHeight())
}).height(H)
}}},activate:function(D){var A=this._findActive(D)[0];
this._clickHandler({target:A},A)
},_findActive:function(A){return A?typeof A=="number"?this.headers.filter(":eq("+A+")"):this.headers.not(this.headers.not(A)):A===false?B([]):this.headers.filter(":eq(0)")
},_clickHandler:function(P,L){var N=this.options;
if(N.disabled){return false
}if(!P.target&&N.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(N.icons.headerSelected).addClass(N.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var A=this.active.next(),M={options:N,newHeader:B([]),oldHeader:N.active,newContent:B([]),oldContent:A},O=(this.active=B([]));
this._toggle(O,A,M);
return false
}var K=B(P.currentTarget||L);
var R=K[0]==this.active[0];
if(this.running||(!N.collapsible&&R)){return false
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(N.icons.headerSelected).addClass(N.icons.header);
this.active.next().addClass("ui-accordion-content-active");
if(!R){K.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(N.icons.header).addClass(N.icons.headerSelected);
K.next().addClass("ui-accordion-content-active")
}var O=K.next(),A=this.active.next(),M={options:N,newHeader:R&&N.collapsible?B([]):K,oldHeader:this.active,newContent:R&&N.collapsible?B([]):O.find("> *"),oldContent:A.find("> *")},Q=this.headers.index(this.active[0])>this.headers.index(K[0]);
this.active=R?B([]):K;
this._toggle(O,A,M,R,Q);
return false
},_toggle:function(S,X,N,W,V){var P=this.options,T=this;
this.toShow=S;
this.toHide=X;
this.data=N;
var R=function(){if(!T){return 
}return T._completed.apply(T,arguments)
};
this._trigger("changestart",null,this.data);
this.running=X.size()===0?S.size():X.size();
if(P.animated){var O={};
if(P.collapsible&&W){O={toShow:B([]),toHide:X,complete:R,down:V,autoHeight:P.autoHeight||P.fillSpace}
}else{O={toShow:S,toHide:X,complete:R,down:V,autoHeight:P.autoHeight||P.fillSpace}
}if(!P.proxied){P.proxied=P.animated
}if(!P.proxiedDuration){P.proxiedDuration=P.duration
}P.animated=B.isFunction(P.proxied)?P.proxied(O):P.proxied;
P.duration=B.isFunction(P.proxiedDuration)?P.proxiedDuration(O):P.proxiedDuration;
var U=B.ui.accordion.animations,Q=P.duration,A=P.animated;
if(!U[A]){U[A]=function(C){this.slide(C,{easing:A,duration:Q||700})
}
}U[A](O)
}else{if(P.collapsible&&W){S.toggle()
}else{X.hide();
S.show()
}R(true)
}X.prev().attr("aria-expanded","false").attr("tabIndex","-1").blur();
S.prev().attr("aria-expanded","true").attr("tabIndex","0").focus()
},_completed:function(D){var A=this.options;
this.running=D?0:--this.running;
if(this.running){return 
}if(A.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})
}this._trigger("change",null,this.data)
}});
B.extend(B.ui.accordion,{version:"1.7.2",defaults:{active:null,alwaysOpen:true,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()==location.href.toLowerCase()
}},animations:{slide:function(Q,A){Q=B.extend({easing:"swing",duration:300},Q,A);
if(!Q.toHide.size()){Q.toShow.animate({height:"show"},Q);
return 
}if(!Q.toShow.size()){Q.toHide.animate({height:"hide"},Q);
return 
}var O=Q.toShow.css("overflow"),K,N={},L={},M=["height","paddingTop","paddingBottom"],P;
var R=Q.toShow;
P=R[0].style.width;
R.width(parseInt(R.parent().width(),10)-parseInt(R.css("paddingLeft"),10)-parseInt(R.css("paddingRight"),10)-(parseInt(R.css("borderLeftWidth"),10)||0)-(parseInt(R.css("borderRightWidth"),10)||0));
B.each(M,function(E,C){L[C]="hide";
var D=(""+B.css(Q.toShow[0],C)).match(/^([\d+-.]+)(.*)$/);
N[C]={value:D[1],unit:D[2]||"px"}
});
Q.toShow.css({height:0,overflow:"hidden"}).show();
Q.toHide.filter(":hidden").each(Q.complete).end().filter(":visible").animate(L,{step:function(D,C){if(C.prop=="height"){K=(C.now-C.start)/(C.end-C.start)
}Q.toShow[0].style[C.prop]=(K*N[C.prop].value)+N[C.prop].unit
},duration:Q.duration,easing:Q.easing,complete:function(){if(!Q.autoHeight){Q.toShow.css("height","")
}Q.toShow.css("width",P);
Q.toShow.css({overflow:O});
Q.complete()
}})
},bounceslide:function(A){this.slide(A,{easing:A.down?"easeOutBounce":"swing",duration:A.down?1000:200})
},easeslide:function(A){this.slide(A,{easing:"easeinout",duration:700})
}}})
})(jQuery);
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
(function(B){B.widget("ui.slider",B.extend({},B.ui.mouse,{_init:function(){var D=this,A=this.options;
this._keySliding=false;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");
this.range=B([]);
if(A.range){if(A.range===true){this.range=B("<div></div>");
if(!A.values){A.values=[this._valueMin(),this._valueMin()]
}if(A.values.length&&A.values.length!=2){A.values=[A.values[0],A.values[0]]
}}else{this.range=B("<div></div>")
}this.range.appendTo(this.element).addClass("ui-slider-range");
if(A.range=="min"||A.range=="max"){this.range.addClass("ui-slider-range-"+A.range)
}this.range.addClass("ui-widget-header")
}if(B(".ui-slider-handle",this.element).length==0){B('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
}if(A.values&&A.values.length){while(B(".ui-slider-handle",this.element).length<A.values.length){B('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
}}this.handles=B(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");
this.handle=this.handles.eq(0);
this.handles.add(this.range).filter("a").click(function(C){C.preventDefault()
}).hover(function(){if(!A.disabled){B(this).addClass("ui-state-hover")
}},function(){B(this).removeClass("ui-state-hover")
}).focus(function(){if(!A.disabled){B(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
B(this).addClass("ui-state-focus")
}else{B(this).blur()
}}).blur(function(){B(this).removeClass("ui-state-focus")
});
this.handles.each(function(C){B(this).data("index.ui-slider-handle",C)
});
this.handles.keydown(function(L){var J=true;
var K=B(this).data("index.ui-slider-handle");
if(D.options.disabled){return 
}switch(L.keyCode){case B.ui.keyCode.HOME:case B.ui.keyCode.END:case B.ui.keyCode.UP:case B.ui.keyCode.RIGHT:case B.ui.keyCode.DOWN:case B.ui.keyCode.LEFT:J=false;
if(!D._keySliding){D._keySliding=true;
B(this).addClass("ui-state-active");
D._start(L,K)
}break
}var C,M,N=D._step();
if(D.options.values&&D.options.values.length){C=M=D.values(K)
}else{C=M=D.value()
}switch(L.keyCode){case B.ui.keyCode.HOME:M=D._valueMin();
break;
case B.ui.keyCode.END:M=D._valueMax();
break;
case B.ui.keyCode.UP:case B.ui.keyCode.RIGHT:if(C==D._valueMax()){return 
}M=C+N;
break;
case B.ui.keyCode.DOWN:case B.ui.keyCode.LEFT:if(C==D._valueMin()){return 
}M=C-N;
break
}D._slide(L,K,M);
return J
}).keyup(function(C){var F=B(this).data("index.ui-slider-handle");
if(D._keySliding){D._stop(C,F);
D._change(C,F);
D._keySliding=false;
B(this).removeClass("ui-state-active")
}});
this._refreshValue()
},destroy:function(){this.handles.remove();
this.range.remove();
this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy()
},_mouseCapture:function(O){var N=this.options;
if(N.disabled){return false
}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();
var A={x:O.pageX,y:O.pageY};
var S=this._normValueFromMouse(A);
var P=this._valueMax()-this._valueMin()+1,M;
var R=this,T;
this.handles.each(function(C){var D=Math.abs(S-R.values(C));
if(P>D){P=D;
M=B(this);
T=C
}});
if(N.range==true&&this.values(1)==N.min){M=B(this.handles[++T])
}this._start(O,T);
R._handleIndex=T;
M.addClass("ui-state-active").focus();
var L=M.offset();
var Q=!B(O.target).parents().andSelf().is(".ui-slider-handle");
this._clickOffset=Q?{left:0,top:0}:{left:O.pageX-L.left-(M.width()/2),top:O.pageY-L.top-(M.height()/2)-(parseInt(M.css("borderTopWidth"),10)||0)-(parseInt(M.css("borderBottomWidth"),10)||0)+(parseInt(M.css("marginTop"),10)||0)};
S=this._normValueFromMouse(A);
this._slide(O,T,S);
return true
},_mouseStart:function(A){return true
},_mouseDrag:function(E){var A={x:E.pageX,y:E.pageY};
var F=this._normValueFromMouse(A);
this._slide(E,this._handleIndex,F);
return false
},_mouseStop:function(A){this.handles.removeClass("ui-state-active");
this._stop(A,this._handleIndex);
this._change(A,this._handleIndex);
this._handleIndex=null;
this._clickOffset=null;
return false
},_detectOrientation:function(){this.orientation=this.options.orientation=="vertical"?"vertical":"horizontal"
},_normValueFromMouse:function(M){var N,A;
if("horizontal"==this.orientation){N=this.elementSize.width;
A=M.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)
}else{N=this.elementSize.height;
A=M.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)
}var K=(A/N);
if(K>1){K=1
}if(K<0){K=0
}if("vertical"==this.orientation){K=1-K
}var O=this._valueMax()-this._valueMin(),L=K*O,P=L%this.options.step,J=this._valueMin()+L-P;
if(P>(this.options.step/2)){J+=this.options.step
}return parseFloat(J.toFixed(5))
},_start:function(E,F){var A={handle:this.handles[F],value:this.value()};
if(this.options.values&&this.options.values.length){A.value=this.values(F);
A.values=this.values()
}this._trigger("start",E,A)
},_slide:function(L,M,A){var K=this.handles[M];
if(this.options.values&&this.options.values.length){var J=this.values(M?0:1);
if((this.options.values.length==2&&this.options.range===true)&&((M==0&&A>J)||(M==1&&A<J))){A=J
}if(A!=this.values(M)){var N=this.values();
N[M]=A;
var I=this._trigger("slide",L,{handle:this.handles[M],value:A,values:N});
var J=this.values(M?0:1);
if(I!==false){this.values(M,A,(L.type=="mousedown"&&this.options.animate),true)
}}}else{if(A!=this.value()){var I=this._trigger("slide",L,{handle:this.handles[M],value:A});
if(I!==false){this._setData("value",A,(L.type=="mousedown"&&this.options.animate))
}}}},_stop:function(E,F){var A={handle:this.handles[F],value:this.value()};
if(this.options.values&&this.options.values.length){A.value=this.values(F);
A.values=this.values()
}this._trigger("stop",E,A)
},_change:function(E,F){var A={handle:this.handles[F],value:this.value()};
if(this.options.values&&this.options.values.length){A.value=this.values(F);
A.values=this.values()
}this._trigger("change",E,A)
},value:function(A){if(arguments.length){this._setData("value",A);
this._change(null,0)
}return this._value()
},values:function(F,G,A,H){if(arguments.length>1){this.options.values[F]=G;
this._refreshValue(A);
if(!H){this._change(null,F)
}}if(arguments.length){if(this.options.values&&this.options.values.length){return this._values(F)
}else{return this.value()
}}else{return this._values()
}},_setData:function(A,E,F){B.widget.prototype._setData.apply(this,arguments);
switch(A){case"disabled":if(E){this.handles.filter(".ui-state-focus").blur();
this.handles.removeClass("ui-state-hover");
this.handles.attr("disabled","disabled")
}else{this.handles.removeAttr("disabled")
}case"orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);
this._refreshValue(F);
break;
case"value":this._refreshValue(F);
break
}},_step:function(){var A=this.options.step;
return A
},_value:function(){var A=this.options.value;
if(A<this._valueMin()){A=this._valueMin()
}if(A>this._valueMax()){A=this._valueMax()
}return A
},_values:function(D){if(arguments.length){var A=this.options.values[D];
if(A<this._valueMin()){A=this._valueMin()
}if(A>this._valueMax()){A=this._valueMax()
}return A
}else{return this.options.values
}},_valueMin:function(){var A=this.options.min;
return A
},_valueMax:function(){var A=this.options.max;
return A
},_refreshValue:function(Q){var N=this.options.range,P=this.options,S=this;
if(this.options.values&&this.options.values.length){var V,A;
this.handles.each(function(C,E){var D=(S.values(C)-S._valueMin())/(S._valueMax()-S._valueMin())*100;
var F={};
F[S.orientation=="horizontal"?"left":"bottom"]=D+"%";
B(this).stop(1,1)[Q?"animate":"css"](F,P.animate);
if(S.options.range===true){if(S.orientation=="horizontal"){(C==0)&&S.range.stop(1,1)[Q?"animate":"css"]({left:D+"%"},P.animate);
(C==1)&&S.range[Q?"animate":"css"]({width:(D-lastValPercent)+"%"},{queue:false,duration:P.animate})
}else{(C==0)&&S.range.stop(1,1)[Q?"animate":"css"]({bottom:(D)+"%"},P.animate);
(C==1)&&S.range[Q?"animate":"css"]({height:(D-lastValPercent)+"%"},{queue:false,duration:P.animate})
}}lastValPercent=D
})
}else{var U=this.value(),M=this._valueMin(),T=this._valueMax(),O=T!=M?(U-M)/(T-M)*100:0;
var R={};
R[S.orientation=="horizontal"?"left":"bottom"]=O+"%";
this.handle.stop(1,1)[Q?"animate":"css"](R,P.animate);
(N=="min")&&(this.orientation=="horizontal")&&this.range.stop(1,1)[Q?"animate":"css"]({width:O+"%"},P.animate);
(N=="max")&&(this.orientation=="horizontal")&&this.range[Q?"animate":"css"]({width:(100-O)+"%"},{queue:false,duration:P.animate});
(N=="min")&&(this.orientation=="vertical")&&this.range.stop(1,1)[Q?"animate":"css"]({height:O+"%"},P.animate);
(N=="max")&&(this.orientation=="vertical")&&this.range[Q?"animate":"css"]({height:(100-O)+"%"},{queue:false,duration:P.animate})
}}}));
B.extend(B.ui.slider,{getter:"value values",version:"1.7.2",eventPrefix:"slide",defaults:{animate:false,delay:0,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null}})
})(jQuery);
(function(B){B.widget("ui.tabs",{_init:function(){if(this.options.deselectable!==undefined){this.options.collapsible=this.options.deselectable
}this._tabify(true)
},_setData:function(D,A){if(D=="selected"){if(this.options.collapsible&&A==this.options.selected){return 
}this.select(A)
}else{this.options[D]=A;
if(D=="deselectable"){this.options.collapsible=A
}this._tabify()
}},_tabId:function(A){return A.title&&A.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+B.data(A)
},_sanitizeSelector:function(A){return A.replace(/:/g,"\\:")
},_cookie:function(){var A=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+B.data(this.list[0]));
return B.cookie.apply(null,[A].concat(B.makeArray(arguments)))
},_ui:function(A,D){return{tab:A,panel:D,index:this.anchors.index(A)}
},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var A=B(this);
A.html(A.data("label.tabs")).removeData("label.tabs")
})
},_tabify:function(V){this.list=this.element.children("ul:first");
this.lis=B("li:has(a[href])",this.list);
this.anchors=this.lis.map(function(){return B("a",this)[0]
});
this.panels=B([]);
var U=this,P=this.options;
var S=/^#.+/;
this.anchors.each(function(G,I){var H=B(I).attr("href");
var F=H.split("#")[0],E;
if(F&&(F===location.toString().split("#")[0]||(E=B("base")[0])&&F===E.href)){H=I.hash;
I.href=H
}if(S.test(H)){U.panels=U.panels.add(U._sanitizeSelector(H))
}else{if(H!="#"){B.data(I,"href.tabs",H);
B.data(I,"load.tabs",H.replace(/#.*$/,""));
var C=U._tabId(I);
I.href="#"+C;
var D=B("#"+C);
if(!D.length){D=B(P.panelTemplate).attr("id",C).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(U.panels[G-1]||U.list);
D.data("destroy.tabs",true)
}U.panels=U.panels.add(D)
}else{P.disabled.push(G)
}}});
if(V){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.lis.addClass("ui-state-default ui-corner-top");
this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
if(P.selected===undefined){if(location.hash){this.anchors.each(function(C,D){if(D.hash==location.hash){P.selected=C;
return false
}})
}if(typeof P.selected!="number"&&P.cookie){P.selected=parseInt(U._cookie(),10)
}if(typeof P.selected!="number"&&this.lis.filter(".ui-tabs-selected").length){P.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}P.selected=P.selected||0
}else{if(P.selected===null){P.selected=-1
}}P.selected=((P.selected>=0&&this.anchors[P.selected])||P.selected<0)?P.selected:0;
P.disabled=B.unique(P.disabled.concat(B.map(this.lis.filter(".ui-state-disabled"),function(C,D){return U.lis.index(C)
}))).sort();
if(B.inArray(P.selected,P.disabled)!=-1){P.disabled.splice(B.inArray(P.selected,P.disabled),1)
}this.panels.addClass("ui-tabs-hide");
this.lis.removeClass("ui-tabs-selected ui-state-active");
if(P.selected>=0&&this.anchors.length){this.panels.eq(P.selected).removeClass("ui-tabs-hide");
this.lis.eq(P.selected).addClass("ui-tabs-selected ui-state-active");
U.element.queue("tabs",function(){U._trigger("show",null,U._ui(U.anchors[P.selected],U.panels[P.selected]))
});
this.load(P.selected)
}B(window).bind("unload",function(){U.lis.add(U.anchors).unbind(".tabs");
U.lis=U.anchors=U.panels=null
})
}else{P.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}this.element[P.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");
if(P.cookie){this._cookie(P.selected,P.cookie)
}for(var Z=0,W;
(W=this.lis[Z]);
Z++){B(W)[B.inArray(Z,P.disabled)!=-1&&!B(W).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}if(P.cache===false){this.anchors.removeData("cache.tabs")
}this.lis.add(this.anchors).unbind(".tabs");
if(P.event!="mouseover"){var Q=function(C,D){if(D.is(":not(.ui-state-disabled)")){D.addClass("ui-state-"+C)
}};
var A=function(C,D){D.removeClass("ui-state-"+C)
};
this.lis.bind("mouseover.tabs",function(){Q("hover",B(this))
});
this.lis.bind("mouseout.tabs",function(){A("hover",B(this))
});
this.anchors.bind("focus.tabs",function(){Q("focus",B(this).closest("li"))
});
this.anchors.bind("blur.tabs",function(){A("focus",B(this).closest("li"))
})
}var T,O;
if(P.fx){if(B.isArray(P.fx)){T=P.fx[0];
O=P.fx[1]
}else{T=O=P.fx
}}function R(D,C){D.css({display:""});
if(B.browser.msie&&C.opacity){D[0].style.removeAttribute("filter")
}}var Y=O?function(D,C){B(D).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");
C.hide().removeClass("ui-tabs-hide").animate(O,O.duration||"normal",function(){R(C,O);
U._trigger("show",null,U._ui(D,C[0]))
})
}:function(D,C){B(D).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");
C.removeClass("ui-tabs-hide");
U._trigger("show",null,U._ui(D,C[0]))
};
var X=T?function(C,D){D.animate(T,T.duration||"normal",function(){U.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");
D.addClass("ui-tabs-hide");
R(D,T);
U.element.dequeue("tabs")
})
}:function(D,E,C){U.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");
E.addClass("ui-tabs-hide");
U.element.dequeue("tabs")
};
this.anchors.bind(P.event+".tabs",function(){var E=this,C=B(this).closest("li"),F=U.panels.filter(":not(.ui-tabs-hide)"),D=B(U._sanitizeSelector(this.hash));
if((C.hasClass("ui-tabs-selected")&&!P.collapsible)||C.hasClass("ui-state-disabled")||C.hasClass("ui-state-processing")||U._trigger("select",null,U._ui(this,D[0]))===false){this.blur();
return false
}P.selected=U.anchors.index(this);
U.abort();
if(P.collapsible){if(C.hasClass("ui-tabs-selected")){P.selected=-1;
if(P.cookie){U._cookie(P.selected,P.cookie)
}U.element.queue("tabs",function(){X(E,F)
}).dequeue("tabs");
this.blur();
return false
}else{if(!F.length){if(P.cookie){U._cookie(P.selected,P.cookie)
}U.element.queue("tabs",function(){Y(E,D)
});
U.load(U.anchors.index(this));
this.blur();
return false
}}}if(P.cookie){U._cookie(P.selected,P.cookie)
}if(D.length){if(F.length){U.element.queue("tabs",function(){X(E,F)
})
}U.element.queue("tabs",function(){Y(E,D)
});
U.load(U.anchors.index(this))
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}if(B.browser.msie){this.blur()
}});
this.anchors.bind("click.tabs",function(){return false
})
},destroy:function(){var A=this.options;
this.abort();
this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.anchors.each(function(){var F=B.data(this,"href.tabs");
if(F){this.href=F
}var E=B(this).unbind(".tabs");
B.each(["href","load","cache"],function(D,C){E.removeData(C+".tabs")
})
});
this.lis.unbind(".tabs").add(this.panels).each(function(){if(B.data(this,"destroy.tabs")){B(this).remove()
}else{B(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))
}});
if(A.cookie){this._cookie(null,A.cookie)
}},add:function(O,M,N){if(N===undefined){N=this.anchors.length
}var P=this,J=this.options,K=B(J.tabTemplate.replace(/#\{href\}/g,O).replace(/#\{label\}/g,M)),A=!O.indexOf("#")?O.replace("#",""):this._tabId(B("a",K)[0]);
K.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);
var L=B("#"+A);
if(!L.length){L=B(J.panelTemplate).attr("id",A).data("destroy.tabs",true)
}L.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
if(N>=this.lis.length){K.appendTo(this.list);
L.appendTo(this.list[0].parentNode)
}else{K.insertBefore(this.lis[N]);
L.insertBefore(this.panels[N])
}J.disabled=B.map(J.disabled,function(C,D){return C>=N?++C:C
});
this._tabify();
if(this.anchors.length==1){K.addClass("ui-tabs-selected ui-state-active");
L.removeClass("ui-tabs-hide");
this.element.queue("tabs",function(){P._trigger("show",null,P._ui(P.anchors[0],P.panels[0]))
});
this.load(0)
}this._trigger("add",null,this._ui(this.anchors[N],this.panels[N]))
},remove:function(F){var H=this.options,G=this.lis.eq(F).remove(),A=this.panels.eq(F).remove();
if(G.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(F+(F+1<this.anchors.length?1:-1))
}H.disabled=B.map(B.grep(H.disabled,function(C,D){return C!=F
}),function(C,D){return C>=F?--C:C
});
this._tabify();
this._trigger("remove",null,this._ui(G.find("a")[0],A[0]))
},enable:function(D){var A=this.options;
if(B.inArray(D,A.disabled)==-1){return 
}this.lis.eq(D).removeClass("ui-state-disabled");
A.disabled=B.grep(A.disabled,function(C,F){return C!=D
});
this._trigger("enable",null,this._ui(this.anchors[D],this.panels[D]))
},disable:function(F){var A=this,E=this.options;
if(F!=E.selected){this.lis.eq(F).addClass("ui-state-disabled");
E.disabled.push(F);
E.disabled.sort();
this._trigger("disable",null,this._ui(this.anchors[F],this.panels[F]))
}},select:function(A){if(typeof A=="string"){A=this.anchors.index(this.anchors.filter("[href$="+A+"]"))
}else{if(A===null){A=-1
}}if(A==-1&&this.options.collapsible){A=this.options.selected
}this.anchors.eq(A).trigger(this.options.event+".tabs")
},load:function(A){var I=this,J=this.options,K=this.anchors.eq(A)[0],H=B.data(K,"load.tabs");
this.abort();
if(!H||this.element.queue("tabs").length!==0&&B.data(K,"cache.tabs")){this.element.dequeue("tabs");
return 
}this.lis.eq(A).addClass("ui-state-processing");
if(J.spinner){var L=B("span",K);
L.data("label.tabs",L.html()).html(J.spinner)
}this.xhr=B.ajax(B.extend({},J.ajaxOptions,{url:H,success:function(D,E){B(I._sanitizeSelector(K.hash)).html(D);
I._cleanup();
if(J.cache){B.data(K,"cache.tabs",true)
}I._trigger("load",null,I._ui(I.anchors[A],I.panels[A]));
try{J.ajaxOptions.success(D,E)
}catch(C){}I.element.dequeue("tabs")
}}))
},abort:function(){this.element.queue([]);
this.panels.stop(false,true);
if(this.xhr){this.xhr.abort();
delete this.xhr
}this._cleanup()
},url:function(A,D){this.anchors.eq(A).removeData("cache.tabs").data("load.tabs",D)
},length:function(){return this.anchors.length
}});
B.extend(B.ui.tabs,{version:"1.7.2",getter:"length",defaults:{ajaxOptions:null,cache:false,cookie:null,collapsible:false,disabled:[],event:"click",fx:null,idPrefix:"ui-tabs-",panelTemplate:"<div></div>",spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'}});
B.extend(B.ui.tabs.prototype,{rotation:null,rotate:function(H,K){var J=this,L=this.options;
var I=J._rotate||(J._rotate=function(C){clearTimeout(J.rotation);
J.rotation=setTimeout(function(){var D=L.selected;
J.select(++D<J.anchors.length?D:0)
},H);
if(C){C.stopPropagation()
}});
var A=J._unrotate||(J._unrotate=!K?function(C){if(C.clientX){J.rotate(null)
}}:function(C){t=L.selected;
I()
});
if(H){this.element.bind("tabsshow",I);
this.anchors.bind(L.event+".tabs",A);
I()
}else{clearTimeout(J.rotation);
this.element.unbind("tabsshow",I);
this.anchors.unbind(L.event+".tabs",A);
delete this._rotate;
delete this._unrotate
}}})
})(jQuery);
(function($){$.extend($.ui,{datepicker:{version:"1.7.2"}});
var PROP_NAME="datepicker";
function Datepicker(){this.debug=false;
this._curInst=null;
this._keyEvent=false;
this._disabledInputs=[];
this._datepickerShowing=false;
this._inDialog=false;
this._mainDivId="ui-datepicker-div";
this._inlineClass="ui-datepicker-inline";
this._appendClass="ui-datepicker-append";
this._triggerClass="ui-datepicker-trigger";
this._dialogClass="ui-datepicker-dialog";
this._disableClass="ui-datepicker-disabled";
this._unselectableClass="ui-datepicker-unselectable";
this._currentClass="ui-datepicker-current-day";
this._dayOverClass="ui-datepicker-days-cell-over";
this.regional=[];
this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],dateFormat:"mm/dd/yy",firstDay:0,isRTL:false};
this._defaults={showOn:"focus",showAnim:"show",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,showMonthAfterYear:false,yearRange:"-10:+10",showOtherMonths:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"normal",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false};
$.extend(this._defaults,this.regional[""]);
this.dpDiv=$('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",log:function(){if(this.debug){console.log.apply("",arguments)
}},setDefaults:function(settings){extendRemove(this._defaults,settings||{});
return this
},_attachDatepicker:function(target,settings){var inlineSettings=null;
for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);
if(attrValue){inlineSettings=inlineSettings||{};
try{inlineSettings[attrName]=eval(attrValue)
}catch(err){inlineSettings[attrName]=attrValue
}}}var nodeName=target.nodeName.toLowerCase();
var inline=(nodeName=="div"||nodeName=="span");
if(!target.id){target.id="dp"+(++this.uuid)
}var inst=this._newInst($(target),inline);
inst.settings=$.extend({},settings||{},inlineSettings||{});
if(nodeName=="input"){this._connectDatepicker(target,inst)
}else{if(inline){this._inlineDatepicker(target,inst)
}}},_newInst:function(target,inline){var id=target[0].id.replace(/([:\[\]\.])/g,"\\\\$1");
return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline?this.dpDiv:$('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}
},_connectDatepicker:function(target,inst){var input=$(target);
inst.append=$([]);
inst.trigger=$([]);
if(input.hasClass(this.markerClassName)){return 
}var appendText=this._get(inst,"appendText");
var isRTL=this._get(inst,"isRTL");
if(appendText){inst.append=$('<span class="'+this._appendClass+'">'+appendText+"</span>");
input[isRTL?"before":"after"](inst.append)
}var showOn=this._get(inst,"showOn");
if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker)
}if(showOn=="button"||showOn=="both"){var buttonText=this._get(inst,"buttonText");
var buttonImage=this._get(inst,"buttonImage");
inst.trigger=$(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage==""?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));
input[isRTL?"before":"after"](inst.trigger);
inst.trigger.click(function(){if($.datepicker._datepickerShowing&&$.datepicker._lastInput==target){$.datepicker._hideDatepicker()
}else{$.datepicker._showDatepicker(target)
}return false
})
}input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value
}).bind("getData.datepicker",function(event,key){return this._get(inst,key)
});
$.data(target,PROP_NAME,inst)
},_inlineDatepicker:function(target,inst){var divSpan=$(target);
if(divSpan.hasClass(this.markerClassName)){return 
}divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value
}).bind("getData.datepicker",function(event,key){return this._get(inst,key)
});
$.data(target,PROP_NAME,inst);
this._setDate(inst,this._getDefaultDate(inst));
this._updateDatepicker(inst);
this._updateAlternate(inst)
},_dialogDatepicker:function(input,dateText,onSelect,settings,pos){var inst=this._dialogInst;
if(!inst){var id="dp"+(++this.uuid);
this._dialogInput=$('<input type="text" id="'+id+'" size="1" style="position: absolute; top: -100px;"/>');
this._dialogInput.keydown(this._doKeyDown);
$("body").append(this._dialogInput);
inst=this._dialogInst=this._newInst(this._dialogInput,false);
inst.settings={};
$.data(this._dialogInput[0],PROP_NAME,inst)
}extendRemove(inst.settings,settings||{});
this._dialogInput.val(dateText);
this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);
if(!this._pos){var browserWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
var browserHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;
var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY]
}this._dialogInput.css("left",this._pos[0]+"px").css("top",this._pos[1]+"px");
inst.settings.onSelect=onSelect;
this._inDialog=true;
this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);
if($.blockUI){$.blockUI(this.dpDiv)
}$.data(this._dialogInput[0],PROP_NAME,inst);
return this
},_destroyDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
$.removeData(target,PROP_NAME);
if(nodeName=="input"){inst.append.remove();
inst.trigger.remove();
$target.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress)
}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty()
}}},_enableDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
if(nodeName=="input"){target.disabled=false;
inst.trigger.filter("button").each(function(){this.disabled=false
}).end().filter("img").css({opacity:"1.0",cursor:""})
}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);
inline.children().removeClass("ui-state-disabled")
}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)
})
},_disableDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
if(nodeName=="input"){target.disabled=true;
inst.trigger.filter("button").each(function(){this.disabled=true
}).end().filter("img").css({opacity:"0.5",cursor:"default"})
}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);
inline.children().addClass("ui-state-disabled")
}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)
});
this._disabledInputs[this._disabledInputs.length]=target
},_isDisabledDatepicker:function(target){if(!target){return false
}for(var i=0;
i<this._disabledInputs.length;
i++){if(this._disabledInputs[i]==target){return true
}}return false
},_getInst:function(target){try{return $.data(target,PROP_NAME)
}catch(err){throw"Missing instance data for this datepicker"
}},_optionDatepicker:function(target,name,value){var inst=this._getInst(target);
if(arguments.length==2&&typeof name=="string"){return(name=="defaults"?$.extend({},$.datepicker._defaults):(inst?(name=="all"?$.extend({},inst.settings):this._get(inst,name)):null))
}var settings=name||{};
if(typeof name=="string"){settings={};
settings[name]=value
}if(inst){if(this._curInst==inst){this._hideDatepicker(null)
}var date=this._getDateDatepicker(target);
extendRemove(inst.settings,settings);
this._setDateDatepicker(target,date);
this._updateDatepicker(inst)
}},_changeDatepicker:function(target,name,value){this._optionDatepicker(target,name,value)
},_refreshDatepicker:function(target){var inst=this._getInst(target);
if(inst){this._updateDatepicker(inst)
}},_setDateDatepicker:function(target,date,endDate){var inst=this._getInst(target);
if(inst){this._setDate(inst,date,endDate);
this._updateDatepicker(inst);
this._updateAlternate(inst)
}},_getDateDatepicker:function(target){var inst=this._getInst(target);
if(inst&&!inst.inline){this._setDateFromField(inst)
}return(inst?this._getDate(inst):null)
},_doKeyDown:function(event){var inst=$.datepicker._getInst(event.target);
var handled=true;
var isRTL=inst.dpDiv.is(".ui-datepicker-rtl");
inst._keyEvent=true;
if($.datepicker._datepickerShowing){switch(event.keyCode){case 9:$.datepicker._hideDatepicker(null,"");
break;
case 13:var sel=$("td."+$.datepicker._dayOverClass+", td."+$.datepicker._currentClass,inst.dpDiv);
if(sel[0]){$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0])
}else{$.datepicker._hideDatepicker(null,$.datepicker._get(inst,"duration"))
}return false;
break;
case 27:$.datepicker._hideDatepicker(null,$.datepicker._get(inst,"duration"));
break;
case 33:$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M");
break;
case 34:$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M");
break;
case 35:if(event.ctrlKey||event.metaKey){$.datepicker._clearDate(event.target)
}handled=event.ctrlKey||event.metaKey;
break;
case 36:if(event.ctrlKey||event.metaKey){$.datepicker._gotoToday(event.target)
}handled=event.ctrlKey||event.metaKey;
break;
case 37:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?+1:-1),"D")
}handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M")
}break;
case 38:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,-7,"D")
}handled=event.ctrlKey||event.metaKey;
break;
case 39:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?-1:+1),"D")
}handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M")
}break;
case 40:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,+7,"D")
}handled=event.ctrlKey||event.metaKey;
break;
default:handled=false
}}else{if(event.keyCode==36&&event.ctrlKey){$.datepicker._showDatepicker(this)
}else{handled=false
}}if(handled){event.preventDefault();
event.stopPropagation()
}},_doKeyPress:function(event){var inst=$.datepicker._getInst(event.target);
if($.datepicker._get(inst,"constrainInput")){var chars=$.datepicker._possibleChars($.datepicker._get(inst,"dateFormat"));
var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);
return event.ctrlKey||(chr<" "||!chars||chars.indexOf(chr)>-1)
}},_showDatepicker:function(input){input=input.target||input;
if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0]
}if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput==input){return 
}var inst=$.datepicker._getInst(input);
var beforeShow=$.datepicker._get(inst,"beforeShow");
extendRemove(inst.settings,(beforeShow?beforeShow.apply(input,[input,inst]):{}));
$.datepicker._hideDatepicker(null,"");
$.datepicker._lastInput=input;
$.datepicker._setDateFromField(inst);
if($.datepicker._inDialog){input.value=""
}if(!$.datepicker._pos){$.datepicker._pos=$.datepicker._findPos(input);
$.datepicker._pos[1]+=input.offsetHeight
}var isFixed=false;
$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";
return !isFixed
});
if(isFixed&&$.browser.opera){$.datepicker._pos[0]-=document.documentElement.scrollLeft;
$.datepicker._pos[1]-=document.documentElement.scrollTop
}var offset={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};
$.datepicker._pos=null;
inst.rangeStart=null;
inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});
$.datepicker._updateDatepicker(inst);
offset=$.datepicker._checkOffset(inst,offset,isFixed);
inst.dpDiv.css({position:($.datepicker._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});
if(!inst.inline){var showAnim=$.datepicker._get(inst,"showAnim")||"show";
var duration=$.datepicker._get(inst,"duration");
var postProcess=function(){$.datepicker._datepickerShowing=true;
if($.browser.msie&&parseInt($.browser.version,10)<7){$("iframe.ui-datepicker-cover").css({width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4})
}};
if($.effects&&$.effects[showAnim]){inst.dpDiv.show(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)
}else{inst.dpDiv[showAnim](duration,postProcess)
}if(duration==""){postProcess()
}if(inst.input[0].type!="hidden"){inst.input[0].focus()
}$.datepicker._curInst=inst
}},_updateDatepicker:function(inst){var dims={width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4};
var self=this;
inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({width:dims.width,height:dims.height}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",function(){$(this).removeClass("ui-state-hover");
if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).removeClass("ui-datepicker-prev-hover")
}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).removeClass("ui-datepicker-next-hover")
}}).bind("mouseover",function(){if(!self._isDisabledDatepicker(inst.inline?inst.dpDiv.parent()[0]:inst.input[0])){$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
$(this).addClass("ui-state-hover");
if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).addClass("ui-datepicker-prev-hover")
}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).addClass("ui-datepicker-next-hover")
}}}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end();
var numMonths=this._getNumberOfMonths(inst);
var cols=numMonths[1];
var width=17;
if(cols>1){inst.dpDiv.addClass("ui-datepicker-multi-"+cols).css("width",(width*cols)+"em")
}else{inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")
}inst.dpDiv[(numMonths[0]!=1||numMonths[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");
inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");
if(inst.input&&inst.input[0].type!="hidden"&&inst==$.datepicker._curInst){$(inst.input[0]).focus()
}},_checkOffset:function(inst,offset,isFixed){var dpWidth=inst.dpDiv.outerWidth();
var dpHeight=inst.dpDiv.outerHeight();
var inputWidth=inst.input?inst.input.outerWidth():0;
var inputHeight=inst.input?inst.input.outerHeight():0;
var viewWidth=(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)+$(document).scrollLeft();
var viewHeight=(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight)+$(document).scrollTop();
offset.left-=(this._get(inst,"isRTL")?(dpWidth-inputWidth):0);
offset.left-=(isFixed&&offset.left==inst.input.offset().left)?$(document).scrollLeft():0;
offset.top-=(isFixed&&offset.top==(inst.input.offset().top+inputHeight))?$(document).scrollTop():0;
offset.left-=(offset.left+dpWidth>viewWidth&&viewWidth>dpWidth)?Math.abs(offset.left+dpWidth-viewWidth):0;
offset.top-=(offset.top+dpHeight>viewHeight&&viewHeight>dpHeight)?Math.abs(offset.top+dpHeight+inputHeight*2-viewHeight):0;
return offset
},_findPos:function(obj){while(obj&&(obj.type=="hidden"||obj.nodeType!=1)){obj=obj.nextSibling
}var position=$(obj).offset();
return[position.left,position.top]
},_hideDatepicker:function(input,duration){var inst=this._curInst;
if(!inst||(input&&inst!=$.data(input,PROP_NAME))){return 
}if(inst.stayOpen){this._selectDate("#"+inst.id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear))
}inst.stayOpen=false;
if(this._datepickerShowing){duration=(duration!=null?duration:this._get(inst,"duration"));
var showAnim=this._get(inst,"showAnim");
var postProcess=function(){$.datepicker._tidyDialog(inst)
};
if(duration!=""&&$.effects&&$.effects[showAnim]){inst.dpDiv.hide(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)
}else{inst.dpDiv[(duration==""?"hide":(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide")))](duration,postProcess)
}if(duration==""){this._tidyDialog(inst)
}var onClose=this._get(inst,"onClose");
if(onClose){onClose.apply((inst.input?inst.input[0]:null),[(inst.input?inst.input.val():""),inst])
}this._datepickerShowing=false;
this._lastInput=null;
if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});
if($.blockUI){$.unblockUI();
$("body").append(this.dpDiv)
}}this._inDialog=false
}this._curInst=null
},_tidyDialog:function(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
},_checkExternalClick:function(event){if(!$.datepicker._curInst){return 
}var $target=$(event.target);
if(($target.parents("#"+$.datepicker._mainDivId).length==0)&&!$target.hasClass($.datepicker.markerClassName)&&!$target.hasClass($.datepicker._triggerClass)&&$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI)){$.datepicker._hideDatepicker(null,"")
}},_adjustDate:function(id,offset,period){var target=$(id);
var inst=this._getInst(target[0]);
if(this._isDisabledDatepicker(target[0])){return 
}this._adjustInstDate(inst,offset+(period=="M"?this._get(inst,"showCurrentAtPos"):0),period);
this._updateDatepicker(inst)
},_gotoToday:function(id){var target=$(id);
var inst=this._getInst(target[0]);
if(this._get(inst,"gotoCurrent")&&inst.currentDay){inst.selectedDay=inst.currentDay;
inst.drawMonth=inst.selectedMonth=inst.currentMonth;
inst.drawYear=inst.selectedYear=inst.currentYear
}else{var date=new Date();
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear()
}this._notifyChange(inst);
this._adjustDate(target)
},_selectMonthYear:function(id,select,period){var target=$(id);
var inst=this._getInst(target[0]);
inst._selectingMonthYear=false;
inst["selected"+(period=="M"?"Month":"Year")]=inst["draw"+(period=="M"?"Month":"Year")]=parseInt(select.options[select.selectedIndex].value,10);
this._notifyChange(inst);
this._adjustDate(target)
},_clickMonthYear:function(id){var target=$(id);
var inst=this._getInst(target[0]);
if(inst.input&&inst._selectingMonthYear&&!$.browser.msie){inst.input[0].focus()
}inst._selectingMonthYear=!inst._selectingMonthYear
},_selectDay:function(id,month,year,td){var target=$(id);
if($(td).hasClass(this._unselectableClass)||this._isDisabledDatepicker(target[0])){return 
}var inst=this._getInst(target[0]);
inst.selectedDay=inst.currentDay=$("a",td).html();
inst.selectedMonth=inst.currentMonth=month;
inst.selectedYear=inst.currentYear=year;
if(inst.stayOpen){inst.endDay=inst.endMonth=inst.endYear=null
}this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear));
if(inst.stayOpen){inst.rangeStart=this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay));
this._updateDatepicker(inst)
}},_clearDate:function(id){var target=$(id);
var inst=this._getInst(target[0]);
inst.stayOpen=false;
inst.endDay=inst.endMonth=inst.endYear=inst.rangeStart=null;
this._selectDate(target,"")
},_selectDate:function(id,dateStr){var target=$(id);
var inst=this._getInst(target[0]);
dateStr=(dateStr!=null?dateStr:this._formatDate(inst));
if(inst.input){inst.input.val(dateStr)
}this._updateAlternate(inst);
var onSelect=this._get(inst,"onSelect");
if(onSelect){onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])
}else{if(inst.input){inst.input.trigger("change")
}}if(inst.inline){this._updateDatepicker(inst)
}else{if(!inst.stayOpen){this._hideDatepicker(null,this._get(inst,"duration"));
this._lastInput=inst.input[0];
if(typeof (inst.input[0])!="object"){inst.input[0].focus()
}this._lastInput=null
}}},_updateAlternate:function(inst){var altField=this._get(inst,"altField");
if(altField){var altFormat=this._get(inst,"altFormat")||this._get(inst,"dateFormat");
var date=this._getDate(inst);
dateStr=this.formatDate(altFormat,date,this._getFormatConfig(inst));
$(altField).each(function(){$(this).val(dateStr)
})
}},noWeekends:function(date){var day=date.getDay();
return[(day>0&&day<6),""]
},iso8601Week:function(date){var checkDate=new Date(date.getFullYear(),date.getMonth(),date.getDate());
var firstMon=new Date(checkDate.getFullYear(),1-1,4);
var firstDay=firstMon.getDay()||7;
firstMon.setDate(firstMon.getDate()+1-firstDay);
if(firstDay<4&&checkDate<firstMon){checkDate.setDate(checkDate.getDate()-3);
return $.datepicker.iso8601Week(checkDate)
}else{if(checkDate>new Date(checkDate.getFullYear(),12-1,28)){firstDay=new Date(checkDate.getFullYear()+1,1-1,4).getDay()||7;
if(firstDay>4&&(checkDate.getDay()||7)<firstDay-3){return 1
}}}return Math.floor(((checkDate-firstMon)/86400000)/7)+1
},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments"
}value=(typeof value=="object"?value.toString():value+"");
if(value==""){return null
}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;
var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;
var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;
var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;
var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;
var year=-1;
var month=-1;
var day=-1;
var doy=-1;
var literal=false;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
var getNumber=function(match){lookAhead(match);
var origSize=(match=="@"?14:(match=="y"?4:(match=="o"?3:2)));
var size=origSize;
var num=0;
while(size>0&&iValue<value.length&&value.charAt(iValue)>="0"&&value.charAt(iValue)<="9"){num=num*10+parseInt(value.charAt(iValue++),10);
size--
}if(size==origSize){throw"Missing number at position "+iValue
}return num
};
var getName=function(match,shortNames,longNames){var names=(lookAhead(match)?longNames:shortNames);
var size=0;
for(var j=0;
j<names.length;
j++){size=Math.max(size,names[j].length)
}var name="";
var iInit=iValue;
while(size>0&&iValue<value.length){name+=value.charAt(iValue++);
for(var i=0;
i<names.length;
i++){if(name==names[i]){return i+1
}}size--
}throw"Unknown name at position "+iInit
};
var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue
}iValue++
};
var iValue=0;
for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{checkLiteral()
}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");
break;
case"D":getName("D",dayNamesShort,dayNames);
break;
case"o":doy=getNumber("o");
break;
case"m":month=getNumber("m");
break;
case"M":month=getName("M",monthNamesShort,monthNames);
break;
case"y":year=getNumber("y");
break;
case"@":var date=new Date(getNumber("@"));
year=date.getFullYear();
month=date.getMonth()+1;
day=date.getDate();
break;
case"'":if(lookAhead("'")){checkLiteral()
}else{literal=true
}break;
default:checkLiteral()
}}}if(year==-1){year=new Date().getFullYear()
}else{if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100)
}}if(doy>-1){month=1;
day=doy;
do{var dim=this._getDaysInMonth(year,month-1);
if(day<=dim){break
}month++;
day-=dim
}while(true)
}var date=this._daylightSavingAdjust(new Date(year,month-1,day));
if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date"
}return date
},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TIMESTAMP:"@",W3C:"yy-mm-dd",formatDate:function(format,date,settings){if(!date){return""
}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;
var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;
var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;
var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
var formatNumber=function(match,value,len){var num=""+value;
if(lookAhead(match)){while(num.length<len){num="0"+num
}}return num
};
var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])
};
var output="";
var literal=false;
if(date){for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{output+=format.charAt(iFormat)
}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate(),2);
break;
case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);
break;
case"o":var doy=date.getDate();
for(var m=date.getMonth()-1;
m>=0;
m--){doy+=this._getDaysInMonth(date.getFullYear(),m)
}output+=formatNumber("o",doy,3);
break;
case"m":output+=formatNumber("m",date.getMonth()+1,2);
break;
case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);
break;
case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);
break;
case"@":output+=date.getTime();
break;
case"'":if(lookAhead("'")){output+="'"
}else{literal=true
}break;
default:output+=format.charAt(iFormat)
}}}}return output
},_possibleChars:function(format){var chars="";
var literal=false;
for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{chars+=format.charAt(iFormat)
}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":case"@":chars+="0123456789";
break;
case"D":case"M":return null;
case"'":if(lookAhead("'")){chars+="'"
}else{literal=true
}break;
default:chars+=format.charAt(iFormat)
}}}return chars
},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]
},_setDateFromField:function(inst){var dateFormat=this._get(inst,"dateFormat");
var dates=inst.input?inst.input.val():null;
inst.endDay=inst.endMonth=inst.endYear=null;
var date=defaultDate=this._getDefaultDate(inst);
var settings=this._getFormatConfig(inst);
try{date=this.parseDate(dateFormat,dates,settings)||defaultDate
}catch(event){this.log(event);
date=defaultDate
}inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
inst.currentDay=(dates?date.getDate():0);
inst.currentMonth=(dates?date.getMonth():0);
inst.currentYear=(dates?date.getFullYear():0);
this._adjustInstDate(inst)
},_getDefaultDate:function(inst){var date=this._determineDate(this._get(inst,"defaultDate"),new Date());
var minDate=this._getMinMaxDate(inst,"min",true);
var maxDate=this._getMinMaxDate(inst,"max");
date=(minDate&&date<minDate?minDate:date);
date=(maxDate&&date>maxDate?maxDate:date);
return date
},_determineDate:function(date,defaultDate){var offsetNumeric=function(offset){var date=new Date();
date.setDate(date.getDate()+offset);
return date
};
var offsetString=function(offset,getDaysInMonth){var date=new Date();
var year=date.getFullYear();
var month=date.getMonth();
var day=date.getDate();
var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
var matches=pattern.exec(offset);
while(matches){switch(matches[2]||"d"){case"d":case"D":day+=parseInt(matches[1],10);
break;
case"w":case"W":day+=parseInt(matches[1],10)*7;
break;
case"m":case"M":month+=parseInt(matches[1],10);
day=Math.min(day,getDaysInMonth(year,month));
break;
case"y":case"Y":year+=parseInt(matches[1],10);
day=Math.min(day,getDaysInMonth(year,month));
break
}matches=pattern.exec(offset)
}return new Date(year,month,day)
};
date=(date==null?defaultDate:(typeof date=="string"?offsetString(date,this._getDaysInMonth):(typeof date=="number"?(isNaN(date)?defaultDate:offsetNumeric(date)):date)));
date=(date&&date.toString()=="Invalid Date"?defaultDate:date);
if(date){date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0)
}return this._daylightSavingAdjust(date)
},_daylightSavingAdjust:function(date){if(!date){return null
}date.setHours(date.getHours()>12?date.getHours()+2:0);
return date
},_setDate:function(inst,date,endDate){var clear=!(date);
var origMonth=inst.selectedMonth;
var origYear=inst.selectedYear;
date=this._determineDate(date,new Date());
inst.selectedDay=inst.currentDay=date.getDate();
inst.drawMonth=inst.selectedMonth=inst.currentMonth=date.getMonth();
inst.drawYear=inst.selectedYear=inst.currentYear=date.getFullYear();
if(origMonth!=inst.selectedMonth||origYear!=inst.selectedYear){this._notifyChange(inst)
}this._adjustInstDate(inst);
if(inst.input){inst.input.val(clear?"":this._formatDate(inst))
}},_getDate:function(inst){var startDate=(!inst.currentYear||(inst.input&&inst.input.val()=="")?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
return startDate
},_generateHTML:function(inst){var today=new Date();
today=this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));
var isRTL=this._get(inst,"isRTL");
var showButtonPanel=this._get(inst,"showButtonPanel");
var hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext");
var navigationAsDateFormat=this._get(inst,"navigationAsDateFormat");
var numMonths=this._getNumberOfMonths(inst);
var showCurrentAtPos=this._get(inst,"showCurrentAtPos");
var stepMonths=this._get(inst,"stepMonths");
var stepBigMonths=this._get(inst,"stepBigMonths");
var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);
var currentDate=this._daylightSavingAdjust((!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
var minDate=this._getMinMaxDate(inst,"min",true);
var maxDate=this._getMinMaxDate(inst,"max");
var drawMonth=inst.drawMonth-showCurrentAtPos;
var drawYear=inst.drawYear;
if(drawMonth<0){drawMonth+=12;
drawYear--
}if(maxDate){var maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth()-numMonths[1]+1,maxDate.getDate()));
maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);
while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1))>maxDraw){drawMonth--;
if(drawMonth<0){drawMonth=11;
drawYear--
}}}inst.drawMonth=drawMonth;
inst.drawYear=drawYear;
var prevText=this._get(inst,"prevText");
prevText=(!navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepMonths,1)),this._getFormatConfig(inst)));
var prev=(this._canAdjustMonth(inst,-1,drawYear,drawMonth)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#'+inst.id+"', -"+stepMonths+", 'M');\" title=\""+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>"));
var nextText=this._get(inst,"nextText");
nextText=(!navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepMonths,1)),this._getFormatConfig(inst)));
var next=(this._canAdjustMonth(inst,+1,drawYear,drawMonth)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#'+inst.id+"', +"+stepMonths+", 'M');\" title=\""+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>"));
var currentText=this._get(inst,"currentText");
var gotoDate=(this._get(inst,"gotoCurrent")&&inst.currentDay?currentDate:today);
currentText=(!navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));
var controls=(!inst.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">'+this._get(inst,"closeText")+"</button>":"");
var buttonPanel=(showButtonPanel)?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(isRTL?controls:"")+(this._isInRange(inst,gotoDate)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#'+inst.id+"');\">"+currentText+"</button>":"")+(isRTL?"":controls)+"</div>":"";
var firstDay=parseInt(this._get(inst,"firstDay"),10);
firstDay=(isNaN(firstDay)?0:firstDay);
var dayNames=this._get(inst,"dayNames");
var dayNamesShort=this._get(inst,"dayNamesShort");
var dayNamesMin=this._get(inst,"dayNamesMin");
var monthNames=this._get(inst,"monthNames");
var monthNamesShort=this._get(inst,"monthNamesShort");
var beforeShowDay=this._get(inst,"beforeShowDay");
var showOtherMonths=this._get(inst,"showOtherMonths");
var calculateWeek=this._get(inst,"calculateWeek")||this.iso8601Week;
var endDate=inst.endDay?this._daylightSavingAdjust(new Date(inst.endYear,inst.endMonth,inst.endDay)):currentDate;
var defaultDate=this._getDefaultDate(inst);
var html="";
for(var row=0;
row<numMonths[0];
row++){var group="";
for(var col=0;
col<numMonths[1];
col++){var selectedDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));
var cornerClass=" ui-corner-all";
var calender="";
if(isMultiMonth){calender+='<div class="ui-datepicker-group ui-datepicker-group-';
switch(col){case 0:calender+="first";
cornerClass=" ui-corner-"+(isRTL?"right":"left");
break;
case numMonths[1]-1:calender+="last";
cornerClass=" ui-corner-"+(isRTL?"left":"right");
break;
default:calender+="middle";
cornerClass="";
break
}calender+='">'
}calender+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+cornerClass+'">'+(/all|left/.test(cornerClass)&&row==0?(isRTL?next:prev):"")+(/all|right/.test(cornerClass)&&row==0?(isRTL?prev:next):"")+this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,row>0||col>0,monthNames,monthNamesShort)+'</div><table class="ui-datepicker-calendar"><thead><tr>';
var thead="";
for(var dow=0;
dow<7;
dow++){var day=(dow+firstDay)%7;
thead+="<th"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+dayNames[day]+'">'+dayNamesMin[day]+"</span></th>"
}calender+=thead+"</tr></thead><tbody>";
var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);
if(drawYear==inst.selectedYear&&drawMonth==inst.selectedMonth){inst.selectedDay=Math.min(inst.selectedDay,daysInMonth)
}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;
var numRows=(isMultiMonth?6:Math.ceil((leadDays+daysInMonth)/7));
var printDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,1-leadDays));
for(var dRow=0;
dRow<numRows;
dRow++){calender+="<tr>";
var tbody="";
for(var dow=0;
dow<7;
dow++){var daySettings=(beforeShowDay?beforeShowDay.apply((inst.input?inst.input[0]:null),[printDate]):[true,""]);
var otherMonth=(printDate.getMonth()!=drawMonth);
var unselectable=otherMonth||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);
tbody+='<td class="'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end":"")+(otherMonth?" ui-datepicker-other-month":"")+((printDate.getTime()==selectedDate.getTime()&&drawMonth==inst.selectedMonth&&inst._keyEvent)||(defaultDate.getTime()==printDate.getTime()&&defaultDate.getTime()==selectedDate.getTime())?" "+this._dayOverClass:"")+(unselectable?" "+this._unselectableClass+" ui-state-disabled":"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" "+this._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?"":" onclick=\"DP_jQuery.datepicker._selectDay('#"+inst.id+"',"+drawMonth+","+drawYear+', this);return false;"')+">"+(otherMonth?(showOtherMonths?printDate.getDate():"&#xa0;"):(unselectable?'<span class="ui-state-default">'+printDate.getDate()+"</span>":'<a class="ui-state-default'+(printDate.getTime()==today.getTime()?" ui-state-highlight":"")+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" ui-state-active":"")+'" href="#">'+printDate.getDate()+"</a>"))+"</td>";
printDate.setDate(printDate.getDate()+1);
printDate=this._daylightSavingAdjust(printDate)
}calender+=tbody+"</tr>"
}drawMonth++;
if(drawMonth>11){drawMonth=0;
drawYear++
}calender+="</tbody></table>"+(isMultiMonth?"</div>"+((numMonths[0]>0&&col==numMonths[1]-1)?'<div class="ui-datepicker-row-break"></div>':""):"");
group+=calender
}html+=group
}html+=buttonPanel+($.browser.msie&&parseInt($.browser.version,10)<7&&!inst.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");
inst._keyEvent=false;
return html
},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,secondary,monthNames,monthNamesShort){minDate=(inst.rangeStart&&minDate&&selectedDate<minDate?selectedDate:minDate);
var changeMonth=this._get(inst,"changeMonth");
var changeYear=this._get(inst,"changeYear");
var showMonthAfterYear=this._get(inst,"showMonthAfterYear");
var html='<div class="ui-datepicker-title">';
var monthHtml="";
if(secondary||!changeMonth){monthHtml+='<span class="ui-datepicker-month">'+monthNames[drawMonth]+"</span> "
}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);
var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);
monthHtml+='<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#'+inst.id+"', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#"+inst.id+"');\">";
for(var month=0;
month<12;
month++){if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())){monthHtml+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNamesShort[month]+"</option>"
}}monthHtml+="</select>"
}if(!showMonthAfterYear){html+=monthHtml+((secondary||changeMonth||changeYear)&&(!(changeMonth&&changeYear))?"&#xa0;":"")
}if(secondary||!changeYear){html+='<span class="ui-datepicker-year">'+drawYear+"</span>"
}else{var years=this._get(inst,"yearRange").split(":");
var year=0;
var endYear=0;
if(years.length!=2){year=drawYear-10;
endYear=drawYear+10
}else{if(years[0].charAt(0)=="+"||years[0].charAt(0)=="-"){year=drawYear+parseInt(years[0],10);
endYear=drawYear+parseInt(years[1],10)
}else{year=parseInt(years[0],10);
endYear=parseInt(years[1],10)
}}year=(minDate?Math.max(year,minDate.getFullYear()):year);
endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);
html+='<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#'+inst.id+"', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#"+inst.id+"');\">";
for(;
year<=endYear;
year++){html+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>"
}html+="</select>"
}if(showMonthAfterYear){html+=(secondary||changeMonth||changeYear?"&#xa0;":"")+monthHtml
}html+="</div>";
return html
},_adjustInstDate:function(inst,offset,period){var year=inst.drawYear+(period=="Y"?offset:0);
var month=inst.drawMonth+(period=="M"?offset:0);
var day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);
var date=this._daylightSavingAdjust(new Date(year,month,day));
var minDate=this._getMinMaxDate(inst,"min",true);
var maxDate=this._getMinMaxDate(inst,"max");
date=(minDate&&date<minDate?minDate:date);
date=(maxDate&&date>maxDate?maxDate:date);
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
if(period=="M"||period=="Y"){this._notifyChange(inst)
}},_notifyChange:function(inst){var onChange=this._get(inst,"onChangeMonthYear");
if(onChange){onChange.apply((inst.input?inst.input[0]:null),[inst.selectedYear,inst.selectedMonth+1,inst])
}},_getNumberOfMonths:function(inst){var numMonths=this._get(inst,"numberOfMonths");
return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths))
},_getMinMaxDate:function(inst,minMax,checkRange){var date=this._determineDate(this._get(inst,minMax+"Date"),null);
return(!checkRange||!inst.rangeStart?date:(!date||inst.rangeStart>date?inst.rangeStart:date))
},_getDaysInMonth:function(year,month){return 32-new Date(year,month,32).getDate()
},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay()
},_canAdjustMonth:function(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst);
var date=this._daylightSavingAdjust(new Date(curYear,curMonth+(offset<0?offset:numMonths[1]),1));
if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()))
}return this._isInRange(inst,date)
},_isInRange:function(inst,date){var newMinDate=(!inst.rangeStart?null:this._daylightSavingAdjust(new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay)));
newMinDate=(newMinDate&&inst.rangeStart<newMinDate?inst.rangeStart:newMinDate);
var minDate=newMinDate||this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
return((!minDate||date>=minDate)&&(!maxDate||date<=maxDate))
},_getFormatConfig:function(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");
shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));
return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")}
},_formatDate:function(inst,day,month,year){if(!day){inst.currentDay=inst.selectedDay;
inst.currentMonth=inst.selectedMonth;
inst.currentYear=inst.selectedYear
}var date=(day?(typeof day=="object"?day:this._daylightSavingAdjust(new Date(year,month,day))):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst))
}});
function extendRemove(target,props){$.extend(target,props);
for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name]
}}return target
}function isArray(a){return(a&&(($.browser.safari&&typeof a=="object"&&a.length)||(a.constructor&&a.constructor.toString().match(/\Array\(\)/))))
}$.fn.datepicker=function(options){if(!$.datepicker.initialized){$(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
$.datepicker.initialized=true
}var otherArgs=Array.prototype.slice.call(arguments,1);
if(typeof options=="string"&&(options=="isDisabled"||options=="getDate")){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))
}if(options=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))
}return this.each(function(){typeof options=="string"?$.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options)
})
};
$.datepicker=new Datepicker();
$.datepicker.initialized=false;
$.datepicker.uuid=new Date().getTime();
$.datepicker.version="1.7.2";
window.DP_jQuery=$
})(jQuery);
(function(B){B.widget("ui.progressbar",{_init:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this._valueMin(),"aria-valuemax":this._valueMax(),"aria-valuenow":this._value()});
this.valueDiv=B('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);
this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow").removeData("progressbar").unbind(".progressbar");
this.valueDiv.remove();
B.widget.prototype.destroy.apply(this,arguments)
},value:function(A){if(A===undefined){return this._value()
}this._setData("value",A);
return this
},_setData:function(D,A){switch(D){case"value":this.options.value=A;
this._refreshValue();
this._trigger("change",null,{});
break
}B.widget.prototype._setData.apply(this,arguments)
},_value:function(){var A=this.options.value;
if(A<this._valueMin()){A=this._valueMin()
}if(A>this._valueMax()){A=this._valueMax()
}return A
},_valueMin:function(){var A=0;
return A
},_valueMax:function(){var A=100;
return A
},_refreshValue:function(){var A=this.value();
this.valueDiv[A==this._valueMax()?"addClass":"removeClass"]("ui-corner-right");
this.valueDiv.width(A+"%");
this.element.attr("aria-valuenow",A)
}});
B.extend(B.ui.progressbar,{version:"1.7.2",defaults:{value:0}})
})(jQuery);
jQuery.effects||(function(J){J.effects={version:"1.7.2",save:function(C,B){for(var A=0;
A<B.length;
A++){if(B[A]!==null){C.data("ec.storage."+B[A],C[0].style[B[A]])
}}},restore:function(C,B){for(var A=0;
A<B.length;
A++){if(B[A]!==null){C.css(B[A],C.data("ec.storage."+B[A]))
}}},setMode:function(B,A){if(A=="toggle"){A=B.is(":hidden")?"show":"hide"
}return A
},getBaseline:function(A,D){var C,B;
switch(A[0]){case"top":C=0;
break;
case"middle":C=0.5;
break;
case"bottom":C=1;
break;
default:C=A[0]/D.height
}switch(A[1]){case"left":B=0;
break;
case"center":B=0.5;
break;
case"right":B=1;
break;
default:B=A[1]/D.width
}return{x:B,y:C}
},createWrapper:function(C){if(C.parent().is(".ui-effects-wrapper")){return C.parent()
}var B={width:C.outerWidth(true),height:C.outerHeight(true),"float":C.css("float")};
C.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
var D=C.parent();
if(C.css("position")=="static"){D.css({position:"relative"});
C.css({position:"relative"})
}else{var E=C.css("top");
if(isNaN(parseInt(E,10))){E="auto"
}var A=C.css("left");
if(isNaN(parseInt(A,10))){A="auto"
}D.css({position:C.css("position"),top:E,left:A,zIndex:C.css("z-index")}).show();
C.css({position:"relative",top:0,left:0})
}D.css(B);
return D
},removeWrapper:function(A){if(A.parent().is(".ui-effects-wrapper")){return A.parent().replaceWith(A)
}return A
},setTransition:function(A,C,B,D){D=D||{};
J.each(C,function(E,L){unit=A.cssUnit(L);
if(unit[0]>0){D[L]=unit[0]*B+unit[1]
}});
return D
},animateClass:function(B,A,D,E){var L=(typeof D=="function"?D:(E?E:null));
var C=(typeof D=="string"?D:null);
return this.each(function(){var S={};
var U=J(this);
var T=U.attr("style")||"";
if(typeof T=="object"){T=T.cssText
}if(B.toggle){U.hasClass(B.toggle)?B.remove=B.toggle:B.add=B.toggle
}var V=J.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));
if(B.add){U.addClass(B.add)
}if(B.remove){U.removeClass(B.remove)
}var K=J.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));
if(B.add){U.removeClass(B.add)
}if(B.remove){U.addClass(B.remove)
}for(var R in K){if(typeof K[R]!="function"&&K[R]&&R.indexOf("Moz")==-1&&R.indexOf("length")==-1&&K[R]!=V[R]&&(R.match(/color/i)||(!R.match(/color/i)&&!isNaN(parseInt(K[R],10))))&&(V.position!="static"||(V.position=="static"&&!R.match(/left|top|bottom|right/)))){S[R]=K[R]
}}U.animate(S,A,C,function(){if(typeof J(this).attr("style")=="object"){J(this).attr("style")["cssText"]="";
J(this).attr("style")["cssText"]=T
}else{J(this).attr("style",T)
}if(B.add){J(this).addClass(B.add)
}if(B.remove){J(this).removeClass(B.remove)
}if(L){L.apply(this,arguments)
}})
})
}};
function F(B,C){var E=B[1]&&B[1].constructor==Object?B[1]:{};
if(C){E.mode=C
}var A=B[1]&&B[1].constructor!=Object?B[1]:(E.duration?E.duration:B[2]);
A=J.fx.off?0:typeof A==="number"?A:J.fx.speeds[A]||J.fx.speeds._default;
var D=E.callback||(J.isFunction(B[1])&&B[1])||(J.isFunction(B[2])&&B[2])||(J.isFunction(B[3])&&B[3]);
return[B[0],E,A,D]
}J.fn.extend({_show:J.fn.show,_hide:J.fn.hide,__toggle:J.fn.toggle,_addClass:J.fn.addClass,_removeClass:J.fn.removeClass,_toggleClass:J.fn.toggleClass,effect:function(A,B,D,C){return J.effects[A]?J.effects[A].call(this,{method:A,options:B||{},duration:D,callback:C}):null
},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._show.apply(this,arguments)
}else{return this.effect.apply(this,F(arguments,"show"))
}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._hide.apply(this,arguments)
}else{return this.effect.apply(this,F(arguments,"hide"))
}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))||(J.isFunction(arguments[0])||typeof arguments[0]=="boolean")){return this.__toggle.apply(this,arguments)
}else{return this.effect.apply(this,F(arguments,"toggle"))
}},addClass:function(A,B,C,D){return B?J.effects.animateClass.apply(this,[{add:A},B,C,D]):this._addClass(A)
},removeClass:function(A,B,C,D){return B?J.effects.animateClass.apply(this,[{remove:A},B,C,D]):this._removeClass(A)
},toggleClass:function(A,B,C,D){return((typeof B!=="boolean")&&B)?J.effects.animateClass.apply(this,[{toggle:A},B,C,D]):this._toggleClass(A,B)
},morph:function(C,A,B,D,E){return J.effects.animateClass.apply(this,[{add:A,remove:C},B,D,E])
},switchClass:function(){return this.morph.apply(this,arguments)
},cssUnit:function(A){var C=this.css(A),B=[];
J.each(["em","px","%","pt"],function(E,D){if(C.indexOf(D)>0){B=[parseFloat(C),D]
}});
return B
}});
J.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(A,B){J.fx.step[B]=function(C){if(C.state==0){C.start=I(C.elem,B);
C.end=G(C.end)
}C.elem.style[B]="rgb("+[Math.max(Math.min(parseInt((C.pos*(C.end[0]-C.start[0]))+C.start[0],10),255),0),Math.max(Math.min(parseInt((C.pos*(C.end[1]-C.start[1]))+C.start[1],10),255),0),Math.max(Math.min(parseInt((C.pos*(C.end[2]-C.start[2]))+C.start[2],10),255),0)].join(",")+")"
}
});
function G(A){var B;
if(A&&A.constructor==Array&&A.length==3){return A
}if(B=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(A)){return[parseInt(B[1],10),parseInt(B[2],10),parseInt(B[3],10)]
}if(B=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(A)){return[parseFloat(B[1])*2.55,parseFloat(B[2])*2.55,parseFloat(B[3])*2.55]
}if(B=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(A)){return[parseInt(B[1],16),parseInt(B[2],16),parseInt(B[3],16)]
}if(B=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(A)){return[parseInt(B[1]+B[1],16),parseInt(B[2]+B[2],16),parseInt(B[3]+B[3],16)]
}if(B=/rgba\(0, 0, 0, 0\)/.exec(A)){return H.transparent
}return H[J.trim(A).toLowerCase()]
}function I(B,A){var C;
do{C=J.curCSS(B,A);
if(C!=""&&C!="transparent"||J.nodeName(B,"body")){break
}A="backgroundColor"
}while(B=B.parentNode);
return G(C)
}var H={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
J.easing.jswing=J.easing.swing;
J.extend(J.easing,{def:"easeOutQuad",swing:function(B,A,C,D,E){return J.easing[J.easing.def](B,A,C,D,E)
},easeInQuad:function(B,A,C,D,E){return D*(A/=E)*A+C
},easeOutQuad:function(B,A,C,D,E){return -D*(A/=E)*(A-2)+C
},easeInOutQuad:function(B,A,C,D,E){if((A/=E/2)<1){return D/2*A*A+C
}return -D/2*((--A)*(A-2)-1)+C
},easeInCubic:function(B,A,C,D,E){return D*(A/=E)*A*A+C
},easeOutCubic:function(B,A,C,D,E){return D*((A=A/E-1)*A*A+1)+C
},easeInOutCubic:function(B,A,C,D,E){if((A/=E/2)<1){return D/2*A*A*A+C
}return D/2*((A-=2)*A*A+2)+C
},easeInQuart:function(B,A,C,D,E){return D*(A/=E)*A*A*A+C
},easeOutQuart:function(B,A,C,D,E){return -D*((A=A/E-1)*A*A*A-1)+C
},easeInOutQuart:function(B,A,C,D,E){if((A/=E/2)<1){return D/2*A*A*A*A+C
}return -D/2*((A-=2)*A*A*A-2)+C
},easeInQuint:function(B,A,C,D,E){return D*(A/=E)*A*A*A*A+C
},easeOutQuint:function(B,A,C,D,E){return D*((A=A/E-1)*A*A*A*A+1)+C
},easeInOutQuint:function(B,A,C,D,E){if((A/=E/2)<1){return D/2*A*A*A*A*A+C
}return D/2*((A-=2)*A*A*A*A+2)+C
},easeInSine:function(B,A,C,D,E){return -D*Math.cos(A/E*(Math.PI/2))+D+C
},easeOutSine:function(B,A,C,D,E){return D*Math.sin(A/E*(Math.PI/2))+C
},easeInOutSine:function(B,A,C,D,E){return -D/2*(Math.cos(Math.PI*A/E)-1)+C
},easeInExpo:function(B,A,C,D,E){return(A==0)?C:D*Math.pow(2,10*(A/E-1))+C
},easeOutExpo:function(B,A,C,D,E){return(A==E)?C+D:D*(-Math.pow(2,-10*A/E)+1)+C
},easeInOutExpo:function(B,A,C,D,E){if(A==0){return C
}if(A==E){return C+D
}if((A/=E/2)<1){return D/2*Math.pow(2,10*(A-1))+C
}return D/2*(-Math.pow(2,-10*--A)+2)+C
},easeInCirc:function(B,A,C,D,E){return -D*(Math.sqrt(1-(A/=E)*A)-1)+C
},easeOutCirc:function(B,A,C,D,E){return D*Math.sqrt(1-(A=A/E-1)*A)+C
},easeInOutCirc:function(B,A,C,D,E){if((A/=E/2)<1){return -D/2*(Math.sqrt(1-A*A)-1)+C
}return D/2*(Math.sqrt(1-(A-=2)*A)+1)+C
},easeInElastic:function(O,A,C,E,D){var P=1.70158;
var N=0;
var B=E;
if(A==0){return C
}if((A/=D)==1){return C+E
}if(!N){N=D*0.3
}if(B<Math.abs(E)){B=E;
var P=N/4
}else{var P=N/(2*Math.PI)*Math.asin(E/B)
}return -(B*Math.pow(2,10*(A-=1))*Math.sin((A*D-P)*(2*Math.PI)/N))+C
},easeOutElastic:function(O,A,C,E,D){var P=1.70158;
var N=0;
var B=E;
if(A==0){return C
}if((A/=D)==1){return C+E
}if(!N){N=D*0.3
}if(B<Math.abs(E)){B=E;
var P=N/4
}else{var P=N/(2*Math.PI)*Math.asin(E/B)
}return B*Math.pow(2,-10*A)*Math.sin((A*D-P)*(2*Math.PI)/N)+E+C
},easeInOutElastic:function(O,A,C,E,D){var P=1.70158;
var N=0;
var B=E;
if(A==0){return C
}if((A/=D/2)==2){return C+E
}if(!N){N=D*(0.3*1.5)
}if(B<Math.abs(E)){B=E;
var P=N/4
}else{var P=N/(2*Math.PI)*Math.asin(E/B)
}if(A<1){return -0.5*(B*Math.pow(2,10*(A-=1))*Math.sin((A*D-P)*(2*Math.PI)/N))+C
}return B*Math.pow(2,-10*(A-=1))*Math.sin((A*D-P)*(2*Math.PI)/N)*0.5+E+C
},easeInBack:function(C,B,D,E,L,A){if(A==undefined){A=1.70158
}return E*(B/=L)*B*((A+1)*B-A)+D
},easeOutBack:function(C,B,D,E,L,A){if(A==undefined){A=1.70158
}return E*((B=B/L-1)*B*((A+1)*B+A)+1)+D
},easeInOutBack:function(C,B,D,E,L,A){if(A==undefined){A=1.70158
}if((B/=L/2)<1){return E/2*(B*B*(((A*=(1.525))+1)*B-A))+D
}return E/2*((B-=2)*B*(((A*=(1.525))+1)*B+A)+2)+D
},easeInBounce:function(B,A,C,D,E){return D-J.easing.easeOutBounce(B,E-A,0,D,E)+C
},easeOutBounce:function(B,A,C,D,E){if((A/=E)<(1/2.75)){return D*(7.5625*A*A)+C
}else{if(A<(2/2.75)){return D*(7.5625*(A-=(1.5/2.75))*A+0.75)+C
}else{if(A<(2.5/2.75)){return D*(7.5625*(A-=(2.25/2.75))*A+0.9375)+C
}else{return D*(7.5625*(A-=(2.625/2.75))*A+0.984375)+C
}}}},easeInOutBounce:function(B,A,C,D,E){if(A<E/2){return J.easing.easeInBounce(B,A*2,0,D,E)*0.5+C
}return J.easing.easeOutBounce(B,A*2-E,0,D,E)*0.5+D*0.5+C
}})
})(jQuery);
(function(B){B.effects.blind=function(A){return this.queue(function(){var M=B(this),N=["position","top","left"];
var Q=B.effects.setMode(M,A.options.mode||"hide");
var R=A.options.direction||"vertical";
B.effects.save(M,N);
M.show();
var O=B.effects.createWrapper(M).css({overflow:"hidden"});
var L=(R=="vertical")?"height":"width";
var P=(R=="vertical")?O.height():O.width();
if(Q=="show"){O.css(L,0)
}var K={};
K[L]=Q=="show"?P:0;
O.animate(K,A.duration,A.options.easing,function(){if(Q=="hide"){M.hide()
}B.effects.restore(M,N);
B.effects.removeWrapper(M);
if(A.callback){A.callback.apply(M[0],arguments)
}M.dequeue()
})
})
}
})(jQuery);
(function(B){B.effects.bounce=function(A){return this.queue(function(){var W=B(this),Q=["position","top","left"];
var R=B.effects.setMode(W,A.options.mode||"effect");
var b=A.options.direction||"up";
var Y=A.options.distance||20;
var X=A.options.times||5;
var U=A.duration||250;
if(/show|hide/.test(R)){Q.push("opacity")
}B.effects.save(W,Q);
W.show();
B.effects.createWrapper(W);
var V=(b=="up"||b=="down")?"top":"left";
var Z=(b=="up"||b=="left")?"pos":"neg";
var Y=A.options.distance||(V=="top"?W.outerHeight({margin:true})/3:W.outerWidth({margin:true})/3);
if(R=="show"){W.css("opacity",0).css(V,Z=="pos"?-Y:Y)
}if(R=="hide"){Y=Y/(X*2)
}if(R!="hide"){X--
}if(R=="show"){var T={opacity:1};
T[V]=(Z=="pos"?"+=":"-=")+Y;
W.animate(T,U/2,A.options.easing);
Y=Y/2;
X--
}for(var S=0;
S<X;
S++){var a={},P={};
a[V]=(Z=="pos"?"-=":"+=")+Y;
P[V]=(Z=="pos"?"+=":"-=")+Y;
W.animate(a,U/2,A.options.easing).animate(P,U/2,A.options.easing);
Y=(R=="hide")?Y*2:Y/2
}if(R=="hide"){var T={opacity:0};
T[V]=(Z=="pos"?"-=":"+=")+Y;
W.animate(T,U/2,A.options.easing,function(){W.hide();
B.effects.restore(W,Q);
B.effects.removeWrapper(W);
if(A.callback){A.callback.apply(this,arguments)
}})
}else{var a={},P={};
a[V]=(Z=="pos"?"-=":"+=")+Y;
P[V]=(Z=="pos"?"+=":"-=")+Y;
W.animate(a,U/2,A.options.easing).animate(P,U/2,A.options.easing,function(){B.effects.restore(W,Q);
B.effects.removeWrapper(W);
if(A.callback){A.callback.apply(this,arguments)
}})
}W.queue("fx",function(){W.dequeue()
});
W.dequeue()
})
}
})(jQuery);
(function(B){B.effects.clip=function(A){return this.queue(function(){var N=B(this),S=["position","top","left","height","width"];
var T=B.effects.setMode(N,A.options.mode||"hide");
var R=A.options.direction||"vertical";
B.effects.save(N,S);
N.show();
var Q=B.effects.createWrapper(N).css({overflow:"hidden"});
var O=N[0].tagName=="IMG"?Q:N;
var M={size:(R=="vertical")?"height":"width",position:(R=="vertical")?"top":"left"};
var P=(R=="vertical")?O.height():O.width();
if(T=="show"){O.css(M.size,0);
O.css(M.position,P/2)
}var L={};
L[M.size]=T=="show"?P:0;
L[M.position]=T=="show"?0:P/2;
O.animate(L,{queue:false,duration:A.duration,easing:A.options.easing,complete:function(){if(T=="hide"){N.hide()
}B.effects.restore(N,S);
B.effects.removeWrapper(N);
if(A.callback){A.callback.apply(N[0],arguments)
}N.dequeue()
}})
})
}
})(jQuery);
(function(B){B.effects.drop=function(A){return this.queue(function(){var L=B(this),M=["position","top","left","opacity"];
var P=B.effects.setMode(L,A.options.mode||"hide");
var Q=A.options.direction||"left";
B.effects.save(L,M);
L.show();
B.effects.createWrapper(L);
var K=(Q=="up"||Q=="down")?"top":"left";
var N=(Q=="up"||Q=="left")?"pos":"neg";
var O=A.options.distance||(K=="top"?L.outerHeight({margin:true})/2:L.outerWidth({margin:true})/2);
if(P=="show"){L.css("opacity",0).css(K,N=="pos"?-O:O)
}var R={opacity:P=="show"?1:0};
R[K]=(P=="show"?(N=="pos"?"+=":"-="):(N=="pos"?"-=":"+="))+O;
L.animate(R,{queue:false,duration:A.duration,easing:A.options.easing,complete:function(){if(P=="hide"){L.hide()
}B.effects.restore(L,M);
B.effects.removeWrapper(L);
if(A.callback){A.callback.apply(this,arguments)
}L.dequeue()
}})
})
}
})(jQuery);
(function(B){B.effects.explode=function(A){return this.queue(function(){var P=A.options.pieces?Math.round(Math.sqrt(A.options.pieces)):3;
var L=A.options.pieces?Math.round(Math.sqrt(A.options.pieces)):3;
A.options.mode=A.options.mode=="toggle"?(B(this).is(":visible")?"hide":"show"):A.options.mode;
var Q=B(this).show().css("visibility","hidden");
var O=Q.offset();
O.top-=parseInt(Q.css("marginTop"),10)||0;
O.left-=parseInt(Q.css("marginLeft"),10)||0;
var R=Q.outerWidth(true);
var N=Q.outerHeight(true);
for(var K=0;
K<P;
K++){for(var M=0;
M<L;
M++){Q.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-M*(R/L),top:-K*(N/P)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:R/L,height:N/P,left:O.left+M*(R/L)+(A.options.mode=="show"?(M-Math.floor(L/2))*(R/L):0),top:O.top+K*(N/P)+(A.options.mode=="show"?(K-Math.floor(P/2))*(N/P):0),opacity:A.options.mode=="show"?0:1}).animate({left:O.left+M*(R/L)+(A.options.mode=="show"?0:(M-Math.floor(L/2))*(R/L)),top:O.top+K*(N/P)+(A.options.mode=="show"?0:(K-Math.floor(P/2))*(N/P)),opacity:A.options.mode=="show"?1:0},A.duration||500)
}}setTimeout(function(){A.options.mode=="show"?Q.css({visibility:"visible"}):Q.css({visibility:"visible"}).hide();
if(A.callback){A.callback.apply(Q[0])
}Q.dequeue();
B("div.ui-effects-explode").remove()
},A.duration||500)
})
}
})(jQuery);
(function(B){B.effects.fold=function(A){return this.queue(function(){var W=B(this),Q=["position","top","left"];
var T=B.effects.setMode(W,A.options.mode||"hide");
var Z=A.options.size||15;
var a=!(!A.options.horizFirst);
var U=A.duration?A.duration/2:B.fx.speeds._default/2;
B.effects.save(W,Q);
W.show();
var X=B.effects.createWrapper(W).css({overflow:"hidden"});
var S=((T=="show")!=a);
var V=S?["width","height"]:["height","width"];
var Y=S?[X.width(),X.height()]:[X.height(),X.width()];
var R=/([0-9]+)%/.exec(Z);
if(R){Z=parseInt(R[1],10)/100*Y[T=="hide"?0:1]
}if(T=="show"){X.css(a?{height:0,width:Z}:{height:Z,width:0})
}var b={},P={};
b[V[0]]=T=="show"?Y[0]:Z;
P[V[1]]=T=="show"?Y[1]:0;
X.animate(b,U,A.options.easing).animate(P,U,A.options.easing,function(){if(T=="hide"){W.hide()
}B.effects.restore(W,Q);
B.effects.removeWrapper(W);
if(A.callback){A.callback.apply(W[0],arguments)
}W.dequeue()
})
})
}
})(jQuery);
(function(B){B.effects.highlight=function(A){return this.queue(function(){var J=B(this),K=["backgroundImage","backgroundColor","opacity"];
var M=B.effects.setMode(J,A.options.mode||"show");
var L=A.options.color||"#ffff99";
var N=J.css("backgroundColor");
B.effects.save(J,K);
J.show();
J.css({backgroundImage:"none",backgroundColor:L});
var I={backgroundColor:N};
if(M=="hide"){I.opacity=0
}J.animate(I,{queue:false,duration:A.duration,easing:A.options.easing,complete:function(){if(M=="hide"){J.hide()
}B.effects.restore(J,K);
if(M=="show"&&B.browser.msie){this.style.removeAttribute("filter")
}if(A.callback){A.callback.apply(this,arguments)
}J.dequeue()
}})
})
}
})(jQuery);
(function(B){B.effects.pulsate=function(A){return this.queue(function(){var K=B(this);
var H=B.effects.setMode(K,A.options.mode||"show");
var I=A.options.times||5;
var J=A.duration?A.duration/2:B.fx.speeds._default/2;
if(H=="hide"){I--
}if(K.is(":hidden")){K.css("opacity",0);
K.show();
K.animate({opacity:1},J,A.options.easing);
I=I-2
}for(var L=0;
L<I;
L++){K.animate({opacity:0},J,A.options.easing).animate({opacity:1},J,A.options.easing)
}if(H=="hide"){K.animate({opacity:0},J,A.options.easing,function(){K.hide();
if(A.callback){A.callback.apply(this,arguments)
}})
}else{K.animate({opacity:0},J,A.options.easing).animate({opacity:1},J,A.options.easing,function(){if(A.callback){A.callback.apply(this,arguments)
}})
}K.queue("fx",function(){K.dequeue()
});
K.dequeue()
})
}
})(jQuery);
(function(B){B.effects.puff=function(A){return this.queue(function(){var I=B(this);
var L=B.extend(true,{},A.options);
var M=B.effects.setMode(I,A.options.mode||"hide");
var N=parseInt(A.options.percent,10)||150;
L.fade=true;
var J={height:I.height(),width:I.width()};
var K=N/100;
I.from=(M=="hide")?J:{height:J.height*K,width:J.width*K};
L.from=I.from;
L.percent=(M=="hide")?N:100;
L.mode=M;
I.effect("scale",L,A.duration,A.callback);
I.dequeue()
})
};
B.effects.scale=function(A){return this.queue(function(){var R=B(this);
var M=B.extend(true,{},A.options);
var O=B.effects.setMode(R,A.options.mode||"effect");
var Q=parseInt(A.options.percent,10)||(parseInt(A.options.percent,10)==0?0:(O=="hide"?0:100));
var P=A.options.direction||"both";
var N=A.options.origin;
if(O!="effect"){M.origin=N||["middle","center"];
M.restore=true
}var K={height:R.height(),width:R.width()};
R.from=A.options.from||(O=="show"?{height:0,width:0}:K);
var L={y:P!="horizontal"?(Q/100):1,x:P!="vertical"?(Q/100):1};
R.to={height:K.height*L.y,width:K.width*L.x};
if(A.options.fade){if(O=="show"){R.from.opacity=0;
R.to.opacity=1
}if(O=="hide"){R.from.opacity=1;
R.to.opacity=0
}}M.from=R.from;
M.to=R.to;
M.mode=O;
R.effect("size",M,A.duration,A.callback);
R.dequeue()
})
};
B.effects.size=function(A){return this.queue(function(){var d=B(this),S=["position","top","left","width","height","overflow","opacity"];
var T=["position","top","left","overflow","opacity"];
var W=["width","height","overflow"];
var Q=["fontSize"];
var V=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var a=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var Z=B.effects.setMode(d,A.options.mode||"effect");
var X=A.options.restore||false;
var b=A.options.scale||"both";
var R=A.options.origin;
var c={height:d.height(),width:d.width()};
d.from=A.options.from||c;
d.to=A.options.to||c;
if(R){var Y=B.effects.getBaseline(R,c);
d.from.top=(c.height-d.from.height)*Y.y;
d.from.left=(c.width-d.from.width)*Y.x;
d.to.top=(c.height-d.to.height)*Y.y;
d.to.left=(c.width-d.to.width)*Y.x
}var U={from:{y:d.from.height/c.height,x:d.from.width/c.width},to:{y:d.to.height/c.height,x:d.to.width/c.width}};
if(b=="box"||b=="both"){if(U.from.y!=U.to.y){S=S.concat(V);
d.from=B.effects.setTransition(d,V,U.from.y,d.from);
d.to=B.effects.setTransition(d,V,U.to.y,d.to)
}if(U.from.x!=U.to.x){S=S.concat(a);
d.from=B.effects.setTransition(d,a,U.from.x,d.from);
d.to=B.effects.setTransition(d,a,U.to.x,d.to)
}}if(b=="content"||b=="both"){if(U.from.y!=U.to.y){S=S.concat(Q);
d.from=B.effects.setTransition(d,Q,U.from.y,d.from);
d.to=B.effects.setTransition(d,Q,U.to.y,d.to)
}}B.effects.save(d,X?S:T);
d.show();
B.effects.createWrapper(d);
d.css("overflow","hidden").css(d.from);
if(b=="content"||b=="both"){V=V.concat(["marginTop","marginBottom"]).concat(Q);
a=a.concat(["marginLeft","marginRight"]);
W=S.concat(V).concat(a);
d.find("*[width]").each(function(){child=B(this);
if(X){B.effects.save(child,W)
}var C={height:child.height(),width:child.width()};
child.from={height:C.height*U.from.y,width:C.width*U.from.x};
child.to={height:C.height*U.to.y,width:C.width*U.to.x};
if(U.from.y!=U.to.y){child.from=B.effects.setTransition(child,V,U.from.y,child.from);
child.to=B.effects.setTransition(child,V,U.to.y,child.to)
}if(U.from.x!=U.to.x){child.from=B.effects.setTransition(child,a,U.from.x,child.from);
child.to=B.effects.setTransition(child,a,U.to.x,child.to)
}child.css(child.from);
child.animate(child.to,A.duration,A.options.easing,function(){if(X){B.effects.restore(child,W)
}})
})
}d.animate(d.to,{queue:false,duration:A.duration,easing:A.options.easing,complete:function(){if(Z=="hide"){d.hide()
}B.effects.restore(d,X?S:T);
B.effects.removeWrapper(d);
if(A.callback){A.callback.apply(this,arguments)
}d.dequeue()
}})
})
}
})(jQuery);
(function(B){B.effects.shake=function(A){return this.queue(function(){var W=B(this),Q=["position","top","left"];
var R=B.effects.setMode(W,A.options.mode||"effect");
var b=A.options.direction||"left";
var Y=A.options.distance||20;
var X=A.options.times||3;
var U=A.duration||A.options.duration||140;
B.effects.save(W,Q);
W.show();
B.effects.createWrapper(W);
var V=(b=="up"||b=="down")?"top":"left";
var Z=(b=="up"||b=="left")?"pos":"neg";
var T={},a={},P={};
T[V]=(Z=="pos"?"-=":"+=")+Y;
a[V]=(Z=="pos"?"+=":"-=")+Y*2;
P[V]=(Z=="pos"?"-=":"+=")+Y*2;
W.animate(T,U,A.options.easing);
for(var S=1;
S<X;
S++){W.animate(a,U,A.options.easing).animate(P,U,A.options.easing)
}W.animate(a,U,A.options.easing).animate(T,U/2,A.options.easing,function(){B.effects.restore(W,Q);
B.effects.removeWrapper(W);
if(A.callback){A.callback.apply(this,arguments)
}});
W.queue("fx",function(){W.dequeue()
});
W.dequeue()
})
}
})(jQuery);
(function(B){B.effects.slide=function(A){return this.queue(function(){var L=B(this),M=["position","top","left"];
var P=B.effects.setMode(L,A.options.mode||"show");
var Q=A.options.direction||"left";
B.effects.save(L,M);
L.show();
B.effects.createWrapper(L).css({overflow:"hidden"});
var K=(Q=="up"||Q=="down")?"top":"left";
var N=(Q=="up"||Q=="left")?"pos":"neg";
var O=A.options.distance||(K=="top"?L.outerHeight({margin:true}):L.outerWidth({margin:true}));
if(P=="show"){L.css(K,N=="pos"?-O:O)
}var R={};
R[K]=(P=="show"?(N=="pos"?"+=":"-="):(N=="pos"?"-=":"+="))+O;
L.animate(R,{queue:false,duration:A.duration,easing:A.options.easing,complete:function(){if(P=="hide"){L.hide()
}B.effects.restore(L,M);
B.effects.removeWrapper(L);
if(A.callback){A.callback.apply(this,arguments)
}L.dequeue()
}})
})
}
})(jQuery);
(function(B){B.effects.transfer=function(A){return this.queue(function(){var I=B(this),M=B(A.options.to),J=M.offset(),N={top:J.top,left:J.left,height:M.innerHeight(),width:M.innerWidth()},K=I.offset(),L=B('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(A.options.className).css({top:K.top,left:K.left,height:I.innerHeight(),width:I.innerWidth(),position:"absolute"}).animate(N,A.duration,A.options.easing,function(){L.remove();
(A.callback&&A.callback.apply(I[0],arguments));
I.dequeue()
})
})
}
})(jQuery);