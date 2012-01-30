function Sarissa(){}Sarissa.VERSION="0.9.9.4";
Sarissa.PARSED_OK="Document contains no parsing errors";
Sarissa.PARSED_EMPTY="Document is empty";
Sarissa.PARSED_UNKNOWN_ERROR="Not well-formed or other error";
Sarissa.IS_ENABLED_TRANSFORM_NODE=false;
Sarissa.REMOTE_CALL_FLAG="gr.abiss.sarissa.REMOTE_CALL_FLAG";
Sarissa._lastUniqueSuffix=0;
Sarissa._getUniqueSuffix=function(){return Sarissa._lastUniqueSuffix++
};
Sarissa._SARISSA_IEPREFIX4XSLPARAM="";
Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION=document.implementation&&true;
Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT=Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.createDocument;
Sarissa._SARISSA_HAS_DOM_FEATURE=Sarissa._SARISSA_HAS_DOM_IMPLEMENTATION&&document.implementation.hasFeature;
Sarissa._SARISSA_IS_MOZ=Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT&&Sarissa._SARISSA_HAS_DOM_FEATURE;
Sarissa._SARISSA_IS_SAFARI=navigator.userAgent.toLowerCase().indexOf("safari")!=-1||navigator.userAgent.toLowerCase().indexOf("konqueror")!=-1;
Sarissa._SARISSA_IS_SAFARI_OLD=Sarissa._SARISSA_IS_SAFARI&&(parseInt((navigator.userAgent.match(/AppleWebKit\/(\d+)/)||{})[1],10)<420);
Sarissa._SARISSA_IS_IE=document.all&&window.ActiveXObject&&navigator.userAgent.toLowerCase().indexOf("msie")>-1&&navigator.userAgent.toLowerCase().indexOf("opera")==-1;
Sarissa._SARISSA_IS_OPERA=navigator.userAgent.toLowerCase().indexOf("opera")!=-1;
if(!window.Node||!Node.ELEMENT_NODE){Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12}
}if(Sarissa._SARISSA_IS_SAFARI_OLD){HTMLHtmlElement=document.createElement("html").constructor;
Node=HTMLElement={};
HTMLElement.prototype=HTMLHtmlElement.__proto__.__proto__;
HTMLDocument=Document=document.constructor;
var x=new DOMParser();
XMLDocument=x.constructor;
Element=x.parseFromString("<Single />","text/xml").documentElement.constructor;
x=null
}if(typeof XMLDocument=="undefined"&&typeof Document!="undefined"){XMLDocument=Document
}if(Sarissa._SARISSA_IS_IE){Sarissa._SARISSA_IEPREFIX4XSLPARAM="xsl:";
var _SARISSA_DOM_PROGID="";
var _SARISSA_XMLHTTP_PROGID="";
var _SARISSA_DOM_XMLWRITER="";
Sarissa.pickRecentProgID=function(J){var K=false,H;
var I;
for(var M=0;
M<J.length&&!K;
M++){try{var N=new ActiveXObject(J[M]);
I=J[M];
K=true
}catch(L){H=L
}}if(!K){throw"Could not retrieve a valid progID of Class: "+J[J.length-1]+". (original exception: "+H+")"
}J=null;
return I
};
_SARISSA_DOM_PROGID=null;
_SARISSA_THREADEDDOM_PROGID=null;
_SARISSA_XSLTEMPLATE_PROGID=null;
_SARISSA_XMLHTTP_PROGID=null;
XMLHttpRequest=function(){if(!_SARISSA_XMLHTTP_PROGID){_SARISSA_XMLHTTP_PROGID=Sarissa.pickRecentProgID(["Msxml2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"])
}return new ActiveXObject(_SARISSA_XMLHTTP_PROGID)
};
Sarissa.getDomDocument=function(H,E){if(!_SARISSA_DOM_PROGID){_SARISSA_DOM_PROGID=Sarissa.pickRecentProgID(["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"])
}var G=new ActiveXObject(_SARISSA_DOM_PROGID);
if(E){var F="";
if(H){if(E.indexOf(":")>1){F=E.substring(0,E.indexOf(":"));
E=E.substring(E.indexOf(":")+1)
}else{F="a"+Sarissa._getUniqueSuffix()
}}if(H){G.loadXML("<"+F+":"+E+" xmlns:"+F+'="'+H+'" />')
}else{G.loadXML("<"+E+" />")
}}return G
};
Sarissa.getParseErrorText=function(F){var D=Sarissa.PARSED_OK;
if(F&&F.parseError&&F.parseError.errorCode&&F.parseError.errorCode!=0){D="XML Parsing Error: "+F.parseError.reason+"\nLocation: "+F.parseError.url+"\nLine Number "+F.parseError.line+", Column "+F.parseError.linepos+":\n"+F.parseError.srcText+"\n";
for(var E=0;
E<F.parseError.linepos;
E++){D+="-"
}D+="^\n"
}else{if(F.documentElement===null){D=Sarissa.PARSED_EMPTY
}}return D
};
Sarissa.setXpathNamespaces=function(C,D){C.setProperty("SelectionLanguage","XPath");
C.setProperty("SelectionNamespaces",D)
};
XSLTProcessor=function(){if(!_SARISSA_XSLTEMPLATE_PROGID){_SARISSA_XSLTEMPLATE_PROGID=Sarissa.pickRecentProgID(["Msxml2.XSLTemplate.6.0","MSXML2.XSLTemplate.3.0"])
}this.template=new ActiveXObject(_SARISSA_XSLTEMPLATE_PROGID);
this.processor=null
};
XSLTProcessor.prototype.importStylesheet=function(H){if(!_SARISSA_THREADEDDOM_PROGID){_SARISSA_THREADEDDOM_PROGID=Sarissa.pickRecentProgID(["MSXML2.FreeThreadedDOMDocument.6.0","MSXML2.FreeThreadedDOMDocument.3.0"])
}H.setProperty("SelectionLanguage","XPath");
H.setProperty("SelectionNamespaces","xmlns:xsl='http://www.w3.org/1999/XSL/Transform'");
var E=new ActiveXObject(_SARISSA_THREADEDDOM_PROGID);
try{E.resolveExternals=true;
E.setProperty("AllowDocumentFunction",true)
}catch(F){}if(H.url&&H.selectSingleNode("//xsl:*[local-name() = 'import' or local-name() = 'include']")!=null){E.async=false;
E.load(H.url)
}else{E.loadXML(H.xml)
}E.setProperty("SelectionNamespaces","xmlns:xsl='http://www.w3.org/1999/XSL/Transform'");
var G=E.selectSingleNode("//xsl:output");
if(G){this.outputMethod=G.getAttribute("method")
}else{delete this.outputMethod
}this.template.stylesheet=E;
this.processor=this.template.createProcessor();
this.paramsSet=[]
};
XSLTProcessor.prototype.transformToDocument=function(D){var E;
if(_SARISSA_THREADEDDOM_PROGID){this.processor.input=D;
E=new ActiveXObject(_SARISSA_DOM_PROGID);
this.processor.output=E;
this.processor.transform();
return E
}else{if(!_SARISSA_DOM_XMLWRITER){_SARISSA_DOM_XMLWRITER=Sarissa.pickRecentProgID(["Msxml2.MXXMLWriter.6.0","Msxml2.MXXMLWriter.3.0","MSXML2.MXXMLWriter","MSXML.MXXMLWriter","Microsoft.XMLDOM"])
}this.processor.input=D;
E=new ActiveXObject(_SARISSA_DOM_XMLWRITER);
this.processor.output=E;
this.processor.transform();
var F=new ActiveXObject(_SARISSA_DOM_PROGID);
F.loadXML(E.output+"");
return F
}};
XSLTProcessor.prototype.transformToFragment=function(H,K){this.processor.input=H;
this.processor.transform();
var J=this.processor.output;
var I=K.createDocumentFragment();
var M;
if(this.outputMethod=="text"){I.appendChild(K.createTextNode(J))
}else{if(K.body&&K.body.innerHTML){M=K.createElement("div");
M.innerHTML=J;
while(M.hasChildNodes()){I.appendChild(M.firstChild)
}}else{var N=new ActiveXObject(_SARISSA_DOM_PROGID);
if(J.substring(0,5)=="<?xml"){J=J.substring(J.indexOf("?>")+2)
}var L="".concat("<my>",J,"</my>");
N.loadXML(L);
M=N.documentElement;
while(M.hasChildNodes()){I.appendChild(M.firstChild)
}}}return I
};
XSLTProcessor.prototype.setParameter=function(D,F,E){E=E?E:"";
if(D){this.processor.addParameter(F,E,D)
}else{this.processor.addParameter(F,E)
}D=""+(D||"");
if(!this.paramsSet[D]){this.paramsSet[D]=[]
}this.paramsSet[D][F]=E
};
XSLTProcessor.prototype.getParameter=function(D,C){D=""+(D||"");
if(this.paramsSet[D]&&this.paramsSet[D][C]){return this.paramsSet[D][C]
}else{return null
}};
XSLTProcessor.prototype.clearParameters=function(){for(var D in this.paramsSet){for(var C in this.paramsSet[D]){if(D!=""){this.processor.addParameter(C,"",D)
}else{this.processor.addParameter(C,"")
}}}this.paramsSet=[]
}
}else{if(Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT){Sarissa.__handleLoad__=function(B){Sarissa.__setReadyState__(B,4)
};
_sarissa_XMLDocument_onload=function(){Sarissa.__handleLoad__(this)
};
Sarissa.__setReadyState__=function(C,D){C.readyState=D;
C.readystate=D;
if(C.onreadystatechange!=null&&typeof C.onreadystatechange=="function"){C.onreadystatechange()
}};
Sarissa.getDomDocument=function(D,E){var F=document.implementation.createDocument(D?D:null,E?E:null,null);
if(!F.onreadystatechange){F.onreadystatechange=null
}if(!F.readyState){F.readyState=0
}F.addEventListener("load",_sarissa_XMLDocument_onload,false);
return F
};
if(window.XMLDocument){}else{if(Sarissa._SARISSA_HAS_DOM_FEATURE&&window.Document&&!Document.prototype.load&&document.implementation.hasFeature("LS","3.0")){Sarissa.getDomDocument=function(D,E){var F=document.implementation.createDocument(D?D:null,E?E:null,null);
return F
}
}else{Sarissa.getDomDocument=function(D,E){var F=document.implementation.createDocument(D?D:null,E?E:null,null);
if(F&&(D||E)&&!F.documentElement){F.appendChild(F.createElementNS(D,E))
}return F
}
}}}}if(!window.DOMParser){if(Sarissa._SARISSA_IS_SAFARI){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(E,D){var F=new XMLHttpRequest();
F.open("GET","data:text/xml;charset=utf-8,"+encodeURIComponent(E),false);
F.send(null);
return F.responseXML
}
}else{if(Sarissa.getDomDocument&&Sarissa.getDomDocument()&&Sarissa.getDomDocument(null,"bar").xml){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(F,D){var E=Sarissa.getDomDocument();
E.loadXML(F);
return E
}
}}}if((typeof (document.importNode)=="undefined")&&Sarissa._SARISSA_IS_IE){try{document.importNode=function(D,E){var F;
if(D.nodeName=="#text"){return document.createTextNode(D.data)
}else{if(D.nodeName=="tbody"||D.nodeName=="tr"){F=document.createElement("table")
}else{if(D.nodeName=="td"){F=document.createElement("tr")
}else{if(D.nodeName=="option"){F=document.createElement("select")
}else{F=document.createElement("div")
}}}if(E){F.innerHTML=D.xml?D.xml:D.outerHTML
}else{F.innerHTML=D.xml?D.cloneNode(false).xml:D.cloneNode(false).outerHTML
}return F.getElementsByTagName("*")[0]
}}
}catch(e){}}if(!Sarissa.getParseErrorText){Sarissa.getParseErrorText=function(F){var D=Sarissa.PARSED_OK;
if((!F)||(!F.documentElement)){D=Sarissa.PARSED_EMPTY
}else{if(F.documentElement.tagName=="parsererror"){D=F.documentElement.firstChild.data;
D+="\n"+F.documentElement.firstChild.nextSibling.firstChild.data
}else{if(F.getElementsByTagName("parsererror").length>0){var E=F.getElementsByTagName("parsererror")[0];
D=Sarissa.getText(E,true)+"\n"
}else{if(F.parseError&&F.parseError.errorCode!=0){D=Sarissa.PARSED_UNKNOWN_ERROR
}}}}return D
}
}Sarissa.getText=function(H,M){var J="";
var L=H.childNodes;
for(var K=0;
K<L.length;
K++){var I=L[K];
var N=I.nodeType;
if(N==Node.TEXT_NODE||N==Node.CDATA_SECTION_NODE){J+=I.data
}else{if(M===true&&(N==Node.ELEMENT_NODE||N==Node.DOCUMENT_NODE||N==Node.DOCUMENT_FRAGMENT_NODE)){J+=Sarissa.getText(I,true)
}}}return J
};
if(!window.XMLSerializer&&Sarissa.getDomDocument&&Sarissa.getDomDocument("","foo",null).xml){XMLSerializer=function(){};
XMLSerializer.prototype.serializeToString=function(B){return B.xml
}
}Sarissa.stripTags=function(B){return B?B.replace(/<[^>]+>/g,""):B
};
Sarissa.clearChildNodes=function(B){while(B.firstChild){B.removeChild(B.firstChild)
}};
Sarissa.copyChildNodes=function(L,K,J){if(Sarissa._SARISSA_IS_SAFARI&&K.nodeType==Node.DOCUMENT_NODE){K=K.documentElement
}if((!L)||(!K)){throw"Both source and destination nodes must be provided"
}if(!J){Sarissa.clearChildNodes(K)
}var H=K.nodeType==Node.DOCUMENT_NODE?K:K.ownerDocument;
var I=L.childNodes;
var G;
if(typeof (H.importNode)!="undefined"){for(G=0;
G<I.length;
G++){K.appendChild(H.importNode(I[G],true))
}}else{for(G=0;
G<I.length;
G++){K.appendChild(I[G].cloneNode(true))
}}};
Sarissa.moveChildNodes=function(L,K,J){if((!L)||(!K)){throw"Both source and destination nodes must be provided"
}if(!J){Sarissa.clearChildNodes(K)
}var I=L.childNodes;
if(L.ownerDocument==K.ownerDocument){while(L.firstChild){K.appendChild(L.firstChild)
}}else{var H=K.nodeType==Node.DOCUMENT_NODE?K:K.ownerDocument;
var G;
if(typeof (H.importNode)!="undefined"){for(G=0;
G<I.length;
G++){K.appendChild(H.importNode(I[G],true))
}}else{for(G=0;
G<I.length;
G++){K.appendChild(I[G].cloneNode(true))
}}Sarissa.clearChildNodes(L)
}};
Sarissa.xmlize=function(J,H,K){K=K?K:"";
var I=K+"<"+H+">";
var M=false;
if(!(J instanceof Object)||J instanceof Number||J instanceof String||J instanceof Boolean||J instanceof Date){I+=Sarissa.escape(""+J);
M=true
}else{I+="\n";
var N=J instanceof Array;
for(var L in J){I+=Sarissa.xmlize(J[L],(N?'array-item key="'+L+'"':L),K+"   ")
}I+=K
}return(I+=(H.indexOf(" ")!=-1?"</array-item>\n":"</"+H+">\n"))
};
Sarissa.escape=function(B){return B.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")
};
Sarissa.unescape=function(B){return B.replace(/&apos;/g,"'").replace(/&quot;/g,'"').replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&")
};
Sarissa.updateCursor=function(D,C){if(D&&D.style&&D.style.cursor!=undefined){D.style.cursor=C
}};
Sarissa.updateContentFromURI=function(I,L,K,M,O){try{Sarissa.updateCursor(L,"wait");
var J=new XMLHttpRequest();
J.open("GET",I,true);
J.onreadystatechange=function(){if(J.readyState==4){try{var B=J.responseXML;
if(B&&Sarissa.getParseErrorText(B)==Sarissa.PARSED_OK){Sarissa.updateContentFromNode(J.responseXML,L,K);
if(M){M(I,L)
}}else{throw Sarissa.getParseErrorText(B)
}}catch(A){if(M){M(I,L,A)
}else{throw A
}}}};
if(O){var N="Sat, 1 Jan 2000 00:00:00 GMT";
J.setRequestHeader("If-Modified-Since",N)
}J.send("")
}catch(P){Sarissa.updateCursor(L,"auto");
if(M){M(I,L,P)
}else{throw P
}}};
Sarissa.updateContentFromNode=function(K,J,I){try{Sarissa.updateCursor(J,"wait");
Sarissa.clearChildNodes(J);
var H=K.nodeType==Node.DOCUMENT_NODE?K:K.ownerDocument;
if(H.parseError&&H.parseError.errorCode!=0){var L=document.createElement("pre");
L.appendChild(document.createTextNode(Sarissa.getParseErrorText(H)));
J.appendChild(L)
}else{if(I){K=I.transformToDocument(K)
}if(J.tagName.toLowerCase()=="textarea"||J.tagName.toLowerCase()=="input"){J.value=new XMLSerializer().serializeToString(K)
}else{try{J.appendChild(J.ownerDocument.importNode(K,true))
}catch(G){J.innerHTML=new XMLSerializer().serializeToString(K)
}}}}catch(G){throw G
}finally{Sarissa.updateCursor(J,"auto")
}};
Sarissa.formToQueryString=function(H){var N="";
for(var I=0;
I<H.elements.length;
I++){var J=H.elements[I];
var K=J.getAttribute("name")?J.getAttribute("name"):J.getAttribute("id");
if(K&&((!J.disabled)||J.type=="hidden")){switch(J.type){case"hidden":case"text":case"textarea":case"password":N+=K+"="+encodeURIComponent(J.value)+"&";
break;
case"select-one":N+=K+"="+encodeURIComponent(J.options[J.selectedIndex].value)+"&";
break;
case"select-multiple":for(var L=0;
L<J.length;
L++){var M=J.options[L];
if(M.selected===true){N+=K+"[]="+encodeURIComponent(M.value)+"&"
}}break;
case"checkbox":case"radio":if(J.checked){N+=K+"="+encodeURIComponent(J.value)+"&"
}break
}}}return N.substr(0,N.length-1)
};
Sarissa.updateContentFromForm=function(N,L,K,M){try{Sarissa.updateCursor(L,"wait");
var O=Sarissa.formToQueryString(N)+"&"+Sarissa.REMOTE_CALL_FLAG+"=true";
var J=new XMLHttpRequest();
var I=N.getAttribute("method")&&N.getAttribute("method").toLowerCase()=="get";
if(I){J.open("GET",N.getAttribute("action")+"?"+O,true)
}else{J.open("POST",N.getAttribute("action"),true);
J.setRequestHeader("Content-type","application/x-www-form-urlencoded");
J.setRequestHeader("Content-length",O.length);
J.setRequestHeader("Connection","close")
}J.onreadystatechange=function(){try{if(J.readyState==4){var B=J.responseXML;
if(B&&Sarissa.getParseErrorText(B)==Sarissa.PARSED_OK){Sarissa.updateContentFromNode(J.responseXML,L,K);
if(M){M(N,L)
}}else{throw Sarissa.getParseErrorText(B)
}}}catch(A){if(M){M(N,L,A)
}else{throw A
}}};
J.send(I?"":O)
}catch(P){Sarissa.updateCursor(L,"auto");
if(M){M(N,L,P)
}else{throw P
}}return false
};
Sarissa.FUNCTION_NAME_REGEXP=new RegExp("");
Sarissa.getFunctionName=function(D,E){var F;
if(!F){if(E){F="SarissaAnonymous"+Sarissa._getUniqueSuffix();
window[F]=D
}else{F=null
}}if(F){window[F]=D
}return F
};
Sarissa.setRemoteJsonCallback=function(N,H,M){if(!M){M="callback"
}var I=Sarissa.getFunctionName(H,true);
var J="sarissa_json_script_id_"+Sarissa._getUniqueSuffix();
var K=document.getElementsByTagName("head")[0];
var L=document.createElement("script");
L.type="text/javascript";
L.id=J;
L.onload=function(){};
if(N.indexOf("?")!=-1){N+=("&"+M+"="+I)
}else{N+=("?"+M+"="+I)
}L.src=N;
K.appendChild(L);
return J
};