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
package org.esco.grouperui.services.dynamicgroup;

import java.util.List;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.SimpleValue;
import org.esco.grouperui.domaine.beans.Stem;

/**
 * Interface to define service for dynamic group.
 * 
 * @author dMoulron
 */
public interface IGroupDynamicService {

    /**
     * @param thePerson
     *            the person call this method.
     * @param theGroup
     *            the group which use to construct request
     * @param theStem
     *            the stem which use to construct request
     * @return one strategy corresponding to the expression
     */
    String findApplyStrategy(final Person thePerson, final Group theGroup, final Stem theStem);

    /**
     * @param theRequest
     *            the request to find attribute
     * @param theAttribute
     *            one attribute for the request
     * @param theBaseObjectSearch
     *            the object search
     * @return list of dynamic attributes.
     */
    List < SimpleValue > executeRequest(final String theRequest, final String theAttribute,
            final String theBaseObjectSearch);

    /**
     * @param theRequest
     *            the request to find attribute
     * @param theAttributes
     *            attributes for the request
     * @param theBaseObjectSearch
     *            the object search
     * @return list of dynamic attributes.
     */
    List < List < SimpleValue >> decodeAndExecuteRequest(final String theRequest,
            final List < String > theAttributes, final String theBaseObjectSearch);
}
