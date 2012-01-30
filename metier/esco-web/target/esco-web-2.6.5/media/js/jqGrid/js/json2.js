var JSON={stringify:function stringify(I){var J,L,H,K="",G;
switch(typeof I){case"object":if(I){if(I.constructor==Array){for(L=0;
L<I.length;
++L){G=stringify(I[L]);
if(K){K+=","
}K+=G
}return"["+K+"]"
}else{if(typeof I.toString!="undefined"){for(L in I){G=stringify(I[L]);
if(typeof G!="function"){if(K){K+=","
}K+=stringify(L)+":"+G
}}return"{"+K+"}"
}}}return"null";
case"number":return isFinite(I)?String(I):"null";
case"string":H=I.length;
K='"';
for(L=0;
L<H;
L+=1){J=I.charAt(L);
if(J>=" "){if(J=="\\"||J=='"'){K+="\\"
}K+=J
}else{switch(J){case"\b":K+="\\b";
break;
case"\f":K+="\\f";
break;
case"\n":K+="\\n";
break;
case"\r":K+="\\r";
break;
case"\t":K+="\\t";
break;
default:J=J.charCodeAt();
K+="\\u00"+Math.floor(J/16).toString(16)+(J%16).toString(16)
}}}return K+'"';
case"boolean":return String(I);
case"function":return I.toString();
default:return"null"
}},parse:function(jsonString){var js=jsonString;
if(js.substr(0,9)=="while(1);"){js=js.substr(9)
}if(js.substr(0,2)=="/*"){js=js.substr(2,js.length-4)
}return eval("("+js+")")
}};