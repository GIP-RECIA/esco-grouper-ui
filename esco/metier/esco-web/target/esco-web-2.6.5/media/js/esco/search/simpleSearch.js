var SimpleSearchPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){EscoAnimate._hideAnimate($("div[id=searchGroupProperties]"));
var B=this;
Core.addAction($("#search"),Core.CLICK,function(A){B.search(A)
},false);
Core.addAction($("input[name=subjectSearch]"),Core.CLICK,function(A){B.showGroupSearchOption(A)
},false);
fluid.accessibletabs("escoTabs","escoPanels");
return false
},doOnLoadComplete:function(){if($("#list").getDataIDs().length>0){$("#error").empty();
$("div[class=grid_hdiv]").show();
$("div[class=grid_bdiv]").show();
$("#pagerGrid").show()
}else{$("div[class=grid_hdiv]").hide();
$("div[class=grid_bdiv]").hide();
$("#pagerGrid").hide();
$("#error").empty().append(this._lang.WARNING_MESSAGE)
}},addActionOnClickLinkItemPerson:function(B){if(Profile.canAccessToPersonProperties()){Core.addAction($(B),Core.CLICK,function(A){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{idPerson:A.target.id,needClear:"true"},"#mainContent",true,false)
},false)
}else{$(B).removeClass("tableLink")
}},addActionOnClickLinkItemGroup:function(B){if(Profile.canAccessToGroupProperties()){Core.addAction($(B),Core.CLICK,function(A){Core.log("Preparate open of node + "+A.target.id);
_displayBlockUIOption={onAfterShowBlockUI:function(){Core.log("Preparate open of node + "+$("#"+A.target.id).attr("id"));
TreePlugin.openAndSelectNode(A.target.id)
}};
Core._showBlockUI(_displayBlockUIOption)
},false)
}else{$(B).removeClass("tableLink")
}},getPostDataToFindDataRequest:function(){var B={theTerm:$("input[id=theTerm]").val(),theSearchSource:$("input[name=subjectSearch]:checked").val(),theSearchType:"SimpleSearch"};
if($("input[name=subjectSearch]:checked").val()=="SEARCH_GROUP"){$.extend(B,{theSearchPath:$("input[id=searchPathHidden]").val(),theDisplayTerm:$("input[name=displayGroupSearch]:checked").val()})
}else{$.extend(B,{theSearchPath:$("input[id=searchPathHiddenForPersonSearch]").val(),theDisplayTerm:"none"})
}return B
},showGroupSearchOption:function(D){var F=D.target.value;
if(F=="SEARCH_GROUP"){EscoAnimate._showAnimate($("div[id=searchGroupProperties]"));
var E=$("#idNode").html();
var F=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:E,value:F})
}else{EscoAnimate._hideAnimate($("div[id=searchGroupProperties]"))
}},search:function(){var B=this;
_displayBlockUIOption={onAfterShowBlockUI:function(){Validate.addValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");
if($.validationEngine.isError){Core._hideBlockUI()
}else{if(!$.validationEngine.isError){Validate.removeValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");
B._loadData()
}}}};
Core._showBlockUI(_displayBlockUIOption)
}});
var SimpleSearch=new DUI.Class(SimpleSearchPrototype,$.screen);