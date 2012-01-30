var tree=null;
var tree_context={items:{create:false,rename:false,remove:false}};
var stackOfNodesToOpen=new Array();
var nodeToSelect=null;
var needNodeSelection=false;
var displayContent=true;
var callDone=new Array();
var WelcomeBase={_options:{buttonBarHidden:false,buttonBarPresent:false,generalMenuAction:[]},outerLayout:null,init:function(B){_options=$.extend({},{rootName:"Root"},B||{})
},fire:function(){_options=$.extend({},{rootName:"Root"},{rootName:Lang.getString("WELCOME.ROOTNAME"),loading:Lang.getString("WELCOME.LOADING")});
this.initTree();
this.initLayer();
jQuery.each(this._options.generalMenuAction,function(C,D){D.call()
});
$(".ui-icon-search").parent().attr("title",Lang.getString("SEARCH_MENU_TITLE"));
$(".ui-icon-home").parent().attr("title",Lang.getString("HOME_MENU_TITLE"))
},initLayer:function(){var D=21;
if(!Profile.canDisplayNavigationArea()){D=0
}var E={name:"outerLayout",defaults:{size:"auto",minSize:15,paneClass:"pane",resizerClass:"resizer",togglerClass:"toggler",buttonClass:"button",contentSelector:".content",contentIgnoreSelector:"span",togglerLength_open:35,togglerLength_closed:35,hideTogglerOnSlide:true,togglerTip_open:Lang.getString("CLOSE_PAN"),togglerTip_closed:Lang.getString("OPEN_PAN"),resizerTip:Lang.getString("RESIZE_PAN"),sliderTip:Lang.getString("OPEN_MENU_PAN"),fxName:"slide",fxSpeed_open:750,fxSpeed_close:1500,fxSettings_open:{easing:"easeInQuint"},fxSettings_close:{easing:"easeOutQuint"}},north:{spacing_open:1,togglerLength_open:0,togglerLength_closed:-1,resizable:false,slidable:false,initHidden:!Banner.isDisplayed(),fxName:"none",togglerTip_open:Lang.getString("CLOSE_PAN"),togglerTip_closed:Lang.getString("OPEN_PAN"),resizerTip:Lang.getString("RESIZE_PAN"),sliderTip:Lang.getString("OPEN_MENU_PAN")},south:{closable:false,resizable:true,slidable:false,height:15,spacing_open:0,togglerTip_open:Lang.getString("CLOSE_PAN"),togglerTip_closed:Lang.getString("OPEN_PAN"),resizerTip:Lang.getString("RESIZE_PAN"),sliderTip:Lang.getString("OPEN_MENU_PAN")},west:{size:250,spacing_closed:D,togglerLength_closed:21,togglerAlign_closed:"top",togglerLength_open:0,togglerTip_open:Lang.getString("CLOSE_PAN"),togglerTip_closed:Lang.getString("OPEN_PAN"),resizerTip_open:Lang.getString("RESIZE_PAN"),sliderTip:Lang.getString("OPEN_PAN"),slideTrigger_open:"click",initClosed:!Profile.canDisplayNavigationArea(),fxSettings_open:{easing:"easeOutBounce"}},center:{paneSelector:"#mainContent",onresize:function(){$("#escoPanels > .ui-tabs-panel").each(function(){isBreadCrumb=$("div#breadCrumb:not(#escoPanels #breadCrumb)").size()>0;
isBarHidden=welcome._options.buttonBarHidden;
isBarPresent=welcome._options.buttonBarPresent;
heightBreadCrumb=(isBreadCrumb)?155:65;
heightBarHidden=(isBarHidden)?35:0;
heightBarPresent=(isBarPresent&&!isBreadCrumb)?35:0;
newHeight=heightBreadCrumb+heightBarPresent-heightBarHidden;
$(this).css("height",welcome.outerLayout.panes.center.height()-newHeight);
$("#breadCrumb").hide().show()
})
}}};
this.outerLayout=$(".flora").layout(E);
var F=".flora > .ui-layout-west";
$("<span></span>").attr("id","west-closer").prependTo(F);
this.outerLayout.addCloseBtn("#west-closer","west");
$("#west-closer").attr("title",Lang.getString("CLOSE_PAN"));
setTimeout("Core._hideBlockUI()",1200)
},hide:function(D){try{this.outerLayout.hide(D)
}catch(C){}},show:function(D){try{this.outerLayout.show(D)
}catch(C){}},resizeAll:function(){this.outerLayout.resizeAll()
},fireButtonBar:function(){var B=this;
B._options.buttonBarPresent=$("#buttonBar").size()>0;
if(B._options.buttonBarPresent){isClosed=$("#buttonBarAction").hasClass("buttonBarClose");
B._options.buttonBarHidden=false||isClosed;
$("#buttonBarAction").unbind("click").bind("click",function(){$("li[id=:] > a").focus();
isClosed=$("#buttonBarAction").hasClass("buttonBarClose");
if(isClosed){$("#actions").height("30px");
$("#actions").css("display","block");
jQuery("#actions").css("visibility","visible");
B._options.buttonBarHidden=false;
$("#buttonBarAction").css("padding-bottom","0px");
$("#buttonBarAction").toggleClass("buttonBarClose").toggleClass("buttonBarOpen")
}else{$("#actions").height("0px");
$("#actions").css("display","none");
jQuery("#actions").css("visibility","hidden");
B._options.buttonBarHidden=true;
$("#buttonBarAction").css("padding-bottom","10px");
$("#buttonBarAction").toggleClass("buttonBarClose").toggleClass("buttonBarOpen")
}welcome.resizeAll()
})
}},initTree:function(){Core.log("Initialising tree ... ");
jQuery.ajaxSettings.async=false;
Core.log("Call context menu ");
$.post("/"+Core.applicationContext+"/ajax/json/treeController/getContextMenu.jsf",function(data){json={};
eval("json="+data);
Core.log("processing context menu data ... ");
jQuery.each(json.elements,function(index,element){var newItem=new Array();
eval("var fVisible = "+element.visible);
element.visible=fVisible;
eval("var fAction = "+element.action);
element.action=fAction;
newItem[element.id]=element;
$.extend(tree_context.items,newItem)
})
});
jQuery.ajaxSettings.async=true;
Core.log("Call create tree ");
tree=$.tree.create();
var stat=[{attributes:{id:":",displayName:"Root",name:":",typeNode:"ROOT",right:["ALL"]},state:"closed",data:{title:_options.rootName,icon:"/"+Core.applicationContext+"/media/imgs/tree/dossier_dossier.gif"}}];
tree.init($("#arbo"),{data:{type:"json",async:true,opts:{method:"POST",url:"/"+Core.applicationContext+"/ajax/json/treeController/getNodeElementsForm.jsf"}},ui:{theme_name:"classic"},plugins:{hotkeys:{},contextmenu:$.extend({},tree_context)},lang:{loading:_options.loading},rules:{use_max_children:false,use_max_depth:false},types:{"default":{clickable:true,deletable:true,draggable:function(NODE,TREEOBJ){if($(NODE).attr("typeNode")=="GROUP"&&$(NODE).attr("right")=="admin"){return true
}else{return false
}}}},callback:{beforemove:function(NODE,REF_NODE,TYPE,TREE_OBJ){DragAndDrop.moveElement(NODE,REF_NODE,TYPE,TREE_OBJ)
},onhover:function(NODE,TREE_OBJ){if(MoveGroup._isInDragMode){obj=$(NODE);
var off_t=obj.offset().top;
var beg_t=$(".content").offset().top;
var end_t=beg_t+$(".content").height();
var h_cor=($(".content").get(0).scrollWidth>$(".content").width())?40:20;
if(off_t+5<beg_t){$(".content").scrollTop($(".content").scrollTop()-(beg_t-off_t+5))
}if(off_t+h_cor>end_t){$(".content").scrollTop($(".content").scrollTop()+(off_t+h_cor-end_t))
}if($(NODE).attr("typeNode")=="FOLDER"){if(MoveGroup._previousNode!=null){if($.browser.msie){$(MoveGroup._previousNode).children("a").css("opacity","1")
}else{$(MoveGroup._previousNode).children("a").css("cursor","pointer")
}}MoveGroup._previousNode=$(NODE);
if($(NODE).attr("right")=="GROUP"||$(NODE).attr("right")=="ALL"){if($.browser.msie){$(NODE).children("a").css("opacity","1")
}else{$(NODE).children("a").css("cursor","default")
}}else{if($.browser.msie){$(NODE).children("a").css("opacity","0.5")
}else{$(NODE).children("a").css("cursor","no-drop")
}}}else{if(MoveGroup._previousNode!=null){if($.browser.msie){$(MoveGroup._previousNode).children("a").css("opacity","1")
}else{$(MoveGroup._previousNode).children("a").css("cursor","pointer")
}}MoveGroup._previousNode=$(NODE);
if($.browser.msie){$(NODE).children("a").css("opacity","0.5")
}else{$(NODE).children("a").css("cursor","no-drop")
}}}else{if(MoveStem._isInDragMode){obj=$(NODE);
var off_t=obj.offset().top;
var beg_t=$(".content").offset().top;
var end_t=beg_t+$(".content").height();
var h_cor=($(".content").get(0).scrollWidth>$(".content").width())?40:20;
if(off_t+5<beg_t){$(".content").scrollTop($(".content").scrollTop()-(beg_t-off_t+5))
}if(off_t+h_cor>end_t){$(".content").scrollTop($(".content").scrollTop()+(off_t+h_cor-end_t))
}if($(NODE).attr("typeNode")=="FOLDER"){if(MoveStem._previousNode!=null){if($.browser.msie){$(MoveStem._previousNode).children("a").css("opacity","1")
}else{$(MoveStem._previousNode).children("a").css("cursor","pointer")
}}MoveStem._previousNode=$(NODE);
if($.browser.msie){$(NODE).children("a").css("opacity","1")
}else{$(NODE).children("a").css("cursor","default")
}}else{if(MoveStem._previousNode!=null){if($.browser.msie){$(MoveStem._previousNode).children("a").css("opacity","1")
}else{$(MoveStem._previousNode).children("a").css("cursor","pointer")
}}MoveStem._previousNode=$(NODE);
if($.browser.msie){$(NODE).children("a").css("opacity","0.5")
}else{$(NODE).children("a").css("cursor","no-drop")
}}}else{if($(NODE).attr("typeNode")=="FOLDER"){MoveStem._nodeHovered=$(NODE);
MoveGroup._nodeHovered=null
}else{if($(NODE).attr("typeNode")=="GROUP"){MoveStem._nodeHovered=null;
MoveGroup._nodeHovered=$(NODE)
}}}}},beforedata:function(n,t){if(n==false){t.settings.data.opts["static"]=stat
}else{t.settings.data.opts["static"]=false;
return{theIdOfNodeRequest:$(n).attr("name")}
}},ondata:function(DATA,TREE_OBJ){if(DATA.elements!=undefined){return DATA.elements
}else{return DATA
}},beforechange:function(NODE,TREE_OBJ){tree.deselect_branch($(".clicked"))
},onopen:function(NODE,TREE_OBJ){if(nodeToSelect!=undefined&&nodeToSelect!=null){tree.select_branch($("#"+nodeToSelect));
nodeToSelect=null
}TreePlugin.addTitleToIcon()
},onselect:function(NODE,TREE_OBJ){if($(NODE).attr("typeNode")!="ROOT"){if(displayContent){Core.resetNavParams();
if($(NODE).attr("typeNode")=="GROUP"){if(Profile.canAccessToGroupProperties()){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupProperties.jsf",{groupUuid:$(NODE).attr("ID"),from:"treeNavigate"},"#mainContent",true,true)
}else{Core.goToIndexPage()
}}else{if(Profile.canAccessToStemProperties()){$.post("/"+Core.applicationContext+"/ajax/stemController/isModifiedStems.jsf",json,function(data){});
Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemProperties/stemProperties.jsf",{stemUuid:$(NODE).attr("ID"),from:"treeNavigate"},"#mainContent",true,true)
}else{Core.goToIndexPage()
}}}else{displayContent=true
}}else{displayContent=true
}}}});
Core.log("End initialising tree.");
tree.open_branch($("li[typeNode=ROOT]"));
tree.select_branch($("li[typeNode=ROOT]"))
}};
var Welcome=new DUI.Class(WelcomeBase,$.screen);
WelcomeBase._options.generalMenuAction.push(function(){Core.addAction($(".ui-icon-search").parent(),Core.CLICK,function(){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/search/simpleSearch.jsf",{idNode:"Root",nameIdNode:":"},"#mainContent",true,true)
})
});
WelcomeBase._options.generalMenuAction.push(function(){Core.addAction($(".ui-icon-home").parent(),Core.CLICK,function(){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/personProperties.jsf",{},"#mainContent",true,false)
})
});