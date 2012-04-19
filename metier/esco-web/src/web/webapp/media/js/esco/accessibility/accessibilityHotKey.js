/*
 * Copyright (C) 2009 GIP RECIA http://www.recia.fr
 * @Author (C) 2009 GIP RECIA <contact@recia.fr>
 * @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 * @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var HotKeyPress = {

	focusTree : 0,

	thePervKey : null,

	theLastKey : null,

	getItemMenuTrigger : function(triggerName){
		var item = null;
		if ( $("a[class=hover]").html() != null ){
			item = $("a[class=hover]");
		}else{
			item = $("a[class*=clicked]");
		}

		switch (triggerName){
			case "properties" :
				if (Profile.canDisplayNavigationArea()){
					if (TreeMenu.propertiesIsVisible(item.parent("li"),null)){
						TreeMenu.propertiesAction(item.parent("li"),null);
					}
				}
				break;
			case "search":
				if (Profile.canDisplayNavigationArea()){
					if (TreeMenu.searchIsVisible(item.parent("li"),null)){
						TreeMenu.searchAction(item.parent("li"),null);
					}
				}
				break;
			case "delete":
				if (TreeMenu.deleteIsVisible(item.parent("li"),null)){
					TreeMenu.deleteAction(item.parent("li"),null);
				}
				break;
			case "createFolder":
				if (TreeMenu.createFolderIsVisible(item.parent("li"),null)){
					TreeMenu.createFolderAction(item.parent("li"),null);
				}
				break;
			case "createGroup":
				if (TreeMenu.createGroupIsVisible(item.parent("li"),null)){
					TreeMenu.createGroupAction(item.parent("li"),null);
				}
				break;
			case "cutGroup":
				if (Profile.canDisplayNavigationArea()){
					if (TreeMenu.cutGroupIsVisible(item.parent("li"),null)){
						TreeMenu.cutGroupAction(item.parent("li"),null);
					}
				}
				break;
			case "pasteGroup":
				if (Profile.canDisplayNavigationArea()){
					if (TreeMenu.pasteGroupIsVisible(item.parent("li"),null)){
						TreeMenu.pasteGroupAction(item.parent("li"),null);
					}
				}
				break;
			case "pasteMembers":
				if (Profile.canDisplayNavigationArea()){
					if (TreeMenu.pasteMembersIsVisible(item.parent("li"),null)){
						TreeMenu.pasteMembersAction(item.parent("li"),null);
					}
				}
				break;
			case "copyMembers":
				if (Profile.canDisplayNavigationArea()){
					if (TreeMenu.copyMembersIsVisible(item.parent("li"),null)){
						TreeMenu.copyMembersAction(item.parent("li"),null);
					}
				}
				break;
			case "manage":
				if (TreeMenu.manageIsVisible(item.parent("li"),null)){
					TreeMenu.manageAction(item.parent("li"),null);
				}
				break;
			case "subscribe":
				if (Profile.canDisplayNavigationArea()){
					if (TreeMenu.subscribeIsVisible(item.parent("li"),null)){
						TreeMenu.subscribeAction(item.parent("li"),null);
					}
				}
				break;
			case "unSubscribe":
				if (Profile.canDisplayNavigationArea()){
					if (TreeMenu.unSubscribeIsVisible(item.parent("li"),null)){
						TreeMenu.unSubscribeAction(item.parent("li"),null);
					}
				}
				break;
		}
	}

};


$(document).bind(Core.KEYDOWN,function(e){
	if (!Core.isInBlockUiMode){
		// ESCOGRID HOT KEY.
		if (e.which == 36){
			// KEY HOME
			if(HotKeyPress.theLastKey == 16 ){
				// Key SHIFT + HOME
				$("input[id=jqg_1]:visible").focus();
			}else{
				$("#escoPanels").find("#first").click();
			}
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if (e.which == 35){
			// KEY LAST
			$("#escoPanels").find("#last").click();
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if (e.which == 34){
			// KEY PAGE_UP
			$("#escoPanels").find("#next").click();
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if (e.which == 33){
			// KEY PAGE_DOWN
			$("#escoPanels").find("#prev").click();
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if (HotKeyPress.theLastKey == 16 && e.which == 73){
			// KEY SHIFT + I
			$("table[typeAction=add]:visible").click();
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if (HotKeyPress.theLastKey == 16 && e.which == 68){
			// KEY SHIFT + D
			$("table[typeAction=del]:visible").click();
		    HotKeyPress.theLastKey = e.which;
			return false;
		}

	// GENERAL HOT KEY.
		else if(HotKeyPress.theLastKey == 16 && e.which == 72){
			// Key F1
			if ($("#onlineHelp").css("visibility")=="hidden"){
				if ($("#onlineHelpMain").html() != null){
					$("iframe").attr("src",Lang.getString($("#onlineHelpMain").attr("name")));
				}else{
					$("iframe").attr("src",Lang.getString("ONLINE_HELP_INDEX_URL"));
				}
				$(".containerPlus").mb_open().css("visibility","visible");
			}else{
				$(".containerPlus").mb_close();
			}
	        HotKeyPress.theLastKey = e.which;
			return false;
	    }else if(e.which == 113){
			// Key F2
	    	if ( Profile.canDisplayNavigationArea() && HotKeyPress.focusTree % 2 == 1 ){
	    		if ( $("a[class=hover]").html() != null ){
	    			$("a[class=hover]").focus();
	    		}else{
	    			$("a[class*=clicked]").focus();
	    		}
	    	}else{
	    		$($("#escoPanels").children("div:visible").find("input:visible")[0]).focus().focus();
	    	}
	    	HotKeyPress.focusTree ++;
	        HotKeyPress.theLastKey = e.which;
			return false;
	    }else if(e.which == 114){
			// Key F3
	    	if (Profile.canDisplayNavigationArea()){
	    		HotKeyPress.getItemMenuTrigger("search");
	    	}
	        HotKeyPress.theLastKey = e.which;
			return false;
	    }else if(e.which == 115){
			// Key F4
	    	if (Profile.canDisplayNavigationArea()){
	    		$(".ui-icon-home").click();
	    	}
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(e.which == 27){
			// Key ESC
			if (Profile.canDisplayNavigationArea()){
				$("#jstree-contextmenu").hide();
			}
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(e.which == 46){
			// Key DEL
			HotKeyPress.getItemMenuTrigger("delete");
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if (e.which == 89){
			// KEY Y
			if ( $("#change_yes:visible").html() != null ){
				$("#change_yes:visible").click();
			    HotKeyPress.theLastKey = e.which;
				return false;
			}else if ( $("#modalYes:visible").html() != null ){
				$("#modalYes:visible").click();
			    HotKeyPress.theLastKey = e.which;
				return false;
			}
		}else if (e.which == 78){
			// KEY N
			if ( $("#change_no:visible").html() != null ){
				$("#change_no:visible").click();
			    HotKeyPress.theLastKey = e.which;
				return false;
			}else if ( $("#modalNo:visible").html() != null ){
				$("#modalNo:visible").click();
			    HotKeyPress.theLastKey = e.which;
				return false;
			}
		}else if (e.which == 67){
			// KEY C
			if ( $("#change_cancel:visible").html() != null ){
				$("#change_cancel:visible").click();
			    HotKeyPress.theLastKey = e.which;
				return false;
			}
		}else if(HotKeyPress.theLastKey == 16 && e.which == 77){
			// Key SHIFT + M
			if (Profile.canDisplayNavigationArea()){
				var item = null;
				if ( $("a[class=hover]").html() != null ){
					item = $("a[class=hover]");
				}else{
					item = $("a[class=clicked]");
				}
				item.trigger("contextmenu");
			}
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 80){
			// Key SHIFT + P
			HotKeyPress.getItemMenuTrigger("properties");
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 65){
			// Key SHIFT + A
			HotKeyPress.getItemMenuTrigger("manage");
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 84){
			// Key SHIFT + T
			$("#testLdapRequest").click();
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 69){
			// Key SHIFT + E
			$("#search").click();
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 70){
			// Key SHIFT + F
			HotKeyPress.getItemMenuTrigger("createFolder");
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 71){
			// Key SHIFT + G
			HotKeyPress.getItemMenuTrigger("createGroup");
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 76){
			// Key SHIFT + L
			if ($("#isServlet").val() == "true" ){
				window.location = $("a[name=disconnectEscoGrouper]").attr("href");
			}
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 88){
			// Key SHIFT + X
			HotKeyPress.getItemMenuTrigger("cutGroup");
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 86){
			// Key SHIFT + V
			if (CopyMembers._isGroupMembersCut == true ){
				HotKeyPress.getItemMenuTrigger("pasteMembers");
			}else{
				HotKeyPress.getItemMenuTrigger("pasteGroup");
			}
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 83){
			// Key SHIFT + S
			var item = $("a[id*=Save]");
			if (item.parent().css("display") != "none" )
					item.click();
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 90){
			// Key SHIFT + Z
			var item = $("a[id*=Cancel]");
			if (item.html() != null){
				if (item.parent().css("display") != "none" ){
					item.click();
				}
			}else{
				item = $("a[id*=Return]");
				if (item.html() != null){
					item.click();
				}
			}
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 67){
			// Key SHIFT + C
			HotKeyPress.getItemMenuTrigger("copyMembers");
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 74){
			// Key SHIFT + J
			HotKeyPress.getItemMenuTrigger("subscribe");
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which == 81){
			// Key SHIFT + Q
			HotKeyPress.getItemMenuTrigger("unSubscribe");
		    HotKeyPress.theLastKey = e.which;
			return false;
		}else if(HotKeyPress.theLastKey == 16 && e.which > 48 && e.which <= 57){
			// Key SHIFT + {1...9}
			$("#escoPanels").tabs("select",e.which - 49);
		    HotKeyPress.theLastKey = e.which;
			return false;
		}


	}else{
		if(HotKeyPress.theLastKey == 16 && e.which == 90){
			// Key SHIFT + Z
			var item = $("a[id*=Return]");
			if (item.html() != null){
				item.click();
			}
		}else if (e.which == 89){
			// KEY Y
			if ( $("#change_yes:visible").html() != null ){
				$("#change_yes:visible").click();
			    HotKeyPress.theLastKey = e.which;
				return false;
			}else if ( $("#modalYes:visible").html() != null ){
				$("#modalYes:visible").click();
			    HotKeyPress.theLastKey = e.which;
				return false;
			}
		}else if (e.which == 78){
			// KEY N
			if ( $("#change_no:visible").html() != null ){
				$("#change_no:visible").click();
			    HotKeyPress.theLastKey = e.which;
				return false;
			}else if ( $("#modalNo:visible").html() != null ){
				$("#modalNo:visible").click();
			    HotKeyPress.theLastKey = e.which;
				return false;
			}
		}else if (e.which == 67){
			// KEY C
			if ( $("#change_cancel:visible").html() != null ){
				$("#change_cancel:visible").click();
			    HotKeyPress.theLastKey = e.which;
				return false;
			}
		}
	}
	HotKeyPress.theLastKey = e.which;
});

