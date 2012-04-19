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
var GroupDynamicMemberPrototype = $.extend( true, {},EscoGrid,{

   /**
    * {@inheritDoc}
    */
	doOnFire : function(){
		$("#groupAdmin").hide();
		$("#groupDelete").hide();
		return true;
	},
   /**
    * {@inheritDoc}
    */
	getPostDataToFindDataRequest : function(){
		jsonData = $.extend( { groupUuid : $("input[id=groupUuid]").val(),
			   theMemberType : "MEMBER_RADIO_IMMEDIATE"},
			   Core.getUrlParams()
			);
			Core.resetNavParams();
			return jsonData;
	},

	/**
	 * {@inheritDoc}
	 */
	doActionOnFindData:function(){
		group.getIsGroupModified();
	},

	/**
     * {@inheritDoc}
     */
	doOnLoadComplete:function(){
		try {
			$("table[class*=navtable]").css("display","block");
			$("input[class=cbox]").css("display","block");
		} catch (e) {
		}
	},

	/**
     * {@inheritDoc}
     */
	addActionOnClickLinkItemPerson:function(id){
		Core.addAction(
				$(id),
				Core.CLICK,
				function(e){
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/personProperties.jsf",{idPerson : e.target.id, needClear : "true"},"#mainContent", true, false);
				},true);
	},

	/**
     * {@inheritDoc}
     */
	addActionOnClickLinkItemGroup:function(id){
		Core.addAction(
				$(id),
				Core.CLICK,
				function(e){
					Core.log("Preparate open of node + " + e.target.id);

					_displayBlockUIOption = {
							onAfterShowBlockUI : function(){
								Core.log("Preparate open of node + " + $("#"+e.target.id).attr("id") );
								Core.openAndSelectNode(e.target.id);
					}
					};
					Core._showBlockUI(_displayBlockUIOption);

				},true);
	}
});

var GroupDynamicMember = new DUI.Class(GroupDynamicMemberPrototype , $.screen);
