var xmlJsonClass={xml2json:function(G,J){if(G.nodeType===9){G=G.documentElement
}var H=this.removeWhite(G);
var I=this.toObj(H);
var F=this.toJson(I,G.nodeName,"\t");
return"{\n"+J+(J?F.replace(/\t/g,J):F.replace(/\t|\n/g,""))+"\n}"
},json2xml:function(J,F){var I=function(B,A,Q){var D="";
var E,R;
if(B instanceof Array){if(B.length===0){D+=Q+"<"+A+">__EMPTY_ARRAY_</"+A+">\n"
}else{for(E=0,R=B.length;
E<R;
E+=1){var C=Q+I(B[E],A,Q+"\t")+"\n";
D+=C
}}}else{if(typeof (B)==="object"){var O=false;
D+=Q+"<"+A;
var P;
for(P in B){if(B.hasOwnProperty(P)){if(P.charAt(0)==="@"){D+=" "+P.substr(1)+'="'+B[P].toString()+'"'
}else{O=true
}}}D+=O?">":"/>";
if(O){for(P in B){if(B.hasOwnProperty(P)){if(P==="#text"){D+=B[P]
}else{if(P==="#cdata"){D+="<![CDATA["+B[P]+"]]>"
}else{if(P.charAt(0)!=="@"){D+=I(B[P],P,Q+"\t")
}}}}}D+=(D.charAt(D.length-1)==="\n"?Q:"")+"</"+A+">"
}}else{if(typeof (B)==="function"){D+=Q+"<"+A+"><![CDATA["+B+"]]></"+A+">"
}else{if(B.toString()==='""'||B.toString().length===0){D+=Q+"<"+A+">__EMPTY_STRING_</"+A+">"
}else{D+=Q+"<"+A+">"+B.toString()+"</"+A+">"
}}}}return D
};
var G="";
var H;
for(H in J){if(J.hasOwnProperty(H)){G+=I(J[H],H,"")
}}return F?G.replace(/\t/g,F):G.replace(/\t|\n/g,"")
},parseXml:function(E){var G;
try{var H=new DOMParser();
G=H.parseFromString(E,"text/xml")
}catch(F){G=new ActiveXObject("Microsoft.XMLDOM");
G.async=false;
G.loadXML(E)
}return(G&&G.documentElement&&G.documentElement.tagName!="parsererror")?G:null
},toObj:function(J){var M={};
var N=/function/i;
if(J.nodeType===1){if(J.attributes.length){var O;
for(O=0;
O<J.attributes.length;
O+=1){M["@"+J.attributes[O].nodeName]=(J.attributes[O].nodeValue||"").toString()
}}if(J.firstChild){var K=0,P=0,I=false;
var L;
for(L=J.firstChild;
L;
L=L.nextSibling){if(L.nodeType===1){I=true
}else{if(L.nodeType===3&&L.nodeValue.match(/[^ \f\n\r\t\v]/)){K+=1
}else{if(L.nodeType===4){P+=1
}}}}if(I){if(K<2&&P<2){this.removeWhite(J);
for(L=J.firstChild;
L;
L=L.nextSibling){if(L.nodeType===3){M["#text"]=this.escape(L.nodeValue)
}else{if(L.nodeType===4){if(N.test(L.nodeValue)){M[L.nodeName]=[M[L.nodeName],L.nodeValue]
}else{M["#cdata"]=this.escape(L.nodeValue)
}}else{if(M[L.nodeName]){if(M[L.nodeName] instanceof Array){M[L.nodeName][M[L.nodeName].length]=this.toObj(L)
}else{M[L.nodeName]=[M[L.nodeName],this.toObj(L)]
}}else{M[L.nodeName]=this.toObj(L)
}}}}}else{if(!J.attributes.length){M=this.escape(this.innerXml(J))
}else{M["#text"]=this.escape(this.innerXml(J))
}}}else{if(K){if(!J.attributes.length){M=this.escape(this.innerXml(J));
if(M==="__EMPTY_ARRAY_"){M="[]"
}else{if(M==="__EMPTY_STRING_"){M=""
}}}else{M["#text"]=this.escape(this.innerXml(J))
}}else{if(P){if(P>1){M=this.escape(this.innerXml(J))
}else{for(L=J.firstChild;
L;
L=L.nextSibling){if(N.test(J.firstChild.nodeValue)){M=J.firstChild.nodeValue;
break
}else{M["#cdata"]=this.escape(L.nodeValue)
}}}}}}}if(!J.attributes.length&&!J.firstChild){M=null
}}else{if(J.nodeType===9){M=this.toObj(J.documentElement)
}else{alert("unhandled node type: "+J.nodeType)
}}return M
},toJson:function(K,L,S){var N=L?('"'+L+'"'):"";
if(K==="[]"){N+=(L?":[]":"[]")
}else{if(K instanceof Array){var T,Q;
for(Q=0,T=K.length;
Q<T;
Q+=1){K[Q]=this.toJson(K[Q],"",S+"\t")
}N+=(L?":[":"[")+(K.length>1?("\n"+S+"\t"+K.join(",\n"+S+"\t")+"\n"+S):K.join(""))+"]"
}else{if(K===null){N+=(L&&":")+"null"
}else{if(typeof (K)==="object"){var P=[];
var R;
for(R in K){if(K.hasOwnProperty(R)){P[P.length]=this.toJson(K[R],R,S+"\t")
}}N+=(L?":{":"{")+(P.length>1?("\n"+S+"\t"+P.join(",\n"+S+"\t")+"\n"+S):P.join(""))+"}"
}else{if(typeof (K)==="string"){var O=/(^-?\d+\.?\d*$)/;
var M=/function/i;
K=K.toString();
if(O.test(K)||M.test(K)||K==="false"||K==="true"){N+=(L&&":")+K
}else{N+=(L&&":")+'"'+K+'"'
}}else{N+=(L&&":")+K.toString()
}}}}}return N
},innerXml:function(E){var F="";
if("innerHTML" in E){F=E.innerHTML
}else{var G=function(C){var A="",B;
if(C.nodeType===1){A+="<"+C.nodeName;
for(B=0;
B<C.attributes.length;
B+=1){A+=" "+C.attributes[B].nodeName+'="'+(C.attributes[B].nodeValue||"").toString()+'"'
}if(C.firstChild){A+=">";
for(var D=C.firstChild;
D;
D=D.nextSibling){A+=G(D)
}A+="</"+C.nodeName+">"
}else{A+="/>"
}}else{if(C.nodeType===3){A+=C.nodeValue
}else{if(C.nodeType===4){A+="<![CDATA["+C.nodeValue+"]]>"
}}}return A
};
for(var H=E.firstChild;
H;
H=H.nextSibling){F+=G(H)
}}return F
},escape:function(B){return B.replace(/[\\]/g,"\\\\").replace(/[\"]/g,'\\"').replace(/[\n]/g,"\\n").replace(/[\r]/g,"\\r")
},removeWhite:function(E){E.normalize();
var D;
for(D=E.firstChild;
D;
){if(D.nodeType===3){if(!D.nodeValue.match(/[^ \f\n\r\t\v]/)){var F=D.nextSibling;
E.removeChild(D);
D=F
}else{D=D.nextSibling
}}else{if(D.nodeType===1){this.removeWhite(D);
D=D.nextSibling
}else{D=D.nextSibling
}}}return E
}};