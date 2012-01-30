var AdditionSearchPrototype=$.extend(true,{},EscoGrid,{_isOneItemSelected:false,_coreParams:null,_nbMember:null,_errMember:null,_popupMode:null,doOnFire:function(){if($("input[id=onlyGroup]").val()=="true"){$("input[value=SEARCH_PERSON]").attr("disabled","true");
$("input[value=SEARCH_PERSON_IN_A_GROUP]").attr("disabled","true");
if($("input[value=SEARCH_PERSON]").attr("checked")==true){$("input[value=SEARCH_GROUP]").attr("checked","true");
$("input[id=theTerm]").attr("value","")
}if($("input[value=SEARCH_PERSON_IN_A_GROUP]").attr("checked")==true){$("input[value=SEARCH_GROUP]").attr("checked","true");
$("input[id=theTerm]").attr("value","")
}}if($("input[name=subjectSearch]:checked").val()=="SEARCH_PERSON"){EscoAnimate._hideAnimate($("div[id=_idJsp1:searchGroupProperties]"))
}else{var D=$("#idNode").html();
var C=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:D,value:C})
}this.initSaveButton();
this.initReturnButton();
this.initActions();
fluid.accessibletabs("escoTabs","escoPanels");
if($("input[id=theTerm]").val()!=""){this._doneLoadData(true)
}else{Core._hideBlockUI()
}this._coreParams=Core.navParam;
Core.resetNavParams();
return false
},doActionOnFindData:function(C){if($("input[name=subjectSearch]:checked").val()=="SEARCH_PERSON_IN_A_GROUP"){var D=Core.getValueOfXml(C,"message");
if(D!=undefined&&D){$("#error").empty().append(D);
_this.unpopup()
}}},getPostDataToFindDataRequest:function(){var B={theTerm:$("input[id=theTerm]").val(),theSearchSource:$("input[name=subjectSearch]:checked").val(),theSearchType:"AdditionSearch",theSearchStep:$("input[id=theSearchStep]").val()};
if($("input[name=subjectSearch]:checked").val()=="SEARCH_GROUP"){$.extend(B,{theSearchPath:$("input[id=searchPathHidden]").val(),theDisplayTerm:$("input[name=displayGroupSearch]:checked").val()})
}else{if($("input[name=subjectSearch]:checked").val()=="SEARCH_PERSON"){$.extend(B,{theSearchPath:$("input[id=searchPathHiddenForPersonSearch]").val(),theDisplayTerm:"none"})
}else{if($("input[name=subjectSearch]:checked").val()=="SEARCH_PERSON_IN_A_GROUP"){$.extend(B,{theSearchPath:$("input[id=searchPathHidden]").val(),theDisplayTerm:$("input[name=displayGroupSearch]:checked").val()})
}else{}}}return B
},doSelectRow:function(D,C){if(C==false){$("input[id=cb_jqg]").attr("checked",false);
this.nbRowSelected--
}else{this.nbRowSelected++
}$(this._options.ID_PAGER_GRID+" .navtable .nav-row").html("")
},doSelectAll:function(D,C){if(C){this.nbRowSelected=parseInt($("#list").attr("p").records,10)
}else{this.nbRowSelected=0
}$(this._options.ID_PAGER_GRID+" .navtable .nav-row").html("")
},doOnPaging:function(){this._selectType="undefined";
this._sendSelectedRows();
this._resizeGrid()
},doOnLoadComplete:function(B){if($("#list").getDataIDs().length>0){$("#error").empty();
$("div[class=grid_hdiv]").show();
$("div[class=grid_bdiv]").show();
$("#pagerGrid").show();
$("#actions > div:hidden").show()
}else{$("div[class=grid_hdiv]").hide();
$("div[class=grid_bdiv]").hide();
$("#pagerGrid").hide();
$("#actions > div:hidden").hide();
if($("#error").html()==""){$("#error").empty().append(this._lang.WARNING_MESSAGE);
_this.unpopup()
}}if($("#error").html()==""){_this.popup()
}},showGroupSearchOption:function(D){var F=D.target.value;
if(F=="SEARCH_GROUP"||F=="SEARCH_PERSON_IN_A_GROUP"){EscoAnimate._showAnimate($("div[id=_idJsp1:searchGroupProperties]"));
var E=$("#idNode").html();
var F=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:E,value:F})
}else{EscoAnimate._hideAnimate($("div[id=_idJsp1:searchGroupProperties]"))
}},getIsOneRowSelected:function(){jQuery.ajaxSettings.async=false;
_this=this;
$.post("/"+Core.applicationContext+"/ajax/searchController/getIsOneRowSelectedAdditionSearch.jsf",function(B){_this._isOneItemSelected=Core.getStatus(B)
});
jQuery.ajaxSettings.async=true
},initSaveButton:function(){_this=this;
Core.addAction($("#searchSave"),Core.CLICK,function(){_this.getIsOneRowSelected();
if(_this._isOneItemSelected||$("input[id*=jqg_]:checked").size()>0){_this._selectType=undefined;
_this._sendSelectedRows();
Core.navParam=_this._coreParams;
var C=Core.getUrl();
Core.setNavParam("fromResponse","AdditionSearch");
var D=Core.getUrlParams();
Core.pullAjaxContent(C,D,"#mainContent",true,false)
}else{$("#error").empty().append(_this._lang.WARNING_ADD_MESSAGE);
_this.unpopup()
}},false)
},initActions:function(){var B=this;
Core.addAction($("#search"),Core.CLICK,function(A){B.search(A)
},false);
Core.addAction($("#searchAgain"),Core.CLICK,function(D){var A=false;
if(B.nbRowSelected==0){$(B._options.ID_PAGER_GRID+" .navtable .nav-row").html('<td style="border: medium none; padding: 0px;">&nbsp;</td><td style="cursor: pointer;" class="nav-button"><table cellspacing="0" cellpadding="0" border="0" style="margin-top:5px;"><tr><td style="color:red;">'+Lang.getString("SEARCH_ERROR_ADD")+"</td></tr></tbody></table></td>");
A=true
}else{if(B.nbRowSelected==1){$(B._options.ID_PAGER_GRID+" .navtable .nav-row").html("")
}else{try{B.getIsOneRowSelected();
if(B._isOneItemSelected||$("input[id*=jqg_]:checked").size()>0){B._selectType=undefined;
B._sendSelectedRows()
}jQuery.ajaxSettings.async=false;
B.errMember=0;
$.post("/"+Core.applicationContext+"/ajax/searchController/limitOfNumberOfMember.jsf",function(C){B.errMember=Core.getStatus(C)
});
jQuery.ajaxSettings.async=true;
A=B.errMember;
if(A){$(B._options.ID_PAGER_GRID+" .navtable .nav-row").html('<td style="border: medium none; padding: 0px;">&nbsp;</td><td style="cursor: pointer;" class="nav-button"><table cellspacing="0" cellpadding="0" border="0" style="margin-top:5px;"><tr><td style="color:red;">'+Lang.getString("SEARCH_ERROR_MAX_RESULT")+"</td></tr></tbody></table></td>")
}}catch(D){}}}if(!A){$("#actionsSearch2").css("display","none");
$.unblockUI();
B.getIsOneRowSelected();
if(B._isOneItemSelected||$("input[id*=jqg_]:checked").size()>0){B._selectType=undefined;
B._sendSelectedRows()
}else{$("#error").empty().append(B._lang.WARNING_ADD_MESSAGE);
B.unpopup()
}$("input[id=theSearchStep]").val("2");
B.search(D);
$("input[id=theDataOfTable]").val("person")
}},false);
Core.addAction($("#returnTerm"),Core.CLICK,function(A){B.unpopup();
setTimeout(function(){$("#modalSearch").css("display","none")
},50);
$("input[id=theDataOfTable]").val("person")
},false);
if($("input[id=onlyGroup]").val()!="true"){Core.addAction($("input[name=subjectSearch]"),Core.CLICK,function(A){B.showGroupSearchOption(A)
},false)
}},initReturnButton:function(){_this=this;
Core.addAction($("#searchReturn"),Core.CLICK,function(){Core.navParam=_this._coreParams;
Core.setNavParam("canClearContext","false");
Core.setNavParam("fromResponse","");
var C=Core.getUrl();
var D=Core.getUrlParams();
Core.pullAjaxContent(C,D,"#mainContent",true,false)
},false)
},popup:function(){setTimeout(function(){if($("input[id=theDataOfTable]").val()=="group"){$.blockUI({message:$("#modalSearch"),css:{cursor:"default",width:"690px",top:"20%",left:"45%","margin-left":"-250px"}});
$("#actionsSearch2").css("display","block");
$("#modalSearch").css("display","block")
}},50);
this.popupMode=true
},unpopup:function(){$("#actionsSearch2").css("display","none");
$.unblockUI();
$("input[id=theSearchStep]").val("1");
this.popupMode=false
},search:function(){_this=this;
_this.nbMember=0;
$(this._options.ID_PAGER_GRID+" .navtable .nav-row").html("");
_displayBlockUIOption={onAfterShowBlockUI:function(){Validate.addValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");
$("#modalSearch").css("display","block");
if($.validationEngine.isError){Core._hideBlockUI();
_this.unpopup();
setTimeout(function(){$("#modalSearch").css("display","none")
},50)
}else{if(!$.validationEngine.isError){Validate.removeValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");
_this._loadData();
if($("input[name=subjectSearch]:checked").val()=="SEARCH_PERSON_IN_A_GROUP"){$("#modalSearch").css("display","block");
if($("input[id=theSearchStep]").val()=="1"){$("input[id=theDataOfTable]").val("group");
if($("#error").html()==""){_this.popup()
}}else{_this.unpopup()
}}}}}};
Core._showBlockUI(_displayBlockUIOption)
}});
var AdditionSearch=new DUI.Class(AdditionSearchPrototype,$.screen);