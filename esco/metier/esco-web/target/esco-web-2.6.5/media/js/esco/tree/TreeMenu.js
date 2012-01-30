var TreeMenu={_currentCutAction:null,setCurrentCutAction:function(B){TreeMenu.releaseAllCutAction();
TreeMenu._currentCutAction=B
},releaseCurrentCutAction:function(){if(TreeMenu._currentCutAction!=null){TreeMenu._currentCutAction.release();
TreeMenu._currentCutAction=null
}},releaseAllCutAction:function(){MoveGroup.release();
MoveStem.release();
CopyMembers.release()
},copyMembersIsVisible:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if($(C).attr("typeNode")=="ROOT"){return false
}else{if(C.attr("typeNode")=="FOLDER"){return false
}else{if($(C).attr("right")!="admin"&&$(C).attr("right")!="update"){return false
}else{if(CopyMembers._groupMembersCut!=null&&CopyMembers._groupMembersCut.attr("id")==$(C).attr("id")){return false
}else{return true
}}}}},copyMembersAction:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}CopyMembers.init(C)
},pasteMembersIsVisible:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if($(C).attr("typeNode")=="ROOT"){return false
}else{if(C.attr("typeNode")=="FOLDER"){return false
}else{if($(C).attr("right")!="admin"&&$(C).attr("right")!="update"){return false
}else{if(CopyMembers._groupMembersCut!=null&&CopyMembers._groupMembersCut.attr("id")==$(C).attr("id")){return false
}}}}return CopyMembers._isGroupMembersCut
},pasteMembersAction:function(F,I){if(F===false){F=$("a[class=clicked]").parent("li")
}$(CopyMembers._groupMembersCut).css("opacity","1");
var H=$(F).attr("name");
var G=$(CopyMembers._groupMembersCut).attr("name");
var J={groupOriginName:G,groupDestName:H};
_displayBlockUIOption={onAfterShowBlockUI:function(){$.post("/"+Core.applicationContext+"/ajax/groupDeleteOrCopyMembersController/copyGroupMembers.jsf",J,function(A){if(Core.getStatus(A)){tree.settings.callback.onload=function(){Core._hideBlockUI();
tree.settings.callback.onload=function(){}
}
}tree.refresh($("li[id=:]"))
})
}};
Core._showBlockUI(_displayBlockUIOption);
TreeMenu.releaseCurrentCutAction()
},cutGroupIsVisible:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if($(C).attr("typeNode")=="ROOT"){return false
}else{if(C.attr("typeNode")=="FOLDER"){return false
}else{if($(C).attr("right")!="admin"){return false
}else{return true
}}}return false
},cutGroupAction:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}MoveGroup.init(C)
},pasteGroupIsVisible:function(F,H){if(F===false){F=$("a[class=clicked]").parent("li")
}if($(F).attr("typeNode")=="ROOT"){return false
}else{if(F.attr("typeNode")=="GROUP"){return false
}else{if($(F).attr("right")=="FOLDER"){return false
}else{if($(F).attr("right")=="NONE"){return false
}}}}if(MoveGroup._theNodeCut!=null){var G=$(F).attr("displayName");
var E=tree.parent($(MoveGroup._theNodeCut)).attr("displayName");
if(E==G){return false
}}return MoveGroup._isNodeCut;
return false
},pasteGroupAction:function(K,H){if(K===false){K=$("a[class=clicked]").parent("li")
}$(MoveGroup._theNodeCut).css("opacity","1");
var M=$(K).attr("displayName");
var J=tree.parent($(MoveGroup._theNodeCut)).attr("displayName");
var I={groupUuid:$(MoveGroup._theNodeCut).attr("id"),stemName:$(K).attr("name"),stemDisplayName:$(K).attr("displayName")};
var L=$(MoveGroup._theNodeCut);
var N=$(K);
MoveGroup._resultOfMoveAction=null;
_displayBlockUIOption={onAfterShowBlockUI:function(){$.post("/"+Core.applicationContext+"/ajax/groupController/moveGroup.jsf",I,function(A){if(Core.getStatus(A)){tree.settings.callback.onload=function(){TreePlugin.openAndSelectParent(Core.getValueOfXml(A,"message"));
$("li[typeNode=ROOT]").click().click();
Core._hideBlockUI();
tree.settings.callback.onload=function(){}
}
}tree.refresh($("li[id=:]"))
})
}};
Core._showBlockUI(_displayBlockUIOption);
TreeMenu.releaseCurrentCutAction()
},cutStemIsVisible:function(C,D){return false;
if(C===false){C=$("a[class=clicked]").parent("li")
}if($(C).attr("typeNode")=="ROOT"){return false
}else{if(C.attr("typeNode")=="GROUP"){return false
}else{return true
}}return false
},cutStemAction:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}MoveStem.init(C)
},pasteStemIsVisible:function(F,H){return false;
if(F===false){F=$("a[class=clicked]").parent("li")
}if($(F).attr("typeNode")=="ROOT"){return false
}else{if(F.attr("typeNode")=="GROUP"){return false
}}if(MoveStem._theNodeCut!=null){var G=$(F).attr("displayName");
var E=$(MoveStem._theNodeCut).attr("displayName");
if(E==G){return false
}}return MoveStem._isNodeCut;
return false
},pasteStemAction:function(F,I){if(F===false){F=$("a[class=clicked]").parent("li")
}$(MoveStem._theNodeCut).css("opacity","1");
var J={stemUuid:$(MoveStem._theNodeCut).attr("id"),stemName:$(MoveStem._theNodeCut).attr("name"),targetStemName:$(F).attr("name")};
var G=$(MoveStem._theNodeCut);
var H=$(F);
MoveStem._resultOfMoveAction=null;
_displayBlockUIOption={onAfterShowBlockUI:function(){$.post("/"+Core.applicationContext+"/ajax/stemController/moveStem.jsf",J,function(A){if(Core.getStatus(A)){tree.settings.callback.onload=function(){TreePlugin.openAndSelectParent(Core.getValueOfXml(A,"message"));
$("li[typeNode=ROOT]").click().click();
Core._hideBlockUI();
tree.settings.callback.onload=function(){}
}
}tree.refresh($("li[id=:]"))
})
}};
Core._showBlockUI(_displayBlockUIOption);
TreeMenu.releaseCurrentCutAction()
},deleteIsVisible:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if($(C).attr("typeNode")=="ROOT"){return false
}else{if(C.attr("typeNode")=="FOLDER"){if($(C).attr("isEmpty")!="true"){return false
}else{if($(C).attr("right")=="GROUP"){return false
}else{if($(C).attr("right")=="NONE"){return false
}else{return true
}}}}else{if($(C).attr("right")!="admin"){return false
}else{return true
}}}},deleteAction:function(F,H){if(F===false){F=$("a[class=clicked]").parent("li")
}if(F.attr("typeNode")=="FOLDER"){var G=false;
if($("#stemUuid")!=undefined&&$("#stemUuid").val()==F.attr("id")){G=true
}$.post("/"+Core.applicationContext+"/stylesheets/stemProperties/modalDeleteStem.jsf",{stemUuid:F.attr("id"),displayName:F.attr("displayName"),needToRedirect:G,from:"treeNavigate"},function(A){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(A);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
}else{if(F.attr("typeNode")=="GROUP"){var G=false;
if($("#groupUuid")!=undefined&&$("#groupUuid").val()==F.attr("id")){G=true;
try{group._needUpdateData=false
}catch(E){}}$.post("/"+Core.applicationContext+"/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:F.attr("id"),displayName:F.attr("displayName"),needToRedirect:G,from:"treeNavigate"},function(A){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(A);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
}}},createFolderIsVisible:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if($(C).attr("typeNode")=="ROOT"){return false
}else{if($(C).attr("typeNode")=="GROUP"){return false
}else{if($(C).attr("right")=="GROUP"){return false
}else{if($(C).attr("right")=="NONE"){return false
}else{if(!Profile.canAccessToStemModification()){return false
}else{return true
}}}}}},createFolderAction:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if(C.attr("typeNode")=="FOLDER"){tree.select_node($(C));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemModifications.jsf",{stemUuid:$(C).attr("ID"),from:"treeNavigate",creation:"true"},"#mainContent",true)
}},createGroupIsVisible:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if($(C).attr("typeNode")=="ROOT"){return false
}else{if($(C).attr("typeNode")=="GROUP"){return false
}else{if($(C).attr("right")=="FOLDER"){return false
}else{if($(C).attr("right")=="NONE"){return false
}else{if(!Profile.canAccessToGroupModification()){return false
}else{return true
}}}}}},createGroupAction:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if(C.attr("typeNode")=="FOLDER"){tree.select_node($(C));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf",{stemUuid:$(C).attr("ID"),from:"treeNavigate",creation:"true"},"#mainContent",true)
}},searchIsVisible:function(C,D){return true
},searchAction:function(J,I){if(J===false){J=$("a[class=clicked]").parent("li")
}var G="";
var F="";
if(J.attr("typeNode")=="GROUP"){var H=$(J).attr("name").split(":");
for(i=0;
i<H.length-1;
i++){G=G+H[i]+":"
}G=G.substring(0,G.length-1);
H=$(J).attr("displayName").split(":");
for(i=0;
i<H.length-1;
i++){F=F+H[i]+":"
}F=F.substring(0,F.length-1)
}else{G=$(J).attr("name");
F=$(J).attr("displayName")
}tree.select_node($(J));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/simpleSearch.jsf",{idNode:F,nameIdNode:G},"#mainContent",true,true)
},manageIsVisible:function(C,D){if($(C).attr("typeNode")=="ROOT"){return false
}else{if(C.attr("typeNode")=="FOLDER"){if(!Profile.canAccessToStemModification()){return false
}else{if($(C).attr("right")=="GROUP"){return false
}else{if($(C).attr("right")=="NONE"){return false
}else{return true
}}}}else{if(C.attr("typeNode")=="GROUP"){if(!Profile.canAccessToGroupModification()){return false
}else{if($(C).attr("right")!="admin"){return false
}else{return true
}}}else{return false
}}}},manageAction:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if(C.attr("typeNode")=="FOLDER"){tree.select_node($(C));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemModifications.jsf",{stemUuid:$(C).attr("ID"),from:"treeNavigate",creation:"false"},"#mainContent",true,true)
}else{if(C.attr("typeNode")=="GROUP"){tree.select_node($(C));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf",{groupUuid:$(C).attr("ID"),from:"treeNavigate",creation:"false"},"#mainContent",true,true)
}}},propertiesIsVisible:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if($(C).attr("typeNode")=="ROOT"){return false
}else{if(C.attr("typeNode")=="FOLDER"){if(!Profile.canAccessToStemProperties()){return false
}else{return true
}}else{if(C.attr("typeNode")=="GROUP"){if(!Profile.canAccessToGroupProperties()){return false
}else{return true
}}else{return false
}}}},propertiesAction:function(C,D){if(C===false){C=$("a[class=clicked]").parent("li")
}if(C.attr("typeNode")=="GROUP"){tree.select_node($(C));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",{groupUuid:$(C).attr("ID"),from:"treeNavigate"},"#mainContent",true,true)
}else{if(C.attr("typeNode")=="FOLDER"){tree.select_node($(C));
$.post("/"+Core.applicationContext+"/ajax/stemController/isModifiedStems.jsf",json,function(A){});
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemProperties/stemProperties.jsf",{stemUuid:$(C).attr("ID"),from:"treeNavigate"},"#mainContent",true,true)
}}},subscribeIsVisible:function(D,C){if(D===false){D=$("a[class=clicked]").parent("li")
}if($(D).attr("typeNode")=="ROOT"){return false
}else{if($(D).attr("typeNode")=="FOLDER"){return false
}else{if($(D).attr("optin")=="false"){return false
}else{return true
}}}},subscribeAction:function(C,D){TreeMenu._clickOptinOrOptoutDefaultAction(C,"OPTIN")
},unSubscribeIsVisible:function(D,C){if(D===false){D=$("a[class=clicked]").parent("li")
}if($(D).attr("typeNode")=="ROOT"){return false
}else{if($(D).attr("typeNode")=="FOLDER"){return false
}else{if($(D).attr("optout")=="false"){return false
}else{return true
}}}},unSubscribeAction:function(C,D){TreeMenu._clickOptinOrOptoutDefaultAction(C,"OPTOUT")
},_clickOptinOrOptoutDefaultAction:function(D,E){var F=$(D).attr("id");
json={groupId:F,typeOfSubscription:E};
$.post("/"+Core.applicationContext+"/ajax/personSubscriptionsController/subscribeOrUnsubscribeToGroup.jsf",json,function(A){if(Core.getStatus(A)){_displayBlockUIOption={onAfterShowBlockUI:function(){tree.settings.callback.onload=function(){if($("input[name=personSubscriptions] + a")!=undefined){var C=$("#escoPanels").tabs();
var B=-1;
jQuery.each($(".ui-tabs-nav > .ui-corner-top"),function(J,I){if(I.textContent==$("input[name=personSubscriptions] + a").attr("title")){B=J
}});
if($("#escoPanels").tabs("option","selected")==B){C.tabs("load",B)
}}Core._hideBlockUI();
tree.settings.callback.onload=function(){}
};
tree.refresh($("li[id=:]"))
}};
Core._showBlockUI(_displayBlockUIOption)
}else{$.jGrowl(Core.getResult(A),{header:"Important",theme:"jGrowlError",sticky:true})
}})
}};