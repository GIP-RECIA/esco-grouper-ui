var MoveGroup=$.extend(true,{},CorePlugin,{_nodeHovered:null,_isNodeCut:false,_theNodeCut:null,_isInDragMode:false,_theNodeToMove:null,_previousNode:null,_canMoveIt:false,doOnFire:function(){this._entryPoint="DragAndDropPlugin";
DragAndDrop.dragStartMoveGroup=function(){if(MoveGroup._theNodeCut!=null){$(MoveGroup._theNodeCut).css("opacity","1");
MoveGroup._theNodeCut=null;
MoveGroup._isNodeCut=false
}MoveGroup._isInDragMode=true;
_theNodeToMove=MoveGroup._nodeHovered;
_theNodeToMove.css("opacity","0.4")
};
DragAndDrop.dragEndMoveGroup=function(){MoveGroup._isInDragMode=false;
_theNodeToMove.css("opacity","1");
_theNodeToMove=null;
if(MoveGroup._previousNode!=null){if($.browser.msie){if($(MoveGroup._previousNode).children("a").css("opacity")=="0.5"){MoveGroup._canMoveIt=false
}else{MoveGroup._canMoveIt=true
}$(MoveGroup._previousNode).children("a").css("opacity","1")
}else{if($(MoveGroup._previousNode).children("a").css("cursor")=="no-drop"){MoveGroup._canMoveIt=false
}else{MoveGroup._canMoveIt=true
}$(MoveGroup._previousNode).children("a").css("cursor","pointer")
}}MoveGroup._previousNode=null
};
DragAndDrop.moveGroup=function(K,L,R,N){var Q=$(L).attr("displayName");
var O=tree.parent($(K)).attr("displayName");
if(O==Q){return false
}if(!MoveGroup._canMoveIt){return false
}MoveGroup._canMoveIt=false;
var P={groupUuid:$(K).attr("id"),stemName:$(L).attr("name"),stemDisplayName:$(L).attr("displayName")};
var M=$(K);
var J=$(L);
MoveGroup._resultOfMoveAction=null;
_displayBlockUIOption={onAfterShowBlockUI:function(){$.post("/"+Core.applicationContext+"/ajax/groupController/moveGroup.jsf",P,function(A){if(Core.getStatus(A)){tree.settings.callback.onload=function(){TreePlugin.openAndSelectParent(Core.getValueOfXml(A,"message"));
$("li[typeNode=ROOT]").click().click();
Core._hideBlockUI();
tree.settings.callback.onload=function(){}
}
}tree.refresh($("li[id=:]"))
})
}};
Core._showBlockUI(_displayBlockUIOption);
return false
}
},init:function(B){TreeMenu.setCurrentCutAction(MoveGroup);
MoveGroup._isNodeCut=true;
MoveGroup._theNodeCut=$(B);
$(B).css("opacity","0.4")
},release:function(){if(MoveGroup._theNodeCut!=null){$(MoveGroup._theNodeCut).css("opacity","1");
MoveGroup._theNodeCut=null;
MoveGroup._isNodeCut=false
}}});
var MoveGroupPlugin=new DUI.Class(MoveGroup,$.screen);