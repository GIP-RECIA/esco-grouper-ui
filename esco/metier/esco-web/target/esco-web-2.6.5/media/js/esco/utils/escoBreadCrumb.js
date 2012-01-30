var EscoBreadCrumb=new DUI.Class({_breadOptions:{},init:function(C){_breadOptions=$.extend({},C||{path:"Root",value:null});
try{str=this._construct();
$("#breadCrumb").empty();
$("#breadCrumb").append(str);
$("#breadCrumb").jBreadCrumb();
$("a[class=lastBread]").css("color","#50A029");
$("a[class=lastBread]").css("text-decoration","underline")
}catch(D){}},_construct:function(){var H="<ul>";
if(_breadOptions.path!=":Root"){if(_breadOptions.value==null){H+="<li><a id='bread' style='cursor:default;' name=':'>Root</a></li>"
}else{H+="<li><a id='RootBread' name=':'>Root</a></li>";
if(_breadOptions.value.substring(0,1)==":"){_breadOptions.value=_breadOptions.value.substring(1,_breadOptions.value.length)
}}if(_breadOptions.path.substring(0,1)==":"){_breadOptions.path=_breadOptions.path.substring(1,_breadOptions.path.length)
}var E=_breadOptions.path.split(":");
if(_breadOptions.value!=null){var F=_breadOptions.value.split(":")
}var G="";
for(i=0;
i<E.length-1;
i++){if(_breadOptions.value!=null){G+=F[i];
H+="<li><a id='bread' name='"+G+"'>"+E[i]+"</a></li>";
G+=":"
}else{H+="<li>"+E[i]+"</li>"
}}if(_breadOptions.value!=null){G+=F[E.length-1];
H+="<li><a id='bread' class='lastBread' name='"+G+"'>"+E[E.length-1]+"</a></li>"
}else{H+="<li>"+E[E.length-1]+"</li>"
}}else{H+="<li><a id='RootBread' class='selected' name=':'>Root</a></li>"
}H+="</ul>";
return H
}});