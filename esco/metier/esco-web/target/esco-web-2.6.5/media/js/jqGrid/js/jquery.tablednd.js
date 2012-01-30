jQuery.tableDnD={currentTable:null,dragObject:null,mouseOffset:null,oldY:0,build:function(A){this.each(function(){this.tableDnDConfig=jQuery.extend({onDragStyle:null,onDropStyle:null,onDragClass:"tDnD_whileDrag",onDrop:null,onDragStart:null,scrollAmount:5,serializeRegexp:/[^\-]*$/,serializeParamName:null,dragHandle:null},A||{});
jQuery.tableDnD.makeDraggable(this)
});
jQuery(document).bind("mousemove",jQuery.tableDnD.mousemove).bind("mouseup",jQuery.tableDnD.mouseup);
return this
},makeDraggable:function(A){var D=A.tableDnDConfig;
if(A.tableDnDConfig.dragHandle){var C=jQuery("td."+A.tableDnDConfig.dragHandle,A);
C.each(function(){jQuery(this).mousedown(function(E){jQuery.tableDnD.dragObject=this.parentNode;
jQuery.tableDnD.currentTable=A;
jQuery.tableDnD.mouseOffset=jQuery.tableDnD.getMouseOffset(this,E);
if(D.onDragStart){D.onDragStart(A,this)
}return false
})
})
}else{var B=jQuery("tr",A);
B.each(function(){var E=jQuery(this);
if(!E.hasClass("nodrag")){E.mousedown(function(F){if(F.target.tagName=="TD"){jQuery.tableDnD.dragObject=this;
jQuery.tableDnD.currentTable=A;
jQuery.tableDnD.mouseOffset=jQuery.tableDnD.getMouseOffset(this,F);
if(D.onDragStart){D.onDragStart(A,this)
}return false
}}).css("cursor","move")
}})
}},updateTables:function(){this.each(function(){if(this.tableDnDConfig){jQuery.tableDnD.makeDraggable(this)
}})
},mouseCoords:function(A){if(A.pageX||A.pageY){return{x:A.pageX,y:A.pageY}
}return{x:A.clientX+document.body.scrollLeft-document.body.clientLeft,y:A.clientY+document.body.scrollTop-document.body.clientTop}
},getMouseOffset:function(B,A){A=A||window.event;
var D=this.getPosition(B);
var C=this.mouseCoords(A);
return{x:C.x-D.x,y:C.y-D.y}
},getPosition:function(A){var C=0;
var B=0;
if(A.offsetHeight==0){A=A.firstChild
}if(A&&A.offsetParent){while(A.offsetParent){C+=A.offsetLeft;
B+=A.offsetTop;
A=A.offsetParent
}C+=A.offsetLeft;
B+=A.offsetTop
}return{x:C,y:B}
},mousemove:function(H){if(jQuery.tableDnD.dragObject==null){return 
}var E=jQuery(jQuery.tableDnD.dragObject);
var C=jQuery.tableDnD.currentTable.tableDnDConfig;
var A=jQuery.tableDnD.mouseCoords(H);
var G=A.y-jQuery.tableDnD.mouseOffset.y;
var D=window.pageYOffset;
if(document.all){if(typeof document.compatMode!="undefined"&&document.compatMode!="BackCompat"){D=document.documentElement.scrollTop
}else{if(typeof document.body!="undefined"){D=document.body.scrollTop
}}}if(A.y-D<C.scrollAmount){window.scrollBy(0,-C.scrollAmount)
}else{var B=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
if(B-(A.y-D)<C.scrollAmount){window.scrollBy(0,C.scrollAmount)
}}if(G!=jQuery.tableDnD.oldY){var F=G>jQuery.tableDnD.oldY;
jQuery.tableDnD.oldY=G;
if(C.onDragClass){E.addClass(C.onDragClass)
}else{E.css(C.onDragStyle)
}var I=jQuery.tableDnD.findDropTargetRow(E,G);
if(I){if(F&&jQuery.tableDnD.dragObject!=I){jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject,I.nextSibling)
}else{if(!F&&jQuery.tableDnD.dragObject!=I){jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject,I)
}}}}return false
},findDropTargetRow:function(G,H){var A=jQuery.tableDnD.currentTable.rows;
for(var F=0;
F<A.length;
F++){var I=A[F];
var C=this.getPosition(I).y;
var B=parseInt(I.offsetHeight)/2;
if(I.offsetHeight==0){C=this.getPosition(I.firstChild).y;
B=parseInt(I.firstChild.offsetHeight)/2
}if((H>C-B)&&(H<(C+B))){if(I==G){return null
}var D=jQuery.tableDnD.currentTable.tableDnDConfig;
if(D.onAllowDrop){if(D.onAllowDrop(G,I)){return I
}else{return null
}}else{var E=jQuery(I).hasClass("nodrop");
if(!E){return I
}else{return null
}}return I
}}return null
},mouseup:function(A){if(jQuery.tableDnD.currentTable&&jQuery.tableDnD.dragObject){var C=jQuery.tableDnD.dragObject;
var B=jQuery.tableDnD.currentTable.tableDnDConfig;
if(B.onDragClass){jQuery(C).removeClass(B.onDragClass)
}else{jQuery(C).css(B.onDropStyle)
}jQuery.tableDnD.dragObject=null;
if(B.onDrop){B.onDrop(jQuery.tableDnD.currentTable,C)
}jQuery.tableDnD.currentTable=null
}},serialize:function(){if(jQuery.tableDnD.currentTable){return jQuery.tableDnD.serializeTable(jQuery.tableDnD.currentTable)
}else{return"Error: No Table id set, you need to set an id on your table and every row"
}},serializeTable:function(B){var E="";
var A=B.id;
var C=B.rows;
for(var F=0;
F<C.length;
F++){if(E.length>0){E+="&"
}var D=C[F].id;
if(D&&D&&B.tableDnDConfig&&B.tableDnDConfig.serializeRegexp){D=D.match(B.tableDnDConfig.serializeRegexp)[0]
}E+=A+"[]="+D
}return E
},serializeTables:function(){var A="";
this.each(function(){A+=jQuery.tableDnD.serializeTable(this)
});
return A
}};
jQuery.fn.extend({tableDnD:jQuery.tableDnD.build,tableDnDUpdate:jQuery.tableDnD.updateTables,tableDnDSerialize:jQuery.tableDnD.serializeTables});