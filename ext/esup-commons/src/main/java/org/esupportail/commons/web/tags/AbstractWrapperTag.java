/**
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
 * ESUP-Portail Commons - Copyright (c) 2006-2009 ESUP-Portail consortium.
 */
package org.esupportail.commons.web.tags;

import javax.faces.component.UIComponent;

import org.apache.myfaces.shared_impl.renderkit.html.HTML;
import org.apache.myfaces.taglib.html.HtmlOutputFormatTag;

/**
 * An abstract class for tags that wrap into a HTML tag.
 */
public abstract class AbstractWrapperTag extends HtmlOutputFormatTag {

	/**
	 * Constructor.
	 */
	public AbstractWrapperTag() {
		super();
	}
	
	/**
	 * @return the style to apply.
	 */
	protected abstract String getStyle();

	/**
	 * @return the style class to apply.
	 */
	protected abstract String getStyleClass();

	/**
	 * @see org.apache.myfaces.shared_impl.taglib.html.HtmlOutputFormatTagBase#setProperties(
	 * javax.faces.component.UIComponent)
	 */
	@Override
	protected void setProperties(final UIComponent component) {
		String style = getStyle();
		if (style != null) {
			setStringProperty(component, HTML.STYLE_ATTR, getStyle());
		}
		String styleClass = getStyleClass();
		if (styleClass != null) {
			setStringProperty(component, HTML.STYLE_CLASS_ATTR, getStyleClass());
		}
		super.setProperties(component);
	}

}
