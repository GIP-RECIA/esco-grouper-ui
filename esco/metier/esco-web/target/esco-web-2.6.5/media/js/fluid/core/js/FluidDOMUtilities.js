var fluid_1_1=fluid_1_1||{};
(function(D,E){E.dom=E.dom||{};
var F=function(A){if(A.node.firstChild){A.node=A.node.firstChild;
A.depth+=1;
return A
}while(A.node){if(A.node.nextSibling){A.node=A.node.nextSibling;
return A
}A.node=A.node.parentNode;
A.depth-=1
}return A
};
E.dom.iterateDom=function(K,A,B){var C={node:K,depth:0};
var J=K;
var L;
while(C.node!==null&&C.depth>=0&&C.depth<E.dom.iterateDom.DOM_BAIL_DEPTH){L=null;
if(C.node.nodeType===1||B){L=A(C.node,C.depth)
}if(L){if(L==="delete"){C.node.parentNode.removeChild(C.node);
C.node=J
}else{if(L==="stop"){return C.node
}}}J=C.node;
C=F(C)
}};
E.dom.iterateDom.DOM_BAIL_DEPTH=256;
E.dom.computeAbsolutePosition=function(A){var B=0,C=0;
if(A.offsetParent){do{B+=A.offsetLeft;
C+=A.offsetTop;
A=A.offsetParent
}while(A);
return[B,C]
}};
E.dom.isContainer=function(B,A){for(;
A;
A=A.parentNode){if(B===A){return true
}}return false
};
E.dom.insertAfter=function(A,C){var B=C.nextSibling;
if(!B){C.parentNode.appendChild(A)
}else{C.parentNode.insertBefore(A,B)
}};
E.dom.isWhitespaceNode=function(A){return !(/[^\t\n\r ]/.test(A.data))
};
E.dom.isIgnorableNode=function(A){return(A.nodeType===8)||((A.nodeType===3)&&E.dom.isWhitespaceNode(A))
};
E.dom.getElementText=function(A){var C=A.childNodes;
var J="";
for(var B=0;
B<C.length;
++B){var I=C[B];
if(I.nodeType==3){J=J+I.nodeValue
}}return J
};
E.dom.cleanseScripts=function(B){var A=D.data(B,E.dom.cleanseScripts.MARKER);
if(!A){E.dom.iterateDom(B,function(C){return C.tagName.toLowerCase()==="script"?"delete":null
});
D.data(B,E.dom.cleanseScripts.MARKER,true)
}};
E.dom.cleanseScripts.MARKER="fluid-scripts-cleansed"
})(jQuery,fluid_1_1);