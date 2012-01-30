jQuery.cookie=function(W,P,M){if(typeof P!="undefined"){M=M||{};
if(P===null){P="";
M.expires=-1
}var T="";
if(M.expires&&(typeof M.expires=="number"||M.expires.toUTCString)){var S;
if(typeof M.expires=="number"){S=new Date();
S.setTime(S.getTime()+(M.expires*24*60*60*1000))
}else{S=M.expires
}T="; expires="+S.toUTCString()
}var N=M.path?"; path="+(M.path):"";
var R=M.domain?"; domain="+(M.domain):"";
var X=M.secure?"; secure":"";
document.cookie=[W,"=",encodeURIComponent(P),T,N,R,X].join("")
}else{var U=null;
if(document.cookie&&document.cookie!=""){var O=document.cookie.split(";");
for(var Q=0;
Q<O.length;
Q++){var V=jQuery.trim(O[Q]);
if(V.substring(0,W.length+1)==(W+"=")){U=decodeURIComponent(V.substring(W.length+1));
break
}}}return U
}};