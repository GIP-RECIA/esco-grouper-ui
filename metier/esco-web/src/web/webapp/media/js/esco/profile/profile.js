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
var Profile = {

	/** The list of profile property. */
	_properties : null,

	/** The list of mapping between urls and profile key.*/
	_urlsProperties : null,

	/**
	 * Set the properties.
	 */
	setProperties: function(opts){
		this._properties = $.extend({}, opts || {});
	},

	/**
	 * Set the url mapping properties.
	 */
	setUrlMappingProperties: function(opts){
		this._urlsProperties = $.extend({}, opts || {});
	},

	/**
	 * Can display or not the navigation area.
	 * @return true if we can display the layout else false otherwise.
	 */
	canDisplayNavigationArea : function(){
		return this.getPropertyValue("org.esco.grouperui.web.areaNavigation");
	},

	/**
	 * Can display or not the person properties screen.
	 * @return true if we can display the layout else false otherwise.
	 */
	canAccessToPersonProperties:function(){
		return this.getPropertyValue("org.esco.grouperui.web.person.properties");
	},

	/**
	 * Can display or not the group properties screen.
	 * @return true if we can display the layout else false otherwise.
	 */
	canAccessToGroupProperties:function(){
		return this.getPropertyValue("org.esco.grouperui.web.group.properties");
	},

	/**
	 * Can add or delete members on the group properties screen.
	 * @return true if we can display the layout else false otherwise.
	 */
	canAddOrDeleteMembersOnGroupProperties:function(){
		var userRight = $("#userRightOnGroup").val();
		if (userRight != undefined && userRight != "" ){
			if (userRight == "update" || userRight == "admin" ) {
				return true;
			}
		}
		return false;
	},

	/**
	 * Can add or delete memberships on the group properties screen.
	 * @return true if we can display the layout else false otherwise.
	 */
	canAddOrDeleteMembershipsOnGroupProperties:function(){
		var userRight = $("#userRightOnGroup").val();
		if (userRight != undefined && userRight != "" ){
			if (userRight == "update" || userRight == "admin" ) {
				return true;
			}
		}
		return false;
	},

	/**
	 * Can edit privileges on the group properties screen.
	 * @return true if we can display the layout else false otherwise.
	 */
	canEditPrivilegesOnGroupProperties:function(){
		var userRight = $("#userRightOnGroup").val();
		if (userRight != undefined && userRight != "" ){
			if ( userRight == "admin" ) {
				return true;
			}
		}
		return false;
	},

	/**
	 * Can display or not the group modification screen.
	 * @return true if we can display the layout else false otherwise.
	 */
	canAccessToGroupModification:function(){
		return this.getPropertyValue("org.esco.grouperui.web.group.modification");
	},

	/**
	 * Can display or not the stem properties screen.
	 * @return true if we can display the layout else false otherwise.
	 */
	canAccessToStemProperties:function(){
		return this.getPropertyValue("org.esco.grouperui.web.stem.properties");
	},

	/**
	 * Can display or not the stem modification screen.
	 * @return true if we can display the layout else false otherwise.
	 */
	canAccessToStemModification:function(){
		return this.getPropertyValue("org.esco.grouperui.web.stem.modification");
	},

	/**
	 * Get the value in the property map of the key
	 * @param the key to get in the map.
	 * @return the value of the key.
	 */
	getPropertyValue:function(key){
		if ( this._properties.functions[key]){
			return true;
		}else{
			return false;
		}
	},

	/**
	 * Get the key of the url given.
	 * @param url the url to test.
	 */
	getUrlKey:function(url){
		if ( this._urlsProperties.urls[url] != undefined){
			return this._urlsProperties.urls[url];
		}else{
			return null;
		}
	},

	/**
	 * Get the properties from the url.
	 * return true if we can access to url else return false otherwise.
	 */
	getPropertyValueFromUrl:function(url,param){
		if (url == "/" + Core.applicationContext + "/stylesheets/personProperties.jsf"){
			if (param != undefined){
				if (param.idPerson == undefined || $("#userId").val() == param.idPerson ){
					return true;
				}
			}
		}
		if (this._urlsProperties[url] != undefined){
			return this._properties.functions[this._urlsProperties[url]];
		}else{
			return true;
		}
	}
};