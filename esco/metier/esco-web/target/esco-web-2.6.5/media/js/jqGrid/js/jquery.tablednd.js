jQuery.tableDnD={currentTable:null,dragObject:null,mouseOffset:null,oldY:0,build:function(B){this.each(function(){this.tableDnDConfig=jQuery.extend({onDragStyle:null,onDropStyle:null,onDragClass:"tDnD_whileDrag",onDrop:null,onDragStart:null,scrollAmount:5,serializeRegexp:/[^\-]*$/,serializeParamName:null,dragHandle:null},B||{});
jQuery.tableDnD.makeDraggable(this)
});
jQuery(document).bind("mousemove",jQuery.tableDnD.mousemove).bind("mouseup",jQuery.tableDnD.mouseup);
return this
},makeDraggable:function(E){var F=E.tableDnDConfig;
if(E.tableDnDConfig.dragHandle){var G=jQuery("td."+E.tableDnDConfig.dragHandle,E);
G.each(function(){jQuery(this).mousedown(function(A){jQuery.tableDnD.dragObject=this.parentNode;
jQuery.tableDnD.currentTable=E;
jQuery.tableDnD.mouseOffset=jQuery.tableDnD.getMouseOffset(this,A);
if(F.onDragStart){F.onDragStart(E,this)
}return false
})
})
}else{var H=jQuery("tr",E);
H.each(function(){var A=jQuery(this);
if(!A.hasClass("nodrag")){A.mousedown(function(B){if(B.target.tagName=="TD"){jQuery.tableDnD.dragObject=this;
jQuery.tableDnD.currentTable=E;
jQuery.tableDnD.mouseOffset=jQuery.tableDnD.getMouseOffset(this,B);
if(F.onDragStart){F.onDragStart(E,this)
}return false
}}).css("cursor","move")
}})
}},updateTables:function(){this.each(function(){if(this.tableDnDConfig){jQuery.tableDnD.makeDraggable(this)
}})
},mouseCoords:function(B){if(B.pageX||B.pageY){return{x:B.pageX,y:B.pageY}
}return{x:B.clientX+document.body.scrollLeft-document.body.clientLeft,y:B.clientY+document.body.scrollTop-document.body.clientTop}
},getMouseOffset:function(H,E){E=E||window.event;
var F=this.getPosition(H);
var G=this.mouseCoords(E);
return{x:G.x-F.x,y:G.y-F.y}
},getPosition:function(D){var E=0;
var F=0;
if(D.offsetHeight==0){D=D.firstChild
}if(D&&D.offsetParent){while(D.offsetParent){E+=D.offsetLeft;
F+=D.offsetTop;
D=D.offsetParent
}E+=D.offsetLeft;
F+=D.offsetTop
}return{x:E,y:F}
},mousemove:function(O){if(jQuery.tableDnD.dragObject==null){return 
}var R=jQuery(jQuery.tableDnD.dragObject);
var K=jQuery.tableDnD.currentTable.tableDnDConfig;
var M=jQuery.tableDnD.mouseCoords(O);
var P=M.y-jQuery.tableDnD.mouseOffset.y;
var J=window.pageYOffset;
if(document.all){if(typeof document.compatMode!="undefined"&&document.compatMode!="BackCompat"){J=document.documentElement.scrollTop
}else{if(typeof document.body!="undefined"){J=document.body.scrollTop
}}}if(M.y-J<K.scrollAmount){window.scrollBy(0,-K.scrollAmount)
}else{var L=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
if(L-(M.y-J)<K.scrollAmount){window.scrollBy(0,K.scrollAmount)
}}if(P!=jQuery.tableDnD.oldY){var Q=P>jQuery.tableDnD.oldY;
jQuery.tableDnD.oldY=P;
if(K.onDragClass){R.addClass(K.onDragClass)
}else{R.css(K.onDragStyle)
}var N=jQuery.tableDnD.findDropTargetRow(R,P);
if(N){if(Q&&jQuery.tableDnD.dragObject!=N){jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject,N.nextSibling)
}else{if(!Q&&jQuery.tableDnD.dragObject!=N){jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject,N)
}}}}return false
},findDropTargetRow:function(P,O){var M=jQuery.tableDnD.currentTable.rows;
for(var Q=0;
Q<M.length;
Q++){var N=M[Q];
var K=this.getPosition(N).y;
var L=parseInt(N.offsetHeight)/2;
if(N.offsetHeight==0){K=this.getPosition(N.firstChild).y;
L=parseInt(N.firstChild.offsetHeight)/2
}if((O>K-L)&&(O<(K+L))){if(N==P){return null
}var J=jQuery.tableDnD.currentTable.tableDnDConfig;
if(J.onAllowDrop){if(J.onAllowDrop(P,N)){return N
}else{return null
}}else{var R=jQuery(N).hasClass("nodrop");
if(!R){return N
}else{return null
}}return N
}}return null
},mouseup:function(D){if(jQuery.tableDnD.currentTable&&jQuery.tableDnD.dragObject){var E=jQuery.tableDnD.dragObject;
var F=jQuery.tableDnD.currentTable.tableDnDConfig;
if(F.onDragClass){jQuery(E).removeClass(F.onDragClass)
}else{jQuery(E).css(F.onDropStyle)
}jQuery.tableDnD.dragObject=null;
if(F.onDrop){F.onDrop(jQuery.tableDnD.currentTable,E)
}jQuery.tableDnD.currentTable=null
}},serialize:function(){if(jQuery.tableDnD.currentTable){return jQuery.tableDnD.serializeTable(jQuery.tableDnD.currentTable)
}else{return"Error: No Table id set, you need to set an id on your table and every row"
}},serializeTable:function(L){var I="";
var G=L.id;
var K=L.rows;
for(var H=0;
H<K.length;
H++){if(I.length>0){I+="&"
}var J=K[H].id;
if(J&&J&&L.tableDnDConfig&&L.tableDnDConfig.serializeRegexp){J=J.match(L.tableDnDConfig.serializeRegexp)[0]
}I+=G+"[]="+J
}return I
},serializeTables:function(){var B="";
this.each(function(){B+=jQuery.tableDnD.serializeTable(this)
});
return B
}};
jQuery.fn.extend({tableDnD:jQuery.tableDnD.build,tableDnDUpdate:jQuery.tableDnD.updateTables,tableDnDSerialize:jQuery.tableDnD.serializeTables});