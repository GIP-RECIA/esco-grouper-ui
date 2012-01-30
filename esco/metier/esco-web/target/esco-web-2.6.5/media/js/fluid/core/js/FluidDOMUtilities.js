var fluid_1_1=fluid_1_1||{};
(function(A,C){C.dom=C.dom||{};
var B=function(D){if(D.node.firstChild){D.node=D.node.firstChild;
D.depth+=1;
return D
}while(D.node){if(D.node.nextSibling){D.node=D.node.nextSibling;
return D
}D.node=D.node.parentNode;
D.depth-=1
}return D
};
C.dom.iterateDom=function(E,I,H){var G={node:E,depth:0};
var F=E;
var D;
while(G.node!==null&&G.depth>=0&&G.depth<C.dom.iterateDom.DOM_BAIL_DEPTH){D=null;
if(G.node.nodeType===1||H){D=I(G.node,G.depth)
}if(D){if(D==="delete"){G.node.parentNode.removeChild(G.node);
G.node=F
}else{if(D==="stop"){return G.node
}}}F=G.node;
G=B(G)
}};
C.dom.iterateDom.DOM_BAIL_DEPTH=256;
C.dom.computeAbsolutePosition=function(F){var E=0,D=0;
if(F.offsetParent){do{E+=F.offsetLeft;
D+=F.offsetTop;
F=F.offsetParent
}while(F);
return[E,D]
}};
C.dom.isContainer=function(D,E){for(;
E;
E=E.parentNode){if(D===E){return true
}}return false
};
C.dom.insertAfter=function(F,D){var E=D.nextSibling;
if(!E){D.parentNode.appendChild(F)
}else{D.parentNode.insertBefore(F,E)
}};
C.dom.isWhitespaceNode=function(D){return !(/[^\t\n\r ]/.test(D.data))
};
C.dom.isIgnorableNode=function(D){return(D.nodeType===8)||((D.nodeType===3)&&C.dom.isWhitespaceNode(D))
};
C.dom.getElementText=function(H){var F=H.childNodes;
var D="";
for(var G=0;
G<F.length;
++G){var E=F[G];
if(E.nodeType==3){D=D+E.nodeValue
}}return D
};
C.dom.cleanseScripts=function(D){var E=A.data(D,C.dom.cleanseScripts.MARKER);
if(!E){C.dom.iterateDom(D,function(F){return F.tagName.toLowerCase()==="script"?"delete":null
});
A.data(D,C.dom.cleanseScripts.MARKER,true)
}};
C.dom.cleanseScripts.MARKER="fluid-scripts-cleansed"
})(jQuery,fluid_1_1);