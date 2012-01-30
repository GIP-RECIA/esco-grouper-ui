var PersonSubscriptionsPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){return true
},getPostDataToFindDataRequest:function(){var B={personId:$("#idPerson").val()};
return B
},doSpecificActionIfNoData:function(){$("#escoPanels").tabs("select",0);
$("input[name=personSubscriptions] + a").hide();
return false
},doOnLoadComplete:function(){var L=$(this._options.ID_GRID).getDataIDs();
if(L.length==0){this.doSpecificActionIfNoData()
}else{var H='<img id="?" src="/'+Core.applicationContext+'/media/imgs/grid/subscribe.png" style="width : 15px; float:right; height : 15px; cursor : pointer; margin-top:0px !important;" title="'+this._lang.TO_SUBSCRIBE+'"/>';
var I='<img id="?" src="/'+Core.applicationContext+'/media/imgs/grid/unsubscribe.png" style="width : 15px; float:right; height : 15px; cursor : pointer; margin-top:0px !important;" title="'+this._lang.TO_UNSUBSCRIBE+'" />';
for(var M=0;
M<L.length;
M++){var N=L[M];
var J=$(this._options.ID_GRID).getCell(M+1,3);
var K=$(this._options.ID_GRID).getCell(M+1,4);
if(J==="1"){if(K==="true"){imgUnSubscribeAux=I.replace("?",N+"_row");
$(this._options.ID_GRID).setCell(M+1,3,"<span style='float:left;'>"+this._lang.PERSON_IS_SUBSCRIBED+"</span>"+imgUnSubscribeAux,"",{title:this._lang.PERSON_IS_SUBSCRIBED});
$("#"+N+"_row").unbind("click");
$("#"+N+"_row").bind("click",ActionSubscriptions.clickOptoutDefaultAction(this._options,this._lang));
$("#"+N+"_row").attr("action","optout")
}else{$(this._options.ID_GRID).setCell(M+1,3,"<span style='float:left;'>"+this._lang.PERSON_IS_SUBSCRIBED+"</span>","",{title:this._lang.PERSON_IS_SUBSCRIBED})
}}else{if(K==="true"){imgSubscribeAux=H.replace("?",N+"_row");
$(this._options.ID_GRID).setCell(M+1,3,"<span style='float:left;'>"+this._lang.PERSON_IS_NOT_SUBSCRIBED+"</span>"+imgSubscribeAux,"",{title:this._lang.PERSON_IS_NOT_SUBSCRIBED});
$("#"+N+"_row").unbind("click");
$("#"+N+"_row").bind("click",ActionSubscriptions.clickOptinDefaultAction(this._options,this._lang));
$("#"+N+"_row").attr("action","optin")
}else{$(this._options.ID_GRID).setCell(M+1,3,"<span style='float:left;'>"+this._lang.PERSON_IS_NOT_SUBSCRIBED+"</span>","",{title:this._lang.PERSON_IS_NOT_SUBSCRIBED})
}}}}},addActionOnClickLinkItemGroup:function(B){if(Profile.canAccessToGroupProperties()){Core.addAction($(B),Core.CLICK,function(A){Core.log("Preparate open of node + "+A.target.id);
_displayBlockUIOption={onAfterShowBlockUI:function(){Core.log("Preparate open of node + "+$("#"+A.target.id).attr("id"));
TreePlugin.openAndSelectNode(A.target.id)
}};
Core._showBlockUI(_displayBlockUIOption)
},true)
}else{$(B).removeClass("tableLink")
}},doAddNavButtons:function(){}});
var PersonSubscriptions=new DUI.Class(PersonSubscriptionsPrototype,$.screen);