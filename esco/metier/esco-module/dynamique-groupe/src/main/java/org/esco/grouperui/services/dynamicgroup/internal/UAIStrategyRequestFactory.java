package org.esco.grouperui.services.dynamicgroup.internal;

import java.util.Iterator;
import java.util.Set;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.services.dynamicgroup.IStrategyRequestFactory;

/**
 * @author dMoulron
 */
public class UAIStrategyRequestFactory implements IStrategyRequestFactory {

    /** ESCOUAI. */
    private static final String ESCOUAI = "ESCOUAIRattachement";

    /**
     * Default constructor.
     */
    public UAIStrategyRequestFactory() {
    }

    /**
     * {@inheritDoc}
     */
    public String createRequest(final Person thePerson, final Group theGroup, final Stem theStem) {
        String defaultRequest = "";

        String firstEtabOfthePerson = "";
        Set < String > etablissements = thePerson.getAttributes().get(UAIStrategyRequestFactory.ESCOUAI);
        if (etablissements != null) {
            Iterator < String > etablissementIterator = etablissements.iterator();
            if (etablissementIterator.hasNext()) {
                firstEtabOfthePerson = etablissementIterator.next();
                defaultRequest = "AND(ESCOUAIRattachement=" + firstEtabOfthePerson + ",sn=*)";
            }
        }
        return defaultRequest;
    }

}
