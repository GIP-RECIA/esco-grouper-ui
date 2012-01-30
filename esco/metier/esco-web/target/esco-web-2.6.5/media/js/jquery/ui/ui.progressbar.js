(function(B){B.widget("ui.progressbar",{_init:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this._valueMin(),"aria-valuemax":this._valueMax(),"aria-valuenow":this._value()});
this.valueDiv=B('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);
this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow").removeData("progressbar").unbind(".progressbar");
this.valueDiv.remove();
B.widget.prototype.destroy.apply(this,arguments)
},value:function(A){if(A===undefined){return this._value()
}this._setData("value",A);
return this
},_setData:function(D,A){switch(D){case"value":this.options.value=A;
this._refreshValue();
this._trigger("change",null,{});
break
}B.widget.prototype._setData.apply(this,arguments)
},_value:function(){var A=this.options.value;
if(A<this._valueMin()){A=this._valueMin()
}if(A>this._valueMax()){A=this._valueMax()
}return A
},_valueMin:function(){var A=0;
return A
},_valueMax:function(){var A=100;
return A
},_refreshValue:function(){var A=this.value();
this.valueDiv[A==this._valueMax()?"addClass":"removeClass"]("ui-corner-right");
this.valueDiv.width(A+"%");
this.element.attr("aria-valuenow",A)
}});
B.extend(B.ui.progressbar,{version:"1.7.2",defaults:{value:0}})
})(jQuery);