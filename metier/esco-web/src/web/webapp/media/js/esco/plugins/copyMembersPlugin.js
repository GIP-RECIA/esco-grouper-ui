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