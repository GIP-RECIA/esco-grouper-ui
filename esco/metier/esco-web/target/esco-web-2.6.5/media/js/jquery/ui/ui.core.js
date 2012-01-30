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