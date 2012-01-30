/**
 *
 * @author aChesneau
 */
var PersonPrivilegesStemPrototype = $.extend( true, {}, EscoGrid ,{

	/**
    * {@inheritDoc}
    */
	doOnFire : function(){
		fluid.accessibletabs("escoTabs", "escoPanels");
		person.setMethodToCall("stem");
		return true;
	},

	/**
	 * {@inheritDoc}
	 */
	doActionOnFindData:function(data){
		person.getIsPersonModified();
	},

   /**
    * {@inheritDoc}
    */
	getPostDataToFindDataRequest : function(){
		var json = $.extend({
			personId : $("input[id=idPerson]").val(),
			privilegeType : $("input[name=privilegesRadio]:checked").val()
		}, Core.getUrlParams());
		Core.resetNavParams();
		return json;
	},

	/**
     * {@inheritDoc}
     */
	getIfSelectable : function(){
		privilegeRadioValue = $("input[name=privilegesRadio]:checked").val();
		if (privilegeRadioValue == "PRIVILEGE_RADIO_EFFECTIVE" ||	privilegeRadioValue == "PRIVILEGE_RADIO_ALL"){
			this._options.IS_SELECTABLE_GRID = false;
		} else {
			this._options.IS_SELECTABLE_GRID = true;
		}
	},

   /**
    * {@inheritDoc}
    */
	doIsMultipleViewGrid:function(){
		privilegeRadioValue = $("input[name=privilegesRadio]:checked").val();
		if (privilegeRadioValue == "PRIVILEGE_RADIO_EFFECTIVE" ||	privilegeRadioValue == "PRIVILEGE_RADIO_ALL"){
		}else{
			this._createNavBar();
			$("#pagerGrid_privilegeStem > *").not(".navtable").hide();
			$($("#pagerGrid_privilegeStem .nav-button")[1]).hide();
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
			this.nbRowSelected = parseInt($("#list_privilegeStem").attr("p").records, 10);
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
		privilegeRadioValue = $("input[name=privilegesRadio]:checked").val();

		if (privilegeRadioValue == "PRIVILEGE_RADIO_EFFECTIVE" || privilegeRadioValue == "PRIVILEGE_RADIO_ALL") {
			if (this.isExistingAddedItems){
				$("#subtitleWarningPrivilege").empty().append(this._lang.WARNING_MESSAGE);
			}else{
				$("#subtitleWarningPrivilege").empty();
			}
		}else{
			$("#subtitleWarningPrivilege").empty();
		}
	},

	/**
     * {@inheritDoc}
     */
	doOnLoadComplete:function(data){

		privilegeRadioValue = $("input[name=privilegesRadio]:checked").val();


		if ((privilegeRadioValue == "PRIVILEGE_RADIO_EFFECTIVE" || privilegeRadioValue == "PRIVILEGE_RADIO_ALL")) {
			$("table[class*=navtable]").css("display","none");
			$("input[class=cbox]").css("display","none");
		} else {
			try {
				$("table[class*=navtable]").css("display","block");
				$("input[class=cbox]").css("display","block");
			} catch (e) {
			}
		}

		if (privilegeRadioValue == "PRIVILEGE_RADIO_EFFECTIVE" || privilegeRadioValue == "PRIVILEGE_RADIO_ALL") {
			var imgChecked = "<img id=\"?\" src=\"/" + Core.applicationContext + "/media/imgs/checked_not_clickable.png\" checked=\"true\" style=\"width : 15px; height : 15px; cursor : pointer;\"/>";
			var imgUnChecked = "<img id=\"?\" src=\"/" + Core.applicationContext + "/media/imgs/unchecked_not_clickable.png\" checked=\"false\" style=\"width : 15px; height : 15px; cursor : pointer;\" />";
		}else{
			var imgChecked = "<img id=\"?\" src=\"/" + Core.applicationContext + "/media/imgs/checked.png\" checked=\"true\" style=\"width : 15px; height : 15px; cursor : pointer;\"/>";
			var imgUnChecked = "<img id=\"?\" src=\"/" + Core.applicationContext + "/media/imgs/unchecked.png\" checked=\"false\" style=\"width : 15px; height : 15px; cursor : pointer;\" />";
		}

		var ids = $(this._options.ID_GRID).getDataIDs();
		for ( var i = 0; i < ids.length; i++) {
			var cl = ids[i];

			for ( var j = 4; j < 6; j++) {
				var data = $(this._options.ID_GRID).getCell(i + 1, j);
				if (data === "1"){
					imgCheckedTmp = imgChecked.replace("?", cl + "_col" + j);
					$(this._options.ID_GRID).setCell(i + 1, j, imgCheckedTmp, "", {title : ""});
				} else {
					imgUnCheckedTmp = imgUnChecked.replace("?", cl + "_col" + j);
					$(this._options.ID_GRID).setCell(i + 1, j, imgUnCheckedTmp, "", {title : ""});
				}
			}

			if( !(privilegeRadioValue == "PRIVILEGE_RADIO_EFFECTIVE" || privilegeRadioValue == "PRIVILEGE_RADIO_ALL")) {
				$("#" + cl + "_col4").bind("click", ActionRightCheckBox.clickHasStemDefaultAction(this._options,person.getIsPersonModified));
				$("#" + cl + "_col4").attr("action" , "stem");

				$("#" + cl + "_col5").bind("click", ActionRightCheckBox.clickHasCreateDefaultAction(this._options,person.getIsPersonModified));
				$("#" + cl + "_col5").attr("action" , "group");
			}
		}
	},

	/**
     * {@inheritDoc}
     */
	addActionOnClickLinkItemStem : function (id){
		if (Profile.canAccessToStemProperties()){
			Core.addAction( $(id) ,
					Core.CLICK,
					function(e){
						_displayBlockUIOption = {
								onAfterShowBlockUI : function(){
									Core.log("Preparate open of node : "+ e.target.id );
									TreePlugin.openAndSelectNode(e.target.id);
						}
						};
						Core._showBlockUI(_displayBlockUIOption);
					});
		}else{
			$(id).removeClass("tableLink");
		}
	},

	/**
     * {@inheritDoc}
     */
	doAddNavButtons:function(){
		var _this = this;

		var addAction = ActionNavBar.actionAddStemSearchPerson(_this,"/" + Core.applicationContext + "/stylesheets/personProperties.jsf",2,true);
		this._addANavButton(
				this._lang.ADD_LABEL,
				this._lang.ADD_TITLE,
				"/" + Core.applicationContext + "/media/imgs/grid/10551.add_exc.gif",
				addAction,
				"add"
				);


		var delAction = ActionNavBar.actionDelDefault(_this,"/" + Core.applicationContext + "/ajax/personPrivilegesStemController/deleteItems.jsf",person.getIsPersonModified);
		this._addANavButton(
				this._lang.DEL_LABEL,
				this._lang.DEL_TITLE,
				"/" + Core.applicationContext + "/media/imgs/grid/14763.delete.gif",
				delAction,
				"del"
				);
	}
});

var PersonPrivilegesStem = new DUI.Class(PersonPrivilegesStemPrototype , $.screen);