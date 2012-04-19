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
 * @author Sopra Group
 */
var ValidateGroupAttributes = new DUI.Class({

  _options : {},

  init: function(opts){
    this._options = $.extend(this._options, opts || {});
    Core.log("Loading validateGroupAttributes librairy whith options : " + $.toJSON(this._options));
  },

  fire : function(){
    this.addActions();
  },

  addActions : function() {
    jQuery.each($("input[name=customType]"), function(e, input){
      Core.addAction(
          $(input),
          Core.CLICK,
          function(e){
            // uncheck all the contexts when custom type change
            $("input[type=checkbox]","div[id=groupContext]").attr("checked",false);
            validate.updateContexts();
          },
          false
        );
    });

    jQuery.each($("input[type=checkbox]","div[id=groupContext]"), function(e, input){
      Core.addAction(
          $(input),
          Core.CLICK,
          function(e){
            validate.uncheckIncompatibleContexts(this);
            jQuery.each($("input[type=checkbox]","div[id=groupContext]"), function(e,obj){
          });
        },
        false
      );
    });
  },

  /**
   * update list of contexts.
   */
  updateContexts : function() {
    var oneChecked = false;
    jQuery.each($("input[name=customType]"), function(e,obj){
      if(obj.checked){
        // delete all the contexts
        $("li[id*=context_]").css("display", "none");
        var reg=new RegExp("[|]+", "g");
        var regles=($("#"+obj.value).val()).split(reg);
        // display context that match the rule
        for ( var i=0;i<regles.length;i++){
          $("#context_"+regles[i]).css("display", "block");
          $("#context_"+regles[i]).parent().css("cursor","default");
        }
        oneChecked = true;
      }
      // if no type is checked
      if(!oneChecked){
        // delete all the contexts
        $("li[id*=context_]").css("display", "none");
      }
    });
  },

  /**
   * uncheck incompatible contexts.
   */
  uncheckIncompatibleContexts : function(checkbox) {
    if(checkbox.checked){
      _context = checkbox.value;
      jQuery.each($("input[name=customType]"), function(e,obj){
        if(obj.checked){
          var json = {
                customType : obj.value,
                context : _context
                };
          $.post("/" + Core.applicationContext + "/ajax/groupModificationsAttributesController/getIncompatibilities.jsf", json, function(data) {
              // uncheck the incompatible contexts
              var reg = new RegExp("[|]+", "g");
              var incompatibilities = Core.getResult(data).split(reg);
              // uncheck context that match the rule
              for ( var i=0;i<incompatibilities.length;i++){
                $("input[name="+incompatibilities[i]+"]","div[id=groupContext]").attr("checked", false);
              }
          });
        }
      });
    }
  },

  /**
   * Check Group Standard custom type if no custom type is checked.
   */
  checkGroupStandardIfAllUnchecked : function() {

    var oneChecked = false;
    $("input[name=customType]").each(function(){
      if($(this).attr("checked")){
        oneChecked = true;
      }
    });
    if(!oneChecked){
      $("input[name=customType][value=standard]").attr("checked",true);
    }
  },

  validate : function(e){
    _this = this;
    _displayBlockUIOption = {
      onAfterShowBlockUI : function(){
        Core._hideBlockUI();
        var error = Validate.validateAttributes();
        if(!error){
          Core.pullAjaxContent("/" + Core.applicationContext + "/stylesheets/groupModifications/groupModifications.jsf",{groupUuid: $("input[id=groupUuid]").val()}, "#mainContent", true, false);
        }
      }
    };
    Core._showBlockUI(_displayBlockUIOption);
  },

  /**
   * Check/uncheck checkboxes based on the rights selected
   */
  initCheckboxPrivileges : function (checkbox) {
    if (checkbox.id == 'view') {
      if (checkbox.checked == true) {
        // do nothing
      } else {
        $('#optout').attr('checked', false);
        $('#optin').attr('checked', false);
        $('#read').attr('checked', false);
        $('#update').attr('checked', false);
        $('#admin').attr('checked', false);
      }
    } else if (checkbox.id == 'read') {
      if (checkbox.checked == true) {
        $('#view').attr('checked', true);
      } else {
        $('#update').attr('checked', false);
        $('#admin').attr('checked', false);
      }
    } else if (checkbox.id == 'update') {
      if (checkbox.checked == true) {
        $('#view').attr('checked', true);
        $('#read').attr('checked', true);
      } else {
        $('#admin').attr('checked', false);
      }
    } else if (checkbox.id == 'admin') {
      if (checkbox.checked == true) {
        $('#view').attr('checked', true);
        $('#read').attr('checked', true);
        $('#update').attr('checked', true);
      }
    }
  }

}, $.screen);
