package org.esco.grouperui.services.grouper.internal.wrapper;

import org.esco.grouperui.domaine.beans.Field;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;

/**
 * Class FieldWrapper. Requirements: [RECIA-ESCO-L1-007]
 * 
 * @author SopraGroup
 */
public class FieldWrapper implements IWrapper < edu.internet2.middleware.grouper.Field, Field > {

    /** UID. */
    private static final long serialVersionUID = 833079998986284712L;

    /**
     * Default constructor.
     */
    public FieldWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public Field wrap(final edu.internet2.middleware.grouper.Field theObjectSource) throws ESCOWrapperException {
        Field field = new Field();

        field.setName(theObjectSource.getName());
        field.setUuid(theObjectSource.getUuid());
        field.setGroupTypeUuid(theObjectSource.getGroupTypeUuid());

        return field;
    }

}
