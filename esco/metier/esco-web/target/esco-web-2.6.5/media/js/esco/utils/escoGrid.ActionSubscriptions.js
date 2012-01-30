var ActionSubscriptions={clickOptinDefaultAction:function(C,D){return this._clickOptinOrOptoutDefaultAction(C,D,"OPTIN")
},clickOptoutDefaultAction:function(C,D){return this._clickOptinOrOptoutDefaultAction(C,D,"OPTOUT")
},_clickOptinOrOptoutDefaultAction:function(F,H,E){var G=function(C){C.stopPropagation();
var B=$(this).attr("id").split("_");
var A=$(F.ID_GRID).getCell(B[0],0);
json={groupId:A,typeOfSubscription:E};
$.post(F.URL_SEND_SUBSCRIPTION,json,function(D){if(Core.getStatus(D)){_displayBlockUIOption={onAfterShowBlockUI:function(){tree.settings.callback.onload=function(){$(F.ID_GRID).trigger("reloadGrid");
tree.settings.callback.onload=function(){}
};
tree.refresh($("li[id=:]"))
}};
Core._showBlockUI(_displayBlockUIOption)
}else{$.jGrowl(Core.getResult(D),{header:"Important",theme:"jGrowlError",sticky:true})
}})
};
return G
}};