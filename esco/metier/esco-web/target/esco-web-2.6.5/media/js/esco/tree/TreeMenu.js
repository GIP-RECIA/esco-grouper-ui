var TreeMenu={_currentCutAction:null,setCurrentCutAction:function(A){TreeMenu.releaseAllCutAction();
TreeMenu._currentCutAction=A
},releaseCurrentCutAction:function(){if(TreeMenu._currentCutAction!=null){TreeMenu._currentCutAction.release();
TreeMenu._currentCutAction=null
}},releaseAllCutAction:function(){MoveGroup.release();
MoveStem.release();
CopyMembers.release()
},copyMembersIsVisible:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if($(A).attr("typeNode")=="ROOT"){return false
}else{if(A.attr("typeNode")=="FOLDER"){return false
}else{if($(A).attr("right")!="admin"&&$(A).attr("right")!="update"){return false
}else{if(CopyMembers._groupMembersCut!=null&&CopyMembers._groupMembersCut.attr("id")==$(A).attr("id")){return false
}else{return true
}}}}},copyMembersAction:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}CopyMembers.init(A)
},pasteMembersIsVisible:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if($(A).attr("typeNode")=="ROOT"){return false
}else{if(A.attr("typeNode")=="FOLDER"){return false
}else{if($(A).attr("right")!="admin"&&$(A).attr("right")!="update"){return false
}else{if(CopyMembers._groupMembersCut!=null&&CopyMembers._groupMembersCut.attr("id")==$(A).attr("id")){return false
}}}}return CopyMembers._isGroupMembersCut
},pasteMembersAction:function(A,C){if(A===false){A=$("a[class=clicked]").parent("li")
}$(CopyMembers._groupMembersCut).css("opacity","1");
var D=$(A).attr("name");
var E=$(CopyMembers._groupMembersCut).attr("name");
var B={groupOriginName:E,groupDestName:D};
_displayBlockUIOption={onAfterShowBlockUI:function(){$.post("/"+Core.applicationContext+"/ajax/groupDeleteOrCopyMembersController/copyGroupMembers.jsf",B,function(F){if(Core.getStatus(F)){tree.settings.callback.onload=function(){Core._hideBlockUI();
tree.settings.callback.onload=function(){}
}
}tree.refresh($("li[id=:]"))
})
}};
Core._showBlockUI(_displayBlockUIOption);
TreeMenu.releaseCurrentCutAction()
},cutGroupIsVisible:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if($(A).attr("typeNode")=="ROOT"){return false
}else{if(A.attr("typeNode")=="FOLDER"){return false
}else{if($(A).attr("right")!="admin"){return false
}else{return true
}}}return false
},cutGroupAction:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}MoveGroup.init(A)
},pasteGroupIsVisible:function(D,B){if(D===false){D=$("a[class=clicked]").parent("li")
}if($(D).attr("typeNode")=="ROOT"){return false
}else{if(D.attr("typeNode")=="GROUP"){return false
}else{if($(D).attr("right")=="FOLDER"){return false
}else{if($(D).attr("right")=="NONE"){return false
}}}}if(MoveGroup._theNodeCut!=null){var C=$(D).attr("displayName");
var A=tree.parent($(MoveGroup._theNodeCut)).attr("displayName");
if(A==C){return false
}}return MoveGroup._isNodeCut;
return false
},pasteGroupAction:function(E,A){if(E===false){E=$("a[class=clicked]").parent("li")
}$(MoveGroup._theNodeCut).css("opacity","1");
var C=$(E).attr("displayName");
var F=tree.parent($(MoveGroup._theNodeCut)).attr("displayName");
var G={groupUuid:$(MoveGroup._theNodeCut).attr("id"),stemName:$(E).attr("name"),stemDisplayName:$(E).attr("displayName")};
var D=$(MoveGroup._theNodeCut);
var B=$(E);
MoveGroup._resultOfMoveAction=null;
_displayBlockUIOption={onAfterShowBlockUI:function(){$.post("/"+Core.applicationContext+"/ajax/groupController/moveGroup.jsf",G,function(H){if(Core.getStatus(H)){tree.settings.callback.onload=function(){TreePlugin.openAndSelectParent(Core.getValueOfXml(H,"message"));
$("li[typeNode=ROOT]").click().click();
Core._hideBlockUI();
tree.settings.callback.onload=function(){}
}
}tree.refresh($("li[id=:]"))
})
}};
Core._showBlockUI(_displayBlockUIOption);
TreeMenu.releaseCurrentCutAction()
},cutStemIsVisible:function(A,B){return false;
if(A===false){A=$("a[class=clicked]").parent("li")
}if($(A).attr("typeNode")=="ROOT"){return false
}else{if(A.attr("typeNode")=="GROUP"){return false
}else{return true
}}return false
},cutStemAction:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}MoveStem.init(A)
},pasteStemIsVisible:function(D,B){return false;
if(D===false){D=$("a[class=clicked]").parent("li")
}if($(D).attr("typeNode")=="ROOT"){return false
}else{if(D.attr("typeNode")=="GROUP"){return false
}}if(MoveStem._theNodeCut!=null){var C=$(D).attr("displayName");
var A=$(MoveStem._theNodeCut).attr("displayName");
if(A==C){return false
}}return MoveStem._isNodeCut;
return false
},pasteStemAction:function(A,C){if(A===false){A=$("a[class=clicked]").parent("li")
}$(MoveStem._theNodeCut).css("opacity","1");
var B={stemUuid:$(MoveStem._theNodeCut).attr("id"),stemName:$(MoveStem._theNodeCut).attr("name"),targetStemName:$(A).attr("name")};
var E=$(MoveStem._theNodeCut);
var D=$(A);
MoveStem._resultOfMoveAction=null;
_displayBlockUIOption={onAfterShowBlockUI:function(){$.post("/"+Core.applicationContext+"/ajax/stemController/moveStem.jsf",B,function(F){if(Core.getStatus(F)){tree.settings.callback.onload=function(){TreePlugin.openAndSelectParent(Core.getValueOfXml(F,"message"));
$("li[typeNode=ROOT]").click().click();
Core._hideBlockUI();
tree.settings.callback.onload=function(){}
}
}tree.refresh($("li[id=:]"))
})
}};
Core._showBlockUI(_displayBlockUIOption);
TreeMenu.releaseCurrentCutAction()
},deleteIsVisible:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if($(A).attr("typeNode")=="ROOT"){return false
}else{if(A.attr("typeNode")=="FOLDER"){if($(A).attr("isEmpty")!="true"){return false
}else{if($(A).attr("right")=="GROUP"){return false
}else{if($(A).attr("right")=="NONE"){return false
}else{return true
}}}}else{if($(A).attr("right")!="admin"){return false
}else{return true
}}}},deleteAction:function(D,B){if(D===false){D=$("a[class=clicked]").parent("li")
}if(D.attr("typeNode")=="FOLDER"){var C=false;
if($("#stemUuid")!=undefined&&$("#stemUuid").val()==D.attr("id")){C=true
}$.post("/"+Core.applicationContext+"/stylesheets/stemProperties/modalDeleteStem.jsf",{stemUuid:D.attr("id"),displayName:D.attr("displayName"),needToRedirect:C,from:"treeNavigate"},function(E){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(E);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
}else{if(D.attr("typeNode")=="GROUP"){var C=false;
if($("#groupUuid")!=undefined&&$("#groupUuid").val()==D.attr("id")){C=true;
try{group._needUpdateData=false
}catch(A){}}$.post("/"+Core.applicationContext+"/stylesheets/groupProperties/modalDeleteGroup.jsf",{groupUuid:D.attr("id"),displayName:D.attr("displayName"),needToRedirect:C,from:"treeNavigate"},function(E){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(E);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
}}},createFolderIsVisible:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if($(A).attr("typeNode")=="ROOT"){return false
}else{if($(A).attr("typeNode")=="GROUP"){return false
}else{if($(A).attr("right")=="GROUP"){return false
}else{if($(A).attr("right")=="NONE"){return false
}else{if(!Profile.canAccessToStemModification()){return false
}else{return true
}}}}}},createFolderAction:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if(A.attr("typeNode")=="FOLDER"){tree.select_node($(A));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemModifications.jsf",{stemUuid:$(A).attr("ID"),from:"treeNavigate",creation:"true"},"#mainContent",true)
}},createGroupIsVisible:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if($(A).attr("typeNode")=="ROOT"){return false
}else{if($(A).attr("typeNode")=="GROUP"){return false
}else{if($(A).attr("right")=="FOLDER"){return false
}else{if($(A).attr("right")=="NONE"){return false
}else{if(!Profile.canAccessToGroupModification()){return false
}else{return true
}}}}}},createGroupAction:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if(A.attr("typeNode")=="FOLDER"){tree.select_node($(A));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf",{stemUuid:$(A).attr("ID"),from:"treeNavigate",creation:"true"},"#mainContent",true)
}},searchIsVisible:function(A,B){return true
},searchAction:function(B,C){if(B===false){B=$("a[class=clicked]").parent("li")
}var E="";
var A="";
if(B.attr("typeNode")=="GROUP"){var D=$(B).attr("name").split(":");
for(i=0;
i<D.length-1;
i++){E=E+D[i]+":"
}E=E.substring(0,E.length-1);
D=$(B).attr("displayName").split(":");
for(i=0;
i<D.length-1;
i++){A=A+D[i]+":"
}A=A.substring(0,A.length-1)
}else{E=$(B).attr("name");
A=$(B).attr("displayName")
}tree.select_node($(B));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/simpleSearch.jsf",{idNode:A,nameIdNode:E},"#mainContent",true,true)
},manageIsVisible:function(A,B){if($(A).attr("typeNode")=="ROOT"){return false
}else{if(A.attr("typeNode")=="FOLDER"){if(!Profile.canAccessToStemModification()){return false
}else{if($(A).attr("right")=="GROUP"){return false
}else{if($(A).attr("right")=="NONE"){return false
}else{return true
}}}}else{if(A.attr("typeNode")=="GROUP"){if(!Profile.canAccessToGroupModification()){return false
}else{if($(A).attr("right")!="admin"){return false
}else{return true
}}}else{return false
}}}},manageAction:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if(A.attr("typeNode")=="FOLDER"){tree.select_node($(A));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemModifications.jsf",{stemUuid:$(A).attr("ID"),from:"treeNavigate",creation:"false"},"#mainContent",true,true)
}else{if(A.attr("typeNode")=="GROUP"){tree.select_node($(A));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf",{groupUuid:$(A).attr("ID"),from:"treeNavigate",creation:"false"},"#mainContent",true,true)
}}},propertiesIsVisible:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if($(A).attr("typeNode")=="ROOT"){return false
}else{if(A.attr("typeNode")=="FOLDER"){if(!Profile.canAccessToStemProperties()){return false
}else{return true
}}else{if(A.attr("typeNode")=="GROUP"){if(!Profile.canAccessToGroupProperties()){return false
}else{return true
}}else{return false
}}}},propertiesAction:function(A,B){if(A===false){A=$("a[class=clicked]").parent("li")
}if(A.attr("typeNode")=="GROUP"){tree.select_node($(A));
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",{groupUuid:$(A).attr("ID"),from:"treeNavigate"},"#mainContent",true,true)
}else{if(A.attr("typeNode")=="FOLDER"){tree.select_node($(A));
$.post("/"+Core.applicationContext+"/ajax/stemController/isModifiedStems.jsf",json,function(C){});
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemProperties/stemProperties.jsf",{stemUuid:$(A).attr("ID"),from:"treeNavigate"},"#mainContent",true,true)
}}},subscribeIsVisible:function(B,A){if(B===false){B=$("a[class=clicked]").parent("li")
}if($(B).attr("typeNode")=="ROOT"){return false
}else{if($(B).attr("typeNode")=="FOLDER"){return false
}else{if($(B).attr("optin")=="false"){return false
}else{return true
}}}},subscribeAction:function(A,B){TreeMenu._clickOptinOrOptoutDefaultAction(A,"OPTIN")
},unSubscribeIsVisible:function(B,A){if(B===false){B=$("a[class=clicked]").parent("li")
}if($(B).attr("typeNode")=="ROOT"){return false
}else{if($(B).attr("typeNode")=="FOLDER"){return false
}else{if($(B).attr("optout")=="false"){return false
}else{return true
}}}},unSubscribeAction:function(A,B){TreeMenu._clickOptinOrOptoutDefaultAction(A,"OPTOUT")
},_clickOptinOrOptoutDefaultAction:function(A,C){var B=$(A).attr("id");
json={groupId:B,typeOfSubscription:C};
$.post("/"+Core.applicationContext+"/ajax/personSubscriptionsController/subscribeOrUnsubscribeToGroup.jsf",json,function(D){if(Core.getStatus(D)){_displayBlockUIOption={onAfterShowBlockUI:function(){tree.settings.callback.onload=function(){if($("input[name=personSubscriptions] + a")!=undefined){var E=$("#escoPanels").tabs();
var F=-1;
jQuery.each($(".ui-tabs-nav > .ui-corner-top"),function(G,H){if(H.textContent==$("input[name=personSubscriptions] + a").attr("title")){F=G
}});
if($("#escoPanels").tabs("option","selected")==F){E.tabs("load",F)
}}Core._hideBlockUI();
tree.settings.callback.onload=function(){}
};
tree.refresh($("li[id=:]"))
}};
Core._showBlockUI(_displayBlockUIOption)
}else{$.jGrowl(Core.getResult(D),{header:"Important",theme:"jGrowlError",sticky:true})
}})
}};