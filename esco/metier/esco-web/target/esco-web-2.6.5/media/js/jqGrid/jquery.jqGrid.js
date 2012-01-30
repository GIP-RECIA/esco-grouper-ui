function jqGridInclude(){var N="js/";
var O=false;
var P=new Array();
var R="combine.php?type=javascript&files=";
var V=true;
var T=[{include:true,incfile:"grid.locale-en.js",minfile:"min/grid.locale-en-min.js"},{include:true,incfile:"grid.base.js",minfile:"min/grid.base-min.js"},{include:true,incfile:"grid.common.js",minfile:"min/grid.common-min.js"},{include:true,incfile:"grid.formedit.js",minfile:"min/grid.formedit-min.js"},{include:true,incfile:"grid.inlinedit.js",minfile:"min/grid.inlinedit-min.js"},{include:true,incfile:"grid.celledit.js",minfile:"min/grid.celledit-min.js"},{include:true,incfile:"grid.subgrid.js",minfile:"min/grid.subgrid-min.js"},{include:true,incfile:"grid.treegrid.js",minfile:"min/grid.treegrid-min.js"},{include:true,incfile:"grid.custom.js",minfile:"min/grid.custom-min.js"},{include:true,incfile:"grid.postext.js",minfile:"min/grid.postext-min.js"},{include:true,incfile:"grid.tbltogrid.js",minfile:"min/grid.tbltogrid-min.js"},{include:true,incfile:"grid.setcolumns.js",minfile:"min/grid.setcolumns-min.js"},{include:true,incfile:"grid.import.js",minfile:"min/grid.import-min.js"},{include:true,incfile:"jquery.fmatter.js",minfile:"min/jquery.fmatter-min.js"},{include:true,incfile:"json2.js",minfile:"min/json2-min.js"},{include:true,incfile:"JsonXml.js",minfile:"min/JsonXml-min.js"}];
var L;
for(var Q=0;
Q<T.length;
Q++){if(T[Q].include===true){if(V!==true){L=N+T[Q].incfile
}else{L=N+T[Q].minfile
}if(O!==true){if(jQuery.browser.safari||jQuery.browser.msie){jQuery.ajax({url:L,dataType:"script",async:false,cache:true})
}else{U(L)
}}else{P[P.length]=L
}}}if((O===true)&&(P.length>0)){var M=S(",",P);
U(R+M)
}function S(B,A){return((A instanceof Array)?A.join(B):A)
}function U(A){var B=document.getElementsByTagName("head")[0];
var C=document.createElement("script");
C.type="text/javascript";
C.charset="utf-8";
C.src=A;
B.appendChild(C)
}}jqGridInclude();