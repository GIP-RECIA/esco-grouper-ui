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
package org.esco.grouperui.services.grouper.strategy.search.locator;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.services.grouper.strategy.search.IStrategySubjectSearch;

/**
 * <b>Search strategy locator.</b><br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * 
 * @author SopraGroup
 */
public interface IStrategySubjectSearchLocator {

    /**
     * Find search strategy.
     * 
     * @param person
     *            the person performing the search
     * @param path
     *            the path of the entry point of the search (i.e. the name of a
     *            folder)
     * @param term
     *            the full or partial term of search entered by the person.
     * @return the search strategy
     */
    IStrategySubjectSearch locate(final Person person, final String path, final String term);
}
