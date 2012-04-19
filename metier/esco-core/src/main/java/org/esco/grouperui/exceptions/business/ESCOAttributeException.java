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
package org.esco.grouperui.exceptions.business;

import java.util.ArrayList;
import java.util.List;

import org.esco.grouperui.exceptions.ESCOBusinessException;

/**
 * <b>Subject not found business exception.</b><br/>
 * <br/>
 * <b>Requirements:</b><br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-001]<br/>
 * 
 * @author SopraGroup
 */
public class ESCOAttributeException extends ESCOBusinessException {

    /** UID. */
    private static final long serialVersionUID = 7529529197472237989L;

    /** attribute associated with the exception. */
    private List < String >   attributes;

    /**
     * Getter for attribute <b>attributes</b>.
     * 
     * @return the attributes
     */
    public List < String > getAttributes() {
        return this.attributes;
    }

    /**
     * Setter for attribute <b>attributes</b>.
     * 
     * @param theAttributes
     *            the attributes to set
     */
    public void setAttributes(final List < String > theAttributes) {
        this.attributes = theAttributes;
    }

    /**
     * Default constructor.
     */
    public ESCOAttributeException() {
    }

    /**
     * Second constructor, with code.
     * 
     * @param code
     *            : the code of the exception.
     */
    public ESCOAttributeException(final String code) {
        super(code);
    }

    /**
     * Third constructor, with code & cause.
     * 
     * @param code
     *            : the code of the exception.
     * @param cause
     *            : the cause of the exception.
     */
    public ESCOAttributeException(final String code, final Throwable cause) {
        super(code, cause);
    }

    /**
     * Third constructor, with code & cause.
     * 
     * @param code
     *            : the code of the exception.
     * @param cause
     *            : the cause of the exception.
     * @param theName
     *            : the name of the attribute.
     */
    public ESCOAttributeException(final String code, final Throwable cause, final String theName) {
        super(code, cause);
        if (this.attributes == null || this.attributes.isEmpty()) {
            this.attributes = new ArrayList < String >();
        }

        this.attributes.add(theName);

    }

    /**
     * add an attribute in error to exception.
     * 
     * @param attribute
     *            : the attribute.
     */
    public void add(final String attribute) {
        if (this.attributes == null || this.attributes.isEmpty()) {
            this.attributes = new ArrayList < String >();
        }

        this.attributes.add(attribute);
    }

    public boolean isEmpty() {
        return this.getAttributes() == null || this.getAttributes().isEmpty();
    }
}
