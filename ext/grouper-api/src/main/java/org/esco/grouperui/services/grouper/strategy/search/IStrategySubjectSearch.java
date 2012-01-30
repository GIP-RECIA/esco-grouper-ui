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
