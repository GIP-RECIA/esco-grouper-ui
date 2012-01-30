
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