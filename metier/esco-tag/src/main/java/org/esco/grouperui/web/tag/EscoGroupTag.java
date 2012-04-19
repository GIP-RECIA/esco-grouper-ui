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

import javax.faces.context.FacesContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.Tag;

import org.apache.commons.lang.Validate;

/**
 * Class EscoGroupTag. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau TODO
 */
public class EscoGroupTag extends EscoTag {

    /**
     *
     */
    private static final long serialVersionUID = 4236563966447435320L;

    /**
     * The name corresponding to the group name.
     */
    private String            name;

    /**
     * Default constructor.
     */
    public EscoGroupTag() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int doStartTag() throws JspException {
        FacesContext context = FacesContext.getCurrentInstance();

        Validate.notEmpty(this.name);

        context.getExternalContext().getRequestMap().put(EscoTag.GROUP, this.name);

        return Tag.EVAL_BODY_INCLUDE;
    }

    /**
     * Setter for name.
     * 
     * @param theName
     *            the name to set.
     */
    public final void setName(final String theName) {
        this.name = theName;
    }

}
