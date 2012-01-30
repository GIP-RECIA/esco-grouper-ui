function tableToGrid(B){$(B).each(function(){if(this.grid){return 
}$(this).width("99%");
var b=$(this).width();
var Z=$("input[type=checkbox]:first",$(this));
var U=$("input[type=radio]:first",$(this));
var X=Z.length>0;
var V=!X&&U.length>0;
var S=X||V;
var T=Z.attr("name")||U.attr("name");
var Q=[];
var a=[];
$("th",$(this)).each(function(){if(Q.length==0&&S){Q.push({name:"__selection__",index:"__selection__",width:0,hidden:true});
a.push("__selection__")
}else{Q.push({name:$(this).html(),index:$(this).html(),width:$(this).width()||150});
a.push($(this).html())
}});
var W=[];
var A=[];
var P=[];
$("tbody > tr",$(this)).each(function(){var C={};
var D=0;
W.push(C);
$("td",$(this)).each(function(){if(D==0&&S){var F=$("input",$(this));
var E=F.attr("value");
A.push(E||W.length);
if(F.attr("checked")){P.push(E)
}C[Q[D].name]=F.attr("value")
}else{C[Q[D].name]=$(this).html()
}D++
})
});
$(this).empty();
$(this).addClass("scroll");
$(this).jqGrid({datatype:"local",width:b,colNames:a,colModel:Q,multiselect:X});
for(var R=0;
R<W.length;
R++){var Y=null;
if(A.length>0){Y=A[R];
if(Y&&Y.replace){Y=encodeURIComponent(Y).replace(/[.\-%]/g,"_")
}}if(Y==null){Y=R+1
}$(this).addRowData(Y,W[R])
}for(var R=0;
R<P.length;
R++){$(this).setSelection(P[R])
}})
};