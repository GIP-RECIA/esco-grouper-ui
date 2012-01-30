var GroupPrivilegesPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){fluid.accessibletabs("escoTabs","escoPanels");
var A=this;
Core.addAction($("input[name=privilegesRadio]"),Core.CLICK,function(){_self=A;
_displayBlockUIOption={onAfterShowBlockUI:function(){_self._loadData()
}};
Core._showBlockUI(_displayBlockUIOption)
},false);
A._hideRadio();
$("#groupAdmin").hide();
return true
},doActionOnFindData:function(A){groupModification.getIsGroupModified()
},getPostDataToFindDataRequest:function(){var A=$.extend({groupUuid:$("input[id=groupUuid]").val(),privilegeType:$("input[name=privilegesRadio]:checked").val()},Core.getUrlParams());
Core.resetNavParams();
return A
},getIfSelectable:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if((privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){this._options.IS_SELECTABLE_GRID=false
}else{this._options.IS_SELECTABLE_GRID=true
}},doIsMultipleViewGrid:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){}else{this._createNavBar();
$("#pagerGrid_privilege > *").not(".navtable").hide();
$($("#pagerGrid_privilege .nav-button")[1]).hide()
}},doSelectRow:function(B,A){if(A==false){$("input[id=cb_jqg]").attr("checked",false);
this.nbRowSelected--
}else{this.nbRowSelected++
}this._updateRowSelectedInfo()
},doSelectAll:function(B,A){if(A){this.nbRowSelected=parseInt($("#list_privilege").attr("p").records,10)
}else{this.nbRowSelected=0
}this._updateRowSelectedInfo()
},doOnPaging:function(){this._selectType="undefined";
this._sendSelectedRows();
this._resizeGrid()
},doOnExistingAddedItems:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){if(this.isExistingAddedItems){$("#subtitleWarningPrivilege").empty().append(this._lang.WARNING_MESSAGE)
}else{$("#subtitleWarningPrivilege").empty()
}}else{$("#subtitleWarningPrivilege").empty()
}},doOnLoadComplete:function(D){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if((privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){$("table[class*=navtable]").css("display","none");
$("input[class=cbox]").css("display","none")
}else{try{$("table[class*=navtable]").css("display","block");
$("input[class=cbox]").css("display","block")
}catch(E){}}if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){var F='<img id="?" src="/'+Core.applicationContext+'/media/imgs/checked_not_clickable.png" checked="true" style="width : 15px; height : 15px; cursor : pointer;"/>';
var H='<img id="?" src="/'+Core.applicationContext+'/media/imgs/unchecked_not_clickable.png" checked="false" style="width : 15px; height : 15px; cursor : pointer;" />'
}else{var F='<img id="?" src="/'+Core.applicationContext+'/media/imgs/checked.png" checked="true" style="width : 15px; height : 15px; cursor : pointer;"/>';
var H='<img id="?" src="/'+Core.applicationContext+'/media/imgs/unchecked.png" checked="false" style="width : 15px; height : 15px; cursor : pointer;" />'
}var C=$(this._options.ID_GRID).getDataIDs();
for(var B=0;
B<C.length;
B++){var G=C[B];
for(var A=3;
A<9;
A++){var D=$(this._options.ID_GRID).getCell(B+1,A);
if(D==="1"){imgCheckedTmp=F.replace("?",G+"_col"+A);
$(this._options.ID_GRID).setCell(B+1,A,imgCheckedTmp,"",{title:""})
}else{imgUnCheckedTmp=H.replace("?",G+"_col"+A);
$(this._options.ID_GRID).setCell(B+1,A,imgUnCheckedTmp,"",{title:""})
}}if(!(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){$("#"+G+"_col3").bind("click",ActionRightCheckBox.clickOptinDefaultAction(this._options,groupModification.getIsGroupModified));
$("#"+G+"_col3").attr("action","optin");
$("#"+G+"_col4").bind("click",ActionRightCheckBox.clickOptoutDefaultAction(this._options,groupModification.getIsGroupModified));
$("#"+G+"_col4").attr("action","optout");
$("#"+G+"_col5").bind("click",ActionRightCheckBox.clickViewDefaultAction(this._options,groupModification.getIsGroupModified));
$("#"+G+"_col5").attr("action","view");
$("#"+G+"_col6").bind("click",ActionRightCheckBox.clickReadDefaultAction(this._options,groupModification.getIsGroupModified));
$("#"+G+"_col6").attr("action","read");
$("#"+G+"_col7").bind("click",ActionRightCheckBox.clickUpdateDefaultAction(this._options,groupModification.getIsGroupModified));
$("#"+G+"_col7").attr("action","update");
$("#"+G+"_col8").bind("click",ActionRightCheckBox.clickAdminDefaultAction(this._options,groupModification.getIsGroupModified));
$("#"+G+"_col8").attr("action","admin")
}}},addActionOnClickLinkItemPerson:function(A){if(Profile.canAccessToPersonProperties()){Core.addAction($(A),Core.CLICK,function(B){$.post("/"+Core.applicationContext+"/stylesheets/person/modalPersonProperties.jsf",{idPerson:B.target.id,needClear:"true"},function(C){Core.isInBlockUiMode=true;
$("#modalAttribute").empty().append(C);
$.blockUI({message:$("#modalAttribute"),css:{cursor:"default",width:"800px",top:"30%",left:"50%","margin-left":"-400px"}})
})
},false)
}else{$(A).removeClass("tableLink")
}},addActionOnClickLinkItemGroup:function(A){if(Profile.canAccessToGroupProperties()){Core.addAction($(A),Core.CLICK,function(B){$.post("/"+Core.applicationContext+"/stylesheets/groupProperties/modalGroupPropertiesAttributes.jsf",{groupUuid:$(B.target).attr("idNode")},function(C){Core.isInBlockUiMode=true;
$("#modalAttribute").empty().append(C);
$.blockUI({message:$("#modalAttribute"),css:{cursor:"default",width:"800px",top:"30%",left:"50%","margin-left":"-400px"}})
})
},false)
}else{$(A).removeClass("tableLink")
}},doAddNavButtons:function(){var A=this;
var C=ActionNavBar.actionAddDefault(A,"/"+Core.applicationContext+"/stylesheets/groupModifications/groupModifications.jsf",1);
this._addANavButton(this._lang.ADD_LABEL,this._lang.ADD_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/10551.add_exc.gif",C,"add");
var B=ActionNavBar.actionDelDefault(A,"/"+Core.applicationContext+"/ajax/groupModificationsPrivilegesController/deleteItems.jsf",groupModification.getIsGroupModified);
this._addANavButton(this._lang.DEL_LABEL,this._lang.DEL_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/14763.delete.gif",B,"del")
},_hideRadio:function(){hide=$("input[id=isCreation]").val();
if(hide=="creation"){$("#privilegesRadio").css("visibility","hidden")
}else{$("#privilegesRadio").css("visibility","visible")
}}});
var GroupPrivileges=new DUI.Class(GroupPrivilegesPrototype,$.screen);