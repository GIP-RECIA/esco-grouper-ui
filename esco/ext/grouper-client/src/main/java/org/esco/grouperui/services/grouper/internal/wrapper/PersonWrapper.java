package org.esco.grouperui.services.grouper.internal.wrapper;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouperClient.ws.beans.WsSubject;

/**
 * <b>Wrapper for stem. Convert a WsStem into Stem.</b><br/>
 * Requirements: [RECIA-ESCO-L1-007]
 * 
 * @author sopraGroup
 */
public class PersonWrapper implements IWrapper < WsSubject, Person > {

    /** UID. */
    private static final long        serialVersionUID = -1815647210969710957L;

    /** Logger for this class. */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(PersonWrapper.class);

    /**
     * Default constructor.
     */
    public PersonWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public Person wrap(final WsSubject theObjectSource) throws ESCOWrapperException {

        Validate.notNull(theObjectSource, "the source object is undefined");

        // PersonWrapper.LOGGER.debug("wrap(final WsGroup theObjectSource) - start");

        Person person = new Person();

        person.setId(theObjectSource.getId());
        person.setName(theObjectSource.getName());
        person.setSource(theObjectSource.getSourceId());

        // PersonWrapper.LOGGER.debug("wrap(final WsGroup theObjectSource) - end");

        return person;
    }
}
