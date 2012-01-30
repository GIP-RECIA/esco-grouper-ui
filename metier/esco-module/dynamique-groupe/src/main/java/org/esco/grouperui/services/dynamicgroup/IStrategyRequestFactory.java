package org.esco.grouperui.services.dynamicgroup;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Stem;

/**
 * @author dMoulron
 */
public interface IStrategyRequestFactory {

    /**
     * @param thePerson
     *            the person call this method.
     * @param theGroup
     *            the group which use to construct request
     * @param theStem
     *            the stem which use to construct request
     * @return string construct with all argument.
     */
    String createRequest(final Person thePerson, final Group theGroup, final Stem theStem);

}
