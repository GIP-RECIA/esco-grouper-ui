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
package org.esco.grouperui.web.utils;

import java.io.Serializable;

/**
 * @author dMoulron
 */
public class XmlProducer implements Serializable {

    /**
     * the serial uID.
     */
    private static final long serialVersionUID = 8377893670327827747L;

    /**
     *
     */
    private Object            target;

    /**
     *
     */
    private Class < ? >[]     typesOfTarget;

    /**
     * Default constructor.
     */
    public XmlProducer() {
    }

    /**
     * getter for property target.
     * 
     * @return the target
     */
    public Object getTarget() {
        return this.target;
    }

    /**
     * setter for property target.
     * 
     * @param theTarget
     *            the target to set
     */
    public void setTarget(final Object theTarget) {
        this.target = theTarget;
    }

    /**
     * getter for property typesOfTarget.
     * 
     * @return the typesOfTarget
     */
    public Class < ? >[] getTypesOfTarget() {
        return this.typesOfTarget;
    }

    /**
     * setter for property typesOfTarget.
     * 
     * @param theTypesOfTarget
     *            the typesOfTarget to set
     */
    public void setTypesOfTarget(final Class < ? >... theTypesOfTarget) {
        this.typesOfTarget = theTypesOfTarget;
    }

}
