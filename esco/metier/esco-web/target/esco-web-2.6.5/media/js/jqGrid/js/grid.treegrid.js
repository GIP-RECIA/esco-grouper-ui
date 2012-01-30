(function(B){B.fn.extend({setTreeNode:function(D,A){return this.each(function(){var Y=this;
if(!Y.grid||!Y.p.treeGrid){return 
}var T=0,X=0;
if(!Y.p.expColInd){for(var f in Y.p.colModel){if(Y.p.colModel[f].name==Y.p.ExpandColumn){T=X;
Y.p.expColInd=T;
break
}X++
}if(!Y.p.expColInd){Y.p.expColInd=T
}}else{T=Y.p.expColInd
}var V=Y.p.treeReader.expanded_field;
var b=Y.p.treeReader.leaf_field;
var c=Y.p.treeReader.level_field;
A.level=D[c];
if(Y.p.treeGridModel=="nested"){A.lft=D[Y.p.treeReader.left_field];
A.rgt=D[Y.p.treeReader.right_field];
if(!D[b]){D[b]=(parseInt(A.rgt,10)===parseInt(A.lft,10)+1)?"true":"false"
}}else{A.parent_id=D[Y.p.treeReader.parent_id_field]
}var W=(D[V]&&D[V]=="true")?true:false;
var U=parseInt(A.level,10);
var Z,S;
if(Y.p.tree_root_level===0){Z=U+1;
S=U
}else{Z=U;
S=U-1
}var C=document.createElement("div");
B(C).addClass("tree-wrap").width(Z*18);
var a=document.createElement("div");
B(a).css("left",S*18);
C.appendChild(a);
if(D[b]=="true"){B(a).addClass("tree-leaf");
A.isLeaf=true
}else{if(D[V]=="true"){B(a).addClass("tree-minus treeclick");
A.expanded=true
}else{B(a).addClass("tree-plus treeclick");
A.expanded=false
}}if(parseInt(D[c],10)!==parseInt(Y.p.tree_root_level,10)){if(!B(Y).isVisibleNode(A)){B(A).css("display","none")
}}var d=B("td:eq("+T+")",A).html();
var e=B("td:eq("+T+")",A).html("<span>"+d+"</span>").prepend(C);
B(".treeclick",e).click(function(E){var F=E.target||E.srcElement;
var G=B(F,Y.rows).parents("tr:first")[0].rowIndex;
if(!Y.rows[G].isLeaf){if(Y.rows[G].expanded){B(Y).collapseRow(Y.rows[G]);
B(Y).collapseNode(Y.rows[G])
}else{B(Y).expandRow(Y.rows[G]);
B(Y).expandNode(Y.rows[G])
}}return false
});
if(Y.p.ExpandColClick===true){B("span",e).css("cursor","pointer").click(function(E){var F=E.target||E.srcElement;
var G=B(F,Y.rows).parents("tr:first")[0].rowIndex;
if(!Y.rows[G].isLeaf){if(Y.rows[G].expanded){B(Y).collapseRow(Y.rows[G]);
B(Y).collapseNode(Y.rows[G])
}else{B(Y).expandRow(Y.rows[G]);
B(Y).expandNode(Y.rows[G])
}}B(Y).setSelection(Y.rows[G].id);
return false
})
}})
},setTreeGrid:function(){return this.each(function(){var A=this;
if(!A.p.treeGrid){return 
}B.extend(A.p,{treedatatype:null});
if(A.p.treeGridModel=="nested"){A.p.treeReader=B.extend({level_field:"level",left_field:"lft",right_field:"rgt",leaf_field:"isLeaf",expanded_field:"expanded"},A.p.treeReader)
}else{if(A.p.treeGridModel=="adjacency"){A.p.treeReader=B.extend({level_field:"level",parent_id_field:"parent",leaf_field:"isLeaf",expanded_field:"expanded"},A.p.treeReader)
}}})
},expandRow:function(A){this.each(function(){var E=this;
if(!E.grid||!E.p.treeGrid){return 
}var F=B(E).getNodeChildren(A);
B(F).each(function(C){B(this).css("display","");
if(this.expanded){B(E).expandRow(this)
}})
})
},collapseRow:function(A){this.each(function(){var E=this;
if(!E.grid||!E.p.treeGrid){return 
}var F=B(E).getNodeChildren(A);
B(F).each(function(C){B(this).css("display","none");
B(E).collapseRow(this)
})
})
},getRootNodes:function(){var A=[];
this.each(function(){var E=this;
if(!E.grid||!E.p.treeGrid){return 
}switch(E.p.treeGridModel){case"nested":var F=E.p.treeReader.level_field;
B(E.rows).each(function(C){if(parseInt(this[F],10)===parseInt(E.p.tree_root_level,10)){A.push(this)
}});
break;
case"adjacency":B(E.rows).each(function(C){if(this.parent_id.toLowerCase()=="null"){A.push(this)
}});
break
}});
return A
},getNodeDepth:function(A){var D=null;
this.each(function(){var C=this;
if(!this.grid||!this.p.treeGrid){return 
}switch(C.p.treeGridModel){case"nested":D=parseInt(A.level,10)-parseInt(this.p.tree_root_level,10);
break;
case"adjacency":D=B(C).getNodeAncestors(A).length;
break
}});
return D
},getNodeParent:function(A){var D=null;
this.each(function(){var C=this;
if(!C.grid||!C.p.treeGrid){return 
}switch(C.p.treeGridModel){case"nested":var I=parseInt(A.lft,10),J=parseInt(A.rgt,10),H=parseInt(A.level,10);
B(this.rows).each(function(){if(parseInt(this.level,10)===H-1&&parseInt(this.lft)<I&&parseInt(this.rgt)>J){D=this;
return false
}});
break;
case"adjacency":B(this.rows).each(function(){if(this.id===A.parent_id){D=this;
return false
}});
break
}});
return D
},getNodeChildren:function(A){var D=[];
this.each(function(){var C=this;
if(!C.grid||!C.p.treeGrid){return 
}switch(C.p.treeGridModel){case"nested":var J=parseInt(A.lft,10),K=parseInt(A.rgt,10),I=parseInt(A.level,10);
var L=A.rowIndex;
B(this.rows).slice(1).each(function(E){if(parseInt(this.level,10)===I+1&&parseInt(this.lft,10)>J&&parseInt(this.rgt,10)<K){D.push(this)
}});
break;
case"adjacency":B(this.rows).slice(1).each(function(E){if(this.parent_id==A.id){D.push(this)
}});
break
}});
return D
},getFullTreeNode:function(A){var D=[];
this.each(function(){var C=this;
if(!C.grid||!C.p.treeGrid){return 
}switch(C.p.treeGridModel){case"nested":var J=parseInt(A.lft,10),K=parseInt(A.rgt,10),I=parseInt(A.level,10);
var L=A.rowIndex;
B(this.rows).slice(1).each(function(E){if(parseInt(this.level,10)>=I&&parseInt(this.lft,10)>=J&&parseInt(this.lft,10)<=K){D.push(this)
}});
break;
case"adjacency":break
}});
return D
},getNodeAncestors:function(A){var D=[];
this.each(function(){if(!this.grid||!this.p.treeGrid){return 
}var C=B(this).getNodeParent(A);
while(C){D.push(C);
C=B(this).getNodeParent(C)
}});
return D
},isVisibleNode:function(A){var D=true;
this.each(function(){var C=this;
if(!C.grid||!C.p.treeGrid){return 
}var F=B(C).getNodeAncestors(A);
B(F).each(function(){D=D&&this.expanded;
if(!D){return false
}})
});
return D
},isNodeLoaded:function(A){var D;
this.each(function(){var C=this;
if(!C.grid||!C.p.treeGrid){return 
}if(A.loaded!==undefined){D=A.loaded
}else{if(A.isLeaf||B(C).getNodeChildren(A).length>0){D=true
}else{D=false
}}});
return D
},expandNode:function(A){return this.each(function(){if(!this.grid||!this.p.treeGrid){return 
}if(!A.expanded){if(B(this).isNodeLoaded(A)){A.expanded=true;
B("div.treeclick",A).removeClass("tree-plus").addClass("tree-minus")
}else{A.expanded=true;
B("div.treeclick",A).removeClass("tree-plus").addClass("tree-minus");
this.p.treeANode=A.rowIndex;
this.p.datatype=this.p.treedatatype;
if(this.p.treeGridModel=="nested"){B(this).setGridParam({postData:{nodeid:A.id,n_left:A.lft,n_right:A.rgt,n_level:A.level}})
}else{B(this).setGridParam({postData:{nodeid:A.id,parentid:A.parent_id,n_level:A.level}})
}B(this).trigger("reloadGrid");
if(this.p.treeGridModel=="nested"){B(this).setGridParam({postData:{nodeid:"",n_left:"",n_right:"",n_level:""}})
}else{B(this).setGridParam({postData:{nodeid:"",parentid:"",n_level:""}})
}}}})
},collapseNode:function(A){return this.each(function(){if(!this.grid||!this.p.treeGrid){return 
}if(A.expanded){A.expanded=false;
B("div.treeclick",A).removeClass("tree-minus").addClass("tree-plus")
}})
},SortTree:function(A){return this.each(function(){if(!this.grid||!this.p.treeGrid){return 
}var I,L,N,J=[],K=B(this).getRootNodes();
K.sort(function(C,D){if(C.sortKey<D.sortKey){return -A
}if(C.sortKey>D.sortKey){return A
}return 0
});
for(I=0,L=K.length;
I<L;
I++){N=K[I];
J.push(N);
B(this).collectChildrenSortTree(J,N,A)
}var M=this;
B.each(J,function(D,C){B("tbody",M.grid.bDiv).append(C);
C.sortKey=null
})
})
},collectChildrenSortTree:function(A,E,F){return this.each(function(){if(!this.grid||!this.p.treeGrid){return 
}var D,J,C,I=B(this).getNodeChildren(E);
I.sort(function(G,H){if(G.sortKey<H.sortKey){return -F
}if(G.sortKey>H.sortKey){return F
}return 0
});
for(D=0,J=I.length;
D<J;
D++){C=I[D];
A.push(C);
B(this).collectChildrenSortTree(A,C,F)
}})
},setTreeRow:function(A,H){var F,G=false;
this.each(function(){var C=this;
if(!C.grid||!C.p.treeGrid){return 
}G=B(C).setRowData(A,H)
});
return G
},delTreeNode:function(A){return this.each(function(){var G=this;
if(!G.grid||!G.p.treeGrid){return 
}var I=B(G).getInd(G.rows,A,true);
if(I){var H=B(G).getNodeChildren(I);
if(H.length>0){for(var J=0;
J<H.length;
J++){B(G).delRowData(H[J].id)
}}B(G).delRowData(I.id)
}})
}})
})(jQuery);