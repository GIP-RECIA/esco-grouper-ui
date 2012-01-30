var PersonSubscriptionsPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){return true
},getPostDataToFindDataRequest:function(){var A={personId:$("#idPerson").val()};
return A
},doSpecificActionIfNoData:function(){$("#escoPanels").tabs("select",0);
$("input[name=personSubscriptions] + a").hide();
return false
},doOnLoadComplete:function(){var D=$(this._options.ID_GRID).getDataIDs();
if(D.length==0){this.doSpecificActionIfNoData()
}else{var A='<img id="?" src="/'+Core.applicationContext+'/media/imgs/grid/subscribe.png" style="width : 15px; float:right; height : 15px; cursor : pointer; margin-top:0px !important;" title="'+this._lang.TO_SUBSCRIBE+'"/>';
var G='<img id="?" src="/'+Core.applicationContext+'/media/imgs/grid/unsubscribe.png" style="width : 15px; float:right; height : 15px; cursor : pointer; margin-top:0px !important;" title="'+this._lang.TO_UNSUBSCRIBE+'" />';
for(var C=0;
C<D.length;
C++){var B=D[C];
var F=$(this._options.ID_GRID).getCell(C+1,3);
var E=$(this._options.ID_GRID).getCell(C+1,4);
if(F==="1"){if(E==="true"){imgUnSubscribeAux=G.replace("?",B+"_row");
$(this._options.ID_GRID).setCell(C+1,3,"<span style='float:left;'>"+this._lang.PERSON_IS_SUBSCRIBED+"</span>"+imgUnSubscribeAux,"",{title:this._lang.PERSON_IS_SUBSCRIBED});
$("#"+B+"_row").unbind("click");
$("#"+B+"_row").bind("click",ActionSubscriptions.clickOptoutDefaultAction(this._options,this._lang));
$("#"+B+"_row").attr("action","optout")
}else{$(this._options.ID_GRID).setCell(C+1,3,"<span style='float:left;'>"+this._lang.PERSON_IS_SUBSCRIBED+"</span>","",{title:this._lang.PERSON_IS_SUBSCRIBED})
}}else{if(E==="true"){imgSubscribeAux=A.replace("?",B+"_row");
$(this._options.ID_GRID).setCell(C+1,3,"<span style='float:left;'>"+this._lang.PERSON_IS_NOT_SUBSCRIBED+"</span>"+imgSubscribeAux,"",{title:this._lang.PERSON_IS_NOT_SUBSCRIBED});
$("#"+B+"_row").unbind("click");
$("#"+B+"_row").bind("click",ActionSubscriptions.clickOptinDefaultAction(this._options,this._lang));
$("#"+B+"_row").attr("action","optin")
}else{$(this._options.ID_GRID).setCell(C+1,3,"<span style='float:left;'>"+this._lang.PERSON_IS_NOT_SUBSCRIBED+"</span>","",{title:this._lang.PERSON_IS_NOT_SUBSCRIBED})
}}}}},addActionOnClickLinkItemGroup:function(A){if(Profile.canAccessToGroupProperties()){Core.addAction($(A),Core.CLICK,function(B){Core.log("Preparate open of node + "+B.target.id);
_displayBlockUIOption={onAfterShowBlockUI:function(){Core.log("Preparate open of node + "+$("#"+B.target.id).attr("id"));
TreePlugin.openAndSelectNode(B.target.id)
}};
Core._showBlockUI(_displayBlockUIOption)
},true)
}else{$(A).removeClass("tableLink")
}},doAddNavButtons:function(){}});
var PersonSubscriptions=new DUI.Class(PersonSubscriptionsPrototype,$.screen);