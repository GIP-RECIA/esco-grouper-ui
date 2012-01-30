(function(A){A.fn.extend({setColumns:function(B){B=A.extend({top:0,left:0,width:200,height:195,modal:false,drag:true,closeicon:"ico-close.gif",beforeShowForm:null,afterShowForm:null,afterSubmitForm:null},A.jgrid.col,B||{});
return this.each(function(){var E=this;
if(!E.grid){return 
}var G=typeof B.beforeShowForm==="function"?true:false;
var J=typeof B.afterShowForm==="function"?true:false;
var K=typeof B.afterSubmitForm==="function"?true:false;
if(!B.imgpath){B.imgpath=E.p.imgpath
}var I=A("table:first",E.grid.bDiv).attr("id");
var L={themodal:"colmod"+I,modalhead:"colhd"+I,modalcontent:"colcnt"+I};
var D="ColTbl_"+I;
if(A("#"+L.themodal).html()!=null){if(G){B.beforeShowForm(A("#"+D))
}viewModal("#"+L.themodal,{modal:B.modal});
if(J){B.afterShowForm(A("#"+D))
}}else{var F=A("<table id='"+D+"' class='ColTable'><tbody></tbody></table>");
for(i=0;
i<this.p.colNames.length;
i++){if(!E.p.colModel[i].hidedlg){A(F).append("<tr><td ><input type='checkbox' id='col_"+this.p.colModel[i].name+"' class='cbox' value='T' "+((this.p.colModel[i].hidden==undefined)?"checked":"")+"/><label for='col_"+this.p.colModel[i].name+"'>"+this.p.colNames[i]+"("+this.p.colModel[i].name+")</label></td></tr>")
}}var C="<input id='dData' type='button' value='"+B.bSubmit+"'/>";
var H="<input id='eData' type='button' value='"+B.bCancel+"'/>";
A(F).append("<tr><td class='ColButton'>"+C+"&nbsp;"+H+"</td></tr>");
createModal(L,F,B,E.grid.hDiv,E.grid.hDiv);
if(B.drag){DnRModal("#"+L.themodal,"#"+L.modalhead+" td.modaltext")
}A("#dData","#"+D).click(function(M){for(i=0;
i<E.p.colModel.length;
i++){if(!E.p.colModel[i].hidedlg){if(A("#col_"+E.p.colModel[i].name).attr("checked")){A(E).showCol(E.p.colModel[i].name);
A("#col_"+E.p.colModel[i].name).attr("defaultChecked",true)
}else{A(E).hideCol(E.p.colModel[i].name);
A("#col_"+E.p.colModel[i].name).attr("defaultChecked","")
}}}A("#"+L.themodal).jqmHide();
if(K){B.afterSubmitForm(A("#"+D))
}return false
});
A("#eData","#"+D).click(function(M){A("#"+L.themodal).jqmHide();
return false
});
if(G){B.beforeShowForm(A("#"+D))
}viewModal("#"+L.themodal,{modal:B.modal});
if(J){B.afterShowForm(A("#"+D))
}}})
}})
})(jQuery);