(function(A){A.widget("ui.progressbar",{_init:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this._valueMin(),"aria-valuemax":this._valueMax(),"aria-valuenow":this._value()});
this.valueDiv=A('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);
this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow").removeData("progressbar").unbind(".progressbar");
this.valueDiv.remove();
A.widget.prototype.destroy.apply(this,arguments)
},value:function(B){if(B===undefined){return this._value()
}this._setData("value",B);
return this
},_setData:function(B,C){switch(B){case"value":this.options.value=C;
this._refreshValue();
this._trigger("change",null,{});
break
}A.widget.prototype._setData.apply(this,arguments)
},_value:function(){var B=this.options.value;
if(B<this._valueMin()){B=this._valueMin()
}if(B>this._valueMax()){B=this._valueMax()
}return B
},_valueMin:function(){var B=0;
return B
},_valueMax:function(){var B=100;
return B
},_refreshValue:function(){var B=this.value();
this.valueDiv[B==this._valueMax()?"addClass":"removeClass"]("ui-corner-right");
this.valueDiv.width(B+"%");
this.element.attr("aria-valuenow",B)
}});
A.extend(A.ui.progressbar,{version:"1.7.2",defaults:{value:0}})
})(jQuery);