(function(B){B.fn.extend({getColProp:function(A){var H={},I=this[0];
if(!I.grid){return 
}var J=I.p.colModel;
for(var G=0;
G<J.length;
G++){if(J[G].name==A){H=J[G];
break
}}return H
},setColProp:function(A,D){return this.each(function(){if(this.grid){if(D){var C=this.p.colModel;
for(var F=0;
F<C.length;
F++){if(C[F].name==A){B.extend(this.p.colModel[F],D);
break
}}}}})
},sortGrid:function(A,D){return this.each(function(){var C=this,J=-1;
if(!C.grid){return 
}if(!A){A=C.p.sortname
}for(var H=0;
H<C.p.colModel.length;
H++){if(C.p.colModel[H].index==A||C.p.colModel[H].name==A){J=H;
break
}}if(J!=-1){var I=C.p.colModel[J].sortable;
if(typeof I!=="boolean"){I=true
}if(typeof D!=="boolean"){D=false
}if(I){C.sortData("jqgh_"+A,J,D)
}}})
},GridDestroy:function(){return this.each(function(){if(this.grid){if(this.p.pager){B(this.p.pager).remove()
}var A=this.id;
B("#lui_"+A).remove();
try{B("#editmod"+A).remove();
B("#delmod"+A).remove();
B("#srchmod"+A).remove()
}catch(D){}B(this.grid.bDiv).remove();
B(this.grid.hDiv).remove();
B(this.grid.cDiv).remove();
if(this.p.toolbar[0]){B(this.grid.uDiv).remove()
}this.p=null;
this.grid=null
}})
},GridUnload:function(){return this.each(function(){if(!this.grid){return 
}var G={id:B(this).attr("id"),cl:B(this).attr("class")};
if(this.p.pager){B(this.p.pager).empty()
}var F=document.createElement("table");
B(F).attr({id:G.id});
F.className=G.cl;
var H=this.id;
B("#lui_"+H).remove();
try{B("#editmod"+H).remove();
B("#delmod"+H).remove();
B("#srchmod"+H).remove()
}catch(A){}if(this.p.toolbar[0]){B(this.grid.uDiv).remove()
}B(this.grid.cDiv).remove();
B(this.grid.bDiv).remove();
B(this.grid.hDiv).before(F).remove();
this.p=null;
this.grid=null
})
},filterGrid:function(A,D){D=B.extend({gridModel:false,gridNames:false,gridToolbar:false,filterModel:[],formtype:"horizontal",autosearch:true,formclass:"filterform",tableclass:"filtertable",buttonclass:"filterbutton",searchButton:"Search",clearButton:"Clear",enableSearch:false,enableClear:false,beforeSearch:null,afterSearch:null,beforeClear:null,afterClear:null,url:"",marksearched:true},D||{});
return this.each(function(){var M=this;
this.p=D;
if(this.p.filterModel.length==0&&this.p.gridModel===false){alert("No filter is set");
return 
}if(!A){alert("No target grid is set!");
return 
}this.p.gridid=A.indexOf("#")!=-1?A:"#"+A;
var C=B(this.p.gridid).getGridParam("colModel");
if(C){if(this.p.gridModel===true){var T=B(this.p.gridid)[0];
var R;
B.each(C,function(F,E){var G=[];
this.search=this.search===false?false:true;
if(this.editrules&&this.editrules.searchhidden===true){R=true
}else{if(this.hidden===true){R=false
}else{R=true
}}if(this.search===true&&R===true){if(M.p.gridNames===true){G.label=T.p.colNames[F]
}else{G.label=""
}G.name=this.name;
G.index=this.index||this.name;
G.stype=this.edittype||"text";
if(G.stype!="select"||G.stype!="select"){G.stype="text"
}G.defval=this.defval||"";
G.surl=this.surl||"";
G.sopt=this.editoptions||{};
G.width=this.width;
M.p.filterModel.push(G)
}})
}else{B.each(M.p.filterModel,function(F,E){for(var G=0;
G<C.length;
G++){if(this.name==C[G].name){this.index=C[G].index||this.name;
break
}}if(!this.index){this.index=this.name
}})
}}else{alert("Could not get grid colModel");
return 
}var Q=function(){var G={},H=0,J;
var I=B(M.p.gridid)[0];
if(B.isFunction(M.p.beforeSearch)){M.p.beforeSearch()
}B.each(M.p.filterModel,function(K,V){switch(this.stype){case"select":J=B("select[name="+this.name+"]",M).val();
if(J){G[this.index]=J;
if(M.p.marksearched){B("#jqgh_"+this.name,I.grid.hDiv).addClass("dirty-cell")
}H++
}else{if(M.p.marksearched){B("#jqgh_"+this.name,I.grid.hDiv).removeClass("dirty-cell")
}try{delete I.p.postData[this.index]
}catch(L){}}break;
default:J=B("input[name="+this.name+"]",M).val();
if(J){G[this.index]=J;
if(M.p.marksearched){B("#jqgh_"+this.name,I.grid.hDiv).addClass("dirty-cell")
}H++
}else{if(M.p.marksearched){B("#jqgh_"+this.name,I.grid.hDiv).removeClass("dirty-cell")
}try{delete I.p.postData[this.index]
}catch(L){}}}});
var F=H>0?true:false;
I.p.postData=B.extend(I.p.postData,G);
var E;
if(M.p.url){E=B(I).getGridParam("url");
B(I).setGridParam({url:M.p.url})
}B(I).setGridParam({search:F,page:1}).trigger("reloadGrid");
if(E){B(I).setGridParam({url:E})
}if(B.isFunction(M.p.afterSearch)){M.p.afterSearch()
}};
var N=function(){var G={},J,H=0;
var I=B(M.p.gridid)[0];
if(B.isFunction(M.p.beforeClear)){M.p.beforeClear()
}B.each(M.p.filterModel,function(L,W){J=(this.defval)?this.defval:"";
if(!this.stype){this.stype=="text"
}switch(this.stype){case"select":if(J){var X;
B("select[name="+this.name+"] option",M).each(function(){if(B(this).text()==J){this.selected=true;
X=B(this).val();
return false
}});
G[this.index]=X||"";
if(M.p.marksearched){B("#jqgh_"+this.name,I.grid.hDiv).addClass("dirty-cell")
}H++
}else{if(M.p.marksearched){B("#jqgh_"+this.name,I.grid.hDiv).removeClass("dirty-cell")
}try{delete I.p.postData[this.index]
}catch(K){}}break;
case"text":B("input[name="+this.name+"]",M).val(J);
if(J){G[this.index]=J;
if(M.p.marksearched){B("#jqgh_"+this.name,I.grid.hDiv).addClass("dirty-cell")
}H++
}else{if(M.p.marksearched){B("#jqgh_"+this.name,I.grid.hDiv).removeClass("dirty-cell")
}try{delete I.p.postData[this.index]
}catch(K){}}}});
var F=H>0?true:false;
I.p.postData=B.extend(I.p.postData,G);
var E;
if(M.p.url){E=B(I).getGridParam("url");
B(I).setGridParam({url:M.p.url})
}B(I).setGridParam({search:F,page:1}).trigger("reloadGrid");
if(E){B(I).setGridParam({url:E})
}if(B.isFunction(M.p.afterClear)){M.p.afterClear()
}};
var P=function(){var G=document.createElement("tr");
var J,E,K,I,F,H;
if(M.p.formtype=="horizontal"){B(S).append(G)
}B.each(M.p.filterModel,function(g,c){I=document.createElement("td");
B(I).append("<label for='"+this.name+"'>"+this.label+"</label>");
F=document.createElement("td");
var h=this;
if(!this.stype){this.stype="text"
}switch(this.stype){case"select":if(this.surl){B(F).load(this.surl,function(){if(h.defval){B("select",this).val(h.defval)
}B("select",this).attr({name:h.name,id:"sg_"+h.name});
if(h.sopt){B("select",this).attr(h.sopt)
}if(M.p.gridToolbar===true&&h.width){B("select",this).width(h.width)
}if(M.p.autosearch===true){B("select",this).change(function(U){Q();
return false
})
}})
}else{if(h.sopt.value){var d=h.sopt.value.split(";"),e,j;
var L=document.createElement("select");
B(L).attr({name:h.name,id:"sg_"+h.name}).attr(h.sopt);
for(var i=0;
i<d.length;
i++){e=d[i].split(":");
j=document.createElement("option");
j.value=e[0];
j.innerHTML=e[1];
if(e[1]==h.defval){j.selected="selected"
}L.appendChild(j)
}if(M.p.gridToolbar===true&&h.width){B(L).width(h.width)
}B(F).append(L);
if(M.p.autosearch===true){B(L).change(function(U){Q();
return false
})
}}}break;
case"text":var f=this.defval?this.defval:"";
B(F).append("<input type='text' name='"+this.name+"' id='sg_"+this.name+"' value='"+f+"'/>");
if(h.sopt){B("input",F).attr(h.sopt)
}if(M.p.gridToolbar===true&&h.width){if(B.browser.msie){B("input",F).width(h.width-4)
}else{B("input",F).width(h.width-2)
}}if(M.p.autosearch===true){B("input",F).keypress(function(U){var V=U.charCode?U.charCode:U.keyCode?U.keyCode:0;
if(V==13){Q();
return false
}return this
})
}break
}if(M.p.formtype=="horizontal"){if(M.p.gridToolbar===true&&M.p.gridNames===false){B(G).append(F)
}else{B(G).append(I).append(F)
}B(G).append(F)
}else{J=document.createElement("tr");
B(J).append(I).append(F);
B(S).append(J)
}});
F=document.createElement("td");
if(M.p.enableSearch===true){E="<input type='button' id='sButton' class='"+M.p.buttonclass+"' value='"+M.p.searchButton+"'/>";
B(F).append(E);
B("input#sButton",F).click(function(){Q();
return false
})
}if(M.p.enableClear===true){K="<input type='button' id='cButton' class='"+M.p.buttonclass+"' value='"+M.p.clearButton+"'/>";
B(F).append(K);
B("input#cButton",F).click(function(){N();
return false
})
}if(M.p.enableClear===true||M.p.enableSearch===true){if(M.p.formtype=="horizontal"){B(G).append(F)
}else{J=document.createElement("tr");
B(J).append("<td>&nbsp;</td>").append(F);
B(S).append(J)
}}};
var O=B("<form name='SearchForm' style=display:inline;' class='"+this.p.formclass+"'></form>");
var S=B("<table class='"+this.p.tableclass+"' cellspacing='0' cellpading='0' border='0'><tbody></tbody></table>");
B(O).append(S);
P();
B(this).append(O);
this.triggerSearch=function(){Q()
};
this.clearSearch=function(){N()
}
})
}})
})(jQuery);