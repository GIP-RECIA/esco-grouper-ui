jQuery.ui||(function(D){var A=D.fn.remove,E=D.browser.mozilla&&(parseFloat(D.browser.version)<1.9);
D.ui={version:"1.7.2",plugin:{add:function(L,M,J){var N=D.ui[L].prototype;
for(var K in J){N.plugins[K]=N.plugins[K]||[];
N.plugins[K].push([M,J[K]])
}},call:function(K,M,L){var J=K.plugins[M];
if(!J||!K.element[0].parentNode){return 
}for(var N=0;
N<J.length;
N++){if(K.options[J[N][0]]){J[N][1].apply(K.element,L)
}}}},contains:function(K,J){return document.compareDocumentPosition?K.compareDocumentPosition(J)&16:K!==J&&K.contains(J)
},hasScroll:function(M,K){if(D(M).css("overflow")=="hidden"){return false
}var J=(K&&K=="left")?"scrollLeft":"scrollTop",L=false;
if(M[J]>0){return true
}M[J]=1;
L=(M[J]>0);
M[J]=0;
return L
},isOverAxis:function(J,L,K){return(J>L)&&(J<(L+K))
},isOver:function(K,M,J,O,L,N){return D.ui.isOverAxis(K,J,L)&&D.ui.isOverAxis(M,O,N)
},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};
if(E){var G=D.attr,F=D.fn.removeAttr,I="http://www.w3.org/2005/07/aaa",B=/^aria-/,C=/^wairole:/;
D.attr=function(K,J,L){var M=L!==undefined;
return(J=="role"?(M?G.call(this,K,J,"wairole:"+L):(G.apply(this,arguments)||"").replace(C,"")):(B.test(J)?(M?K.setAttributeNS(I,J.replace(B,"aaa:"),L):G.call(this,K,J.replace(B,"aaa:"))):G.apply(this,arguments)))
};
D.fn.removeAttr=function(J){return(B.test(J)?this.each(function(){this.removeAttributeNS(I,J.replace(B,""))
}):F.call(this,J))
}
}D.fn.extend({remove:function(){D("*",this).add(this).each(function(){D(this).triggerHandler("remove")
});
return A.apply(this,arguments)
},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")
},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false
})
},scrollParent:function(){var J;
if((D.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){J=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(D.curCSS(this,"position",1))&&(/(auto|scroll)/).test(D.curCSS(this,"overflow",1)+D.curCSS(this,"overflow-y",1)+D.curCSS(this,"overflow-x",1))
}).eq(0)
}else{J=this.parents().filter(function(){return(/(auto|scroll)/).test(D.curCSS(this,"overflow",1)+D.curCSS(this,"overflow-y",1)+D.curCSS(this,"overflow-x",1))
}).eq(0)
}return(/fixed/).test(this.css("position"))||!J.length?D(document):J
}});
D.extend(D.expr[":"],{data:function(K,J,L){return !!D.data(K,L[3])
},focusable:function(J){var K=J.nodeName.toLowerCase(),L=D.attr(J,"tabindex");
return(/input|select|textarea|button|object/.test(K)?!J.disabled:"a"==K||"area"==K?J.href||!isNaN(L):!isNaN(L))&&!D(J)["area"==K?"parents":"closest"](":hidden").length
},tabbable:function(K){var J=D.attr(K,"tabindex");
return(isNaN(J)||J>=0)&&D(K).is(":focusable")
}});
function H(O,J,K,N){function M(Q){var P=D[O][J][Q]||[];
return(typeof P=="string"?P.split(/,?\s+/):P)
}var L=M("getter");
if(N.length==1&&typeof N[0]=="string"){L=L.concat(M("getterSetter"))
}return(D.inArray(K,L)!=-1)
}D.widget=function(J,L){var K=J.split(".")[0];
J=J.split(".")[1];
D.fn[J]=function(P){var N=(typeof P=="string"),O=Array.prototype.slice.call(arguments,1);
if(N&&P.substring(0,1)=="_"){return this
}if(N&&H(K,J,P,O)){var M=D.data(this[0],J);
return(M?M[P].apply(M,O):undefined)
}return this.each(function(){var Q=D.data(this,J);
(!Q&&!N&&D.data(this,J,new D[K][J](this,P))._init());
(Q&&N&&D.isFunction(Q[P])&&Q[P].apply(Q,O))
})
};
D[K]=D[K]||{};
D[K][J]=function(O,N){var M=this;
this.namespace=K;
this.widgetName=J;
this.widgetEventPrefix=D[K][J].eventPrefix||J;
this.widgetBaseClass=K+"-"+J;
this.options=D.extend({},D.widget.defaults,D[K][J].defaults,D.metadata&&D.metadata.get(O)[J],N);
this.element=D(O).bind("setData."+J,function(Q,P,R){if(Q.target==O){return M._setData(P,R)
}}).bind("getData."+J,function(Q,P){if(Q.target==O){return M._getData(P)
}}).bind("remove",function(){return M.destroy()
})
};
D[K][J].prototype=D.extend({},D.widget.prototype,L);
D[K][J].getterSetter="option"
};
D.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").removeAttr("aria-disabled")
},option:function(L,M){var K=L,J=this;
if(typeof L=="string"){if(M===undefined){return this._getData(L)
}K={};
K[L]=M
}D.each(K,function(N,O){J._setData(N,O)
})
},_getData:function(J){return this.options[J]
},_setData:function(J,K){this.options[J]=K;
if(J=="disabled"){this.element[K?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",K)
}},enable:function(){this._setData("disabled",false)
},disable:function(){this._setData("disabled",true)
},_trigger:function(O,P,J){var L=this.options[O],M=(O==this.widgetEventPrefix?O:this.widgetEventPrefix+O);
P=D.Event(P);
P.type=M;
if(P.originalEvent){for(var N=D.event.props.length,K;
N;
){K=D.event.props[--N];
P[K]=P.originalEvent[K]
}}this.element.trigger(P,J);
return !(D.isFunction(L)&&L.call(this.element[0],P,J)===false||P.isDefaultPrevented())
}};
D.widget.defaults={disabled:false};
D.ui.mouse={_mouseInit:function(){var J=this;
this.element.bind("mousedown."+this.widgetName,function(K){return J._mouseDown(K)
}).bind("click."+this.widgetName,function(K){if(J._preventClickEvent){J._preventClickEvent=false;
K.stopImmediatePropagation();
return false
}});
if(D.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");
this.element.attr("unselectable","on")
}this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);
(D.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))
},_mouseDown:function(L){L.originalEvent=L.originalEvent||{};
if(L.originalEvent.mouseHandled){return 
}(this._mouseStarted&&this._mouseUp(L));
this._mouseDownEvent=L;
var K=this,M=(L.which==1),J=(typeof this.options.cancel=="string"?D(L.target).parents().add(L.target).filter(this.options.cancel).length:false);
if(!M||J||!this._mouseCapture(L)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){K.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(L)&&this._mouseDelayMet(L)){this._mouseStarted=(this._mouseStart(L)!==false);
if(!this._mouseStarted){L.preventDefault();
return true
}}this._mouseMoveDelegate=function(N){return K._mouseMove(N)
};
this._mouseUpDelegate=function(N){return K._mouseUp(N)
};
D(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
(D.browser.safari||L.preventDefault());
L.originalEvent.mouseHandled=true;
return true
},_mouseMove:function(J){if(D.browser.msie&&!J.button){return this._mouseUp(J)
}if(this._mouseStarted){this._mouseDrag(J);
return J.preventDefault()
}if(this._mouseDistanceMet(J)&&this._mouseDelayMet(J)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,J)!==false);
(this._mouseStarted?this._mouseDrag(J):this._mouseUp(J))
}return !this._mouseStarted
},_mouseUp:function(J){D(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
this._preventClickEvent=(J.target==this._mouseDownEvent.target);
this._mouseStop(J)
}return false
},_mouseDistanceMet:function(J){return(Math.max(Math.abs(this._mouseDownEvent.pageX-J.pageX),Math.abs(this._mouseDownEvent.pageY-J.pageY))>=this.options.distance)
},_mouseDelayMet:function(J){return this.mouseDelayMet
},_mouseStart:function(J){},_mouseDrag:function(J){},_mouseStop:function(J){},_mouseCapture:function(J){return true
}};
D.ui.mouse.defaults={cancel:null,distance:1,delay:0}
})(jQuery);
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
(function(A){A.widget("ui.droppable",{_init:function(){var C=this.options,B=C.accept;
this.isover=0;
this.isout=1;
this.options.accept=this.options.accept&&A.isFunction(this.options.accept)?this.options.accept:function(D){return D.is(B)
};
this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};
A.ui.ddmanager.droppables[this.options.scope]=A.ui.ddmanager.droppables[this.options.scope]||[];
A.ui.ddmanager.droppables[this.options.scope].push(this);
(this.options.addClasses&&this.element.addClass("ui-droppable"))
},destroy:function(){var B=A.ui.ddmanager.droppables[this.options.scope];
for(var C=0;
C<B.length;
C++){if(B[C]==this){B.splice(C,1)
}}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable")
},_setData:function(B,C){if(B=="accept"){this.options.accept=C&&A.isFunction(C)?C:function(D){return D.is(C)
}
}else{A.widget.prototype._setData.apply(this,arguments)
}},_activate:function(C){var B=A.ui.ddmanager.current;
if(this.options.activeClass){this.element.addClass(this.options.activeClass)
}(B&&this._trigger("activate",C,this.ui(B)))
},_deactivate:function(C){var B=A.ui.ddmanager.current;
if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}(B&&this._trigger("deactivate",C,this.ui(B)))
},_over:function(C){var B=A.ui.ddmanager.current;
if(!B||(B.currentItem||B.element)[0]==this.element[0]){return 
}if(this.options.accept.call(this.element[0],(B.currentItem||B.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)
}this._trigger("over",C,this.ui(B))
}},_out:function(C){var B=A.ui.ddmanager.current;
if(!B||(B.currentItem||B.element)[0]==this.element[0]){return 
}if(this.options.accept.call(this.element[0],(B.currentItem||B.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("out",C,this.ui(B))
}},_drop:function(E,B){var D=B||A.ui.ddmanager.current;
if(!D||(D.currentItem||D.element)[0]==this.element[0]){return false
}var C=false;
this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var F=A.data(this,"droppable");
if(F.options.greedy&&A.ui.intersect(D,A.extend(F,{offset:F.element.offset()}),F.options.tolerance)){C=true;
return false
}});
if(C){return false
}if(this.options.accept.call(this.element[0],(D.currentItem||D.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("drop",E,this.ui(D));
return this.element
}return false
},ui:function(B){return{draggable:(B.currentItem||B.element),helper:B.helper,position:B.position,absolutePosition:B.positionAbs,offset:B.positionAbs}
}});
A.extend(A.ui.droppable,{version:"1.7.2",eventPrefix:"drop",defaults:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"}});
A.ui.intersect=function(G,E,D){if(!E.offset){return false
}var N=(G.positionAbs||G.position.absolute).left,I=N+G.helperProportions.width,C=(G.positionAbs||G.position.absolute).top,B=C+G.helperProportions.height;
var K=E.offset.left,H=K+E.proportions.width,F=E.offset.top,O=F+E.proportions.height;
switch(D){case"fit":return(K<N&&I<H&&F<C&&B<O);
break;
case"intersect":return(K<N+(G.helperProportions.width/2)&&I-(G.helperProportions.width/2)<H&&F<C+(G.helperProportions.height/2)&&B-(G.helperProportions.height/2)<O);
break;
case"pointer":var L=((G.positionAbs||G.position.absolute).left+(G.clickOffset||G.offset.click).left),M=((G.positionAbs||G.position.absolute).top+(G.clickOffset||G.offset.click).top),J=A.ui.isOver(M,L,F,K,E.proportions.height,E.proportions.width);
return J;
break;
case"touch":return((C>=F&&C<=O)||(B>=F&&B<=O)||(C<F&&B>O))&&((N>=K&&N<=H)||(I>=K&&I<=H)||(N<K&&I>H));
break;
default:return false;
break
}};
A.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(C,E){var F=A.ui.ddmanager.droppables[C.options.scope];
var D=E?E.type:null;
var H=(C.currentItem||C.element).find(":data(droppable)").andSelf();
droppablesLoop:for(var G=0;
G<F.length;
G++){if(F[G].options.disabled||(C&&!F[G].options.accept.call(F[G].element[0],(C.currentItem||C.element)))){continue
}for(var B=0;
B<H.length;
B++){if(H[B]==F[G].element[0]){F[G].proportions.height=0;
continue droppablesLoop
}}F[G].visible=F[G].element.css("display")!="none";
if(!F[G].visible){continue
}F[G].offset=F[G].element.offset();
F[G].proportions={width:F[G].element[0].offsetWidth,height:F[G].element[0].offsetHeight};
if(D=="mousedown"){F[G]._activate.call(F[G],E)
}}},drop:function(D,B){var C=false;
A.each(A.ui.ddmanager.droppables[D.options.scope],function(){if(!this.options){return 
}if(!this.options.disabled&&this.visible&&A.ui.intersect(D,this,this.options.tolerance)){C=this._drop.call(this,B)
}if(!this.options.disabled&&this.visible&&this.options.accept.call(this.element[0],(D.currentItem||D.element))){this.isout=1;
this.isover=0;
this._deactivate.call(this,B)
}});
return C
},drag:function(B,C){if(B.options.refreshPositions){A.ui.ddmanager.prepareOffsets(B,C)
}A.each(A.ui.ddmanager.droppables[B.options.scope],function(){if(this.options.disabled||this.greedyChild||!this.visible){return 
}var E=A.ui.intersect(B,this,this.options.tolerance);
var G=!E&&this.isover==1?"isout":(E&&this.isover==0?"isover":null);
if(!G){return 
}var F;
if(this.options.greedy){var D=this.element.parents(":data(droppable):eq(0)");
if(D.length){F=A.data(D[0],"droppable");
F.greedyChild=(G=="isover"?1:0)
}}if(F&&G=="isover"){F.isover=0;
F.isout=1;
F._out.call(F,C)
}this[G]=1;
this[G=="isout"?"isover":"isout"]=0;
this[G=="isover"?"_over":"_out"].call(this,C);
if(F&&G=="isout"){F.isout=0;
F.isover=1;
F._over.call(F,C)
}})
}}
})(jQuery);
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
(function(A){A.widget("ui.selectable",A.extend({},A.ui.mouse,{_init:function(){var B=this;
this.element.addClass("ui-selectable");
this.dragged=false;
var C;
this.refresh=function(){C=A(B.options.filter,B.element[0]);
C.each(function(){var D=A(this);
var E=D.offset();
A.data(this,"selectable-item",{element:this,$element:D,left:E.left,top:E.top,right:E.left+D.outerWidth(),bottom:E.top+D.outerHeight(),startselected:false,selected:D.hasClass("ui-selected"),selecting:D.hasClass("ui-selecting"),unselecting:D.hasClass("ui-unselecting")})
})
};
this.refresh();
this.selectees=C.addClass("ui-selectee");
this._mouseInit();
this.helper=A(document.createElement("div")).css({border:"1px dotted black"}).addClass("ui-selectable-helper")
},destroy:function(){this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
this._mouseDestroy()
},_mouseStart:function(C){var D=this;
this.opos=[C.pageX,C.pageY];
if(this.options.disabled){return 
}var B=this.options;
this.selectees=A(B.filter,this.element[0]);
this._trigger("start",C);
A(B.appendTo).append(this.helper);
this.helper.css({"z-index":100,position:"absolute",left:C.clientX,top:C.clientY,width:0,height:0});
if(B.autoRefresh){this.refresh()
}this.selectees.filter(".ui-selected").each(function(){var E=A.data(this,"selectable-item");
E.startselected=true;
if(!C.metaKey){E.$element.removeClass("ui-selected");
E.selected=false;
E.$element.addClass("ui-unselecting");
E.unselecting=true;
D._trigger("unselecting",C,{unselecting:E.element})
}});
A(C.target).parents().andSelf().each(function(){var E=A.data(this,"selectable-item");
if(E){E.$element.removeClass("ui-unselecting").addClass("ui-selecting");
E.unselecting=false;
E.selecting=true;
E.selected=true;
D._trigger("selecting",C,{selecting:E.element});
return false
}})
},_mouseDrag:function(G){var D=this;
this.dragged=true;
if(this.options.disabled){return 
}var C=this.options;
var E=this.opos[0],I=this.opos[1],B=G.pageX,H=G.pageY;
if(E>B){var F=B;
B=E;
E=F
}if(I>H){var F=H;
H=I;
I=F
}this.helper.css({left:E,top:I,width:B-E,height:H-I});
this.selectees.each(function(){var J=A.data(this,"selectable-item");
if(!J||J.element==D.element[0]){return 
}var K=false;
if(C.tolerance=="touch"){K=(!(J.left>B||J.right<E||J.top>H||J.bottom<I))
}else{if(C.tolerance=="fit"){K=(J.left>E&&J.right<B&&J.top>I&&J.bottom<H)
}}if(K){if(J.selected){J.$element.removeClass("ui-selected");
J.selected=false
}if(J.unselecting){J.$element.removeClass("ui-unselecting");
J.unselecting=false
}if(!J.selecting){J.$element.addClass("ui-selecting");
J.selecting=true;
D._trigger("selecting",G,{selecting:J.element})
}}else{if(J.selecting){if(G.metaKey&&J.startselected){J.$element.removeClass("ui-selecting");
J.selecting=false;
J.$element.addClass("ui-selected");
J.selected=true
}else{J.$element.removeClass("ui-selecting");
J.selecting=false;
if(J.startselected){J.$element.addClass("ui-unselecting");
J.unselecting=true
}D._trigger("unselecting",G,{unselecting:J.element})
}}if(J.selected){if(!G.metaKey&&!J.startselected){J.$element.removeClass("ui-selected");
J.selected=false;
J.$element.addClass("ui-unselecting");
J.unselecting=true;
D._trigger("unselecting",G,{unselecting:J.element})
}}}});
return false
},_mouseStop:function(C){var D=this;
this.dragged=false;
var B=this.options;
A(".ui-unselecting",this.element[0]).each(function(){var E=A.data(this,"selectable-item");
E.$element.removeClass("ui-unselecting");
E.unselecting=false;
E.startselected=false;
D._trigger("unselected",C,{unselected:E.element})
});
A(".ui-selecting",this.element[0]).each(function(){var E=A.data(this,"selectable-item");
E.$element.removeClass("ui-selecting").addClass("ui-selected");
E.selecting=false;
E.selected=true;
E.startselected=true;
D._trigger("selected",C,{selected:E.element})
});
this._trigger("stop",C);
this.helper.remove();
return false
}}));
A.extend(A.ui.selectable,{version:"1.7.2",defaults:{appendTo:"body",autoRefresh:true,cancel:":input,option",delay:0,distance:0,filter:"*",tolerance:"touch"}})
})(jQuery);
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
(function(A){A.widget("ui.accordion",{_init:function(){var C=this.options,D=this;
this.running=0;
if(C.collapsible==A.ui.accordion.defaults.collapsible&&C.alwaysOpen!=A.ui.accordion.defaults.alwaysOpen){C.collapsible=!C.alwaysOpen
}if(C.navigation){var B=this.element.find("a").filter(C.navigationFilter);
if(B.length){if(B.filter(C.header).length){this.active=B
}else{this.active=B.parent().parent().prev();
B.addClass("ui-accordion-content-active")
}}}this.element.addClass("ui-accordion ui-widget ui-helper-reset");
if(this.element[0].nodeName=="UL"){this.element.children("li").addClass("ui-accordion-li-fix")
}this.headers=this.element.find(C.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){A(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){A(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){A(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){A(this).removeClass("ui-state-focus")
});
this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
this.active=this._findActive(this.active||C.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
this.active.next().addClass("ui-accordion-content-active");
A("<span/>").addClass("ui-icon "+C.icons.header).prependTo(this.headers);
this.active.find(".ui-icon").toggleClass(C.icons.header).toggleClass(C.icons.headerSelected);
if(A.browser.msie){this.element.find("a").css("zoom","1")
}this.resize();
this.element.attr("role","tablist");
this.headers.attr("role","tab").bind("keydown",function(E){return D._keydown(E)
}).next().attr("role","tabpanel");
this.headers.not(this.active||"").attr("aria-expanded","false").attr("tabIndex","-1").next().hide();
if(!this.active.length){this.headers.eq(0).attr("tabIndex","0")
}else{this.active.attr("aria-expanded","true").attr("tabIndex","0")
}if(!A.browser.safari){this.headers.find("a").attr("tabIndex","-1")
}if(C.event){this.headers.bind((C.event)+".accordion",function(E){return D._clickHandler.call(D,E,this)
})
}},destroy:function(){var C=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
this.headers.find("a").removeAttr("tabindex");
this.headers.children(".ui-icon").remove();
var B=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
if(C.autoHeight||C.fillHeight){B.css("height","")
}},_setData:function(B,C){if(B=="alwaysOpen"){B="collapsible";
C=!C
}A.widget.prototype._setData.apply(this,arguments)
},_keydown:function(G){var D=this.options,C=A.ui.keyCode;
if(D.disabled||G.altKey||G.ctrlKey){return 
}var F=this.headers.length;
var B=this.headers.index(G.target);
var E=false;
switch(G.keyCode){case C.RIGHT:case C.DOWN:E=this.headers[(B+1)%F];
break;
case C.LEFT:case C.UP:E=this.headers[(B-1+F)%F];
break;
case C.SPACE:case C.ENTER:return this._clickHandler({target:G.target},G.target)
}if(E){A(G.target).attr("tabIndex","-1");
A(E).attr("tabIndex","0");
E.focus();
return false
}return true
},resize:function(){var C=this.options,B;
if(C.fillSpace){if(A.browser.msie){var D=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}B=this.element.parent().height();
if(A.browser.msie){this.element.parent().css("overflow",D)
}this.headers.each(function(){B-=A(this).outerHeight()
});
var E=0;
this.headers.next().each(function(){E=Math.max(E,A(this).innerHeight()-A(this).height())
}).height(Math.max(0,B-E)).css("overflow","auto")
}else{if(C.autoHeight){B=0;
this.headers.next().each(function(){B=Math.max(B,A(this).outerHeight())
}).height(B)
}}},activate:function(B){var C=this._findActive(B)[0];
this._clickHandler({target:C},C)
},_findActive:function(B){return B?typeof B=="number"?this.headers.filter(":eq("+B+")"):this.headers.not(this.headers.not(B)):B===false?A([]):this.headers.filter(":eq(0)")
},_clickHandler:function(G,B){var I=this.options;
if(I.disabled){return false
}if(!G.target&&I.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(I.icons.headerSelected).addClass(I.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var D=this.active.next(),J={options:I,newHeader:A([]),oldHeader:I.active,newContent:A([]),oldContent:D},H=(this.active=A([]));
this._toggle(H,D,J);
return false
}var C=A(G.currentTarget||B);
var E=C[0]==this.active[0];
if(this.running||(!I.collapsible&&E)){return false
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(I.icons.headerSelected).addClass(I.icons.header);
this.active.next().addClass("ui-accordion-content-active");
if(!E){C.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(I.icons.header).addClass(I.icons.headerSelected);
C.next().addClass("ui-accordion-content-active")
}var H=C.next(),D=this.active.next(),J={options:I,newHeader:E&&I.collapsible?A([]):C,oldHeader:this.active,newContent:E&&I.collapsible?A([]):H.find("> *"),oldContent:D.find("> *")},F=this.headers.index(this.active[0])>this.headers.index(C[0]);
this.active=E?A([]):C;
this._toggle(H,D,J,E,F);
return false
},_toggle:function(J,E,C,F,G){var M=this.options,I=this;
this.toShow=J;
this.toHide=E;
this.data=C;
var K=function(){if(!I){return 
}return I._completed.apply(I,arguments)
};
this._trigger("changestart",null,this.data);
this.running=E.size()===0?J.size():E.size();
if(M.animated){var B={};
if(M.collapsible&&F){B={toShow:A([]),toHide:E,complete:K,down:G,autoHeight:M.autoHeight||M.fillSpace}
}else{B={toShow:J,toHide:E,complete:K,down:G,autoHeight:M.autoHeight||M.fillSpace}
}if(!M.proxied){M.proxied=M.animated
}if(!M.proxiedDuration){M.proxiedDuration=M.duration
}M.animated=A.isFunction(M.proxied)?M.proxied(B):M.proxied;
M.duration=A.isFunction(M.proxiedDuration)?M.proxiedDuration(B):M.proxiedDuration;
var H=A.ui.accordion.animations,L=M.duration,D=M.animated;
if(!H[D]){H[D]=function(N){this.slide(N,{easing:D,duration:L||700})
}
}H[D](B)
}else{if(M.collapsible&&F){J.toggle()
}else{E.hide();
J.show()
}K(true)
}E.prev().attr("aria-expanded","false").attr("tabIndex","-1").blur();
J.prev().attr("aria-expanded","true").attr("tabIndex","0").focus()
},_completed:function(B){var C=this.options;
this.running=B?0:--this.running;
if(this.running){return 
}if(C.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})
}this._trigger("change",null,this.data)
}});
A.extend(A.ui.accordion,{version:"1.7.2",defaults:{active:null,alwaysOpen:true,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()==location.href.toLowerCase()
}},animations:{slide:function(F,D){F=A.extend({easing:"swing",duration:300},F,D);
if(!F.toHide.size()){F.toShow.animate({height:"show"},F);
return 
}if(!F.toShow.size()){F.toHide.animate({height:"hide"},F);
return 
}var H=F.toShow.css("overflow"),C,I={},B={},J=["height","paddingTop","paddingBottom"],G;
var E=F.toShow;
G=E[0].style.width;
E.width(parseInt(E.parent().width(),10)-parseInt(E.css("paddingLeft"),10)-parseInt(E.css("paddingRight"),10)-(parseInt(E.css("borderLeftWidth"),10)||0)-(parseInt(E.css("borderRightWidth"),10)||0));
A.each(J,function(M,L){B[L]="hide";
var K=(""+A.css(F.toShow[0],L)).match(/^([\d+-.]+)(.*)$/);
I[L]={value:K[1],unit:K[2]||"px"}
});
F.toShow.css({height:0,overflow:"hidden"}).show();
F.toHide.filter(":hidden").each(F.complete).end().filter(":visible").animate(B,{step:function(K,L){if(L.prop=="height"){C=(L.now-L.start)/(L.end-L.start)
}F.toShow[0].style[L.prop]=(C*I[L.prop].value)+I[L.prop].unit
},duration:F.duration,easing:F.easing,complete:function(){if(!F.autoHeight){F.toShow.css("height","")
}F.toShow.css("width",G);
F.toShow.css({overflow:H});
F.complete()
}})
},bounceslide:function(B){this.slide(B,{easing:B.down?"easeOutBounce":"swing",duration:B.down?1000:200})
},easeslide:function(B){this.slide(B,{easing:"easeinout",duration:700})
}}})
})(jQuery);
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
(function(A){A.widget("ui.slider",A.extend({},A.ui.mouse,{_init:function(){var B=this,C=this.options;
this._keySliding=false;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");
this.range=A([]);
if(C.range){if(C.range===true){this.range=A("<div></div>");
if(!C.values){C.values=[this._valueMin(),this._valueMin()]
}if(C.values.length&&C.values.length!=2){C.values=[C.values[0],C.values[0]]
}}else{this.range=A("<div></div>")
}this.range.appendTo(this.element).addClass("ui-slider-range");
if(C.range=="min"||C.range=="max"){this.range.addClass("ui-slider-range-"+C.range)
}this.range.addClass("ui-widget-header")
}if(A(".ui-slider-handle",this.element).length==0){A('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
}if(C.values&&C.values.length){while(A(".ui-slider-handle",this.element).length<C.values.length){A('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
}}this.handles=A(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");
this.handle=this.handles.eq(0);
this.handles.add(this.range).filter("a").click(function(D){D.preventDefault()
}).hover(function(){if(!C.disabled){A(this).addClass("ui-state-hover")
}},function(){A(this).removeClass("ui-state-hover")
}).focus(function(){if(!C.disabled){A(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
A(this).addClass("ui-state-focus")
}else{A(this).blur()
}}).blur(function(){A(this).removeClass("ui-state-focus")
});
this.handles.each(function(D){A(this).data("index.ui-slider-handle",D)
});
this.handles.keydown(function(F){var H=true;
var G=A(this).data("index.ui-slider-handle");
if(B.options.disabled){return 
}switch(F.keyCode){case A.ui.keyCode.HOME:case A.ui.keyCode.END:case A.ui.keyCode.UP:case A.ui.keyCode.RIGHT:case A.ui.keyCode.DOWN:case A.ui.keyCode.LEFT:H=false;
if(!B._keySliding){B._keySliding=true;
A(this).addClass("ui-state-active");
B._start(F,G)
}break
}var I,E,D=B._step();
if(B.options.values&&B.options.values.length){I=E=B.values(G)
}else{I=E=B.value()
}switch(F.keyCode){case A.ui.keyCode.HOME:E=B._valueMin();
break;
case A.ui.keyCode.END:E=B._valueMax();
break;
case A.ui.keyCode.UP:case A.ui.keyCode.RIGHT:if(I==B._valueMax()){return 
}E=I+D;
break;
case A.ui.keyCode.DOWN:case A.ui.keyCode.LEFT:if(I==B._valueMin()){return 
}E=I-D;
break
}B._slide(F,G,E);
return H
}).keyup(function(E){var D=A(this).data("index.ui-slider-handle");
if(B._keySliding){B._stop(E,D);
B._change(E,D);
B._keySliding=false;
A(this).removeClass("ui-state-active")
}});
this._refreshValue()
},destroy:function(){this.handles.remove();
this.range.remove();
this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy()
},_mouseCapture:function(J){var K=this.options;
if(K.disabled){return false
}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();
var D={x:J.pageX,y:J.pageY};
var F=this._normValueFromMouse(D);
var I=this._valueMax()-this._valueMin()+1,B;
var G=this,E;
this.handles.each(function(L){var M=Math.abs(F-G.values(L));
if(I>M){I=M;
B=A(this);
E=L
}});
if(K.range==true&&this.values(1)==K.min){B=A(this.handles[++E])
}this._start(J,E);
G._handleIndex=E;
B.addClass("ui-state-active").focus();
var C=B.offset();
var H=!A(J.target).parents().andSelf().is(".ui-slider-handle");
this._clickOffset=H?{left:0,top:0}:{left:J.pageX-C.left-(B.width()/2),top:J.pageY-C.top-(B.height()/2)-(parseInt(B.css("borderTopWidth"),10)||0)-(parseInt(B.css("borderBottomWidth"),10)||0)+(parseInt(B.css("marginTop"),10)||0)};
F=this._normValueFromMouse(D);
this._slide(J,E,F);
return true
},_mouseStart:function(B){return true
},_mouseDrag:function(C){var D={x:C.pageX,y:C.pageY};
var B=this._normValueFromMouse(D);
this._slide(C,this._handleIndex,B);
return false
},_mouseStop:function(B){this.handles.removeClass("ui-state-active");
this._stop(B,this._handleIndex);
this._change(B,this._handleIndex);
this._handleIndex=null;
this._clickOffset=null;
return false
},_detectOrientation:function(){this.orientation=this.options.orientation=="vertical"?"vertical":"horizontal"
},_normValueFromMouse:function(E){var D,I;
if("horizontal"==this.orientation){D=this.elementSize.width;
I=E.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)
}else{D=this.elementSize.height;
I=E.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)
}var G=(I/D);
if(G>1){G=1
}if(G<0){G=0
}if("vertical"==this.orientation){G=1-G
}var C=this._valueMax()-this._valueMin(),F=G*C,B=F%this.options.step,H=this._valueMin()+F-B;
if(B>(this.options.step/2)){H+=this.options.step
}return parseFloat(H.toFixed(5))
},_start:function(C,B){var D={handle:this.handles[B],value:this.value()};
if(this.options.values&&this.options.values.length){D.value=this.values(B);
D.values=this.values()
}this._trigger("start",C,D)
},_slide:function(D,C,H){var E=this.handles[C];
if(this.options.values&&this.options.values.length){var F=this.values(C?0:1);
if((this.options.values.length==2&&this.options.range===true)&&((C==0&&H>F)||(C==1&&H<F))){H=F
}if(H!=this.values(C)){var B=this.values();
B[C]=H;
var G=this._trigger("slide",D,{handle:this.handles[C],value:H,values:B});
var F=this.values(C?0:1);
if(G!==false){this.values(C,H,(D.type=="mousedown"&&this.options.animate),true)
}}}else{if(H!=this.value()){var G=this._trigger("slide",D,{handle:this.handles[C],value:H});
if(G!==false){this._setData("value",H,(D.type=="mousedown"&&this.options.animate))
}}}},_stop:function(C,B){var D={handle:this.handles[B],value:this.value()};
if(this.options.values&&this.options.values.length){D.value=this.values(B);
D.values=this.values()
}this._trigger("stop",C,D)
},_change:function(C,B){var D={handle:this.handles[B],value:this.value()};
if(this.options.values&&this.options.values.length){D.value=this.values(B);
D.values=this.values()
}this._trigger("change",C,D)
},value:function(B){if(arguments.length){this._setData("value",B);
this._change(null,0)
}return this._value()
},values:function(D,C,E,B){if(arguments.length>1){this.options.values[D]=C;
this._refreshValue(E);
if(!B){this._change(null,D)
}}if(arguments.length){if(this.options.values&&this.options.values.length){return this._values(D)
}else{return this.value()
}}else{return this._values()
}},_setData:function(D,C,B){A.widget.prototype._setData.apply(this,arguments);
switch(D){case"disabled":if(C){this.handles.filter(".ui-state-focus").blur();
this.handles.removeClass("ui-state-hover");
this.handles.attr("disabled","disabled")
}else{this.handles.removeAttr("disabled")
}case"orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);
this._refreshValue(B);
break;
case"value":this._refreshValue(B);
break
}},_step:function(){var B=this.options.step;
return B
},_value:function(){var B=this.options.value;
if(B<this._valueMin()){B=this._valueMin()
}if(B>this._valueMax()){B=this._valueMax()
}return B
},_values:function(B){if(arguments.length){var C=this.options.values[B];
if(C<this._valueMin()){C=this._valueMin()
}if(C>this._valueMax()){C=this._valueMax()
}return C
}else{return this.options.values
}},_valueMin:function(){var B=this.options.min;
return B
},_valueMax:function(){var B=this.options.max;
return B
},_refreshValue:function(J){var B=this.options.range,K=this.options,H=this;
if(this.options.values&&this.options.values.length){var E,D;
this.handles.each(function(P,N){var O=(H.values(P)-H._valueMin())/(H._valueMax()-H._valueMin())*100;
var M={};
M[H.orientation=="horizontal"?"left":"bottom"]=O+"%";
A(this).stop(1,1)[J?"animate":"css"](M,K.animate);
if(H.options.range===true){if(H.orientation=="horizontal"){(P==0)&&H.range.stop(1,1)[J?"animate":"css"]({left:O+"%"},K.animate);
(P==1)&&H.range[J?"animate":"css"]({width:(O-lastValPercent)+"%"},{queue:false,duration:K.animate})
}else{(P==0)&&H.range.stop(1,1)[J?"animate":"css"]({bottom:(O)+"%"},K.animate);
(P==1)&&H.range[J?"animate":"css"]({height:(O-lastValPercent)+"%"},{queue:false,duration:K.animate})
}}lastValPercent=O
})
}else{var F=this.value(),C=this._valueMin(),G=this._valueMax(),L=G!=C?(F-C)/(G-C)*100:0;
var I={};
I[H.orientation=="horizontal"?"left":"bottom"]=L+"%";
this.handle.stop(1,1)[J?"animate":"css"](I,K.animate);
(B=="min")&&(this.orientation=="horizontal")&&this.range.stop(1,1)[J?"animate":"css"]({width:L+"%"},K.animate);
(B=="max")&&(this.orientation=="horizontal")&&this.range[J?"animate":"css"]({width:(100-L)+"%"},{queue:false,duration:K.animate});
(B=="min")&&(this.orientation=="vertical")&&this.range.stop(1,1)[J?"animate":"css"]({height:L+"%"},K.animate);
(B=="max")&&(this.orientation=="vertical")&&this.range[J?"animate":"css"]({height:(100-L)+"%"},{queue:false,duration:K.animate})
}}}));
A.extend(A.ui.slider,{getter:"value values",version:"1.7.2",eventPrefix:"slide",defaults:{animate:false,delay:0,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null}})
})(jQuery);
(function(A){A.widget("ui.tabs",{_init:function(){if(this.options.deselectable!==undefined){this.options.collapsible=this.options.deselectable
}this._tabify(true)
},_setData:function(B,C){if(B=="selected"){if(this.options.collapsible&&C==this.options.selected){return 
}this.select(C)
}else{this.options[B]=C;
if(B=="deselectable"){this.options.collapsible=C
}this._tabify()
}},_tabId:function(B){return B.title&&B.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+A.data(B)
},_sanitizeSelector:function(B){return B.replace(/:/g,"\\:")
},_cookie:function(){var B=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+A.data(this.list[0]));
return A.cookie.apply(null,[B].concat(A.makeArray(arguments)))
},_ui:function(C,B){return{tab:C,panel:B,index:this.anchors.index(C)}
},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var B=A(this);
B.html(B.data("label.tabs")).removeData("label.tabs")
})
},_tabify:function(I){this.list=this.element.children("ul:first");
this.lis=A("li:has(a[href])",this.list);
this.anchors=this.lis.map(function(){return A("a",this)[0]
});
this.panels=A([]);
var J=this,B=this.options;
var L=/^#.+/;
this.anchors.each(function(Q,O){var P=A(O).attr("href");
var R=P.split("#")[0],S;
if(R&&(R===location.toString().split("#")[0]||(S=A("base")[0])&&R===S.href)){P=O.hash;
O.href=P
}if(L.test(P)){J.panels=J.panels.add(J._sanitizeSelector(P))
}else{if(P!="#"){A.data(O,"href.tabs",P);
A.data(O,"load.tabs",P.replace(/#.*$/,""));
var U=J._tabId(O);
O.href="#"+U;
var T=A("#"+U);
if(!T.length){T=A(B.panelTemplate).attr("id",U).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(J.panels[Q-1]||J.list);
T.data("destroy.tabs",true)
}J.panels=J.panels.add(T)
}else{B.disabled.push(Q)
}}});
if(I){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.lis.addClass("ui-state-default ui-corner-top");
this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
if(B.selected===undefined){if(location.hash){this.anchors.each(function(P,O){if(O.hash==location.hash){B.selected=P;
return false
}})
}if(typeof B.selected!="number"&&B.cookie){B.selected=parseInt(J._cookie(),10)
}if(typeof B.selected!="number"&&this.lis.filter(".ui-tabs-selected").length){B.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}B.selected=B.selected||0
}else{if(B.selected===null){B.selected=-1
}}B.selected=((B.selected>=0&&this.anchors[B.selected])||B.selected<0)?B.selected:0;
B.disabled=A.unique(B.disabled.concat(A.map(this.lis.filter(".ui-state-disabled"),function(P,O){return J.lis.index(P)
}))).sort();
if(A.inArray(B.selected,B.disabled)!=-1){B.disabled.splice(A.inArray(B.selected,B.disabled),1)
}this.panels.addClass("ui-tabs-hide");
this.lis.removeClass("ui-tabs-selected ui-state-active");
if(B.selected>=0&&this.anchors.length){this.panels.eq(B.selected).removeClass("ui-tabs-hide");
this.lis.eq(B.selected).addClass("ui-tabs-selected ui-state-active");
J.element.queue("tabs",function(){J._trigger("show",null,J._ui(J.anchors[B.selected],J.panels[B.selected]))
});
this.load(B.selected)
}A(window).bind("unload",function(){J.lis.add(J.anchors).unbind(".tabs");
J.lis=J.anchors=J.panels=null
})
}else{B.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}this.element[B.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");
if(B.cookie){this._cookie(B.selected,B.cookie)
}for(var E=0,H;
(H=this.lis[E]);
E++){A(H)[A.inArray(E,B.disabled)!=-1&&!A(H).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}if(B.cache===false){this.anchors.removeData("cache.tabs")
}this.lis.add(this.anchors).unbind(".tabs");
if(B.event!="mouseover"){var N=function(P,O){if(O.is(":not(.ui-state-disabled)")){O.addClass("ui-state-"+P)
}};
var D=function(P,O){O.removeClass("ui-state-"+P)
};
this.lis.bind("mouseover.tabs",function(){N("hover",A(this))
});
this.lis.bind("mouseout.tabs",function(){D("hover",A(this))
});
this.anchors.bind("focus.tabs",function(){N("focus",A(this).closest("li"))
});
this.anchors.bind("blur.tabs",function(){D("focus",A(this).closest("li"))
})
}var K,C;
if(B.fx){if(A.isArray(B.fx)){K=B.fx[0];
C=B.fx[1]
}else{K=C=B.fx
}}function M(O,P){O.css({display:""});
if(A.browser.msie&&P.opacity){O[0].style.removeAttribute("filter")
}}var F=C?function(O,P){A(O).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");
P.hide().removeClass("ui-tabs-hide").animate(C,C.duration||"normal",function(){M(P,C);
J._trigger("show",null,J._ui(O,P[0]))
})
}:function(O,P){A(O).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");
P.removeClass("ui-tabs-hide");
J._trigger("show",null,J._ui(O,P[0]))
};
var G=K?function(P,O){O.animate(K,K.duration||"normal",function(){J.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");
O.addClass("ui-tabs-hide");
M(O,K);
J.element.dequeue("tabs")
})
}:function(P,O,Q){J.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");
O.addClass("ui-tabs-hide");
J.element.dequeue("tabs")
};
this.anchors.bind(B.event+".tabs",function(){var P=this,R=A(this).closest("li"),O=J.panels.filter(":not(.ui-tabs-hide)"),Q=A(J._sanitizeSelector(this.hash));
if((R.hasClass("ui-tabs-selected")&&!B.collapsible)||R.hasClass("ui-state-disabled")||R.hasClass("ui-state-processing")||J._trigger("select",null,J._ui(this,Q[0]))===false){this.blur();
return false
}B.selected=J.anchors.index(this);
J.abort();
if(B.collapsible){if(R.hasClass("ui-tabs-selected")){B.selected=-1;
if(B.cookie){J._cookie(B.selected,B.cookie)
}J.element.queue("tabs",function(){G(P,O)
}).dequeue("tabs");
this.blur();
return false
}else{if(!O.length){if(B.cookie){J._cookie(B.selected,B.cookie)
}J.element.queue("tabs",function(){F(P,Q)
});
J.load(J.anchors.index(this));
this.blur();
return false
}}}if(B.cookie){J._cookie(B.selected,B.cookie)
}if(Q.length){if(O.length){J.element.queue("tabs",function(){G(P,O)
})
}J.element.queue("tabs",function(){F(P,Q)
});
J.load(J.anchors.index(this))
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}if(A.browser.msie){this.blur()
}});
this.anchors.bind("click.tabs",function(){return false
})
},destroy:function(){var B=this.options;
this.abort();
this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.anchors.each(function(){var C=A.data(this,"href.tabs");
if(C){this.href=C
}var D=A(this).unbind(".tabs");
A.each(["href","load","cache"],function(E,F){D.removeData(F+".tabs")
})
});
this.lis.unbind(".tabs").add(this.panels).each(function(){if(A.data(this,"destroy.tabs")){A(this).remove()
}else{A(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))
}});
if(B.cookie){this._cookie(null,B.cookie)
}},add:function(C,E,D){if(D===undefined){D=this.anchors.length
}var B=this,H=this.options,G=A(H.tabTemplate.replace(/#\{href\}/g,C).replace(/#\{label\}/g,E)),I=!C.indexOf("#")?C.replace("#",""):this._tabId(A("a",G)[0]);
G.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);
var F=A("#"+I);
if(!F.length){F=A(H.panelTemplate).attr("id",I).data("destroy.tabs",true)
}F.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
if(D>=this.lis.length){G.appendTo(this.list);
F.appendTo(this.list[0].parentNode)
}else{G.insertBefore(this.lis[D]);
F.insertBefore(this.panels[D])
}H.disabled=A.map(H.disabled,function(K,J){return K>=D?++K:K
});
this._tabify();
if(this.anchors.length==1){G.addClass("ui-tabs-selected ui-state-active");
F.removeClass("ui-tabs-hide");
this.element.queue("tabs",function(){B._trigger("show",null,B._ui(B.anchors[0],B.panels[0]))
});
this.load(0)
}this._trigger("add",null,this._ui(this.anchors[D],this.panels[D]))
},remove:function(D){var B=this.options,C=this.lis.eq(D).remove(),E=this.panels.eq(D).remove();
if(C.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(D+(D+1<this.anchors.length?1:-1))
}B.disabled=A.map(A.grep(B.disabled,function(G,F){return G!=D
}),function(G,F){return G>=D?--G:G
});
this._tabify();
this._trigger("remove",null,this._ui(C.find("a")[0],E[0]))
},enable:function(B){var C=this.options;
if(A.inArray(B,C.disabled)==-1){return 
}this.lis.eq(B).removeClass("ui-state-disabled");
C.disabled=A.grep(C.disabled,function(E,D){return E!=B
});
this._trigger("enable",null,this._ui(this.anchors[B],this.panels[B]))
},disable:function(B){var D=this,C=this.options;
if(B!=C.selected){this.lis.eq(B).addClass("ui-state-disabled");
C.disabled.push(B);
C.disabled.sort();
this._trigger("disable",null,this._ui(this.anchors[B],this.panels[B]))
}},select:function(B){if(typeof B=="string"){B=this.anchors.index(this.anchors.filter("[href$="+B+"]"))
}else{if(B===null){B=-1
}}if(B==-1&&this.options.collapsible){B=this.options.selected
}this.anchors.eq(B).trigger(this.options.event+".tabs")
},load:function(G){var E=this,D=this.options,C=this.anchors.eq(G)[0],F=A.data(C,"load.tabs");
this.abort();
if(!F||this.element.queue("tabs").length!==0&&A.data(C,"cache.tabs")){this.element.dequeue("tabs");
return 
}this.lis.eq(G).addClass("ui-state-processing");
if(D.spinner){var B=A("span",C);
B.data("label.tabs",B.html()).html(D.spinner)
}this.xhr=A.ajax(A.extend({},D.ajaxOptions,{url:F,success:function(I,H){A(E._sanitizeSelector(C.hash)).html(I);
E._cleanup();
if(D.cache){A.data(C,"cache.tabs",true)
}E._trigger("load",null,E._ui(E.anchors[G],E.panels[G]));
try{D.ajaxOptions.success(I,H)
}catch(J){}E.element.dequeue("tabs")
}}))
},abort:function(){this.element.queue([]);
this.panels.stop(false,true);
if(this.xhr){this.xhr.abort();
delete this.xhr
}this._cleanup()
},url:function(C,B){this.anchors.eq(C).removeData("cache.tabs").data("load.tabs",B)
},length:function(){return this.anchors.length
}});
A.extend(A.ui.tabs,{version:"1.7.2",getter:"length",defaults:{ajaxOptions:null,cache:false,cookie:null,collapsible:false,disabled:[],event:"click",fx:null,idPrefix:"ui-tabs-",panelTemplate:"<div></div>",spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'}});
A.extend(A.ui.tabs.prototype,{rotation:null,rotate:function(F,C){var D=this,B=this.options;
var E=D._rotate||(D._rotate=function(H){clearTimeout(D.rotation);
D.rotation=setTimeout(function(){var I=B.selected;
D.select(++I<D.anchors.length?I:0)
},F);
if(H){H.stopPropagation()
}});
var G=D._unrotate||(D._unrotate=!C?function(H){if(H.clientX){D.rotate(null)
}}:function(H){t=B.selected;
E()
});
if(F){this.element.bind("tabsshow",E);
this.anchors.bind(B.event+".tabs",G);
E()
}else{clearTimeout(D.rotation);
this.element.unbind("tabsshow",E);
this.anchors.unbind(B.event+".tabs",G);
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
(function(A){A.widget("ui.progressbar",{_init:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this._valueMin(),"aria-valuemax":this._valueMax(),"aria-valuenow":this._value()});
this.valueDiv=A('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);
this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow").removeData("progressbar").unbind(".progressbar");
this.valueDiv.remove();
A.widget.prototype.destroy.apply(this,arguments)
},value:function(B){if(B===undefined){return this._value()
}this._setData("value",B);
return this
},_setData:function(B,C){switch(B){case"value":this.options.value=C;
this._refreshValue();
this._trigger("change",null,{});
break
}A.widget.prototype._setData.apply(this,arguments)
},_value:function(){var B=this.options.value;
if(B<this._valueMin()){B=this._valueMin()
}if(B>this._valueMax()){B=this._valueMax()
}return B
},_valueMin:function(){var B=0;
return B
},_valueMax:function(){var B=100;
return B
},_refreshValue:function(){var B=this.value();
this.valueDiv[B==this._valueMax()?"addClass":"removeClass"]("ui-corner-right");
this.valueDiv.width(B+"%");
this.element.attr("aria-valuenow",B)
}});
A.extend(A.ui.progressbar,{version:"1.7.2",defaults:{value:0}})
})(jQuery);
jQuery.effects||(function(B){B.effects={version:"1.7.2",save:function(F,G){for(var H=0;
H<G.length;
H++){if(G[H]!==null){F.data("ec.storage."+G[H],F[0].style[G[H]])
}}},restore:function(F,G){for(var H=0;
H<G.length;
H++){if(G[H]!==null){F.css(G[H],F.data("ec.storage."+G[H]))
}}},setMode:function(F,G){if(G=="toggle"){G=F.is(":hidden")?"show":"hide"
}return G
},getBaseline:function(I,F){var G,H;
switch(I[0]){case"top":G=0;
break;
case"middle":G=0.5;
break;
case"bottom":G=1;
break;
default:G=I[0]/F.height
}switch(I[1]){case"left":H=0;
break;
case"center":H=0.5;
break;
case"right":H=1;
break;
default:H=I[1]/F.width
}return{x:H,y:G}
},createWrapper:function(H){if(H.parent().is(".ui-effects-wrapper")){return H.parent()
}var I={width:H.outerWidth(true),height:H.outerHeight(true),"float":H.css("float")};
H.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');
var G=H.parent();
if(H.css("position")=="static"){G.css({position:"relative"});
H.css({position:"relative"})
}else{var F=H.css("top");
if(isNaN(parseInt(F,10))){F="auto"
}var J=H.css("left");
if(isNaN(parseInt(J,10))){J="auto"
}G.css({position:H.css("position"),top:F,left:J,zIndex:H.css("z-index")}).show();
H.css({position:"relative",top:0,left:0})
}G.css(I);
return G
},removeWrapper:function(F){if(F.parent().is(".ui-effects-wrapper")){return F.parent().replaceWith(F)
}return F
},setTransition:function(I,G,H,F){F=F||{};
B.each(G,function(K,J){unit=I.cssUnit(J);
if(unit[0]>0){F[J]=unit[0]*H+unit[1]
}});
return F
},animateClass:function(J,K,H,G){var F=(typeof H=="function"?H:(G?G:null));
var I=(typeof H=="string"?H:null);
return this.each(function(){var P={};
var N=B(this);
var O=N.attr("style")||"";
if(typeof O=="object"){O=O.cssText
}if(J.toggle){N.hasClass(J.toggle)?J.remove=J.toggle:J.add=J.toggle
}var M=B.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));
if(J.add){N.addClass(J.add)
}if(J.remove){N.removeClass(J.remove)
}var L=B.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));
if(J.add){N.removeClass(J.add)
}if(J.remove){N.addClass(J.remove)
}for(var Q in L){if(typeof L[Q]!="function"&&L[Q]&&Q.indexOf("Moz")==-1&&Q.indexOf("length")==-1&&L[Q]!=M[Q]&&(Q.match(/color/i)||(!Q.match(/color/i)&&!isNaN(parseInt(L[Q],10))))&&(M.position!="static"||(M.position=="static"&&!Q.match(/left|top|bottom|right/)))){P[Q]=L[Q]
}}N.animate(P,K,I,function(){if(typeof B(this).attr("style")=="object"){B(this).attr("style")["cssText"]="";
B(this).attr("style")["cssText"]=O
}else{B(this).attr("style",O)
}if(J.add){B(this).addClass(J.add)
}if(J.remove){B(this).removeClass(J.remove)
}if(F){F.apply(this,arguments)
}})
})
}};
function A(I,H){var F=I[1]&&I[1].constructor==Object?I[1]:{};
if(H){F.mode=H
}var J=I[1]&&I[1].constructor!=Object?I[1]:(F.duration?F.duration:I[2]);
J=B.fx.off?0:typeof J==="number"?J:B.fx.speeds[J]||B.fx.speeds._default;
var G=F.callback||(B.isFunction(I[1])&&I[1])||(B.isFunction(I[2])&&I[2])||(B.isFunction(I[3])&&I[3]);
return[I[0],F,J,G]
}B.fn.extend({_show:B.fn.show,_hide:B.fn.hide,__toggle:B.fn.toggle,_addClass:B.fn.addClass,_removeClass:B.fn.removeClass,_toggleClass:B.fn.toggleClass,effect:function(I,H,F,G){return B.effects[I]?B.effects[I].call(this,{method:I,options:H||{},duration:F,callback:G}):null
},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._show.apply(this,arguments)
}else{return this.effect.apply(this,A(arguments,"show"))
}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._hide.apply(this,arguments)
}else{return this.effect.apply(this,A(arguments,"hide"))
}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))||(B.isFunction(arguments[0])||typeof arguments[0]=="boolean")){return this.__toggle.apply(this,arguments)
}else{return this.effect.apply(this,A(arguments,"toggle"))
}},addClass:function(I,H,G,F){return H?B.effects.animateClass.apply(this,[{add:I},H,G,F]):this._addClass(I)
},removeClass:function(I,H,G,F){return H?B.effects.animateClass.apply(this,[{remove:I},H,G,F]):this._removeClass(I)
},toggleClass:function(I,H,G,F){return((typeof H!=="boolean")&&H)?B.effects.animateClass.apply(this,[{toggle:I},H,G,F]):this._toggleClass(I,H)
},morph:function(H,J,I,G,F){return B.effects.animateClass.apply(this,[{add:J,remove:H},I,G,F])
},switchClass:function(){return this.morph.apply(this,arguments)
},cssUnit:function(H){var F=this.css(H),G=[];
B.each(["em","px","%","pt"],function(I,J){if(F.indexOf(J)>0){G=[parseFloat(F),J]
}});
return G
}});
B.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(G,F){B.fx.step[F]=function(H){if(H.state==0){H.start=C(H.elem,F);
H.end=E(H.end)
}H.elem.style[F]="rgb("+[Math.max(Math.min(parseInt((H.pos*(H.end[0]-H.start[0]))+H.start[0],10),255),0),Math.max(Math.min(parseInt((H.pos*(H.end[1]-H.start[1]))+H.start[1],10),255),0),Math.max(Math.min(parseInt((H.pos*(H.end[2]-H.start[2]))+H.start[2],10),255),0)].join(",")+")"
}
});
function E(G){var F;
if(G&&G.constructor==Array&&G.length==3){return G
}if(F=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(G)){return[parseInt(F[1],10),parseInt(F[2],10),parseInt(F[3],10)]
}if(F=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(G)){return[parseFloat(F[1])*2.55,parseFloat(F[2])*2.55,parseFloat(F[3])*2.55]
}if(F=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(G)){return[parseInt(F[1],16),parseInt(F[2],16),parseInt(F[3],16)]
}if(F=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(G)){return[parseInt(F[1]+F[1],16),parseInt(F[2]+F[2],16),parseInt(F[3]+F[3],16)]
}if(F=/rgba\(0, 0, 0, 0\)/.exec(G)){return D.transparent
}return D[B.trim(G).toLowerCase()]
}function C(G,H){var F;
do{F=B.curCSS(G,H);
if(F!=""&&F!="transparent"||B.nodeName(G,"body")){break
}H="backgroundColor"
}while(G=G.parentNode);
return E(F)
}var D={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
B.easing.jswing=B.easing.swing;
B.extend(B.easing,{def:"easeOutQuad",swing:function(I,J,H,G,F){return B.easing[B.easing.def](I,J,H,G,F)
},easeInQuad:function(I,J,H,G,F){return G*(J/=F)*J+H
},easeOutQuad:function(I,J,H,G,F){return -G*(J/=F)*(J-2)+H
},easeInOutQuad:function(I,J,H,G,F){if((J/=F/2)<1){return G/2*J*J+H
}return -G/2*((--J)*(J-2)-1)+H
},easeInCubic:function(I,J,H,G,F){return G*(J/=F)*J*J+H
},easeOutCubic:function(I,J,H,G,F){return G*((J=J/F-1)*J*J+1)+H
},easeInOutCubic:function(I,J,H,G,F){if((J/=F/2)<1){return G/2*J*J*J+H
}return G/2*((J-=2)*J*J+2)+H
},easeInQuart:function(I,J,H,G,F){return G*(J/=F)*J*J*J+H
},easeOutQuart:function(I,J,H,G,F){return -G*((J=J/F-1)*J*J*J-1)+H
},easeInOutQuart:function(I,J,H,G,F){if((J/=F/2)<1){return G/2*J*J*J*J+H
}return -G/2*((J-=2)*J*J*J-2)+H
},easeInQuint:function(I,J,H,G,F){return G*(J/=F)*J*J*J*J+H
},easeOutQuint:function(I,J,H,G,F){return G*((J=J/F-1)*J*J*J*J+1)+H
},easeInOutQuint:function(I,J,H,G,F){if((J/=F/2)<1){return G/2*J*J*J*J*J+H
}return G/2*((J-=2)*J*J*J*J+2)+H
},easeInSine:function(I,J,H,G,F){return -G*Math.cos(J/F*(Math.PI/2))+G+H
},easeOutSine:function(I,J,H,G,F){return G*Math.sin(J/F*(Math.PI/2))+H
},easeInOutSine:function(I,J,H,G,F){return -G/2*(Math.cos(Math.PI*J/F)-1)+H
},easeInExpo:function(I,J,H,G,F){return(J==0)?H:G*Math.pow(2,10*(J/F-1))+H
},easeOutExpo:function(I,J,H,G,F){return(J==F)?H+G:G*(-Math.pow(2,-10*J/F)+1)+H
},easeInOutExpo:function(I,J,H,G,F){if(J==0){return H
}if(J==F){return H+G
}if((J/=F/2)<1){return G/2*Math.pow(2,10*(J-1))+H
}return G/2*(-Math.pow(2,-10*--J)+2)+H
},easeInCirc:function(I,J,H,G,F){return -G*(Math.sqrt(1-(J/=F)*J)-1)+H
},easeOutCirc:function(I,J,H,G,F){return G*Math.sqrt(1-(J=J/F-1)*J)+H
},easeInOutCirc:function(I,J,H,G,F){if((J/=F/2)<1){return -G/2*(Math.sqrt(1-J*J)-1)+H
}return G/2*(Math.sqrt(1-(J-=2)*J)+1)+H
},easeInElastic:function(F,L,J,H,I){var M=1.70158;
var G=0;
var K=H;
if(L==0){return J
}if((L/=I)==1){return J+H
}if(!G){G=I*0.3
}if(K<Math.abs(H)){K=H;
var M=G/4
}else{var M=G/(2*Math.PI)*Math.asin(H/K)
}return -(K*Math.pow(2,10*(L-=1))*Math.sin((L*I-M)*(2*Math.PI)/G))+J
},easeOutElastic:function(F,L,J,H,I){var M=1.70158;
var G=0;
var K=H;
if(L==0){return J
}if((L/=I)==1){return J+H
}if(!G){G=I*0.3
}if(K<Math.abs(H)){K=H;
var M=G/4
}else{var M=G/(2*Math.PI)*Math.asin(H/K)
}return K*Math.pow(2,-10*L)*Math.sin((L*I-M)*(2*Math.PI)/G)+H+J
},easeInOutElastic:function(F,L,J,H,I){var M=1.70158;
var G=0;
var K=H;
if(L==0){return J
}if((L/=I/2)==2){return J+H
}if(!G){G=I*(0.3*1.5)
}if(K<Math.abs(H)){K=H;
var M=G/4
}else{var M=G/(2*Math.PI)*Math.asin(H/K)
}if(L<1){return -0.5*(K*Math.pow(2,10*(L-=1))*Math.sin((L*I-M)*(2*Math.PI)/G))+J
}return K*Math.pow(2,-10*(L-=1))*Math.sin((L*I-M)*(2*Math.PI)/G)*0.5+H+J
},easeInBack:function(I,J,H,G,F,K){if(K==undefined){K=1.70158
}return G*(J/=F)*J*((K+1)*J-K)+H
},easeOutBack:function(I,J,H,G,F,K){if(K==undefined){K=1.70158
}return G*((J=J/F-1)*J*((K+1)*J+K)+1)+H
},easeInOutBack:function(I,J,H,G,F,K){if(K==undefined){K=1.70158
}if((J/=F/2)<1){return G/2*(J*J*(((K*=(1.525))+1)*J-K))+H
}return G/2*((J-=2)*J*(((K*=(1.525))+1)*J+K)+2)+H
},easeInBounce:function(I,J,H,G,F){return G-B.easing.easeOutBounce(I,F-J,0,G,F)+H
},easeOutBounce:function(I,J,H,G,F){if((J/=F)<(1/2.75)){return G*(7.5625*J*J)+H
}else{if(J<(2/2.75)){return G*(7.5625*(J-=(1.5/2.75))*J+0.75)+H
}else{if(J<(2.5/2.75)){return G*(7.5625*(J-=(2.25/2.75))*J+0.9375)+H
}else{return G*(7.5625*(J-=(2.625/2.75))*J+0.984375)+H
}}}},easeInOutBounce:function(I,J,H,G,F){if(J<F/2){return B.easing.easeInBounce(I,J*2,0,G,F)*0.5+H
}return B.easing.easeOutBounce(I,J*2-F,0,G,F)*0.5+G*0.5+H
}})
})(jQuery);
(function(A){A.effects.blind=function(B){return this.queue(function(){var H=A(this),G=["position","top","left"];
var D=A.effects.setMode(H,B.options.mode||"hide");
var C=B.options.direction||"vertical";
A.effects.save(H,G);
H.show();
var F=A.effects.createWrapper(H).css({overflow:"hidden"});
var I=(C=="vertical")?"height":"width";
var E=(C=="vertical")?F.height():F.width();
if(D=="show"){F.css(I,0)
}var J={};
J[I]=D=="show"?E:0;
F.animate(J,B.duration,B.options.easing,function(){if(D=="hide"){H.hide()
}A.effects.restore(H,G);
A.effects.removeWrapper(H);
if(B.callback){B.callback.apply(H[0],arguments)
}H.dequeue()
})
})
}
})(jQuery);
(function(A){A.effects.bounce=function(B){return this.queue(function(){var J=A(this),C=["position","top","left"];
var O=A.effects.setMode(J,B.options.mode||"effect");
var E=B.options.direction||"up";
var H=B.options.distance||20;
var I=B.options.times||5;
var L=B.duration||250;
if(/show|hide/.test(O)){C.push("opacity")
}A.effects.save(J,C);
J.show();
A.effects.createWrapper(J);
var K=(E=="up"||E=="down")?"top":"left";
var G=(E=="up"||E=="left")?"pos":"neg";
var H=B.options.distance||(K=="top"?J.outerHeight({margin:true})/3:J.outerWidth({margin:true})/3);
if(O=="show"){J.css("opacity",0).css(K,G=="pos"?-H:H)
}if(O=="hide"){H=H/(I*2)
}if(O!="hide"){I--
}if(O=="show"){var M={opacity:1};
M[K]=(G=="pos"?"+=":"-=")+H;
J.animate(M,L/2,B.options.easing);
H=H/2;
I--
}for(var N=0;
N<I;
N++){var F={},D={};
F[K]=(G=="pos"?"-=":"+=")+H;
D[K]=(G=="pos"?"+=":"-=")+H;
J.animate(F,L/2,B.options.easing).animate(D,L/2,B.options.easing);
H=(O=="hide")?H*2:H/2
}if(O=="hide"){var M={opacity:0};
M[K]=(G=="pos"?"-=":"+=")+H;
J.animate(M,L/2,B.options.easing,function(){J.hide();
A.effects.restore(J,C);
A.effects.removeWrapper(J);
if(B.callback){B.callback.apply(this,arguments)
}})
}else{var F={},D={};
F[K]=(G=="pos"?"-=":"+=")+H;
D[K]=(G=="pos"?"+=":"-=")+H;
J.animate(F,L/2,B.options.easing).animate(D,L/2,B.options.easing,function(){A.effects.restore(J,C);
A.effects.removeWrapper(J);
if(B.callback){B.callback.apply(this,arguments)
}})
}J.queue("fx",function(){J.dequeue()
});
J.dequeue()
})
}
})(jQuery);
(function(A){A.effects.clip=function(B){return this.queue(function(){var K=A(this),F=["position","top","left","height","width"];
var E=A.effects.setMode(K,B.options.mode||"hide");
var G=B.options.direction||"vertical";
A.effects.save(K,F);
K.show();
var H=A.effects.createWrapper(K).css({overflow:"hidden"});
var J=K[0].tagName=="IMG"?H:K;
var C={size:(G=="vertical")?"height":"width",position:(G=="vertical")?"top":"left"};
var I=(G=="vertical")?J.height():J.width();
if(E=="show"){J.css(C.size,0);
J.css(C.position,I/2)
}var D={};
D[C.size]=E=="show"?I:0;
D[C.position]=E=="show"?0:I/2;
J.animate(D,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){if(E=="hide"){K.hide()
}A.effects.restore(K,F);
A.effects.removeWrapper(K);
if(B.callback){B.callback.apply(K[0],arguments)
}K.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.drop=function(B){return this.queue(function(){var I=A(this),H=["position","top","left","opacity"];
var E=A.effects.setMode(I,B.options.mode||"hide");
var D=B.options.direction||"left";
A.effects.save(I,H);
I.show();
A.effects.createWrapper(I);
var J=(D=="up"||D=="down")?"top":"left";
var G=(D=="up"||D=="left")?"pos":"neg";
var F=B.options.distance||(J=="top"?I.outerHeight({margin:true})/2:I.outerWidth({margin:true})/2);
if(E=="show"){I.css("opacity",0).css(J,G=="pos"?-F:F)
}var C={opacity:E=="show"?1:0};
C[J]=(E=="show"?(G=="pos"?"+=":"-="):(G=="pos"?"-=":"+="))+F;
I.animate(C,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){if(E=="hide"){I.hide()
}A.effects.restore(I,H);
A.effects.removeWrapper(I);
if(B.callback){B.callback.apply(this,arguments)
}I.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.explode=function(B){return this.queue(function(){var E=B.options.pieces?Math.round(Math.sqrt(B.options.pieces)):3;
var I=B.options.pieces?Math.round(Math.sqrt(B.options.pieces)):3;
B.options.mode=B.options.mode=="toggle"?(A(this).is(":visible")?"hide":"show"):B.options.mode;
var D=A(this).show().css("visibility","hidden");
var F=D.offset();
F.top-=parseInt(D.css("marginTop"),10)||0;
F.left-=parseInt(D.css("marginLeft"),10)||0;
var C=D.outerWidth(true);
var G=D.outerHeight(true);
for(var J=0;
J<E;
J++){for(var H=0;
H<I;
H++){D.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-H*(C/I),top:-J*(G/E)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:C/I,height:G/E,left:F.left+H*(C/I)+(B.options.mode=="show"?(H-Math.floor(I/2))*(C/I):0),top:F.top+J*(G/E)+(B.options.mode=="show"?(J-Math.floor(E/2))*(G/E):0),opacity:B.options.mode=="show"?0:1}).animate({left:F.left+H*(C/I)+(B.options.mode=="show"?0:(H-Math.floor(I/2))*(C/I)),top:F.top+J*(G/E)+(B.options.mode=="show"?0:(J-Math.floor(E/2))*(G/E)),opacity:B.options.mode=="show"?1:0},B.duration||500)
}}setTimeout(function(){B.options.mode=="show"?D.css({visibility:"visible"}):D.css({visibility:"visible"}).hide();
if(B.callback){B.callback.apply(D[0])
}D.dequeue();
A("div.ui-effects-explode").remove()
},B.duration||500)
})
}
})(jQuery);
(function(A){A.effects.fold=function(B){return this.queue(function(){var J=A(this),C=["position","top","left"];
var M=A.effects.setMode(J,B.options.mode||"hide");
var G=B.options.size||15;
var F=!(!B.options.horizFirst);
var L=B.duration?B.duration/2:A.fx.speeds._default/2;
A.effects.save(J,C);
J.show();
var I=A.effects.createWrapper(J).css({overflow:"hidden"});
var N=((M=="show")!=F);
var K=N?["width","height"]:["height","width"];
var H=N?[I.width(),I.height()]:[I.height(),I.width()];
var O=/([0-9]+)%/.exec(G);
if(O){G=parseInt(O[1],10)/100*H[M=="hide"?0:1]
}if(M=="show"){I.css(F?{height:0,width:G}:{height:G,width:0})
}var E={},D={};
E[K[0]]=M=="show"?H[0]:G;
D[K[1]]=M=="show"?H[1]:0;
I.animate(E,L,B.options.easing).animate(D,L,B.options.easing,function(){if(M=="hide"){J.hide()
}A.effects.restore(J,C);
A.effects.removeWrapper(J);
if(B.callback){B.callback.apply(J[0],arguments)
}J.dequeue()
})
})
}
})(jQuery);
(function(A){A.effects.highlight=function(B){return this.queue(function(){var G=A(this),F=["backgroundImage","backgroundColor","opacity"];
var D=A.effects.setMode(G,B.options.mode||"show");
var E=B.options.color||"#ffff99";
var C=G.css("backgroundColor");
A.effects.save(G,F);
G.show();
G.css({backgroundImage:"none",backgroundColor:E});
var H={backgroundColor:C};
if(D=="hide"){H.opacity=0
}G.animate(H,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){if(D=="hide"){G.hide()
}A.effects.restore(G,F);
if(D=="show"&&A.browser.msie){this.style.removeAttribute("filter")
}if(B.callback){B.callback.apply(this,arguments)
}G.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.pulsate=function(B){return this.queue(function(){var D=A(this);
var G=A.effects.setMode(D,B.options.mode||"show");
var F=B.options.times||5;
var E=B.duration?B.duration/2:A.fx.speeds._default/2;
if(G=="hide"){F--
}if(D.is(":hidden")){D.css("opacity",0);
D.show();
D.animate({opacity:1},E,B.options.easing);
F=F-2
}for(var C=0;
C<F;
C++){D.animate({opacity:0},E,B.options.easing).animate({opacity:1},E,B.options.easing)
}if(G=="hide"){D.animate({opacity:0},E,B.options.easing,function(){D.hide();
if(B.callback){B.callback.apply(this,arguments)
}})
}else{D.animate({opacity:0},E,B.options.easing).animate({opacity:1},E,B.options.easing,function(){if(B.callback){B.callback.apply(this,arguments)
}})
}D.queue("fx",function(){D.dequeue()
});
D.dequeue()
})
}
})(jQuery);
(function(A){A.effects.puff=function(B){return this.queue(function(){var H=A(this);
var E=A.extend(true,{},B.options);
var D=A.effects.setMode(H,B.options.mode||"hide");
var C=parseInt(B.options.percent,10)||150;
E.fade=true;
var G={height:H.height(),width:H.width()};
var F=C/100;
H.from=(D=="hide")?G:{height:G.height*F,width:G.width*F};
E.from=H.from;
E.percent=(D=="hide")?C:100;
E.mode=D;
H.effect("scale",E,B.duration,B.callback);
H.dequeue()
})
};
A.effects.scale=function(B){return this.queue(function(){var C=A(this);
var H=A.extend(true,{},B.options);
var F=A.effects.setMode(C,B.options.mode||"effect");
var D=parseInt(B.options.percent,10)||(parseInt(B.options.percent,10)==0?0:(F=="hide"?0:100));
var E=B.options.direction||"both";
var G=B.options.origin;
if(F!="effect"){H.origin=G||["middle","center"];
H.restore=true
}var J={height:C.height(),width:C.width()};
C.from=B.options.from||(F=="show"?{height:0,width:0}:J);
var I={y:E!="horizontal"?(D/100):1,x:E!="vertical"?(D/100):1};
C.to={height:J.height*I.y,width:J.width*I.x};
if(B.options.fade){if(F=="show"){C.from.opacity=0;
C.to.opacity=1
}if(F=="hide"){C.from.opacity=1;
C.to.opacity=0
}}H.from=C.from;
H.to=C.to;
H.mode=F;
C.effect("size",H,B.duration,B.callback);
C.dequeue()
})
};
A.effects.size=function(B){return this.queue(function(){var E=A(this),P=["position","top","left","width","height","overflow","opacity"];
var O=["position","top","left","overflow","opacity"];
var L=["width","height","overflow"];
var D=["fontSize"];
var M=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var H=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var I=A.effects.setMode(E,B.options.mode||"effect");
var K=B.options.restore||false;
var G=B.options.scale||"both";
var C=B.options.origin;
var F={height:E.height(),width:E.width()};
E.from=B.options.from||F;
E.to=B.options.to||F;
if(C){var J=A.effects.getBaseline(C,F);
E.from.top=(F.height-E.from.height)*J.y;
E.from.left=(F.width-E.from.width)*J.x;
E.to.top=(F.height-E.to.height)*J.y;
E.to.left=(F.width-E.to.width)*J.x
}var N={from:{y:E.from.height/F.height,x:E.from.width/F.width},to:{y:E.to.height/F.height,x:E.to.width/F.width}};
if(G=="box"||G=="both"){if(N.from.y!=N.to.y){P=P.concat(M);
E.from=A.effects.setTransition(E,M,N.from.y,E.from);
E.to=A.effects.setTransition(E,M,N.to.y,E.to)
}if(N.from.x!=N.to.x){P=P.concat(H);
E.from=A.effects.setTransition(E,H,N.from.x,E.from);
E.to=A.effects.setTransition(E,H,N.to.x,E.to)
}}if(G=="content"||G=="both"){if(N.from.y!=N.to.y){P=P.concat(D);
E.from=A.effects.setTransition(E,D,N.from.y,E.from);
E.to=A.effects.setTransition(E,D,N.to.y,E.to)
}}A.effects.save(E,K?P:O);
E.show();
A.effects.createWrapper(E);
E.css("overflow","hidden").css(E.from);
if(G=="content"||G=="both"){M=M.concat(["marginTop","marginBottom"]).concat(D);
H=H.concat(["marginLeft","marginRight"]);
L=P.concat(M).concat(H);
E.find("*[width]").each(function(){child=A(this);
if(K){A.effects.save(child,L)
}var Q={height:child.height(),width:child.width()};
child.from={height:Q.height*N.from.y,width:Q.width*N.from.x};
child.to={height:Q.height*N.to.y,width:Q.width*N.to.x};
if(N.from.y!=N.to.y){child.from=A.effects.setTransition(child,M,N.from.y,child.from);
child.to=A.effects.setTransition(child,M,N.to.y,child.to)
}if(N.from.x!=N.to.x){child.from=A.effects.setTransition(child,H,N.from.x,child.from);
child.to=A.effects.setTransition(child,H,N.to.x,child.to)
}child.css(child.from);
child.animate(child.to,B.duration,B.options.easing,function(){if(K){A.effects.restore(child,L)
}})
})
}E.animate(E.to,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){if(I=="hide"){E.hide()
}A.effects.restore(E,K?P:O);
A.effects.removeWrapper(E);
if(B.callback){B.callback.apply(this,arguments)
}E.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.shake=function(B){return this.queue(function(){var J=A(this),C=["position","top","left"];
var O=A.effects.setMode(J,B.options.mode||"effect");
var E=B.options.direction||"left";
var H=B.options.distance||20;
var I=B.options.times||3;
var L=B.duration||B.options.duration||140;
A.effects.save(J,C);
J.show();
A.effects.createWrapper(J);
var K=(E=="up"||E=="down")?"top":"left";
var G=(E=="up"||E=="left")?"pos":"neg";
var M={},F={},D={};
M[K]=(G=="pos"?"-=":"+=")+H;
F[K]=(G=="pos"?"+=":"-=")+H*2;
D[K]=(G=="pos"?"-=":"+=")+H*2;
J.animate(M,L,B.options.easing);
for(var N=1;
N<I;
N++){J.animate(F,L,B.options.easing).animate(D,L,B.options.easing)
}J.animate(F,L,B.options.easing).animate(M,L/2,B.options.easing,function(){A.effects.restore(J,C);
A.effects.removeWrapper(J);
if(B.callback){B.callback.apply(this,arguments)
}});
J.queue("fx",function(){J.dequeue()
});
J.dequeue()
})
}
})(jQuery);
(function(A){A.effects.slide=function(B){return this.queue(function(){var I=A(this),H=["position","top","left"];
var E=A.effects.setMode(I,B.options.mode||"show");
var D=B.options.direction||"left";
A.effects.save(I,H);
I.show();
A.effects.createWrapper(I).css({overflow:"hidden"});
var J=(D=="up"||D=="down")?"top":"left";
var G=(D=="up"||D=="left")?"pos":"neg";
var F=B.options.distance||(J=="top"?I.outerHeight({margin:true}):I.outerWidth({margin:true}));
if(E=="show"){I.css(J,G=="pos"?-F:F)
}var C={};
C[J]=(E=="show"?(G=="pos"?"+=":"-="):(G=="pos"?"-=":"+="))+F;
I.animate(C,{queue:false,duration:B.duration,easing:B.options.easing,complete:function(){if(E=="hide"){I.hide()
}A.effects.restore(I,H);
A.effects.removeWrapper(I);
if(B.callback){B.callback.apply(this,arguments)
}I.dequeue()
}})
})
}
})(jQuery);
(function(A){A.effects.transfer=function(B){return this.queue(function(){var H=A(this),D=A(B.options.to),G=D.offset(),C={top:G.top,left:G.left,height:D.innerHeight(),width:D.innerWidth()},F=H.offset(),E=A('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(B.options.className).css({top:F.top,left:F.left,height:H.innerHeight(),width:H.innerWidth(),position:"absolute"}).animate(C,B.duration,B.options.easing,function(){E.remove();
(B.callback&&B.callback.apply(H[0],arguments));
H.dequeue()
})
})
}
})(jQuery);