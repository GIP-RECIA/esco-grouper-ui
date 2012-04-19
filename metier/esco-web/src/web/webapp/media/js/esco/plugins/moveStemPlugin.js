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
 * @author sDupuis
 */
var MoveStem = $.extend( true, {}, CorePlugin ,{

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

	/** If we can move the stem to this destination. */
	_canMoveIt:false,

   /**
    * {@inheritDoc}
    */
	doOnFire : function(){
		this._entryPoint = "MoveStemPlugin";

		DragAndDrop.dragStartMoveStem = function () {
			if (MoveStem._theNodeCut != null){
				$(MoveStem._theNodeCut).children("a").css("opacity","1");
				MoveStem._theNodeCut = null;
				MoveStem._isNodeCut = false;
			}
			MoveStem._isInDragMode = true;
			_theNodeToMove = MoveStem._nodeHovered;
			_theNodeToMove.children("a").css("opacity","0.4");
		};



		DragAndDrop.dragEndMoveStem = function () {
			MoveStem._isInDragMode = false;
			_theNodeToMove.children("a").css("opacity","1");
			_theNodeToMove = null;
			if (MoveStem._previousNode != null){
				if ($.browser["msie"]){
					if ($(MoveStem._previousNode).children("a").css("opacity") == "0.5"){
						MoveStem._canMoveIt = false;
					}else{
						MoveStem._canMoveIt = true;
					}
					$(MoveStem._previousNode).children("a").css("opacity","1");
				}else{
					if ($(MoveStem._previousNode).children("a").css("cursor") == "no-drop"){
						MoveStem._canMoveIt = false;
					}else{
						MoveStem._canMoveIt = true;
					}
					$(MoveStem._previousNode).children("a").css("cursor","pointer");
				}
			}
			MoveStem._previousNode = null;
		};

		DragAndDrop.moveStem = function(NODE, REF_NODE, TYPE, TREE_OBJ){

			if ($(REF_NODE).attr("displayName") == $(NODE).attr("displayName") ) return false;
			if (!MoveStem._canMoveIt) return false;

			// Call the move service and execute it.
			MoveStem._canMoveIt = false;

			var parameter = {
					stemUuid : $(NODE).attr("id"),
					stemName : $(NODE).attr("name"),
					targetStemName : $(REF_NODE).attr("name")
			};
			MoveStem._resultOfMoveAction = null;
			_displayBlockUIOption = {
				onAfterShowBlockUI : function(){
					$.post("/" + Core.applicationContext + "/ajax/stemController/moveStem.jsf", parameter, function(data){
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
	 * Init the stem group action.
	 */
	init: function(node){
		TreeMenu.setCurrentCutAction(MoveStem);
		MoveStem._isNodeCut = true;
		MoveStem._theNodeCut = $(node);
		$(node).children("a").css("opacity","0.4");
	},


	/**
	 * Release the node to default.
	 */
	release: function(){
		if (MoveStem._theNodeCut != null){
			$(MoveStem._theNodeCut).children("a").css("opacity","1");
			MoveStem._theNodeCut = null;
			MoveStem._isNodeCut = false;
		}
	}
});

var MoveStemPlugin = new DUI.Class( MoveStem , $.screen);