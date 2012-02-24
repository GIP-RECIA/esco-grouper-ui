var GroupMemberPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){$("#groupAdmin").hide();
$("#groupDelete").hide();
return true
},getPostDataToFindDataRequest:function(){jsonData=$.extend({groupUuid:$("input[id=groupUuid]").val(),theMemberType:$("input[name=membersRadio]:checked").val()},Core.getUrlParams());
Core.resetNavParams();
return jsonData
},doActionOnFindData:function(B){group.getIsGroupModified()
},getIfSelectable:function(){memberRadioValue=$("input[name=membersRadio]:checked").val();
if(memberRadioValue=="MEMBER_RADIO_EFFECTIVE"||memberRadioValue=="MEMBER_RADIO_ALL"){this._options.IS_SELECTABLE_GRID=false&&Profile.canAddOrDeleteMembersOnGroupProperties()
}else{this._options.IS_SELECTABLE_GRID=true&&Profile.canAddOrDeleteMembersOnGroupProperties()
}},doIsMultipleViewGrid:function(){memberRadioValue=$("input[name=membersRadio]:checked").val();
if(memberRadioValue=="MEMBER_RADIO_EFFECTIVE"||memberRadioValue=="MEMBER_RADIO_ALL"){}else{this._createNavBar();
$("#message").append("");
$("#pagerGrid > *").not(".navtable").hide();
$($("#pagerGrid .nav-button")[1]).hide()
}},doSelectRow:function(D,C){if(C==false){$("input[id=cb_jqg]").attr("checked",false);
this.nbRowSelected--
}else{this.nbRowSelected++
}this._updateRowSelectedInfo()
},doSelectAll:function(D,C){if(C){this.nbRowSelected=parseInt($("#list").attr("p").records,10)
}else{this.nbRowSelected=0
}this._updateRowSelectedInfo()
},doOnPaging:function(){this._selectType="undefined";
this._sendSelectedRows();
this._resizeGrid()
},doOnExistingAddedItems:function(){memberRadioValue=$("input[name=membersRadio]:checked").val();
if(memberRadioValue=="MEMBER_RADIO_EFFECTIVE"||memberRadioValue=="MEMBER_RADIO_ALL"){if(this.isExistingAddedItems){$("#subtitleWarning").empty().append(this._lang.WARNING_MESSAGE)
}else{$("#subtitleWarning").empty()
}}else{$("#subtitleWarning").empty()
}},doOnLoadComplete:function(){memberRadioValue=$("input[name=membersRadio]:checked").val();
if(memberRadioValue=="MEMBER_RADIO_EFFECTIVE"||memberRadioValue=="MEMBER_RADIO_ALL"){$("table[class*=navtable]").css("display","none");
$("input[class=cbox]").css("display","none")
}else{try{$("table[class*=navtable]").css("display","block");
$("input[class=cbox]").css("display","block")
}catch(B){}}},addActionOnClickLinkItemPerson:function(B){if(Profile.canAccessToPersonProperties()){Core.addAction($(B),Core.CLICK,function(A){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{idPerson:A.target.id,needClear:"true"},"#mainContent",true,false)
},true)
}else{$(B).removeClass("tableLink")
}},addActionOnClickLinkItemGroup:function(B){if(Profile.canAccessToGroupProperties()){Core.addAction($(B),Core.CLICK,function(A){Core.log("Preparate open of node + "+A.target.id);
_displayBlockUIOption={onAfterShowBlockUI:function(){Core.log("Preparate open of node + "+$("#"+A.target.id).attr("id"));
TreePlugin.openAndSelectNode(A.target.id)
}};
Core._showBlockUI(_displayBlockUIOption)
},true)
}else{$(B).removeClass("tableLink")
}},doAddNavButtons:function(){var D=this;
if(Profile.canAddOrDeleteMembersOnGroupProperties()){var E=ActionNavBar.actionAddDefault(D,"/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",1);
this._addANavButton(this._lang.ADD_LABEL,this._lang.ADD_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/10551.add_exc.gif",E,"add");
var F=ActionNavBar.actionDelDefault(D,"/"+Core.applicationContext+"/ajax/groupMembersController/deleteItems.jsf",group.getIsGroupModified);
this._addANavButton(this._lang.DEL_LABEL,this._lang.DEL_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/14763.delete.gif",F,"del")
}}});
var GroupMember=new DUI.Class(GroupMemberPrototype,$.screen);