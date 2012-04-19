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
package org.esco.grouperui.services.application.batch;

import java.util.HashMap;
import java.util.Map;

import org.esco.grouperui.exceptions.ESCOTechnicalException;

/**
 * An abstract class inherited by all the handlers exception for them to get a
 * map for transverse datas.<br>
 * Requirement(s) : [RECIA-ESCO-L2-004]
 * 
 * @author SopraGroup
 */
public abstract class AbstractExceptionHandler implements IExceptionHandler {

    /** a map containing transverse datas for the exception handler. */
    private Map < String, Object > data;

    /**
     * {@inheritDoc}
     */
    public void storeData(final String theKey, final Object theValue) {
        if (this.data == null) {
            this.data = new HashMap < String, Object >();
        }
        this.data.put(theKey, theValue);
    }

    /**
     * {@inheritDoc}
     */
    public void storeData(final Map theData) {
        this.data = theData;
    }

    /**
     * {@inheritDoc}
     */
    public Object getData(final String theKey) {
        if (this.data == null) {
            throw new ESCOTechnicalException("The map must be initialized.");
        }
        return this.data.get(theKey);
    }

}
