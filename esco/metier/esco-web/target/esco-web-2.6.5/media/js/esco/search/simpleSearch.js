var SimpleSearchPrototype=$.extend(true,{},EscoGrid,{doOnFire:function(){EscoAnimate._hideAnimate($("div[id=searchGroupProperties]"));
var A=this;
Core.addAction($("#search"),Core.CLICK,function(B){A.search(B)
},false);
Core.addAction($("input[name=subjectSearch]"),Core.CLICK,function(B){A.showGroupSearchOption(B)
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
}},addActionOnClickLinkItemPerson:function(A){if(Profile.canAccessToPersonProperties()){Core.addAction($(A),Core.CLICK,function(B){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{idPerson:B.target.id,needClear:"true"},"#mainContent",true,false)
},false)
}else{$(A).removeClass("tableLink")
}},addActionOnClickLinkItemGroup:function(A){if(Profile.canAccessToGroupProperties()){Core.addAction($(A),Core.CLICK,function(B){Core.log("Preparate open of node + "+B.target.id);
_displayBlockUIOption={onAfterShowBlockUI:function(){Core.log("Preparate open of node + "+$("#"+B.target.id).attr("id"));
TreePlugin.openAndSelectNode(B.target.id)
}};
Core._showBlockUI(_displayBlockUIOption)
},false)
}else{$(A).removeClass("tableLink")
}},getPostDataToFindDataRequest:function(){var A={theTerm:$("input[id=theTerm]").val(),theSearchSource:$("input[name=subjectSearch]:checked").val(),theSearchType:"SimpleSearch"};
if($("input[name=subjectSearch]:checked").val()=="SEARCH_GROUP"){$.extend(A,{theSearchPath:$("input[id=searchPathHidden]").val(),theDisplayTerm:$("input[name=displayGroupSearch]:checked").val()})
}else{$.extend(A,{theSearchPath:$("input[id=searchPathHiddenForPersonSearch]").val(),theDisplayTerm:"none"})
}return A
},showGroupSearchOption:function(A){var B=A.target.value;
if(B=="SEARCH_GROUP"){EscoAnimate._showAnimate($("div[id=searchGroupProperties]"));
var C=$("#idNode").html();
var B=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:C,value:B})
}else{EscoAnimate._hideAnimate($("div[id=searchGroupProperties]"))
}},search:function(){var A=this;
_displayBlockUIOption={onAfterShowBlockUI:function(){Validate.addValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");
if($.validationEngine.isError){Core._hideBlockUI()
}else{if(!$.validationEngine.isError){Validate.removeValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");
A._loadData()
}}}};
Core._showBlockUI(_displayBlockUIOption)
}});
var SimpleSearch=new DUI.Class(SimpleSearchPrototype,$.screen);