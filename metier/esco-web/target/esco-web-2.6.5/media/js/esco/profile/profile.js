var Profile={_properties:null,_urlsProperties:null,setProperties:function(B){this._properties=$.extend({},B||{})
},setUrlMappingProperties:function(B){this._urlsProperties=$.extend({},B||{})
},canDisplayNavigationArea:function(){return this.getPropertyValue("org.esco.grouperui.web.areaNavigation")
},canAccessToPersonProperties:function(){return this.getPropertyValue("org.esco.grouperui.web.person.properties")
},canAccessToGroupProperties:function(){return this.getPropertyValue("org.esco.grouperui.web.group.properties")
},canAddOrDeleteMembersOnGroupProperties:function(){var B=$("#userRightOnGroup").val();
if(B!=undefined&&B!=""){if(B=="update"||B=="admin"){return true
}}return false
},canAddOrDeleteMembershipsOnGroupProperties:function(){var B=$("#userRightOnGroup").val();
if(B!=undefined&&B!=""){if(B=="update"||B=="admin"){return true
}}return false
},canEditPrivilegesOnGroupProperties:function(){var B=$("#userRightOnGroup").val();
if(B!=undefined&&B!=""){if(B=="admin"){return true
}}return false
},canAccessToGroupModification:function(){return this.getPropertyValue("org.esco.grouperui.web.group.modification")
},canAccessToStemProperties:function(){return this.getPropertyValue("org.esco.grouperui.web.stem.properties")
},canAccessToStemModification:function(){return this.getPropertyValue("org.esco.grouperui.web.stem.modification")
},getPropertyValue:function(B){if(this._properties.functions[B]){return true
}else{return false
}},getUrlKey:function(B){if(this._urlsProperties.urls[B]!=undefined){return this._urlsProperties.urls[B]
}else{return null
}},getPropertyValueFromUrl:function(C,D){if(C=="/"+Core.applicationContext+"/stylesheets/personProperties.jsf"){if(D!=undefined){if(D.idPerson==undefined||$("#userId").val()==D.idPerson){return true
}}}if(this._urlsProperties[C]!=undefined){return this._properties.functions[this._urlsProperties[C]]
}else{return true
}}};