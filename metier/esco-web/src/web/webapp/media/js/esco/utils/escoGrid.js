/**
*@author aChesneau
*
* To make a column clickable, it is necessary to name it 'colLink'
*
*/
var EscoGridItemFocus = {
	item: null
};

// The function to define the select all action.
var functionClick = function(){
	if ($('input[id=cb_jqg]:checked').val() == "on" ){
		_this._selectType="all";
	}else{
		_this._selectType="unselectall";
	}
	_this._sendSelectedRows();
};


var EscoGrid = {

	/** The class options */
	_options : {
		IS_MULTIPLE_VIEW_GRID : false,
		TYPE_OF_DATA : "GROUP-PERSON",// If grid have some group and some person, some stem etc ..
		IS_SELECTABLE_GRID : false, // The selectable option activation.
		NEED_FIND_DATA_REQUEST : true,
		ACTION_ON_FIND_DATA : false,
		ACTION_ON_SELECT_ROW : false, // Action on select rows.
		ACTION_ON_SELECT_ALL : false, // Action on select all.
		ACTION_ON_CLICK_LINK_ITEM : false, // Make action when click on the item link.
		ACTION_ON_PAGING : false, // Action on paging.
		ACTION_ON_LOAD_DATA_IF_NO_DATA:false, // Action if no data are in the grid.
		ACTION_ON_LOAD_COMPLETE : false, // Action on load complete.
		COLORATE_ADDED_ITEMS : false, // Colorate or not added items.
		ACTION_ON_EXISTING_ADDED_ITEMS : false, // Action to do if existing added items.
		HIDE_BLOCK_UI_ON_LOAD_COMPLETE : true, // Hide bklock ui on load complete.
		URL_FIND_DATA : "", // The url of the find method.
		URL_SELECT_ROWS :"", // The url to select some rows.
		URL_DATA_RESULT	 :"", // The url of the data result.
		GRID_HEIGHT : "auto",
		ID_GRID : "#list", // The id of the grid.
		ID_PAGER_GRID : "#pagerGrid", // The id of the pager grid.
		ID_LOADING_GRID :"#myloading", // The id of the div to put the loading item.
		COLUMN_SELECTED_VALUE : 6, // The column of the selected value
		COLUMN_ADDED_VALUE : 8, // The column of the selected value
		COLUMN_ID_VALUE : 1, // The column of the id of the grid line.
		COLUMN_TYPE_DATA : 7, // Column of the type of the row.
		COLUMN_NAMEGROUP_VALUE : 4, // The column of the name of the group of the grid line.
		COLUMN_LINK_VALUE : 2, // The column to make the link.
		DEL_NAV_BAR_POSITION : 1, //0 for the first
		ROW_LIST : [ 10, 20, 30, 50, 100 ]
		},

	_lang : {
		DEL_NAV_BAR_MESSAGE_DEFAULT : "",
		DEL_NAV_BAR_MESSAGE_CUSTOM : "",
		ADD_LABEL:"",
		ADD_TITLE:"",
		DEL_LABEL:"",
		DEL_TITLE:"",
		TABLE_OF_COL_NAME : null,
		TABLE_OF_COL_MODEL : null
	},

	_theNavBar : null, // The nav bar

	/** The number of row selected */
	nbRowSelected : 0,

	/** Exist or not added items */
	isExistingAddedItems : false,

	/** The select type. */
	_selectType : "undefined",

	_alreadyLoad : false,

	/** Init the class. */
	init : function(opts, lang){
		this._options = $.extend({},this._options,opts || {});
		this._lang = $.extend({},this._lang,lang || {});
	},

	/** Fire function. */
	fire : function(){
		// The checkbox column is absent so it ios necessary to decrement index.
		if (this._options.IS_SELECTABLE_GRID == false){
			this._options.COLUMN_ADDED_VALUE --;
			this._options.COLUMN_ID_VALUE --;
			this._options.COLUMN_LINK_VALUE --;
			this._options.COLUMN_NAMEGROUP_VALUE --;
			this._options.COLUMN_TYPE_DATA --;
			this._options.COLUMN_SELECTED_VALUE --;
		}
		var result = this.doOnFire();
		if ( result ){
			this._loadData();
		}
	},

	/** Do a specific action on fire (Specify in the child class). */
	doOnFire : function(){
		Core.log("NOT IMPLEMENTED : EscoGrid.doOnFire");
	},

	/**
	 * Get the data to post to the ajax call to find items.
	 * Redefine this in the child class to do a specific action.
	 * @return the json data to post.
	 */
	getPostDataToFindDataRequest : function(){
		Core.log("NOT IMPLEMENTED : EscoGrid.getPostDataToFindDataRequest");
	},

	_getPostDataToFindDataRequest : function(){
		if (this._options.NEED_FIND_DATA_REQUEST){
			return this.getPostDataToFindDataRequest();
		}
	},

	/** Do a specific action if the grid is mulitple view or not (Specify in the child class). */
	doIsMultipleViewGrid:function(){
		Core.log("NOT IMPLEMENTED : EscoGrid.doIsMultipleViewGrid");
	},

	/** Call or not the specific action if multiple grid. */
	_doIsMultipleViewGrid:function(){
		if (this._options.IS_MULTIPLE_VIEW_GRID){
			this.doIsMultipleViewGrid();
		}
	},

	/** Do a specific action on select row (Specify in the child class). */
	doSelectRow:function(rowid,status){
		Core.log("NOT IMPLEMENTED : EscoGrid.doSelectRow");
	},

	/** Call or not the specific action on select row. */
	_doSelectRow:function(rowid,status){
		if (this._options.ACTION_ON_SELECT_ROW){
			this.doSelectRow(rowid,status);
		}
	},

	/** Do a specific action on select all (Specify in the child class). */
	doSelectAll:function(rowid,status){
		Core.log("NOT IMPLEMENTED : EscoGrid.doSelectAll");
	},

	/** Call or not the specific action on select row. */
	_doSelectAll:function(rowid,status){
		if (this._options.ACTION_ON_SELECT_ALL){
			this.doSelectAll(rowid,status);
		}
	},

	/** Do a specific action on paging (Specify in the child class). */
	doOnPaging:function(){
		Core.log("NOT IMPLEMENTED : EscoGrid.doOnPaging");
	},

	/** Call or not the specific action on paging. */
	_doOnPaging:function(){
		if (this._options.ACTION_ON_PAGING){
			this.doOnPaging();
		}
	},

	/** Do a specific action if there is no data in the grid (Specify in the child class). */
	doSpecificActionIfNoData:function(){
		Core.log("NOT IMPLEMENTED : EscoGrid.doSpecificActionIfNoData");
		return true;
	},

	/** Call or not the specific action load data if no data are in the grid. */
	_doSpecificActionIfNoData:function(){
		if (this._options.ACTION_ON_LOAD_DATA_IF_NO_DATA){
			return this.doSpecificActionIfNoData();
		}
	},

	/** Do a specific action on paging (Specify in the child class). */
	doOnLoadComplete:function(data){
		Core.log("NOT IMPLEMENTED : EscoGrid.doOnLoadComplete");
	},

	/** Call or not the specific action on paging. */
	_doOnLoadComplete:function(data){
		if (this._options.ACTION_ON_LOAD_COMPLETE){
			this.doOnLoadComplete();
		}
	},

	/** Do a specific action if existing added item. (Specify in the child class). */
	doOnExistingAddedItems:function(){
		Core.log("NOT IMPLEMENTED : EscoGrid.doOnExistingAddedItems");
	},

	/** Call or not the specific action if existing added item. */
	_doOnExistingAddedItems:function(){
		if (this._options.ACTION_ON_EXISTING_ADDED_ITEMS){
			this.doOnExistingAddedItems();
		}
	},

	/** Do a specific action if existing added item. (Specify in the child class). */
	doActionOnFindData:function(data){
		Core.log("NOT IMPLEMENTED : EscoGrid.doActionOnFindData");
	},

	/**
	 * Call on find data url
	 */
	_doActionOnFindData:function(data){
		if (this._options.ACTION_ON_FIND_DATA){
			this.doActionOnFindData(data);
		}
	},

	/**
	 * Call the controller to find item and load the grid.
	 */
	_loadData : function(){
		if (this._options.NEED_FIND_DATA_REQUEST){
			var _this = this;
			_this.nbRowSelected = 0;
			jQuery.ajaxSettings.async = false;

			json = _this.getPostDataToFindDataRequest();

			$.post(_this._options.URL_FIND_DATA, json, function(data) {
				_this._doneLoadData(Core.getStatus(data));
				_this._doActionOnFindData(data);
			});
			jQuery.ajaxSettings.async = true;
		}else{
			this._doneLoadData(true);
		}
	},

	getIfSelectable : function(){
	},

	/**
	 * Action execute after the loadData
	 * @param status: the status of the loadData ajax call.
	 */
	_doneLoadData : function(status){
		var _this = this;
		Core.log("EscoGrid._doneLoadData("+status+")");
		if (status){
			_this._visibilityOfGridContent("visible");
			_this._showPagerGridContent();
			_this._doSelectableGrid(true);
		}else{
			_this._hidePagerGridContent();
			_this._doSelectableGrid(false);
			_this._doIsMultipleViewGrid();
			_this._doSpecificActionIfNoData();
		}

		if ( _this._isGridEmpty() ){
			if (status){
				_this._loadTableData();
			}else{
				if ( _this._alreadyLoad ){
					_this._clearGridData();
				}else{
					_this._loadTableData();
					_this._hidePagerGridContent();
					_this._doSelectableGrid(false);
					_this._doIsMultipleViewGrid();
				}
			}
		}else{
			_this._reloadGrid();
		}
		if ($.browser["msie"]){
			$("tr[id*=empty]").children("td").each(function(){
				$(this).css("padding-top", "0px");
				$(this).css("padding-bottom", "0px");
				}
			);
		}
		_this._updateRowSelectedInfo();
		_this._alreadyLoad = true;
	},

	/** get Id line. */
	_getTableIds : function(){
		return $(this._options.ID_GRID).getDataIDs();
	},


	/** Load the data in the grid */
	_loadTableData : function(){
		var _this = this;

		$(_this._options.ID_GRID).jqGrid( {
					url : _this._options.URL_DATA_RESULT,
					datatype : "xml",
					colNames : _this._lang.TABLE_OF_COL_NAME,
					colModel : _this._lang.TABLE_OF_COL_MODEL,
					rowNum : 10,
					rowList : this._options.ROW_LIST,
					imgpath : "/" + Core.applicationContext + "/media/js/jqGrid/themes/grouper/images",
					pager : $(this._options.ID_PAGER_GRID),
					sortname : 'id',
					height : _this._options.GRID_HEIGHT,
					viewrecords : true,
					sortorder : "desc",
					mtype : "POST",
					multiselect : _this._options.IS_SELECTABLE_GRID,
					xmlReader : {
						root : "invoices",
						row : "result",
						page : "invoices>currentPage",
						total : "invoices>nbResultPage",
						records : "invoices>nbResult"
					},
					onSelectRow:function(rowid,status){
						_this._doSelectRow(rowid,status);
					},
					onSelectAll:function(rowids,status){
						_this._doSelectAll(rowids,status);
					},
					onPaging: function(){
						_this.doOnPaging();
					},
					onSortCol : function(){
						_this._sendSelectedRows();
					},
					loadComplete : function(data) {
						var ids = _this._getTableIds();
						_this._doIsAllSelectedAndAddedItems(data);
						_this._selectItemSelected(ids);
						_this._doColorateAddedItem();
						_this._createNavBar();
						_this._doOnLoadComplete(data);
						_this.getIfSelectable();
						_this._doOnClickLinkItem(ids);
						_this._doOnExistingAddedItems();
						_this._addActionSelectAll();
						_this._resizeGrid();
						if (_this._options.HIDE_BLOCK_UI_ON_LOAD_COMPLETE){
							Core._hideBlockUI();
						}

						$.each($("input[id*=inputLink_]:visible"),function(){
							$(this).focus( function(){
								EscoGridItemFocus.item = $(this).parent().parent();
								$(this).parent().parent().addClass("over");
							});

							$(this).blur( function(){
								EscoGridItemFocus.item = $($("input[id*=inputLink_]:visible")[0]).parent().parent();
								$(this).parent().parent().removeClass("over");
							});

							$(this).bind("keydown", function(e){
								if (e.which == 74){
									// KEY J
									$(this).parent().parent().find("img[action=optin]").click();
									return false;
								}else if (e.which == 81){
									// KEY Q
									$(this).parent().parent().find("img[action=optout]").click();
									return false;
								}
							});
						});

						$.each($("input[id*=jqg]:visible"),function(){
							$(this).focus( function(){
								EscoGridItemFocus.item = $(this).parent().parent();
								$(this).parent().parent().addClass("over");
							});

							$(this).blur( function(){
								EscoGridItemFocus.item = $("input[id=jqg_1]:visible").parent().parent();
								$(this).parent().parent().removeClass("over");
							});

							$(this).bind("keydown", function(e){
								if (e.which == 13){
									// KEY ENTER
									$(this).parent().parent().find("a").children().click();
									return false;
								}else if (e.which == 74){
									// KEY J
									$(this).parent().parent().find("img[action=optin]").click();
									return false;
								}else if (e.which == 81){
									// KEY Q
									$(this).parent().parent().find("img[action=optout]").click();
									return false;
								}else if (e.which == 86){
									// KEY V
									$(this).parent().parent().find("img[action=view]").click();
									return false;
								}else if (e.which == 82){
									// KEY R
									$(this).parent().parent().find("img[action=read]").click();
									return false;
								}else if (e.which == 85){
									// KEY U
									$(this).parent().parent().find("img[action=update]").click();
									return false;
								}else if (e.which == 65){
									// KEY A
									$(this).parent().parent().find("img[action=admin]").click();
									return false;
								}else if (e.which == 70){
									// KEY F
									$(this).parent().parent().find("img[action=stem]").click();
									return false;
								}else if (e.which == 71){
									// KEY G
									$(this).parent().parent().find("img[action=group]").click();
									return false;
								}
							});
						});
					},
					caption : "A grid"
				});

		// Move the loading table.
		$(_this._options.ID_LOADING_GRID).empty().append($("div[class=loading]"));
	},

	/** Create the navbar. */
	_createNavBar : function(){
		var _this = this;

		if ( $(_this._options.ID_PAGER_GRID).children(".navtable").length == 0){

			_this._theNavBar = $(_this._options.ID_GRID).navGrid(_this._options.ID_PAGER_GRID, {
						edit:false,
						add:false,
						del:false,
						search:false,
						refresh: false,
						view: false
					});
			_this.doAddNavButtons();
		}
	},

	/**
	 *
	 */
	doAddNavButtons : function(){
		Core.log("NOT IMPLEMENTED EscoGrid.doAddNavButtons");
	},

	/**
	 * Add a navButton.
	 * @param caption : The label of the button.
	 * @param title : The label of the button
	 * @param image : The image of the button.
	 * @param action : The action of the button.
	 */
	_addANavButton : function(caption,title,image,action,type){
		this._theNavBar.navButtonAdd(this._options.ID_PAGER_GRID, {
	        caption: caption,
	        title: title,
	        buttonimg:image,
	        onClickButton: action,
	        type : type
	     });
	},


	/**
	 * Colorate the added items in the grid.
	 */
	_doColorateAddedItem : function(){
		if (this._options.COLORATE_ADDED_ITEMS){
			var _this = this;
			// management of added element
			$(this._options.ID_GRID +" tr:gt(0)").each(function() {
				if ($($(this).children()[_this._options.COLUMN_ADDED_VALUE]).html()=="true"){
					$(this).addClass("addedElement");
				}
			});
		}
	},

	/** Add Action on the select all */
	_addActionSelectAll : function (){
		var _this = this;
		if (_this._options.IS_SELECTABLE_GRID){


		$('input[id=cb_jqg]').unbind("click",functionClick);
		$('input[id=cb_jqg]').bind("click",functionClick);
		}
	},

	/**
	 * Add a specific action on click link Person (Specify in the child class).
	 * @param id : The id of the link.
	 */
	addActionOnClickLinkItemPerson : function (id){
		Core.log("NOT IMPLEMENTED : EscoGrid.addActionOnClickLinkItemPerson");
	},

	/**
	 * Add a specific action on click link Group (Specify in the child class).
	 * @param id : The id of the link.
	 */
	addActionOnClickLinkItemGroup : function (id){
		Core.log("NOT IMPLEMENTED : EscoGrid.addActionOnClickLinkItemGroup");
	},

	/**
	 * Add a specific action on click link Stem (Specify in the child class).
	 * @param id : The id of the link.
	 */
	addActionOnClickLinkItemStem : function (id){
		Core.log("NOT IMPLEMENTED : EscoGrid.addActionOnClickLinkItemStem");
	},

	/**
	 * C
	 */

	/**
	 * Do the action when click on the link item on the grid.
	 * @param ids : The id of items of the grid.
	 */
	_doOnClickLinkItem : function(ids){
		var _this = this;
		if (this._options.ACTION_ON_CLICK_LINK_ITEM){
			for ( var i = 0; i < ids.length; i++) {
				var id = $(this._options.ID_GRID).getCell(ids[i], this._options.COLUMN_ID_VALUE);
				if (_this._options.TYPE_OF_DATA == "GROUP-PERSON"){
					var type = $(this._options.ID_GRID).getCell(ids[i], this._options.COLUMN_TYPE_DATA);
				}else{
					var type = _this._options.TYPE_OF_DATA;
				}
				var display_name = $(this._options.ID_GRID).getCell(ids[i], this._options.COLUMN_LINK_VALUE);

				if (type=="PERSON"){
					if (this._options.IS_SELECTABLE_GRID){
						ce = "<a id='tablelink_" + id + "' class='tableLinkIcon'><span id='" + id + "' >" + display_name + "</span></a>";
					}else{
						ce = "<input id='inputLink_" + id + "' paramId='"+id+"' style='float:left;margin-left:3px;' type='image' src='/" + Core.applicationContext + "/media/imgs/action/14907.correction_change.gif'/><a id='tablelink_" + id + "' class='tableLink'><span id='" + id + "' >" + display_name + "</span></a>";
					}
					$(this._options.ID_GRID).setRowData(ids[i], {colLink : ce});
					_this.addActionOnClickLinkItemPerson("#tablelink_" + id);

				}else if (type=="GROUP"){
					var name = $(this._options.ID_GRID).getCell(ids[i], this._options.COLUMN_NAMEGROUP_VALUE);
					if (this._options.IS_SELECTABLE_GRID){
						ce = "<a id='tablelink_" + id + "' class='tableLinkIcon' displayName='"+display_name+"'><span id='" + name + "' idNode='"+id+"'>" + display_name + "</span></a>";
					}else{
						ce = "<input id='inputLink_" + id + "' paramId='"+id+"' style='float:left;margin-left:3px;' type='image' src='/" + Core.applicationContext + "/media/imgs/action/14907.correction_change.gif'/><a id='tablelink_" + id + "' displayName='"+display_name+"' class='tableLink'><span id='" + name + "' idNode='"+id+"'>" + display_name + "</span></a>";
					}
					$(this._options.ID_GRID).setRowData(ids[i], {colLink : ce});
					_this.addActionOnClickLinkItemGroup("#tablelink_" + id);
				}else if (type=="STEM"){
					var name = $(this._options.ID_GRID).getCell(ids[i], this._options.COLUMN_NAMEGROUP_VALUE);
					if (this._options.IS_SELECTABLE_GRID){
						ce = "<a id='tablelink_" + id + "' class='tableLinkIcon' displayName='"+display_name+"'><span id='" + name + "' idNode='"+id+"'>" + display_name + "</span></a>";
					}else{
						ce = "<input id='inputLink_" + id + "' paramId='"+id+"' style='float:left;margin-left:3px;' type='image' src='/" + Core.applicationContext + "/media/imgs/action/14907.correction_change.gif'/><a id='tablelink_" + id + "' displayName='"+display_name+"' class='tableLink'><span id='" + name + "' idNode='"+id+"'>" + display_name + "</span></a>";
					}
					$(this._options.ID_GRID).setRowData(ids[i], {colLink : ce});
					_this.addActionOnClickLinkItemStem("#tablelink_" + id);
				}
				var _id = id;
				if (!this._options.IS_SELECTABLE_GRID){
					$("#inputLink_" + _id).click(function(e){
						$("#tablelink_" + $(this).attr("paramId")).children("span").click();
					});
				}
			}
		}
	},

	/**
	 * Select the row selected on the grid.
	 * @param ids : The ids of the rows.
	 */
	_selectItemSelected: function(ids){
		if (this._options.IS_SELECTABLE_GRID){
			for ( var i = 0; i < ids.length; i++) {
				var select = $(this._options.ID_GRID).getCell(ids[i], this._options.COLUMN_SELECTED_VALUE );

				// Select or not the row.
				if (select == "true"){
					$("#jqg_"+(i+1)).attr("checked",true);
					// decrease number of row selected because next instruction increase it.
					this.nbRowSelected--;
					$(this._options.ID_GRID).setSelection(i + 1 + "");
				}
			}
		}
	},


	/**
	 *  Select or not the checkbox for all selected and affect the variable if existing added items.
	 *  @param data : the xhr request
	 */
	_doIsAllSelectedAndAddedItems : function(data){
		// Select All.
		if ($(data).find("isAllSelected").text() == "true"){
			$('input[id=cb_jqg]').attr('checked', true);
		}else{
			$('input[id=cb_jqg]').attr('checked', false);
		}
		// Added items
		this.isExistingAddedItems = $(data).find("isExistingAddedItem").text() == "true";
	},

	/** Send the rows selected. */
	_sendSelectedRows : function() {

		jQuery.ajaxSettings.async = false;
		var s = $(this._options.ID_GRID).getGridParam('selarrrow').toString();
		$.post(this._options.URL_SELECT_ROWS,
				{'rows': s,
				 'typeOfSelect':this._selectType},
				function(data) {
				});
		jQuery.ajaxSettings.async = true;
	},

	/**
	 * Method for update number of row selected for deletion.
	 */
	_updateRowSelectedInfo : function() {
		if (this._options.IS_SELECTABLE_GRID){
		//	Core.log("updateRowSelectedInfo with new value : " + this.nbRowSelected);

			if (this.nbRowSelected == 0) {
				$(this._options.ID_PAGER_GRID + " .nav-button .tbutton:eq("+this._options.DEL_NAV_BAR_POSITION+") td:eq(1)").text(this._lang.DEL_NAV_BAR_MESSAGE_DEFAULT);
			} else {
				try {
					$(this._options.ID_PAGER_GRID + " .nav-button .tbutton:eq("+this._options.DEL_NAV_BAR_POSITION+") td:eq(1)").text(this._lang.DEL_NAV_BAR_MESSAGE_CUSTOM.replace("{1}", this.nbRowSelected));
				} catch (e) {}
			}
		}
	},

	/**
	 * Enable the selectable option in the grid.
	 */
	_doSelectableGrid : function(status){
		if (this._options.IS_SELECTABLE_GRID){
			$('input[id=cb_jqg]').attr("disabled",!status);
		}
	},

	/**
	 * Show grid content.
	 * @param visibility : visible or hidden
	 */
	_visibilityOfGridContent : function (visiblilty){
		$("div[class=grid_bdiv]").css("visibility",visiblilty);
		$(this._options.ID_PAGER_GRID).css("visibility",visiblilty);
	},

	/**
	 * Show the pager grid of the grid.
	 */
	_showPagerGridContent : function(){
		jQuery(this._options.ID_PAGER_GRID + " > *").show();
	},

	/**
	 * Show the pager grid of the grid.
	 */
	_hidePagerGridContent : function(){
		jQuery(this._options.ID_PAGER_GRID + " > *").not(".navtable").hide();
	},

	/** Get if the grid is empty. */
	_isGridEmpty : function(){
		return $(this._options.ID_GRID).html() == "<TBODY></TBODY>" || $(this._options.ID_GRID).html() == "";
	},

	/** Clear the data in the grid. */
	_clearGridData : function(){
		$(this._options.ID_GRID).clearGridData();
	},

	/** Resize the grid. */
	_resizeGrid : function() {
		var _this = this;
		$(_this._options.ID_LOADING_GRID).css("min-height", "25px");
		if ($.browser["msie"]){
			$(_this._options.ID_LOADING_GRID).css("height", "35px");
		}
		$(_this._options.ID_LOADING_GRID).css("margin-bottom", "9px");

		// Resize the table
		$("div[class=grid_hdiv]").css("padding-right", "2px");
		$("div[class=grid_bdiv]").css("padding-right", "2px");
		$(_this._options.ID_PAGER_GRID).css("visibility", "visible");
		$(_this._options.ID_PAGER_GRID).css("margin-left", "1px");

		if ($.browser["mozilla"] && jQuery.browser.version.indexOf("1.9.0")>=0){
			$(_this._options.ID_PAGER_GRID).css("margin-left", "0px");
		}

		if ($.browser["msie"]){
			$(_this._options.ID_PAGER_GRID).css("width",($(_this._options.ID_PAGER_GRID).parent().children("[class=grid_hdiv]").css("width").substring(0,3)-1)+"px");
			$("tr[id*=empty]").children("td").each(function(){
				$(this).css("padding-top", "0px");
				$(this).css("padding-bottom", "0px");
				}
			);
		}else{
			$(_this._options.ID_PAGER_GRID).css("width",($(_this._options.ID_PAGER_GRID).parent().children("[class=grid_hdiv]").css("width").substring(0,3)-1)+"px");
		}

		//SOPRA
		if ($.browser["mozilla"] && jQuery.browser.version.substr(0,5)=="1.9.1"){
			$(_this._options.ID_PAGER_GRID).css("margin-left", "0px");
		}

		this.doResizeGrid();
	},

	doResizeGrid : function(){
	},

	/** Reload the grid */
	_reloadGrid : function(){
		$(this._options.ID_GRID).trigger('reloadGrid');
	},

	/** Add titles. */
	addTitle: function(){
		// Management of titles
		$(".scroll").find("img[id=first]").attr("title",Lang.getString("IMG_FIRST"));
		$(".scroll").find("img[id=prev]").attr("title",Lang.getString("IMG_PREV"));
		$(".scroll").find("img[id=next]").attr("title",Lang.getString("IMG_NEXT"));
		$(".scroll").find("img[id=last]").attr("title",Lang.getString("IMG_LAST"));
		$(".scroll").find("select").attr("title",Lang.getString("SELECT_PAGINATION"));
		$(".scroll").find("input[class=selbox]").attr("title",Lang.getString("SELECT_PAGE"));
	}

};
