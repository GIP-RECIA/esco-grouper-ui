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
 *
 * @author MOULRON Diogène
 */
var StemProperties = new DUI.Class({

	_options : {},

	init: function(opts){
		_options = $.extend({}, {}, opts || {});
	},

	fire : function(){
		this.initTab();
		this.initAction();
		this.initBreadCrumb();
	},

	/**
	 * Load BreadCrumb
	 */
	initBreadCrumb : function() {
		var path = $("#searchPathHidden").attr("value");
		//alert(path);
		new EscoBreadCrumb({
			path : path
		});
	},

	/**
	 * Load tab
	 */
	initTab : function() {
		fluid.accessibletabs("escoTabs", "escoPanels");
	},

	/**
	 * Initialize actions
	 */
	initAction : function() {
		// On manage button click
		// Redirect to the edition page for the current stem.
		Core.addAction($("#stemManage"),
				Core.CLICK,
				function(e) {
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/stemModifications.jsf",{from:'treeNavigate',stemUuid:$("input[id=stemUuid]").val(),creation:'false'}, "#mainContent", true);
				},
				false
			);

		// On create stem button click
		// Redirect to the edition page for a new stem.
		Core.addAction($("#stemCreateStem"),
				Core.CLICK,
				function(e) {
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/stemModifications.jsf",{from:'treeNavigate',stemUuid: $("input[id=stemUuid]").val(),creation:'true'}, "#mainContent", true);
				},
				false
			);

		// On create group button click
		// Redirect to the creation page for a new group.
		Core.addAction($("#stemCreateGroup"),
				Core.CLICK,
				function(e) {
					Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupModifications/groupModificationsAttributes.jsf",{from:'treeNavigate',stemUuid: $("input[id=stemUuid]").val(),creation:'true'}, "#mainContent", true);
				},
				false
			);

		Core.addAction($("#stemDelete"),
				Core.CLICK,
				function(e) {
					var needToRedirect = true;
						$.post("/" + Core.applicationContext + "/stylesheets/stemProperties/modalDeleteStem.jsf",{stemUuid:$("#groupUuid"),needToRedirect:needToRedirect},function(data)
						{
							Core.isInBlockUiMode = true;
							$("#modalDelete").empty().append(data);
							 $.blockUI({
						            message: $('#modalDelete'),
						            css: {  cursor: 'default',
								 			width: '500px',
								 			top: '30%' ,
									        left: '50%' ,
									        'margin-left': '-250px'
								 		}
						        });
							});
				},
				false
			);
	}

}, $.screen);