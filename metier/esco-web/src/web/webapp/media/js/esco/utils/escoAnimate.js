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