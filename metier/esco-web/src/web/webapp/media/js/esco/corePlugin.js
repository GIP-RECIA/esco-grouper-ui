/**
*@author aChesneau
*
* Interface of core plugin.
*
*/
var CorePlugin = {

		_entryPoint:null,

		/**
		 * Function call on the Core.addScreen.
		 */
		fire:function(){
			this.doOnFire();
			Core.addPlugin(this);
		},

		/** Do a specific action on fire (Specify in the child class). */
		doOnFire : function(){
			Core.log("NOT IMPLEMENTED : CorePlugin.doOnFire");
		},

		/**
		 * Execute a function of the class.
		 * @param args the argument to find the function.
		 * @return the result of the function.
		 */
		execute:function(args){
			if (this[args.theFunction] != undefined){
				return this[args.theFunction].call(this,args);
			}
		}
}