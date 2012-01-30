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