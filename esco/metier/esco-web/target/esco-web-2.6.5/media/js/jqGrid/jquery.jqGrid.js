function jqGridInclude(){var B="js/";
var A=false;
var K=new Array();
var I="combine.php?type=javascript&files=";
var E=true;
var G=[{include:true,incfile:"grid.locale-en.js",minfile:"min/grid.locale-en-min.js"},{include:true,incfile:"grid.base.js",minfile:"min/grid.base-min.js"},{include:true,incfile:"grid.common.js",minfile:"min/grid.common-min.js"},{include:true,incfile:"grid.formedit.js",minfile:"min/grid.formedit-min.js"},{include:true,incfile:"grid.inlinedit.js",minfile:"min/grid.inlinedit-min.js"},{include:true,incfile:"grid.celledit.js",minfile:"min/grid.celledit-min.js"},{include:true,incfile:"grid.subgrid.js",minfile:"min/grid.subgrid-min.js"},{include:true,incfile:"grid.treegrid.js",minfile:"min/grid.treegrid-min.js"},{include:true,incfile:"grid.custom.js",minfile:"min/grid.custom-min.js"},{include:true,incfile:"grid.postext.js",minfile:"min/grid.postext-min.js"},{include:true,incfile:"grid.tbltogrid.js",minfile:"min/grid.tbltogrid-min.js"},{include:true,incfile:"grid.setcolumns.js",minfile:"min/grid.setcolumns-min.js"},{include:true,incfile:"grid.import.js",minfile:"min/grid.import-min.js"},{include:true,incfile:"jquery.fmatter.js",minfile:"min/jquery.fmatter-min.js"},{include:true,incfile:"json2.js",minfile:"min/json2-min.js"},{include:true,incfile:"JsonXml.js",minfile:"min/JsonXml-min.js"}];
var D;
for(var J=0;
J<G.length;
J++){if(G[J].include===true){if(E!==true){D=B+G[J].incfile
}else{D=B+G[J].minfile
}if(A!==true){if(jQuery.browser.safari||jQuery.browser.msie){jQuery.ajax({url:D,dataType:"script",async:false,cache:true})
}else{F(D)
}}else{K[K.length]=D
}}}if((A===true)&&(K.length>0)){var C=H(",",K);
F(I+C)
}function H(M,L){return((L instanceof Array)?L.join(M):L)
}function F(L){var N=document.getElementsByTagName("head")[0];
var M=document.createElement("script");
M.type="text/javascript";
M.charset="utf-8";
M.src=L;
N.appendChild(M)
}}jqGridInclude();