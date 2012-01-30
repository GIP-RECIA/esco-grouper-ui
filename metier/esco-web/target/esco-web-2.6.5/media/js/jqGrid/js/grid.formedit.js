(function(D){var C=null;
D.fn.extend({searchGrid:function(A){A=D.extend({top:0,left:0,width:360,height:80,modal:false,drag:true,closeicon:"ico-close.gif",dirty:false,sField:"searchField",sValue:"searchString",sOper:"searchOper",processData:"",checkInput:false,beforeShowSearch:null,afterShowSearch:null,onInitializeSearch:null,closeAfterSearch:false,closeOnEscape:false,sopt:null},D.jgrid.search,A||{});
return this.each(function(){var g=this;
if(!g.grid){return 
}if(!A.imgpath){A.imgpath=g.p.imgpath
}var a=D("table:first",g.grid.bDiv).attr("id");
var e={themodal:"srchmod"+a,modalhead:"srchhead"+a,modalcontent:"srchcnt"+a};
if(D("#"+e.themodal).html()!=null){if(D.isFunction(A.beforeShowSearch)){A.beforeShowSearch(D("#srchcnt"+a))
}viewModal("#"+e.themodal,{modal:A.modal});
if(D.isFunction(A.afterShowSearch)){A.afterShowSearch(D("#srchcnt"+a))
}}else{var f=g.p.colModel;
var V="<select id='snames' class='search'>";
var U,Z,Y;
for(var b=0;
b<f.length;
b++){U=f[b].name;
Y=(f[b].search===false)?false:true;
if(f[b].editrules&&f[b].editrules.searchhidden===true){Z=true
}else{if(f[b].hidden===true){Z=false
}else{Z=true
}}if(U!=="cb"&&U!=="subgrid"&&Y&&Z===true){var T=(f[b].index)?f[b].index:U;
V+="<option value='"+T+"'>"+g.p.colNames[b]+"</option>"
}}V+="</select>";
var X=A.sopt||["bw","eq","ne","lt","le","gt","ge","ew","cn"];
var B="<select id='sopt' class='search'>";
for(var b=0;
b<X.length;
b++){B+=X[b]=="eq"?"<option value='eq'>"+A.odata[0]+"</option>":"";
B+=X[b]=="ne"?"<option value='ne'>"+A.odata[1]+"</option>":"";
B+=X[b]=="lt"?"<option value='lt'>"+A.odata[2]+"</option>":"";
B+=X[b]=="le"?"<option value='le'>"+A.odata[3]+"</option>":"";
B+=X[b]=="gt"?"<option value='gt'>"+A.odata[4]+"</option>":"";
B+=X[b]=="ge"?"<option value='ge'>"+A.odata[5]+"</option>":"";
B+=X[b]=="bw"?"<option value='bw'>"+A.odata[6]+"</option>":"";
B+=X[b]=="ew"?"<option value='ew'>"+A.odata[7]+"</option>":"";
B+=X[b]=="cn"?"<option value='cn'>"+A.odata[8]+"</option>":""
}B+="</select>";
var W="<input id='sval' class='search' type='text' size='20' maxlength='100'/>";
var d="<input id='sbut' class='buttonsearch' type='button' value='"+A.Find+"'/>";
var c="<input id='sreset' class='buttonsearch' type='button' value='"+A.Reset+"'/>";
var h=D("<table width='100%'><tbody><tr style='display:none' id='srcherr'><td colspan='5'></td></tr><tr><td>"+V+"</td><td>"+B+"</td><td>"+W+"</td><td>"+d+"</td><td>"+c+"</td></tr></tbody></table>");
createModal(e,h,A,g.grid.hDiv,g.grid.hDiv);
if(D.isFunction(A.onInitializeSearch)){A.onInitializeSearch(D("#srchcnt"+a))
}if(D.isFunction(A.beforeShowSearch)){A.beforeShowSearch(D("#srchcnt"+a))
}viewModal("#"+e.themodal,{modal:A.modal});
if(D.isFunction(A.afterShowSearch)){A.afterShowSearch(D("#srchcnt"+a))
}if(A.drag){DnRModal("#"+e.themodal,"#"+e.modalhead+" td.modaltext")
}D("#sbut","#"+e.themodal).click(function(){if(D("#sval","#"+e.themodal).val()!=""){var E=[true,"",""];
D("#srcherr >td","#srchcnt"+a).html("").hide();
g.p.searchdata[A.sField]=D("option[selected]","#snames").val();
g.p.searchdata[A.sOper]=D("option[selected]","#sopt").val();
g.p.searchdata[A.sValue]=D("#sval","#"+e.modalcontent).val();
if(A.checkInput){for(var F=0;
F<f.length;
F++){var G=(f[F].index)?f[F].index:U;
if(G==g.p.searchdata[A.sField]){break
}}E=checkValues(g.p.searchdata[A.sValue],F,g)
}if(E[0]===true){g.p.search=true;
if(A.dirty){D(".no-dirty-cell",g.p.pager).addClass("dirty-cell")
}g.p.page=1;
D(g).trigger("reloadGrid");
if(A.closeAfterSearch===true){hideModal("#"+e.themodal)
}}else{D("#srcherr >td","#srchcnt"+a).html(E[1]).show()
}}});
D("#sreset","#"+e.themodal).click(function(){if(g.p.search){D("#srcherr >td","#srchcnt"+a).html("").hide();
g.p.search=false;
g.p.searchdata={};
g.p.page=1;
D("#sval","#"+e.themodal).val("");
if(A.dirty){D(".no-dirty-cell",g.p.pager).removeClass("dirty-cell")
}D(g).trigger("reloadGrid")
}})
}})
},editGridRow:function(B,A){A=D.extend({top:0,left:0,width:0,height:0,modal:false,drag:true,closeicon:"ico-close.gif",imgpath:"",url:null,mtype:"POST",closeAfterAdd:false,clearAfterAdd:true,closeAfterEdit:false,reloadAfterSubmit:true,onInitializeForm:null,beforeInitData:null,beforeShowForm:null,afterShowForm:null,beforeSubmit:null,afterSubmit:null,onclickSubmit:null,afterComplete:null,onclickPgButtons:null,afterclickPgButtons:null,editData:{},recreateForm:false,closeOnEscape:false,addedrow:"first"},D.jgrid.edit,A||{});
C=A;
return this.each(function(){var k=this;
if(!k.grid||!B){return 
}if(!A.imgpath){A.imgpath=k.p.imgpath
}var o=D("table:first",k.grid.bDiv).attr("id"),w={themodal:"editmod"+o,modalhead:"edithd"+o,modalcontent:"editcnt"+o},AC=D.isFunction(C.beforeShowForm)?C.beforeShowForm:false,q=D.isFunction(C.afterShowForm)?C.afterShowForm:false,g=D.isFunction(C.beforeInitData)?C.beforeInitData:false,AB=D.isFunction(C.onInitializeForm)?C.onInitializeForm:false,y=1,v,l="FrmGrid_"+o,j="TblGrid_"+o;
if(B=="new"){B="_empty";
A.caption=A.addCaption
}else{A.caption=A.editCaption
}if(A.recreateForm===true&&D("#"+w.themodal).html()!=null){D("#"+w.themodal).remove()
}if(D("#"+w.themodal).html()!=null){D(".modaltext","#"+w.modalhead).html(A.caption);
D("#FormError","#"+j).hide();
if(g){g(D("#"+l))
}t(B,k);
if(B=="_empty"){D("#pData, #nData","#"+j).hide()
}else{D("#pData, #nData","#"+j).show()
}if(AC){AC(D("#"+l))
}if(A.processing===true){A.processing=false;
D("#sData","#"+j).attr("disabled",false);
D("div.loading","#"+w.themodal).hide()
}viewModal("#"+w.themodal,{modal:A.modal});
if(q){q(D("#"+l))
}}else{D(k.p.colModel).each(function(E){y=Math.max(y,this.formoptions?this.formoptions.colpos||0:0)
});
var m,h=D("<form name='FormPost' id='"+l+"' class='FormGrid'></form>"),u=D("<table id='"+j+"' class='EditTable' cellspacing='0' cellpading='0' border='0'><tbody></tbody></table>");
D(h).append(u);
m=D("<tr id='FormError' style='display:none'><td colspan='"+(y*2)+"'></td></tr>");
m[0].rp=0;
D(u).append(m);
if(g){g(D("#"+l))
}var AA=s(B,k,u,y),i=k.p.imgpath,f="<img id='pData' src='"+i+k.p.previmg+"'/>",AD="<img id='nData' src='"+i+k.p.nextimg+"'/>",n="<input id='sData' type='button' class='EditButton' value='"+A.bSubmit+"'/>",e="<input id='cData' type='button'  class='EditButton' value='"+A.bCancel+"'/>";
m=D("<tr id='Act_Buttons'><td class='navButton'>"+f+"&nbsp;"+AD+"</td><td colspan='"+(y*2-1)+"'class='EditButton'>"+n+"&nbsp;"+e+"</td></tr>");
m[0].rp=AA.length+100;
D(u).append(m);
if(y>1){var z=[];
D.each(D(u)[0].rows,function(F,E){z[F]=E
});
z.sort(function(E,F){if(E.rp>F.rp){return 1
}if(E.rp<F.rp){return -1
}return 0
});
D.each(z,function(F,E){D("tbody",u).append(E)
})
}createModal(w,h,A,k.grid.hDiv,k.grid.hDiv);
if(AB){AB(D("#"+l))
}if(A.drag){DnRModal("#"+w.themodal,"#"+w.modalhead+" td.modaltext")
}if(B=="_empty"){D("#pData,#nData","#"+j).hide()
}else{D("#pData,#nData","#"+j).show()
}if(AC){AC(D("#"+l))
}viewModal("#"+w.themodal,{modal:A.modal});
if(q){q(D("#"+l))
}D("#sData","#"+j).click(function(F){var G={},H=[true,"",""],E={};
D("#FormError","#"+j).hide();
var I=0;
D(".FormElement","#"+j).each(function(M){var N=true;
switch(D(this).get(0).type){case"checkbox":if(D(this).attr("checked")){G[this.name]=D(this).val()
}else{var K=D(this).attr("offval");
G[this.name]=K;
E[this.name]=K
}break;
case"select-one":G[this.name]=D("option:selected",this).val();
E[this.name]=D("option:selected",this).text();
break;
case"select-multiple":G[this.name]=D(this).val();
var L=[];
D("option:selected",this).each(function(P,O){L[P]=D(O).text()
});
E[this.name]=L.join(",");
break;
case"password":case"text":case"textarea":G[this.name]=D(this).val();
H=checkValues(G[this.name],AA[M],k);
if(H[0]===false){N=false
}else{G[this.name]=!k.p.autoencode?G[this.name]:htmlEncode(G[this.name])
}break
}I++;
if(!N){return false
}});
if(I==0){H[0]=false;
H[1]=D.jgrid.errors.norecords
}if(D.isFunction(C.onclickSubmit)){C.editData=C.onclickSubmit(A)||{}
}if(H[0]){if(D.isFunction(C.beforeSubmit)){H=C.beforeSubmit(G,D("#"+l))
}}var J=C.url?C.url:k.p.editurl;
if(H[0]){if(!J){H[0]=false;
H[1]+=" "+D.jgrid.errors.nourl
}}if(H[0]===false){D("#FormError>td","#"+j).html(H[1]);
D("#FormError","#"+j).show()
}else{if(!A.processing){A.processing=true;
D("div.loading","#"+w.themodal).show();
D(this).attr("disabled",true);
G.oper=G.id=="_empty"?"add":"edit";
G=D.extend(G,C.editData);
D.ajax({url:J,type:C.mtype,data:G,complete:function(K,L){if(L!="success"){H[0]=false;
H[1]=L+" Status: "+K.statusText+" Error code: "+K.status
}else{if(D.isFunction(C.afterSubmit)){H=C.afterSubmit(K,G)
}}if(H[0]===false){D("#FormError>td","#"+j).html(H[1]);
D("#FormError","#"+j).show()
}else{G=D.extend(G,E);
if(G.id=="_empty"){if(!H[2]){H[2]=parseInt(D(k).getGridParam("records"))+1
}G.id=H[2];
if(C.closeAfterAdd){if(C.reloadAfterSubmit){D(k).trigger("reloadGrid")
}else{D(k).addRowData(H[2],G,A.addedrow);
D(k).setSelection(H[2])
}hideModal("#"+w.themodal)
}else{if(C.clearAfterAdd){if(C.reloadAfterSubmit){D(k).trigger("reloadGrid")
}else{D(k).addRowData(H[2],G,A.addedrow)
}D(".FormElement","#"+j).each(function(M){switch(D(this).get(0).type){case"checkbox":D(this).attr("checked",0);
break;
case"select-one":case"select-multiple":D("option",this).attr("selected","");
break;
case"password":case"text":case"textarea":if(this.name=="id"){D(this).val("_empty")
}else{D(this).val("")
}break
}});
t("_empty",k)
}else{if(C.reloadAfterSubmit){D(k).trigger("reloadGrid")
}else{D(k).addRowData(H[2],G,A.addedrow)
}}}}else{if(C.reloadAfterSubmit){D(k).trigger("reloadGrid");
if(!C.closeAfterEdit){D(k).setSelection(G.id)
}}else{if(k.p.treeGrid===true){D(k).setTreeRow(G.id,G)
}else{D(k).setRowData(G.id,G)
}}if(C.closeAfterEdit){hideModal("#"+w.themodal)
}}if(D.isFunction(C.afterComplete)){v=K;
setTimeout(function(){C.afterComplete(v,G,D("#"+l));
v=null
},500)
}}A.processing=false;
D("#sData","#"+j).attr("disabled",false);
D("div.loading","#"+w.themodal).hide()
},error:function(M,L,K){D("#FormError>td","#"+j).html(L+" : "+K);
D("#FormError","#"+j).show();
A.processing=false;
D("#sData","#"+j).attr("disabled",false);
D("div.loading","#"+w.themodal).hide()
}})
}}F.stopPropagation();
return false
});
D("#cData","#"+j).click(function(E){hideModal("#"+w.themodal);
E.stopPropagation();
return false
});
D("#nData","#"+j).click(function(F){D("#FormError","#"+j).hide();
var E=x();
E[0]=parseInt(E[0]);
if(E[0]!=-1&&E[1][E[0]+1]){if(D.isFunction(A.onclickPgButtons)){A.onclickPgButtons("next",D("#"+l),E[1][E[0]])
}t(E[1][E[0]+1],k);
D(k).setSelection(E[1][E[0]+1]);
if(D.isFunction(A.afterclickPgButtons)){A.afterclickPgButtons("next",D("#"+l),E[1][E[0]+1])
}r(E[0]+1,E[1].length-1)
}return false
});
D("#pData","#"+j).click(function(E){D("#FormError","#"+j).hide();
var F=x();
if(F[0]!=-1&&F[1][F[0]-1]){if(D.isFunction(A.onclickPgButtons)){A.onclickPgButtons("prev",D("#"+l),F[1][F[0]])
}t(F[1][F[0]-1],k);
D(k).setSelection(F[1][F[0]-1]);
if(D.isFunction(A.afterclickPgButtons)){A.afterclickPgButtons("prev",D("#"+l),F[1][F[0]-1])
}r(F[0]-1,F[1].length-1)
}return false
})
}var p=x();
r(p[0],p[1].length-1);
function r(F,E,G){var H=k.p.imgpath;
if(F==0){D("#pData","#"+j).attr("src",H+"off-"+k.p.previmg)
}else{D("#pData","#"+j).attr("src",H+k.p.previmg)
}if(F==E){D("#nData","#"+j).attr("src",H+"off-"+k.p.nextimg)
}else{D("#nData","#"+j).attr("src",H+k.p.nextimg)
}}function x(){var F=D(k).getDataIDs();
var G=D("#id_g","#"+j).val();
var E=D.inArray(G,F);
return[E,F]
}function s(T,O,Q,J){var V,U,M,G,W,L=0,H,F,N,I=[],P=false,S="<td class='CaptionTD'>&nbsp;</td><td class='DataTD'>&nbsp;</td>",R="";
for(var K=1;
K<=J;
K++){R+=S
}P=D(O).getInd(O.rows,T);
D(O.p.colModel).each(function(Y){V=this.name;
if(this.editrules&&this.editrules.edithidden==true){U=false
}else{U=this.hidden===true?true:false
}F=U?"style='display:none'":"";
if(V!=="cb"&&V!=="subgrid"&&this.editable===true){if(P===false){H=""
}else{if(V==O.p.ExpandColumn&&O.p.treeGrid===true){H=D("td:eq("+Y+")",O.rows[P]).text()
}else{try{H=D.unformat(D("td:eq("+Y+")",O.rows[P]),{colModel:this},Y)
}catch(b){H=D("td:eq("+Y+")",O.rows[P]).html()
}}}var Z=D.extend({},this.editoptions||{},{id:V,name:V}),a=D.extend({},{elmprefix:"",elmsuffix:""},this.formoptions||{}),X=parseInt(a.rowpos)||L+1,c=parseInt((parseInt(a.colpos)||1)*2);
if(T=="_empty"&&Z.defaultValue){H=D.isFunction(Z.defaultValue)?Z.defaultValue():Z.defaultValue
}if(!this.edittype){this.edittype="text"
}N=createEl(this.edittype,Z,H);
D(N).addClass("FormElement");
M=D(u).find("tr[rowpos="+X+"]");
if(M.length==0){M=D("<tr "+F+" rowpos='"+X+"'></tr>").addClass("FormData").attr("id","tr_"+V);
D(M).append(R);
D(Q).append(M);
M[0].rp=X
}D("td:eq("+(c-2)+")",M[0]).html(typeof a.label==="undefined"?O.p.colNames[Y]:a.label);
D("td:eq("+(c-1)+")",M[0]).append(a.elmprefix).append(N).append(a.elmsuffix);
I[L]=Y;
L++
}});
if(L>0){var E=D("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+(J*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='"+T+"'/></td></tr>");
E[0].rp=L+99;
D(Q).append(E)
}return I
}function t(G,F){var K,E,H=0,I,J;
D("#"+G+" td",F.grid.bDiv).each(function(L){K=F.p.colModel[L].name;
if(F.p.colModel[L].editrules&&F.p.colModel[L].editrules.edithidden===true){E=false
}else{E=F.p.colModel[L].hidden===true?true:false
}if(K!=="cb"&&K!=="subgrid"&&F.p.colModel[L].editable===true){if(K==F.p.ExpandColumn&&F.p.treeGrid===true){I=D(this).text()
}else{try{I=D.unformat(this,{colModel:F.p.colModel[L]},L)
}catch(M){I=D(this).html()
}}K=K.replace(".","\\.");
J=D.extend({},F.p.colModel[L].editoptions||{});
if(G=="_empty"&&J.defaultValue){I=D.isFunction(J.defaultValue)?J.defaultValue():J.defaultValue
}switch(F.p.colModel[L].edittype){case"password":case"text":D("#"+K,"#"+j).val(I);
break;
case"textarea":if(I=="&nbsp;"||I=="&#160;"||(I.length==1&&I.charCodeAt(0)==160)){I=""
}D("#"+K,"#"+j).val(I);
break;
case"select":D("#"+K+" option","#"+j).each(function(N){if(!J.multiple&&I==D(this).text()){this.selected=true
}else{if(J.multiple){if(D.inArray(D(this).text(),I.split(","))>-1){this.selected=true
}else{this.selected=false
}}else{this.selected=false
}}});
break;
case"checkbox":if(I==D("#"+K,"#"+j).val()){D("#"+K,"#"+j).attr("checked",true);
D("#"+K,"#"+j).attr("defaultChecked",true)
}else{D("#"+K,"#"+j).attr("checked",false);
D("#"+K,"#"+j).attr("defaultChecked","")
}break
}if(E){D("#"+K,"#"+j).parents("tr:first").hide()
}H++
}});
if(H>0){D("#id_g","#"+j).val(G)
}else{D("#id_g","#"+j).val("")
}return H
}})
},viewGridRow:function(B,A){A=D.extend({top:0,left:0,width:0,height:0,modal:false,drag:true,closeicon:"ico-close.gif",imgpath:"",closeOnEscape:false,labelswidth:"30%"},D.jgrid.view,A||{});
return this.each(function(){var b=this;
if(!b.grid||!B){return 
}if(!A.imgpath){A.imgpath=b.p.imgpath
}var h=D("table:first",b.grid.bDiv).attr("id"),o={themodal:"viewmod"+h,modalhead:"viewhd"+h,modalcontent:"viewcnt"+h},q=1,Z="ViewGrid_"+h,g="ViewTbl_"+h;
if(D("#"+o.themodal).html()!=null){D(".modaltext","#"+o.modalhead).html(A.caption);
D("#FormError","#"+g).hide();
l(B,b);
viewModal("#"+o.themodal,{modal:A.modal});
n()
}else{D(b.p.colModel).each(function(E){q=Math.max(q,this.formoptions?this.formoptions.colpos||0:0)
});
var c,t=D("<form name='FormPost' id='"+Z+"' class='FormGrid'></form>"),m=D("<table id='"+g+"' class='EditTable' cellspacing='0' cellpading='2' border='0' style='table-layout:fixed'><tbody></tbody></table>");
D(t).append(m);
var d=k(B,b,m,q),a=b.p.imgpath,f="<img id='pData' src='"+a+b.p.previmg+"'/>",e="<img id='nData' src='"+a+b.p.nextimg+"'/>",s="<input id='cData' type='button'  class='EditButton' value='"+A.bClose+"'/>";
c=D("<tr id='Act_Buttons'><td class='navButton'>"+f+"&nbsp;"+e+"</td><td colspan='"+(q*2-1)+"'class='EditButton'>"+s+"</td></tr>");
c[0].rp=d.length+100;
D(m).append(c);
if(q>1){var r=[];
D.each(D(m)[0].rows,function(F,E){r[F]=E
});
r.sort(function(F,E){if(F.rp>E.rp){return 1
}if(F.rp<E.rp){return -1
}return 0
});
D.each(r,function(F,E){D("tbody",m).append(E)
})
}createModal(o,t,A,b.grid.hDiv,b.grid.hDiv);
if(A.drag){DnRModal("#"+o.themodal,"#"+o.modalhead+" td.modaltext")
}viewModal("#"+o.themodal,{modal:A.modal});
n();
D("#cData","#"+g).click(function(E){hideModal("#"+o.themodal);
E.stopPropagation();
return false
});
D("#nData","#"+g).click(function(F){D("#FormError","#"+g).hide();
var E=p();
E[0]=parseInt(E[0]);
if(E[0]!=-1&&E[1][E[0]+1]){if(D.isFunction(A.onclickPgButtons)){A.onclickPgButtons("next",D("#"+Z),E[1][E[0]])
}l(E[1][E[0]+1],b);
D(b).setSelection(E[1][E[0]+1]);
if(D.isFunction(A.afterclickPgButtons)){A.afterclickPgButtons("next",D("#"+Z),E[1][E[0]+1])
}j(E[0]+1,E[1].length-1)
}n();
return false
});
D("#pData","#"+g).click(function(E){D("#FormError","#"+g).hide();
var F=p();
if(F[0]!=-1&&F[1][F[0]-1]){if(D.isFunction(A.onclickPgButtons)){A.onclickPgButtons("prev",D("#"+Z),F[1][F[0]])
}l(F[1][F[0]-1],b);
D(b).setSelection(F[1][F[0]-1]);
if(D.isFunction(A.afterclickPgButtons)){A.afterclickPgButtons("prev",D("#"+Z),F[1][F[0]-1])
}j(F[0]-1,F[1].length-1)
}n();
return false
})
}function n(){if(A.closeOnEscape===true){setTimeout(function(){D(".jqmClose","#"+o.modalhead).focus()
},0)
}}var i=p();
j(i[0],i[1].length-1);
function j(G,F,H){var E=b.p.imgpath;
if(G==0){D("#pData","#"+g).attr("src",E+"off-"+b.p.previmg)
}else{D("#pData","#"+g).attr("src",E+b.p.previmg)
}if(G==F){D("#nData","#"+g).attr("src",E+"off-"+b.p.nextimg)
}else{D("#nData","#"+g).attr("src",E+b.p.nextimg)
}}function p(){var F=D(b).getDataIDs();
var G=D("#id_g","#"+g).val();
var E=D.inArray(G,F);
return[E,F]
}function k(G,AA,E,T){var J,H,y,Q,L,W=0,R,P,z,S=[],AB=false,O="<td class='CaptionTD' width='"+A.labelswidth+"'>&nbsp;</td><td class='DataTD'>&nbsp;</td>",M="",I="<td class='CaptionTD'>&nbsp;</td><td class='DataTD'>&nbsp;</td>",F=["integer","number","currency"],X=0,Y=0,U,K;
for(var V=1;
V<=T;
V++){M+=V==1?O:I
}D(AA.p.colModel).each(function(u){if(this.editrules&&this.editrules.edithidden===true){H=false
}else{H=this.hidden===true?true:false
}if(!H&&this.align==="right"){if(this.formatter&&D.inArray(this.formatter,F)!==-1){X=Math.max(X,parseInt(this.width,10))
}else{Y=Math.max(Y,parseInt(this.width,10))
}}});
U=X!==0?X:Y!==0?Y:0;
AB=D(AA).getInd(AA.rows,G);
D(AA.p.colModel).each(function(v){J=this.name;
K=false;
if(this.editrules&&this.editrules.edithidden===true){H=false
}else{H=this.hidden===true?true:false
}P=H?"style='display:none'":"";
if(J!=="cb"&&J!=="subgrid"&&this.editable===true){if(AB===false){R=""
}else{if(J==AA.p.ExpandColumn&&AA.p.treeGrid===true){R=D("td:eq("+v+")",AA.rows[AB]).text()
}else{R=D("td:eq("+v+")",AA.rows[AB]).html()
}}K=this.align==="right"&&U!==0?true:false;
var u=D.extend({},this.editoptions||{},{id:J,name:J}),x=D.extend({},{elmprefix:"",elmsuffix:""},this.formoptions||{}),AC=parseInt(x.rowpos)||W+1,w=parseInt((parseInt(x.colpos)||1)*2);
if(!this.edittype){this.edittype="text"
}y=D(m).find("tr[rowpos="+AC+"]");
if(y.length==0){y=D("<tr "+P+" rowpos='"+AC+"'></tr>").addClass("FormData").attr("id","tr_"+J);
D(y).append(M);
D(E).append(y);
y[0].rp=AC
}D("td:eq("+(w-2)+")",y[0]).html("<b>"+(typeof x.label==="undefined"?AA.p.colNames[v]:x.label)+"</b>");
D("td:eq("+(w-1)+")",y[0]).append("<span style='position:absolute;float:left;'>"+R+"</span>").attr("id",J);
if(K){D("td:eq("+(w-1)+") span",y[0]).css({"text-align":"right",width:U+"px"})
}S[W]=v;
W++
}});
if(W>0){var N=D("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+(T*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='"+G+"'/></td></tr>");
N[0].rp=W+99;
D(E).append(N)
}return S
}function l(I,G){var H,F,E=0,J,K;
D("#"+I+" td",G.grid.bDiv).each(function(L){H=G.p.colModel[L].name;
if(G.p.colModel[L].editrules&&G.p.colModel[L].editrules.edithidden===true){F=false
}else{F=G.p.colModel[L].hidden===true?true:false
}if(H!=="cb"&&H!=="subgrid"&&G.p.colModel[L].editable===true){if(H==G.p.ExpandColumn&&G.p.treeGrid===true){J=D(this).text()
}else{J=D(this).html()
}H=H.replace(".","\\.");
K=D.extend({},G.p.colModel[L].editoptions||{});
D("#"+H+" span","#"+g).html(J);
if(F){D("#"+H,"#"+g).parents("tr:first").hide()
}E++
}});
if(E>0){D("#id_g","#"+g).val(I)
}else{D("#id_g","#"+g).val("")
}return E
}})
},delGridRow:function(B,A){A=D.extend({top:0,left:0,width:240,height:90,modal:false,drag:true,closeicon:"ico-close.gif",imgpath:"",url:"",mtype:"POST",reloadAfterSubmit:true,beforeShowForm:null,afterShowForm:null,beforeSubmit:null,onclickSubmit:null,afterSubmit:null,onclickSubmit:null,closeOnEscape:false,delData:{}},D.jgrid.del,A||{});
return this.each(function(){var S=this;
if(!S.grid){return 
}if(!B){return 
}if(!A.imgpath){A.imgpath=S.p.imgpath
}var Q=typeof A.beforeShowForm==="function"?true:false,W=typeof A.afterShowForm==="function"?true:false,X=D("table:first",S.grid.bDiv).attr("id"),V={themodal:"delmod"+X,modalhead:"delhd"+X,modalcontent:"delcnt"+X},T="DelTbl_"+X,P;
if(isArray(B)){B=B.join()
}if(D("#"+V.themodal).html()!=null){D("#DelData>td","#"+T).text(B);
D("#DelError","#"+T).hide();
if(A.processing===true){A.processing=false;
D("#dData","#"+T).attr("disabled",false);
D("div.loading","#"+V.themodal).hide()
}if(Q){A.beforeShowForm(D("#"+T))
}viewModal("#"+V.themodal,{modal:A.modal});
if(W){A.afterShowForm(D("#"+T))
}}else{var R=D("<table id='"+T+"' class='DelTable'><tbody></tbody></table>");
D(R).append("<tr id='DelError' style='display:none'><td >&nbsp;</td></tr>");
D(R).append("<tr id='DelData' style='display:none'><td >"+B+"</td></tr>");
D(R).append("<tr><td >"+A.msg+"</td></tr>");
var U="<input id='dData' type='button' value='"+A.bSubmit+"'/>";
var O="<input id='eData' type='button' value='"+A.bCancel+"'/>";
D(R).append("<tr><td class='DelButton'>"+U+"&nbsp;"+O+"</td></tr>");
createModal(V,R,A,S.grid.hDiv,S.grid.hDiv);
if(A.drag){DnRModal("#"+V.themodal,"#"+V.modalhead+" td.modaltext")
}D("#dData","#"+T).click(function(F){var H=[true,""];
var G=D("#DelData>td","#"+T).text();
if(typeof A.onclickSubmit==="function"){A.delData=A.onclickSubmit(A)||{}
}if(typeof A.beforeSubmit==="function"){H=A.beforeSubmit(G)
}var I=A.url?A.url:S.p.editurl;
if(!I){H[0]=false;
H[1]+=" "+D.jgrid.errors.nourl
}if(H[0]===false){D("#DelError>td","#"+T).html(H[1]);
D("#DelError","#"+T).show()
}else{if(!A.processing){A.processing=true;
D("div.loading","#"+V.themodal).show();
D(this).attr("disabled",true);
var E=D.extend({oper:"del",id:G},A.delData);
D.ajax({url:I,type:A.mtype,data:E,complete:function(L,N){if(N!="success"){H[0]=false;
H[1]=N+" Status: "+L.statusText+" Error code: "+L.status
}else{if(typeof A.afterSubmit==="function"){H=A.afterSubmit(L,G)
}}if(H[0]===false){D("#DelError>td","#"+T).html(H[1]);
D("#DelError","#"+T).show()
}else{if(A.reloadAfterSubmit){if(S.p.treeGrid){D(S).setGridParam({treeANode:0,datatype:S.p.treedatatype})
}D(S).trigger("reloadGrid")
}else{var J=[];
J=G.split(",");
if(S.p.treeGrid===true){try{D(S).delTreeNode(J[0])
}catch(K){}}else{for(var M=0;
M<J.length;
M++){D(S).delRowData(J[M])
}}S.p.selrow=null;
S.p.selarrrow=[]
}if(D.isFunction(A.afterComplete)){P=L;
setTimeout(function(){A.afterComplete(P,G);
P=null
},500)
}}A.processing=false;
D("#dData","#"+T).attr("disabled",false);
D("div.loading","#"+V.themodal).hide();
if(H[0]){hideModal("#"+V.themodal)
}},error:function(J,L,K){D("#DelError>td","#"+T).html(L+" : "+K);
D("#DelError","#"+T).show();
A.processing=false;
D("#dData","#"+T).attr("disabled",false);
D("div.loading","#"+V.themodal).hide()
}})
}}return false
});
D("#eData","#"+T).click(function(E){hideModal("#"+V.themodal);
return false
});
if(Q){A.beforeShowForm(D("#"+T))
}viewModal("#"+V.themodal,{modal:A.modal});
if(W){A.afterShowForm(D("#"+T))
}}})
},navGrid:function(M,N,A,L,B,K,J){N=D.extend({edit:true,editicon:"row_edit.gif",add:true,addicon:"row_add.gif",del:true,delicon:"row_delete.gif",search:true,searchicon:"find.gif",refresh:true,refreshicon:"refresh.gif",refreshstate:"firstpage",position:"left",closeicon:"ico-close.gif",closeOnEscape:true,view:true,viewicon:"row_view.gif"},D.jgrid.nav,N||{});
return this.each(function(){var T={themodal:"alertmod",modalhead:"alerthd",modalcontent:"alertcnt"};
var H=this;
if(!H.grid){return 
}if(D("#"+T.themodal).html()==null){var I;
var F;
if(typeof window.innerWidth!="undefined"){I=window.innerWidth,F=window.innerHeight
}else{if(typeof document.documentElement!="undefined"&&typeof document.documentElement.clientWidth!="undefined"&&document.documentElement.clientWidth!=0){I=document.documentElement.clientWidth,F=document.documentElement.clientHeight
}else{I=1024;
F=768
}}createModal(T,"<div>"+N.alerttext+"</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'><span></span>",{imgpath:H.p.imgpath,closeicon:N.closeicon,caption:N.alertcap,top:F/2-25,left:I/2-100,width:200,height:50,closeOnEscape:N.closeOnEscape},H.grid.hDiv,H.grid.hDiv,true);
DnRModal("#"+T.themodal,"#"+T.modalhead)
}var E=D("<table cellspacing='0' cellpadding='0' border='0' class='navtable'><tbody></tbody></table>").height(20);
var S=document.createElement("tr");
D(S).addClass("nav-row");
var V=H.p.imgpath;
var G;
if(N.add){G=document.createElement("td");
D(G).append("&nbsp;").css({border:"none",padding:"0px"});
S.appendChild(G);
G=document.createElement("td");
G.title=N.addtitle||"";
D(G).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+V+N.addicon+"'/></td><td>"+N.addtext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){if(typeof N.addfunc=="function"){N.addfunc()
}else{D(H).editGridRow("new",L||{})
}return false
}).hover(function(){D(this).addClass("nav-hover")
},function(){D(this).removeClass("nav-hover")
});
S.appendChild(G);
G=null
}if(N.edit){G=document.createElement("td");
D(G).append("&nbsp;").css({border:"none",padding:"0px"});
S.appendChild(G);
G=document.createElement("td");
G.title=N.edittitle||"";
D(G).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+V+N.editicon+"'/></td><td valign='center'>"+N.edittext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){var O=D(H).getGridParam("selrow");
if(O){if(typeof N.editfunc=="function"){N.editfunc(O)
}else{D(H).editGridRow(O,A||{})
}}else{viewModal("#"+T.themodal,{toTop:false});
D("#jqg_alrt").focus()
}return false
}).hover(function(){D(this).addClass("nav-hover")
},function(){D(this).removeClass("nav-hover")
});
S.appendChild(G);
G=null
}if(N.view){G=document.createElement("td");
D(G).append("&nbsp;").css({border:"none",padding:"0px"});
S.appendChild(G);
G=document.createElement("td");
G.title=N.viewtitle||"";
D(G).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+V+N.viewicon+"'/></td><td valign='center'>"+N.viewtext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){var O=D(H).getGridParam("selrow");
if(O){D(H).viewGridRow(O,J||{})
}else{viewModal("#"+T.themodal,{toTop:false});
D("#jqg_alrt").focus()
}return false
}).hover(function(){D(this).addClass("nav-hover")
},function(){D(this).removeClass("nav-hover")
});
S.appendChild(G);
G=null
}if(N.del){G=document.createElement("td");
D(G).append("&nbsp;").css({border:"none",padding:"0px"});
S.appendChild(G);
G=document.createElement("td");
G.title=N.deltitle||"";
D(G).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+V+N.delicon+"'/></td><td>"+N.deltext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){var O;
if(H.p.multiselect){O=D(H).getGridParam("selarrrow");
if(O.length==0){O=null
}}else{O=D(H).getGridParam("selrow")
}if(O){D(H).delGridRow(O,B||{})
}else{viewModal("#"+T.themodal,{toTop:false});
D("#jqg_alrt").focus()
}return false
}).hover(function(){D(this).addClass("nav-hover")
},function(){D(this).removeClass("nav-hover")
});
S.appendChild(G);
G=null
}if(N.search){G=document.createElement("td");
D(G).append("&nbsp;").css({border:"none",padding:"0px"});
S.appendChild(G);
G=document.createElement("td");
if(D(M)[0]==H.p.pager[0]){K=D.extend(K,{dirty:true})
}G.title=N.searchtitle||"";
D(G).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td class='no-dirty-cell'><img src='"+V+N.searchicon+"'/></td><td>"+N.searchtext+"&nbsp;</td></tr></table>").css({cursor:"pointer"}).addClass("nav-button").click(function(){D(H).searchGrid(K||{});
return false
}).hover(function(){D(this).addClass("nav-hover")
},function(){D(this).removeClass("nav-hover")
});
S.appendChild(G);
G=null
}if(N.refresh){G=document.createElement("td");
D(G).append("&nbsp;").css({border:"none",padding:"0px"});
S.appendChild(G);
G=document.createElement("td");
G.title=N.refreshtitle||"";
var U=(D(M)[0]==H.p.pager[0])?true:false;
D(G).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+V+N.refreshicon+"'/></td><td>"+N.refreshtext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){H.p.search=false;
switch(N.refreshstate){case"firstpage":H.p.page=1;
D(H).trigger("reloadGrid");
break;
case"current":var P=H.p.multiselect===true?selarrrow:H.p.selrow;
D(H).setGridParam({gridComplete:function(){if(H.p.multiselect===true){if(P.length>0){for(var Q=0;
Q<P.length;
Q++){D(H).setSelection(P[Q])
}}}else{if(P){D(H).setSelection(P)
}}}});
D(H).trigger("reloadGrid");
break
}if(U){D(".no-dirty-cell",H.p.pager).removeClass("dirty-cell")
}if(N.search){var O=D("table:first",H.grid.bDiv).attr("id");
D("#sval","#srchcnt"+O).val("")
}return false
}).hover(function(){D(this).addClass("nav-hover")
},function(){D(this).removeClass("nav-hover")
});
S.appendChild(G);
G=null
}if(N.position=="left"){D(E).append(S).addClass("nav-table-left")
}else{D(E).append(S).addClass("nav-table-right")
}D(M).prepend(E)
})
},navButtonAdd:function(B,A){A=D.extend({caption:"newButton",title:"",buttonimg:"",onClickButton:null,position:"last"},A||{});
return this.each(function(){if(!this.grid){return 
}if(B.indexOf("#")!=0){B="#"+B
}var N=D(".navtable",B)[0];
if(N){var M,J;
var J=document.createElement("td");
D(J).append("&nbsp;").css({border:"none",padding:"0px"});
var K=D("tr:eq(0)",N)[0];
if(A.position!="first"){K.appendChild(J)
}tbd=document.createElement("td");
tbd.title=A.title;
var L=(A.buttonimg)?"<img src='"+A.buttonimg+"'/>":"&nbsp;";
D(tbd).append("<table cellspacing='0' cellpadding='0' typeAction='"+A.type+"' border='0' class='tbutton'><tr><td>"+L+"</td><td>"+A.caption+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(E){if(typeof A.onClickButton=="function"){A.onClickButton()
}E.stopPropagation();
return false
}).hover(function(){D(this).addClass("nav-hover")
},function(){D(this).removeClass("nav-hover")
});
if(A.position!="first"){K.appendChild(tbd)
}else{D(K).prepend(tbd);
D(K).prepend(J)
}tbd=null;
J=null
}})
},GridToForm:function(B,A){return this.each(function(){var H=this;
if(!H.grid){return 
}var I=D(H).getRowData(B);
if(I){for(var J in I){if(D("[name="+J+"]",A).is("input:radio")){D("[name="+J+"]",A).each(function(){if(D(this).val()==I[J]){D(this).attr("checked","checked")
}else{D(this).attr("checked","")
}})
}else{D("[name="+J+"]",A).val(I[J])
}}}})
},FormToGrid:function(B,A){return this.each(function(){var H=this;
if(!H.grid){return 
}var J=D(A).serializeArray();
var I={};
D.each(J,function(F,E){I[E.name]=E.value
});
D(H).setRowData(B,I)
})
}})
})(jQuery);