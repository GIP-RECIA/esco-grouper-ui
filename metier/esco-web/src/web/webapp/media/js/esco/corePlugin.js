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