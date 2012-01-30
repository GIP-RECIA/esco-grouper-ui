fluid_1_1=fluid_1_1||{};
(function(u,x){var o;
var w;
var AS;
var AW=0;
var y=0;
var AD=false;
var AK=-1;
var AL=-1;
var AV;
var AQ=false;
var AF=[];
var AI=[];
function AU(B,A,C){o.rootlump=x.XMLLump(0,-1);
AS=[o.rootlump];
AW=0;
y=0;
AD=false;
AK=-1;
AL=-1;
AV=B;
AQ=A;
AF=C;
if(AF){for(var D=0;
D<AF.length;
++D){AI[D]=[];
AF[D].tree=x.parseSelector(AF[D].selector)
}}}function v(){for(var A=AS.length-1;
A>=0;
--A){var B=AS[A];
if(B.rsfID!==undefined){return B
}}return o.rootlump
}function q(){var A=x.XMLLump(AW,y);
if(AQ){A.line=w.getLineNumber();
A.column=w.getColumnNumber()
}o.lumps[AW]=A;
++AW;
return A
}function AC(D,A,C){var B=D[A];
if(!B){B=[];
D[A]=B
}B[B.length]=C
}function AJ(A,C){if(A.indexOf("scr=contribute-")!==-1){var B=A.substring("scr=contribute-".length);
AC(o.collectmap,B,C)
}}var r=function(C){var B=r.options,D=B.parser[B.strictMode?"strict":"loose"].exec(C);
for(var A=0,E={};
A<14;
A++){E[B.key[A]]=D[A]||""
}E[B.q.name]={};
E[B.key[12]].replace(B.q.parser,function(G,H,F){if(H){E[B.q.name][H]=F
}});
return E
};
r.options={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};
function AN(B){var A=r(B);
if(A.protocol||B.charAt(0)==="/"){return B
}else{return AV+B
}}x.debugLump=function(B){var A=B.text;
A+=" at ";
A+="lump line "+B.line+" column "+B.column+" index "+B.lumpindex;
A+=parent.href===null?"":" in file "+parent.href;
return A
};
function AX(A){return"<"+A.tagname+">"
}function z(B,A){if(!A){return false
}return(" "+A+" ").indexOf(" "+B+" ")!==-1
}function AA(C,B){if(C.predList){for(var D=0;
D<C.predList.length;
++D){var A=C.predList[D];
if(A.id&&B.attributemap.id!==A.id){return false
}if(A.clazz&&!z(A.clazz,B.attributemap["class"])){return false
}if(A.tag&&B.tagname!==A.tag){return false
}}return true
}}function m(B){var E=undefined;
if(AF){for(var G=0;
G<AF.length;
++G){var D=AF[G];
var C=AI[G];
var A=C.length;
if(A<D.tree.length){var H=D.tree[A];
if(A>0){if(D.tree[A-1].child&&C[A-1]!==B.nestingdepth-1){continue
}}var F=AA(H,B);
if(F){C[C.length]=B.nestingdepth;
if(C.length===D.tree.length){if(E!==undefined){x.fail("Cutpoint specification error - node "+AX(B)+" has already matched with rsf:id of "+E)
}if(D.id===undefined||D.id===null){x.fail("Error in cutpoints list - entry at position "+G+" does not have an id set")
}E=D.id
}}}}}return E
}function s(){if(AF){for(var A=0;
A<AF.length;
++A){var B=AI[A];
if(B.length>0&&B[B.length-1]===y){B.length--
}}}}function AP(B,K){++y;
if(AD){AD=false;
var F=q();
F.nestingdepth--
}if(o.firstdocumentindex===-1){o.firstdocumentindex=AW
}var C=q();
var J=AS[AS.length-1];
C.uplump=J;
var M=w.getName();
C.tagname=M;
var L=C.attributemap=w.m_attributes;
var A=L[x.ID_ATTRIBUTE];
if(A===undefined){A=m(C)
}for(var G in L){var D=L[G];
if(/href|src|codebase|action/.test(G)){D=AN(D);
L[G]=D
}else{if(A===undefined&&/for|headers/.test(G)){A=L[x.ID_ATTRIBUTE]="scr=null"
}}}if(A){if(A.charCodeAt(0)===126){A=A.substring(1);
C.elide=true
}AJ(A,C);
C.rsfID=A;
var H=v();
if(!H.downmap){H.downmap={}
}AC(H.downmap,A,C);
AC(o.globalmap,A,C);
var I=A.indexOf(":");
if(I!==-1){var E=A.substring(0,I);
if(!J.finallump){J.finallump={}
}J.finallump[E]=C
}}C.text="<"+M+x.dumpAttributes(L)+">";
AS[AS.length]=C;
if(B){AB()
}}function AB(){s();
var A=q();
--y;
A.text="</"+w.getName()+">";
var B=AS[AS.length-1];
B.close_tag=o.lumps[AW-1];
AS.length--;
AD=true
}function AH(){if(AK!==-1){if(o.firstdocumentindex===-1){o.firstdocumentindex=AW
}var B=w.getContent().substr(AK,AL-AK);
AD=false;
var A=q();
A.text=B;
AK=-1
}}x.ID_ATTRIBUTE="rsf:id";
x.getPrefix=function(B){var A=B.indexOf(":");
return A===-1?B:B.substring(0,A)
};
x.SplitID=function(B){var C={};
var A=B.indexOf(":");
if(A===-1){C.prefix=B
}else{C.prefix=B.substring(0,A);
C.suffix=B.substring(A+1)
}return C
};
x.XMLLump=function(B,A){return{nestingdepth:A,lumpindex:B,parent:o}
};
x.XMLViewTemplate=function(){return{globalmap:{},collectmap:{},lumps:[],firstdocumentindex:-1}
};
x.fetchResources=function(F,B){var H=function(I){return{success:function(J){I.resourceText=J;
I.resourceKey=I.href;
I.queued=false;
x.fetchResources(F,B)
},error:function(L,J,K){I.fetchError={status:L.status,textStatus:J,errorThrown:K}
}}
};
var A=true;
for(var E in F){var G=F[E];
if(G.href&&!G.resourceText){if(!G.queued){var C=H(G);
u.ajax({url:G.href,success:C.success,error:C.error});
G.queued=true
}A=false
}else{if(G.nodeId&&!G.resourceText){var D=document.getElementById(G.nodeId);
G.resourceText=x.dom.getElementText(D);
G.resourceKey=G.nodeId
}}}if(A){if(u.browser.mozilla){setTimeout(function(){B(F)
},1)
}else{B(F)
}}};
x.XMLEncode=function(A){return A.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
};
x.dumpAttributes=function(A){var C="";
for(var B in A){var D=A[B];
if(D!==null&&D!==undefined){C+=" "+B+'="'+D+'"'
}}return C
};
x.aggregateMMap=function(B,C){for(var A in C){var D=B[A];
if(!D){B[A]=[]
}B[A]=B[A].concat(C[A])
}};
var n=/(\\u[\dabcdef]{4}|\\x[\dabcdef]{2})/g;
x.unescapeProperties=function(D){D=D.replace(n,function(F){var E=F.substring(2);
var G=parseInt(E,16);
return String.fromCharCode(G)
});
var B=0;
while(true){var A=D.indexOf("\\",B);
if(A===-1){break
}if(A===D.length-1){return[D.substring(0,D.length-1),true]
}var C=D.charAt(A+1);
if(C==="n"){C="\n"
}if(C==="r"){C="\r"
}if(C==="t"){C="\t"
}D=D.substring(0,A)+C+D.substring(A+2);
B=A+1
}return[D,false]
};
var p=/[^\\][\s:=]/;
x.parseJavaProperties=function(D){var I={};
D=D.replace(/\r\n/g,"\n");
D=D.replace(/\r/g,"\n");
lines=D.split("\n");
var C,E,J,A,F;
for(var H=0;
H<lines.length;
++H){var B=u.trim(lines[H]);
if(!B||B.charAt(0)==="#"||B.charAt(0)==="!"){continue
}if(!C){J="";
var G=B.search(p);
if(G===-1){E=B;
A=""
}else{E=u.trim(B.substring(0,G+1));
A=u.trim(B.substring(G+2));
if(A.charAt(0)===":"||A.charAt(0)==="="){A=u.trim(A.substring(1))
}}E=x.unescapeProperties(E)[0];
F=x.unescapeProperties(A)
}else{F=x.unescapeProperties(B)
}C=F[1];
if(!F[1]){I[E]=J+F[0]
}else{J+=F[0]
}}return I
};
x.parseTemplates=function(F,D,A){var H=[];
H.globalmap={};
for(var E=0;
E<D.length;
++E){var G=F[D[E]];
var C=G.href.lastIndexOf("/");
var I=C===-1?"":G.href.substring(0,C+1);
var B=x.parseTemplate(G.resourceText,I,A.scanStart&&E===0,G.cutpoints,A);
if(E===0){x.aggregateMMap(H.globalmap,B.globalmap)
}B.href=G.href;
B.baseURL=I;
B.resourceKey=G.resourceKey;
H[E]=B;
x.aggregateMMap(H.globalmap,B.rootlump.downmap)
}return H
};
x.parseTemplate=function(C,G,E,F,A){o=x.XMLViewTemplate();
A=A||{};
AU(G,A.debugMode,F);
var D=C.indexOf(x.ID_ATTRIBUTE);
if(E){var I=C.indexOf(">",D);
w=new XMLP(C.substring(I+1))
}else{w=new XMLP(C)
}parseloop:while(true){var H=w.next();
switch(H){case XMLP._ELM_B:AH();
AP(false,"");
break;
case XMLP._ELM_E:AH();
AB();
break;
case XMLP._ELM_EMP:AH();
AP(true,"");
break;
case XMLP._PI:case XMLP._DTD:AK=-1;
continue;
case XMLP._TEXT:case XMLP._ENTITY:case XMLP._CDATA:case XMLP._COMMENT:if(AK===-1){AK=w.m_cB
}AL=w.m_cE;
break;
case XMLP._ERROR:x.setLogging(true);
var B="Error parsing template: "+w.m_cAlt+" at line "+w.getLineNumber();
x.log(B);
x.log("Just read: "+w.m_xml.substring(w.m_iP-30,w.m_iP));
x.log("Still to read: "+w.m_xml.substring(w.m_iP,w.m_iP+30));
x.fail(B);
break parseloop;
case XMLP._NONE:break parseloop
}}return o
};
var AR="(?:[\\w\u0128-\uFFFF*_-]|\\\\.)";
var AT=new RegExp("^>\\s*("+AR+"+)");
var t=new RegExp("^("+AR+"+)(#)("+AR+"+)");
var AE=new RegExp("^s*([#.]?)("+AR+"*)");
var AO=new RegExp("([#.]?)("+AR+"+)","g");
var AM=new RegExp("\\s*(>)?\\s*","g");
var AG=new RegExp("^\\w*$");
x.parseSelector=function(D){var I=[];
D=u.trim(D);
AO.lastIndex=0;
var E=0;
while(true){var G=[];
while(true){var A=AO.exec(D);
if(!A||A.index!==E){break
}var F={};
var B=A[2];
if(A[1]===""){F.tag=B
}else{if(A[1]==="#"){F.id=B
}else{if(A[1]==="."){F.clazz=B
}}}G[G.length]=F;
E=AO.lastIndex
}AM.lastIndex=E;
var J={predList:G};
var H=AM.exec(D);
if(!H||H.index!==E){var C=D.substring(E);
x.fail("Error in selector string - can not match child selector expression at "+C)
}if(H[1]===">"){J.child=true
}I[I.length]=J;
if(AM.lastIndex>=D.length){break
}E=AM.lastIndex;
AO.lastIndex=AM.lastIndex
}return I
}
})(jQuery,fluid_1_1);