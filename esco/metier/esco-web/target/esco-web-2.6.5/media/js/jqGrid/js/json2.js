var JSON={stringify:function stringify(E){var D,B,F,C="",A;
switch(typeof E){case"object":if(E){if(E.constructor==Array){for(B=0;
B<E.length;
++B){A=stringify(E[B]);
if(C){C+=","
}C+=A
}return"["+C+"]"
}else{if(typeof E.toString!="undefined"){for(B in E){A=stringify(E[B]);
if(typeof A!="function"){if(C){C+=","
}C+=stringify(B)+":"+A
}}return"{"+C+"}"
}}}return"null";
case"number":return isFinite(E)?String(E):"null";
case"string":F=E.length;
C='"';
for(B=0;
B<F;
B+=1){D=E.charAt(B);
if(D>=" "){if(D=="\\"||D=='"'){C+="\\"
}C+=D
}else{switch(D){case"\b":C+="\\b";
break;
case"\f":C+="\\f";
break;
case"\n":C+="\\n";
break;
case"\r":C+="\\r";
break;
case"\t":C+="\\t";
break;
default:D=D.charCodeAt();
C+="\\u00"+Math.floor(D/16).toString(16)+(D%16).toString(16)
}}}return C+'"';
case"boolean":return String(E);
case"function":return E.toString();
default:return"null"
}},parse:function(jsonString){var js=jsonString;
if(js.substr(0,9)=="while(1);"){js=js.substr(9)
}if(js.substr(0,2)=="/*"){js=js.substr(2,js.length-4)
}return eval("("+js+")")
}};