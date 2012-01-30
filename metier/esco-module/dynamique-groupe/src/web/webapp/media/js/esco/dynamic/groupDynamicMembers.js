/**
 * @author aChesneau
 */
var GroupDynamicMemberPrototype = $.extend( true, {},EscoGrid,{

   /**
    * {@inheritDoc}
    */
	doOnFire : function(){
		$("#groupAdmin").hide();
		$("#groupDelete").hide();
		return true;
	},
   /**
    * {@inheritDoc}
    */
	getPostDataToFindDataRequest : function(){
		jsonData = $.extend( { groupUuid : $("input[id=groupUuid]").val(),
			   theMemberType : "MEMBER_RADIO_IMMEDIATE"},
			   Core.getUrlParams()
			);
			Core.resetNavParams();
			return jsonData;
	},

	/**
	 * {@inheritDoc}
	 */
	doActionOnFindData:function(){
		group.getIsGroupModified();
	},

	/**
     * {@inheritDoc}
     */
	doOnLoadComplete:function(){
		try {
			$("table[class*=navtable]").css("display","block");
			$("input[class=cbox]").css("display","block");
		} catch (e) {
		}
	},

	/**
     * {@inheritDoc}
     */
	addActionOnClickLinkItemPerson:function(id){
		Core.addAction(
				$(id),
				Core.CLICK,
				function(e){
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/personProperties.jsf",{idPerson : e.target.id, needClear : "true"},"#mainContent", true, false);
				},true);
	},

	/**
     * {@inheritDoc}
     */
	addActionOnClickLinkItemGroup:function(id){
		Core.addAction(
				$(id),
				Core.CLICK,
				function(e){
					Core.log("Preparate open of node + " + e.target.id);

					_displayBlockUIOption = {
							onAfterShowBlockUI : function(){
								Core.log("Preparate open of node + " + $("#"+e.target.id).attr("id") );
								Core.openAndSelectNode(e.target.id);
					}
					};
					Core._showBlockUI(_displayBlockUIOption);

				},true);
	}
});

var GroupDynamicMember = new DUI.Class(GroupDynamicMemberPrototype , $.screen);
