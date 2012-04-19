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
 *
 * @author aChesneau
 */

var ResultOfRequestPrototype = $.extend( true, {}, EscoGrid ,{

	_isInBlockMode : false,

   /**
    * {@inheritDoc}
    */
	doOnFire : function(){
		Core.addAction(
			$("#modalReturn"),
			Core.CLICK,
			function(e){
				ResultOfRequestPrototype._isInBlockMode=false;
				Core.isInBlockUiMode = false;
				Core._hideBlockUI();
				$("#modalTestRule").hide();
			},
			false
		);
		return true;
	},

	/**
     * {@inheritDoc}
     */
	doOnLoadComplete:function(){
		Core.isInBlockUiMode = true;
		if (!this._isInBlockMode){
			$.blockUI({
				message: $('#modalTestRule'),
			    css: {  cursor: 'default',
					 	width: '800px',
					 	top: '25%' ,
					 	left: '50%' ,
					  	'margin-left': '-400px'
					 }
			});
			this._isInBlockMode = true;
		}

		$('#modalTestRule').show();
		$("#pagerGrid").hide();

	},

	/**
    * {@inheritDoc}
    */
	getPostDataToFindDataRequest : function(){
	},

   /**
    * {@inheritDoc}
    */
	doIsMultipleViewGrid:function(){
	},

   /**
    * {@inheritDoc}
    */
	doSelectRow : function(rowid,status){
	},

	/**
     * {@inheritDoc}
     */
	doSelectAll:function(rowid,status){
	},

	/**
     * {@inheritDoc}
     */
	doOnPaging:function(){
	},

	/**
     * {@inheritDoc}
     */
	doOnExistingAddedItems:function(){
	},

	/**
     * {@inheritDoc}
     */
	addActionOnClickLinkItemPerson:function(id){
	},

	/**
     * {@inheritDoc}
     */
	addActionOnClickLinkItemGroup:function(id){
	},

	/**
     * {@inheritDoc}
     */
	doAddNavButtons:function(){
	},

	/**
     * {@inheritDoc}
     */
	doResizeGrid:function(){
		if ($.browser["msie"]){
			$("div[class=grid_bdiv]").css("padding-right", "0px");
			$("div[class=grid_hdiv]").css("width", "726px");
			$("div[class=grid_bdiv]").css("margin-left", "-5px");
		}
	}

});

var ResultOfRequest = new DUI.Class( ResultOfRequestPrototype , $.screen);