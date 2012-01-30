/**
 * @author aChesneau
 */
var ProfilePluginPrototype = $.extend( true, {}, CorePlugin ,{

   /**
    * {@inheritDoc}
    */
	doOnFire : function(){
		this._entryPoint = "ProfilePlugin";
	},

	/**
	 * Can access to one screen.
	 * return true if the user can access to screen else false;
	 */
	canAccessToScreen:function(args){
		var url = args.url;
		var param = args.param;
		var result = true;
		result = Profile.getPropertyValueFromUrl(url,param);
		if (result == undefined){
			result = true;
		}
		return result;
	}
});

var ProfilePlugin = new DUI.Class( ProfilePluginPrototype , $.screen);