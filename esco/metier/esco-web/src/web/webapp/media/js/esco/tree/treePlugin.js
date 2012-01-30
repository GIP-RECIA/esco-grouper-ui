/**
 * @author aChesneau
 */
var TreePlugin = {

	nextNodeToOpen : {
		nextId : 1,
		nextNode : "",
		nameOfNodeToOpen : ""
	},

	/**
	 * Method to open a node in the tree when if don't know if he is open.
	 */
	openAndSelectNode : function( nameOfNode ){

		if ( nameOfNode != undefined){
			Core.log("TreePlugin.openAndSelectNode("+nameOfNode+")");
			this.nextNodeToOpen.nameOfNodeToOpen = nameOfNode;
		}

		this.nextNodeToOpen.nextNode = "";
		var tabDisplay = this.nextNodeToOpen.nameOfNodeToOpen.split(":");

		for (j=0; j<this.nextNodeToOpen.nextId ; j++){
			this.nextNodeToOpen.nextNode += tabDisplay[j] + ":";
		}
		this.nextNodeToOpen.nextNode = this.nextNodeToOpen.nextNode.substring(0, this.nextNodeToOpen.nextNode.length - 1);


		var node = $("li[displayName="+this.nextNodeToOpen.nextNode+"]");

		var openNode = node.attr("typeNode") == "FOLDER" && tabDisplay.length != this.nextNodeToOpen.nextId ;

		if (openNode){
			if (node.hasClass("closed")){
				this.nextNodeToOpen.nextId ++;
				_this = this;
				var functionToExecuteAfter = function(){
					_this.openAndSelectNode();
				};
				tree.open_branch(node,false,functionToExecuteAfter);
			}else{
				this.nextNodeToOpen.nextId ++;
				this.openAndSelectNode();
			}
		}else{
			// It is the last node
			this.nextNodeToOpen.nextNode = "";
			this.nextNodeToOpen.nameOfNodeToOpen = "";
			this.nextNodeToOpen.nextId = 1;
			tree.select_node(node);
			node.children("a").click();
			Core._hideBlockUI();
		}
	},

	/**
	 * Method to open a node in the tree when if don't know if he is open.
	 */
	openAndSelectParent : function( nameOfNode ){

		if ( nameOfNode != undefined){
			Core.log("TreePlugin.openAndSelectNode("+nameOfNode+")");
			this.nextNodeToOpen.nameOfNodeToOpen = nameOfNode;
		}

		this.nextNodeToOpen.nextNode = "";
		var tabDisplay = this.nextNodeToOpen.nameOfNodeToOpen.split(":");

		for (j=0; j<this.nextNodeToOpen.nextId ; j++){
			this.nextNodeToOpen.nextNode += tabDisplay[j] + ":";
		}
		this.nextNodeToOpen.nextNode = this.nextNodeToOpen.nextNode.substring(0, this.nextNodeToOpen.nextNode.length - 1);


		var node = $("li[displayName="+this.nextNodeToOpen.nextNode+"]");

		var openNode = node.attr("typeNode") == "FOLDER" && tabDisplay.length != this.nextNodeToOpen.nextId ;

		if (openNode){
			if (node.hasClass("closed")){
				this.nextNodeToOpen.nextId ++;
				_this = this;
				var functionToExecuteAfter = function(){
					_this.openAndSelectParent();
				};
				tree.open_branch(node,false,functionToExecuteAfter);
			}else{
				this.nextNodeToOpen.nextId ++;
				this.openAndSelectParent();
			}
		}else{
			// It is the last node
			this.nextNodeToOpen.nextNode = "";
			this.nextNodeToOpen.nameOfNodeToOpen = "";
			this.nextNodeToOpen.nextId = 1;
			Core._hideBlockUI();
		}
	},

	/**
	 * Refresh the current node
	 * @param parentIsAlreadySelected if the parent is selected or not.
	 */
	refreshNodeOfTree : function(parentIsAlreadySelected){

		var parent=null;
		if(parentIsAlreadySelected != undefined && parentIsAlreadySelected == false  ){
			parent = tree.parent($("a[class=clicked]"));
		}else{
			parent = $("a[class=clicked]");
		}

		tree.refresh(parent);

		Validate.closeAllValidatePromptsOpen();
	},

	/**
	 * Method to select a node in the tree
	 */
	select_node:function(attrName,attrValue){
		Core.log("TreePlugin.select_node("+attrName+","+attrValue+")");
		if (attrValue != ":" && attrValue[0]==":"){
			attrValue = attrValue.substring(1,attrValue.length);
		}
		tree.deselect_branch($("a[class=clicked]"));
		tree.select_node($("li["+attrName +"="+ attrValue +"]"));
	},

	addTitleToIcon : function(){
		$.each($("#arbo").find("ins"),function(){
			var right = $(this).parent().parent().attr("RIGHT");
			if ( $(this).parent().parent().attr("typeNode") == "ROOT" ){
				right == "";
			}
			if (right == "FOLDER"){
				$(this).attr("title",Lang.getString("ICON_FOLDER"));
			}else if (right == "GROUP"){
				$(this).attr("title",Lang.getString("ICON_GROUP"));
			}else if (right == "ALL"){
				$(this).attr("title",Lang.getString("ICON_ALL"));
			}else if (right == "NONE"){
				$(this).attr("title",Lang.getString("ICON_NONE"));
			}else if (right == "view"){
				$(this).attr("title",Lang.getString("ICON_VIEW"));
			}else if (right == "read"){
				$(this).attr("title",Lang.getString("ICON_READ"));
			}else if (right == "update"){
				$(this).attr("title",Lang.getString("ICON_UPDATE"));
			}else if (right == "admin"){
				$(this).attr("title",Lang.getString("ICON_ADMIN"));
			}
			if ($(this).parent().parent().attr("optin") == "true"){
				$(this).attr("title",$(this).attr("title") + Lang.getString("ICON_OPTIN"));
			}
			if ($(this).parent().parent().attr("optout") == "true"){
				$(this).attr("title",$(this).attr("title") + Lang.getString("ICON_OPTOUT"));
			}
		});
	}

};
