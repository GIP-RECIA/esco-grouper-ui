var HotKeyPress={focusTree:0,thePervKey:null,theLastKey:null,getItemMenuTrigger:function(C){var D=null;
if($("a[class=hover]").html()!=null){D=$("a[class=hover]")
}else{D=$("a[class*=clicked]")
}switch(C){case"properties":if(Profile.canDisplayNavigationArea()){if(TreeMenu.propertiesIsVisible(D.parent("li"),null)){TreeMenu.propertiesAction(D.parent("li"),null)
}}break;
case"search":if(Profile.canDisplayNavigationArea()){if(TreeMenu.searchIsVisible(D.parent("li"),null)){TreeMenu.searchAction(D.parent("li"),null)
}}break;
case"delete":if(TreeMenu.deleteIsVisible(D.parent("li"),null)){TreeMenu.deleteAction(D.parent("li"),null)
}break;
case"createFolder":if(TreeMenu.createFolderIsVisible(D.parent("li"),null)){TreeMenu.createFolderAction(D.parent("li"),null)
}break;
case"createGroup":if(TreeMenu.createGroupIsVisible(D.parent("li"),null)){TreeMenu.createGroupAction(D.parent("li"),null)
}break;
case"cutGroup":if(Profile.canDisplayNavigationArea()){if(TreeMenu.cutGroupIsVisible(D.parent("li"),null)){TreeMenu.cutGroupAction(D.parent("li"),null)
}}break;
case"pasteGroup":if(Profile.canDisplayNavigationArea()){if(TreeMenu.pasteGroupIsVisible(D.parent("li"),null)){TreeMenu.pasteGroupAction(D.parent("li"),null)
}}break;
case"pasteMembers":if(Profile.canDisplayNavigationArea()){if(TreeMenu.pasteMembersIsVisible(D.parent("li"),null)){TreeMenu.pasteMembersAction(D.parent("li"),null)
}}break;
case"copyMembers":if(Profile.canDisplayNavigationArea()){if(TreeMenu.copyMembersIsVisible(D.parent("li"),null)){TreeMenu.copyMembersAction(D.parent("li"),null)
}}break;
case"manage":if(TreeMenu.manageIsVisible(D.parent("li"),null)){TreeMenu.manageAction(D.parent("li"),null)
}break;
case"subscribe":if(Profile.canDisplayNavigationArea()){if(TreeMenu.subscribeIsVisible(D.parent("li"),null)){TreeMenu.subscribeAction(D.parent("li"),null)
}}break;
case"unSubscribe":if(Profile.canDisplayNavigationArea()){if(TreeMenu.unSubscribeIsVisible(D.parent("li"),null)){TreeMenu.unSubscribeAction(D.parent("li"),null)
}}break
}}};
$(document).bind(Core.KEYDOWN,function(D){if(!Core.isInBlockUiMode){if(D.which==36){if(HotKeyPress.theLastKey==16){$("input[id=jqg_1]:visible").focus()
}else{$("#escoPanels").find("#first").click()
}HotKeyPress.theLastKey=D.which;
return false
}else{if(D.which==35){$("#escoPanels").find("#last").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if(D.which==34){$("#escoPanels").find("#next").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if(D.which==33){$("#escoPanels").find("#prev").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==73){$("table[typeAction=add]:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==68){$("table[typeAction=del]:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==72){if($("#onlineHelp").css("visibility")=="hidden"){if($("#onlineHelpMain").html()!=null){$("iframe").attr("src",Lang.getString($("#onlineHelpMain").attr("name")))
}else{$("iframe").attr("src",Lang.getString("ONLINE_HELP_INDEX_URL"))
}$(".containerPlus").mb_open().css("visibility","visible")
}else{$(".containerPlus").mb_close()
}HotKeyPress.theLastKey=D.which;
return false
}else{if(D.which==113){if(Profile.canDisplayNavigationArea()&&HotKeyPress.focusTree%2==1){if($("a[class=hover]").html()!=null){$("a[class=hover]").focus()
}else{$("a[class*=clicked]").focus()
}}else{$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus().focus()
}HotKeyPress.focusTree++;
HotKeyPress.theLastKey=D.which;
return false
}else{if(D.which==114){if(Profile.canDisplayNavigationArea()){HotKeyPress.getItemMenuTrigger("search")
}HotKeyPress.theLastKey=D.which;
return false
}else{if(D.which==115){if(Profile.canDisplayNavigationArea()){$(".ui-icon-home").click()
}HotKeyPress.theLastKey=D.which;
return false
}else{if(D.which==27){if(Profile.canDisplayNavigationArea()){$("#jstree-contextmenu").hide()
}HotKeyPress.theLastKey=D.which;
return false
}else{if(D.which==46){HotKeyPress.getItemMenuTrigger("delete");
HotKeyPress.theLastKey=D.which;
return false
}else{if(D.which==89){if($("#change_yes:visible").html()!=null){$("#change_yes:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if($("#modalYes:visible").html()!=null){$("#modalYes:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}}}else{if(D.which==78){if($("#change_no:visible").html()!=null){$("#change_no:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if($("#modalNo:visible").html()!=null){$("#modalNo:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}}}else{if(D.which==67){if($("#change_cancel:visible").html()!=null){$("#change_cancel:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}}else{if(HotKeyPress.theLastKey==16&&D.which==77){if(Profile.canDisplayNavigationArea()){var C=null;
if($("a[class=hover]").html()!=null){C=$("a[class=hover]")
}else{C=$("a[class=clicked]")
}C.trigger("contextmenu")
}HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==80){HotKeyPress.getItemMenuTrigger("properties");
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==65){HotKeyPress.getItemMenuTrigger("manage");
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==84){$("#testLdapRequest").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==69){$("#search").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==70){HotKeyPress.getItemMenuTrigger("createFolder");
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==71){HotKeyPress.getItemMenuTrigger("createGroup");
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==76){if($("#isServlet").val()=="true"){window.location=$("a[name=disconnectEscoGrouper]").attr("href")
}return false
}else{if(HotKeyPress.theLastKey==16&&D.which==88){HotKeyPress.getItemMenuTrigger("cutGroup");
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==86){if(CopyMembers._isGroupMembersCut==true){HotKeyPress.getItemMenuTrigger("pasteMembers")
}else{HotKeyPress.getItemMenuTrigger("pasteGroup")
}HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==83){var C=$("a[id*=Save]");
if(C.parent().css("display")!="none"){C.click()
}HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==90){var C=$("a[id*=Cancel]");
if(C.html()!=null){if(C.parent().css("display")!="none"){C.click()
}}else{C=$("a[id*=Return]");
if(C.html()!=null){C.click()
}}HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==67){HotKeyPress.getItemMenuTrigger("copyMembers");
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==74){HotKeyPress.getItemMenuTrigger("subscribe");
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which==81){HotKeyPress.getItemMenuTrigger("unSubscribe");
HotKeyPress.theLastKey=D.which;
return false
}else{if(HotKeyPress.theLastKey==16&&D.which>48&&D.which<=57){$("#escoPanels").tabs("select",D.which-49);
HotKeyPress.theLastKey=D.which;
return false
}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}else{if(HotKeyPress.theLastKey==16&&D.which==90){var C=$("a[id*=Return]");
if(C.html()!=null){C.click()
}}else{if(D.which==89){if($("#change_yes:visible").html()!=null){$("#change_yes:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if($("#modalYes:visible").html()!=null){$("#modalYes:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}}}else{if(D.which==78){if($("#change_no:visible").html()!=null){$("#change_no:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}else{if($("#modalNo:visible").html()!=null){$("#modalNo:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}}}else{if(D.which==67){if($("#change_cancel:visible").html()!=null){$("#change_cancel:visible").click();
HotKeyPress.theLastKey=D.which;
return false
}}}}}}HotKeyPress.theLastKey=D.which
});