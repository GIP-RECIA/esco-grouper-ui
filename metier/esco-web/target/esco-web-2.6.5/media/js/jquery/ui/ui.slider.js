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