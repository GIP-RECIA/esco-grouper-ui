(function(A){A.fn.extend({getColProp:function(F){var D={},C=this[0];
if(!C.grid){return 
}var B=C.p.colModel;
for(var E=0;
E<B.length;
E++){if(B[E].name==F){D=B[E];
break
}}return D
},setColProp:function(C,B){return this.each(function(){if(this.grid){if(B){var E=this.p.colModel;
for(var D=0;
D<E.length;
D++){if(E[D].name==C){A.extend(this.p.colModel[D],B);
break
}}}}})
},sortGrid:function(C,B){return this.each(function(){var G=this,D=-1;
if(!G.grid){return 
}if(!C){C=G.p.sortname
}for(var F=0;
F<G.p.colModel.length;
F++){if(G.p.colModel[F].index==C||G.p.colModel[F].name==C){D=F;
break
}}if(D!=-1){var E=G.p.colModel[D].sortable;
if(typeof E!=="boolean"){E=true
}if(typeof B!=="boolean"){B=false
}if(E){G.sortData("jqgh_"+C,D,B)
}}})
},GridDestroy:function(){return this.each(function(){if(this.grid){if(this.p.pager){A(this.p.pager).remove()
}var C=this.id;
A("#lui_"+C).remove();
try{A("#editmod"+C).remove();
A("#delmod"+C).remove();
A("#srchmod"+C).remove()
}catch(B){}A(this.grid.bDiv).remove();
A(this.grid.hDiv).remove();
A(this.grid.cDiv).remove();
if(this.p.toolbar[0]){A(this.grid.uDiv).remove()
}this.p=null;
this.grid=null
}})
},GridUnload:function(){return this.each(function(){if(!this.grid){return 
}var C={id:A(this).attr("id"),cl:A(this).attr("class")};
if(this.p.pager){A(this.p.pager).empty()
}var D=document.createElement("table");
A(D).attr({id:C.id});
D.className=C.cl;
var B=this.id;
A("#lui_"+B).remove();
try{A("#editmod"+B).remove();
A("#delmod"+B).remove();
A("#srchmod"+B).remove()
}catch(E){}if(this.p.toolbar[0]){A(this.grid.uDiv).remove()
}A(this.grid.cDiv).remove();
A(this.grid.bDiv).remove();
A(this.grid.hDiv).before(D).remove();
this.p=null;
this.grid=null
})
},filterGrid:function(C,B){B=A.extend({gridModel:false,gridNames:false,gridToolbar:false,filterModel:[],formtype:"horizontal",autosearch:true,formclass:"filterform",tableclass:"filtertable",buttonclass:"filterbutton",searchButton:"Search",clearButton:"Clear",enableSearch:false,enableClear:false,beforeSearch:null,afterSearch:null,beforeClear:null,afterClear:null,url:"",marksearched:true},B||{});
return this.each(function(){var L=this;
this.p=B;
if(this.p.filterModel.length==0&&this.p.gridModel===false){alert("No filter is set");
return 
}if(!C){alert("No target grid is set!");
return 
}this.p.gridid=C.indexOf("#")!=-1?C:"#"+C;
var D=A(this.p.gridid).getGridParam("colModel");
if(D){if(this.p.gridModel===true){var E=A(this.p.gridid)[0];
var G;
A.each(D,function(N,O){var M=[];
this.search=this.search===false?false:true;
if(this.editrules&&this.editrules.searchhidden===true){G=true
}else{if(this.hidden===true){G=false
}else{G=true
}}if(this.search===true&&G===true){if(L.p.gridNames===true){M.label=E.p.colNames[N]
}else{M.label=""
}M.name=this.name;
M.index=this.index||this.name;
M.stype=this.edittype||"text";
if(M.stype!="select"||M.stype!="select"){M.stype="text"
}M.defval=this.defval||"";
M.surl=this.surl||"";
M.sopt=this.editoptions||{};
M.width=this.width;
L.p.filterModel.push(M)
}})
}else{A.each(L.p.filterModel,function(N,O){for(var M=0;
M<D.length;
M++){if(this.name==D[M].name){this.index=D[M].index||this.name;
break
}}if(!this.index){this.index=this.name
}})
}}else{alert("Could not get grid colModel");
return 
}var H=function(){var P={},O=0,M;
var N=A(L.p.gridid)[0];
if(A.isFunction(L.p.beforeSearch)){L.p.beforeSearch()
}A.each(L.p.filterModel,function(U,S){switch(this.stype){case"select":M=A("select[name="+this.name+"]",L).val();
if(M){P[this.index]=M;
if(L.p.marksearched){A("#jqgh_"+this.name,N.grid.hDiv).addClass("dirty-cell")
}O++
}else{if(L.p.marksearched){A("#jqgh_"+this.name,N.grid.hDiv).removeClass("dirty-cell")
}try{delete N.p.postData[this.index]
}catch(T){}}break;
default:M=A("input[name="+this.name+"]",L).val();
if(M){P[this.index]=M;
if(L.p.marksearched){A("#jqgh_"+this.name,N.grid.hDiv).addClass("dirty-cell")
}O++
}else{if(L.p.marksearched){A("#jqgh_"+this.name,N.grid.hDiv).removeClass("dirty-cell")
}try{delete N.p.postData[this.index]
}catch(T){}}}});
var Q=O>0?true:false;
N.p.postData=A.extend(N.p.postData,P);
var R;
if(L.p.url){R=A(N).getGridParam("url");
A(N).setGridParam({url:L.p.url})
}A(N).setGridParam({search:Q,page:1}).trigger("reloadGrid");
if(R){A(N).setGridParam({url:R})
}if(A.isFunction(L.p.afterSearch)){L.p.afterSearch()
}};
var K=function(){var P={},M,O=0;
var N=A(L.p.gridid)[0];
if(A.isFunction(L.p.beforeClear)){L.p.beforeClear()
}A.each(L.p.filterModel,function(U,T){M=(this.defval)?this.defval:"";
if(!this.stype){this.stype=="text"
}switch(this.stype){case"select":if(M){var S;
A("select[name="+this.name+"] option",L).each(function(){if(A(this).text()==M){this.selected=true;
S=A(this).val();
return false
}});
P[this.index]=S||"";
if(L.p.marksearched){A("#jqgh_"+this.name,N.grid.hDiv).addClass("dirty-cell")
}O++
}else{if(L.p.marksearched){A("#jqgh_"+this.name,N.grid.hDiv).removeClass("dirty-cell")
}try{delete N.p.postData[this.index]
}catch(V){}}break;
case"text":A("input[name="+this.name+"]",L).val(M);
if(M){P[this.index]=M;
if(L.p.marksearched){A("#jqgh_"+this.name,N.grid.hDiv).addClass("dirty-cell")
}O++
}else{if(L.p.marksearched){A("#jqgh_"+this.name,N.grid.hDiv).removeClass("dirty-cell")
}try{delete N.p.postData[this.index]
}catch(V){}}}});
var Q=O>0?true:false;
N.p.postData=A.extend(N.p.postData,P);
var R;
if(L.p.url){R=A(N).getGridParam("url");
A(N).setGridParam({url:L.p.url})
}A(N).setGridParam({search:Q,page:1}).trigger("reloadGrid");
if(R){A(N).setGridParam({url:R})
}if(A.isFunction(L.p.afterClear)){L.p.afterClear()
}};
var I=function(){var Q=document.createElement("tr");
var N,S,M,O,R,P;
if(L.p.formtype=="horizontal"){A(F).append(Q)
}A.each(L.p.filterModel,function(U,Y){O=document.createElement("td");
A(O).append("<label for='"+this.name+"'>"+this.label+"</label>");
R=document.createElement("td");
var T=this;
if(!this.stype){this.stype="text"
}switch(this.stype){case"select":if(this.surl){A(R).load(this.surl,function(){if(T.defval){A("select",this).val(T.defval)
}A("select",this).attr({name:T.name,id:"sg_"+T.name});
if(T.sopt){A("select",this).attr(T.sopt)
}if(L.p.gridToolbar===true&&T.width){A("select",this).width(T.width)
}if(L.p.autosearch===true){A("select",this).change(function(c){H();
return false
})
}})
}else{if(T.sopt.value){var X=T.sopt.value.split(";"),W,a;
var Z=document.createElement("select");
A(Z).attr({name:T.name,id:"sg_"+T.name}).attr(T.sopt);
for(var b=0;
b<X.length;
b++){W=X[b].split(":");
a=document.createElement("option");
a.value=W[0];
a.innerHTML=W[1];
if(W[1]==T.defval){a.selected="selected"
}Z.appendChild(a)
}if(L.p.gridToolbar===true&&T.width){A(Z).width(T.width)
}A(R).append(Z);
if(L.p.autosearch===true){A(Z).change(function(c){H();
return false
})
}}}break;
case"text":var V=this.defval?this.defval:"";
A(R).append("<input type='text' name='"+this.name+"' id='sg_"+this.name+"' value='"+V+"'/>");
if(T.sopt){A("input",R).attr(T.sopt)
}if(L.p.gridToolbar===true&&T.width){if(A.browser.msie){A("input",R).width(T.width-4)
}else{A("input",R).width(T.width-2)
}}if(L.p.autosearch===true){A("input",R).keypress(function(d){var c=d.charCode?d.charCode:d.keyCode?d.keyCode:0;
if(c==13){H();
return false
}return this
})
}break
}if(L.p.formtype=="horizontal"){if(L.p.gridToolbar===true&&L.p.gridNames===false){A(Q).append(R)
}else{A(Q).append(O).append(R)
}A(Q).append(R)
}else{N=document.createElement("tr");
A(N).append(O).append(R);
A(F).append(N)
}});
R=document.createElement("td");
if(L.p.enableSearch===true){S="<input type='button' id='sButton' class='"+L.p.buttonclass+"' value='"+L.p.searchButton+"'/>";
A(R).append(S);
A("input#sButton",R).click(function(){H();
return false
})
}if(L.p.enableClear===true){M="<input type='button' id='cButton' class='"+L.p.buttonclass+"' value='"+L.p.clearButton+"'/>";
A(R).append(M);
A("input#cButton",R).click(function(){K();
return false
})
}if(L.p.enableClear===true||L.p.enableSearch===true){if(L.p.formtype=="horizontal"){A(Q).append(R)
}else{N=document.createElement("tr");
A(N).append("<td>&nbsp;</td>").append(R);
A(F).append(N)
}}};
var J=A("<form name='SearchForm' style=display:inline;' class='"+this.p.formclass+"'></form>");
var F=A("<table class='"+this.p.tableclass+"' cellspacing='0' cellpading='0' border='0'><tbody></tbody></table>");
A(J).append(F);
I();
A(this).append(J);
this.triggerSearch=function(){H()
};
this.clearSearch=function(){K()
}
})
}})
})(jQuery);