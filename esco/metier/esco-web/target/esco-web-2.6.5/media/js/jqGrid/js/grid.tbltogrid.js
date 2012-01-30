function tableToGrid(A){$(A).each(function(){if(this.grid){return 
}$(this).width("99%");
var E=$(this).width();
var G=$("input[type=checkbox]:first",$(this));
var L=$("input[type=radio]:first",$(this));
var I=G.length>0;
var K=!I&&L.length>0;
var N=I||K;
var M=G.attr("name")||L.attr("name");
var B=[];
var F=[];
$("th",$(this)).each(function(){if(B.length==0&&N){B.push({name:"__selection__",index:"__selection__",width:0,hidden:true});
F.push("__selection__")
}else{B.push({name:$(this).html(),index:$(this).html(),width:$(this).width()||150});
F.push($(this).html())
}});
var J=[];
var D=[];
var C=[];
$("tbody > tr",$(this)).each(function(){var Q={};
var P=0;
J.push(Q);
$("td",$(this)).each(function(){if(P==0&&N){var R=$("input",$(this));
var S=R.attr("value");
D.push(S||J.length);
if(R.attr("checked")){C.push(S)
}Q[B[P].name]=R.attr("value")
}else{Q[B[P].name]=$(this).html()
}P++
})
});
$(this).empty();
$(this).addClass("scroll");
$(this).jqGrid({datatype:"local",width:E,colNames:F,colModel:B,multiselect:I});
for(var O=0;
O<J.length;
O++){var H=null;
if(D.length>0){H=D[O];
if(H&&H.replace){H=encodeURIComponent(H).replace(/[.\-%]/g,"_")
}}if(H==null){H=O+1
}$(this).addRowData(H,J[O])
}for(var O=0;
O<C.length;
O++){$(this).setSelection(C[O])
}})
};