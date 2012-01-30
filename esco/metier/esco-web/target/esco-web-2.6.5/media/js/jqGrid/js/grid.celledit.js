(function(A){A.fn.extend({editCell:function(C,B,E,D){return this.each(function(){var P=this,I,F,M;
if(!P.grid||P.p.cellEdit!==true){return 
}var J=null;
if(A.browser.msie&&A.browser.version<=7&&E===true&&D===true){B=G(P.rows[C],B)
}B=parseInt(B,10);
P.p.selrow=P.rows[C].id;
if(!P.p.knv){A(P).GridNav()
}if(P.p.savedRow.length>0){if(E===true){if(C==P.p.iRow&&B==P.p.iCol){return 
}}var N=A("td:eq("+P.p.savedRow[0].ic+")>#"+P.p.savedRow[0].id+"_"+P.p.savedRow[0].name.replace(".","\\."),P.rows[P.p.savedRow[0].id]).val();
if(P.p.savedRow[0].v!=N){A(P).saveCell(P.p.savedRow[0].id,P.p.savedRow[0].ic)
}else{A(P).restoreCell(P.p.savedRow[0].id,P.p.savedRow[0].ic)
}}else{window.setTimeout(function(){A("#"+P.p.knv).attr("tabindex","-1").focus()
},0)
}I=P.p.colModel[B].name;
if(I=="subgrid"){return 
}if(P.p.colModel[B].editable===true&&E===true){M=A("td:eq("+B+")",P.rows[C]);
if(parseInt(P.p.iCol)>=0&&parseInt(P.p.iRow)>=0){A("td:eq("+P.p.iCol+")",P.rows[P.p.iRow]).removeClass("edit-cell");
A(P.rows[P.p.iRow]).removeClass("selected-row")
}A(M).addClass("edit-cell");
A(P.rows[C]).addClass("selected-row");
try{F=A.unformat(M,{colModel:P.p.colModel[B]},B)
}catch(H){F=A(M).html()
}var L=A.extend(P.p.colModel[B].editoptions||{},{id:C+"_"+I,name:I});
if(!P.p.colModel[B].edittype){P.p.colModel[B].edittype="text"
}P.p.savedRow[0]={id:C,ic:B,name:I,v:F};
if(A.isFunction(P.p.formatCell)){var O=P.p.formatCell(P.rows[C].id,I,F,C,B);
if(O){F=O
}}var K=createEl(P.p.colModel[B].edittype,L,F,M);
if(A.isFunction(P.p.beforeEditCell)){P.p.beforeEditCell(P.rows[C].id,I,F,C,B)
}A(M).html("").append(K);
window.setTimeout(function(){A(K).focus()
},0);
A("input, select, textarea",M).bind("keydown",function(Q){if(Q.keyCode===27){A(P).restoreCell(C,B)
}if(Q.keyCode===13){A(P).saveCell(C,B)
}if(Q.keyCode==9){if(Q.shiftKey){A(P).prevCell(C,B)
}else{A(P).nextCell(C,B)
}}Q.stopPropagation()
});
if(A.isFunction(P.p.afterEditCell)){P.p.afterEditCell(P.rows[C].id,I,F,C,B)
}}else{if(parseInt(P.p.iCol)>=0&&parseInt(P.p.iRow)>=0){A("td:eq("+P.p.iCol+")",P.rows[P.p.iRow]).removeClass("edit-cell");
A(P.rows[P.p.iRow]).removeClass("selected-row")
}A("td:eq("+B+")",P.rows[C]).addClass("edit-cell");
A(P.rows[C]).addClass("selected-row");
if(A.isFunction(P.p.onSelectCell)){F=A("td:eq("+B+")",P.rows[C]).html().replace(/\&nbsp\;/ig,"");
P.p.onSelectCell(P.rows[C].id,I,F,C,B)
}}P.p.iCol=B;
P.p.iRow=C;
function G(R,U){var S=0;
var Q=0;
for(i=0;
i<R.cells.length;
i++){var T=R.cells(i);
if(T.style.display=="none"){S++
}else{Q++
}if(Q>U){return i
}}return i
}})
},saveCell:function(C,B){return this.each(function(){var G=this,O,I;
if(!G.grid||G.p.cellEdit!==true){return 
}if(G.p.savedRow.length==1){I=0
}else{I=null
}if(I!=null){var D=A("td:eq("+B+")",G.rows[C]),N,L;
O=G.p.colModel[B].name;
switch(G.p.colModel[B].edittype){case"select":N=A("#"+C+"_"+O.replace(".","\\.")+">option:selected",G.rows[C]).val();
L=A("#"+C+"_"+O.replace(".","\\.")+">option:selected",G.rows[C]).text();
break;
case"checkbox":var E=["Yes","No"];
if(G.p.colModel[B].editoptions){E=G.p.colModel[B].editoptions.value.split(":")
}N=A("#"+C+"_"+O.replace(".","\\."),G.rows[C]).attr("checked")?E[0]:E[1];
L=N;
break;
case"password":case"text":case"textarea":N=!G.p.autoencode?A("#"+C+"_"+O.replace(".","\\."),G.rows[C]).val():htmlEncode(A("#"+C+"_"+O.replace(".","\\."),G.rows[C]).val());
L=N;
break
}if(L!=G.p.savedRow[I].v){if(A.isFunction(G.p.beforeSaveCell)){var M=G.p.beforeSaveCell(G.rows[C].id,O,N,C,B);
if(M){N=M
}}var F=checkValues(N,B,G);
if(F[0]===true){var H={};
if(A.isFunction(G.p.beforeSubmitCell)){H=G.p.beforeSubmitCell(G.rows[C].id,O,N,C,B);
if(!H){H={}
}}if(G.p.cellsubmit=="remote"){if(G.p.cellurl){var K={};
K[O]=N;
K.id=G.rows[C].id;
K=A.extend(H,K);
A.ajax({url:G.p.cellurl,data:K,type:"POST",complete:function(P,R){if(R=="success"){if(A.isFunction(G.p.afterSubmitCell)){var Q=G.p.afterSubmitCell(P,K.id,O,N,C,B);
if(Q[0]===true){A(D).empty();
A(G).setCell(G.rows[C].id,B,L);
A(D).addClass("dirty-cell");
A(G.rows[C]).addClass("edited");
if(A.isFunction(G.p.afterSaveCell)){G.p.afterSaveCell(G.rows[C].id,O,N,C,B)
}G.p.savedRow=[]
}else{info_dialog(A.jgrid.errors.errcap,Q[1],A.jgrid.edit.bClose,G.p.imgpath);
A(G).restoreCell(C,B)
}}else{A(D).empty();
A(G).setCell(G.rows[C].id,B,L);
A(D).addClass("dirty-cell");
A(G.rows[C]).addClass("edited");
if(A.isFunction(G.p.afterSaveCell)){G.p.afterSaveCell(G.rows[C].id,O,N,C,B)
}G.p.savedRow=[]
}}},error:function(P,Q){if(A.isFunction(G.p.errorCell)){G.p.errorCell(P,Q);
A(G).restoreCell(C,B)
}else{info_dialog(A.jgrid.errors.errcap,P.status+" : "+P.statusText+"<br/>"+Q,A.jgrid.edit.bClose,G.p.imgpath);
A(G).restoreCell(C,B)
}}})
}else{try{info_dialog(A.jgrid.errors.errcap,A.jgrid.errors.nourl,A.jgrid.edit.bClose,G.p.imgpath);
A(G).restoreCell(C,B)
}catch(J){}}}if(G.p.cellsubmit=="clientArray"){A(D).empty();
A(G).setCell(G.rows[C].id,B,L);
A(D).addClass("dirty-cell");
A(G.rows[C]).addClass("edited");
if(A.isFunction(G.p.afterSaveCell)){G.p.afterSaveCell(G.rows[C].id,O,N,C,B)
}G.p.savedRow=[]
}}else{try{window.setTimeout(function(){info_dialog(A.jgrid.errors.errcap,N+" "+F[1],A.jgrid.edit.bClose,G.p.imgpath)
},100);
A(G).restoreCell(C,B)
}catch(J){}}}else{A(G).restoreCell(C,B)
}}if(A.browser.opera){A("#"+G.p.knv).attr("tabindex","-1").focus()
}else{window.setTimeout(function(){A("#"+G.p.knv).attr("tabindex","-1").focus()
},0)
}})
},restoreCell:function(C,B){return this.each(function(){var H=this,D,E;
if(!H.grid||H.p.cellEdit!==true){return 
}if(H.p.savedRow.length==1){E=0
}else{E=null
}if(E!=null){var G=A("td:eq("+B+")",H.rows[C]);
if(A.isFunction(A.fn.datepicker)){try{A.datepicker("hide")
}catch(F){try{A.datepicker.hideDatepicker()
}catch(F){}}}A(G).empty();
A(H).setCell(H.rows[C].id,B,H.p.savedRow[E].v);
H.p.savedRow=[]
}window.setTimeout(function(){A("#"+H.p.knv).attr("tabindex","-1").focus()
},0)
})
},nextCell:function(C,B){return this.each(function(){var G=this,F=false,E;
if(!G.grid||G.p.cellEdit!==true){return 
}for(var D=B+1;
D<G.p.colModel.length;
D++){if(G.p.colModel[D].editable===true){F=D;
break
}}if(F!==false){A(G).saveCell(C,B);
A(G).editCell(C,F,true)
}else{if(G.p.savedRow.length>0){A(G).saveCell(C,B)
}}})
},prevCell:function(C,B){return this.each(function(){var G=this,F=false,E;
if(!G.grid||G.p.cellEdit!==true){return 
}for(var D=B-1;
D>=0;
D--){if(G.p.colModel[D].editable===true){F=D;
break
}}if(F!==false){A(G).saveCell(C,B);
A(G).editCell(C,F,true)
}else{if(G.p.savedRow.length>0){A(G).saveCell(C,B)
}}})
},GridNav:function(){return this.each(function(){var C=this;
if(!C.grid||C.p.cellEdit!==true){return 
}C.p.knv=A("table:first",C.grid.bDiv).attr("id")+"_kn";
var B=A("<span style='width:0px;height:0px;background-color:black;' tabindex='0'><span tabindex='-1' style='width:0px;height:0px;background-color:grey' id='"+C.p.knv+"'></span></span>");
A(B).insertBefore(C.grid.cDiv);
A("#"+C.p.knv).focus();
A("#"+C.p.knv).keydown(function(G){switch(G.keyCode){case 38:if(C.p.iRow-1>=1){E(C.p.iRow-1,C.p.iCol,"vu");
A(C).editCell(C.p.iRow-1,C.p.iCol,false)
}break;
case 40:if(C.p.iRow+1<=C.rows.length-1){E(C.p.iRow+1,C.p.iCol,"vd");
A(C).editCell(C.p.iRow+1,C.p.iCol,false)
}break;
case 37:if(C.p.iCol-1>=0){var F=D(C.p.iCol-1,"lft");
E(C.p.iRow,F,"h");
A(C).editCell(C.p.iRow,F,false)
}break;
case 39:if(C.p.iCol+1<=C.p.colModel.length-1){var F=D(C.p.iCol+1,"rgt");
E(C.p.iRow,F,"h");
A(C).editCell(C.p.iRow,F,false)
}break;
case 13:if(parseInt(C.p.iCol,10)>=0&&parseInt(C.p.iRow,10)>=0){A(C).editCell(C.p.iRow,C.p.iCol,true)
}break
}return false
});
function E(G,P,F){if(F.substr(0,1)=="v"){var J=A(C.grid.bDiv)[0].clientHeight,H=A(C.grid.bDiv)[0].scrollTop,I=C.rows[G].offsetTop+C.rows[G].clientHeight,N=C.rows[G].offsetTop;
if(F=="vd"){if(I>=J){A(C.grid.bDiv)[0].scrollTop=A(C.grid.bDiv)[0].scrollTop+C.rows[G].clientHeight
}}if(F=="vu"){if(N<H){A(C.grid.bDiv)[0].scrollTop=A(C.grid.bDiv)[0].scrollTop-C.rows[G].clientHeight
}}}if(F=="h"){var M=A(C.grid.bDiv)[0].clientWidth,L=A(C.grid.bDiv)[0].scrollLeft,K=C.rows[G].cells[P].offsetLeft+C.rows[G].cells[P].clientWidth,O=C.rows[G].cells[P].offsetLeft;
if(K>=M+parseInt(L)){A(C.grid.bDiv)[0].scrollLeft=A(C.grid.bDiv)[0].scrollLeft+C.rows[G].cells[P].clientWidth
}else{if(O<L){A(C.grid.bDiv)[0].scrollLeft=A(C.grid.bDiv)[0].scrollLeft-C.rows[G].cells[P].clientWidth
}}}}function D(I,F){var H,G;
if(F=="lft"){H=I+1;
for(G=I;
G>=0;
G--){if(C.p.colModel[G].hidden!==true){H=G;
break
}}}if(F=="rgt"){H=I-1;
for(G=I;
G<C.p.colModel.length;
G++){if(C.p.colModel[G].hidden!==true){H=G;
break
}}}return H
}})
},getChangedCells:function(C){var B=[];
if(!C){C="all"
}this.each(function(){var D=this;
if(!D.grid||D.p.cellEdit!==true){return 
}A(D.rows).slice(1).each(function(E){var F={};
if(A(this).hasClass("edited")){A("td",this).each(function(G){nm=D.p.colModel[G].name;
if(nm!=="cb"&&nm!=="subgrid"){if(C=="dirty"){if(A(this).hasClass("dirty-cell")){F[nm]=A.htmlDecode(A(this).html())
}}else{F[nm]=A.htmlDecode(A(this).html())
}}});
F.id=this.id;
B.push(F)
}})
});
return B
}})
})(jQuery);