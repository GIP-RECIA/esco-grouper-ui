/**
 * @author aChesneau
 */
var StemSearchPrototype = $.extend( true, {}, EscoGrid ,{

	_isOneItemSelected : false,

	_coreParams : null,

	   /**
	    * {@inheritDoc}
	    */
		doOnFire : function(){
				var path = $("#idNode").html();
				var value = $("#searchPathHidden").attr("value");

				new EscoBreadCrumb({
					path : path,
					value : value
				});

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
		getPostDataToFindDataRequest : function(){
			var	json = {
					theTerm : $("input[id=theTerm]").val(),
					theSearchSource : $("input[name=subjectSearch]:checked").val(),
					theSearchType : 'StemSearch'
				};

				$.extend(json, {
					theSearchPath : $("input[id=searchPathHidden]").val(),
					theDisplayTerm : $("input[name=displayStemSearch]:checked").val()
				});

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
				$("#error").empty().append(this._lang.WARNING_MESSAGE);
			}
		},

		/**
		 * Get if one row is selected.
		 */
		getIsOneRowSelected:function(){
			jQuery.ajaxSettings.async = false;
			_this = this;
			$.post("/" + Core.applicationContext + "/ajax/stemSearchController/getIsOneRowSelectedStemSearch.jsf",
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
							_this._sendSelectedRows();
							Core.navParam = _this._coreParams;
							var url = Core.getUrl();
							Core.setNavParam("fromResponse","StemSearch");
							Core.setNavParam("thePrivilegesType","FOLDER");
							var params = Core.getUrlParams();
							Core.pullAjaxContent(url,params,"#mainContent", true, false);
						}
						// else we display an error
						else {
							$("#error").empty().append(_this._lang.WARNING_ADD_MESSAGE);
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

			Core.addAction( $('input[name=subjectSearch]'), Core.CLICK,
				function(e){
					_this.showGroupSearchOption(e);
				},
				false
			);
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
						Core.setNavParam("thePrivilegesType","FOLDER");
						Core.setNavParam("fromResponse","");
						var url = Core.getUrl();
						var params = Core.getUrlParams();
						Core.pullAjaxContent(url,params,"#mainContent", true,false);
					},
					false
			);
		},


		/**
		 * Send the search request and display the jqGrid.
		 */
		search : function(){
			_this=this;
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

var StemSearch = new DUI.Class( StemSearchPrototype , $.screen);
