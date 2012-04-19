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