var EscoBreadCrumb=new DUI.Class({_breadOptions:{},init:function(A){_breadOptions=$.extend({},A||{path:"Root",value:null});
try{str=this._construct();
$("#breadCrumb").empty();
$("#breadCrumb").append(str);
$("#breadCrumb").jBreadCrumb();
$("a[class=lastBread]").css("color","#50A029");
$("a[class=lastBread]").css("text-decoration","underline")
}catch(B){}},_construct:function(){var B="<ul>";
if(_breadOptions.path!=":Root"){if(_breadOptions.value==null){B+="<li><a id='bread' style='cursor:default;' name=':'>Root</a></li>"
}else{B+="<li><a id='RootBread' name=':'>Root</a></li>";
if(_breadOptions.value.substring(0,1)==":"){_breadOptions.value=_breadOptions.value.substring(1,_breadOptions.value.length)
}}if(_breadOptions.path.substring(0,1)==":"){_breadOptions.path=_breadOptions.path.substring(1,_breadOptions.path.length)
}var A=_breadOptions.path.split(":");
if(_breadOptions.value!=null){var D=_breadOptions.value.split(":")
}var C="";
for(i=0;
i<A.length-1;
i++){if(_breadOptions.value!=null){C+=D[i];
B+="<li><a id='bread' name='"+C+"'>"+A[i]+"</a></li>";
C+=":"
}else{B+="<li>"+A[i]+"</li>"
}}if(_breadOptions.value!=null){C+=D[A.length-1];
B+="<li><a id='bread' class='lastBread' name='"+C+"'>"+A[A.length-1]+"</a></li>"
}else{B+="<li>"+A[A.length-1]+"</li>"
}}else{B+="<li><a id='RootBread' class='selected' name=':'>Root</a></li>"
}B+="</ul>";
return B
}});