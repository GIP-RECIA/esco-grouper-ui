(function(A){A.fn.extend({editRow:function(G,I,E,H,C,F,D,B){return this.each(function(){var R=this,M,S,O,P=0,L=null,K=[],N;
if(!R.grid){return 
}var J,Q,T;
N=A(R).getInd(R.rows,G);
if(N===false){return 
}O=A(R.rows[N]).attr("editable")||"0";
if(O=="0"){A("td",R.rows[N]).each(function(U){M=R.p.colModel[U].name;
T=R.p.colModel[U].hidden===true?true:false;
try{S=A.unformat(this,{colModel:R.p.colModel[U]},U)
}catch(W){S=A(this).html()
}K[M]=S;
if(M!=="cb"&&M!=="subgrid"&&R.p.colModel[U].editable===true&&!T){if(L===null){L=U
}A(this).html("");
var X=A.extend(R.p.colModel[U].editoptions||{},{id:G+"_"+M,name:M});
if(!R.p.colModel[U].edittype){R.p.colModel[U].edittype="text"
}var V=createEl(R.p.colModel[U].edittype,X,S,A(this));
A(V).addClass("editable");
A(this).append(V);
if(R.p.colModel[U].edittype=="select"&&R.p.colModel[U].editoptions.multiple===true&&A.browser.msie){A(V).width(A(V).width())
}P++
}});
if(P>0){K.id=G;
R.p.savedRow.push(K);
A(R.rows[N]).attr("editable","1");
if(I===true){A(R.rows[N]).bind("keydown",function(U){if(U.keyCode===27){A(R).restoreRow(G)
}if(U.keyCode===13){A(R).saveRow(G,H,C,F,D,B);
return false
}U.stopPropagation()
})
}if(A.isFunction(E)){E(G)
}}}})
},saveRow:function(D,C,F,G,E,B){return this.each(function(){var Q=this,K,R={},O={},N,I,H,L,M;
if(!Q.grid){return 
}M=A(Q).getInd(Q.rows,D);
if(M===false){return 
}N=A(Q.rows[M]).attr("editable");
F=F?F:Q.p.editurl;
if(N==="1"&&F){A("td",Q.rows[M]).each(function(T){K=Q.p.colModel[T].name;
if(K!=="cb"&&K!=="subgrid"&&Q.p.colModel[T].editable===true){if(Q.p.colModel[T].hidden===true){R[K]=A(this).html()
}else{switch(Q.p.colModel[T].edittype){case"checkbox":var S=["Yes","No"];
if(Q.p.colModel[T].editoptions){S=Q.p.colModel[T].editoptions.value.split(":")
}R[K]=A("input",this).attr("checked")?S[0]:S[1];
break;
case"text":case"password":case"textarea":R[K]=!Q.p.autoencode?A("input, textarea",this).val():htmlEncode(A("input, textarea",this).val());
break;
case"select":if(!Q.p.colModel[T].editoptions.multiple){R[K]=A("select>option:selected",this).val();
O[K]=A("select>option:selected",this).text()
}else{var U=A("select",this);
R[K]=A(U).val();
var V=[];
A("select > option:selected",this).each(function(W,X){V[W]=A(X).text()
});
O[K]=V.join(",")
}break
}H=checkValues(R[K],T,Q);
if(H[0]===false){H[1]=R[K]+" "+H[1];
return false
}}}});
if(H[0]===false){try{info_dialog(A.jgrid.errors.errcap,H[1],A.jgrid.edit.bClose,Q.p.imgpath)
}catch(J){alert(H[1])
}return 
}if(R){R.id=D;
if(G){R=A.extend({},R,G)
}}if(!Q.grid.hDiv.loading){Q.grid.hDiv.loading=true;
A("div.loading",Q.grid.hDiv).fadeIn("fast");
if(F=="clientArray"){R=A.extend({},R,O);
A(Q).setRowData(D,R);
A(Q.rows[M]).attr("editable","0");
for(var P=0;
P<Q.p.savedRow.length;
P++){if(Q.p.savedRow[P].id===D){I=P;
break
}}if(I>=0){Q.p.savedRow.splice(I,1)
}if(A.isFunction(E)){E(D,res.responseText)
}}else{A.ajax({url:F,data:R,type:"POST",complete:function(U,V){if(V==="success"){var T;
if(A.isFunction(C)){T=C(U)
}else{T=true
}if(T===true){R=A.extend({},R,O);
A(Q).setRowData(D,R);
A(Q.rows[M]).attr("editable","0");
for(var S=0;
S<Q.p.savedRow.length;
S++){if(Q.p.savedRow[S].id===D){I=S;
break
}}if(I>=0){Q.p.savedRow.splice(I,1)
}if(A.isFunction(E)){E(D,U.responseText)
}}else{A(Q).restoreRow(D)
}}},error:function(S,T){if(A.isFunction(B)){B(S,T)
}else{alert("Error Row: "+D+" Result: "+S.status+":"+S.statusText+" Status: "+T)
}}})
}Q.grid.hDiv.loading=false;
A("div.loading",Q.grid.hDiv).fadeOut("fast");
A(Q.rows[M]).unbind("keydown")
}}})
},restoreRow:function(B){return this.each(function(){var G=this,C,D,F;
if(!G.grid){return 
}F=A(G).getInd(G.rows,B);
if(F===false){return 
}for(var E=0;
E<G.p.savedRow.length;
E++){if(G.p.savedRow[E].id===B){D=E;
break
}}if(D>=0){A(G).setRowData(B,G.p.savedRow[D]);
A(G.rows[F]).attr("editable","0");
G.p.savedRow.splice(D,1)
}})
}})
})(jQuery);