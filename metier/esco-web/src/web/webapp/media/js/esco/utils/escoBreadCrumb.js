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

var EscoBreadCrumb = new DUI.Class({

	_breadOptions : {},

	init: function(opts){
		_breadOptions = $.extend({},opts || {
			path : "Root",
			value : null
		});
		try{
			str = this._construct();
			$("#breadCrumb").empty();
			$("#breadCrumb").append(str);
			$("#breadCrumb").jBreadCrumb();

			$("a[class=lastBread]").css("color","#50A029");
			$("a[class=lastBread]").css("text-decoration","underline");

		}catch(e){
		}
	},

	_construct : function(){

		var str = "<ul>";


		if ( _breadOptions.path != ":Root" ){
			if (_breadOptions.value == null){
				str += "<li><a id='bread' style='cursor:default;' name=':'>Root</a></li>";
			}else{
				str += "<li><a id='RootBread' name=':'>Root</a></li>";

				if (_breadOptions.value.substring(0,1) == ":"){
					_breadOptions.value=_breadOptions.value.substring(1,_breadOptions.value.length);
				}

			}

			if (_breadOptions.path.substring(0,1) == ":"){
				_breadOptions.path=_breadOptions.path.substring(1,_breadOptions.path.length);
			}

			var parent = _breadOptions.path.split(":");

			if (_breadOptions.value != null){
				var valParent = _breadOptions.value.split(":");
			}
			var valueOfInputHidden = "";

			// Not the for if is only root.
			for (i = 0; i < parent.length - 1; i++) {
				if (_breadOptions.value != null){
						valueOfInputHidden += valParent[i];
						str += "<li><a id='bread' name='" + valueOfInputHidden + "'>" + parent[i] + "</a></li>";
						valueOfInputHidden += ":";
				} else {
						str += "<li>" + parent[i] + "</li>";
				}
			}

			// Last item.
			if (_breadOptions.value != null){
				valueOfInputHidden += valParent[parent.length-1];
				str += "<li><a id='bread' class='lastBread' name='" + valueOfInputHidden + "'>" + parent[parent.length-1] + "</a></li>";
			}else{
				str += "<li>" + parent[parent.length-1] + "</li>";
			}

		}else{
			str += "<li><a id='RootBread' class='selected' name=':'>Root</a></li>";
		}

		str += "</ul>";
		return str;
	}

});