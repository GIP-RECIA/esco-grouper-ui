package org.esco.grouperui.services.grouper.internal.wrapper;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * <b>Subject wrapper.</b><br/>
 * <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-007]<br/>
 * 
 * @author SopraGroup
 */
public class PersonWrapper implements IWrapper < edu.internet2.middleware.subject.Subject, Person > {

    /** UID. */
    private static final long        serialVersionUID = -6652121296556691154L;
    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(PersonWrapper.class);

    /**
     * Default constructor.
     */
    public PersonWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public Person wrap(final edu.internet2.middleware.subject.Subject theObjectSource) throws ESCOWrapperException {

        // PersonWrapper.LOGGER
        // .debug("wrap(final edu.internet2.middleware.subject.Subject theObjectSource) throws Exception - debut");

        Person person = new Person();

        person.setAttributes(theObjectSource.getAttributes());
        person.setDescription(theObjectSource.getDescription());
        person.setId(theObjectSource.getId());
        person.setName(theObjectSource.getName());
        person.setSource(theObjectSource.getSource().getId());
        person.setType(theObjectSource.getType().getName());

        // PersonWrapper.LOGGER
        // .debug("wrap(final edu.internet2.middleware.subject.Subject theObjectSource) throws Exception - fin");

        return person;
    }

}
