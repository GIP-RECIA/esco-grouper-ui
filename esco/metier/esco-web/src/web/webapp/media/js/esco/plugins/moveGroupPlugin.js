/**
 * @author aChesneau
 */
var MoveGroup = $.extend( true, {}, CorePlugin ,{

	/** Node hovered. */
	_nodeHovered : null,

	/** Boolean to define if is a group was cut. */
	_isNodeCut : false,

	/** Boolean to define if is a group was cut. */
	_theNodeCut : null,

	/** Boolean to define if is in drag mode. */
	_isInDragMode : false,

	/** The node to move. */
	_theNodeToMove : null,


	/** The previous node focus. */
	_previousNode : null,

	/** If we can move the group to this destination. */
	_canMoveIt:false,

   /**
    * {@inheritDoc}
    */
	doOnFire : function(){
		this._entryPoint = "DragAndDropPlugin";

		DragAndDrop.dragStartMoveGroup = function () {
			if (MoveGroup._theNodeCut != null){
				$(MoveGroup._theNodeCut).css("opacity","1");
				MoveGroup._theNodeCut = null;
				MoveGroup._isNodeCut = false;
			}
			MoveGroup._isInDragMode = true;
			_theNodeToMove = MoveGroup._nodeHovered;
			_theNodeToMove.css("opacity","0.4");
		};



		DragAndDrop.dragEndMoveGroup = function () {
			MoveGroup._isInDragMode = false;
			_theNodeToMove.css("opacity","1");
			_theNodeToMove = null;
			if (MoveGroup._previousNode != null){
				if ($.browser["msie"]){
					if ($(MoveGroup._previousNode).children("a").css("opacity") == "0.5"){
						MoveGroup._canMoveIt = false;
					}else{
						MoveGroup._canMoveIt = true;
					}
					$(MoveGroup._previousNode).children("a").css("opacity","1");
				}else{
					if ($(MoveGroup._previousNode).children("a").css("cursor") == "no-drop"){
						MoveGroup._canMoveIt = false;
					}else{
						MoveGroup._canMoveIt = true;
					}
					$(MoveGroup._previousNode).children("a").css("cursor","pointer");
				}
			}
			MoveGroup._previousNode = null;
		};

		DragAndDrop.moveGroup = function(NODE, REF_NODE, TYPE, TREE_OBJ){

				var destStem = $(REF_NODE).attr("displayName");
				var originalStem = tree.parent($(NODE)).attr("displayName");
				if (originalStem == destStem ) return false;
				if (!MoveGroup._canMoveIt) return false;
				// Call the move service and execute it.
				MoveGroup._canMoveIt = false;

				var parameter = {
						groupUuid : $(NODE).attr("id"),
						stemName : $(REF_NODE).attr("name"),
						stemDisplayName : $(REF_NODE).attr("displayName")
				};
				var _node = $(NODE);
				var _dest = $(REF_NODE);
				MoveGroup._resultOfMoveAction = null;
				_displayBlockUIOption = {
					onAfterShowBlockUI : function(){
						$.post("/" + Core.applicationContext + "/ajax/groupController/moveGroup.jsf", parameter, function(data){
							if (Core.getStatus(data)){
									tree.settings.callback.onload = function(){
										TreePlugin.openAndSelectParent(Core.getValueOfXml(data,"message"));
										$("li[typeNode=ROOT]").click().click();
										Core._hideBlockUI();
										tree.settings.callback.onload = function(){
										};
									};
							}
							tree.refresh($("li[id=:]"));
						});
					}
				};
				Core._showBlockUI(_displayBlockUIOption);
				return false;
		};
	},

	/**
	 * Init the move group action.
	 */
	init: function(node){
		TreeMenu.setCurrentCutAction(MoveGroup);
		MoveGroup._isNodeCut = true;
		MoveGroup._theNodeCut = $(node);
		$(node).css("opacity","0.4");
	},

	/**
	 * Release the node to default.
	 */
	release: function(){
		if (MoveGroup._theNodeCut != null){
			$(MoveGroup._theNodeCut).css("opacity","1");
			MoveGroup._theNodeCut = null;
			MoveGroup._isNodeCut = false;
		}
	}

});

var MoveGroupPlugin = new DUI.Class( MoveGroup , $.screen);