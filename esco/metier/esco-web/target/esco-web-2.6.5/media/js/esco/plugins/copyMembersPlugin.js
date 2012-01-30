var CopyMembers={_isGroupMembersCut:false,_groupMembersCut:null,init:function(A){TreeMenu.setCurrentCutAction(CopyMembers);
CopyMembers._isGroupMembersCut=true;
CopyMembers._groupMembersCut=$(A);
$(A).css("opacity","0.4")
},release:function(){if(CopyMembers._groupMembersCut!=null){$(CopyMembers._groupMembersCut).css("opacity","1");
CopyMembers._groupMembersCut=null;
CopyMembers._isGroupMembersCut=false
}}};