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
