/**
 * Class to define is the JavaScript is in debug mode.
 * @author aChesneau
 */
var Debug  = {
	activeDebug : false,

	isInDebug : function(){
		return this.activeDebug;
	}
};

/**
 * Class to show banner or not
 * @author aChesneau
 */
var Banner  = {
	displaying : false,

	isDisplayed : function(){
		return this.displaying;
	}
};