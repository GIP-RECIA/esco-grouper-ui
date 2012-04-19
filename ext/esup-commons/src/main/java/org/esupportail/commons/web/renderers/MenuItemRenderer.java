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
package org.esupportail.commons.web.renderers;

import java.io.IOException;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.apache.myfaces.renderkit.html.ext.HtmlButtonRenderer;
import org.apache.myfaces.shared_impl.renderkit.html.HTML;
import org.esupportail.commons.web.tags.PageTag;
import org.esupportail.commons.web.tags.config.TagsConfigurator;

/**
 * ESUP-Portail renderer for the 'menuItem' tag.
 */
public class MenuItemRenderer extends HtmlButtonRenderer {
	/**
	 * The renderer type.
	 */
	public static final String RENDERER_TYPE = "org.esupportail.MenuItemRenderer";

	/**
	 * Constructor.
	 *
	 */
	public MenuItemRenderer() {
		super();
	}

	/**
	 * @param facesContext 
	 * @param component 
	 * @return true if the compoent is selected.
	 */
	private boolean isSelected(final FacesContext facesContext, final UIComponent component) {
		String id = component.getClientId(facesContext);
		if (id == null) {
			return false;
		}
		String [] idTokens = id.split(":");
		if (idTokens.length < 1) {
			return false;
		}
		String shortId = idTokens[idTokens.length - 1];
		return shortId.equals(PageTag.getCurrentMenuItem());
	}
	
	/**
	 * @see javax.faces.render.Renderer#encodeBegin(
	 * javax.faces.context.FacesContext, javax.faces.component.UIComponent)
	 */
	@Override
	public void encodeBegin(final FacesContext facesContext, final UIComponent component) throws IOException {
		TagsConfigurator tagsConfigurator = TagsConfigurator.getInstance();
		ResponseWriter writer = facesContext.getResponseWriter();
		writer.startElement(HTML.LI_ELEM, component);
		String styleClass;
		if (isSelected(facesContext, component)) {
			styleClass = tagsConfigurator.getMenuActiveItemStyleClass();
		} else {
			styleClass = tagsConfigurator.getMenuItemStyleClass();
		}
		writer.writeAttribute(HTML.CLASS_ATTR, styleClass, null);
		super.encodeBegin(facesContext, component);
	}

	/**
	 * @see org.apache.myfaces.shared_tomahawk.renderkit.html.HtmlButtonRendererBase#encodeEnd(
	 * javax.faces.context.FacesContext, javax.faces.component.UIComponent)
	 */
	@Override
	public void encodeEnd(final FacesContext facesContext, final  UIComponent component) throws IOException {
		super.encodeEnd(facesContext, component);
		ResponseWriter writer = facesContext.getResponseWriter();
		writer.endElement(HTML.LI_ELEM);
	}
}
