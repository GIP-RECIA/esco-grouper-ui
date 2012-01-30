/**
 *  @author aChesneau
 */
var DragAndDrop = {

	/**
	 *
	 */
	fire : function(){
		$.tree.drag_start = DragAndDrop.dragStart;
		$.tree.drag = function () {};
		$.tree.drag_end = DragAndDrop.dragEnd;
	},

	/**
	 *
	 */
	dragStart : function(){
		TreeMenu.releaseCurrentCutAction();
		if (MoveGroup._nodeHovered != null){
			if (jQuery.isFunction(DragAndDrop.dragStartMoveGroup)){
				DragAndDrop.dragStartMoveGroup.call(null);
			}else{
				Core.log("Warning: The dragStartMoveGroup is not a function");
			}
		}else if (MoveStem._nodeHovered != null){
			if (jQuery.isFunction(DragAndDrop.dragStartMoveStem)){
				DragAndDrop.dragStartMoveStem.call(null);
			}else{
				Core.log("Warning: The dragStartMoveStem is not a function");
			}
		}
	},
	/**
	 *
	 */
	dragEnd : function(){
		if (MoveGroup._isInDragMode){
			if (jQuery.isFunction(DragAndDrop.dragEndMoveGroup)){
				DragAndDrop.dragEndMoveGroup.call(null);
			}else{
				Core.log("Warning: The dragEndMoveGroup is not a function");
			}
		}else if (MoveStem._isInDragMode){
			if (jQuery.isFunction(DragAndDrop.dragEndMoveStem)){
				DragAndDrop.dragEndMoveStem.call(null);
			}else{
				Core.log("Warning: The dragEndMoveStem is not a function");
			}
		}
	},

	moveElement : function(NODE, REF_NODE, TYPE, TREE_OBJ){
		if($(NODE).attr("typenode") == "GROUP"){
			if (jQuery.isFunction(DragAndDrop.moveGroup)){
				return DragAndDrop.moveGroup(NODE, REF_NODE, TYPE, TREE_OBJ);
			}else{
				Core.log("Warning: The moveGroup is not a function");
				return false;
			}
		}else if($(NODE).attr("typenode") == "FOLDER"){
			if (jQuery.isFunction(DragAndDrop.moveStem)){
				return DragAndDrop.moveStem(NODE, REF_NODE, TYPE, TREE_OBJ);
			}else{
				Core.log("Warning: The moveStem is not a function");
				return false;
			}
		}
	},

	/**
	 *
	 */
	dragStartMoveGroup : null,

	/**
	 *
	 */
	dragStartMoveStem : null,

	/**
	 *
	 */
	dragEndMoveGroup : null,

	/**
	 *
	 */
	dragEndMoveStem : null,

	/**
	 *
	 */
	moveGroup : null,

	/**
	 *
	 */
	moveStem : null

};