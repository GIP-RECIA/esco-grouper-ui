(function(B){B.fn.extend({editCell:function(G,H,A,F){return this.each(function(){var C=this,U,X,Q;
if(!C.grid||C.p.cellEdit!==true){return 
}var T=null;
if(B.browser.msie&&B.browser.version<=7&&A===true&&F===true){H=W(C.rows[G],H)
}H=parseInt(H,10);
C.p.selrow=C.rows[G].id;
if(!C.p.knv){B(C).GridNav()
}if(C.p.savedRow.length>0){if(A===true){if(G==C.p.iRow&&H==C.p.iCol){return 
}}var E=B("td:eq("+C.p.savedRow[0].ic+")>#"+C.p.savedRow[0].id+"_"+C.p.savedRow[0].name.replace(".","\\."),C.rows[C.p.savedRow[0].id]).val();
if(C.p.savedRow[0].v!=E){B(C).saveCell(C.p.savedRow[0].id,C.p.savedRow[0].ic)
}else{B(C).restoreCell(C.p.savedRow[0].id,C.p.savedRow[0].ic)
}}else{window.setTimeout(function(){B("#"+C.p.knv).attr("tabindex","-1").focus()
},0)
}U=C.p.colModel[H].name;
if(U=="subgrid"){return 
}if(C.p.colModel[H].editable===true&&A===true){Q=B("td:eq("+H+")",C.rows[G]);
if(parseInt(C.p.iCol)>=0&&parseInt(C.p.iRow)>=0){B("td:eq("+C.p.iCol+")",C.rows[C.p.iRow]).removeClass("edit-cell");
B(C.rows[C.p.iRow]).removeClass("selected-row")
}B(Q).addClass("edit-cell");
B(C.rows[G]).addClass("selected-row");
try{X=B.unformat(Q,{colModel:C.p.colModel[H]},H)
}catch(V){X=B(Q).html()
}var R=B.extend(C.p.colModel[H].editoptions||{},{id:G+"_"+U,name:U});
if(!C.p.colModel[H].edittype){C.p.colModel[H].edittype="text"
}C.p.savedRow[0]={id:G,ic:H,name:U,v:X};
if(B.isFunction(C.p.formatCell)){var D=C.p.formatCell(C.rows[G].id,U,X,G,H);
if(D){X=D
}}var S=createEl(C.p.colModel[H].edittype,R,X,Q);
if(B.isFunction(C.p.beforeEditCell)){C.p.beforeEditCell(C.rows[G].id,U,X,G,H)
}B(Q).html("").append(S);
window.setTimeout(function(){B(S).focus()
},0);
B("input, select, textarea",Q).bind("keydown",function(I){if(I.keyCode===27){B(C).restoreCell(G,H)
}if(I.keyCode===13){B(C).saveCell(G,H)
}if(I.keyCode==9){if(I.shiftKey){B(C).prevCell(G,H)
}else{B(C).nextCell(G,H)
}}I.stopPropagation()
});
if(B.isFunction(C.p.afterEditCell)){C.p.afterEditCell(C.rows[G].id,U,X,G,H)
}}else{if(parseInt(C.p.iCol)>=0&&parseInt(C.p.iRow)>=0){B("td:eq("+C.p.iCol+")",C.rows[C.p.iRow]).removeClass("edit-cell");
B(C.rows[C.p.iRow]).removeClass("selected-row")
}B("td:eq("+H+")",C.rows[G]).addClass("edit-cell");
B(C.rows[G]).addClass("selected-row");
if(B.isFunction(C.p.onSelectCell)){X=B("td:eq("+H+")",C.rows[G]).html().replace(/\&nbsp\;/ig,"");
C.p.onSelectCell(C.rows[G].id,U,X,G,H)
}}C.p.iCol=H;
C.p.iRow=G;
function W(L,I){var K=0;
var M=0;
for(i=0;
i<L.cells.length;
i++){var J=L.cells(i);
if(J.style.display=="none"){K++
}else{M++
}if(M>I){return i
}}return i
}})
},saveCell:function(A,D){return this.each(function(){var X=this,P,V;
if(!X.grid||X.p.cellEdit!==true){return 
}if(X.p.savedRow.length==1){V=0
}else{V=null
}if(V!=null){var C=B("td:eq("+D+")",X.rows[A]),Q,S;
P=X.p.colModel[D].name;
switch(X.p.colModel[D].edittype){case"select":Q=B("#"+A+"_"+P.replace(".","\\.")+">option:selected",X.rows[A]).val();
S=B("#"+A+"_"+P.replace(".","\\.")+">option:selected",X.rows[A]).text();
break;
case"checkbox":var Z=["Yes","No"];
if(X.p.colModel[D].editoptions){Z=X.p.colModel[D].editoptions.value.split(":")
}Q=B("#"+A+"_"+P.replace(".","\\."),X.rows[A]).attr("checked")?Z[0]:Z[1];
S=Q;
break;
case"password":case"text":case"textarea":Q=!X.p.autoencode?B("#"+A+"_"+P.replace(".","\\."),X.rows[A]).val():htmlEncode(B("#"+A+"_"+P.replace(".","\\."),X.rows[A]).val());
S=Q;
break
}if(S!=X.p.savedRow[V].v){if(B.isFunction(X.p.beforeSaveCell)){var R=X.p.beforeSaveCell(X.rows[A].id,P,Q,A,D);
if(R){Q=R
}}var Y=checkValues(Q,D,X);
if(Y[0]===true){var W={};
if(B.isFunction(X.p.beforeSubmitCell)){W=X.p.beforeSubmitCell(X.rows[A].id,P,Q,A,D);
if(!W){W={}
}}if(X.p.cellsubmit=="remote"){if(X.p.cellurl){var T={};
T[P]=Q;
T.id=X.rows[A].id;
T=B.extend(W,T);
B.ajax({url:X.p.cellurl,data:T,type:"POST",complete:function(G,E){if(E=="success"){if(B.isFunction(X.p.afterSubmitCell)){var F=X.p.afterSubmitCell(G,T.id,P,Q,A,D);
if(F[0]===true){B(C).empty();
B(X).setCell(X.rows[A].id,D,S);
B(C).addClass("dirty-cell");
B(X.rows[A]).addClass("edited");
if(B.isFunction(X.p.afterSaveCell)){X.p.afterSaveCell(X.rows[A].id,P,Q,A,D)
}X.p.savedRow=[]
}else{info_dialog(B.jgrid.errors.errcap,F[1],B.jgrid.edit.bClose,X.p.imgpath);
B(X).restoreCell(A,D)
}}else{B(C).empty();
B(X).setCell(X.rows[A].id,D,S);
B(C).addClass("dirty-cell");
B(X.rows[A]).addClass("edited");
if(B.isFunction(X.p.afterSaveCell)){X.p.afterSaveCell(X.rows[A].id,P,Q,A,D)
}X.p.savedRow=[]
}}},error:function(F,E){if(B.isFunction(X.p.errorCell)){X.p.errorCell(F,E);
B(X).restoreCell(A,D)
}else{info_dialog(B.jgrid.errors.errcap,F.status+" : "+F.statusText+"<br/>"+E,B.jgrid.edit.bClose,X.p.imgpath);
B(X).restoreCell(A,D)
}}})
}else{try{info_dialog(B.jgrid.errors.errcap,B.jgrid.errors.nourl,B.jgrid.edit.bClose,X.p.imgpath);
B(X).restoreCell(A,D)
}catch(U){}}}if(X.p.cellsubmit=="clientArray"){B(C).empty();
B(X).setCell(X.rows[A].id,D,S);
B(C).addClass("dirty-cell");
B(X.rows[A]).addClass("edited");
if(B.isFunction(X.p.afterSaveCell)){X.p.afterSaveCell(X.rows[A].id,P,Q,A,D)
}X.p.savedRow=[]
}}else{try{window.setTimeout(function(){info_dialog(B.jgrid.errors.errcap,Q+" "+Y[1],B.jgrid.edit.bClose,X.p.imgpath)
},100);
B(X).restoreCell(A,D)
}catch(U){}}}else{B(X).restoreCell(A,D)
}}if(B.browser.opera){B("#"+X.p.knv).attr("tabindex","-1").focus()
}else{window.setTimeout(function(){B("#"+X.p.knv).attr("tabindex","-1").focus()
},0)
}})
},restoreCell:function(A,D){return this.each(function(){var C=this,L,K;
if(!C.grid||C.p.cellEdit!==true){return 
}if(C.p.savedRow.length==1){K=0
}else{K=null
}if(K!=null){var I=B("td:eq("+D+")",C.rows[A]);
if(B.isFunction(B.fn.datepicker)){try{B.datepicker("hide")
}catch(J){try{B.datepicker.hideDatepicker()
}catch(J){}}}B(I).empty();
B(C).setCell(C.rows[A].id,D,C.p.savedRow[K].v);
C.p.savedRow=[]
}window.setTimeout(function(){B("#"+C.p.knv).attr("tabindex","-1").focus()
},0)
})
},nextCell:function(A,D){return this.each(function(){var C=this,H=false,I;
if(!C.grid||C.p.cellEdit!==true){return 
}for(var J=D+1;
J<C.p.colModel.length;
J++){if(C.p.colModel[J].editable===true){H=J;
break
}}if(H!==false){B(C).saveCell(A,D);
B(C).editCell(A,H,true)
}else{if(C.p.savedRow.length>0){B(C).saveCell(A,D)
}}})
},prevCell:function(A,D){return this.each(function(){var C=this,H=false,I;
if(!C.grid||C.p.cellEdit!==true){return 
}for(var J=D-1;
J>=0;
J--){if(C.p.colModel[J].editable===true){H=J;
break
}}if(H!==false){B(C).saveCell(A,D);
B(C).editCell(A,H,true)
}else{if(C.p.savedRow.length>0){B(C).saveCell(A,D)
}}})
},GridNav:function(){return this.each(function(){var G=this;
if(!G.grid||G.p.cellEdit!==true){return 
}G.p.knv=B("table:first",G.grid.bDiv).attr("id")+"_kn";
var H=B("<span style='width:0px;height:0px;background-color:black;' tabindex='0'><span tabindex='-1' style='width:0px;height:0px;background-color:grey' id='"+G.p.knv+"'></span></span>");
B(H).insertBefore(G.grid.cDiv);
B("#"+G.p.knv).focus();
B("#"+G.p.knv).keydown(function(C){switch(C.keyCode){case 38:if(G.p.iRow-1>=1){A(G.p.iRow-1,G.p.iCol,"vu");
B(G).editCell(G.p.iRow-1,G.p.iCol,false)
}break;
case 40:if(G.p.iRow+1<=G.rows.length-1){A(G.p.iRow+1,G.p.iCol,"vd");
B(G).editCell(G.p.iRow+1,G.p.iCol,false)
}break;
case 37:if(G.p.iCol-1>=0){var D=F(G.p.iCol-1,"lft");
A(G.p.iRow,D,"h");
B(G).editCell(G.p.iRow,D,false)
}break;
case 39:if(G.p.iCol+1<=G.p.colModel.length-1){var D=F(G.p.iCol+1,"rgt");
A(G.p.iRow,D,"h");
B(G).editCell(G.p.iRow,D,false)
}break;
case 13:if(parseInt(G.p.iCol,10)>=0&&parseInt(G.p.iRow,10)>=0){B(G).editCell(G.p.iRow,G.p.iCol,true)
}break
}return false
});
function A(W,C,X){if(X.substr(0,1)=="v"){var T=B(G.grid.bDiv)[0].clientHeight,V=B(G.grid.bDiv)[0].scrollTop,U=G.rows[W].offsetTop+G.rows[W].clientHeight,E=G.rows[W].offsetTop;
if(X=="vd"){if(U>=T){B(G.grid.bDiv)[0].scrollTop=B(G.grid.bDiv)[0].scrollTop+G.rows[W].clientHeight
}}if(X=="vu"){if(E<V){B(G.grid.bDiv)[0].scrollTop=B(G.grid.bDiv)[0].scrollTop-G.rows[W].clientHeight
}}}if(X=="h"){var Q=B(G.grid.bDiv)[0].clientWidth,R=B(G.grid.bDiv)[0].scrollLeft,S=G.rows[W].cells[C].offsetLeft+G.rows[W].cells[C].clientWidth,D=G.rows[W].cells[C].offsetLeft;
if(S>=Q+parseInt(R)){B(G.grid.bDiv)[0].scrollLeft=B(G.grid.bDiv)[0].scrollLeft+G.rows[W].cells[C].clientWidth
}else{if(D<R){B(G.grid.bDiv)[0].scrollLeft=B(G.grid.bDiv)[0].scrollLeft-G.rows[W].cells[C].clientWidth
}}}}function F(C,J){var D,E;
if(J=="lft"){D=C+1;
for(E=C;
E>=0;
E--){if(G.p.colModel[E].hidden!==true){D=E;
break
}}}if(J=="rgt"){D=C-1;
for(E=C;
E<G.p.colModel.length;
E++){if(G.p.colModel[E].hidden!==true){D=E;
break
}}}return D
}})
},getChangedCells:function(A){var D=[];
if(!A){A="all"
}this.each(function(){var C=this;
if(!C.grid||C.p.cellEdit!==true){return 
}B(C.rows).slice(1).each(function(H){var G={};
if(B(this).hasClass("edited")){B("td",this).each(function(E){nm=C.p.colModel[E].name;
if(nm!=="cb"&&nm!=="subgrid"){if(A=="dirty"){if(B(this).hasClass("dirty-cell")){G[nm]=B.htmlDecode(B(this).html())
}}else{G[nm]=B.htmlDecode(B(this).html())
}}});
G.id=this.id;
D.push(G)
}})
});
return D
}})
})(jQuery);