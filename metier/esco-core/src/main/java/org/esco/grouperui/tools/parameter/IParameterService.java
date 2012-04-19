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
package org.esco.grouperui.tools.parameter;

import java.io.Serializable;
import java.util.List;

/**
 * Define all service to store, update and reader application parameter. <br/>
 * Requirement(s): [RECIA-ESCO-L1-012]
 * 
 * @author dMoulron
 */
public interface IParameterService extends Serializable {

    /**
     * @param theGroup
     *            the associated services that can execute the request in the
     *            configuration
     * @param theKey
     *            the key corresponding to the pkay in database
     * @return The list of all parameter in database corresponding to the group
     *         name and the key
     */
    List < Parameter > findParametersById(final String theGroup, final String theKey);

    /**
     * @return The list of all group in database
     */
    List < ParameterGroup > getRegisteredGroup();

    /**
     * @param theGroup
     *            the associated services that can execute the request in the
     *            configuration
     * @return one group parameter corresponding to the group name
     */
    ParameterGroup findParametersByGroup(final String theGroup);

    /**
     * @param theGroupSuffix
     *            the associated services that can execute the request in the
     *            configuration
     * @return the list of group parameter corresponding to the suffix of the
     *         group
     */
    List < ParameterGroup > findParametersByGroupSuffix(final String theGroupSuffix);
}
