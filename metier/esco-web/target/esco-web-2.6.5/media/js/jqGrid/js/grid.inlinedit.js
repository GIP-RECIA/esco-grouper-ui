(function(B){B.fn.extend({editRow:function(K,A,M,J,O,L,N,P){return this.each(function(){var E=this,U,D,H,G=0,V=null,W=[],I;
if(!E.grid){return 
}var X,F,C;
I=B(E).getInd(E.rows,K);
if(I===false){return 
}H=B(E.rows[I]).attr("editable")||"0";
if(H=="0"){B("td",E.rows[I]).each(function(S){U=E.p.colModel[S].name;
C=E.p.colModel[S].hidden===true?true:false;
try{D=B.unformat(this,{colModel:E.p.colModel[S]},S)
}catch(Q){D=B(this).html()
}W[U]=D;
if(U!=="cb"&&U!=="subgrid"&&E.p.colModel[S].editable===true&&!C){if(V===null){V=S
}B(this).html("");
var T=B.extend(E.p.colModel[S].editoptions||{},{id:K+"_"+U,name:U});
if(!E.p.colModel[S].edittype){E.p.colModel[S].edittype="text"
}var R=createEl(E.p.colModel[S].edittype,T,D,B(this));
B(R).addClass("editable");
B(this).append(R);
if(E.p.colModel[S].edittype=="select"&&E.p.colModel[S].editoptions.multiple===true&&B.browser.msie){B(R).width(B(R).width())
}G++
}});
if(G>0){W.id=K;
E.p.savedRow.push(W);
B(E.rows[I]).attr("editable","1");
if(A===true){B(E.rows[I]).bind("keydown",function(Q){if(Q.keyCode===27){B(E).restoreRow(K)
}if(Q.keyCode===13){B(E).saveRow(K,J,O,L,N,P);
return false
}Q.stopPropagation()
})
}if(B.isFunction(M)){M(K)
}}}})
},saveRow:function(J,K,H,A,I,L){return this.each(function(){var D=this,U,C={},F={},G,W,X,T,S;
if(!D.grid){return 
}S=B(D).getInd(D.rows,J);
if(S===false){return 
}G=B(D.rows[S]).attr("editable");
H=H?H:D.p.editurl;
if(G==="1"&&H){B("td",D.rows[S]).each(function(O){U=D.p.colModel[O].name;
if(U!=="cb"&&U!=="subgrid"&&D.p.colModel[O].editable===true){if(D.p.colModel[O].hidden===true){C[U]=B(this).html()
}else{switch(D.p.colModel[O].edittype){case"checkbox":var P=["Yes","No"];
if(D.p.colModel[O].editoptions){P=D.p.colModel[O].editoptions.value.split(":")
}C[U]=B("input",this).attr("checked")?P[0]:P[1];
break;
case"text":case"password":case"textarea":C[U]=!D.p.autoencode?B("input, textarea",this).val():htmlEncode(B("input, textarea",this).val());
break;
case"select":if(!D.p.colModel[O].editoptions.multiple){C[U]=B("select>option:selected",this).val();
F[U]=B("select>option:selected",this).text()
}else{var N=B("select",this);
C[U]=B(N).val();
var M=[];
B("select > option:selected",this).each(function(Q,R){M[Q]=B(R).text()
});
F[U]=M.join(",")
}break
}X=checkValues(C[U],O,D);
if(X[0]===false){X[1]=C[U]+" "+X[1];
return false
}}}});
if(X[0]===false){try{info_dialog(B.jgrid.errors.errcap,X[1],B.jgrid.edit.bClose,D.p.imgpath)
}catch(V){alert(X[1])
}return 
}if(C){C.id=J;
if(A){C=B.extend({},C,A)
}}if(!D.grid.hDiv.loading){D.grid.hDiv.loading=true;
B("div.loading",D.grid.hDiv).fadeIn("fast");
if(H=="clientArray"){C=B.extend({},C,F);
B(D).setRowData(J,C);
B(D.rows[S]).attr("editable","0");
for(var E=0;
E<D.p.savedRow.length;
E++){if(D.p.savedRow[E].id===J){W=E;
break
}}if(W>=0){D.p.savedRow.splice(W,1)
}if(B.isFunction(I)){I(J,res.responseText)
}}else{B.ajax({url:H,data:C,type:"POST",complete:function(N,M){if(M==="success"){var O;
if(B.isFunction(K)){O=K(N)
}else{O=true
}if(O===true){C=B.extend({},C,F);
B(D).setRowData(J,C);
B(D.rows[S]).attr("editable","0");
for(var P=0;
P<D.p.savedRow.length;
P++){if(D.p.savedRow[P].id===J){W=P;
break
}}if(W>=0){D.p.savedRow.splice(W,1)
}if(B.isFunction(I)){I(J,N.responseText)
}}else{B(D).restoreRow(J)
}}},error:function(N,M){if(B.isFunction(L)){L(N,M)
}else{alert("Error Row: "+J+" Result: "+N.status+":"+N.statusText+" Status: "+M)
}}})
}D.grid.hDiv.loading=false;
B("div.loading",D.grid.hDiv).fadeOut("fast");
B(D.rows[S]).unbind("keydown")
}}})
},restoreRow:function(A){return this.each(function(){var H=this,L,K,I;
if(!H.grid){return 
}I=B(H).getInd(H.rows,A);
if(I===false){return 
}for(var J=0;
J<H.p.savedRow.length;
J++){if(H.p.savedRow[J].id===A){K=J;
break
}}if(K>=0){B(H).setRowData(A,H.p.savedRow[K]);
B(H.rows[I]).attr("editable","0");
H.p.savedRow.splice(K,1)
}})
}})
})(jQuery);