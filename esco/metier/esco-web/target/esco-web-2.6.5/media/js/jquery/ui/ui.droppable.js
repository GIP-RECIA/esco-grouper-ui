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