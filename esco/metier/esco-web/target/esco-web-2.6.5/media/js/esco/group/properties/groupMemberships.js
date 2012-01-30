var GroupMembershipsPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){$("#groupAdmin").hide();
$("#groupDelete").hide();
return true
},getPostDataToFindDataRequest:function(){jsonData=$.extend({groupUuid:$("input[id=groupUuid]").val(),membershipType:$("input[name=membershipsRadio]:checked").val()},Core.getUrlParams());
Core.resetNavParams();
return jsonData
},doActionOnFindData:function(B){group.getIsGroupModified()
},getIfSelectable:function(){memberRadioValue=$("input[name=membershipsRadio]:checked").val();
if(memberRadioValue=="MEMBERSHIP_RADIO_EFFECTIVE"||memberRadioValue=="MEMBERSHIP_RADIO_ALL"){this._options.IS_SELECTABLE_GRID=false&&Profile.canAddOrDeleteMembershipsOnGroupProperties()
}else{this._options.IS_SELECTABLE_GRID=true&&Profile.canAddOrDeleteMembershipsOnGroupProperties()
}},doIsMultipleViewGrid:function(){memberRadioValue=$("input[name=membershipsRadio]:checked").val();
if(memberRadioValue=="MEMBERSHIP_RADIO_EFFECTIVE"||memberRadioValue=="MEMBERSHIP_RADIO_ALL"){}else{this._createNavBar();
$("#message").append("");
$("#pagerGridMembership > *").not(".navtable").hide();
$($("#pagerGridMembership .nav-button")[1]).hide()
}},doSelectRow:function(D,C){if(C==false){$("input[id=cb_jqg]").attr("checked",false);
this.nbRowSelected--
}else{this.nbRowSelected++
}this._updateRowSelectedInfo()
},doSelectAll:function(D,C){if(C){this.nbRowSelected=parseInt($("#listMembership").attr("p").records,10)
}else{this.nbRowSelected=0
}this._updateRowSelectedInfo()
},doOnPaging:function(){this._selectType="undefined";
this._sendSelectedRows();
this._resizeGrid()
},doOnExistingAddedItems:function(){memberRadioValue=$("input[name=membershipsRadio]:checked").val();
if(memberRadioValue=="MEMBERSHIP_RADIO_EFFECTIVE"||memberRadioValue=="MEMBERSHIP_RADIO_ALL"){if(this.isExistingAddedItems){$("#subtitleWarningMembership").empty().append(this._lang.WARNING_MESSAGE)
}else{$("#subtitleWarningMembership").empty()
}}else{$("#subtitleWarningMembership").empty()
}},doOnLoadComplete:function(){memberRadioValue=$("input[name=membershipsRadio]:checked").val();
if(memberRadioValue=="MEMBERSHIP_RADIO_EFFECTIVE"||memberRadioValue=="MEMBERSHIP_RADIO_ALL"){$("table[class*=navtable]").css("display","none");
$("input[class=cbox]").css("display","none")
}else{try{$("table[class*=navtable]").css("display","block");
$("input[class=cbox]").css("display","block")
}catch(B){}}},addActionOnClickLinkItemGroup:function(B){if(Profile.canAccessToGroupProperties()){Core.addAction($(B),Core.CLICK,function(A){Core.log("Preparate open of node + "+A.target.id);
_displayBlockUIOption={onAfterShowBlockUI:function(){Core.log("Preparate open of node + "+$("#"+A.target.id).attr("id"));
TreePlugin.openAndSelectNode(A.target.id)
}};
Core._showBlockUI(_displayBlockUIOption)
},true)
}},doAddNavButtons:function(){var D=this;
if(Profile.canAddOrDeleteMembershipsOnGroupProperties()){var E=ActionNavBar.actionAddDefault(D,"/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",2,true);
this._addANavButton(this._lang.ADD_LABEL,this._lang.ADD_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/10551.add_exc.gif",E,"add");
var F=ActionNavBar.actionDelDefault(D,"/"+Core.applicationContext+"/ajax/groupMembershipsController/deleteItems.jsf",group.getIsGroupModified);
this._addANavButton(this._lang.DEL_LABEL,this._lang.DEL_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/14763.delete.gif",F,"del")
}}});
var GroupMemberships=new DUI.Class(GroupMembershipsPrototype,$.screen);