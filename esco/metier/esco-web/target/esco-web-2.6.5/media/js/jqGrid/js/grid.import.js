(function(A){A.fn.extend({jqGridImport:function(B){B=A.extend({imptype:"xml",impstring:"",impurl:"",mtype:"GET",impData:{},xmlGrid:{config:"roots>grid",data:"roots>rows"},jsonGrid:{config:"grid",data:"data"}},B||{});
return this.each(function(){var F=this;
var D=function(G,K){var M=A(K.xmlGrid.config,G)[0];
var I=A(K.xmlGrid.data,G)[0];
if(xmlJsonClass.xml2json&&JSON.parse){var H=xmlJsonClass.xml2json(M," ");
var H=JSON.parse(H);
for(var L in H){var J=H[L]
}if(I){var N=H.grid.datatype;
H.grid.datatype="xmlstring";
H.grid.datastr=G;
A(F).jqGrid(J).setGridParam({datatype:N})
}else{A(F).jqGrid(J)
}H=null;
J=null
}else{alert("xml2json or json.parse are not present")
}};
var E=function(K,G){if(K&&typeof K=="string"&&JSON.parse){var I=JSON.parse(K);
var H=I[G.jsonGrid.config];
var J=I[G.jsonGrid.data];
if(J){var L=H.datatype;
H.datatype="jsonstring";
H.datastr=J;
A(F).jqGrid(H).setGridParam({datatype:L})
}else{A(F).jqGrid(H)
}}};
switch(B.imptype){case"xml":A.ajax({url:B.impurl,type:B.mtype,data:B.impData,dataType:"xml",complete:function(G,H){if(H=="success"){D(G.responseXML,B);
G=null
}}});
break;
case"xmlstring":if(B.impstring&&typeof B.impstring=="string"){var C=xmlJsonClass.parseXml(B.impstring);
if(C){D(C,B);
C=null
}}break;
case"json":A.ajax({url:B.impurl,type:B.mtype,data:B.impData,dataType:"json",complete:function(G,H){if(H=="success"){E(G.responseText,B);
G=null
}}});
break;
case"jsonstring":if(B.impstring&&typeof B.impstring=="string"){E(B.impstring,B)
}break
}})
},jqGridExport:function(C){C=A.extend({exptype:"xmlstring"},C||{});
var B=null;
this.each(function(){if(!this.grid){return 
}var D=A(this).getGridParam();
switch(C.exptype){case"xmlstring":B=xmlJsonClass.json2xml(D," ");
break;
case"jsonstring":B=JSON.stringify(D);
break
}});
return B
}})
})(jQuery);