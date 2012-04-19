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

import java.io.IOException;

import javax.faces.FacesException;
import javax.faces.component.UIComponentBase;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * @author dMoulron
 */
public class EscoIncludeComponent extends UIComponentBase {

    /**
     * The type Component.
     */
    public static final String COMPONENT_TYPE = "org.esco.grouperui.EscoInclude";

    /**
     * Default constructor.
     */
    public EscoIncludeComponent() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void encodeBegin(final FacesContext theContext) throws IOException {
        String url = (String) this.getAttributes().get("url");
        ExternalContext ext = theContext.getExternalContext();

        ServletContext servletContext = (ServletContext) ext.getContext();
        ServletRequest servletRequest = (ServletRequest) ext.getRequest();
        ServletResponse servletResponse = (ServletResponse) ext.getResponse();
        RequestDispatcher dispatcher = servletContext.getRequestDispatcher(url);
        try {
            dispatcher.include(servletRequest, servletResponse);
        } catch (IOException e) {
            throw new FacesException(e);
        } catch (ServletException e) {
            throw new FacesException(e);
        }

        super.encodeBegin(theContext);
    }

    @Override
    public String getFamily() {
        return EscoIncludeComponent.COMPONENT_TYPE;
    }
}
