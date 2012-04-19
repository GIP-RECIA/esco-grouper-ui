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
package org.esco.grouperui.services.grouper.strategy.search;

import java.util.List;

import org.esco.grouperui.domaine.beans.Person;

/**
 * <b>Interface for search strategy.</b><br/>
 * <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * 
 * @author SopraGroup
 */
public interface IStrategySubjectSearch {

    /**
     * <b>This method searches for persons from a term.</b>
     * 
     * @param thePerson
     *            the person performing the search.
     * @param thePath
     *            the path from which the search is launched.
     * @param theTerm
     *            the full or partial term of search entered by the person.
     * @return the list of person matching with the parameters.
     */
    List < Person > searchSubjects(final Person thePerson, final String thePath, final String theTerm);
}
