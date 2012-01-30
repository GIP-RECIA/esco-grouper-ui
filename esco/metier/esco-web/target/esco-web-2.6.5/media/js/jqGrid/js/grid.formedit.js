(function(B){var A=null;
B.fn.extend({searchGrid:function(C){C=B.extend({top:0,left:0,width:360,height:80,modal:false,drag:true,closeicon:"ico-close.gif",dirty:false,sField:"searchField",sValue:"searchString",sOper:"searchOper",processData:"",checkInput:false,beforeShowSearch:null,afterShowSearch:null,onInitializeSearch:null,closeAfterSearch:false,closeOnEscape:false,sopt:null},B.jgrid.search,C||{});
return this.each(function(){var F=this;
if(!F.grid){return 
}if(!C.imgpath){C.imgpath=F.p.imgpath
}var L=B("table:first",F.grid.bDiv).attr("id");
var H={themodal:"srchmod"+L,modalhead:"srchhead"+L,modalcontent:"srchcnt"+L};
if(B("#"+H.themodal).html()!=null){if(B.isFunction(C.beforeShowSearch)){C.beforeShowSearch(B("#srchcnt"+L))
}viewModal("#"+H.themodal,{modal:C.modal});
if(B.isFunction(C.afterShowSearch)){C.afterShowSearch(B("#srchcnt"+L))
}}else{var G=F.p.colModel;
var Q="<select id='snames' class='search'>";
var R,M,N;
for(var K=0;
K<G.length;
K++){R=G[K].name;
N=(G[K].search===false)?false:true;
if(G[K].editrules&&G[K].editrules.searchhidden===true){M=true
}else{if(G[K].hidden===true){M=false
}else{M=true
}}if(R!=="cb"&&R!=="subgrid"&&N&&M===true){var S=(G[K].index)?G[K].index:R;
Q+="<option value='"+S+"'>"+F.p.colNames[K]+"</option>"
}}Q+="</select>";
var O=C.sopt||["bw","eq","ne","lt","le","gt","ge","ew","cn"];
var D="<select id='sopt' class='search'>";
for(var K=0;
K<O.length;
K++){D+=O[K]=="eq"?"<option value='eq'>"+C.odata[0]+"</option>":"";
D+=O[K]=="ne"?"<option value='ne'>"+C.odata[1]+"</option>":"";
D+=O[K]=="lt"?"<option value='lt'>"+C.odata[2]+"</option>":"";
D+=O[K]=="le"?"<option value='le'>"+C.odata[3]+"</option>":"";
D+=O[K]=="gt"?"<option value='gt'>"+C.odata[4]+"</option>":"";
D+=O[K]=="ge"?"<option value='ge'>"+C.odata[5]+"</option>":"";
D+=O[K]=="bw"?"<option value='bw'>"+C.odata[6]+"</option>":"";
D+=O[K]=="ew"?"<option value='ew'>"+C.odata[7]+"</option>":"";
D+=O[K]=="cn"?"<option value='cn'>"+C.odata[8]+"</option>":""
}D+="</select>";
var P="<input id='sval' class='search' type='text' size='20' maxlength='100'/>";
var I="<input id='sbut' class='buttonsearch' type='button' value='"+C.Find+"'/>";
var J="<input id='sreset' class='buttonsearch' type='button' value='"+C.Reset+"'/>";
var E=B("<table width='100%'><tbody><tr style='display:none' id='srcherr'><td colspan='5'></td></tr><tr><td>"+Q+"</td><td>"+D+"</td><td>"+P+"</td><td>"+I+"</td><td>"+J+"</td></tr></tbody></table>");
createModal(H,E,C,F.grid.hDiv,F.grid.hDiv);
if(B.isFunction(C.onInitializeSearch)){C.onInitializeSearch(B("#srchcnt"+L))
}if(B.isFunction(C.beforeShowSearch)){C.beforeShowSearch(B("#srchcnt"+L))
}viewModal("#"+H.themodal,{modal:C.modal});
if(B.isFunction(C.afterShowSearch)){C.afterShowSearch(B("#srchcnt"+L))
}if(C.drag){DnRModal("#"+H.themodal,"#"+H.modalhead+" td.modaltext")
}B("#sbut","#"+H.themodal).click(function(){if(B("#sval","#"+H.themodal).val()!=""){var V=[true,"",""];
B("#srcherr >td","#srchcnt"+L).html("").hide();
F.p.searchdata[C.sField]=B("option[selected]","#snames").val();
F.p.searchdata[C.sOper]=B("option[selected]","#sopt").val();
F.p.searchdata[C.sValue]=B("#sval","#"+H.modalcontent).val();
if(C.checkInput){for(var U=0;
U<G.length;
U++){var T=(G[U].index)?G[U].index:R;
if(T==F.p.searchdata[C.sField]){break
}}V=checkValues(F.p.searchdata[C.sValue],U,F)
}if(V[0]===true){F.p.search=true;
if(C.dirty){B(".no-dirty-cell",F.p.pager).addClass("dirty-cell")
}F.p.page=1;
B(F).trigger("reloadGrid");
if(C.closeAfterSearch===true){hideModal("#"+H.themodal)
}}else{B("#srcherr >td","#srchcnt"+L).html(V[1]).show()
}}});
B("#sreset","#"+H.themodal).click(function(){if(F.p.search){B("#srcherr >td","#srchcnt"+L).html("").hide();
F.p.search=false;
F.p.searchdata={};
F.p.page=1;
B("#sval","#"+H.themodal).val("");
if(C.dirty){B(".no-dirty-cell",F.p.pager).removeClass("dirty-cell")
}B(F).trigger("reloadGrid")
}})
}})
},editGridRow:function(C,D){D=B.extend({top:0,left:0,width:0,height:0,modal:false,drag:true,closeicon:"ico-close.gif",imgpath:"",url:null,mtype:"POST",closeAfterAdd:false,clearAfterAdd:true,closeAfterEdit:false,reloadAfterSubmit:true,onInitializeForm:null,beforeInitData:null,beforeShowForm:null,afterShowForm:null,beforeSubmit:null,afterSubmit:null,onclickSubmit:null,afterComplete:null,onclickPgButtons:null,afterclickPgButtons:null,editData:{},recreateForm:false,closeOnEscape:false,addedrow:"first"},B.jgrid.edit,D||{});
A=D;
return this.each(function(){var T=this;
if(!T.grid||!C){return 
}if(!D.imgpath){D.imgpath=T.p.imgpath
}var P=B("table:first",T.grid.bDiv).attr("id"),H={themodal:"editmod"+P,modalhead:"edithd"+P,modalcontent:"editcnt"+P},b=B.isFunction(A.beforeShowForm)?A.beforeShowForm:false,N=B.isFunction(A.afterShowForm)?A.afterShowForm:false,X=B.isFunction(A.beforeInitData)?A.beforeInitData:false,c=B.isFunction(A.onInitializeForm)?A.onInitializeForm:false,F=1,I,S="FrmGrid_"+P,U="TblGrid_"+P;
if(C=="new"){C="_empty";
D.caption=D.addCaption
}else{D.caption=D.editCaption
}if(D.recreateForm===true&&B("#"+H.themodal).html()!=null){B("#"+H.themodal).remove()
}if(B("#"+H.themodal).html()!=null){B(".modaltext","#"+H.modalhead).html(D.caption);
B("#FormError","#"+U).hide();
if(X){X(B("#"+S))
}K(C,T);
if(C=="_empty"){B("#pData, #nData","#"+U).hide()
}else{B("#pData, #nData","#"+U).show()
}if(b){b(B("#"+S))
}if(D.processing===true){D.processing=false;
B("#sData","#"+U).attr("disabled",false);
B("div.loading","#"+H.themodal).hide()
}viewModal("#"+H.themodal,{modal:D.modal});
if(N){N(B("#"+S))
}}else{B(T.p.colModel).each(function(e){F=Math.max(F,this.formoptions?this.formoptions.colpos||0:0)
});
var R,W=B("<form name='FormPost' id='"+S+"' class='FormGrid'></form>"),J=B("<table id='"+U+"' class='EditTable' cellspacing='0' cellpading='0' border='0'><tbody></tbody></table>");
B(W).append(J);
R=B("<tr id='FormError' style='display:none'><td colspan='"+(F*2)+"'></td></tr>");
R[0].rp=0;
B(J).append(R);
if(X){X(B("#"+S))
}var d=L(C,T,J,F),V=T.p.imgpath,Y="<img id='pData' src='"+V+T.p.previmg+"'/>",a="<img id='nData' src='"+V+T.p.nextimg+"'/>",Q="<input id='sData' type='button' class='EditButton' value='"+D.bSubmit+"'/>",Z="<input id='cData' type='button'  class='EditButton' value='"+D.bCancel+"'/>";
R=B("<tr id='Act_Buttons'><td class='navButton'>"+Y+"&nbsp;"+a+"</td><td colspan='"+(F*2-1)+"'class='EditButton'>"+Q+"&nbsp;"+Z+"</td></tr>");
R[0].rp=d.length+100;
B(J).append(R);
if(F>1){var E=[];
B.each(B(J)[0].rows,function(e,f){E[e]=f
});
E.sort(function(f,e){if(f.rp>e.rp){return 1
}if(f.rp<e.rp){return -1
}return 0
});
B.each(E,function(e,f){B("tbody",J).append(f)
})
}createModal(H,W,D,T.grid.hDiv,T.grid.hDiv);
if(c){c(B("#"+S))
}if(D.drag){DnRModal("#"+H.themodal,"#"+H.modalhead+" td.modaltext")
}if(C=="_empty"){B("#pData,#nData","#"+U).hide()
}else{B("#pData,#nData","#"+U).show()
}if(b){b(B("#"+S))
}viewModal("#"+H.themodal,{modal:D.modal});
if(N){N(B("#"+S))
}B("#sData","#"+U).click(function(i){var h={},g=[true,"",""],j={};
B("#FormError","#"+U).hide();
var f=0;
B(".FormElement","#"+U).each(function(k){var n=true;
switch(B(this).get(0).type){case"checkbox":if(B(this).attr("checked")){h[this.name]=B(this).val()
}else{var m=B(this).attr("offval");
h[this.name]=m;
j[this.name]=m
}break;
case"select-one":h[this.name]=B("option:selected",this).val();
j[this.name]=B("option:selected",this).text();
break;
case"select-multiple":h[this.name]=B(this).val();
var l=[];
B("option:selected",this).each(function(o,p){l[o]=B(p).text()
});
j[this.name]=l.join(",");
break;
case"password":case"text":case"textarea":h[this.name]=B(this).val();
g=checkValues(h[this.name],d[k],T);
if(g[0]===false){n=false
}else{h[this.name]=!T.p.autoencode?h[this.name]:htmlEncode(h[this.name])
}break
}f++;
if(!n){return false
}});
if(f==0){g[0]=false;
g[1]=B.jgrid.errors.norecords
}if(B.isFunction(A.onclickSubmit)){A.editData=A.onclickSubmit(D)||{}
}if(g[0]){if(B.isFunction(A.beforeSubmit)){g=A.beforeSubmit(h,B("#"+S))
}}var e=A.url?A.url:T.p.editurl;
if(g[0]){if(!e){g[0]=false;
g[1]+=" "+B.jgrid.errors.nourl
}}if(g[0]===false){B("#FormError>td","#"+U).html(g[1]);
B("#FormError","#"+U).show()
}else{if(!D.processing){D.processing=true;
B("div.loading","#"+H.themodal).show();
B(this).attr("disabled",true);
h.oper=h.id=="_empty"?"add":"edit";
h=B.extend(h,A.editData);
B.ajax({url:e,type:A.mtype,data:h,complete:function(l,k){if(k!="success"){g[0]=false;
g[1]=k+" Status: "+l.statusText+" Error code: "+l.status
}else{if(B.isFunction(A.afterSubmit)){g=A.afterSubmit(l,h)
}}if(g[0]===false){B("#FormError>td","#"+U).html(g[1]);
B("#FormError","#"+U).show()
}else{h=B.extend(h,j);
if(h.id=="_empty"){if(!g[2]){g[2]=parseInt(B(T).getGridParam("records"))+1
}h.id=g[2];
if(A.closeAfterAdd){if(A.reloadAfterSubmit){B(T).trigger("reloadGrid")
}else{B(T).addRowData(g[2],h,D.addedrow);
B(T).setSelection(g[2])
}hideModal("#"+H.themodal)
}else{if(A.clearAfterAdd){if(A.reloadAfterSubmit){B(T).trigger("reloadGrid")
}else{B(T).addRowData(g[2],h,D.addedrow)
}B(".FormElement","#"+U).each(function(m){switch(B(this).get(0).type){case"checkbox":B(this).attr("checked",0);
break;
case"select-one":case"select-multiple":B("option",this).attr("selected","");
break;
case"password":case"text":case"textarea":if(this.name=="id"){B(this).val("_empty")
}else{B(this).val("")
}break
}});
K("_empty",T)
}else{if(A.reloadAfterSubmit){B(T).trigger("reloadGrid")
}else{B(T).addRowData(g[2],h,D.addedrow)
}}}}else{if(A.reloadAfterSubmit){B(T).trigger("reloadGrid");
if(!A.closeAfterEdit){B(T).setSelection(h.id)
}}else{if(T.p.treeGrid===true){B(T).setTreeRow(h.id,h)
}else{B(T).setRowData(h.id,h)
}}if(A.closeAfterEdit){hideModal("#"+H.themodal)
}}if(B.isFunction(A.afterComplete)){I=l;
setTimeout(function(){A.afterComplete(I,h,B("#"+S));
I=null
},500)
}}D.processing=false;
B("#sData","#"+U).attr("disabled",false);
B("div.loading","#"+H.themodal).hide()
},error:function(k,l,m){B("#FormError>td","#"+U).html(l+" : "+m);
B("#FormError","#"+U).show();
D.processing=false;
B("#sData","#"+U).attr("disabled",false);
B("div.loading","#"+H.themodal).hide()
}})
}}i.stopPropagation();
return false
});
B("#cData","#"+U).click(function(e){hideModal("#"+H.themodal);
e.stopPropagation();
return false
});
B("#nData","#"+U).click(function(e){B("#FormError","#"+U).hide();
var f=G();
f[0]=parseInt(f[0]);
if(f[0]!=-1&&f[1][f[0]+1]){if(B.isFunction(D.onclickPgButtons)){D.onclickPgButtons("next",B("#"+S),f[1][f[0]])
}K(f[1][f[0]+1],T);
B(T).setSelection(f[1][f[0]+1]);
if(B.isFunction(D.afterclickPgButtons)){D.afterclickPgButtons("next",B("#"+S),f[1][f[0]+1])
}M(f[0]+1,f[1].length-1)
}return false
});
B("#pData","#"+U).click(function(f){B("#FormError","#"+U).hide();
var e=G();
if(e[0]!=-1&&e[1][e[0]-1]){if(B.isFunction(D.onclickPgButtons)){D.onclickPgButtons("prev",B("#"+S),e[1][e[0]])
}K(e[1][e[0]-1],T);
B(T).setSelection(e[1][e[0]-1]);
if(B.isFunction(D.afterclickPgButtons)){D.afterclickPgButtons("prev",B("#"+S),e[1][e[0]-1])
}M(e[0]-1,e[1].length-1)
}return false
})
}var O=G();
M(O[0],O[1].length-1);
function M(g,h,f){var e=T.p.imgpath;
if(g==0){B("#pData","#"+U).attr("src",e+"off-"+T.p.previmg)
}else{B("#pData","#"+U).attr("src",e+T.p.previmg)
}if(g==h){B("#nData","#"+U).attr("src",e+"off-"+T.p.nextimg)
}else{B("#nData","#"+U).attr("src",e+T.p.nextimg)
}}function G(){var f=B(T).getDataIDs();
var e=B("#id_g","#"+U).val();
var g=B.inArray(e,f);
return[g,f]
}function L(h,m,k,r){var f,g,o,u,e,p=0,t,v,n,s=[],l=false,i="<td class='CaptionTD'>&nbsp;</td><td class='DataTD'>&nbsp;</td>",j="";
for(var q=1;
q<=r;
q++){j+=i
}l=B(m).getInd(m.rows,h);
B(m.p.colModel).each(function(AC){f=this.name;
if(this.editrules&&this.editrules.edithidden==true){g=false
}else{g=this.hidden===true?true:false
}v=g?"style='display:none'":"";
if(f!=="cb"&&f!=="subgrid"&&this.editable===true){if(l===false){t=""
}else{if(f==m.p.ExpandColumn&&m.p.treeGrid===true){t=B("td:eq("+AC+")",m.rows[l]).text()
}else{try{t=B.unformat(B("td:eq("+AC+")",m.rows[l]),{colModel:this},AC)
}catch(AA){t=B("td:eq("+AC+")",m.rows[l]).html()
}}}var AB=B.extend({},this.editoptions||{},{id:f,name:f}),z=B.extend({},{elmprefix:"",elmsuffix:""},this.formoptions||{}),x=parseInt(z.rowpos)||p+1,y=parseInt((parseInt(z.colpos)||1)*2);
if(h=="_empty"&&AB.defaultValue){t=B.isFunction(AB.defaultValue)?AB.defaultValue():AB.defaultValue
}if(!this.edittype){this.edittype="text"
}n=createEl(this.edittype,AB,t);
B(n).addClass("FormElement");
o=B(J).find("tr[rowpos="+x+"]");
if(o.length==0){o=B("<tr "+v+" rowpos='"+x+"'></tr>").addClass("FormData").attr("id","tr_"+f);
B(o).append(j);
B(k).append(o);
o[0].rp=x
}B("td:eq("+(y-2)+")",o[0]).html(typeof z.label==="undefined"?m.p.colNames[AC]:z.label);
B("td:eq("+(y-1)+")",o[0]).append(z.elmprefix).append(n).append(z.elmsuffix);
s[p]=AC;
p++
}});
if(p>0){var w=B("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+(r*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='"+h+"'/></td></tr>");
w[0].rp=p+99;
B(k).append(w)
}return s
}function K(i,j){var e,k,h=0,g,f;
B("#"+i+" td",j.grid.bDiv).each(function(m){e=j.p.colModel[m].name;
if(j.p.colModel[m].editrules&&j.p.colModel[m].editrules.edithidden===true){k=false
}else{k=j.p.colModel[m].hidden===true?true:false
}if(e!=="cb"&&e!=="subgrid"&&j.p.colModel[m].editable===true){if(e==j.p.ExpandColumn&&j.p.treeGrid===true){g=B(this).text()
}else{try{g=B.unformat(this,{colModel:j.p.colModel[m]},m)
}catch(l){g=B(this).html()
}}e=e.replace(".","\\.");
f=B.extend({},j.p.colModel[m].editoptions||{});
if(i=="_empty"&&f.defaultValue){g=B.isFunction(f.defaultValue)?f.defaultValue():f.defaultValue
}switch(j.p.colModel[m].edittype){case"password":case"text":B("#"+e,"#"+U).val(g);
break;
case"textarea":if(g=="&nbsp;"||g=="&#160;"||(g.length==1&&g.charCodeAt(0)==160)){g=""
}B("#"+e,"#"+U).val(g);
break;
case"select":B("#"+e+" option","#"+U).each(function(n){if(!f.multiple&&g==B(this).text()){this.selected=true
}else{if(f.multiple){if(B.inArray(B(this).text(),g.split(","))>-1){this.selected=true
}else{this.selected=false
}}else{this.selected=false
}}});
break;
case"checkbox":if(g==B("#"+e,"#"+U).val()){B("#"+e,"#"+U).attr("checked",true);
B("#"+e,"#"+U).attr("defaultChecked",true)
}else{B("#"+e,"#"+U).attr("checked",false);
B("#"+e,"#"+U).attr("defaultChecked","")
}break
}if(k){B("#"+e,"#"+U).parents("tr:first").hide()
}h++
}});
if(h>0){B("#id_g","#"+U).val(i)
}else{B("#id_g","#"+U).val("")
}return h
}})
},viewGridRow:function(C,D){D=B.extend({top:0,left:0,width:0,height:0,modal:false,drag:true,closeicon:"ico-close.gif",imgpath:"",closeOnEscape:false,labelswidth:"30%"},B.jgrid.view,D||{});
return this.each(function(){var W=this;
if(!W.grid||!C){return 
}if(!D.imgpath){D.imgpath=W.p.imgpath
}var Q=B("table:first",W.grid.bDiv).attr("id"),J={themodal:"viewmod"+Q,modalhead:"viewhd"+Q,modalcontent:"viewcnt"+Q},H=1,Y="ViewGrid_"+Q,R="ViewTbl_"+Q;
if(B("#"+J.themodal).html()!=null){B(".modaltext","#"+J.modalhead).html(D.caption);
B("#FormError","#"+R).hide();
M(C,W);
viewModal("#"+J.themodal,{modal:D.modal});
K()
}else{B(W.p.colModel).each(function(Z){H=Math.max(H,this.formoptions?this.formoptions.colpos||0:0)
});
var V,E=B("<form name='FormPost' id='"+Y+"' class='FormGrid'></form>"),L=B("<table id='"+R+"' class='EditTable' cellspacing='0' cellpading='2' border='0' style='table-layout:fixed'><tbody></tbody></table>");
B(E).append(L);
var U=N(C,W,L,H),X=W.p.imgpath,S="<img id='pData' src='"+X+W.p.previmg+"'/>",T="<img id='nData' src='"+X+W.p.nextimg+"'/>",F="<input id='cData' type='button'  class='EditButton' value='"+D.bClose+"'/>";
V=B("<tr id='Act_Buttons'><td class='navButton'>"+S+"&nbsp;"+T+"</td><td colspan='"+(H*2-1)+"'class='EditButton'>"+F+"</td></tr>");
V[0].rp=U.length+100;
B(L).append(V);
if(H>1){var G=[];
B.each(B(L)[0].rows,function(Z,a){G[Z]=a
});
G.sort(function(Z,a){if(Z.rp>a.rp){return 1
}if(Z.rp<a.rp){return -1
}return 0
});
B.each(G,function(Z,a){B("tbody",L).append(a)
})
}createModal(J,E,D,W.grid.hDiv,W.grid.hDiv);
if(D.drag){DnRModal("#"+J.themodal,"#"+J.modalhead+" td.modaltext")
}viewModal("#"+J.themodal,{modal:D.modal});
K();
B("#cData","#"+R).click(function(Z){hideModal("#"+J.themodal);
Z.stopPropagation();
return false
});
B("#nData","#"+R).click(function(Z){B("#FormError","#"+R).hide();
var a=I();
a[0]=parseInt(a[0]);
if(a[0]!=-1&&a[1][a[0]+1]){if(B.isFunction(D.onclickPgButtons)){D.onclickPgButtons("next",B("#"+Y),a[1][a[0]])
}M(a[1][a[0]+1],W);
B(W).setSelection(a[1][a[0]+1]);
if(B.isFunction(D.afterclickPgButtons)){D.afterclickPgButtons("next",B("#"+Y),a[1][a[0]+1])
}O(a[0]+1,a[1].length-1)
}K();
return false
});
B("#pData","#"+R).click(function(a){B("#FormError","#"+R).hide();
var Z=I();
if(Z[0]!=-1&&Z[1][Z[0]-1]){if(B.isFunction(D.onclickPgButtons)){D.onclickPgButtons("prev",B("#"+Y),Z[1][Z[0]])
}M(Z[1][Z[0]-1],W);
B(W).setSelection(Z[1][Z[0]-1]);
if(B.isFunction(D.afterclickPgButtons)){D.afterclickPgButtons("prev",B("#"+Y),Z[1][Z[0]-1])
}O(Z[0]-1,Z[1].length-1)
}K();
return false
})
}function K(){if(D.closeOnEscape===true){setTimeout(function(){B(".jqmClose","#"+J.modalhead).focus()
},0)
}}var P=I();
O(P[0],P[1].length-1);
function O(Z,a,c){var b=W.p.imgpath;
if(Z==0){B("#pData","#"+R).attr("src",b+"off-"+W.p.previmg)
}else{B("#pData","#"+R).attr("src",b+W.p.previmg)
}if(Z==a){B("#nData","#"+R).attr("src",b+"off-"+W.p.nextimg)
}else{B("#nData","#"+R).attr("src",b+W.p.nextimg)
}}function I(){var a=B(W).getDataIDs();
var Z=B("#id_g","#"+R).val();
var b=B.inArray(Z,a);
return[b,a]
}function N(w,b,Z,j){var t,v,d,m,r,g=0,l,n,c,k=[],a=false,o="<td class='CaptionTD' width='"+D.labelswidth+"'>&nbsp;</td><td class='DataTD'>&nbsp;</td>",q="",u="<td class='CaptionTD'>&nbsp;</td><td class='DataTD'>&nbsp;</td>",x=["integer","number","currency"],f=0,e=0,i,s;
for(var h=1;
h<=j;
h++){q+=h==1?o:u
}B(b.p.colModel).each(function(y){if(this.editrules&&this.editrules.edithidden===true){v=false
}else{v=this.hidden===true?true:false
}if(!v&&this.align==="right"){if(this.formatter&&B.inArray(this.formatter,x)!==-1){f=Math.max(f,parseInt(this.width,10))
}else{e=Math.max(e,parseInt(this.width,10))
}}});
i=f!==0?f:e!==0?e:0;
a=B(b).getInd(b.rows,w);
B(b.p.colModel).each(function(AB){t=this.name;
s=false;
if(this.editrules&&this.editrules.edithidden===true){v=false
}else{v=this.hidden===true?true:false
}n=v?"style='display:none'":"";
if(t!=="cb"&&t!=="subgrid"&&this.editable===true){if(a===false){l=""
}else{if(t==b.p.ExpandColumn&&b.p.treeGrid===true){l=B("td:eq("+AB+")",b.rows[a]).text()
}else{l=B("td:eq("+AB+")",b.rows[a]).html()
}}s=this.align==="right"&&i!==0?true:false;
var AD=B.extend({},this.editoptions||{},{id:t,name:t}),AA=B.extend({},{elmprefix:"",elmsuffix:""},this.formoptions||{}),y=parseInt(AA.rowpos)||g+1,z=parseInt((parseInt(AA.colpos)||1)*2);
if(!this.edittype){this.edittype="text"
}d=B(L).find("tr[rowpos="+y+"]");
if(d.length==0){d=B("<tr "+n+" rowpos='"+y+"'></tr>").addClass("FormData").attr("id","tr_"+t);
B(d).append(q);
B(Z).append(d);
d[0].rp=y
}B("td:eq("+(z-2)+")",d[0]).html("<b>"+(typeof AA.label==="undefined"?b.p.colNames[AB]:AA.label)+"</b>");
B("td:eq("+(z-1)+")",d[0]).append("<span style='position:absolute;float:left;'>"+l+"</span>").attr("id",t);
if(s){B("td:eq("+(z-1)+") span",d[0]).css({"text-align":"right",width:i+"px"})
}k[g]=AB;
g++
}});
if(g>0){var p=B("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+(j*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='"+w+"'/></td></tr>");
p[0].rp=g+99;
B(Z).append(p)
}return k
}function M(e,f){var Z,a,b=0,d,c;
B("#"+e+" td",f.grid.bDiv).each(function(g){Z=f.p.colModel[g].name;
if(f.p.colModel[g].editrules&&f.p.colModel[g].editrules.edithidden===true){a=false
}else{a=f.p.colModel[g].hidden===true?true:false
}if(Z!=="cb"&&Z!=="subgrid"&&f.p.colModel[g].editable===true){if(Z==f.p.ExpandColumn&&f.p.treeGrid===true){d=B(this).text()
}else{d=B(this).html()
}Z=Z.replace(".","\\.");
c=B.extend({},f.p.colModel[g].editoptions||{});
B("#"+Z+" span","#"+R).html(d);
if(a){B("#"+Z,"#"+R).parents("tr:first").hide()
}b++
}});
if(b>0){B("#id_g","#"+R).val(e)
}else{B("#id_g","#"+R).val("")
}return b
}})
},delGridRow:function(C,D){D=B.extend({top:0,left:0,width:240,height:90,modal:false,drag:true,closeicon:"ico-close.gif",imgpath:"",url:"",mtype:"POST",reloadAfterSubmit:true,beforeShowForm:null,afterShowForm:null,beforeSubmit:null,onclickSubmit:null,afterSubmit:null,onclickSubmit:null,closeOnEscape:false,delData:{}},B.jgrid.del,D||{});
return this.each(function(){var J=this;
if(!J.grid){return 
}if(!C){return 
}if(!D.imgpath){D.imgpath=J.p.imgpath
}var L=typeof D.beforeShowForm==="function"?true:false,F=typeof D.afterShowForm==="function"?true:false,E=B("table:first",J.grid.bDiv).attr("id"),G={themodal:"delmod"+E,modalhead:"delhd"+E,modalcontent:"delcnt"+E},I="DelTbl_"+E,M;
if(isArray(C)){C=C.join()
}if(B("#"+G.themodal).html()!=null){B("#DelData>td","#"+I).text(C);
B("#DelError","#"+I).hide();
if(D.processing===true){D.processing=false;
B("#dData","#"+I).attr("disabled",false);
B("div.loading","#"+G.themodal).hide()
}if(L){D.beforeShowForm(B("#"+I))
}viewModal("#"+G.themodal,{modal:D.modal});
if(F){D.afterShowForm(B("#"+I))
}}else{var K=B("<table id='"+I+"' class='DelTable'><tbody></tbody></table>");
B(K).append("<tr id='DelError' style='display:none'><td >&nbsp;</td></tr>");
B(K).append("<tr id='DelData' style='display:none'><td >"+C+"</td></tr>");
B(K).append("<tr><td >"+D.msg+"</td></tr>");
var H="<input id='dData' type='button' value='"+D.bSubmit+"'/>";
var N="<input id='eData' type='button' value='"+D.bCancel+"'/>";
B(K).append("<tr><td class='DelButton'>"+H+"&nbsp;"+N+"</td></tr>");
createModal(G,K,D,J.grid.hDiv,J.grid.hDiv);
if(D.drag){DnRModal("#"+G.themodal,"#"+G.modalhead+" td.modaltext")
}B("#dData","#"+I).click(function(R){var P=[true,""];
var Q=B("#DelData>td","#"+I).text();
if(typeof D.onclickSubmit==="function"){D.delData=D.onclickSubmit(D)||{}
}if(typeof D.beforeSubmit==="function"){P=D.beforeSubmit(Q)
}var O=D.url?D.url:J.p.editurl;
if(!O){P[0]=false;
P[1]+=" "+B.jgrid.errors.nourl
}if(P[0]===false){B("#DelError>td","#"+I).html(P[1]);
B("#DelError","#"+I).show()
}else{if(!D.processing){D.processing=true;
B("div.loading","#"+G.themodal).show();
B(this).attr("disabled",true);
var S=B.extend({oper:"del",id:Q},D.delData);
B.ajax({url:O,type:D.mtype,data:S,complete:function(U,X){if(X!="success"){P[0]=false;
P[1]=X+" Status: "+U.statusText+" Error code: "+U.status
}else{if(typeof D.afterSubmit==="function"){P=D.afterSubmit(U,Q)
}}if(P[0]===false){B("#DelError>td","#"+I).html(P[1]);
B("#DelError","#"+I).show()
}else{if(D.reloadAfterSubmit){if(J.p.treeGrid){B(J).setGridParam({treeANode:0,datatype:J.p.treedatatype})
}B(J).trigger("reloadGrid")
}else{var W=[];
W=Q.split(",");
if(J.p.treeGrid===true){try{B(J).delTreeNode(W[0])
}catch(V){}}else{for(var T=0;
T<W.length;
T++){B(J).delRowData(W[T])
}}J.p.selrow=null;
J.p.selarrrow=[]
}if(B.isFunction(D.afterComplete)){M=U;
setTimeout(function(){D.afterComplete(M,Q);
M=null
},500)
}}D.processing=false;
B("#dData","#"+I).attr("disabled",false);
B("div.loading","#"+G.themodal).hide();
if(P[0]){hideModal("#"+G.themodal)
}},error:function(V,T,U){B("#DelError>td","#"+I).html(T+" : "+U);
B("#DelError","#"+I).show();
D.processing=false;
B("#dData","#"+I).attr("disabled",false);
B("div.loading","#"+G.themodal).hide()
}})
}}return false
});
B("#eData","#"+I).click(function(O){hideModal("#"+G.themodal);
return false
});
if(L){D.beforeShowForm(B("#"+I))
}viewModal("#"+G.themodal,{modal:D.modal});
if(F){D.afterShowForm(B("#"+I))
}}})
},navGrid:function(D,C,I,E,H,F,G){C=B.extend({edit:true,editicon:"row_edit.gif",add:true,addicon:"row_add.gif",del:true,delicon:"row_delete.gif",search:true,searchicon:"find.gif",refresh:true,refreshicon:"refresh.gif",refreshstate:"firstpage",position:"left",closeicon:"ico-close.gif",closeOnEscape:true,view:true,viewicon:"row_view.gif"},B.jgrid.nav,C||{});
return this.each(function(){var L={themodal:"alertmod",modalhead:"alerthd",modalcontent:"alertcnt"};
var O=this;
if(!O.grid){return 
}if(B("#"+L.themodal).html()==null){var N;
var Q;
if(typeof window.innerWidth!="undefined"){N=window.innerWidth,Q=window.innerHeight
}else{if(typeof document.documentElement!="undefined"&&typeof document.documentElement.clientWidth!="undefined"&&document.documentElement.clientWidth!=0){N=document.documentElement.clientWidth,Q=document.documentElement.clientHeight
}else{N=1024;
Q=768
}}createModal(L,"<div>"+C.alerttext+"</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'><span></span>",{imgpath:O.p.imgpath,closeicon:C.closeicon,caption:C.alertcap,top:Q/2-25,left:N/2-100,width:200,height:50,closeOnEscape:C.closeOnEscape},O.grid.hDiv,O.grid.hDiv,true);
DnRModal("#"+L.themodal,"#"+L.modalhead)
}var R=B("<table cellspacing='0' cellpadding='0' border='0' class='navtable'><tbody></tbody></table>").height(20);
var M=document.createElement("tr");
B(M).addClass("nav-row");
var J=O.p.imgpath;
var P;
if(C.add){P=document.createElement("td");
B(P).append("&nbsp;").css({border:"none",padding:"0px"});
M.appendChild(P);
P=document.createElement("td");
P.title=C.addtitle||"";
B(P).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+J+C.addicon+"'/></td><td>"+C.addtext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){if(typeof C.addfunc=="function"){C.addfunc()
}else{B(O).editGridRow("new",E||{})
}return false
}).hover(function(){B(this).addClass("nav-hover")
},function(){B(this).removeClass("nav-hover")
});
M.appendChild(P);
P=null
}if(C.edit){P=document.createElement("td");
B(P).append("&nbsp;").css({border:"none",padding:"0px"});
M.appendChild(P);
P=document.createElement("td");
P.title=C.edittitle||"";
B(P).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+J+C.editicon+"'/></td><td valign='center'>"+C.edittext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){var S=B(O).getGridParam("selrow");
if(S){if(typeof C.editfunc=="function"){C.editfunc(S)
}else{B(O).editGridRow(S,I||{})
}}else{viewModal("#"+L.themodal,{toTop:false});
B("#jqg_alrt").focus()
}return false
}).hover(function(){B(this).addClass("nav-hover")
},function(){B(this).removeClass("nav-hover")
});
M.appendChild(P);
P=null
}if(C.view){P=document.createElement("td");
B(P).append("&nbsp;").css({border:"none",padding:"0px"});
M.appendChild(P);
P=document.createElement("td");
P.title=C.viewtitle||"";
B(P).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+J+C.viewicon+"'/></td><td valign='center'>"+C.viewtext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){var S=B(O).getGridParam("selrow");
if(S){B(O).viewGridRow(S,G||{})
}else{viewModal("#"+L.themodal,{toTop:false});
B("#jqg_alrt").focus()
}return false
}).hover(function(){B(this).addClass("nav-hover")
},function(){B(this).removeClass("nav-hover")
});
M.appendChild(P);
P=null
}if(C.del){P=document.createElement("td");
B(P).append("&nbsp;").css({border:"none",padding:"0px"});
M.appendChild(P);
P=document.createElement("td");
P.title=C.deltitle||"";
B(P).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+J+C.delicon+"'/></td><td>"+C.deltext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){var S;
if(O.p.multiselect){S=B(O).getGridParam("selarrrow");
if(S.length==0){S=null
}}else{S=B(O).getGridParam("selrow")
}if(S){B(O).delGridRow(S,H||{})
}else{viewModal("#"+L.themodal,{toTop:false});
B("#jqg_alrt").focus()
}return false
}).hover(function(){B(this).addClass("nav-hover")
},function(){B(this).removeClass("nav-hover")
});
M.appendChild(P);
P=null
}if(C.search){P=document.createElement("td");
B(P).append("&nbsp;").css({border:"none",padding:"0px"});
M.appendChild(P);
P=document.createElement("td");
if(B(D)[0]==O.p.pager[0]){F=B.extend(F,{dirty:true})
}P.title=C.searchtitle||"";
B(P).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td class='no-dirty-cell'><img src='"+J+C.searchicon+"'/></td><td>"+C.searchtext+"&nbsp;</td></tr></table>").css({cursor:"pointer"}).addClass("nav-button").click(function(){B(O).searchGrid(F||{});
return false
}).hover(function(){B(this).addClass("nav-hover")
},function(){B(this).removeClass("nav-hover")
});
M.appendChild(P);
P=null
}if(C.refresh){P=document.createElement("td");
B(P).append("&nbsp;").css({border:"none",padding:"0px"});
M.appendChild(P);
P=document.createElement("td");
P.title=C.refreshtitle||"";
var K=(B(D)[0]==O.p.pager[0])?true:false;
B(P).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+J+C.refreshicon+"'/></td><td>"+C.refreshtext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){O.p.search=false;
switch(C.refreshstate){case"firstpage":O.p.page=1;
B(O).trigger("reloadGrid");
break;
case"current":var S=O.p.multiselect===true?selarrrow:O.p.selrow;
B(O).setGridParam({gridComplete:function(){if(O.p.multiselect===true){if(S.length>0){for(var U=0;
U<S.length;
U++){B(O).setSelection(S[U])
}}}else{if(S){B(O).setSelection(S)
}}}});
B(O).trigger("reloadGrid");
break
}if(K){B(".no-dirty-cell",O.p.pager).removeClass("dirty-cell")
}if(C.search){var T=B("table:first",O.grid.bDiv).attr("id");
B("#sval","#srchcnt"+T).val("")
}return false
}).hover(function(){B(this).addClass("nav-hover")
},function(){B(this).removeClass("nav-hover")
});
M.appendChild(P);
P=null
}if(C.position=="left"){B(R).append(M).addClass("nav-table-left")
}else{B(R).append(M).addClass("nav-table-right")
}B(D).prepend(R)
})
},navButtonAdd:function(C,D){D=B.extend({caption:"newButton",title:"",buttonimg:"",onClickButton:null,position:"last"},D||{});
return this.each(function(){if(!this.grid){return 
}if(C.indexOf("#")!=0){C="#"+C
}var E=B(".navtable",C)[0];
if(E){var F,I;
var I=document.createElement("td");
B(I).append("&nbsp;").css({border:"none",padding:"0px"});
var H=B("tr:eq(0)",E)[0];
if(D.position!="first"){H.appendChild(I)
}tbd=document.createElement("td");
tbd.title=D.title;
var G=(D.buttonimg)?"<img src='"+D.buttonimg+"'/>":"&nbsp;";
B(tbd).append("<table cellspacing='0' cellpadding='0' typeAction='"+D.type+"' border='0' class='tbutton'><tr><td>"+G+"</td><td>"+D.caption+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(J){if(typeof D.onClickButton=="function"){D.onClickButton()
}J.stopPropagation();
return false
}).hover(function(){B(this).addClass("nav-hover")
},function(){B(this).removeClass("nav-hover")
});
if(D.position!="first"){H.appendChild(tbd)
}else{B(H).prepend(tbd);
B(H).prepend(I)
}tbd=null;
I=null
}})
},GridToForm:function(C,D){return this.each(function(){var G=this;
if(!G.grid){return 
}var F=B(G).getRowData(C);
if(F){for(var E in F){if(B("[name="+E+"]",D).is("input:radio")){B("[name="+E+"]",D).each(function(){if(B(this).val()==F[E]){B(this).attr("checked","checked")
}else{B(this).attr("checked","")
}})
}else{B("[name="+E+"]",D).val(F[E])
}}}})
},FormToGrid:function(C,D){return this.each(function(){var G=this;
if(!G.grid){return 
}var E=B(D).serializeArray();
var F={};
B.each(E,function(H,I){F[I.name]=I.value
});
B(G).setRowData(C,F)
})
}})
})(jQuery);