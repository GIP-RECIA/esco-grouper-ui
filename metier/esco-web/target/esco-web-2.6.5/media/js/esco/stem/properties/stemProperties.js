var StemProperties=new DUI.Class({_options:{},init:function(B){_options=$.extend({},{},B||{})
},fire:function(){this.initTab();
this.initAction();
this.initBreadCrumb()
},initBreadCrumb:function(){var B=$("#searchPathHidden").attr("value");
new EscoBreadCrumb({path:B})
},initTab:function(){fluid.accessibletabs("escoTabs","escoPanels")
},initAction:function(){Core.addAction($("#stemManage"),Core.CLICK,function(B){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemModifications.jsf",{from:"treeNavigate",stemUuid:$("input[id=stemUuid]").val(),creation:"false"},"#mainContent",true)
},false);
Core.addAction($("#stemCreateStem"),Core.CLICK,function(B){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/stemModifications.jsf",{from:"treeNavigate",stemUuid:$("input[id=stemUuid]").val(),creation:"true"},"#mainContent",true)
},false);
Core.addAction($("#stemCreateGroup"),Core.CLICK,function(B){Core.pullAjaxContent("/"+Core.applicationContext+"/stylesheets/groupModifications/groupModificationsAttributes.jsf",{from:"treeNavigate",stemUuid:$("input[id=stemUuid]").val(),creation:"true"},"#mainContent",true)
},false);
Core.addAction($("#stemDelete"),Core.CLICK,function(D){var C=true;
$.post("/"+Core.applicationContext+"/stylesheets/stemProperties/modalDeleteStem.jsf",{stemUuid:$("#groupUuid"),needToRedirect:C},function(A){Core.isInBlockUiMode=true;
$("#modalDelete").empty().append(A);
$.blockUI({message:$("#modalDelete"),css:{cursor:"default",width:"500px",top:"30%",left:"50%","margin-left":"-250px"}})
})
},false)
}},$.screen);