fluid_1_1=fluid_1_1||{};
(function(R,O){var X;
var P;
var f;
var b=0;
var N=0;
var I=false;
var B=-1;
var A=-1;
var c;
var h=false;
var G=[];
var D=[];
function d(p,m,o){X.rootlump=O.XMLLump(0,-1);
f=[X.rootlump];
b=0;
N=0;
I=false;
B=-1;
A=-1;
c=p;
h=m;
G=o;
if(G){for(var n=0;
n<G.length;
++n){D[n]=[];
G[n].tree=O.parseSelector(G[n].selector)
}}}function Q(){for(var m=f.length-1;
m>=0;
--m){var n=f[m];
if(n.rsfID!==undefined){return n
}}return X.rootlump
}function V(){var m=O.XMLLump(b,N);
if(h){m.line=P.getLineNumber();
m.column=P.getColumnNumber()
}X.lumps[b]=m;
++b;
return m
}function J(n,m,o){var p=n[m];
if(!p){p=[];
n[m]=p
}p[p.length]=o
}function C(m,n){if(m.indexOf("scr=contribute-")!==-1){var o=m.substring("scr=contribute-".length);
J(X.collectmap,o,n)
}}var U=function(p){var q=U.options,o=q.parser[q.strictMode?"strict":"loose"].exec(p);
for(var m=0,n={};
m<14;
m++){n[q.key[m]]=o[m]||""
}n[q.q.name]={};
n[q.key[12]].replace(q.q.parser,function(s,r,t){if(r){n[q.q.name][r]=t
}});
return n
};
U.options={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};
function k(n){var m=U(n);
if(m.protocol||n.charAt(0)==="/"){return n
}else{return c+n
}}O.debugLump=function(n){var m=n.text;
m+=" at ";
m+="lump line "+n.line+" column "+n.column+" index "+n.lumpindex;
m+=parent.href===null?"":" in file "+parent.href;
return m
};
function a(m){return"<"+m.tagname+">"
}function M(n,m){if(!m){return false
}return(" "+m+" ").indexOf(" "+n+" ")!==-1
}function L(o,p){if(o.predList){for(var n=0;
n<o.predList.length;
++n){var m=o.predList[n];
if(m.id&&p.attributemap.id!==m.id){return false
}if(m.clazz&&!M(m.clazz,p.attributemap["class"])){return false
}if(m.tag&&p.tagname!==m.tag){return false
}}return true
}}function Z(t){var q=undefined;
if(G){for(var o=0;
o<G.length;
++o){var r=G[o];
var s=D[o];
var m=s.length;
if(m<r.tree.length){var n=r.tree[m];
if(m>0){if(r.tree[m-1].child&&s[m-1]!==t.nestingdepth-1){continue
}}var p=L(n,t);
if(p){s[s.length]=t.nestingdepth;
if(s.length===r.tree.length){if(q!==undefined){O.fail("Cutpoint specification error - node "+a(t)+" has already matched with rsf:id of "+q)
}if(r.id===undefined||r.id===null){O.fail("Error in cutpoints list - entry at position "+o+" does not have an id set")
}q=r.id
}}}}}return q
}function T(){if(G){for(var m=0;
m<G.length;
++m){var n=D[m];
if(n.length>0&&n[n.length-1]===N){n.length--
}}}}function i(q,u){++N;
if(I){I=false;
var m=V();
m.nestingdepth--
}if(X.firstdocumentindex===-1){X.firstdocumentindex=b
}var p=V();
var v=f[f.length-1];
p.uplump=v;
var s=P.getName();
p.tagname=s;
var t=p.attributemap=P.m_attributes;
var r=t[O.ID_ATTRIBUTE];
if(r===undefined){r=Z(p)
}for(var y in t){var o=t[y];
if(/href|src|codebase|action/.test(y)){o=k(o);
t[y]=o
}else{if(r===undefined&&/for|headers/.test(y)){r=t[O.ID_ATTRIBUTE]="scr=null"
}}}if(r){if(r.charCodeAt(0)===126){r=r.substring(1);
p.elide=true
}C(r,p);
p.rsfID=r;
var x=Q();
if(!x.downmap){x.downmap={}
}J(x.downmap,r,p);
J(X.globalmap,r,p);
var w=r.indexOf(":");
if(w!==-1){var n=r.substring(0,w);
if(!v.finallump){v.finallump={}
}v.finallump[n]=p
}}p.text="<"+s+O.dumpAttributes(t)+">";
f[f.length]=p;
if(q){K()
}}function K(){T();
var m=V();
--N;
m.text="</"+P.getName()+">";
var n=f[f.length-1];
n.close_tag=X.lumps[b-1];
f.length--;
I=true
}function E(){if(B!==-1){if(X.firstdocumentindex===-1){X.firstdocumentindex=b
}var n=P.getContent().substr(B,A-B);
I=false;
var m=V();
m.text=n;
B=-1
}}O.ID_ATTRIBUTE="rsf:id";
O.getPrefix=function(n){var m=n.indexOf(":");
return m===-1?n:n.substring(0,m)
};
O.SplitID=function(o){var n={};
var m=o.indexOf(":");
if(m===-1){n.prefix=o
}else{n.prefix=o.substring(0,m);
n.suffix=o.substring(m+1)
}return n
};
O.XMLLump=function(n,m){return{nestingdepth:m,lumpindex:n,parent:X}
};
O.XMLViewTemplate=function(){return{globalmap:{},collectmap:{},lumps:[],firstdocumentindex:-1}
};
O.fetchResources=function(p,t){var n=function(u){return{success:function(v){u.resourceText=v;
u.resourceKey=u.href;
u.queued=false;
O.fetchResources(p,t)
},error:function(v,x,w){u.fetchError={status:v.status,textStatus:x,errorThrown:w}
}}
};
var m=true;
for(var q in p){var o=p[q];
if(o.href&&!o.resourceText){if(!o.queued){var s=n(o);
R.ajax({url:o.href,success:s.success,error:s.error});
o.queued=true
}m=false
}else{if(o.nodeId&&!o.resourceText){var r=document.getElementById(o.nodeId);
o.resourceText=O.dom.getElementText(r);
o.resourceKey=o.nodeId
}}}if(m){if(R.browser.mozilla){setTimeout(function(){t(p)
},1)
}else{t(p)
}}};
O.XMLEncode=function(m){return m.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
};
O.dumpAttributes=function(m){var o="";
for(var p in m){var n=m[p];
if(n!==null&&n!==undefined){o+=" "+p+'="'+n+'"'
}}return o
};
O.aggregateMMap=function(p,o){for(var m in o){var n=p[m];
if(!n){p[m]=[]
}p[m]=p[m].concat(o[m])
}};
var Y=/(\\u[\dabcdef]{4}|\\x[\dabcdef]{2})/g;
O.unescapeProperties=function(n){n=n.replace(Y,function(r){var s=r.substring(2);
var q=parseInt(s,16);
return String.fromCharCode(q)
});
var p=0;
while(true){var m=n.indexOf("\\",p);
if(m===-1){break
}if(m===n.length-1){return[n.substring(0,n.length-1),true]
}var o=n.charAt(m+1);
if(o==="n"){o="\n"
}if(o==="r"){o="\r"
}if(o==="t"){o="\t"
}n=n.substring(0,m)+o+n.substring(m+2);
p=m+1
}return[n,false]
};
var W=/[^\\][\s:=]/;
O.parseJavaProperties=function(o){var t={};
o=o.replace(/\r\n/g,"\n");
o=o.replace(/\r/g,"\n");
lines=o.split("\n");
var p,n,s,r,m;
for(var u=0;
u<lines.length;
++u){var q=R.trim(lines[u]);
if(!q||q.charAt(0)==="#"||q.charAt(0)==="!"){continue
}if(!p){s="";
var v=q.search(W);
if(v===-1){n=q;
r=""
}else{n=R.trim(q.substring(0,v+1));
r=R.trim(q.substring(v+2));
if(r.charAt(0)===":"||r.charAt(0)==="="){r=R.trim(r.substring(1))
}}n=O.unescapeProperties(n)[0];
m=O.unescapeProperties(r)
}else{m=O.unescapeProperties(q)
}p=m[1];
if(!m[1]){t[n]=s+m[0]
}else{s+=m[0]
}}return t
};
O.parseTemplates=function(m,o,r){var t=[];
t.globalmap={};
for(var n=0;
n<o.length;
++n){var u=m[o[n]];
var p=u.href.lastIndexOf("/");
var s=p===-1?"":u.href.substring(0,p+1);
var q=O.parseTemplate(u.resourceText,s,r.scanStart&&n===0,u.cutpoints,r);
if(n===0){O.aggregateMMap(t.globalmap,q.globalmap)
}q.href=u.href;
q.baseURL=s;
q.resourceKey=u.resourceKey;
t[n]=q;
O.aggregateMMap(t.globalmap,q.rootlump.downmap)
}return t
};
O.parseTemplate=function(p,u,n,m,r){X=O.XMLViewTemplate();
r=r||{};
d(u,r.debugMode,m);
var o=p.indexOf(O.ID_ATTRIBUTE);
if(n){var s=p.indexOf(">",o);
P=new XMLP(p.substring(s+1))
}else{P=new XMLP(p)
}parseloop:while(true){var t=P.next();
switch(t){case XMLP._ELM_B:E();
i(false,"");
break;
case XMLP._ELM_E:E();
K();
break;
case XMLP._ELM_EMP:E();
i(true,"");
break;
case XMLP._PI:case XMLP._DTD:B=-1;
continue;
case XMLP._TEXT:case XMLP._ENTITY:case XMLP._CDATA:case XMLP._COMMENT:if(B===-1){B=P.m_cB
}A=P.m_cE;
break;
case XMLP._ERROR:O.setLogging(true);
var q="Error parsing template: "+P.m_cAlt+" at line "+P.getLineNumber();
O.log(q);
O.log("Just read: "+P.m_xml.substring(P.m_iP-30,P.m_iP));
O.log("Still to read: "+P.m_xml.substring(P.m_iP,P.m_iP+30));
O.fail(q);
break parseloop;
case XMLP._NONE:break parseloop
}}return X
};
var g="(?:[\\w\u0128-\uFFFF*_-]|\\\\.)";
var e=new RegExp("^>\\s*("+g+"+)");
var S=new RegExp("^("+g+"+)(#)("+g+"+)");
var H=new RegExp("^s*([#.]?)("+g+"*)");
var j=new RegExp("([#.]?)("+g+"+)","g");
var l=new RegExp("\\s*(>)?\\s*","g");
var F=new RegExp("^\\w*$");
O.parseSelector=function(o){var t=[];
o=R.trim(o);
j.lastIndex=0;
var n=0;
while(true){var v=[];
while(true){var r=j.exec(o);
if(!r||r.index!==n){break
}var m={};
var q=r[2];
if(r[1]===""){m.tag=q
}else{if(r[1]==="#"){m.id=q
}else{if(r[1]==="."){m.clazz=q
}}}v[v.length]=m;
n=j.lastIndex
}l.lastIndex=n;
var s={predList:v};
var u=l.exec(o);
if(!u||u.index!==n){var p=o.substring(n);
O.fail("Error in selector string - can not match child selector expression at "+p)
}if(u[1]===">"){s.child=true
}t[t.length]=s;
if(l.lastIndex>=o.length){break
}n=l.lastIndex;
j.lastIndex=l.lastIndex
}return t
}
})(jQuery,fluid_1_1);