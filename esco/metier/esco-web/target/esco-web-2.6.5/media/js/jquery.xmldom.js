(function(A){if(window.DOMParser==undefined&&window.ActiveXObject){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(C){var B=new ActiveXObject("Microsoft.XMLDOM");
B.async="false";
B.loadXML(C);
return B
}
}A.xmlDOM=function(D,C){try{var F=(new DOMParser()).parseFromString(D,"text/xml");
if(A.isXMLDoc(F)){var E=A("parsererror",F);
if(E.length==1){throw ("Error: "+A(F).text())
}}else{throw ("Unable to parse XML")
}}catch(G){var B=(G.name==undefined?G:G.name+": "+G.message);
if(A.isFunction(C)){C(B)
}else{A(document).trigger("xmlParseError",[B])
}return A([])
}return A(F)
}
})(jQuery);