/**
 * @author aChesneau
 */
var CopyMembers = {

	_isGroupMembersCut: false,

	_groupMembersCut : null,

	/**
	 * Init the copy member action.
	 */
	init: function(node){
		TreeMenu.setCurrentCutAction(CopyMembers);
		CopyMembers._isGroupMembersCut = true;
		CopyMembers._groupMembersCut = $(node);
		$(node).css("opacity","0.4");
	},

	/**
	 * Release the node to default.
	 */
	release: function(){
		if (CopyMembers._groupMembersCut != null){
			$(CopyMembers._groupMembersCut).css("opacity","1");
			CopyMembers._groupMembersCut = null;
			CopyMembers._isGroupMembersCut = false;
		}
	}
};