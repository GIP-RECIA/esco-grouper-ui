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

import org.apache.myfaces.shared_impl.renderkit.JSFAttr;
import org.apache.myfaces.taglib.html.ext.HtmlMessagesTag;
import org.esupportail.commons.web.tags.config.TagsConfigurator;

/**
 * An extension of h:message.
 */
public class MessagesTag extends HtmlMessagesTag {

	/**
	 * Constructor.
	 */
	public MessagesTag() {
		super();
	}
	
	/**
	 * @see org.apache.myfaces.taglib.html.ext.HtmlMessagesTag#setProperties(javax.faces.component.UIComponent)
	 */
	@Override
	protected void setProperties(final UIComponent component) {
		TagsConfigurator tagsConfigurator = TagsConfigurator.getInstance();
		String styleClass = tagsConfigurator.getMessagesInfoClass();
		if (styleClass != null) {
			setStringProperty(component, JSFAttr.INFO_CLASS_ATTR, styleClass);
		}
		styleClass = tagsConfigurator.getMessagesWarnClass();
		if (styleClass != null) {
			setStringProperty(component, JSFAttr.WARN_CLASS_ATTR, styleClass);
		}
		styleClass = tagsConfigurator.getMessagesErrorClass();
		if (styleClass != null) {
			setStringProperty(component, JSFAttr.ERROR_CLASS_ATTR, styleClass);
		}
		styleClass = tagsConfigurator.getMessagesFatalClass();
		if (styleClass != null) {
			setStringProperty(component, JSFAttr.FATAL_CLASS_ATTR, styleClass);
		}
        super.setProperties(component);
    }

}
