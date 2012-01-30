var PersonPrivilegesGroupPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){fluid.accessibletabs("escoTabs","escoPanels");
person.setMethodToCall("group");
return true
},doActionOnFindData:function(B){person.getIsPersonModified()
},getPostDataToFindDataRequest:function(){var B=$.extend({personId:$("input[id=idPerson]").val(),privilegeType:$("input[name=privilegesRadio]:checked").val()},Core.getUrlParams());
Core.resetNavParams();
return B
},getIfSelectable:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){this._options.IS_SELECTABLE_GRID=false
}else{this._options.IS_SELECTABLE_GRID=true
}},doIsMultipleViewGrid:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){}else{this._createNavBar();
$("#pagerGrid_privilegeGroup > *").not(".navtable").hide();
$($("#pagerGrid_privilegeGroup .nav-button")[1]).hide()
}},doSelectRow:function(D,C){if(C==false){$("input[id=cb_jqg]").attr("checked",false);
this.nbRowSelected--
}else{this.nbRowSelected++
}this._updateRowSelectedInfo()
},doSelectAll:function(D,C){if(C){this.nbRowSelected=parseInt($("#list_privilegeGroup").attr("p").records,10)
}else{this.nbRowSelected=0
}this._updateRowSelectedInfo()
},doOnPaging:function(){this._selectType="undefined";
this._sendSelectedRows();
this._resizeGrid()
},doOnExistingAddedItems:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){if(this.isExistingAddedItems){$("#subtitleWarningPrivilege").empty().append(this._lang.WARNING_MESSAGE)
}else{$("#subtitleWarningPrivilege").empty()
}}else{$("#subtitleWarningPrivilege").empty()
}},doOnLoadComplete:function(N){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if((privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){$("table[class*=navtable]").css("display","none");
$("input[class=cbox]").css("display","none")
}else{try{$("table[class*=navtable]").css("display","block");
$("input[class=cbox]").css("display","block")
}catch(M){}}if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){var L='<img id="?" src="/'+Core.applicationContext+'/media/imgs/checked_not_clickable.png" checked="true" style="width : 15px; height : 15px; cursor : pointer;"/>';
var J='<img id="?" src="/'+Core.applicationContext+'/media/imgs/unchecked_not_clickable.png" checked="false" style="width : 15px; height : 15px; cursor : pointer;" />'
}else{var L='<img id="?" src="/'+Core.applicationContext+'/media/imgs/checked.png" checked="true" style="width : 15px; height : 15px; cursor : pointer;"/>';
var J='<img id="?" src="/'+Core.applicationContext+'/media/imgs/unchecked.png" checked="false" style="width : 15px; height : 15px; cursor : pointer;" />'
}var O=$(this._options.ID_GRID).getDataIDs();
for(var P=0;
P<O.length;
P++){var K=O[P];
for(var I=4;
I<10;
I++){var N=$(this._options.ID_GRID).getCell(P+1,I);
if(N==="1"){imgCheckedTmp=L.replace("?",K+"_col"+I);
$(this._options.ID_GRID).setCell(P+1,I,imgCheckedTmp,"",{title:""})
}else{imgUnCheckedTmp=J.replace("?",K+"_col"+I);
$(this._options.ID_GRID).setCell(P+1,I,imgUnCheckedTmp,"",{title:""})
}}if(!(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){$("#"+K+"_col4").bind("click",ActionRightCheckBox.clickOptinDefaultAction(this._options,person.getIsPersonModified));
$("#"+K+"_col4").attr("action","optin");
$("#"+K+"_col5").bind("click",ActionRightCheckBox.clickOptoutDefaultAction(this._options,person.getIsPersonModified));
$("#"+K+"_col5").attr("action","optout");
$("#"+K+"_col6").bind("click",ActionRightCheckBox.clickViewDefaultAction(this._options,person.getIsPersonModified));
$("#"+K+"_col6").attr("action","view");
$("#"+K+"_col7").bind("click",ActionRightCheckBox.clickReadDefaultAction(this._options,person.getIsPersonModified));
$("#"+K+"_col7").attr("action","read");
$("#"+K+"_col8").bind("click",ActionRightCheckBox.clickUpdateDefaultAction(this._options,person.getIsPersonModified));
$("#"+K+"_col8").attr("action","update");
$("#"+K+"_col9").bind("click",ActionRightCheckBox.clickAdminDefaultAction(this._options,person.getIsPersonModified));
$("#"+K+"_col9").attr("action","admin")
}}},addActionOnClickLinkItemGroup:function(B){if(Profile.canAccessToGroupProperties()){Core.addAction($(B),Core.CLICK,function(A){_displayBlockUIOption={onAfterShowBlockUI:function(){Core.log("Preparate open of node + "+A.target.id);
TreePlugin.openAndSelectNode(A.target.id)
}};
Core._showBlockUI(_displayBlockUIOption)
})
}else{$(B).removeClass("tableLink")
}},doAddNavButtons:function(){var D=this;
var E=ActionNavBar.actionAddPersonDefault(D,"/"+Core.applicationContext+"/stylesheets/personProperties.jsf",2,true);
this._addANavButton(this._lang.ADD_LABEL,this._lang.ADD_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/10551.add_exc.gif",E,"add");
var F=ActionNavBar.actionDelDefault(D,"/"+Core.applicationContext+"/ajax/personPrivilegesGroupController/deleteItems.jsf",person.getIsPersonModified);
this._addANavButton(this._lang.DEL_LABEL,this._lang.DEL_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/14763.delete.gif",F,"del")
}});
var PersonPrivilegesGroup=new DUI.Class(PersonPrivilegesGroupPrototype,$.screen);