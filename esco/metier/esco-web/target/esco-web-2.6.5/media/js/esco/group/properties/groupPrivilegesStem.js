var GroupPrivilegesStemPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){fluid.accessibletabs("escoTabs","escoPanels");
group.setMethodToCall("stem");
$("#groupAdmin").hide();
$("#groupDelete").hide();
return true
},doActionOnFindData:function(B){group.getIsGroupModified()
},getPostDataToFindDataRequest:function(){var B=$.extend({groupUuid:$("input[id=groupUuid]").val(),privilegeType:$("input[name=privilegesRadio]:checked").val()},Core.getUrlParams());
Core.resetNavParams();
return B
},getIfSelectable:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){this._options.IS_SELECTABLE_GRID=false&&Profile.canEditPrivilegesOnGroupProperties()
}else{this._options.IS_SELECTABLE_GRID=true&&Profile.canEditPrivilegesOnGroupProperties()
}},doIsMultipleViewGrid:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){}else{this._createNavBar();
$("#pagerGrid_privilegeStem > *").not(".navtable").hide();
$($("#pagerGrid_privilegeStem .nav-button")[1]).hide()
}},doSelectRow:function(D,C){if(C==false){$("input[id=cb_jqg]").attr("checked",false);
this.nbRowSelected--
}else{this.nbRowSelected++
}this._updateRowSelectedInfo()
},doSelectAll:function(D,C){if(C){this.nbRowSelected=parseInt($("#list_privilegeStem").attr("p").records,10)
}else{this.nbRowSelected=0
}this._updateRowSelectedInfo()
},doOnPaging:function(){this._selectType="undefined";
this._sendSelectedRows();
this._resizeGrid()
},doOnExistingAddedItems:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){if(this.isExistingAddedItems){$("#subtitleWarningPrivilege").empty().append(this._lang.WARNING_MESSAGE)
}else{$("#subtitleWarningPrivilege").empty()
}}else{$("#subtitleWarningPrivilege").empty()
}},doOnLoadComplete:function(P){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if((privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){$("table[class*=navtable]").css("display","none");
$("input[class=cbox]").css("display","none")
}else{try{$("table[class*=navtable]").css("display","block");
$("input[class=cbox]").css("display","block")
}catch(N){}}var K="";
if(Profile.canEditPrivilegesOnGroupProperties()){if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){K="_not_clickable"
}}else{K="_not_clickable"
}var R=0;
if(!Profile.canEditPrivilegesOnGroupProperties()){R=-1
}var S='<img id="?" src="/'+Core.applicationContext+"/media/imgs/checked"+K+'.png" checked="true" style="width : 15px; height : 15px; cursor : pointer;"/>';
var T='<img id="?" src="/'+Core.applicationContext+"/media/imgs/unchecked"+K+'.png" checked="false" style="width : 15px; height : 15px; cursor : pointer;" />';
var L=$(this._options.ID_GRID).getDataIDs();
for(var O=0;
O<L.length;
O++){var M=L[O];
for(var Q=4+R;
Q<6+R;
Q++){var P=$(this._options.ID_GRID).getCell(O+1,Q);
if(P==="1"){imgCheckedTmp=S.replace("?",M+"_col"+Q);
$(this._options.ID_GRID).setCell(O+1,Q,imgCheckedTmp,"",{title:""})
}else{imgUnCheckedTmp=T.replace("?",M+"_col"+Q);
$(this._options.ID_GRID).setCell(O+1,Q,imgUnCheckedTmp,"",{title:""})
}}if(Profile.canEditPrivilegesOnGroupProperties()){if(!(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){$("#"+M+"_col4").bind("click",ActionRightCheckBox.clickHasStemDefaultAction(this._options,group.getIsGroupModified));
$("#"+M+"_col4").attr("action","stem");
$("#"+M+"_col5").bind("click",ActionRightCheckBox.clickHasCreateDefaultAction(this._options,group.getIsGroupModified));
$("#"+M+"_col5").attr("action","group")
}}}},addActionOnClickLinkItemStem:function(B){if(Profile.canAccessToStemProperties()){Core.addAction($(B),Core.CLICK,function(A){_displayBlockUIOption={onAfterShowBlockUI:function(){Core.log("Preparate open of node : "+A.target.id);
TreePlugin.openAndSelectNode(A.target.id)
}};
Core._showBlockUI(_displayBlockUIOption)
})
}},doAddNavButtons:function(){var D=this;
if(Profile.canEditPrivilegesOnGroupProperties()){var E=ActionNavBar.actionAddStemSearch(D,"/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",3,true);
this._addANavButton(this._lang.ADD_LABEL,this._lang.ADD_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/10551.add_exc.gif",E,"add");
var F=ActionNavBar.actionDelDefault(D,"/"+Core.applicationContext+"/ajax/groupPrivilegesStemController/deleteItems.jsf",group.getIsGroupModified);
this._addANavButton(this._lang.DEL_LABEL,this._lang.DEL_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/14763.delete.gif",F,"del")
}}});
var GroupPrivilegesStem=new DUI.Class(GroupPrivilegesStemPrototype,$.screen);