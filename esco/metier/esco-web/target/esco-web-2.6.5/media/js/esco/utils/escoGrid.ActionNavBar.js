var ActionNavBar={actionAddDefault:function(F,G,I,J){var H=function(){F._sendSelectedRows();
var A={idNode:$("#parentNameSearchDisplayPath").val(),nameIdNode:$("#parentNameSearchPath").val(),groupUuid:$("input[id=groupUuid]").val()};
if(J!=undefined&&J==true){A=$.extend(A,{onlyGroup:"true"})
}Core.setNavParam("fromRequest",G);
Core.setNavParam("groupUuid",$("input[id=groupUuid]").val());
Core.setNavParam("tab",I);
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/additionSearch.jsf",A,"#mainContent",true,false)
};
return H
},actionAddPersonDefault:function(F,G,I,J){var H=function(){F._sendSelectedRows();
var A=null;
var B=null;
if($("a[class=clicked]").parent().attr("typenode")=="GROUP"){A=tree.parent($("a[class=clicked]")).attr("name");
B=tree.parent($("a[class=clicked]")).attr("displayName")
}else{A=$("a[class=clicked]").parent().attr("name");
B=$("a[class=clicked]").parent().attr("displayName")
}var C={idNode:B,nameIdNode:A,idPerson:$("input[id=personId]").val()};
if(J!=undefined&&J==true){C=$.extend(C,{onlyGroup:"true"})
}Core.setNavParam("fromRequest",G);
Core.setNavParam("idPerson",$("input[id=personId]").val());
Core.setNavParam("tab",I);
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/additionSearch.jsf",C,"#mainContent",true,false)
};
return H
},actionAddStemSearch:function(E,F,H){var G=function(){E._sendSelectedRows();
var A={idNode:$("#parentNameSearchDisplayPath").val(),nameIdNode:$("#parentNameSearchPath").val(),groupUuid:$("input[id=groupUuid]").val()};
Core.setNavParam("fromRequest",F);
Core.setNavParam("groupUuid",$("input[id=groupUuid]").val());
Core.setNavParam("tab",H);
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/stemSearch.jsf",A,"#mainContent",true,false)
};
return G
},actionAddStemSearchPerson:function(F,G,I,J){var H=function(){F._sendSelectedRows();
var A=null;
var B=null;
if($("a[class=clicked]").parent().attr("typenode")=="GROUP"){A=tree.parent($("a[class=clicked]")).attr("name");
B=tree.parent($("a[class=clicked]")).attr("displayName")
}else{A=$("a[class=clicked]").parent().attr("name");
B=$("a[class=clicked]").parent().attr("displayName")
}var C={idNode:B,nameIdNode:A,idPerson:$("input[id=personId]").val()};
Core.setNavParam("fromRequest",G);
Core.setNavParam("idPerson",$("input[id=personId]").val());
Core.setNavParam("tab",I);
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/stemSearch.jsf",C,"#mainContent",true,false)
};
return H
},actionAddStemPrivilege:function(E,F,H){var G=function(){E._sendSelectedRows();
var A={idNode:$("input[id=nameSearchDisplayPath]").val(),nameIdNode:$("input[id=nameSearchPath]").val()};
Core.setNavParam("fromRequest",F);
Core.setNavParam("stemUuid",$("input[id=stemUuid]").val());
Core.setNavParam("tab",H);
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/additionSearch.jsf",A,"#mainContent",true,false)
};
return G
},actionDelDefault:function(F,E,H){var G=function(){_displayBlockUIOption={onAfterShowBlockUI:function(){F._selectType="undefined";
F._sendSelectedRows();
var B=F;
var A=H;
jQuery.ajaxSettings.async=false;
$.post(E,{},function(C){B.nbRowSelected=0;
B._doneLoadData(Core.getStatus(C));
if(A!=null){A.call()
}});
jQuery.ajaxSettings.async=true
}};
Core._showBlockUI(_displayBlockUIOption)
};
return G
}};