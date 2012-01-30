/**
 * @author aChesneau
 */
var ActionSubscriptions = {

	/**
	 * The click on subscribe image.
	 * @param option The option of the javascript class.
	 * @return the generated function to execute the optin action
	 */
	clickOptinDefaultAction : function(options,lang){
		return this._clickOptinOrOptoutDefaultAction(options, lang, "OPTIN");
	},

	/**
	 * The click on unsubscribe image.
	 * @param option The option of the javascript class.
	 * @return the generated function to execute the optout action
	 */
	clickOptoutDefaultAction : function(options,lang){
		return this._clickOptinOrOptoutDefaultAction(options, lang, "OPTOUT");
	},

	/**
	 * Get the function to do the optin or optout action.
	 * @param option The option of the javascript class.
	 * @param typeTransaction The type of the transaction (OPTIN or OPTOUT)
	 * @return the generated function.
	 */
	_clickOptinOrOptoutDefaultAction : function (options, lang, typeTransaction) {
		var result = function(e){
			e.stopPropagation();
			var row = $(this).attr("id").split("_");
			var idElement = $(options.ID_GRID).getCell(row[0], 0);
			json = {groupId : idElement, typeOfSubscription : typeTransaction};
			$.post(options.URL_SEND_SUBSCRIPTION, json, function(data){
				if (Core.getStatus(data)){

					_displayBlockUIOption = {
						onAfterShowBlockUI : function(){
							tree.settings.callback.onload = function(){
								$(options.ID_GRID).trigger('reloadGrid');
								tree.settings.callback.onload = function(){
								};
							};
							tree.refresh($("li[id=:]"));
						}
					};

					Core._showBlockUI(_displayBlockUIOption);

				}else{
					$.jGrowl(Core.getResult(data), {
						header: 'Important',
						theme : 'jGrowlError',
						sticky: true
						});
				}
			});
	    };
	    return result;
	}
}