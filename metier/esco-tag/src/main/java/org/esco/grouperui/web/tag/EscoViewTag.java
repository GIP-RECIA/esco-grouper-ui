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
package org.esco.grouperui.web.tag;

import java.util.Locale;

import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;
import javax.servlet.ServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.jstl.core.Config;

import org.apache.myfaces.taglib.core.ViewTag;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esupportail.commons.web.tags.config.TagsConfigurator;

/**
 * @author dMoulron
 */
public class EscoViewTag extends ViewTag {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(EscoViewTag.class);
    /**
     *
     */
    private String                   stringsVar;

    /**
     * Default constructor.
     */
    public EscoViewTag() {
        super();
    }

    /**
     * getter for property stringsVar.
     * 
     * @return the stringsVar
     */
    public String getStringsVar() {
        return this.stringsVar;
    }

    /**
     * setter for property stringsVar.
     * 
     * @param theStringsVar
     *            the stringsVar to set
     */
    public void setStringsVar(final String theStringsVar) {
        this.stringsVar = theStringsVar;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int doStartTag() throws JspException {
        EscoViewTag.LOGGER.debug("entering EscoViewTag.doStartTag");
        int result = super.doStartTag();

        Locale locale = (Locale) Config.get((ServletRequest) this.getFacesContext().getExternalContext()
                .getRequest(), Config.FMT_LOCALE);

        FacesContext facesContext = FacesContext.getCurrentInstance();
        TagsConfigurator tagsConfigurator = TagsConfigurator.getInstance();
        facesContext.getExternalContext().getRequestMap()
                .put(this.stringsVar, tagsConfigurator.getStrings(locale));

        // parameter label
        ValueBinding valueBinding = this.getFacesContext().getApplication().createValueBinding(
                "#{" + this.stringsVar + "}");
        valueBinding.setValue(this.getFacesContext(), tagsConfigurator.getStrings(locale));

        return result;
    }
}
