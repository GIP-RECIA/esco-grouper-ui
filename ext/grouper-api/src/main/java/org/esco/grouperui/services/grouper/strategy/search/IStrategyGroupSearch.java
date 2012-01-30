package org.esco.grouperui.services.grouper.strategy.search;

import java.util.List;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOStemNotFoundException;
import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;

/**
 * <b>Interface for search strategy.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001]
 * 
 * @author SopraGroup
 */
public interface IStrategyGroupSearch {

    /**
     * {@inheritDoc}
     * 
     * @throws ESCOStemNotFoundException
     */
    List < Group > searchGroups(final Person person, final SearchGroupEnum field, final SearchTypeEnum type,
            final String path, final String term) throws ESCOGroupNotFoundException;
}
