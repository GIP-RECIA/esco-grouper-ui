var ActionNavBar={actionAddDefault:function(A,E,C,B){var D=function(){A._sendSelectedRows();
var F={idNode:$("#parentNameSearchDisplayPath").val(),nameIdNode:$("#parentNameSearchPath").val(),groupUuid:$("input[id=groupUuid]").val()};
if(B!=undefined&&B==true){F=$.extend(F,{onlyGroup:"true"})
}Core.setNavParam("fromRequest",E);
Core.setNavParam("groupUuid",$("input[id=groupUuid]").val());
Core.setNavParam("tab",C);
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/additionSearch.jsf",F,"#mainContent",true,false)
};
return D
},actionAddPersonDefault:function(A,E,C,B){var D=function(){A._sendSelectedRows();
var H=null;
var G=null;
if($("a[class=clicked]").parent().attr("typenode")=="GROUP"){H=tree.parent($("a[class=clicked]")).attr("name");
G=tree.parent($("a[class=clicked]")).attr("displayName")
}else{H=$("a[class=clicked]").parent().attr("name");
G=$("a[class=clicked]").parent().attr("displayName")
}var F={idNode:G,nameIdNode:H,idPerson:$("input[id=personId]").val()};
if(B!=undefined&&B==true){F=$.extend(F,{onlyGroup:"true"})
}Core.setNavParam("fromRequest",E);
Core.setNavParam("idPerson",$("input[id=personId]").val());
Core.setNavParam("tab",C);
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/additionSearch.jsf",F,"#mainContent",true,false)
};
return D
},actionAddStemSearch:function(A,D,B){var C=function(){A._sendSelectedRows();
var E={idNode:$("#parentNameSearchDisplayPath").val(),nameIdNode:$("#parentNameSearchPath").val(),groupUuid:$("input[id=groupUuid]").val()};
Core.setNavParam("fromRequest",D);
Core.setNavParam("groupUuid",$("input[id=groupUuid]").val());
Core.setNavParam("tab",B);
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/stemSearch.jsf",E,"#mainContent",true,false)
};
return C
},actionAddStemSearchPerson:function(A,E,C,B){var D=function(){A._sendSelectedRows();
var H=null;
var G=null;
if($("a[class=clicked]").parent().attr("typenode")=="GROUP"){H=tree.parent($("a[class=clicked]")).attr("name");
G=tree.parent($("a[class=clicked]")).attr("displayName")
}else{H=$("a[class=clicked]").parent().attr("name");
G=$("a[class=clicked]").parent().attr("displayName")
}var F={idNode:G,nameIdNode:H,idPerson:$("input[id=personId]").val()};
Core.setNavParam("fromRequest",E);
Core.setNavParam("idPerson",$("input[id=personId]").val());
Core.setNavParam("tab",C);
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/stemSearch.jsf",F,"#mainContent",true,false)
};
return D
},actionAddStemPrivilege:function(A,D,B){var C=function(){A._sendSelectedRows();
var E={idNode:$("input[id=nameSearchDisplayPath]").val(),nameIdNode:$("input[id=nameSearchPath]").val()};
Core.setNavParam("fromRequest",D);
Core.setNavParam("stemUuid",$("input[id=stemUuid]").val());
Core.setNavParam("tab",B);
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/additionSearch.jsf",E,"#mainContent",true,false)
};
return C
},actionDelDefault:function(D,A,B){var C=function(){_displayBlockUIOption={onAfterShowBlockUI:function(){D._selectType="undefined";
D._sendSelectedRows();
var E=D;
var F=B;
jQuery.ajaxSettings.async=false;
$.post(A,{},function(G){E.nbRowSelected=0;
E._doneLoadData(Core.getStatus(G));
if(F!=null){F.call()
}});
jQuery.ajaxSettings.async=true
}};
Core._showBlockUI(_displayBlockUIOption)
};
return C
}};