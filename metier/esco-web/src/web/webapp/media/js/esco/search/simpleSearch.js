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

var SimpleSearchPrototype = $.extend( true, {}, EscoGrid ,{

   /**
    * {@inheritDoc}
    */
	doOnFire : function(){
		EscoAnimate._hideAnimate($("div[id=searchGroupProperties]"));
		var _this = this;
		Core.addAction( $('#search'), Core.CLICK,
			function(e){
				_this.search(e);
			},false
		);

		Core.addAction( $('input[name=subjectSearch]'), Core.CLICK,
			function(e){
				_this.showGroupSearchOption(e);
			},false
		);
		fluid.accessibletabs("escoTabs", "escoPanels");
		return false;
	},

	/**
     * {@inheritDoc}
     */
	doOnLoadComplete : function(){

		if ( $("#list").getDataIDs().length > 0 ){
			// Clear the content error
			$("#error").empty();
			$("div[class=grid_hdiv]").show();
			$("div[class=grid_bdiv]").show();
			$("#pagerGrid").show();
		}else{
			$("div[class=grid_hdiv]").hide();
			$("div[class=grid_bdiv]").hide();
			$("#pagerGrid").hide();

			$("#error").empty().append(this._lang.WARNING_MESSAGE);
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
						Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/personProperties.jsf",{idPerson : e.target.id, needClear:"true"},"#mainContent", true, false);
					},false);
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

					},false);
		}else{
			$(id).removeClass("tableLink");
		}
	},

   /**
    * {@inheritDoc}
    */
	getPostDataToFindDataRequest : function(){
		var	json = {
				theTerm : $("input[id=theTerm]").val(),
				theSearchSource : $("input[name=subjectSearch]:checked").val(),
				theSearchType : 'SimpleSearch'
			};
			if ($("input[name=subjectSearch]:checked").val() == "SEARCH_GROUP") {

					$.extend(json, {
						theSearchPath : $("input[id=searchPathHidden]").val(),
						theDisplayTerm : $("input[name=displayGroupSearch]:checked").val()
					});

			} else {
				$.extend(json, {
					theSearchPath : $("input[id=searchPathHiddenForPersonSearch]").val(),
					theDisplayTerm : 'none'
				});
			}
		return json;
	},

	/** Show the group option search. */
	showGroupSearchOption : function(e){
		var value = e.target.value;

		if (value == "SEARCH_GROUP") {
			EscoAnimate._showAnimate($("div[id=searchGroupProperties]"));
			var path = $("#idNode").html();
			var value = $("#searchPathHidden").attr("value");

			 new EscoBreadCrumb({path : path,value : value});

		} else {
			EscoAnimate._hideAnimate($("div[id=searchGroupProperties]"));
		}
	},

	search : function(){
		var _this = this;
		_displayBlockUIOption = {
				onAfterShowBlockUI : function(){
					Validate.addValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");

					if ($.validationEngine.isError){
						Core._hideBlockUI();
					} else if (!$.validationEngine.isError) {
						Validate.removeValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");
						_this._loadData();
					}
			}
		};
		Core._showBlockUI(_displayBlockUIOption);
	}
});

var SimpleSearch = new DUI.Class( SimpleSearchPrototype , $.screen);