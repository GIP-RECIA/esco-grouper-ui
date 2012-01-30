function debugData(E,A,D){var C=(A)?A:"DATA";
C+="\n***"+"****************************".substr(0,C.length);
B(E,"");
alert(C);
function B(F,J){if(typeof J=="undefined"){J=""
}try{$.each(F,function(K,L){if(typeof L=="function"){C+="\n"+J+K+":  function()"
}else{if(typeof L=="string"){C+="\n"+J+K+':  "'+L+'"'
}else{if(typeof L!="object"){C+="\n"+J+K+":  "+L
}else{if(I(L)){C+="\n"+J+K+":  [ "+L.toString()+" ]"
}else{if(D===false||!H(L)){C+="\n"+J+K+":  { }"
}else{C+="\n"+J+K+": {";
B(L,J+"    ");
C+="\n"+J+"}"
}}}}}})
}catch(G){}function I(K){return(K&&!(K.propertyIsEnumerable("length"))&&typeof K==="object"&&typeof K.length==="number")
}function H(K){var L=0;
for(k in K){L++
}return L
}}}function showOptions(A,B){var C=A.options;
$.each(B.split("."),function(){C=C[this]
});
debugData(C,"options."+B)
}function showState(B,A){debugData(B.state[A],"state."+A)
}function createInnerLayout(){innerLayout=$(outerLayout.options.center.paneSelector).layout(layoutSettings_Inner);
$("#createInner").hide();
$("#createInner2").hide();
$("#innerCommands").show()
};