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

import org.apache.myfaces.shared_impl.renderkit.html.HTML;
import org.apache.myfaces.shared_impl.renderkit.html.HtmlTextRendererBase;
import org.esupportail.commons.web.tags.config.TagsConfigurator;
/**
 * An abstract class for renderers that wrap into a HTML and set a default style class.
 */
public class FooterRenderer extends AbstractHtmlFormatRenderer {
	
	/**
	 * The renderer type.
	 */
	public static final String RENDERER_TYPE = "org.esupportail.FooterRenderer";

	/**
	 * Constructor.
	 */
	public FooterRenderer() {
		super();
	}

	/**
	 * Print the beginning of the footer.
	 * @param facesContext 
	 * @param uiComponent 
	 * @throws IOException 
	 */
	private static void encodeFooterBegin(
			final FacesContext facesContext, 
			final UIComponent uiComponent) 
	throws IOException {
		TagsConfigurator tagsConfigurator = TagsConfigurator.getInstance();
		ResponseWriter writer = facesContext.getResponseWriter();
		writer.startElement(HTML.DIV_ELEM, uiComponent);
		writer.writeAttribute(HTML.CLASS_ATTR, tagsConfigurator.getFooterStyleClass(), null);
	}

	/**
	 * @see org.esupportail.commons.web.renderers.AbstractHtmlFormatRenderer#internalEncodeBegin(
	 * javax.faces.context.FacesContext, javax.faces.component.UIComponent)
	 */
	@Override
	protected void internalEncodeBegin(
			final FacesContext facesContext, 
			final UIComponent uiComponent) 
	throws IOException {
		encodeFooterBegin(facesContext, uiComponent);
	}

	/**
	 * Print the end of the footer.
	 * @param facesContext 
	 * @throws IOException 
	 */
	private static void encodeFooterEnd(
			final FacesContext facesContext) 
	throws IOException {
		ResponseWriter writer = facesContext.getResponseWriter();
		writer.endElement(HTML.DIV_ELEM);
	}

	/**
	 * @see org.esupportail.commons.web.renderers.AbstractHtmlFormatRenderer#internalEncodeEnd(
	 * javax.faces.context.FacesContext, javax.faces.component.UIComponent)
	 */
	@Override
	protected void internalEncodeEnd(
			final FacesContext facesContext, 
			@SuppressWarnings("unused") final UIComponent uiComponent) 
	throws IOException {
		encodeFooterEnd(facesContext);
	}
	
	/**
	 * Encode a footer.
	 * @param facesContext 
	 * @param uiComponent 
	 * @param value the footer text to print 
	 * @throws IOException 
	 */
	public static void encodeFooter(
			final FacesContext facesContext, 
			final UIComponent uiComponent,
			final String value) 
	throws IOException {
			encodeFooterBegin(facesContext, uiComponent);
			HtmlTextRendererBase.renderOutputText(facesContext, uiComponent, value, true);
			encodeFooterEnd(facesContext);
	}

}
