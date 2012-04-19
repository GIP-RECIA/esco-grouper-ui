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
package org.esco.grouperui.tools;

import java.io.Serializable;

import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;

/**
 * <b>Wrapper interface.</b> <br/>
 * Requirement(s): [RECIA-ESCO-L1-012]
 * 
 * @author SopraGroup
 * @param <T>
 *            Type of source objects.
 * @param <V>
 *            typy of return objects.
 */
public interface IWrapper<T, V> extends Serializable {

    /**
     * Wrapping object into another.
     * 
     * @param objectSource
     *            : the object to wrap.
     * @return the wrapping object
     * @throws ESCOWrapperException
     *             : if the wrap is not correct.
     */
    V wrap(T objectSource) throws ESCOWrapperException;
}
