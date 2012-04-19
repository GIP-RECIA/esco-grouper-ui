/*
 * jsTree 0.9.9a
 * http://jstree.com/
 *
 * Copyright (c) 2009 Ivan Bozhanov (vakata.com)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: 2009-10-06
 *
 */
(function ($) {
	if(typeof $.metadata == "undefined") throw "jsTree metadata: jQuery metadata plugin not included.";

	$.extend($.tree.plugins, {
		"metadata" : {
			defaults : {
				attribute	: "data"
			},
			callbacks : {
				check : function(rule, obj, value, tree) {
					var opts = $.extend(true, {}, $.tree.plugins.metadata.defaults, this.settings.plugins.metadata);
					if(typeof $(obj).metadata({ type : "attr", name : opts.attribute })[rule] != "undefined") return $(obj).metadata()[rule];
				}
			}
		}
	});
})(jQuery);