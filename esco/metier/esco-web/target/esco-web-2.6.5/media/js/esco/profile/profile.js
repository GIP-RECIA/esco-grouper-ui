var Profile={_properties:null,_urlsProperties:null,setProperties:function(A){this._properties=$.extend({},A||{})
},setUrlMappingProperties:function(A){this._urlsProperties=$.extend({},A||{})
},canDisplayNavigationArea:function(){return this.getPropertyValue("org.esco.grouperui.web.areaNavigation")
},canAccessToPersonProperties:function(){return this.getPropertyValue("org.esco.grouperui.web.person.properties")
},canAccessToGroupProperties:function(){return this.getPropertyValue("org.esco.grouperui.web.group.properties")
},canAddOrDeleteMembersOnGroupProperties:function(){var A=$("#userRightOnGroup").val();
if(A!=undefined&&A!=""){if(A=="update"||A=="admin"){return true
}}return false
},canAddOrDeleteMembershipsOnGroupProperties:function(){var A=$("#userRightOnGroup").val();
if(A!=undefined&&A!=""){if(A=="update"||A=="admin"){return true
}}return false
},canEditPrivilegesOnGroupProperties:function(){var A=$("#userRightOnGroup").val();
if(A!=undefined&&A!=""){if(A=="admin"){return true
}}return false
},canAccessToGroupModification:function(){return this.getPropertyValue("org.esco.grouperui.web.group.modification")
},canAccessToStemProperties:function(){return this.getPropertyValue("org.esco.grouperui.web.stem.properties")
},canAccessToStemModification:function(){return this.getPropertyValue("org.esco.grouperui.web.stem.modification")
},getPropertyValue:function(A){if(this._properties.functions[A]){return true
}else{return false
}},getUrlKey:function(A){if(this._urlsProperties.urls[A]!=undefined){return this._urlsProperties.urls[A]
}else{return null
}},getPropertyValueFromUrl:function(A,B){if(A=="/"+Core.applicationContext+"/stylesheets/personProperties.jsf"){if(B!=undefined){if(B.idPerson==undefined||$("#userId").val()==B.idPerson){return true
}}}if(this._urlsProperties[A]!=undefined){return this._properties.functions[this._urlsProperties[A]]
}else{return true
}}};