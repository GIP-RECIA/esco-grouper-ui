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