/**
 * Class to manage the animation on divs.
 *
 * @author aChesneau
 */
var EscoAnimate = {
		/**
		 * Show the panel with animation.
		 */
		_showAnimate : function(el){
			el.animate( {
				height : "show",
				queue : false
			}, "slow" , "easeOutQuad");

		},

		/**
		 * Hide the panel with animation
		 */
		_hideAnimate : function(el){
			el.css("height",el.height()+"px");
			el.animate( {
				height : "hide",
				queue : false
			}, "slow" , "easeOutQuad");
		}
};