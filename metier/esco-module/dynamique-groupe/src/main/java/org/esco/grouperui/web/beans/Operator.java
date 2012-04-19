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
package org.esco.grouperui.web.beans;

import java.io.Serializable;

/**
 * bean to describe o operator.
 * 
 * @author dMoulron
 */
public class Operator implements Serializable {

    /**
     * the serial uid.
     */
    private static final long serialVersionUID = -9109141983410700300L;

    /**
     * the name of operator.
     */
    private String            text;
    /**
     * the value of operator.
     */
    private String            value;

    /**
     * the default constructor.
     */
    public Operator() {
    }

    /**
     * full constructor.
     * 
     * @param theText
     *            the name of operator.
     * @param theValue
     *            the value of operator.
     */
    public Operator(final String theText, final String theValue) {
        this.text = theText;
        this.value = theValue;
    }

    /**
     * getter for property text.
     * 
     * @return the text
     */
    public String getText() {
        return this.text;
    }

    /**
     * setter for property text.
     * 
     * @param theText
     *            the text to set
     */
    public void setText(final String theText) {
        this.text = theText;
    }

    /**
     * getter for property value.
     * 
     * @return the value
     */
    public String getValue() {
        return this.value;
    }

    /**
     * setter for property value.
     * 
     * @param theValue
     *            the value to set
     */
    public void setValue(final String theValue) {
        this.value = theValue;
    }

}
