(function(B){B.fn.extend({setColumns:function(A){A=B.extend({top:0,left:0,width:200,height:195,modal:false,drag:true,closeicon:"ico-close.gif",beforeShowForm:null,afterShowForm:null,afterSubmitForm:null},B.jgrid.col,A||{});
return this.each(function(){var V=this;
if(!V.grid){return 
}var T=typeof A.beforeShowForm==="function"?true:false;
var Q=typeof A.afterShowForm==="function"?true:false;
var P=typeof A.afterSubmitForm==="function"?true:false;
if(!A.imgpath){A.imgpath=V.p.imgpath
}var R=B("table:first",V.grid.bDiv).attr("id");
var O={themodal:"colmod"+R,modalhead:"colhd"+R,modalcontent:"colcnt"+R};
var M="ColTbl_"+R;
if(B("#"+O.themodal).html()!=null){if(T){A.beforeShowForm(B("#"+M))
}viewModal("#"+O.themodal,{modal:A.modal});
if(Q){A.afterShowForm(B("#"+M))
}}else{var U=B("<table id='"+M+"' class='ColTable'><tbody></tbody></table>");
for(i=0;
i<this.p.colNames.length;
i++){if(!V.p.colModel[i].hidedlg){B(U).append("<tr><td ><input type='checkbox' id='col_"+this.p.colModel[i].name+"' class='cbox' value='T' "+((this.p.colModel[i].hidden==undefined)?"checked":"")+"/><label for='col_"+this.p.colModel[i].name+"'>"+this.p.colNames[i]+"("+this.p.colModel[i].name+")</label></td></tr>")
}}var N="<input id='dData' type='button' value='"+A.bSubmit+"'/>";
var S="<input id='eData' type='button' value='"+A.bCancel+"'/>";
B(U).append("<tr><td class='ColButton'>"+N+"&nbsp;"+S+"</td></tr>");
createModal(O,U,A,V.grid.hDiv,V.grid.hDiv);
if(A.drag){DnRModal("#"+O.themodal,"#"+O.modalhead+" td.modaltext")
}B("#dData","#"+M).click(function(C){for(i=0;
i<V.p.colModel.length;
i++){if(!V.p.colModel[i].hidedlg){if(B("#col_"+V.p.colModel[i].name).attr("checked")){B(V).showCol(V.p.colModel[i].name);
B("#col_"+V.p.colModel[i].name).attr("defaultChecked",true)
}else{B(V).hideCol(V.p.colModel[i].name);
B("#col_"+V.p.colModel[i].name).attr("defaultChecked","")
}}}B("#"+O.themodal).jqmHide();
if(P){A.afterSubmitForm(B("#"+M))
}return false
});
B("#eData","#"+M).click(function(C){B("#"+O.themodal).jqmHide();
return false
});
if(T){A.beforeShowForm(B("#"+M))
}viewModal("#"+O.themodal,{modal:A.modal});
if(Q){A.afterShowForm(B("#"+M))
}}})
}})
})(jQuery);