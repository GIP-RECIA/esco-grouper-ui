package org.esco.grouperui.services.grouper.strategy.search.locator;

import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;
import org.esco.grouperui.services.grouper.strategy.search.IStrategyGroupSearch;

/**
 * Search strategy locator.<br/>
 * <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * 
 * @author SopraGroup
 */
public interface IStrategyGroupSearchLocator {

    /**
     * Find search strategy.
     * 
     * @param searchField
     *            : the field of the search.
     * @param type
     *            : the type of the search.
     * @param path
     *            : the path of the search.
     * @param term
     *            : the term of the search.
     * @param subject
     *            : the id of the subject.
     * @return a strategy for the search.
     */
    IStrategyGroupSearch locate(final SearchGroupEnum searchField, final SearchTypeEnum type, final String path,
            final String term, final String subject);
}
