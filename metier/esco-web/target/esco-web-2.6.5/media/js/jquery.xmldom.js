(function(B){if(window.DOMParser==undefined&&window.ActiveXObject){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(A){var D=new ActiveXObject("Microsoft.XMLDOM");
D.async="false";
D.loadXML(A);
return D
}
}B.xmlDOM=function(J,K){try{var H=(new DOMParser()).parseFromString(J,"text/xml");
if(B.isXMLDoc(H)){var I=B("parsererror",H);
if(I.length==1){throw ("Error: "+B(H).text())
}}else{throw ("Unable to parse XML")
}}catch(A){var L=(A.name==undefined?A:A.name+": "+A.message);
if(B.isFunction(K)){K(L)
}else{B(document).trigger("xmlParseError",[L])
}return B([])
}return B(H)
}
})(jQuery);