package org.esco.grouperui.services.dynamicgroup.internal;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.services.dynamicgroup.IStrategyRequestFactory;

/**
 * Default request strategy.
 * 
 * @author dMoulron
 */
public class DefaultStrategyRequestFactory implements IStrategyRequestFactory {

    /**
     * Default constructor.
     */
    public DefaultStrategyRequestFactory() {
    }

    /**
     * {@inheritDoc}
     */
    public String createRequest(final Person thePerson, final Group theGroup, final Stem theStem) {
        return "";
    }

}
