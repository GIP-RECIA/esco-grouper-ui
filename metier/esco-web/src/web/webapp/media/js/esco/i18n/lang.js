/**
 * Class to manage the i18n message.
 * @author aChesneau
 */
var Lang = {
	/**
	 * The JSON of all messages.
	 */
	_LANG : {},

	/**
	 * Get the message from the key.
	 * @return the message or the ????? key ????? message
	 */
	getString: function(key){
		var theKey = key.toUpperCase();
		theKey = theKey.replace(" ","_");
		if (this._LANG[theKey] != null){
			return this._LANG[theKey];
		}else{
			if (Debug.isInDebug()){
				return "?????" + theKey + "?????";
			}else{
				return "";
			}
		}
	}
};