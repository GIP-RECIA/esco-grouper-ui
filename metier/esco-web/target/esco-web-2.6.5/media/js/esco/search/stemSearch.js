var StemSearchPrototype=$.extend(true,{},EscoGrid,{_isOneItemSelected:false,_coreParams:null,doOnFire:function(){var D=$("#idNode").html();
var C=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:D,value:C});
this.initSaveButton();
this.initReturnButton();
this.initActions();
fluid.accessibletabs("escoTabs","escoPanels");
if($("input[id=theTerm]").val()!=""){this._doneLoadData(true)
}else{Core._hideBlockUI()
}this._coreParams=Core.navParam;
Core.resetNavParams();
return false
},getPostDataToFindDataRequest:function(){var B={theTerm:$("input[id=theTerm]").val(),theSearchSource:$("input[name=subjectSearch]:checked").val(),theSearchType:"StemSearch"};
$.extend(B,{theSearchPath:$("input[id=searchPathHidden]").val(),theDisplayTerm:$("input[name=displayStemSearch]:checked").val()});
return B
},doSelectRow:function(D,C){if(C==false){$("input[id=cb_jqg]").attr("checked",false);
this.nbRowSelected--
}else{this.nbRowSelected++
}},doOnPaging:function(){this._selectType="undefined";
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
$("#error").empty().append(this._lang.WARNING_MESSAGE)
}},getIsOneRowSelected:function(){jQuery.ajaxSettings.async=false;
_this=this;
$.post("/"+Core.applicationContext+"/ajax/stemSearchController/getIsOneRowSelectedStemSearch.jsf",function(B){_this._isOneItemSelected=Core.getStatus(B)
});
jQuery.ajaxSettings.async=true
},initSaveButton:function(){_this=this;
Core.addAction($("#searchSave"),Core.CLICK,function(){_this.getIsOneRowSelected();
if(_this._isOneItemSelected||$("input[id*=jqg_]:checked").size()>0){_this._sendSelectedRows();
Core.navParam=_this._coreParams;
var C=Core.getUrl();
Core.setNavParam("fromResponse","StemSearch");
Core.setNavParam("thePrivilegesType","FOLDER");
var D=Core.getUrlParams();
Core.pullAjaxContent(C,D,"#mainContent",true,false)
}else{$("#error").empty().append(_this._lang.WARNING_ADD_MESSAGE)
}},false)
},initActions:function(){var B=this;
Core.addAction($("#search"),Core.CLICK,function(A){B.search(A)
},false);
Core.addAction($("input[name=subjectSearch]"),Core.CLICK,function(A){B.showGroupSearchOption(A)
},false)
},initReturnButton:function(){_this=this;
Core.addAction($("#searchReturn"),Core.CLICK,function(){Core.navParam=_this._coreParams;
Core.setNavParam("canClearContext","false");
Core.setNavParam("thePrivilegesType","FOLDER");
Core.setNavParam("fromResponse","");
var C=Core.getUrl();
var D=Core.getUrlParams();
Core.pullAjaxContent(C,D,"#mainContent",true,false)
},false)
},search:function(){_this=this;
_displayBlockUIOption={onAfterShowBlockUI:function(){Validate.addValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");
if($.validationEngine.isError){Core._hideBlockUI()
}else{if(!$.validationEngine.isError){Validate.removeValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");
_this._loadData()
}}}};
Core._showBlockUI(_displayBlockUIOption)
}});
var StemSearch=new DUI.Class(StemSearchPrototype,$.screen);