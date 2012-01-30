var ActionSubscriptions={clickOptinDefaultAction:function(A,B){return this._clickOptinOrOptoutDefaultAction(A,B,"OPTIN")
},clickOptoutDefaultAction:function(A,B){return this._clickOptinOrOptoutDefaultAction(A,B,"OPTOUT")
},_clickOptinOrOptoutDefaultAction:function(D,B,A){var C=function(E){E.stopPropagation();
var F=$(this).attr("id").split("_");
var G=$(D.ID_GRID).getCell(F[0],0);
json={groupId:G,typeOfSubscription:A};
$.post(D.URL_SEND_SUBSCRIPTION,json,function(H){if(Core.getStatus(H)){_displayBlockUIOption={onAfterShowBlockUI:function(){tree.settings.callback.onload=function(){$(D.ID_GRID).trigger("reloadGrid");
tree.settings.callback.onload=function(){}
};
tree.refresh($("li[id=:]"))
}};
Core._showBlockUI(_displayBlockUIOption)
}else{$.jGrowl(Core.getResult(H),{header:"Important",theme:"jGrowlError",sticky:true})
}})
};
return C
}};