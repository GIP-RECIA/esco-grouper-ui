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
 * @author aChesneau
 */
var PersonSubscriptionsPrototype = $.extend( true, {}, EscoGrid ,{

   /**
    * {@inheritDoc}
    */
	doOnFire : function(){
		return true;
	},
   /**
    * {@inheritDoc}
    */
	getPostDataToFindDataRequest : function(){
		var jsonData = {personId:$("#idPerson").val()};
		return jsonData;
	},

	/**
     * {@inheritDoc}
     */
	doSpecificActionIfNoData : function(){
		$("#escoPanels").tabs("select",0);
		$('input[name=personSubscriptions] + a').hide();
		return false;
	},

	/**
     * {@inheritDoc}
     */
	doOnLoadComplete:function(){
		var ids = $(this._options.ID_GRID).getDataIDs();
		if (ids.length == 0 ){
			this.doSpecificActionIfNoData();
		}else{
			var imgSubscribe = "<img id=\"?\" src=\"/" + Core.applicationContext + "/media/imgs/grid/subscribe.png\" style=\"width : 15px; float:right; height : 15px; cursor : pointer; margin-top:0px !important;\" title=\""+this._lang.TO_SUBSCRIBE+"\"/>";
			var imgUnSubscribe = "<img id=\"?\" src=\"/" + Core.applicationContext + "/media/imgs/grid/unsubscribe.png\" style=\"width : 15px; float:right; height : 15px; cursor : pointer; margin-top:0px !important;\" title=\""+this._lang.TO_UNSUBSCRIBE+"\" />";

			for ( var i = 0; i < ids.length; i++) {
				var cl = ids[i];

				var data = $(this._options.ID_GRID).getCell(i + 1, 3);
				var action = $(this._options.ID_GRID).getCell(i + 1, 4);
				if (data === "1"){
					if (action === "true"){
						imgUnSubscribeAux = imgUnSubscribe.replace("?", cl + "_row" );
						$(this._options.ID_GRID).setCell(i + 1, 3, "<span style='float:left;'>"+this._lang.PERSON_IS_SUBSCRIBED + "</span>" + imgUnSubscribeAux , "", {title : this._lang.PERSON_IS_SUBSCRIBED});
						$("#" + cl + "_row").unbind("click");
						$("#" + cl + "_row").bind("click", ActionSubscriptions.clickOptoutDefaultAction(this._options, this._lang));
						$("#" + cl + "_row").attr("action" , "optout");
					}else{
						$(this._options.ID_GRID).setCell(i + 1, 3, "<span style='float:left;'>"+this._lang.PERSON_IS_SUBSCRIBED + "</span>" , "", {title : this._lang.PERSON_IS_SUBSCRIBED});
					}
				} else {
					if (action ==="true"){
						imgSubscribeAux = imgSubscribe.replace("?", cl + "_row" );
						$(this._options.ID_GRID).setCell(i + 1, 3, "<span style='float:left;'>"+this._lang.PERSON_IS_NOT_SUBSCRIBED + "</span>" + imgSubscribeAux, "", {title : this._lang.PERSON_IS_NOT_SUBSCRIBED});
						$("#" + cl + "_row").unbind("click");
						$("#" + cl + "_row").bind("click", ActionSubscriptions.clickOptinDefaultAction(this._options, this._lang));
						$("#" + cl + "_row").attr("action" , "optin");
					}else{
						$(this._options.ID_GRID).setCell(i + 1, 3, "<span style='float:left;'>"+this._lang.PERSON_IS_NOT_SUBSCRIBED + "</span>", "", {title : this._lang.PERSON_IS_NOT_SUBSCRIBED});
					}
				}

			}
		}
	},

	/**
     * {@inheritDoc}
     */
	addActionOnClickLinkItemGroup:function(id){
		if (Profile.canAccessToGroupProperties()){
			Core.addAction(
				$(id),
				Core.CLICK,
				function(e){
					Core.log("Preparate open of node + " + e.target.id);

					_displayBlockUIOption = {
							onAfterShowBlockUI : function(){
								Core.log("Preparate open of node + " + $("#"+e.target.id).attr("id") );
								TreePlugin.openAndSelectNode(e.target.id);
					}
					};
					Core._showBlockUI(_displayBlockUIOption);

				},true);
		}else{
			$(id).removeClass("tableLink");
		}
	},

	/**
     * {@inheritDoc}
     */
	doAddNavButtons:function(){
	}
});

var PersonSubscriptions = new DUI.Class( PersonSubscriptionsPrototype , $.screen);
