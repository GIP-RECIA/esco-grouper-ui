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