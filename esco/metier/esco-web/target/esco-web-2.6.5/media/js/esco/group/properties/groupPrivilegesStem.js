var GroupPrivilegesStemPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){fluid.accessibletabs("escoTabs","escoPanels");
group.setMethodToCall("stem");
$("#groupAdmin").hide();
$("#groupDelete").hide();
return true
},doActionOnFindData:function(A){group.getIsGroupModified()
},getPostDataToFindDataRequest:function(){var A=$.extend({groupUuid:$("input[id=groupUuid]").val(),privilegeType:$("input[name=privilegesRadio]:checked").val()},Core.getUrlParams());
Core.resetNavParams();
return A
},getIfSelectable:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){this._options.IS_SELECTABLE_GRID=false&&Profile.canEditPrivilegesOnGroupProperties()
}else{this._options.IS_SELECTABLE_GRID=true&&Profile.canEditPrivilegesOnGroupProperties()
}},doIsMultipleViewGrid:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){}else{this._createNavBar();
$("#pagerGrid_privilegeStem > *").not(".navtable").hide();
$($("#pagerGrid_privilegeStem .nav-button")[1]).hide()
}},doSelectRow:function(B,A){if(A==false){$("input[id=cb_jqg]").attr("checked",false);
this.nbRowSelected--
}else{this.nbRowSelected++
}this._updateRowSelectedInfo()
},doSelectAll:function(B,A){if(A){this.nbRowSelected=parseInt($("#list_privilegeStem").attr("p").records,10)
}else{this.nbRowSelected=0
}this._updateRowSelectedInfo()
},doOnPaging:function(){this._selectType="undefined";
this._sendSelectedRows();
this._resizeGrid()
},doOnExistingAddedItems:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){if(this.isExistingAddedItems){$("#subtitleWarningPrivilege").empty().append(this._lang.WARNING_MESSAGE)
}else{$("#subtitleWarningPrivilege").empty()
}}else{$("#subtitleWarningPrivilege").empty()
}},doOnLoadComplete:function(I){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if((privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){$("table[class*=navtable]").css("display","none");
$("input[class=cbox]").css("display","none")
}else{try{$("table[class*=navtable]").css("display","block");
$("input[class=cbox]").css("display","block")
}catch(A){}}var D="";
if(Profile.canEditPrivilegesOnGroupProperties()){if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){D="_not_clickable"
}}else{D="_not_clickable"
}var G=0;
if(!Profile.canEditPrivilegesOnGroupProperties()){G=-1
}var F='<img id="?" src="/'+Core.applicationContext+"/media/imgs/checked"+D+'.png" checked="true" style="width : 15px; height : 15px; cursor : pointer;"/>';
var E='<img id="?" src="/'+Core.applicationContext+"/media/imgs/unchecked"+D+'.png" checked="false" style="width : 15px; height : 15px; cursor : pointer;" />';
var C=$(this._options.ID_GRID).getDataIDs();
for(var J=0;
J<C.length;
J++){var B=C[J];
for(var H=4+G;
H<6+G;
H++){var I=$(this._options.ID_GRID).getCell(J+1,H);
if(I==="1"){imgCheckedTmp=F.replace("?",B+"_col"+H);
$(this._options.ID_GRID).setCell(J+1,H,imgCheckedTmp,"",{title:""})
}else{imgUnCheckedTmp=E.replace("?",B+"_col"+H);
$(this._options.ID_GRID).setCell(J+1,H,imgUnCheckedTmp,"",{title:""})
}}if(Profile.canEditPrivilegesOnGroupProperties()){if(!(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){$("#"+B+"_col4").bind("click",ActionRightCheckBox.clickHasStemDefaultAction(this._options,group.getIsGroupModified));
$("#"+B+"_col4").attr("action","stem");
$("#"+B+"_col5").bind("click",ActionRightCheckBox.clickHasCreateDefaultAction(this._options,group.getIsGroupModified));
$("#"+B+"_col5").attr("action","group")
}}}},addActionOnClickLinkItemStem:function(A){if(Profile.canAccessToStemProperties()){Core.addAction($(A),Core.CLICK,function(B){_displayBlockUIOption={onAfterShowBlockUI:function(){Core.log("Preparate open of node : "+B.target.id);
TreePlugin.openAndSelectNode(B.target.id)
}};
Core._showBlockUI(_displayBlockUIOption)
})
}},doAddNavButtons:function(){var A=this;
if(Profile.canEditPrivilegesOnGroupProperties()){var C=ActionNavBar.actionAddStemSearch(A,"/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",3,true);
this._addANavButton(this._lang.ADD_LABEL,this._lang.ADD_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/10551.add_exc.gif",C,"add");
var B=ActionNavBar.actionDelDefault(A,"/"+Core.applicationContext+"/ajax/groupPrivilegesStemController/deleteItems.jsf",group.getIsGroupModified);
this._addANavButton(this._lang.DEL_LABEL,this._lang.DEL_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/14763.delete.gif",B,"del")
}}});
var GroupPrivilegesStem=new DUI.Class(GroupPrivilegesStemPrototype,$.screen);