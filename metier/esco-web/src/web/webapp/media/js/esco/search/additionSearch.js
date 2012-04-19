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
 * The AdditionSearch class for the AdditionSearch JSP.
 * @author aChesneau
 */

var AdditionSearchPrototype = $.extend( true, {}, EscoGrid ,{

	_isOneItemSelected : false,

	_coreParams : null,

	_nbMember : null,

	_errMember : null,

	_popupMode : null,

   /**
    * {@inheritDoc}
    */
	doOnFire : function(){

		if($("input[id=onlyGroup]").val()== "true"){
			$("input[value=SEARCH_PERSON]").attr("disabled","true");
			$("input[value=SEARCH_PERSON_IN_A_GROUP]").attr("disabled","true");
			if ( $("input[value=SEARCH_PERSON]").attr("checked")==true ){
				$("input[value=SEARCH_GROUP]").attr("checked","true");
				$("input[id=theTerm]").attr("value","");
			}
			if ( $("input[value=SEARCH_PERSON_IN_A_GROUP]").attr("checked")==true ){
				$("input[value=SEARCH_GROUP]").attr("checked","true");
				$("input[id=theTerm]").attr("value","");
			}
		}

		if ($("input[name=subjectSearch]:checked").val()=="SEARCH_PERSON"){
			EscoAnimate._hideAnimate($("div[id=_idJsp1:searchGroupProperties]"));
		}else{
			var path = $("#idNode").html();
			var value = $("#searchPathHidden").attr("value");

			new EscoBreadCrumb({
				path : path,
				value : value
			});
		}
		this.initSaveButton();
		this.initReturnButton();
		this.initActions();
		fluid.accessibletabs("escoTabs", "escoPanels");

		if($("input[id=theTerm]").val()!= ""){
			this._doneLoadData(true);
		}else{
			Core._hideBlockUI();
		}
		this._coreParams = Core.navParam;
		Core.resetNavParams();
		return false;
	},

	/**
    * {@inheritDoc}
    */
	doActionOnFindData:function(data){
		if ($("input[name=subjectSearch]:checked").val() == "SEARCH_PERSON_IN_A_GROUP") {
			var msg = Core.getValueOfXml(data, "message");
			if (msg != undefined && msg){
				$("#error").empty().append(msg);
				_this.unpopup();
			}
		}
	},

	/**
    * {@inheritDoc}
    */
	getPostDataToFindDataRequest : function(){
		var	json = {
			theTerm : $("input[id=theTerm]").val(),
			theSearchSource : $("input[name=subjectSearch]:checked").val(),
			theSearchType : 'AdditionSearch',
			theSearchStep : $("input[id=theSearchStep]").val()
		};

		if ($("input[name=subjectSearch]:checked").val() == "SEARCH_GROUP") {

			$.extend(json, {
				theSearchPath : $("input[id=searchPathHidden]").val(),
				theDisplayTerm : $("input[name=displayGroupSearch]:checked").val()
			});

		} else if ($("input[name=subjectSearch]:checked").val() == "SEARCH_PERSON") {

			$.extend(json, {
				theSearchPath : $("input[id=searchPathHiddenForPersonSearch]").val(),
				theDisplayTerm : 'none'
			});

		} else if ($("input[name=subjectSearch]:checked").val() == "SEARCH_PERSON_IN_A_GROUP") {

			$.extend(json, {
				theSearchPath : $("input[id=searchPathHidden]").val(),
				theDisplayTerm : $("input[name=displayGroupSearch]:checked").val()
			});

		}else {
			//No selected Radio
		}

		return json;
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
		$(this._options.ID_PAGER_GRID + " .navtable .nav-row").html("");
/*
		if ($("input[name=subjectSearch]:checked").val() == "SEARCH_PERSON_IN_A_GROUP" && this.popupMode) {
			if (this.nbRowSelected == 0 || this.nbRowSelected == 1 ) {
				$(this._options.ID_PAGER_GRID + " .navtable .nav-row").html("");
			} else {
				try {

					_this.getIsOneRowSelected();
					// If we have more than one subject selected
					if (_this._isOneItemSelected || $("input[id*=jqg_]:checked").size() > 0) {
						_this._selectType = undefined;
						_this._sendSelectedRows();
					}
					jQuery.ajaxSettings.async = false;
					_this = this;
					_this.nbMember = 0;
					$.post("/" + Core.applicationContext + "/ajax/searchController/numberOfMember.jsf",
						function(data) {
							_this.nbMember = Core.getResult(data);
						});
					jQuery.ajaxSettings.async = true;
					$(this._options.ID_PAGER_GRID + " .navtable .nav-row").html('<td style="border: medium none; padding: 0px;">&nbsp;</td><td style="cursor: pointer;" class="nav-button"><table cellspacing="0" cellpadding="0" border="0" style="margin-top:5px;"><tr><td>'+Lang.getString("NB_MEMBERS_IN_GROUP").replace("{1}", this.nbMember)+'</td></tr></tbody></table></td>');

				} catch (e) {}
			}
		}
*/
	},

	/**
    * {@inheritDoc}
    */
	doSelectAll : function(rowid,status){
		if (status) {
			this.nbRowSelected = parseInt($("#list").attr("p").records, 10);
		} else {
			this.nbRowSelected = 0;
		}
		$(this._options.ID_PAGER_GRID + " .navtable .nav-row").html("");
/*
		if ($("input[name=subjectSearch]:checked").val() == "SEARCH_PERSON_IN_A_GROUP" && this.popupMode) {
			if (this.nbRowSelected == 0 || this.nbRowSelected == 1 ) {
				$(this._options.ID_PAGER_GRID + " .navtable .nav-row").html("");
			} else {
				try {

					_this.getIsOneRowSelected();
					// If we have more than one subject selected
					if (_this._isOneItemSelected || $("input[id*=jqg_]:checked").size() > 0) {
						_this._selectType = undefined;
						_this._sendSelectedRows();
					}
					jQuery.ajaxSettings.async = false;
					_this = this;
					_this.nbMember = 0;
					$.post("/" + Core.applicationContext + "/ajax/searchController/numberOfMember.jsf",
						function(data) {
							_this.nbMember = Core.getResult(data);
						});
					jQuery.ajaxSettings.async = true;
					$(this._options.ID_PAGER_GRID + " .navtable .nav-row").html('<td style="border: medium none; padding: 0px;">&nbsp;</td><td style="cursor: pointer;" class="nav-button"><table cellspacing="0" cellpadding="0" border="0" style="margin-top:5px;"><tr><td>'+Lang.getString("NB_MEMBERS_IN_GROUP").replace("{1}", this.nbMember)+'</td></tr></tbody></table></td>');

				} catch (e) {}
			}
		}
*/
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
	doOnLoadComplete:function(data){
		if ( $("#list").getDataIDs().length > 0 ){
			// Clear the content error
			$("#error").empty();
			$("div[class=grid_hdiv]").show();
			$("div[class=grid_bdiv]").show();
			$("#pagerGrid").show();
			$("#actions > div:hidden").show();
		}else{
			$("div[class=grid_hdiv]").hide();
			$("div[class=grid_bdiv]").hide();
			$("#pagerGrid").hide();
			$("#actions > div:hidden").hide();
			if ($("#error").html() == ""){
				$("#error").empty().append(this._lang.WARNING_MESSAGE);
				_this.unpopup();
			}

		}
		if ($("#error").html() == ""){
			_this.popup();
		}
	},

	/**
	 * Display the group option panel.
	 */
	showGroupSearchOption : function(e){
		var value = e.target.value;

		if (value == "SEARCH_GROUP" || value == "SEARCH_PERSON_IN_A_GROUP") {
			EscoAnimate._showAnimate($("div[id=_idJsp1:searchGroupProperties]"));
			var path = $("#idNode").html();
			var value = $("#searchPathHidden").attr("value");
				new EscoBreadCrumb({
					path : path,
					value : value
				});
		} else {
			EscoAnimate._hideAnimate($("div[id=_idJsp1:searchGroupProperties]"));
		}
	},

	/**
	 * Get if one row is selected.
	 */
	getIsOneRowSelected:function(){
		jQuery.ajaxSettings.async = false;
		_this = this;
		$.post("/" + Core.applicationContext + "/ajax/searchController/getIsOneRowSelectedAdditionSearch.jsf",
				function(data) {
					_this._isOneItemSelected = Core.getStatus (data);
				});
		jQuery.ajaxSettings.async = true;
	},

	/**
	 * Initialize the save button.
	 */
	initSaveButton: function(){
		_this = this;
		Core.addAction(
				$("#searchSave"),
				Core.CLICK,
				function(){
					_this.getIsOneRowSelected();
					// If we have more than one subject selected
					if (_this._isOneItemSelected || $("input[id*=jqg_]:checked").size() > 0) {
						_this._selectType = undefined;
						_this._sendSelectedRows();
						Core.navParam = _this._coreParams;
						var url = Core.getUrl();
						Core.setNavParam("fromResponse","AdditionSearch");
						var params = Core.getUrlParams();
						Core.pullAjaxContent(url,params,"#mainContent", true, false);
					}
					// else we display an error
					else {
						$("#error").empty().append(_this._lang.WARNING_ADD_MESSAGE);
						_this.unpopup();
					}
				},
				false
		);
	},

	/**
	 * Initialize actions
	 */
	initActions:function(){
		var _this = this;

		Core.addAction( $('#search'), Core.CLICK,
			function(e){
				_this.search(e);
			},
			false
		);

		Core.addAction( $('#searchAgain'), Core.CLICK,
			function(e){
				var errorMaxPerson = false;

				if (_this.nbRowSelected == 0 ) {
					$(_this._options.ID_PAGER_GRID + " .navtable .nav-row").html('<td style="border: medium none; padding: 0px;">&nbsp;</td><td style="cursor: pointer;" class="nav-button"><table cellspacing="0" cellpadding="0" border="0" style="margin-top:5px;"><tr><td style="color:red;">'+Lang.getString("SEARCH_ERROR_ADD")+'</td></tr></tbody></table></td>');
					errorMaxPerson = true;
				} else if(_this.nbRowSelected == 1){
					$(_this._options.ID_PAGER_GRID + " .navtable .nav-row").html('');
				}else {
					try {
						_this.getIsOneRowSelected();
						// If we have more than one subject selected
						if (_this._isOneItemSelected || $("input[id*=jqg_]:checked").size() > 0) {
							_this._selectType = undefined;
							_this._sendSelectedRows();
						}
						jQuery.ajaxSettings.async = false;
						_this.errMember = 0;
						$.post("/" + Core.applicationContext + "/ajax/searchController/limitOfNumberOfMember.jsf",
							function(data) {
								_this.errMember = Core.getStatus(data);
							});
						jQuery.ajaxSettings.async = true;

						errorMaxPerson = _this.errMember;

						if(errorMaxPerson){
							$(_this._options.ID_PAGER_GRID + " .navtable .nav-row").html('<td style="border: medium none; padding: 0px;">&nbsp;</td><td style="cursor: pointer;" class="nav-button"><table cellspacing="0" cellpadding="0" border="0" style="margin-top:5px;"><tr><td style="color:red;">'+Lang.getString("SEARCH_ERROR_MAX_RESULT")+'</td></tr></tbody></table></td>');
						}
					} catch (e) {}
				}

				if(!errorMaxPerson){

					$("#actionsSearch2").css("display","none");
					$.unblockUI();
					_this.getIsOneRowSelected();
					// If we have more than one subject selected
					if (_this._isOneItemSelected || $("input[id*=jqg_]:checked").size() > 0) {
						_this._selectType = undefined;
						_this._sendSelectedRows();
					}
					// else we display an error
					else {
						$("#error").empty().append(_this._lang.WARNING_ADD_MESSAGE);
						_this.unpopup();
					}
					$("input[id=theSearchStep]").val("2");
					_this.search(e);
					$("input[id=theDataOfTable]").val("person");

				}
			},
			false
		);

		Core.addAction( $('#returnTerm'), Core.CLICK,
				function(e){
					_this.unpopup();
					setTimeout(function() { $("#modalSearch").css("display","none"); },50);
					$("input[id=theDataOfTable]").val("person");
				},
				false
			);

		if($("input[id=onlyGroup]").val()!= "true"){
			Core.addAction( $('input[name=subjectSearch]'), Core.CLICK,
					function(e){
					_this.showGroupSearchOption(e);
				},
				false
			);
		}
	},

	/**
	 * Initialize the return button
	 */
	initReturnButton:function(){
		_this = this;

		Core.addAction(
				$("#searchReturn"),
				Core.CLICK,
				function(){
					Core.navParam = _this._coreParams;
					Core.setNavParam("canClearContext","false");
					Core.setNavParam("fromResponse","");
					var url = Core.getUrl();
					var params = Core.getUrlParams();
					Core.pullAjaxContent(url,params,"#mainContent", true,false);
				},
				false
		);
	},

	popup : function(){
		setTimeout(function() {
			if($("input[id=theDataOfTable]").val() == "group"){
				$.blockUI({
		            message: $('#modalSearch'),
		            css: {  cursor: 'default',
				 			width: '690px',
				 			top: '20%' ,
					        left: '45%' ,
					        'margin-left': '-250px'
				 		}
		        });
				$("#actionsSearch2").css("display","block");
				$("#modalSearch").css("display","block");
			}
		},50);
		this.popupMode = true;
	},

	unpopup : function(){
		$("#actionsSearch2").css("display","none");
		$.unblockUI();
		$("input[id=theSearchStep]").val("1");
		this.popupMode = false;
	},

	/**
	 * Send the search request and display the jqGrid.
	 */
	search : function(){
		_this=this;
		_this.nbMember = 0;
		$(this._options.ID_PAGER_GRID + " .navtable .nav-row").html("");
		_displayBlockUIOption = {
			onAfterShowBlockUI : function(){
				Validate.addValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");

				$("#modalSearch").css("display","block");

				if ($.validationEngine.isError){
					Core._hideBlockUI();
					_this.unpopup();
					setTimeout(function() {$("#modalSearch").css("display","none");},50);
				} else if (!$.validationEngine.isError) {
					Validate.removeValidatePrompt("org.esco.grouperui.search.regexp.searchTerm");
					_this._loadData();

					if($("input[name=subjectSearch]:checked").val() == "SEARCH_PERSON_IN_A_GROUP"){
						$("#modalSearch").css("display","block");

						if($("input[id=theSearchStep]").val() == "1"){
							$("input[id=theDataOfTable]").val("group");
							if ($("#error").html() == ""){
								_this.popup();
							}
						}else{
							_this.unpopup();
						}
					}
				}
			}
		};
		Core._showBlockUI(_displayBlockUIOption);
	}
});
var AdditionSearch = new DUI.Class( AdditionSearchPrototype , $.screen);
