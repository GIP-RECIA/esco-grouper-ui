/**
 * @author Jason Roy for CompareNetworks Inc.
 *
 * Verision 0.1, improvements to be made.
 * Copyright (c) 2008 CompareNetworks Inc.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($)
{

    // Private variables

    var _options = {};
    var _container = {};
    var _breadCrumbElements = {};
	var _autoIntervalArray = [];
	var _selectedElement;


    // Public functions

    jQuery.fn.jBreadCrumb = function(options)
    {
        _options = $.extend({}, $.fn.jBreadCrumb.defaults, options);

        return this.each(function()
        {
            _container = $(this);
            setupBreadCrumb();
        });

    };

    // Private functions

    function setupBreadCrumb()
    {

        //The reference object containing all of the breadcrumb elements
        _breadCrumbElements = jQuery(_container).find('li');

        //Keep it from overflowing in ie6 & 7
		jQuery(_container).find('ul').wrap('<div style="overflow:hidden; width: ' + jQuery(_container).css("width") + ';"><div>');
		//Set an abitrary wide width to avoid float drop on the animation
        //jQuery(_container).find('ul').width(5000);

        //If the breadcrumb contains nothing, don't do anything
        if (_breadCrumbElements.length > 0)
        {
            jQuery(_breadCrumbElements[_breadCrumbElements.length - 1]).addClass('last');
            jQuery(_breadCrumbElements[0]).addClass('first');

            //If the breadcrumb object length is long enough, compress.

            if (_breadCrumbElements.length > _options.minimumCompressionElements)
            {
                compressBreadCrumb();
            };
      	};
 	};

    function compressBreadCrumb()
    {

        // Factor to determine if we should compress the element at all
        var finalElement = jQuery(_breadCrumbElements[_breadCrumbElements.length - 1]);


        // If the final element is really long, compress more elements
        if (jQuery(finalElement).width() > _options.maxFinalElementLength)
        {
            if (_options.beginingElementsToLeaveOpen > 0)
            {
                _options.beginingElementsToLeaveOpen--;

            }
            if (_options.endElementsToLeaveOpen > 0)
            {
                _options.endElementsToLeaveOpen--;
            }
        }
        // If the final element is within the short and long range, compress to the default end elements and 1 less beginning elements
        if (jQuery(finalElement).width() < _options.maxFinalElementLength && jQuery(finalElement).width() > _options.minFinalElementLength)
        {
            if (_options.beginingElementsToLeaveOpen > 0)
            {
                _options.beginingElementsToLeaveOpen--;

            }
        }

        var itemsToRemove = _breadCrumbElements.length - 1 - _options.endElementsToLeaveOpen;

        // We compress only elements determined by the formula setting below

        //TODO : Make this smarter, it's only checking the final elements length.  It could also check the amount of elements.
        jQuery(_breadCrumbElements[_breadCrumbElements.length - 1]).css(
        {
            background: 'none'
        });

        _breadCrumbElements.each(function(i, listElement)
        {
            if (i > _options.beginingElementsToLeaveOpen && i < itemsToRemove)
            {

                var options =
                {
                    width: jQuery(listElement).width() + 15
                };

                jQuery(listElement).find('a').attr("tabindex", "0").wrap('<span></span>').width(jQuery(listElement).find('a').width() + 15);

                // Add the overlay png.

                jQuery(listElement).append(jQuery(_options.overlayClass + '.main').clone().removeClass('main').css(
                {
                    display: 'block'
                }));
               /* if (isIE6OrLess())
                {
                    fixPNG(jQuery(listElement).find(_options.overlayClass).css(
                    {
                        width: '20px',
                        right: "-1px"
                    }));
                }*/

                options = $.extend({}, options, {
		                    id: i,
		                    listElement: jQuery(listElement).find('span'),
		                    isAnimating: false,
		                    element: jQuery(listElement).find('span'),
							expand: false
		                });

                jQuery(listElement).bind('mouseover', options, expandBreadCrumb).bind('mouseout', options, shrinkBreadCrumb);
                jQuery(listElement).find('a').unbind('mouseover', expandBreadCrumb).unbind('mouseout', shrinkBreadCrumb);

				jQuery(listElement).find('a').bind("focus", options, expandBreadCrumb);
				jQuery(listElement).find('a').bind("blur", options, shrinkBreadCrumb);
				jQuery(listElement).find('a').bind('click', options, selectElement);
					jQuery(listElement).find('a').bind("keydown", function(e){
					if (e.which == 13 ){
						$(this).trigger("click");
						return false;
					}
				});

                listElement.autoInterval = setInterval(function()
                {
					clearInterval(listElement.autoInterval);
                    jQuery(listElement).find('span').animate(
                    {
                        width: _options.previewWidth
                    }, _options.timeInitialCollapse, _options.easing);
                }, (150 * (i - 2)));

            } else {

                options = $.extend({}, options, {
		                    id: i,
		                    listElement: jQuery(listElement).find('span'),
		                    isAnimating: false,
		                    element: jQuery(listElement).find('span'),
							expand: false
		                });

				jQuery(listElement).find('a').attr("tabindex", "0").bind('click', options, selectElement);
				jQuery(listElement).find('a').bind("focus", options, function(e){$(this).css("backgroundColor","#e7f4f9").css("border","1px solid #d8f0fa")});
				jQuery(listElement).find('a').bind("blur", options, function(e){$(this).css("backgroundColor","").css("border","");});
				jQuery(listElement).find('a').bind("keydown", function(e){
					if (e.which == 13 ){
						$(this).trigger("click");
						return false;
					}
				});
            }


        });

    };

    function expandBreadCrumb(e)
    {
        var elementID = e.data.id;
        var originalWidth = e.data.width;
        jQuery(e.data.element).stop();
		jQuery(e.data.element).addClass("over");
        jQuery(e.data.element).animate(
        {
            width: originalWidth
        },
        {
            duration: _options.timeExpansionAnimation,
            easing: _options.easing,
            queue: false
        });
        return false;

    };

	function selectElement(e){
        var elementID = e.data.id;
		e.data.expand = true;
		if(_selectedElement != null && _selectedElement.expand){
			jQuery(_selectedElement.element).animate(
			{
				width: _options.previewWidth
			},
			{
				duration: _options.timeCompressionAnimation,
				easing: _options.easing,
				queue: false
			});

			_selectedElement.element.removeClass('selected');
			_selectedElement.expand = false;
		}

		e.data.element.addClass('selected');
		//e.data.element.removeClass("over");
		//e.data.element.css("backgroundColor","").css("border","")
		_selectedElement = e.data;
		if (elementID == "root"){
			//alert(e.data.id);
		}

		_options.callback.onclick.call(null,e);
	};

	function getSelectedElement(e){
		return _selectedElement;
	};

    function shrinkBreadCrumb(e)
    {
		jQuery(e.data.element).removeClass("over");
		if (_selectedElement == null || (_selectedElement != null && e.data.id != _selectedElement.id )){
	        var elementID = e.data.id;
	        jQuery(e.data.element).stop();

	        jQuery(e.data.element).animate(
	        {
	            width: _options.previewWidth
	        },
	        {
	            duration: _options.timeCompressionAnimation,
	            easing: _options.easing,
	            queue: false
	        });
	        return false;
		} else {
		}
    };

    function isIE6OrLess()
    {
        var isIE6 = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent);
        return isIE6;
    };
    // Fix The Overlay for IE6
    function fixPNG(element)
    {
        var image;
        if (jQuery(element).is('img'))
        {
            image = jQuery(element).attr('src');
        }
        else
        {
            image = $(element).css('backgroundImage');
            image.match(/^url\(["']?(.*\.png)["']?\)$/i);
            image = RegExp.$1;
            ;
        }
        $(element).css(
        {
            'backgroundImage': 'none',
            'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='" + image + "')"
        });
    };

    // Public global variables

    jQuery.fn.jBreadCrumb.defaults =
    {
        maxFinalElementLength: 40,
        minFinalElementLength: 0,
        minimumCompressionElements: 0,
        endElementsToLeaveOpen: 1,
        beginingElementsToLeaveOpen: 0,
        minElementsToCollapse: 0,
        timeExpansionAnimation: 800,
        timeCompressionAnimation: 500,
        timeInitialCollapse: 600,
        easing: 'easeOutQuad',
        overlayClass: '.chevronOverlay',
        previewWidth: 8,
		callback : {
			onclick : function(e){
					$("#searchPathHidden").attr("value",e.target.name);
					if (e.target.id == "RootBread"){
						$("a[id=RootBread]").addClass("selected");
						$("a[class=lastBread]").css("color","black");
						$("a[class=lastBread]").css("text-decoration","none");

						$("a[id=bread]").css("color","black");
						$("a[id=bread]").css("text-decoration","none");

					}else{
						$("a[id=bread]").css("color","black");
						$("a[id=bread]").css("text-decoration","none");
						$("a[id=RootBread]").removeClass("selected");
						$("a[name="+e.target.name+"]").css("color","#50A029");
						$("a[name="+e.target.name+"]").css("text-decoration","underline");
					}
    			}
			}
    };

})(jQuery);
