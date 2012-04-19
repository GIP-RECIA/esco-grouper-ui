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
package org.esco.grouperui.web.tag.component;

import javax.faces.application.Application;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;
import javax.faces.webapp.UIComponentTag;

/**
 * @author dMoulron
 */
public class EscoIncludeTag extends UIComponentTag {

    /**
     * the url of included page.
     */
    private String url;

    /**
     * Default constructor.
     */
    public EscoIncludeTag() {
    }

    @Override
    public String getComponentType() {
        return EscoIncludeComponent.COMPONENT_TYPE;
    }

    @Override
    public String getRendererType() {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected void setProperties(final UIComponent component) {
        super.setProperties(component);

        if (this.url != null) {
            if (UIComponentTag.isValueReference(this.url)) {
                FacesContext context = FacesContext.getCurrentInstance();
                Application app = context.getApplication();
                ValueBinding valueBinding = app.createValueBinding(this.url);
                component.setValueBinding("url", valueBinding);
            } else {
                component.getAttributes().put("url", this.url);
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void release() {
        super.release();
        this.url = null;
    }

    /**
     * getter for property url.
     * 
     * @return the url
     */
    public String getUrl() {
        return this.url;
    }

    /**
     * setter for property url.
     * 
     * @param theUrl
     *            the url to set
     */
    public void setUrl(final String theUrl) {
        this.url = theUrl;
    }

}
