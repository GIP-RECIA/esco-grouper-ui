(function(B){B.fn.extend({jqGridImport:function(A){A=B.extend({imptype:"xml",impstring:"",impurl:"",mtype:"GET",impData:{},xmlGrid:{config:"roots>grid",data:"roots>rows"},jsonGrid:{config:"grid",data:"data"}},A||{});
return this.each(function(){var G=this;
var I=function(P,D){var R=B(D.xmlGrid.config,P)[0];
var F=B(D.xmlGrid.data,P)[0];
if(xmlJsonClass.xml2json&&JSON.parse){var O=xmlJsonClass.xml2json(R," ");
var O=JSON.parse(O);
for(var C in O){var E=O[C]
}if(F){var Q=O.grid.datatype;
O.grid.datatype="xmlstring";
O.grid.datastr=P;
B(G).jqGrid(E).setGridParam({datatype:Q})
}else{B(G).jqGrid(E)
}O=null;
E=null
}else{alert("xml2json or json.parse are not present")
}};
var H=function(D,N){if(D&&typeof D=="string"&&JSON.parse){var F=JSON.parse(D);
var M=F[N.jsonGrid.config];
var E=F[N.jsonGrid.data];
if(E){var C=M.datatype;
M.datatype="jsonstring";
M.datastr=E;
B(G).jqGrid(M).setGridParam({datatype:C})
}else{B(G).jqGrid(M)
}}};
switch(A.imptype){case"xml":B.ajax({url:A.impurl,type:A.mtype,data:A.impData,dataType:"xml",complete:function(D,C){if(C=="success"){I(D.responseXML,A);
D=null
}}});
break;
case"xmlstring":if(A.impstring&&typeof A.impstring=="string"){var J=xmlJsonClass.parseXml(A.impstring);
if(J){I(J,A);
J=null
}}break;
case"json":B.ajax({url:A.impurl,type:A.mtype,data:A.impData,dataType:"json",complete:function(D,C){if(C=="success"){H(D.responseText,A);
D=null
}}});
break;
case"jsonstring":if(A.impstring&&typeof A.impstring=="string"){H(A.impstring,A)
}break
}})
},jqGridExport:function(A){A=B.extend({exptype:"xmlstring"},A||{});
var D=null;
this.each(function(){if(!this.grid){return 
}var C=B(this).getGridParam();
switch(A.exptype){case"xmlstring":D=xmlJsonClass.json2xml(C," ");
break;
case"jsonstring":D=JSON.stringify(C);
break
}});
return D
}})
})(jQuery);