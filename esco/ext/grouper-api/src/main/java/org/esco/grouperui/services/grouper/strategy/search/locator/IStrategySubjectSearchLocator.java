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
