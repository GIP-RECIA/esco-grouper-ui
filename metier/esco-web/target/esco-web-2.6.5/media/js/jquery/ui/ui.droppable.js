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