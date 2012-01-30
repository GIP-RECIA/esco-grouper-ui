var showModal=function(A){A.w.show()
};
var closeModal=function(A){A.w.hide();
if(A.o){A.o.remove()
}};
function createModal(A,H,E,B,D,C){var J=E.imgpath?E.imgpath+E.closeicon:E.closeicon;
var L=document.createElement("div");
jQuery(L).addClass("modalwin").attr("id",A.themodal);
var G=jQuery('<div id="'+A.modalhead+'"><table width="100%"><tbody><tr><td class="modaltext">'+E.caption+'</td> <td style="text-align:right" ><a href="javascript:void(0);" class="jqmClose">'+(J!=""?'<img src="'+J+'" border="0"/>':"X")+"</a></td></tr></tbody></table> </div>").addClass("modalhead");
var K=document.createElement("div");
jQuery(K).addClass("modalcontent").attr("id",A.modalcontent).css("width","97%");
jQuery(K).append(H);
L.appendChild(K);
var F=document.createElement("div");
jQuery(F).addClass("loading").html(E.processData||"");
jQuery(L).prepend(F);
jQuery(L).prepend(G);
jQuery(L).addClass("jqmWindow");
if(E.drag){jQuery(L).append("<img  class='jqResize' src='"+E.imgpath+"resize.gif'/>")
}if(C===true){jQuery("body").append(L)
}else{jQuery(L).insertBefore(B)
}if(E.left==0&&E.top==0){var I=[];
I=findPos(D);
E.left=I[0]+4;
E.top=I[1]+4
}if(E.width==0||!E.width){E.width=300
}if(E.height==0||!E.width){E.height=200
}if(!E.zIndex){E.zIndex=950
}jQuery(L).css({top:E.top+"px",left:E.left+"px",width:E.width+"px",height:E.height+"px",zIndex:E.zIndex}).attr({tabIndex:"-1"});
if(E.closeOnEscape&&E.closeOnEscape===true){jQuery(L).keydown(function(M){if(M.which==27){hideModal(this)
}})
}return false
}function viewModal(A,B){B=jQuery.extend({toTop:true,overlay:10,modal:false,onShow:showModal,onHide:closeModal},B||{});
jQuery(A).jqm(B).jqmShow();
return false
}function hideModal(A){jQuery(A).jqmHide()
}function DnRModal(A,B){jQuery(B).css("cursor","move");
jQuery(A).jqDrag(B).jqResize(".jqResize");
return false
}function info_dialog(E,C,A,D){var B="<div id='info_id'>";
B+="<div align='center'><br />"+C+"<br /><br />";
B+="<input type='button' size='10' id='closedialog' class='jqmClose EditButton' value='"+A+"' />";
B+="</div></div>";
createModal({themodal:"info_dialog",modalhead:"info_head",modalcontent:"info_content"},B,{width:290,height:120,drag:false,caption:"<b>"+E+"</b>",imgpath:D,closeicon:"ico-close.gif",left:250,top:170,closeOnEscape:true},"","",true);
viewModal("#info_dialog",{onShow:function(F){F.w.show()
},onHide:function(F){F.w.hide().remove();
if(F.o){F.o.remove()
}},modal:true})
}function findPos(A){var B=curtop=0;
if(A.offsetParent){do{B+=A.offsetLeft;
curtop+=A.offsetTop
}while(A=A.offsetParent)
}return[B,curtop]
}function isArray(A){if(A.constructor.toString().indexOf("Array")==-1){return false
}else{return true
}}function createEl(L,E,J){var K="";
switch(L){case"textarea":K=document.createElement("textarea");
if(!E.cols){jQuery(K).css("width","98%")
}jQuery(K).attr(E);
if(J=="&nbsp;"||J=="&#160;"||(J.length==1&&J.charCodeAt(0)==160)){J=""
}jQuery(K).val(J);
break;
case"checkbox":K=document.createElement("input");
K.type="checkbox";
jQuery(K).attr({id:E.id,name:E.name});
if(!E.value){J=J.toLowerCase();
if(J.search(/(false|0|no|off|undefined)/i)<0&&J!==""){K.checked=true;
K.defaultChecked=true;
K.value=J
}else{K.value="on"
}jQuery(K).attr("offval","off")
}else{var F=E.value.split(":");
if(J==F[0]){K.checked=true;
K.defaultChecked=true
}K.value=F[0];
jQuery(K).attr("offval",F[1])
}break;
case"select":J=jQuery.htmlDecode(J);
K=document.createElement("select");
var D=E.multiple==true?true:false;
if(E.value){var M=[];
if(D){jQuery(K).attr({multiple:"multiple"});
M=J.split(",");
M=jQuery.map(M,function(N){return jQuery.trim(N)
})
}if(typeof E.size==="undefined"){E.size=1
}if(typeof E.value=="string"){var H=E.value.split(";"),C,I;
jQuery(K).attr({id:E.id,name:E.name,size:Math.min(E.size,H.length)});
for(var A=0;
A<H.length;
A++){C=H[A].split(":");
I=document.createElement("option");
I.value=C[0];
I.innerHTML=C[1];
if(!D&&C[1]==J){I.selected="selected"
}if(D&&jQuery.inArray(jQuery.trim(C[1]),M)>-1){I.selected="selected"
}K.appendChild(I)
}}else{if(typeof E.value=="object"){var G=E.value;
var A=0;
for(var B in G){A++;
I=document.createElement("option");
I.value=B;
I.innerHTML=G[B];
if(!D&&G[B]==J){I.selected="selected"
}if(D&&jQuery.inArray(jQuery.trim(G[B]),M)>-1){I.selected="selected"
}K.appendChild(I)
}jQuery(K).attr({id:E.id,name:E.name,size:Math.min(E.size,A)})
}}}break;
case"text":K=document.createElement("input");
K.type="text";
J=jQuery.htmlDecode(J);
K.value=J;
if(!E.size){jQuery(K).css({width:"98%"})
}jQuery(K).attr(E);
break;
case"password":K=document.createElement("input");
K.type="password";
J=jQuery.htmlDecode(J);
K.value=J;
if(!E.size){jQuery(K).css("width","98%")
}jQuery(K).attr(E);
break;
case"image":K=document.createElement("input");
K.type="image";
jQuery(K).attr(E);
break
}return K
}function checkValues(G,C,E){if(C>=0){var F=E.p.colModel[C].editrules
}if(F){if(F.required===true){if(G.match(/^s+$/)||G==""){return[false,E.p.colNames[C]+": "+jQuery.jgrid.edit.msg.required,""]
}}var A=F.required===false?false:true;
if(F.number===true){if(!(A===false&&isEmpty(G))){if(isNaN(G)){return[false,E.p.colNames[C]+": "+jQuery.jgrid.edit.msg.number,""]
}}}if(F.minValue&&!isNaN(F.minValue)){if(parseFloat(G)<parseFloat(F.minValue)){return[false,E.p.colNames[C]+": "+jQuery.jgrid.edit.msg.minValue+" "+F.minValue,""]
}}if(F.maxValue&&!isNaN(F.maxValue)){if(parseFloat(G)>parseFloat(F.maxValue)){return[false,E.p.colNames[C]+": "+jQuery.jgrid.edit.msg.maxValue+" "+F.maxValue,""]
}}if(F.email===true){if(!(A===false&&isEmpty(G))){var B=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
if(!B.test(G)){return[false,E.p.colNames[C]+": "+jQuery.jgrid.edit.msg.email,""]
}}}if(F.integer===true){if(!(A===false&&isEmpty(G))){if(isNaN(G)){return[false,E.p.colNames[C]+": "+jQuery.jgrid.edit.msg.integer,""]
}if((G%1!=0)||(G.indexOf(".")!=-1)){return[false,E.p.colNames[C]+": "+jQuery.jgrid.edit.msg.integer,""]
}}}if(F.date===true){if(!(A===false&&isEmpty(G))){var D=E.p.colModel[C].datefmt||"Y-m-d";
if(!checkDate(D,G)){return[false,E.p.colNames[C]+": "+jQuery.jgrid.edit.msg.date+" - "+D,""]
}}}}return[true,"",""]
}function checkDate(B,H){var J={};
var E=false;
var D;
B=B.toLowerCase();
if(B.indexOf("/")!=-1){D="/"
}else{if(B.indexOf("-")!=-1){D="-"
}else{if(B.indexOf(".")!=-1){D="."
}else{D="/"
}}}B=B.split(D);
H=H.split(D);
if(H.length!=3){return false
}var K=-1,C,L=-1,I=-1;
for(var M=0;
M<B.length;
M++){var G=isNaN(H[M])?0:parseInt(H[M],10);
J[B[M]]=G;
C=B[M];
if(C.indexOf("y")!=-1){K=M
}if(C.indexOf("m")!=-1){I=M
}if(C.indexOf("d")!=-1){L=M
}}if(B[K]=="y"||B[K]=="yyyy"){C=4
}else{if(B[K]=="yy"){C=2
}else{C=-1
}}var F=DaysArray(12);
var A;
if(K===-1){return false
}else{A=J[B[K]].toString();
if(C==2&&A.length==1){C=1
}if(A.length!=C||J[B[K]]==0){return false
}}if(I===-1){return false
}else{A=J[B[I]].toString();
if(A.length<1||J[B[I]]<1||J[B[I]]>12){return false
}}if(L===-1){return false
}else{A=J[B[L]].toString();
if(A.length<1||J[B[L]]<1||J[B[L]]>31||(J[B[I]]==2&&J[B[L]]>daysInFebruary(J[B[K]]))||J[B[L]]>F[J[B[I]]]){return false
}}return true
}function daysInFebruary(A){return(((A%4==0)&&((!(A%100==0))||(A%400==0)))?29:28)
}function DaysArray(B){for(var A=1;
A<=B;
A++){this[A]=31;
if(A==4||A==6||A==9||A==11){this[A]=30
}if(A==2){this[A]=29
}}return this
}function isEmpty(A){if(A.match(/^s+$/)||A==""){return true
}else{return false
}}function htmlEncode(A){return !A?A:String(A).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")
};