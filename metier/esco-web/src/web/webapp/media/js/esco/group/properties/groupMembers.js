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
var GroupMemberPrototype = $.extend( true, {},EscoGrid,{

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
			   theMemberType : $("input[name=membersRadio]:checked").val()},
			   Core.getUrlParams()
			);
			Core.resetNavParams();
			return jsonData;
	},

	/**
	 * {@inheritDoc}
	 */
	doActionOnFindData:function(data){
		group.getIsGroupModified();
	},

	/**
     * {@inheritDoc}
     */
	getIfSelectable : function(){
		memberRadioValue = $("input[name=membersRadio]:checked").val();
		if (memberRadioValue == "MEMBER_RADIO_EFFECTIVE" ||	memberRadioValue == "MEMBER_RADIO_ALL"){
			this._options.IS_SELECTABLE_GRID = false && Profile.canAddOrDeleteMembersOnGroupProperties();
		} else {
			this._options.IS_SELECTABLE_GRID = true && Profile.canAddOrDeleteMembersOnGroupProperties();
		}
	},

   /**
    * {@inheritDoc}
    */
	doIsMultipleViewGrid:function(){
		memberRadioValue = $("input[name=membersRadio]:checked").val();
		if (memberRadioValue == "MEMBER_RADIO_EFFECTIVE" ||	memberRadioValue == "MEMBER_RADIO_ALL"){
			// Nothing to do
		}else{
			this._createNavBar();
			$("#message").append("");
			$("#pagerGrid > *").not(".navtable").hide();
			$($("#pagerGrid .nav-button")[1]).hide();
		}
	},

   /**
    * {@inheritDoc}
    */
	doSelectRow : function(rowid,status){
		if (status==false){
			$('input[id=cb_jqg]').attr('checked', false);
			this.nbRowSelected--;
		} else {
			this.nbRowSelected++;
		}
		this._updateRowSelectedInfo();
	},

	/**
     * {@inheritDoc}
     */
	doSelectAll:function(rowid,status){
		if (status) {
			this.nbRowSelected = parseInt($("#list").attr("p").records, 10);
		} else {
			this.nbRowSelected = 0;
		}
		this._updateRowSelectedInfo();
	},

	/**
     * {@inheritDoc}
     */
	doOnPaging:function(){
		this._selectType="undefined";
		this._sendSelectedRows();
		this._resizeGrid();
	},

	/**
     * {@inheritDoc}
     */
	doOnExistingAddedItems:function(){
		memberRadioValue = $("input[name=membersRadio]:checked").val();

		if (memberRadioValue == "MEMBER_RADIO_EFFECTIVE" ||	memberRadioValue == "MEMBER_RADIO_ALL") {
			if (this.isExistingAddedItems){
				$("#subtitleWarning").empty().append(this._lang.WARNING_MESSAGE);
			}else{
				$("#subtitleWarning").empty();
			}
		}else{
			$("#subtitleWarning").empty();
		}
	},

	/**
     * {@inheritDoc}
     */
	doOnLoadComplete:function(){
		memberRadioValue = $("input[name=membersRadio]:checked").val();

		if (memberRadioValue == "MEMBER_RADIO_EFFECTIVE" ||	memberRadioValue == "MEMBER_RADIO_ALL") {
			$("table[class*=navtable]").css("display","none");
			$("input[class=cbox]").css("display","none");
		} else {
			try {
				$("table[class*=navtable]").css("display","block");
				$("input[class=cbox]").css("display","block");
			} catch (e) {
			}
		}
	},

	/**
     * {@inheritDoc}
     */
	addActionOnClickLinkItemPerson:function(id){
		if (Profile.canAccessToPersonProperties()){
			Core.addAction(
					$(id),
					Core.CLICK,
					function(e){
						Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/personProperties.jsf",{idPerson : e.target.id, needClear : "true"},"#mainContent", true, false);
					},true);
		}else{
			$(id).removeClass("tableLink");
		}
	},

	/**
     * {@inheritDoc}
     */
	addActionOnClickLinkItemGroup:function(id){
		if (Profile.canAccessToGroupProperties()){
			Core.addAction(
					$(id),
					Core.CLICK,
					function(e){
						Core.log("Preparate open of node + " + e.target.id);

						_displayBlockUIOption = {
								onAfterShowBlockUI : function(){
									Core.log("Preparate open of node + " + $("#"+e.target.id).attr("id") );
									TreePlugin.openAndSelectNode(e.target.id);
						}
						};
						Core._showBlockUI(_displayBlockUIOption);

					},true);
		}else{
			$(id).removeClass("tableLink");
		}
	},

	/**
     * {@inheritDoc}
     */
	doAddNavButtons:function(){
		var _this = this;

		if (Profile.canAddOrDeleteMembersOnGroupProperties()){
			var addAction = ActionNavBar.actionAddDefault(_this,"/" + Core.applicationContext + "/stylesheets/groupProperties.jsf",1);
			this._addANavButton(
					this._lang.ADD_LABEL,
					this._lang.ADD_TITLE,
					"/" + Core.applicationContext + "/media/imgs/grid/10551.add_exc.gif",
					addAction,
					"add"
					);

			var delAction = ActionNavBar.actionDelDefault(_this,"/" + Core.applicationContext + "/ajax/groupMembersController/deleteItems.jsf",group.getIsGroupModified);
			this._addANavButton(
					this._lang.DEL_LABEL,
					this._lang.DEL_TITLE,
					"/" + Core.applicationContext + "/media/imgs/grid/14763.delete.gif",
					delAction,
					"del"
					);
		}
	}
});

var GroupMember = new DUI.Class(GroupMemberPrototype , $.screen);
