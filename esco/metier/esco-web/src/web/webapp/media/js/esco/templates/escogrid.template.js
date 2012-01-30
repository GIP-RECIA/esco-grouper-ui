/**
 * @author aChesneau
 */
var TemplatePrototype = $.extend( true, {}, EscoGrid ,{

   /**
    * {@inheritDoc}
    */
	doOnFire : function(){
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
	doOnLoadComplete:function(data){
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
	}
});

var Template = new DUI.Class( TemplatePrototype , $.screen);
