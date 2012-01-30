var PersonPrivilegesStemPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){fluid.accessibletabs("escoTabs","escoPanels");
person.setMethodToCall("stem");
return true
},doActionOnFindData:function(A){person.getIsPersonModified()
},getPostDataToFindDataRequest:function(){var A=$.extend({personId:$("input[id=idPerson]").val(),privilegeType:$("input[name=privilegesRadio]:checked").val()},Core.getUrlParams());
Core.resetNavParams();
return A
},getIfSelectable:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){this._options.IS_SELECTABLE_GRID=false
}else{this._options.IS_SELECTABLE_GRID=true
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
for(var A=4;
A<6;
A++){var D=$(this._options.ID_GRID).getCell(B+1,A);
if(D==="1"){imgCheckedTmp=F.replace("?",G+"_col"+A);
$(this._options.ID_GRID).setCell(B+1,A,imgCheckedTmp,"",{title:""})
}else{imgUnCheckedTmp=H.replace("?",G+"_col"+A);
$(this._options.ID_GRID).setCell(B+1,A,imgUnCheckedTmp,"",{title:""})
}}if(!(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){$("#"+G+"_col4").bind("click",ActionRightCheckBox.clickHasStemDefaultAction(this._options,person.getIsPersonModified));
$("#"+G+"_col4").attr("action","stem");
$("#"+G+"_col5").bind("click",ActionRightCheckBox.clickHasCreateDefaultAction(this._options,person.getIsPersonModified));
$("#"+G+"_col5").attr("action","group")
}}},addActionOnClickLinkItemStem:function(A){if(Profile.canAccessToStemProperties()){Core.addAction($(A),Core.CLICK,function(B){_displayBlockUIOption={onAfterShowBlockUI:function(){Core.log("Preparate open of node : "+B.target.id);
TreePlugin.openAndSelectNode(B.target.id)
}};
Core._showBlockUI(_displayBlockUIOption)
})
}else{$(A).removeClass("tableLink")
}},doAddNavButtons:function(){var A=this;
var C=ActionNavBar.actionAddStemSearchPerson(A,"/"+Core.applicationContext+"/stylesheets/personProperties.jsf",2,true);
this._addANavButton(this._lang.ADD_LABEL,this._lang.ADD_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/10551.add_exc.gif",C,"add");
var B=ActionNavBar.actionDelDefault(A,"/"+Core.applicationContext+"/ajax/personPrivilegesStemController/deleteItems.jsf",person.getIsPersonModified);
this._addANavButton(this._lang.DEL_LABEL,this._lang.DEL_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/14763.delete.gif",B,"del")
}});
var PersonPrivilegesStem=new DUI.Class(PersonPrivilegesStemPrototype,$.screen);