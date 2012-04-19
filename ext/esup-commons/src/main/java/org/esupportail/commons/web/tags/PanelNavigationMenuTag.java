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

import org.apache.myfaces.custom.navmenu.htmlnavmenu.HtmlPanelNavigationMenuTag;
import org.esupportail.commons.web.tags.config.TagsConfigurator;

/**
 * The ESUP-Portail implementation of the panelNavigationMenu tag.
 */
public class PanelNavigationMenuTag extends HtmlPanelNavigationMenuTag {

	/**
	 * Constructor.
	 */
	public PanelNavigationMenuTag() {
		super();
	}
	
	/**
	 * @see org.apache.myfaces.custom.navmenu.htmlnavmenu.HtmlPanelNavigationMenuTag#setProperties(
	 * javax.faces.component.UIComponent)
	 */
	@Override
	protected void setProperties(final UIComponent component) {
		TagsConfigurator tagsConfigurator = TagsConfigurator.getInstance(); 
		setLayout(tagsConfigurator.getMenuLayout());
		setStyleClass(tagsConfigurator.getMenuStyleClass());
		setActiveItemClass(tagsConfigurator.getMenuActiveItemStyleClass());
		setItemClass(tagsConfigurator.getMenuItemStyleClass());
		super.setProperties(component);
	}
}
