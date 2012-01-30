var HotKeyPress={focusTree:0,thePervKey:null,theLastKey:null,getItemMenuTrigger:function(A){var B=null;
if($("a[class=hover]").html()!=null){B=$("a[class=hover]")
}else{B=$("a[class*=clicked]")
}switch(A){case"properties":if(Profile.canDisplayNavigationArea()){if(TreeMenu.propertiesIsVisible(B.parent("li"),null)){TreeMenu.propertiesAction(B.parent("li"),null)
}}break;
case"search":if(Profile.canDisplayNavigationArea()){if(TreeMenu.searchIsVisible(B.parent("li"),null)){TreeMenu.searchAction(B.parent("li"),null)
}}break;
case"delete":if(TreeMenu.deleteIsVisible(B.parent("li"),null)){TreeMenu.deleteAction(B.parent("li"),null)
}break;
case"createFolder":if(TreeMenu.createFolderIsVisible(B.parent("li"),null)){TreeMenu.createFolderAction(B.parent("li"),null)
}break;
case"createGroup":if(TreeMenu.createGroupIsVisible(B.parent("li"),null)){TreeMenu.createGroupAction(B.parent("li"),null)
}break;
case"cutGroup":if(Profile.canDisplayNavigationArea()){if(TreeMenu.cutGroupIsVisible(B.parent("li"),null)){TreeMenu.cutGroupAction(B.parent("li"),null)
}}break;
case"pasteGroup":if(Profile.canDisplayNavigationArea()){if(TreeMenu.pasteGroupIsVisible(B.parent("li"),null)){TreeMenu.pasteGroupAction(B.parent("li"),null)
}}break;
case"pasteMembers":if(Profile.canDisplayNavigationArea()){if(TreeMenu.pasteMembersIsVisible(B.parent("li"),null)){TreeMenu.pasteMembersAction(B.parent("li"),null)
}}break;
case"copyMembers":if(Profile.canDisplayNavigationArea()){if(TreeMenu.copyMembersIsVisible(B.parent("li"),null)){TreeMenu.copyMembersAction(B.parent("li"),null)
}}break;
case"manage":if(TreeMenu.manageIsVisible(B.parent("li"),null)){TreeMenu.manageAction(B.parent("li"),null)
}break;
case"subscribe":if(Profile.canDisplayNavigationArea()){if(TreeMenu.subscribeIsVisible(B.parent("li"),null)){TreeMenu.subscribeAction(B.parent("li"),null)
}}break;
case"unSubscribe":if(Profile.canDisplayNavigationArea()){if(TreeMenu.unSubscribeIsVisible(B.parent("li"),null)){TreeMenu.unSubscribeAction(B.parent("li"),null)
}}break
}}};
$(document).bind(Core.KEYDOWN,function(B){if(!Core.isInBlockUiMode){if(B.which==36){if(HotKeyPress.theLastKey==16){$("input[id=jqg_1]:visible").focus()
}else{$("#escoPanels").find("#first").click()
}HotKeyPress.theLastKey=B.which;
return false
}else{if(B.which==35){$("#escoPanels").find("#last").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if(B.which==34){$("#escoPanels").find("#next").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if(B.which==33){$("#escoPanels").find("#prev").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==73){$("table[typeAction=add]:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==68){$("table[typeAction=del]:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==72){if($("#onlineHelp").css("visibility")=="hidden"){if($("#onlineHelpMain").html()!=null){$("iframe").attr("src",Lang.getString($("#onlineHelpMain").attr("name")))
}else{$("iframe").attr("src",Lang.getString("ONLINE_HELP_INDEX_URL"))
}$(".containerPlus").mb_open().css("visibility","visible")
}else{$(".containerPlus").mb_close()
}HotKeyPress.theLastKey=B.which;
return false
}else{if(B.which==113){if(Profile.canDisplayNavigationArea()&&HotKeyPress.focusTree%2==1){if($("a[class=hover]").html()!=null){$("a[class=hover]").focus()
}else{$("a[class*=clicked]").focus()
}}else{$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus().focus()
}HotKeyPress.focusTree++;
HotKeyPress.theLastKey=B.which;
return false
}else{if(B.which==114){if(Profile.canDisplayNavigationArea()){HotKeyPress.getItemMenuTrigger("search")
}HotKeyPress.theLastKey=B.which;
return false
}else{if(B.which==115){if(Profile.canDisplayNavigationArea()){$(".ui-icon-home").click()
}HotKeyPress.theLastKey=B.which;
return false
}else{if(B.which==27){if(Profile.canDisplayNavigationArea()){$("#jstree-contextmenu").hide()
}HotKeyPress.theLastKey=B.which;
return false
}else{if(B.which==46){HotKeyPress.getItemMenuTrigger("delete");
HotKeyPress.theLastKey=B.which;
return false
}else{if(B.which==89){if($("#change_yes:visible").html()!=null){$("#change_yes:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if($("#modalYes:visible").html()!=null){$("#modalYes:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}}}else{if(B.which==78){if($("#change_no:visible").html()!=null){$("#change_no:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if($("#modalNo:visible").html()!=null){$("#modalNo:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}}}else{if(B.which==67){if($("#change_cancel:visible").html()!=null){$("#change_cancel:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}}else{if(HotKeyPress.theLastKey==16&&B.which==77){if(Profile.canDisplayNavigationArea()){var A=null;
if($("a[class=hover]").html()!=null){A=$("a[class=hover]")
}else{A=$("a[class=clicked]")
}A.trigger("contextmenu")
}HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==80){HotKeyPress.getItemMenuTrigger("properties");
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==65){HotKeyPress.getItemMenuTrigger("manage");
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==84){$("#testLdapRequest").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==69){$("#search").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==70){HotKeyPress.getItemMenuTrigger("createFolder");
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==71){HotKeyPress.getItemMenuTrigger("createGroup");
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==76){if($("#isServlet").val()=="true"){window.location=$("a[name=disconnectEscoGrouper]").attr("href")
}return false
}else{if(HotKeyPress.theLastKey==16&&B.which==88){HotKeyPress.getItemMenuTrigger("cutGroup");
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==86){if(CopyMembers._isGroupMembersCut==true){HotKeyPress.getItemMenuTrigger("pasteMembers")
}else{HotKeyPress.getItemMenuTrigger("pasteGroup")
}HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==83){var A=$("a[id*=Save]");
if(A.parent().css("display")!="none"){A.click()
}HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==90){var A=$("a[id*=Cancel]");
if(A.html()!=null){if(A.parent().css("display")!="none"){A.click()
}}else{A=$("a[id*=Return]");
if(A.html()!=null){A.click()
}}HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==67){HotKeyPress.getItemMenuTrigger("copyMembers");
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==74){HotKeyPress.getItemMenuTrigger("subscribe");
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which==81){HotKeyPress.getItemMenuTrigger("unSubscribe");
HotKeyPress.theLastKey=B.which;
return false
}else{if(HotKeyPress.theLastKey==16&&B.which>48&&B.which<=57){$("#escoPanels").tabs("select",B.which-49);
HotKeyPress.theLastKey=B.which;
return false
}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}else{if(HotKeyPress.theLastKey==16&&B.which==90){var A=$("a[id*=Return]");
if(A.html()!=null){A.click()
}}else{if(B.which==89){if($("#change_yes:visible").html()!=null){$("#change_yes:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if($("#modalYes:visible").html()!=null){$("#modalYes:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}}}else{if(B.which==78){if($("#change_no:visible").html()!=null){$("#change_no:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}else{if($("#modalNo:visible").html()!=null){$("#modalNo:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}}}else{if(B.which==67){if($("#change_cancel:visible").html()!=null){$("#change_cancel:visible").click();
HotKeyPress.theLastKey=B.which;
return false
}}}}}}HotKeyPress.theLastKey=B.which
});