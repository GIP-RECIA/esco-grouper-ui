var showModal=function(B){B.w.show()
};
var closeModal=function(B){B.w.hide();
if(B.o){B.o.remove()
}};
function createModal(P,U,X,O,M,N){var S=X.imgpath?X.imgpath+X.closeicon:X.closeicon;
var Q=document.createElement("div");
jQuery(Q).addClass("modalwin").attr("id",P.themodal);
var V=jQuery('<div id="'+P.modalhead+'"><table width="100%"><tbody><tr><td class="modaltext">'+X.caption+'</td> <td style="text-align:right" ><a href="javascript:void(0);" class="jqmClose">'+(S!=""?'<img src="'+S+'" border="0"/>':"X")+"</a></td></tr></tbody></table> </div>").addClass("modalhead");
var R=document.createElement("div");
jQuery(R).addClass("modalcontent").attr("id",P.modalcontent).css("width","97%");
jQuery(R).append(U);
Q.appendChild(R);
var W=document.createElement("div");
jQuery(W).addClass("loading").html(X.processData||"");
jQuery(Q).prepend(W);
jQuery(Q).prepend(V);
jQuery(Q).addClass("jqmWindow");
if(X.drag){jQuery(Q).append("<img  class='jqResize' src='"+X.imgpath+"resize.gif'/>")
}if(N===true){jQuery("body").append(Q)
}else{jQuery(Q).insertBefore(O)
}if(X.left==0&&X.top==0){var T=[];
T=findPos(M);
X.left=T[0]+4;
X.top=T[1]+4
}if(X.width==0||!X.width){X.width=300
}if(X.height==0||!X.width){X.height=200
}if(!X.zIndex){X.zIndex=950
}jQuery(Q).css({top:X.top+"px",left:X.left+"px",width:X.width+"px",height:X.height+"px",zIndex:X.zIndex}).attr({tabIndex:"-1"});
if(X.closeOnEscape&&X.closeOnEscape===true){jQuery(Q).keydown(function(A){if(A.which==27){hideModal(this)
}})
}return false
}function viewModal(C,D){D=jQuery.extend({toTop:true,overlay:10,modal:false,onShow:showModal,onHide:closeModal},D||{});
jQuery(C).jqm(D).jqmShow();
return false
}function hideModal(B){jQuery(B).jqmHide()
}function DnRModal(C,D){jQuery(D).css("cursor","move");
jQuery(C).jqDrag(D).jqResize(".jqResize");
return false
}function info_dialog(G,I,F,H){var J="<div id='info_id'>";
J+="<div align='center'><br />"+I+"<br /><br />";
J+="<input type='button' size='10' id='closedialog' class='jqmClose EditButton' value='"+F+"' />";
J+="</div></div>";
createModal({themodal:"info_dialog",modalhead:"info_head",modalcontent:"info_content"},J,{width:290,height:120,drag:false,caption:"<b>"+G+"</b>",imgpath:H,closeicon:"ico-close.gif",left:250,top:170,closeOnEscape:true},"","",true);
viewModal("#info_dialog",{onShow:function(A){A.w.show()
},onHide:function(A){A.w.hide().remove();
if(A.o){A.o.remove()
}},modal:true})
}function findPos(C){var D=curtop=0;
if(C.offsetParent){do{D+=C.offsetLeft;
curtop+=C.offsetTop
}while(C=C.offsetParent)
}return[D,curtop]
}function isArray(B){if(B.constructor.toString().indexOf("Array")==-1){return false
}else{return true
}}function createEl(S,Z,U){var T="";
switch(S){case"textarea":T=document.createElement("textarea");
if(!Z.cols){jQuery(T).css("width","98%")
}jQuery(T).attr(Z);
if(U=="&nbsp;"||U=="&#160;"||(U.length==1&&U.charCodeAt(0)==160)){U=""
}jQuery(T).val(U);
break;
case"checkbox":T=document.createElement("input");
T.type="checkbox";
jQuery(T).attr({id:Z.id,name:Z.name});
if(!Z.value){U=U.toLowerCase();
if(U.search(/(false|0|no|off|undefined)/i)<0&&U!==""){T.checked=true;
T.defaultChecked=true;
T.value=U
}else{T.value="on"
}jQuery(T).attr("offval","off")
}else{var Y=Z.value.split(":");
if(U==Y[0]){T.checked=true;
T.defaultChecked=true
}T.value=Y[0];
jQuery(T).attr("offval",Y[1])
}break;
case"select":U=jQuery.htmlDecode(U);
T=document.createElement("select");
var N=Z.multiple==true?true:false;
if(Z.value){var R=[];
if(N){jQuery(T).attr({multiple:"multiple"});
R=U.split(",");
R=jQuery.map(R,function(A){return jQuery.trim(A)
})
}if(typeof Z.size==="undefined"){Z.size=1
}if(typeof Z.value=="string"){var W=Z.value.split(";"),O,V;
jQuery(T).attr({id:Z.id,name:Z.name,size:Math.min(Z.size,W.length)});
for(var Q=0;
Q<W.length;
Q++){O=W[Q].split(":");
V=document.createElement("option");
V.value=O[0];
V.innerHTML=O[1];
if(!N&&O[1]==U){V.selected="selected"
}if(N&&jQuery.inArray(jQuery.trim(O[1]),R)>-1){V.selected="selected"
}T.appendChild(V)
}}else{if(typeof Z.value=="object"){var X=Z.value;
var Q=0;
for(var P in X){Q++;
V=document.createElement("option");
V.value=P;
V.innerHTML=X[P];
if(!N&&X[P]==U){V.selected="selected"
}if(N&&jQuery.inArray(jQuery.trim(X[P]),R)>-1){V.selected="selected"
}T.appendChild(V)
}jQuery(T).attr({id:Z.id,name:Z.name,size:Math.min(Z.size,Q)})
}}}break;
case"text":T=document.createElement("input");
T.type="text";
U=jQuery.htmlDecode(U);
T.value=U;
if(!Z.size){jQuery(T).css({width:"98%"})
}jQuery(T).attr(Z);
break;
case"password":T=document.createElement("input");
T.type="password";
U=jQuery.htmlDecode(U);
T.value=U;
if(!Z.size){jQuery(T).css("width","98%")
}jQuery(T).attr(Z);
break;
case"image":T=document.createElement("input");
T.type="image";
jQuery(T).attr(Z);
break
}return T
}function checkValues(I,M,K){if(M>=0){var J=K.p.colModel[M].editrules
}if(J){if(J.required===true){if(I.match(/^s+$/)||I==""){return[false,K.p.colNames[M]+": "+jQuery.jgrid.edit.msg.required,""]
}}var H=J.required===false?false:true;
if(J.number===true){if(!(H===false&&isEmpty(I))){if(isNaN(I)){return[false,K.p.colNames[M]+": "+jQuery.jgrid.edit.msg.number,""]
}}}if(J.minValue&&!isNaN(J.minValue)){if(parseFloat(I)<parseFloat(J.minValue)){return[false,K.p.colNames[M]+": "+jQuery.jgrid.edit.msg.minValue+" "+J.minValue,""]
}}if(J.maxValue&&!isNaN(J.maxValue)){if(parseFloat(I)>parseFloat(J.maxValue)){return[false,K.p.colNames[M]+": "+jQuery.jgrid.edit.msg.maxValue+" "+J.maxValue,""]
}}if(J.email===true){if(!(H===false&&isEmpty(I))){var N=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
if(!N.test(I)){return[false,K.p.colNames[M]+": "+jQuery.jgrid.edit.msg.email,""]
}}}if(J.integer===true){if(!(H===false&&isEmpty(I))){if(isNaN(I)){return[false,K.p.colNames[M]+": "+jQuery.jgrid.edit.msg.integer,""]
}if((I%1!=0)||(I.indexOf(".")!=-1)){return[false,K.p.colNames[M]+": "+jQuery.jgrid.edit.msg.integer,""]
}}}if(J.date===true){if(!(H===false&&isEmpty(I))){var L=K.p.colModel[M].datefmt||"Y-m-d";
if(!checkDate(L,I)){return[false,K.p.colNames[M]+": "+jQuery.jgrid.edit.msg.date+" - "+L,""]
}}}}return[true,"",""]
}function checkDate(P,W){var U={};
var Z=false;
var N;
P=P.toLowerCase();
if(P.indexOf("/")!=-1){N="/"
}else{if(P.indexOf("-")!=-1){N="-"
}else{if(P.indexOf(".")!=-1){N="."
}else{N="/"
}}}P=P.split(N);
W=W.split(N);
if(W.length!=3){return false
}var T=-1,O,S=-1,V=-1;
for(var R=0;
R<P.length;
R++){var X=isNaN(W[R])?0:parseInt(W[R],10);
U[P[R]]=X;
O=P[R];
if(O.indexOf("y")!=-1){T=R
}if(O.indexOf("m")!=-1){V=R
}if(O.indexOf("d")!=-1){S=R
}}if(P[T]=="y"||P[T]=="yyyy"){O=4
}else{if(P[T]=="yy"){O=2
}else{O=-1
}}var Y=DaysArray(12);
var Q;
if(T===-1){return false
}else{Q=U[P[T]].toString();
if(O==2&&Q.length==1){O=1
}if(Q.length!=O||U[P[T]]==0){return false
}}if(V===-1){return false
}else{Q=U[P[V]].toString();
if(Q.length<1||U[P[V]]<1||U[P[V]]>12){return false
}}if(S===-1){return false
}else{Q=U[P[S]].toString();
if(Q.length<1||U[P[S]]<1||U[P[S]]>31||(U[P[V]]==2&&U[P[S]]>daysInFebruary(U[P[T]]))||U[P[S]]>Y[U[P[V]]]){return false
}}return true
}function daysInFebruary(B){return(((B%4==0)&&((!(B%100==0))||(B%400==0)))?29:28)
}function DaysArray(D){for(var C=1;
C<=D;
C++){this[C]=31;
if(C==4||C==6||C==9||C==11){this[C]=30
}if(C==2){this[C]=29
}}return this
}function isEmpty(B){if(B.match(/^s+$/)||B==""){return true
}else{return false
}}function htmlEncode(B){return !B?B:String(B).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")
};