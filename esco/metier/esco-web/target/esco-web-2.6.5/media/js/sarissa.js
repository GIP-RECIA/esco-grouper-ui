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
Sarissa.pickRecentProgID=function(F){var E=false,A;
var G;
for(var C=0;
C<F.length&&!E;
C++){try{var B=new ActiveXObject(F[C]);
G=F[C];
E=true
}catch(D){A=D
}}if(!E){throw"Could not retrieve a valid progID of Class: "+F[F.length-1]+". (original exception: "+A+")"
}F=null;
return G
};
_SARISSA_DOM_PROGID=null;
_SARISSA_THREADEDDOM_PROGID=null;
_SARISSA_XSLTEMPLATE_PROGID=null;
_SARISSA_XMLHTTP_PROGID=null;
XMLHttpRequest=function(){if(!_SARISSA_XMLHTTP_PROGID){_SARISSA_XMLHTTP_PROGID=Sarissa.pickRecentProgID(["Msxml2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"])
}return new ActiveXObject(_SARISSA_XMLHTTP_PROGID)
};
Sarissa.getDomDocument=function(B,A){if(!_SARISSA_DOM_PROGID){_SARISSA_DOM_PROGID=Sarissa.pickRecentProgID(["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"])
}var C=new ActiveXObject(_SARISSA_DOM_PROGID);
if(A){var D="";
if(B){if(A.indexOf(":")>1){D=A.substring(0,A.indexOf(":"));
A=A.substring(A.indexOf(":")+1)
}else{D="a"+Sarissa._getUniqueSuffix()
}}if(B){C.loadXML("<"+D+":"+A+" xmlns:"+D+'="'+B+'" />')
}else{C.loadXML("<"+A+" />")
}}return C
};
Sarissa.getParseErrorText=function(B){var A=Sarissa.PARSED_OK;
if(B&&B.parseError&&B.parseError.errorCode&&B.parseError.errorCode!=0){A="XML Parsing Error: "+B.parseError.reason+"\nLocation: "+B.parseError.url+"\nLine Number "+B.parseError.line+", Column "+B.parseError.linepos+":\n"+B.parseError.srcText+"\n";
for(var C=0;
C<B.parseError.linepos;
C++){A+="-"
}A+="^\n"
}else{if(B.documentElement===null){A=Sarissa.PARSED_EMPTY
}}return A
};
Sarissa.setXpathNamespaces=function(A,B){A.setProperty("SelectionLanguage","XPath");
A.setProperty("SelectionNamespaces",B)
};
XSLTProcessor=function(){if(!_SARISSA_XSLTEMPLATE_PROGID){_SARISSA_XSLTEMPLATE_PROGID=Sarissa.pickRecentProgID(["Msxml2.XSLTemplate.6.0","MSXML2.XSLTemplate.3.0"])
}this.template=new ActiveXObject(_SARISSA_XSLTEMPLATE_PROGID);
this.processor=null
};
XSLTProcessor.prototype.importStylesheet=function(B){if(!_SARISSA_THREADEDDOM_PROGID){_SARISSA_THREADEDDOM_PROGID=Sarissa.pickRecentProgID(["MSXML2.FreeThreadedDOMDocument.6.0","MSXML2.FreeThreadedDOMDocument.3.0"])
}B.setProperty("SelectionLanguage","XPath");
B.setProperty("SelectionNamespaces","xmlns:xsl='http://www.w3.org/1999/XSL/Transform'");
var A=new ActiveXObject(_SARISSA_THREADEDDOM_PROGID);
try{A.resolveExternals=true;
A.setProperty("AllowDocumentFunction",true)
}catch(D){}if(B.url&&B.selectSingleNode("//xsl:*[local-name() = 'import' or local-name() = 'include']")!=null){A.async=false;
A.load(B.url)
}else{A.loadXML(B.xml)
}A.setProperty("SelectionNamespaces","xmlns:xsl='http://www.w3.org/1999/XSL/Transform'");
var C=A.selectSingleNode("//xsl:output");
if(C){this.outputMethod=C.getAttribute("method")
}else{delete this.outputMethod
}this.template.stylesheet=A;
this.processor=this.template.createProcessor();
this.paramsSet=[]
};
XSLTProcessor.prototype.transformToDocument=function(A){var C;
if(_SARISSA_THREADEDDOM_PROGID){this.processor.input=A;
C=new ActiveXObject(_SARISSA_DOM_PROGID);
this.processor.output=C;
this.processor.transform();
return C
}else{if(!_SARISSA_DOM_XMLWRITER){_SARISSA_DOM_XMLWRITER=Sarissa.pickRecentProgID(["Msxml2.MXXMLWriter.6.0","Msxml2.MXXMLWriter.3.0","MSXML2.MXXMLWriter","MSXML.MXXMLWriter","Microsoft.XMLDOM"])
}this.processor.input=A;
C=new ActiveXObject(_SARISSA_DOM_XMLWRITER);
this.processor.output=C;
this.processor.transform();
var B=new ActiveXObject(_SARISSA_DOM_PROGID);
B.loadXML(C.output+"");
return B
}};
XSLTProcessor.prototype.transformToFragment=function(A,E){this.processor.input=A;
this.processor.transform();
var F=this.processor.output;
var G=E.createDocumentFragment();
var C;
if(this.outputMethod=="text"){G.appendChild(E.createTextNode(F))
}else{if(E.body&&E.body.innerHTML){C=E.createElement("div");
C.innerHTML=F;
while(C.hasChildNodes()){G.appendChild(C.firstChild)
}}else{var B=new ActiveXObject(_SARISSA_DOM_PROGID);
if(F.substring(0,5)=="<?xml"){F=F.substring(F.indexOf("?>")+2)
}var D="".concat("<my>",F,"</my>");
B.loadXML(D);
C=B.documentElement;
while(C.hasChildNodes()){G.appendChild(C.firstChild)
}}}return G
};
XSLTProcessor.prototype.setParameter=function(A,B,C){C=C?C:"";
if(A){this.processor.addParameter(B,C,A)
}else{this.processor.addParameter(B,C)
}A=""+(A||"");
if(!this.paramsSet[A]){this.paramsSet[A]=[]
}this.paramsSet[A][B]=C
};
XSLTProcessor.prototype.getParameter=function(B,A){B=""+(B||"");
if(this.paramsSet[B]&&this.paramsSet[B][A]){return this.paramsSet[B][A]
}else{return null
}};
XSLTProcessor.prototype.clearParameters=function(){for(var B in this.paramsSet){for(var A in this.paramsSet[B]){if(B!=""){this.processor.addParameter(A,"",B)
}else{this.processor.addParameter(A,"")
}}}this.paramsSet=[]
}
}else{if(Sarissa._SARISSA_HAS_DOM_CREATE_DOCUMENT){Sarissa.__handleLoad__=function(A){Sarissa.__setReadyState__(A,4)
};
_sarissa_XMLDocument_onload=function(){Sarissa.__handleLoad__(this)
};
Sarissa.__setReadyState__=function(A,B){A.readyState=B;
A.readystate=B;
if(A.onreadystatechange!=null&&typeof A.onreadystatechange=="function"){A.onreadystatechange()
}};
Sarissa.getDomDocument=function(A,C){var B=document.implementation.createDocument(A?A:null,C?C:null,null);
if(!B.onreadystatechange){B.onreadystatechange=null
}if(!B.readyState){B.readyState=0
}B.addEventListener("load",_sarissa_XMLDocument_onload,false);
return B
};
if(window.XMLDocument){}else{if(Sarissa._SARISSA_HAS_DOM_FEATURE&&window.Document&&!Document.prototype.load&&document.implementation.hasFeature("LS","3.0")){Sarissa.getDomDocument=function(A,C){var B=document.implementation.createDocument(A?A:null,C?C:null,null);
return B
}
}else{Sarissa.getDomDocument=function(A,C){var B=document.implementation.createDocument(A?A:null,C?C:null,null);
if(B&&(A||C)&&!B.documentElement){B.appendChild(B.createElementNS(A,C))
}return B
}
}}}}if(!window.DOMParser){if(Sarissa._SARISSA_IS_SAFARI){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(C,A){var B=new XMLHttpRequest();
B.open("GET","data:text/xml;charset=utf-8,"+encodeURIComponent(C),false);
B.send(null);
return B.responseXML
}
}else{if(Sarissa.getDomDocument&&Sarissa.getDomDocument()&&Sarissa.getDomDocument(null,"bar").xml){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(B,A){var C=Sarissa.getDomDocument();
C.loadXML(B);
return C
}
}}}if((typeof (document.importNode)=="undefined")&&Sarissa._SARISSA_IS_IE){try{document.importNode=function(A,C){var B;
if(A.nodeName=="#text"){return document.createTextNode(A.data)
}else{if(A.nodeName=="tbody"||A.nodeName=="tr"){B=document.createElement("table")
}else{if(A.nodeName=="td"){B=document.createElement("tr")
}else{if(A.nodeName=="option"){B=document.createElement("select")
}else{B=document.createElement("div")
}}}if(C){B.innerHTML=A.xml?A.xml:A.outerHTML
}else{B.innerHTML=A.xml?A.cloneNode(false).xml:A.cloneNode(false).outerHTML
}return B.getElementsByTagName("*")[0]
}}
}catch(e){}}if(!Sarissa.getParseErrorText){Sarissa.getParseErrorText=function(B){var A=Sarissa.PARSED_OK;
if((!B)||(!B.documentElement)){A=Sarissa.PARSED_EMPTY
}else{if(B.documentElement.tagName=="parsererror"){A=B.documentElement.firstChild.data;
A+="\n"+B.documentElement.firstChild.nextSibling.firstChild.data
}else{if(B.getElementsByTagName("parsererror").length>0){var C=B.getElementsByTagName("parsererror")[0];
A=Sarissa.getText(C,true)+"\n"
}else{if(B.parseError&&B.parseError.errorCode!=0){A=Sarissa.PARSED_UNKNOWN_ERROR
}}}}return A
}
}Sarissa.getText=function(A,C){var F="";
var D=A.childNodes;
for(var E=0;
E<D.length;
E++){var G=D[E];
var B=G.nodeType;
if(B==Node.TEXT_NODE||B==Node.CDATA_SECTION_NODE){F+=G.data
}else{if(C===true&&(B==Node.ELEMENT_NODE||B==Node.DOCUMENT_NODE||B==Node.DOCUMENT_FRAGMENT_NODE)){F+=Sarissa.getText(G,true)
}}}return F
};
if(!window.XMLSerializer&&Sarissa.getDomDocument&&Sarissa.getDomDocument("","foo",null).xml){XMLSerializer=function(){};
XMLSerializer.prototype.serializeToString=function(A){return A.xml
}
}Sarissa.stripTags=function(A){return A?A.replace(/<[^>]+>/g,""):A
};
Sarissa.clearChildNodes=function(A){while(A.firstChild){A.removeChild(A.firstChild)
}};
Sarissa.copyChildNodes=function(B,C,D){if(Sarissa._SARISSA_IS_SAFARI&&C.nodeType==Node.DOCUMENT_NODE){C=C.documentElement
}if((!B)||(!C)){throw"Both source and destination nodes must be provided"
}if(!D){Sarissa.clearChildNodes(C)
}var F=C.nodeType==Node.DOCUMENT_NODE?C:C.ownerDocument;
var E=B.childNodes;
var A;
if(typeof (F.importNode)!="undefined"){for(A=0;
A<E.length;
A++){C.appendChild(F.importNode(E[A],true))
}}else{for(A=0;
A<E.length;
A++){C.appendChild(E[A].cloneNode(true))
}}};
Sarissa.moveChildNodes=function(B,C,D){if((!B)||(!C)){throw"Both source and destination nodes must be provided"
}if(!D){Sarissa.clearChildNodes(C)
}var E=B.childNodes;
if(B.ownerDocument==C.ownerDocument){while(B.firstChild){C.appendChild(B.firstChild)
}}else{var F=C.nodeType==Node.DOCUMENT_NODE?C:C.ownerDocument;
var A;
if(typeof (F.importNode)!="undefined"){for(A=0;
A<E.length;
A++){C.appendChild(F.importNode(E[A],true))
}}else{for(A=0;
A<E.length;
A++){C.appendChild(E[A].cloneNode(true))
}}Sarissa.clearChildNodes(B)
}};
Sarissa.xmlize=function(F,A,E){E=E?E:"";
var G=E+"<"+A+">";
var C=false;
if(!(F instanceof Object)||F instanceof Number||F instanceof String||F instanceof Boolean||F instanceof Date){G+=Sarissa.escape(""+F);
C=true
}else{G+="\n";
var B=F instanceof Array;
for(var D in F){G+=Sarissa.xmlize(F[D],(B?'array-item key="'+D+'"':D),E+"   ")
}G+=E
}return(G+=(A.indexOf(" ")!=-1?"</array-item>\n":"</"+A+">\n"))
};
Sarissa.escape=function(A){return A.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")
};
Sarissa.unescape=function(A){return A.replace(/&apos;/g,"'").replace(/&quot;/g,'"').replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&amp;/g,"&")
};
Sarissa.updateCursor=function(B,A){if(B&&B.style&&B.style.cursor!=undefined){B.style.cursor=A
}};
Sarissa.updateContentFromURI=function(A,F,G,E,C){try{Sarissa.updateCursor(F,"wait");
var H=new XMLHttpRequest();
H.open("GET",A,true);
H.onreadystatechange=function(){if(H.readyState==4){try{var I=H.responseXML;
if(I&&Sarissa.getParseErrorText(I)==Sarissa.PARSED_OK){Sarissa.updateContentFromNode(H.responseXML,F,G);
if(E){E(A,F)
}}else{throw Sarissa.getParseErrorText(I)
}}catch(J){if(E){E(A,F,J)
}else{throw J
}}}};
if(C){var D="Sat, 1 Jan 2000 00:00:00 GMT";
H.setRequestHeader("If-Modified-Since",D)
}H.send("")
}catch(B){Sarissa.updateCursor(F,"auto");
if(E){E(A,F,B)
}else{throw B
}}};
Sarissa.updateContentFromNode=function(C,D,E){try{Sarissa.updateCursor(D,"wait");
Sarissa.clearChildNodes(D);
var F=C.nodeType==Node.DOCUMENT_NODE?C:C.ownerDocument;
if(F.parseError&&F.parseError.errorCode!=0){var B=document.createElement("pre");
B.appendChild(document.createTextNode(Sarissa.getParseErrorText(F)));
D.appendChild(B)
}else{if(E){C=E.transformToDocument(C)
}if(D.tagName.toLowerCase()=="textarea"||D.tagName.toLowerCase()=="input"){D.value=new XMLSerializer().serializeToString(C)
}else{try{D.appendChild(D.ownerDocument.importNode(C,true))
}catch(A){D.innerHTML=new XMLSerializer().serializeToString(C)
}}}}catch(A){throw A
}finally{Sarissa.updateCursor(D,"auto")
}};
Sarissa.formToQueryString=function(A){var B="";
for(var G=0;
G<A.elements.length;
G++){var F=A.elements[G];
var E=F.getAttribute("name")?F.getAttribute("name"):F.getAttribute("id");
if(E&&((!F.disabled)||F.type=="hidden")){switch(F.type){case"hidden":case"text":case"textarea":case"password":B+=E+"="+encodeURIComponent(F.value)+"&";
break;
case"select-one":B+=E+"="+encodeURIComponent(F.options[F.selectedIndex].value)+"&";
break;
case"select-multiple":for(var D=0;
D<F.length;
D++){var C=F.options[D];
if(C.selected===true){B+=E+"[]="+encodeURIComponent(C.value)+"&"
}}break;
case"checkbox":case"radio":if(F.checked){B+=E+"="+encodeURIComponent(F.value)+"&"
}break
}}}return B.substr(0,B.length-1)
};
Sarissa.updateContentFromForm=function(D,F,G,E){try{Sarissa.updateCursor(F,"wait");
var C=Sarissa.formToQueryString(D)+"&"+Sarissa.REMOTE_CALL_FLAG+"=true";
var H=new XMLHttpRequest();
var A=D.getAttribute("method")&&D.getAttribute("method").toLowerCase()=="get";
if(A){H.open("GET",D.getAttribute("action")+"?"+C,true)
}else{H.open("POST",D.getAttribute("action"),true);
H.setRequestHeader("Content-type","application/x-www-form-urlencoded");
H.setRequestHeader("Content-length",C.length);
H.setRequestHeader("Connection","close")
}H.onreadystatechange=function(){try{if(H.readyState==4){var I=H.responseXML;
if(I&&Sarissa.getParseErrorText(I)==Sarissa.PARSED_OK){Sarissa.updateContentFromNode(H.responseXML,F,G);
if(E){E(D,F)
}}else{throw Sarissa.getParseErrorText(I)
}}}catch(J){if(E){E(D,F,J)
}else{throw J
}}};
H.send(A?"":C)
}catch(B){Sarissa.updateCursor(F,"auto");
if(E){E(D,F,B)
}else{throw B
}}return false
};
Sarissa.FUNCTION_NAME_REGEXP=new RegExp("");
Sarissa.getFunctionName=function(A,C){var B;
if(!B){if(C){B="SarissaAnonymous"+Sarissa._getUniqueSuffix();
window[B]=A
}else{B=null
}}if(B){window[B]=A
}return B
};
Sarissa.setRemoteJsonCallback=function(B,A,C){if(!C){C="callback"
}var G=Sarissa.getFunctionName(A,true);
var F="sarissa_json_script_id_"+Sarissa._getUniqueSuffix();
var E=document.getElementsByTagName("head")[0];
var D=document.createElement("script");
D.type="text/javascript";
D.id=F;
D.onload=function(){};
if(B.indexOf("?")!=-1){B+=("&"+C+"="+G)
}else{B+=("?"+C+"="+G)
}D.src=B;
E.appendChild(D);
return F
};