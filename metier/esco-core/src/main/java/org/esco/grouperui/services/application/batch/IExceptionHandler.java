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

import java.util.Map;

/**
 * Interface of step exception exposed.<br>
 * Requirement(s) : [RECIA-ESCO-L2-004]
 * 
 * @author SopraGroup
 */
public interface IExceptionHandler {

    /**
     * Starts the exception handling.
     * 
     * @param theCause
     *            the cause
     */
    void handleException(Throwable theCause);

    /**
     * Stores in the map a key and a value.
     * 
     * @param theKey
     *            the key to put in the map
     * @param theValue
     *            the value to put in the map
     */
    void storeData(String theKey, Object theValue);

    /**
     * Stores a map.
     * 
     * @param data
     *            the map to store
     */
    void storeData(Map data);

    /**
     * Gets an element of the map from the key.
     * 
     * @param theKey
     *            a key of the map
     * @return the element of the map matching with the key.
     */
    Object getData(String theKey);

}
