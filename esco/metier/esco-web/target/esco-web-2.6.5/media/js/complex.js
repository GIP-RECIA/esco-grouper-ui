function debugData(G,F,H){var I=(F)?F:"DATA";
I+="\n***"+"****************************".substr(0,I.length);
J(G,"");
alert(I);
function J(E,A){if(typeof A=="undefined"){A=""
}try{$.each(E,function(N,M){if(typeof M=="function"){I+="\n"+A+N+":  function()"
}else{if(typeof M=="string"){I+="\n"+A+N+':  "'+M+'"'
}else{if(typeof M!="object"){I+="\n"+A+N+":  "+M
}else{if(B(M)){I+="\n"+A+N+":  [ "+M.toString()+" ]"
}else{if(H===false||!C(M)){I+="\n"+A+N+":  { }"
}else{I+="\n"+A+N+": {";
J(M,A+"    ");
I+="\n"+A+"}"
}}}}}})
}catch(D){}function B(L){return(L&&!(L.propertyIsEnumerable("length"))&&typeof L==="object"&&typeof L.length==="number")
}function C(N){var M=0;
for(k in N){M++
}return M
}}}function showOptions(D,F){var E=D.options;
$.each(F.split("."),function(){E=E[this]
});
debugData(E,"options."+F)
}function showState(D,C){debugData(D.state[C],"state."+C)
}function createInnerLayout(){innerLayout=$(outerLayout.options.center.paneSelector).layout(layoutSettings_Inner);
$("#createInner").hide();
$("#createInner2").hide();
$("#innerCommands").show()
};