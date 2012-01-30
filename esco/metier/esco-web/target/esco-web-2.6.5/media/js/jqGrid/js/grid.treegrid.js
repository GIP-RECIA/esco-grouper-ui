(function(A){A.fn.extend({setTreeNode:function(B,C){return this.each(function(){var L=this;
if(!L.grid||!L.p.treeGrid){return 
}var Q=0,M=0;
if(!L.p.expColInd){for(var E in L.p.colModel){if(L.p.colModel[E].name==L.p.ExpandColumn){Q=M;
L.p.expColInd=Q;
break
}M++
}if(!L.p.expColInd){L.p.expColInd=Q
}}else{Q=L.p.expColInd
}var O=L.p.treeReader.expanded_field;
var I=L.p.treeReader.leaf_field;
var H=L.p.treeReader.level_field;
C.level=B[H];
if(L.p.treeGridModel=="nested"){C.lft=B[L.p.treeReader.left_field];
C.rgt=B[L.p.treeReader.right_field];
if(!B[I]){B[I]=(parseInt(C.rgt,10)===parseInt(C.lft,10)+1)?"true":"false"
}}else{C.parent_id=B[L.p.treeReader.parent_id_field]
}var N=(B[O]&&B[O]=="true")?true:false;
var P=parseInt(C.level,10);
var K,R;
if(L.p.tree_root_level===0){K=P+1;
R=P
}else{K=P;
R=P-1
}var D=document.createElement("div");
A(D).addClass("tree-wrap").width(K*18);
var J=document.createElement("div");
A(J).css("left",R*18);
D.appendChild(J);
if(B[I]=="true"){A(J).addClass("tree-leaf");
C.isLeaf=true
}else{if(B[O]=="true"){A(J).addClass("tree-minus treeclick");
C.expanded=true
}else{A(J).addClass("tree-plus treeclick");
C.expanded=false
}}if(parseInt(B[H],10)!==parseInt(L.p.tree_root_level,10)){if(!A(L).isVisibleNode(C)){A(C).css("display","none")
}}var G=A("td:eq("+Q+")",C).html();
var F=A("td:eq("+Q+")",C).html("<span>"+G+"</span>").prepend(D);
A(".treeclick",F).click(function(U){var T=U.target||U.srcElement;
var S=A(T,L.rows).parents("tr:first")[0].rowIndex;
if(!L.rows[S].isLeaf){if(L.rows[S].expanded){A(L).collapseRow(L.rows[S]);
A(L).collapseNode(L.rows[S])
}else{A(L).expandRow(L.rows[S]);
A(L).expandNode(L.rows[S])
}}return false
});
if(L.p.ExpandColClick===true){A("span",F).css("cursor","pointer").click(function(U){var T=U.target||U.srcElement;
var S=A(T,L.rows).parents("tr:first")[0].rowIndex;
if(!L.rows[S].isLeaf){if(L.rows[S].expanded){A(L).collapseRow(L.rows[S]);
A(L).collapseNode(L.rows[S])
}else{A(L).expandRow(L.rows[S]);
A(L).expandNode(L.rows[S])
}}A(L).setSelection(L.rows[S].id);
return false
})
}})
},setTreeGrid:function(){return this.each(function(){var B=this;
if(!B.p.treeGrid){return 
}A.extend(B.p,{treedatatype:null});
if(B.p.treeGridModel=="nested"){B.p.treeReader=A.extend({level_field:"level",left_field:"lft",right_field:"rgt",leaf_field:"isLeaf",expanded_field:"expanded"},B.p.treeReader)
}else{if(B.p.treeGridModel=="adjacency"){B.p.treeReader=A.extend({level_field:"level",parent_id_field:"parent",leaf_field:"isLeaf",expanded_field:"expanded"},B.p.treeReader)
}}})
},expandRow:function(B){this.each(function(){var D=this;
if(!D.grid||!D.p.treeGrid){return 
}var C=A(D).getNodeChildren(B);
A(C).each(function(E){A(this).css("display","");
if(this.expanded){A(D).expandRow(this)
}})
})
},collapseRow:function(B){this.each(function(){var D=this;
if(!D.grid||!D.p.treeGrid){return 
}var C=A(D).getNodeChildren(B);
A(C).each(function(E){A(this).css("display","none");
A(D).collapseRow(this)
})
})
},getRootNodes:function(){var B=[];
this.each(function(){var D=this;
if(!D.grid||!D.p.treeGrid){return 
}switch(D.p.treeGridModel){case"nested":var C=D.p.treeReader.level_field;
A(D.rows).each(function(E){if(parseInt(this[C],10)===parseInt(D.p.tree_root_level,10)){B.push(this)
}});
break;
case"adjacency":A(D.rows).each(function(E){if(this.parent_id.toLowerCase()=="null"){B.push(this)
}});
break
}});
return B
},getNodeDepth:function(C){var B=null;
this.each(function(){var D=this;
if(!this.grid||!this.p.treeGrid){return 
}switch(D.p.treeGridModel){case"nested":B=parseInt(C.level,10)-parseInt(this.p.tree_root_level,10);
break;
case"adjacency":B=A(D).getNodeAncestors(C).length;
break
}});
return B
},getNodeParent:function(C){var B=null;
this.each(function(){var G=this;
if(!G.grid||!G.p.treeGrid){return 
}switch(G.p.treeGridModel){case"nested":var E=parseInt(C.lft,10),D=parseInt(C.rgt,10),F=parseInt(C.level,10);
A(this.rows).each(function(){if(parseInt(this.level,10)===F-1&&parseInt(this.lft)<E&&parseInt(this.rgt)>D){B=this;
return false
}});
break;
case"adjacency":A(this.rows).each(function(){if(this.id===C.parent_id){B=this;
return false
}});
break
}});
return B
},getNodeChildren:function(C){var B=[];
this.each(function(){var H=this;
if(!H.grid||!H.p.treeGrid){return 
}switch(H.p.treeGridModel){case"nested":var F=parseInt(C.lft,10),E=parseInt(C.rgt,10),G=parseInt(C.level,10);
var D=C.rowIndex;
A(this.rows).slice(1).each(function(I){if(parseInt(this.level,10)===G+1&&parseInt(this.lft,10)>F&&parseInt(this.rgt,10)<E){B.push(this)
}});
break;
case"adjacency":A(this.rows).slice(1).each(function(I){if(this.parent_id==C.id){B.push(this)
}});
break
}});
return B
},getFullTreeNode:function(C){var B=[];
this.each(function(){var H=this;
if(!H.grid||!H.p.treeGrid){return 
}switch(H.p.treeGridModel){case"nested":var F=parseInt(C.lft,10),E=parseInt(C.rgt,10),G=parseInt(C.level,10);
var D=C.rowIndex;
A(this.rows).slice(1).each(function(I){if(parseInt(this.level,10)>=G&&parseInt(this.lft,10)>=F&&parseInt(this.lft,10)<=E){B.push(this)
}});
break;
case"adjacency":break
}});
return B
},getNodeAncestors:function(C){var B=[];
this.each(function(){if(!this.grid||!this.p.treeGrid){return 
}var D=A(this).getNodeParent(C);
while(D){B.push(D);
D=A(this).getNodeParent(D)
}});
return B
},isVisibleNode:function(C){var B=true;
this.each(function(){var E=this;
if(!E.grid||!E.p.treeGrid){return 
}var D=A(E).getNodeAncestors(C);
A(D).each(function(){B=B&&this.expanded;
if(!B){return false
}})
});
return B
},isNodeLoaded:function(C){var B;
this.each(function(){var D=this;
if(!D.grid||!D.p.treeGrid){return 
}if(C.loaded!==undefined){B=C.loaded
}else{if(C.isLeaf||A(D).getNodeChildren(C).length>0){B=true
}else{B=false
}}});
return B
},expandNode:function(B){return this.each(function(){if(!this.grid||!this.p.treeGrid){return 
}if(!B.expanded){if(A(this).isNodeLoaded(B)){B.expanded=true;
A("div.treeclick",B).removeClass("tree-plus").addClass("tree-minus")
}else{B.expanded=true;
A("div.treeclick",B).removeClass("tree-plus").addClass("tree-minus");
this.p.treeANode=B.rowIndex;
this.p.datatype=this.p.treedatatype;
if(this.p.treeGridModel=="nested"){A(this).setGridParam({postData:{nodeid:B.id,n_left:B.lft,n_right:B.rgt,n_level:B.level}})
}else{A(this).setGridParam({postData:{nodeid:B.id,parentid:B.parent_id,n_level:B.level}})
}A(this).trigger("reloadGrid");
if(this.p.treeGridModel=="nested"){A(this).setGridParam({postData:{nodeid:"",n_left:"",n_right:"",n_level:""}})
}else{A(this).setGridParam({postData:{nodeid:"",parentid:"",n_level:""}})
}}}})
},collapseNode:function(B){return this.each(function(){if(!this.grid||!this.p.treeGrid){return 
}if(B.expanded){B.expanded=false;
A("div.treeclick",B).removeClass("tree-minus").addClass("tree-plus")
}})
},SortTree:function(B){return this.each(function(){if(!this.grid||!this.p.treeGrid){return 
}var H,E,C,G=[],F=A(this).getRootNodes();
F.sort(function(J,I){if(J.sortKey<I.sortKey){return -B
}if(J.sortKey>I.sortKey){return B
}return 0
});
for(H=0,E=F.length;
H<E;
H++){C=F[H];
G.push(C);
A(this).collectChildrenSortTree(G,C,B)
}var D=this;
A.each(G,function(I,J){A("tbody",D.grid.bDiv).append(J);
J.sortKey=null
})
})
},collectChildrenSortTree:function(D,C,B){return this.each(function(){if(!this.grid||!this.p.treeGrid){return 
}var G,E,H,F=A(this).getNodeChildren(C);
F.sort(function(J,I){if(J.sortKey<I.sortKey){return -B
}if(J.sortKey>I.sortKey){return B
}return 0
});
for(G=0,E=F.length;
G<E;
G++){H=F[G];
D.push(H);
A(this).collectChildrenSortTree(D,H,B)
}})
},setTreeRow:function(E,B){var D,C=false;
this.each(function(){var F=this;
if(!F.grid||!F.p.treeGrid){return 
}C=A(F).setRowData(E,B)
});
return C
},delTreeNode:function(B){return this.each(function(){var F=this;
if(!F.grid||!F.p.treeGrid){return 
}var D=A(F).getInd(F.rows,B,true);
if(D){var E=A(F).getNodeChildren(D);
if(E.length>0){for(var C=0;
C<E.length;
C++){A(F).delRowData(E[C].id)
}}A(F).delRowData(D.id)
}})
}})
})(jQuery);