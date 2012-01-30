var StemPrivilegesPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){fluid.accessibletabs("escoTabs","escoPanels");
this._hideRadio();
return true
},doActionOnFindData:function(B){stem.getIsStemModified()
},getPostDataToFindDataRequest:function(){var B=$.extend({stemUuid:$("input[id=stemUuid]").val(),privilegeType:$("input[name=privilegesRadio]:checked").val()},Core.getUrlParams());
Core.resetNavParams();
return B
},getIfSelectable:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){this._options.IS_SELECTABLE_GRID=false
}else{this._options.IS_SELECTABLE_GRID=true
}},doIsMultipleViewGrid:function(){privilegeRadioValue=$("input[name=privilegesRadio]:checked").val();
if(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL"){}else{this._createNavBar();
$("#pagerGrid_privilege > *").not(".navtable").hide();
$($("#pagerGrid_privilege .nav-button")[1]).hide()
}},doSelectRow:function(D,C){if(C==false){$("input[id=cb_jqg]").attr("checked",false);
this.nbRowSelected--
}else{this.nbRowSelected++
}this._updateRowSelectedInfo()
},doSelectAll:function(D,C){if(C){this.nbRowSelected=parseInt($("#list_privilege").attr("p").records,10)
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
for(var I=3;
I<5;
I++){var N=$(this._options.ID_GRID).getCell(P+1,I);
if(N==="1"){imgCheckedTmp=L.replace("?",K+"_col"+I);
$(this._options.ID_GRID).setCell(P+1,I,imgCheckedTmp,"",{title:""})
}else{imgUnCheckedTmp=J.replace("?",K+"_col"+I);
$(this._options.ID_GRID).setCell(P+1,I,imgUnCheckedTmp,"",{title:""})
}}if(!(privilegeRadioValue=="PRIVILEGE_RADIO_EFFECTIVE"||privilegeRadioValue=="PRIVILEGE_RADIO_ALL")){$("#"+K+"_col3").bind("click",ActionRightCheckBox.clickHasStemDefaultAction(this._options,stem.getIsStemModified));
$("#"+K+"_col3").attr("action","stem");
$("#"+K+"_col4").bind("click",ActionRightCheckBox.clickHasCreateDefaultAction(this._options,stem.getIsStemModified));
$("#"+K+"_col4").attr("action","group")
}}$("#pagerGrid_privilege").css("margin-left","1px");
$($(".grid_hdiv").children("table").children().children().children("th")[2]).css("width","519px");
$($($(".grid_bdiv").children("table").children().children()[0]).children()[2]).css("width","519px")
},addActionOnClickLinkItemPerson:function(B){if(Profile.canAccessToPersonProperties()){Core.addAction($(B),Core.CLICK,function(A){$.post("/"+Core.applicationContext+"/stylesheets/person/modalPersonProperties.jsf",{idPerson:A.target.id,needClear:"true"},function(D){Core.isInBlockUiMode=true;
$("#modalAttribute").empty().append(D);
$.blockUI({message:$("#modalAttribute"),css:{cursor:"default",width:"800px",top:"30%",left:"50%","margin-left":"-400px"}})
})
},false)
}else{$(B).removeClass("tableLink")
}},addActionOnClickLinkItemGroup:function(B){if(Profile.canAccessToGroupProperties()){Core.addAction($(B),Core.CLICK,function(A){$.post("/"+Core.applicationContext+"/stylesheets/groupProperties/modalGroupPropertiesAttributes.jsf",{groupUuid:$(A.target).attr("idNode")},function(D){Core.isInBlockUiMode=true;
$("#modalAttribute").empty().append(D);
$.blockUI({message:$("#modalAttribute"),css:{cursor:"default",width:"800px",top:"30%",left:"50%","margin-left":"-400px"}})
})
},false)
}else{$(B).removeClass("tableLink")
}},doAddNavButtons:function(){var D=this;
var E=ActionNavBar.actionAddStemPrivilege(D,"/"+Core.applicationContext+"/stylesheets/stemModifications.jsf",1);
this._addANavButton(this._lang.ADD_LABEL,this._lang.ADD_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/10551.add_exc.gif",E,"add");
var F=ActionNavBar.actionDelDefault(D,"/"+Core.applicationContext+"/ajax/stemModificationsPrivilegesController/deleteItems.jsf",stem.getIsStemModified);
this._addANavButton(this._lang.DEL_LABEL,this._lang.DEL_TITLE,"/"+Core.applicationContext+"/media/imgs/grid/14763.delete.gif",F,"del")
},_hideRadio:function(){hide=$("input[id=isCreation]").val();
if(hide=="creation"){$("#privilegesRadio").css("visibility","hidden")
}else{$("#privilegesRadio").css("visibility","visible")
}}});
var StemPrivileges=new DUI.Class(StemPrivilegesPrototype,$.screen);