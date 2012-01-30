var xmlJsonClass={xml2json:function(E,B){if(E.nodeType===9){E=E.documentElement
}var D=this.removeWhite(E);
var C=this.toObj(D);
var A=this.toJson(C,E.nodeName,"\t");
return"{\n"+B+(B?A.replace(/\t/g,B):A.replace(/\t|\n/g,""))+"\n}"
},json2xml:function(B,A){var C=function(M,N,G){var K="";
var J,F;
if(M instanceof Array){if(M.length===0){K+=G+"<"+N+">__EMPTY_ARRAY_</"+N+">\n"
}else{for(J=0,F=M.length;
J<F;
J+=1){var L=G+C(M[J],N,G+"\t")+"\n";
K+=L
}}}else{if(typeof (M)==="object"){var I=false;
K+=G+"<"+N;
var H;
for(H in M){if(M.hasOwnProperty(H)){if(H.charAt(0)==="@"){K+=" "+H.substr(1)+'="'+M[H].toString()+'"'
}else{I=true
}}}K+=I?">":"/>";
if(I){for(H in M){if(M.hasOwnProperty(H)){if(H==="#text"){K+=M[H]
}else{if(H==="#cdata"){K+="<![CDATA["+M[H]+"]]>"
}else{if(H.charAt(0)!=="@"){K+=C(M[H],H,G+"\t")
}}}}}K+=(K.charAt(K.length-1)==="\n"?G:"")+"</"+N+">"
}}else{if(typeof (M)==="function"){K+=G+"<"+N+"><![CDATA["+M+"]]></"+N+">"
}else{if(M.toString()==='""'||M.toString().length===0){K+=G+"<"+N+">__EMPTY_STRING_</"+N+">"
}else{K+=G+"<"+N+">"+M.toString()+"</"+N+">"
}}}}return K
};
var E="";
var D;
for(D in B){if(B.hasOwnProperty(D)){E+=C(B[D],D,"")
}}return A?E.replace(/\t/g,A):E.replace(/\t|\n/g,"")
},parseXml:function(A){var C;
try{var B=new DOMParser();
C=B.parseFromString(A,"text/xml")
}catch(D){C=new ActiveXObject("Microsoft.XMLDOM");
C.async=false;
C.loadXML(A)
}return(C&&C.documentElement&&C.documentElement.tagName!="parsererror")?C:null
},toObj:function(H){var E={};
var D=/function/i;
if(H.nodeType===1){if(H.attributes.length){var C;
for(C=0;
C<H.attributes.length;
C+=1){E["@"+H.attributes[C].nodeName]=(H.attributes[C].nodeValue||"").toString()
}}if(H.firstChild){var G=0,B=0,A=false;
var F;
for(F=H.firstChild;
F;
F=F.nextSibling){if(F.nodeType===1){A=true
}else{if(F.nodeType===3&&F.nodeValue.match(/[^ \f\n\r\t\v]/)){G+=1
}else{if(F.nodeType===4){B+=1
}}}}if(A){if(G<2&&B<2){this.removeWhite(H);
for(F=H.firstChild;
F;
F=F.nextSibling){if(F.nodeType===3){E["#text"]=this.escape(F.nodeValue)
}else{if(F.nodeType===4){if(D.test(F.nodeValue)){E[F.nodeName]=[E[F.nodeName],F.nodeValue]
}else{E["#cdata"]=this.escape(F.nodeValue)
}}else{if(E[F.nodeName]){if(E[F.nodeName] instanceof Array){E[F.nodeName][E[F.nodeName].length]=this.toObj(F)
}else{E[F.nodeName]=[E[F.nodeName],this.toObj(F)]
}}else{E[F.nodeName]=this.toObj(F)
}}}}}else{if(!H.attributes.length){E=this.escape(this.innerXml(H))
}else{E["#text"]=this.escape(this.innerXml(H))
}}}else{if(G){if(!H.attributes.length){E=this.escape(this.innerXml(H));
if(E==="__EMPTY_ARRAY_"){E="[]"
}else{if(E==="__EMPTY_STRING_"){E=""
}}}else{E["#text"]=this.escape(this.innerXml(H))
}}else{if(B){if(B>1){E=this.escape(this.innerXml(H))
}else{for(F=H.firstChild;
F;
F=F.nextSibling){if(D.test(H.firstChild.nodeValue)){E=H.firstChild.nodeValue;
break
}else{E["#cdata"]=this.escape(F.nodeValue)
}}}}}}}if(!H.attributes.length&&!H.firstChild){E=null
}}else{if(H.nodeType===9){E=this.toObj(H.documentElement)
}else{alert("unhandled node type: "+H.nodeType)
}}return E
},toJson:function(D,C,F){var A=C?('"'+C+'"'):"";
if(D==="[]"){A+=(C?":[]":"[]")
}else{if(D instanceof Array){var E,H;
for(H=0,E=D.length;
H<E;
H+=1){D[H]=this.toJson(D[H],"",F+"\t")
}A+=(C?":[":"[")+(D.length>1?("\n"+F+"\t"+D.join(",\n"+F+"\t")+"\n"+F):D.join(""))+"]"
}else{if(D===null){A+=(C&&":")+"null"
}else{if(typeof (D)==="object"){var I=[];
var G;
for(G in D){if(D.hasOwnProperty(G)){I[I.length]=this.toJson(D[G],G,F+"\t")
}}A+=(C?":{":"{")+(I.length>1?("\n"+F+"\t"+I.join(",\n"+F+"\t")+"\n"+F):I.join(""))+"}"
}else{if(typeof (D)==="string"){var J=/(^-?\d+\.?\d*$)/;
var B=/function/i;
D=D.toString();
if(J.test(D)||B.test(D)||D==="false"||D==="true"){A+=(C&&":")+D
}else{A+=(C&&":")+'"'+D+'"'
}}else{A+=(C&&":")+D.toString()
}}}}}return A
},innerXml:function(A){var D="";
if("innerHTML" in A){D=A.innerHTML
}else{var C=function(F){var H="",G;
if(F.nodeType===1){H+="<"+F.nodeName;
for(G=0;
G<F.attributes.length;
G+=1){H+=" "+F.attributes[G].nodeName+'="'+(F.attributes[G].nodeValue||"").toString()+'"'
}if(F.firstChild){H+=">";
for(var E=F.firstChild;
E;
E=E.nextSibling){H+=C(E)
}H+="</"+F.nodeName+">"
}else{H+="/>"
}}else{if(F.nodeType===3){H+=F.nodeValue
}else{if(F.nodeType===4){H+="<![CDATA["+F.nodeValue+"]]>"
}}}return H
};
for(var B=A.firstChild;
B;
B=B.nextSibling){D+=C(B)
}}return D
},escape:function(A){return A.replace(/[\\]/g,"\\\\").replace(/[\"]/g,'\\"').replace(/[\n]/g,"\\n").replace(/[\r]/g,"\\r")
},removeWhite:function(C){C.normalize();
var A;
for(A=C.firstChild;
A;
){if(A.nodeType===3){if(!A.nodeValue.match(/[^ \f\n\r\t\v]/)){var B=A.nextSibling;
C.removeChild(A);
A=B
}else{A=A.nextSibling
}}else{if(A.nodeType===1){this.removeWhite(A);
A=A.nextSibling
}else{A=A.nextSibling
}}}return C
}};