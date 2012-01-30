var GroupDynamicBase = {

	/** The language value. */
	_lang : {},

	/** The context menu. */
	_contextMenu : null,

	/** Variable of the prefix of the child */
	_childPrefix : "child",

	/** The number of child added. */
	_childCount : 0,

	/** Variable of the prefix of the combo */
	_comboPrefix : "combo",

	/** The number of combo added. */
	_comboCount : 0,

	/** Variable of the prefix of the combo */
	_operatorPrefix : "operator",

	/** The number of operator combo added. */
	_operatorCount : 0,

	/** The map of left items.*/
	_selectItemsLeft : new Array(),

	/** The map of right items (Dynamic).*/
	_selectItemsRight : new Array(),

	/** The operator map */
	_operatorItems : null ,

	/** Already notify one change. */
	_alreadyNotifyChange : false,

	/** Can noify one change. */
	_canNotifyChange : false,

	/** The editable notion use or not. */
	_useEditable : false,

	/** save onTrue function from global action. */
	__onTrueCond__ : null,

	saveOnLoad : null,

	/** Default contructor. */
	init: function(lang, operators){
		this._lang = $.extend(this._lang,lang);
		this._operatorItems = operators;

		this.__onTrueCond__ = Core._optionGA.onTrue;
	},

	/** Function call when addScreen call. */
	fire:function(){
		this.initializeMapOfSelectItem();
		this.initAction();
		this.loadTree();
		if (GroupDynamicBase.saveOnLoad){
			Core.log("Call save on load in dynamic tab");
			jQuery.ajaxSettings.async = false;
			$("#groupSave").trigger(Core.CLICK);
			jQuery.ajaxSettings.async = true;
		}
		Core._hideBlockUI();
	},

	initAction : function() {

		var _this = this;

	  	// user stay in this page if the resquest is not valid.
	  	$('#escoPanels').bind('tabsselect', function(event, ui) {
	        var isValid = false;
	       	isValid =  _this.getStatusOfTheLdapRequest();
	       	_this.showOrHideErrorMessage(!isValid);
	       	if (isValid){
	       		_this.sendLdapRequest();
	       		_this.destroyUnUseComboDiv();
	       		$("#groupSave").unbind("group.save", save);
	       	}
	        return isValid;
		});
		/**$('#escoPanels').bind('tabsshow', function(event, ui) {
			// Tab call on save action in groupModification Tab.
			if (GroupDynamicBase.saveOnLoad){
				Core.log("Call save on load in dynamic tab");
				jQuery.ajaxSettings.async = false;
				$("#groupSave").trigger(Core.CLICK);
				jQuery.ajaxSettings.async = true;
			}
		});**/

		var clear = function() {
			// We send the request of cleanning all the objects
			$.post("/" + Core.applicationContext + "/ajax/groupDynamiqueController/clear.jsf", json, function(data) {});
		};
		$("#groupCancel").unbind("group.cancel", clear);
		$("#groupCancel").bind("group.cancel", clear);

	  	$("#treeLDAP").bind("notify",function(){
	  		_this.notifyChange();
	  	});

	  	/** redefine groupSave action. */
		var save = function(e, dataSave) {
			Core.log("Call save in dynamic tab");
			// Call Ajax
	       	isValid =  _this.getStatusOfTheLdapRequest();
	       	_this.showOrHideErrorMessage(!isValid);

	       	if (isValid) {
	       		_this.sendLdapRequest();
	       		_this.destroyUnUseComboDiv();

				dataSave.save = dataSave.save && true;
				Core.log("Resultat of save : " + dataSave.save);
	       	} else {
				dataSave.save = dataSave.save && false;
				Core.log("Resultat of save : " + dataSave.save);
			}
	       	return isValid;
		};
		$("#groupSave").unbind("group.save", save);
		$("#groupSave").bind("group.save", save);

	},


	/**
	 * Notify to controller that one change is appear.
	 */
	notifyChange : function(){
		if (this._canNotifyChange){
			if ( !this._alreadyNotifyChange){
				jQuery.ajaxSettings.async = false;
				$.post("/" + Core.applicationContext + "/ajax/groupDynamiqueController/notifyOneChange.jsf", {},
					function(data){
						groupDynamic._alreadyNotifyChange = true;
						groupModification.getIsGroupModified();
				});
				jQuery.ajaxSettings.async = true;
			}
		}
	},

	/**
	* Create a context menu item.
	* @param id : The id of the menu item.
	* @param label : The label of the menu item.
	* @param classCSS : The class css to apply to the menu item.
	* @param isVisibleFunction : The function to display or not the menu item.
	* @param actionFunction : The action to execute when the menu item is clicked.
	* @param separatorBefore : Display or not a separator before the menu item.
	* @return the new menu item construct with the different argument.
	*/
	createContextMenuItem: function(id,label,classCSS,isVisibleFunction,actionFunction,separatorBefore){
		eval("var result = {'"+id + "': {id : '"+id+"', label    : '"+label+"', icon     : '"+classCSS+"', visible : "+isVisibleFunction+",action  : "+actionFunction+",separator_before : "+separatorBefore+"}}");
		return result;
	},

	/** Get the next id of child. */
	_getNextChildId: function(){
		this._childCount ++;
		return this._childPrefix + this._childCount;
	},

	/** Get the next id of combo. */
	_getNextComboId: function(){
		this._comboCount ++;
		return this._comboPrefix + this._comboCount;
	},

	/** Get the next id of operator combo. */
	_getNextOperatorComboId: function(){
		this._operatorCount ++;
		return this._operatorPrefix + this._operatorCount;
	},

	/** Send the ldap request to controller. */
	sendLdapRequest:function(){
		var _this = this;
		jQuery.ajaxSettings.async = false;
		$.post("/" + Core.applicationContext + "/ajax/groupDynamiqueController/setLdapRequest.jsf", { ldapRequest : _this.getLDAPRequest()},
			function(data){
		});
		jQuery.ajaxSettings.async = true;
	},

	/** Destroy all div of the menu of combo box. */
	destroyUnUseComboDiv : function(){
		$("div[id*=attachSelectCombo]").each(function(){
			$(this).remove();
		});
	},

	/** hide or show the error message */
	showOrHideErrorMessage : function (isVisible){
		if (isVisible){
			this.showOrHideErrorMessageLoading(false);
			$("#errorPanel").css("visibility", "visible");
		}else{
			$("#errorPanel").css("visibility", "hidden");
		}
	},

	/** hide or show the error message */
	showOrHideErrorMessageLoading : function (isVisible){
		if (isVisible){
			this.showOrHideErrorMessage(false);
			$("#errorPanelLoading").css("visibility", "visible");
		}else{
			$("#errorPanelLoading").css("visibility", "hidden");
		}
	},

	/** Get status of the current ldap request. */
	getStatusOfTheLdapRequest : function (){
		var result = false;
		var _this = this;
		jQuery.ajaxSettings.async = false;
		$.post("/" + Core.applicationContext + "/ajax/groupDynamiqueController/checkLdapRequest.jsf", { ldapRequest : _this.getLDAPRequest()},
			function(data){
				if (Core.getStatus(data)) {
					result = true ;
				}
		});
		jQuery.ajaxSettings.async = true;
		return result;
	},

	/**
	* Get the ldap request.
	*/
	getLDAPRequest : function(){
		var firstNode = $("#ldapRoot").children(); // Necessary one child in the node root
		var firstLi = $(firstNode).children("li");
		if (firstLi.attr("name") == "and" ) return this.getAnd("#"+firstLi.attr("id"),0);
		else if (firstLi.attr("name") == "or" ) return this.getOr("#"+firstLi.attr("id"),0);
		else if (firstLi.attr("name") == "not" ) return this.getNot("#"+firstLi.attr("id"),0);
		else if (firstLi.attr("name") == "condition" ) return this.getCondition("#"+firstLi.attr("id"));
	},

	/**
	* Get the element ldap.
	* @param node : The node of ldap request.
	* @return the element ldap request.
	*/
	getElement : function(node){
		var firstLi = $(node);
		if (firstLi.attr("name") == "and" ) return this.getAnd("#"+firstLi.attr("id"),0);
		else if (firstLi.attr("name") == "or" ) return this.getOr("#"+firstLi.attr("id"),0);
		else if (firstLi.attr("name") == "not" ) return this.getNot("#"+firstLi.attr("id"),0);
		else if (firstLi.attr("name") == "condition" ) return this.getCondition("#"+firstLi.attr("id"));
	},

	/**
	* Get the complex element ldap.
	* @param node : The node of ldap request.
	* @param type : The type of the parent node.
	* @param i : The position of the node to analyze.
	* @param canReturnDirectly : If we can return directly the attribute.
	* @return the element ldap request.
	*/

	getComplexElement : function(node, type, i , canReturnDirectly){
		if (i >= $(node).children().children("li").size()-1 ){
			return this.getElement("#"+$($(node).children().children("li")[i]).attr("id"));
		}else if ( $(node).children().children("li").size() == 2 ){
			return this.getElement("#"+$($(node).children().children("li")[i]).attr("id"));
		}else if ( canReturnDirectly ){
			return this.getElement("#"+$($(node).children().children("li")[i]).attr("id"));
		}else{
			if (type == "and" ){
				return this.getAnd (node, i);
			}else if (type == "or" ){
				return this.getOr (node, i);
			}else if (type == "not" ){
				return this.getNot (node, i);
			}else if (type == "condition" ){
				return this.getCondition (node);
			}
		}
	},


	/**
	* Get the and element ldap request.
	* @param node : The node of ldap request.
	* @param i : The position of the node to analyze.
	* @return the element ldap request.
	*/
	getAnd : function(node,i){

		var result = "AND(";
		result += this.getComplexElement(node,"and",i, true);
		result += ",";
		result += this.getComplexElement(node,"and",i+1, false);
		result += ")";
		return result;
	},

	/**
	* Get the or element ldap request.
	* @param node : The node of ldap request.
	* @param i : The position of the node to analyze.
	* @return the element ldap request.
	*/
	getOr : function(node, i){
		var result = "OR(";
		result += this.getComplexElement(node,"or",i, true);
		result += ",";
		result += this.getComplexElement(node,"or",i+1, false);
		result += ")";
		return result;
	},

	/**
	* Get the not element ldap request.
	* @param node : The node of ldap request.
	* @param i : The position of the node to analyze.
	* @return the element ldap request.
	*/
	getNot : function(node, i){
		var result = "NOT(";
		result += this.getComplexElement(node,"not",i,true);
		result += ")";
		return result;
	},


	/**
	* Get the condition element ldap request.
	* @param node : The node of ldap request.
	* @return the element ldap request.
	*/
	getCondition :function(node){
		var leftValue = $($(node).find(".combo").children("[type=hidden]")[0]).attr("value");
		var middleValue = $($(node).find(".combo").children("[type=hidden]")[1]).attr("value");
		var rightValue = $($(node).find(".combo").children("[type=hidden]")[2]).attr("value");
		var postCond = "";
		var afterCond = "";


		if (middleValue == "!="){
			var postCond = "NOT(";
			var afterCond = ")";
			middleValue = "=";
		}

		if ( rightValue == undefined){
		// If it is not a list
			rightValue = $($(node).find("[name=rightAttr]").find("[type=text]")).attr("value");
			if (rightValue == this._lang.DEFAULT_INPUT_TEXT_LABEL
					|| rightValue == this._lang.DEFAULT_COMBO_BOX_LABEL
						|| rightValue == this._lang.DEFAULT_COMBO_BOX_EDITABLE_LABEL){
				rightValue = 'undefined';
			}
		}
		else if ( rightValue == "" ){
			// If it is a list
			rightValue = $($(node).find(".combo").children("[type=text]")[2]).attr("value");
			if (rightValue == this._lang.DEFAULT_INPUT_TEXT_LABEL
					|| rightValue == this._lang.DEFAULT_COMBO_BOX_LABEL
						|| rightValue == this._lang.DEFAULT_COMBO_BOX_EDITABLE_LABEL){
				rightValue = 'undefined';
			}
		}
		return postCond + leftValue + middleValue + rightValue + afterCond;
	},


	/** Initialize the map of items of the different select */
	initializeMapOfSelectItem : function(){
		var _this = this;
		_this._selectItemsLeft = new Array();
		_this._selectItemsRight = new Array();
		jQuery.ajaxSettings.async = false;
		$.post("/" + Core.applicationContext + "/ajax/groupDynamiqueController/getDropDownList.jsf", {},
			function(data){
				xml = $(data).children();
				/** Get all the item of the left combo box. */
				for ( i = 0 ; i < xml.children().size() ; i++ ){
					node = $(xml.children()[i]);
					oneLeftItem = {
						'value'   : $(node).attr("key"),
						'text'    : $(node).attr("value")
					};
					_this._selectItemsLeft.push(oneLeftItem);
					/** Get all the dynamic value of the rigth combo. */
					oneRightItem = {
							"value"    : $(node).attr("key"),
							"editable" : $(node).find("editable").text() == "true" || _this._useEditable, // Status of editability of the right item.
					        "type"     : $(node).find("type").text(), // Type of the rigth item.
							'wildcard' : $(node).find("wildcard").text() == "true", // If the wildcard is authorized.
							"data"     : new Array()  // Data of the rigth item.
							};
					for ( j = 0 ; j < $(node).find("dynamicAttribute").size() ; j++ ){
						aux = $(node).find("dynamicAttribute")[j];
						// If we are in this for, that is to say that it is a list the right combo box.
						oneListItem = {
							"value"   : $(aux).find("key").text(),
							"text"    : $(aux).find("value").text()
						};
						oneRightItem.data.push(oneListItem);
					}
					_this._selectItemsRight[$(node).attr("key")] = oneRightItem;
				}
			}
		);
		jQuery.ajaxSettings.async = true;
	},

	/**
	* Create the combo box.
	* @param id : The id of the container.
	* @param defaultValue : The default value of the combo box.
	* @param theMap : The list of values of the combo box.
	* @param editable : Set if we can edit the value.
	*/
	_createComboBox:function(id, defaultValue, editable, theMap, theSkin, leftComboFunction){
	   var skin = theSkin;
	   var date = new Date();

	   var attachSelectCombo = "attachSelectCombo"+date.getTime();

	   if (skin == undefined ){
		skin = "sexy";
	   }

		$("body").append("<div class='combo "+skin+"' id='"+attachSelectCombo+"' name='"+id+"' style='position:absolute'></div>");


	   if ( leftComboFunction == undefined ){
			leftComboFunction = function(){
				$("#treeLDAP").trigger("notify");
			};
	   }

	   var combo = $.sexyCombo.create({
		          'id'                  : id,
		          'name'                : id,
				  'skin'                : skin,
				  'autoFill'            : editable,
		          'container'           : "#"+id,
				  'triggerSelected'     : (defaultValue == undefined || defaultValue == ""),
				  'emptyText'           : defaultValue,
				  'listContainer'       : "#"+attachSelectCombo,
		          'data'                : theMap,
				  'textChangeCallback'  : leftComboFunction
		      });

	  $("#"+ id +" li").each(function(){
			$(this).css("background-image","url(null.jpg)");
			$(this).css("overflow","visible");
		});
	  return combo;
	},

	/**
	* Create the left combo box.
	* @param id : The id of the container.
	* @param defaultValue : The default value of the combo box.
	*/
	createLeftComboBox:function(id, defaultValue,userValue){
		var theFunction = function(){
			$("#treeLDAP").trigger("notify");
			groupDynamic.createRightComboBoxOrInput(this.config.id);
		};

		this._createComboBox(id,defaultValue,false,this._selectItemsLeft,undefined,theFunction);
	},

	/**
	* Create the right combo box.
	* @param id : The id of the container.
	* @param defaultValue : The default value of the combo box.
	* @param editable : Set if we can edit the value.
	* @param wildcard : Set if the wildcard is authorized.
	*/
	createRightComboBox:function(id, defaultValue, editable, wildcard,theList){
		var theWilcardFunction = function(){
			this["input"].attr("value",this.getTextValue().replace(/\**/g,""));
			$("#treeLDAP").trigger("notify");
		};

		if (!wildcard){
			this._createComboBox(id,defaultValue,editable,theList,undefined,theWilcardFunction);
		}else{
			this._createComboBox(id,defaultValue,editable,theList);
		}
	},

	/**
	* Create the right combobox or input.
	* @param id : The id of the left item.
	*/
	createRightComboBoxOrInput:function(id){
		var item = this._selectItemsRight[$("select[id="+id+"] :selected").val()];

		// The right element is list
		if (item.type == "list" && item.data != null && item.data.length>0){
			$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name=rightAttr]").empty();
			nextId = groupDynamic._getNextComboId();
			$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name=rightAttr]").append("<div id="+nextId+" style='display: inline-block;'/>");
			groupDynamic.createRightComboBox(nextId,this._lang.DEFAULT_COMBO_BOX_EDITABLE_LABEL, item.editable, item.wildcard, item.data );

		}else if (item.type == "request"){
			var _this = this;

			jQuery.ajaxSettings.async = false;

			$.post("/" + Core.applicationContext + "/ajax/groupDynamiqueController/getDropDownRequest.jsf",{attribute:item.value},function(data){
				xml = $(data).children();
				/** Get all the item of the left combo box. */
					node = $(xml.children()[0]);
					/** Get all the dynamic value of the rigth combo. */
					oneRightItem = {
							"editable" : $(node).find("editable").text()=="true" || _this._useEditable, // Status of editability of the right item.
					        "type"     : $(node).find("type").text(), // Type of the rigth item.
							'wildcard' : $(node).find("wildcard").text() == "true", // If the wildcard is authorized.
							"data"     : new Array()  // Data of the rigth item.
							};
					for ( j = 0 ; j < $(node).find("dynamicAttribute").size() ; j++ ){
						aux = $(node).find("dynamicAttribute")[j];
						// If we are in this for, that is to say that it is a list the right combo box.
						oneListItem = {
							"value"   : $(aux).find("key").text(),
							"text"    : $(aux).find("value").text()
						};
						oneRightItem.data.push(oneListItem);
					}
					_this._selectItemsRight[$(node).attr("key")] = oneRightItem;
			});
			jQuery.ajaxSettings.async = true;
			item = this._selectItemsRight[$("select[id="+id+"] :selected").val()];

			if (item == undefined || item.data == null || $(item.data).size() == 0 ){
				idAux = new Date().getTime();
				$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name=rightAttr]").empty();
				$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name=rightAttr]").append("<input type='text' id='"+idAux+"' name='"+id+"' class='normalInput' value='"+this._lang.DEFAULT_INPUT_TEXT_LABEL+"'/>");

				// Attach event
				$("#"+idAux).bind("click", function(e) {
					if (groupDynamic._lang.DEFAULT_INPUT_TEXT_LABEL == $(this).attr("value") ){
						$(this).attr("value","");
						$(this).removeClass("normalInput").addClass("normalInputLoaded");
					}
				 });

				$("#"+idAux).bind("blur", function(e) {
					if ("" == $(this).attr("value") ){
						$(this).attr("value",groupDynamic._lang.DEFAULT_INPUT_TEXT_LABEL);
						$(this).removeClass("normalInputLoaded").addClass("normalInput");
					}
				});

				$("#"+idAux).bind("keydown", function(e) {
					e.stopImmediatePropagation();
				 });

				$("#"+idAux).bind("keypress", function(e) {
					$("#treeLDAP").trigger("notify");
				});

			}else{
				$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name=rightAttr]").empty();
				nextId = groupDynamic._getNextComboId();
				$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name=rightAttr]").append("<div id="+nextId+" style='display: inline-block;'/>");
				groupDynamic.createRightComboBox(nextId,groupDynamic._lang.DEFAULT_COMBO_BOX_EDITABLE_LABEL, item.editable, item.wildcard, item.data );
			}
		}else{
			idAux = new Date().getTime();
			$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name=rightAttr]").empty();
			$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name=rightAttr]").append("<input type='text' id='"+idAux+"' name='"+id+"' class='normalInput' value='"+this._lang.DEFAULT_INPUT_TEXT_LABEL+"'/>");

			// Attach event
			$("#"+idAux).bind("click", function(e) {
				if (groupDynamic._lang.DEFAULT_INPUT_TEXT_LABEL == $(this).attr("value") ){
					$(this).attr("value","");
					$(this).removeClass("normalInput").addClass("normalInputLoaded");
				}
			 });

			$("#"+idAux).bind("keydown", function(e) {
				e.stopImmediatePropagation();
			 });

			$("#"+idAux).bind("blur", function(e) {
				if ("" == $(this).attr("value") ){
					$(this).attr("value",groupDynamic._lang.DEFAULT_INPUT_TEXT_LABEL);
					$(this).removeClass("normalInputLoaded").addClass("normalInput");
				}
			});

			$("#"+idAux).bind("keyup", function(e) {
				$("#treeLDAP").trigger("notify");
			});

			if (!item.wildcard){
				$("#"+idAux).unbind("keyup");
				$("#"+idAux).bind("keyup", function(e) {
					$("#"+e.target.id).attr("value",$("#"+e.target.id).attr("value").replace(/\**/g,""));
					$("#treeLDAP").trigger("notify");
				});

			}

		}
	},

	/**
	* Create the operator combo box.
	* @param id : The id of the container.
	* @param defaultValue : The default value of the combo box.
	*/
	createOperatorComboBox:function(id, defaultValue){
		this._createComboBox(id,defaultValue,false, this._operatorItems, "operator");
	},

	createNode : function( parent, node){
		if ($(node).attr("type") == "and"){
			this.createNodeAnd ( parent, node);
		}else if ($(node).attr("type") == "or"){
			this.createNodeOr ( parent, node);
		}else if ($(node).attr("type") == "not"){
			this.createNodeNot ( parent, node);
		}else if ($(node).attr("type") == "condition"){
			if(jQuery.browser["msie"]){
				this.createNodeConditionIE(parent, node);
			}else{
				this.createNodeConditionFF(parent, node);
			}

		}
		this.addTitleToIcon();
	},

	/** Create the and node */
	createNodeAnd : function( parent, node){
		var li = treeLdap.create({
			attributes: { id : groupDynamic._getNextChildId(), name : $(node).attr("type") },
			state: "close",
			data: { title : this._lang.NODE_AND, icon : "/" + Core.applicationContext + "/media/imgs/groupDynamic/10551.add_exc.gif"} },parent, "inside");
			for (var i = 0 ; i < $(node).children().size() ; i ++ ){
				this.createNode(li,$(node).children()[i] );
			}
	},

	/** Create the or node */
	createNodeOr : function( parent, node){
		var li = treeLdap.create({
			attributes: { id : groupDynamic._getNextChildId(), name : $(node).attr("type") },
			state: "close",
			data: { title : this._lang.NODE_OR, icon : "/" + Core.applicationContext + "/media/imgs/groupDynamic/10702.choice_obj.gif"} },parent, "inside");
		for (var i = 0 ; i < $(node).children().size() ; i ++ ){
			this.createNode(li,$(node).children()[i] );
		}
	},

	/** Create the or node */
	createNodeNot : function( parent, node){
		var li = treeLdap.create({
			attributes: { id : groupDynamic._getNextChildId(), name : $(node).attr("type") },
			state: "close",
			data: { title : this._lang.NODE_NOT, icon : "/" + Core.applicationContext + "/media/imgs/groupDynamic/14315.hprio_tsk.gif"} },parent, "inside");
		for (var i = 0 ; i < $(node).children().size() ; i ++ ){
			this.createNode(li,$(node).children()[i] );
		}
	},

	createNodeConditionFF : function(parent, node ){
		var li = treeLdap.create({
		attributes: { id : groupDynamic._getNextChildId(), name : "condition" },
		state: "close",
		data: { title : "", icon : "/" + Core.applicationContext + "/media/imgs/groupDynamic/13047.processinginst.gif"} },parent, "inside");

		nextIdLeft = groupDynamic._getNextComboId();
		li.append("<div id="+nextIdLeft+" style='display: inline-block;  .float:left; margin-left:5px;'/>");
		groupDynamic.createLeftComboBox(nextIdLeft, this._lang.DEFAULT_COMBO_BOX_LABEL);

		nextIdOperator = groupDynamic._getNextOperatorComboId();
		li.append("<div id="+nextIdOperator+" style='display: inline-block; .float:left; clear:none;'/>");
		groupDynamic.createOperatorComboBox(nextIdOperator,"");

		li.append("<div name='rightAttr' style='display: inline-block; clear:none;'><input type='text' class='normalInput' onFocus='this.blur()' value='"+this._lang.DEFAULT_COMBO_BOX_EDITABLE_LABEL+"'/></div>");

		// Left member
		var nodeAux = null;

		for (var j = 0 ; j < $(node).children().size(); j++){
			if ($($(node).children()[j]).attr("type") == "left"){
				nodeAux = $(node).children()[j];
				break;
			}
		}
		var aux = $("div[name="+nextIdLeft+"]").find("li[id='"+$(nodeAux).attr("value")+"']");
		aux.click();

		nodeAux = null;
		for (var j = 0 ; j < $(node).children().size(); j++){
			if ($($(node).children()[j]).attr("type") == "operator"){
				nodeAux = $(node).children()[j];
				break;
			}
		}

		// Operator member
		aux = $("div[name="+nextIdOperator+"]").find("li[id='"+$(nodeAux).attr("value")+"']");
		aux.click();

		// RightMember
		nodeAux = null;
		for (var j = 0 ; j < $(node).children().size(); j++){
			if ($($(node).children()[j]).attr("type") == "right"){
				nodeAux = $(node).children()[j];
				break;
			}
		}

		var item = this._selectItemsRight[$("select[id="+nextIdLeft+"] :selected").val()];

		if ($("input[name='"+nextIdLeft+"']").val() != undefined ){
			$("input[name='"+nextIdLeft+"']").attr("value",$(nodeAux).attr("value"));
			$("input[name='"+nextIdLeft+"']").removeClass("normalInput").addClass("normalInputLoaded");
		}else if (item == undefined || item.data == null || $(item.data).size() == 0 ){

			idAux = new Date().getTime();
			$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name=rightAttr]").empty();
			$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name=rightAttr]").append("<input type='text' id='"+idAux+"' name='"+id+"' class='normalInput' value='"+$(nodeAux).attr("value")+"'/>");

			// Attach event
			$("#"+idAux).bind("click", function(e) {
				if (groupDynamic._lang.DEFAULT_INPUT_TEXT_LABEL == $(this).attr("value") ){
					$(this).attr("value","");
					$(this).removeClass("normalInput").addClass("normalInputLoaded");
				}
			 });

			$("#"+idAux).bind("blur", function(e) {
				if ("" == $(this).attr("value") ){
					$(this).attr("value",groupDynamic._lang.DEFAULT_INPUT_TEXT_LABEL);
					$(this).removeClass("normalInputLoaded").addClass("normalInput");
				}
			});

			$("#"+idAux).bind("keypress", function(e) {
				$("#treeLDAP").trigger("notify");
			});

		}else{
			var idAux = $("#"+nextIdLeft).parent().children("div[name=rightAttr]").children().attr("id");
			aux = $("div[name="+idAux+"]").find("li[id='"+$(nodeAux).attr("value")+"']");
			if (aux.html() == null){
				$("#"+nextIdLeft).parent().children("div[name=rightAttr]").find("input[type=text]").attr("value",$(nodeAux).attr("value"));
				$("#"+nextIdLeft).parent().children("div[name=rightAttr]").find("input[type=text]").removeClass("normalInput").addClass("normalInputLoaded");
			}else{
				aux.click();
			}
		}

	},

	createNodeConditionIE : function(parent, node ){
		var li = treeLdap.create({
			attributes: { id : groupDynamic._getNextChildId(), name : "condition" },
			state: "close",
			data: { title : "", icon : "/" + Core.applicationContext + "/media/imgs/groupDynamic/13047.processinginst.gif"} },parent, "inside");

			nextIdLeft = groupDynamic._getNextComboId();
			li.append("<div id="+nextIdLeft+" style='display: inline-block;  .float:left; margin-left:5px;'/>");
			groupDynamic.createLeftComboBox(nextIdLeft, this._lang.DEFAULT_COMBO_BOX_LABEL);

			nextIdOperator = groupDynamic._getNextOperatorComboId();
			li.append("<div id="+nextIdOperator+" style='display: inline-block; .float:left; clear:none;'/>");
			groupDynamic.createOperatorComboBox(nextIdOperator,"");

			li.append("<div name='rightAttr' style='display: inline-block; clear:none;'><input type='text' class='normalInput' onFocus='this.blur()' value='"+this._lang.DEFAULT_COMBO_BOX_EDITABLE_LABEL+"'/></div>");

			// Left member
			var nodeAux = null;

			for (var j = 0 ; j < $(node).children().size(); j++){
				if ($($(node).children()[j]).attr("type") == "left"){
					nodeAux = $(node).children()[j];
					break;
				}
			}
			var aux = $("div[name*='"+nextIdLeft+"']").find("li[id='"+$(nodeAux).attr("value")+"']");
			aux.click();

			nodeAux = null;
			for (var j = 0 ; j < $(node).children().size(); j++){
				if ($($(node).children()[j]).attr("type") == "operator"){
					nodeAux = $(node).children()[j];
					break;
				}
			}

			// Operator member
			aux = $("div[name*='"+nextIdOperator+"']").find("li[id='"+$(nodeAux).attr("value")+"']");
			aux.click();

			// RightMember
			nodeAux = null;
			for (var j = 0 ; j < $(node).children().size(); j++){
				if ($($(node).children()[j]).attr("type") == "right"){
					nodeAux = $(node).children()[j];
					break;
				}
			}

			var item = this._selectItemsRight[$("select[id="+nextIdLeft+"] :selected").val()];

			if ($("input[name='"+nextIdLeft+"']").val() != undefined ){
				$("input[name='"+nextIdLeft+"']").attr("value",$(nodeAux).attr("value"));
				$("input[name='"+nextIdLeft+"']").removeClass("normalInput").addClass("normalInputLoaded");
			}else if (item == undefined || item.data == null || $(item.data).size() == 0 ){

				idAux = new Date().getTime();
				$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name*=rightAttr]").empty();
				$("select[id="+id+"] :selected").parent().parent().parent().parent().children("div[name*=rightAttr]").append("<input type='text' id='"+idAux+"' name='"+id+"' class='normalInput' value='"+$(nodeAux).attr("value")+"'/>");

				// Attach event
				$("#"+idAux).bind("click", function(e) {
					if (groupDynamic._lang.DEFAULT_INPUT_TEXT_LABEL == $(this).attr("value") ){
						$(this).attr("value","");
						$(this).removeClass("normalInput").addClass("normalInputLoaded");
					}
				 });

				$("#"+idAux).bind("blur", function(e) {
					if ("" == $(this).attr("value") ){
						$(this).attr("value",groupDynamic._lang.DEFAULT_INPUT_TEXT_LABEL);
						$(this).removeClass("normalInputLoaded").addClass("normalInput");
					}
				});

				$("#"+idAux).bind("keypress", function(e) {
					$("#treeLDAP").trigger("notify");
				});

			}else{
				var idAux = $("#"+nextIdLeft).parent().children("div[name=rightAttr]").children().attr("id");
				aux = $("div[name*='"+idAux+"']").find("li[id='"+$(nodeAux).attr("value")+"']");
				if (aux.html() == null){
					$("#"+nextIdLeft).parent().children("div[name=rightAttr]").find("input[type=text]").attr("value",$(nodeAux).attr("value"));
					$("#"+nextIdLeft).parent().children("div[name=rightAttr]").find("input[type=text]").removeClass("normalInput").addClass("normalInputLoaded");
				}else{
					aux.click();
				}
			}

	},

	/** Load the tree with pre save data */
	loadTree: function(){
		var _this = this;
		jQuery.ajaxSettings.async = false;
		$.post("/" + Core.applicationContext + "/ajax/groupDynamiqueController/getDynamicGroupTree.jsf",{},function(data){
			xml = $(data).children();
				if (xml.find("operation").size()>0){
						_this.createNode($("#ldapRoot"),xml.children());
				}else{
					if ($("#isCreationView").val()!="true"){
						// Notify error
						_this.showOrHideErrorMessageLoading(true);
					}
				}
		});
		jQuery.ajaxSettings.async = true;
		this._canNotifyChange = true;
	},

	/** Get the context menu. */
	getMenuContext: function(){
		if (this._contextMenu == null){
			var items = { items : {create:false, rename:false,remove : false} };

			/** The and action menu item */
			var isVisibleAndAction = function (NODE, TREE_OBJ) {
				var childID = $(NODE).attr("id");
				if( childID == "ldapRoot" && $("#"+childID+">ul").children().size()>=1) return false;
				if( $(NODE).attr("name")=="and") return false;
				if( $(NODE).attr("name")=="not" && $("#"+childID+">ul").children().size()>=1) return false;
				if( $(NODE).attr("name")=="condition") return false;
				return true;
			};
			var andAction = function (NODE, TREE_OBJ) {
				treeLdap.create({
					attributes: { id : groupDynamic._getNextChildId(), name : "and" },
					state: "close",
					data: { title : groupDynamic._lang.NODE_AND, icon : "/" + Core.applicationContext + "/media/imgs/groupDynamic/10551.add_exc.gif"} },NODE, "inside");
				$("#treeLDAP").trigger("notify");
				groupDynamic.addTitleToIcon();
			};
			$.extend(items.items,	this.createContextMenuItem('add_action',groupDynamic._lang.NODE_AND,'and',isVisibleAndAction,andAction,false));

			/** The or action menu item */
			var isVisibleOrAction = function (NODE, TREE_OBJ) {
				var childID = $(NODE).attr("id");
				if( childID == "ldapRoot" && $("#"+childID+">ul").children().size()>=1) return false;
				if( $(NODE).attr("name")=="or") return false;
				if( $(NODE).attr("name")=="not" && $("#"+childID+">ul").children().size()>=1) return false;
				if( $(NODE).attr("name")=="condition") return false;
			};
			var orAction = function (NODE, TREE_OBJ) {
				treeLdap.create({
					attributes: { id : groupDynamic._getNextChildId(), name : "or" },
					state: "close",
					data: { title : groupDynamic._lang.NODE_OR, icon : "/" + Core.applicationContext + "/media/imgs/groupDynamic/10702.choice_obj.gif"} },NODE, "inside");
				$("#treeLDAP").trigger("notify");
				groupDynamic.addTitleToIcon();
			};
			$.extend(items.items,	this.createContextMenuItem('or_action',groupDynamic._lang.NODE_OR,'or',isVisibleOrAction,orAction,false));

			/** The not action menu item */
			var isVisibleNotAction = function (NODE, TREE_OBJ) {
				var childID = $(NODE).attr("id");
				if( childID == "ldapRoot" && $("#"+childID+">ul").children().size()>=1) return false;
				if( $(NODE).attr("name")=="not") return false;
				if( $(NODE).attr("name")=="condition") return false;
			};
			var notAction = function (NODE, TREE_OBJ) {
				var li = treeLdap.create({
						attributes: { id : groupDynamic._getNextChildId(), name : "not" },
						state: "close",
						data: { title : ""+groupDynamic._lang.NODE_NOT, icon : "/" + Core.applicationContext + "/media/imgs/groupDynamic/14315.hprio_tsk.gif"} },NODE, "inside");
				$("#treeLDAP").trigger("notify");
				groupDynamic.addTitleToIcon();
				};
			$.extend(items.items,	this.createContextMenuItem('not_action',groupDynamic._lang.NODE_NOT,'not',isVisibleNotAction,notAction,false));

			/** The condition action menu item */
			var isVisibleConditionAction = function (NODE, TREE_OBJ) {
				var childID = $(NODE).attr("id");
				if( childID == "ldapRoot" && $("#"+childID+">ul").children().size()>=1) return false;
				if( $(NODE).attr("name")=="not" && $("#"+childID+">ul").children().size()>=1) return false;
				if( $(NODE).attr("name")=="condition") return false;
			};
			var conditionAction = function (NODE, TREE_OBJ) {
				var li = treeLdap.create({
							attributes: { id : groupDynamic._getNextChildId(), name : "condition" },
							state: "close",
							data: { title : "", icon : "/" + Core.applicationContext + "/media/imgs/groupDynamic/13047.processinginst.gif"} },NODE, "inside");
				$("#treeLDAP").trigger("notify");

				nextId = groupDynamic._getNextComboId();
				li.append("<div id="+nextId+" style='display: inline-block;  .float:left; margin-left:5px;'/>");
				groupDynamic.createLeftComboBox(nextId,groupDynamic._lang.DEFAULT_COMBO_BOX_LABEL);

				nextId = groupDynamic._getNextOperatorComboId();
				li.append("<div id="+nextId+" style='display: inline-block; .float:left; clear:none;'/>");
				groupDynamic.createOperatorComboBox(nextId,"");

				li.append("<div name='rightAttr' style='display: inline-block; clear:none;'><input type='text' class='defaultInput' onFocus='this.blur()' value='"+groupDynamic._lang.DEFAULT_COMBO_BOX_EDITABLE_LABEL+"'/></div>");
				groupDynamic.addTitleToIcon();
			};
			$.extend(items.items,	this.createContextMenuItem('condition_action',groupDynamic._lang.NODE_CONDITION,'condition',isVisibleConditionAction,conditionAction,false));

			/** The delete action menu item */
			var isVisibleDeleteAction = function (NODE, TREE_OBJ) { if($(NODE).attr("id") == "ldapRoot") return false;return true; };
			var deleteAction = function (NODE, TREE_OBJ) {
				$.each(NODE, function () {
					TREE_OBJ.remove(this);
				});
				$("#treeLDAP").trigger("notify");
			};
			$.extend(items.items,	this.createContextMenuItem('delete_action',this._lang.NODE_DELETE,'delete',isVisibleDeleteAction,deleteAction,true));

			this._contextMenu = items;
		}
		return this._contextMenu;
	},

	addTitleToIcon : function(){
		$("#ldapRoot").find("ins").attr("title",Lang.getString("ICON_ROOT"));
		$.each($("#treeLDAP").find("ins"),function(){
			var type = $(this).parent().parent().attr("name");
			if (type == "not"){
				$(this).attr("title",Lang.getString("ICON_NOT"));
			}else if (type == "and"){
				$(this).attr("title",Lang.getString("ICON_AND"));
			}else if (type == "condition"){
				$(this).attr("title",Lang.getString("ICON_CONDITION"));
			}else if (type == "or"){
				$(this).attr("title",Lang.getString("ICON_OR"));
			}
		});
	}
};

var GroupDynamic = new DUI.Class( GroupDynamicBase, $.screen);


GroupModificationsBase._options.onBeforeSave.push(function(){

	var callDynamicTab = false;
	var dynamicValue = $('input[name=groupDynamique] + a').attr("title");
	/**
	 * redefine groupSave action.
	 * click on tab if dynamic group does not selected.
	 */
	var callDynamicSave = function(e, dataSave) {
			Core.log("Call on save for verify if request is good.");
			var tabSelected = $(".ui-tabs-selected a").attr("title");
			if ( dynamicValue != null && tabSelected != dynamicValue && callDynamicTab === false){

				var $tabs = $('#escoPanels').tabs();
				calculateIndex = function (){
					var index = 0;
					jQuery.each($(".ui-tabs-nav li"), function(indexTab, tab){
					    if (tab.textContent == dynamicValue){
							index = indexTab;
					    }
					});
					return index;
				};
				GroupDynamicBase.saveOnLoad = true;

				$tabs.tabs('select', calculateIndex());
				$(".ui-tabs-nav li a[title="+dynamicValue+"]").click();

				callDynamicTab = true;
			} else {
				GroupDynamicBase.saveOnLoad =  false;
				callDynamicTab = false;
			}

			dataSave.save = dataSave.save && !callDynamicTab;
			Core.log("Resultat of save : " + dataSave.save);
	};

	$("#groupSave").unbind("group.save", callDynamicSave);
	$("#groupSave").bind("group.save", callDynamicSave);
});







