jQuery.cookie=function(F,A,D){if(typeof A!="undefined"){D=D||{};
if(A===null){A="";
D.expires=-1
}var I="";
if(D.expires&&(typeof D.expires=="number"||D.expires.toUTCString)){var J;
if(typeof D.expires=="number"){J=new Date();
J.setTime(J.getTime()+(D.expires*24*60*60*1000))
}else{J=D.expires
}I="; expires="+J.toUTCString()
}var C=D.path?"; path="+(D.path):"";
var K=D.domain?"; domain="+(D.domain):"";
var E=D.secure?"; secure":"";
document.cookie=[F,"=",encodeURIComponent(A),I,C,K,E].join("")
}else{var H=null;
if(document.cookie&&document.cookie!=""){var B=document.cookie.split(";");
for(var L=0;
L<B.length;
L++){var G=jQuery.trim(B[L]);
if(G.substring(0,F.length+1)==(F+"=")){H=decodeURIComponent(G.substring(F.length+1));
break
}}}return H
}};