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

/**
 * An abstract class for renderers that wrap into a HTML and set a default style class.
 */
public abstract class AbstractTagWrapperRenderer extends AbstractHtmlFormatRenderer {
	
	/**
	 * Constructor.
	 */
	protected AbstractTagWrapperRenderer() {
		super();
	}

	/**
	 * @return the wrapping tag.
	 */
	protected abstract String getTag();

	/**
	 * @see org.esupportail.commons.web.renderers.AbstractHtmlFormatRenderer#internalEncodeBegin(
	 * javax.faces.context.FacesContext, javax.faces.component.UIComponent)
	 */
	@Override
	public void internalEncodeBegin(
			final FacesContext facesContext, 
			final UIComponent uiComponent) throws IOException {
		ResponseWriter writer = facesContext.getResponseWriter();
		writer.startElement(getTag(), uiComponent);
	}

	/**
	 * @see org.esupportail.commons.web.renderers.AbstractHtmlFormatRenderer#internalEncodeEnd(
	 * javax.faces.context.FacesContext, javax.faces.component.UIComponent)
	 */
	@Override
	public void internalEncodeEnd(
			final FacesContext facesContext, 
			@SuppressWarnings("unused") final UIComponent component)
	throws IOException {
		ResponseWriter writer = facesContext.getResponseWriter();
		writer.endElement(getTag());
	}

}
