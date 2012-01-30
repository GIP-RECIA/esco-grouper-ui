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