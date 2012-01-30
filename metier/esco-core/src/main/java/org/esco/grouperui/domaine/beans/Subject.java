package org.esco.grouperui.domaine.beans;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Class Subject. Requirement(s): [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class Subject extends Sortable implements Cloneable {

    /**
     * The serialVersionUID of the class.
     */
    private static final long    serialVersionUID = -190659575594052559L;

    /** The id of the subject. */
    private String               idSubject;

    /** The attributes list of the subject. */
    private List < SimpleValue > attributes;

    /**
     * Default constructor.
     */
    public Subject() {
        this.attributes = new ArrayList < SimpleValue >();
    }

    /**
     * Getter for id.
     * 
     * @return the id to get.
     */
    public final String getId() {
        return this.getValueFormCol("id");
    }

    /**
     * Setter for id.
     * 
     * @param theId
     *            the id to set.
     */
    public final void setId(final String theId) {
        this.idSubject = theId;
        this.addMappingFieldCol("id", this.idSubject);
    }

    /**
     * Getter for attributes.
     * 
     * @return the attributes to get.
     */
    public final List < SimpleValue > getAttributes() {
        return this.attributes;
    }

    /**
     * setter for property attributes.
     * 
     * @param theAttributes
     *            the attributes to set
     */
    public void setAttributes(final List < SimpleValue > theAttributes) {
        this.attributes = theAttributes;

        SimpleValue simpleValue = null;
        Iterator < SimpleValue > itAttr = this.attributes.iterator();
        while (itAttr.hasNext()) {
            simpleValue = itAttr.next();
            this.addMappingFieldCol(simpleValue.getKey(), simpleValue.getValue());
        }
    }

    /**
     * Add a new SimpleValue to the list of attributes.
     * 
     * @param theSimpleValue
     *            the SimpleValue to add.
     */
    public final void addAttribute(final SimpleValue theSimpleValue) {
        this.attributes.add(theSimpleValue);
        this.addMappingFieldCol(theSimpleValue.getKey(), theSimpleValue.getValue());
    }

    /**
     * Getter for hasStem.
     * 
     * @return the hasStem to get.
     */
    public final Boolean getHasStem() {
        return "true".equals(this.getValueFormCol("hasStem"));
    }

    /**
     * Getter for hasCreate.
     * 
     * @return the hasCreate to get.
     */
    public final Boolean getHasCreate() {
        return "true".equals(this.getValueFormCol("hasCreate"));
    }

    /**
     * Setter for hasStem.
     * 
     * @param theHasStem
     *            the hasStem to set.
     */
    public final void setHasStem(final Boolean theHasStem) {
        this.addMappingFieldCol("hasStem", theHasStem.toString());
    }

    /**
     * Setter for hasCreate.
     * 
     * @param theHasCreate
     *            the hasCreate to set.
     */
    public final void setHasCreate(final Boolean theHasCreate) {
        this.addMappingFieldCol("hasCreate", theHasCreate.toString());
    }

    /**
     * Getter for optin.
     * 
     * @return the optin to get.
     */
    public final Boolean getOptin() {
        return "true".equals(this.getValueFormCol("canOptin"));
    }

    /**
     * Setter for optin.
     * 
     * @param theOptin
     *            the optin to set.
     */
    public final void setOptin(final Boolean theOptin) {
        this.addMappingFieldCol("canOptin", theOptin.toString());
    }

    /**
     * Getter for optout.
     * 
     * @return the optout to get.
     */
    public final Boolean getOptout() {
        return "true".equals(this.getValueFormCol("canOptout"));
    }

    /**
     * Setter for optout.
     * 
     * @param theOptout
     *            the optout to set.
     */
    public final void setOptout(final Boolean theOptout) {
        this.addMappingFieldCol("canOptout", theOptout.toString());
    }

    /**
     * Getter for subjectRight.
     * 
     * @return the subjectRight to get.
     */
    public final GroupPrivilegeEnum getSubjectRight() {
        return GroupPrivilegeEnum.fromValue(this.getValueFormCol("userRight"));
    }

    /**
     * Setter for subjectRight.
     * 
     * @param theSubjectRight
     *            the subjectRight to set.
     */
    public final void setSubjectRight(final GroupPrivilegeEnum theSubjectRight) {
        this.addMappingFieldCol("userRight", theSubjectRight.getName());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getValueFormCol(final String theIndexCol) {
        return this.getMappingFieldCol().get(theIndexCol);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Object clone() {
        Subject newObject = new Subject();

        newObject.setAttributes(this.getAttributes());

        Map < String, String > aux = this.getMappingFieldCol();

        for (String key : aux.keySet()) {
            newObject.addMappingFieldCol(key, aux.get(key));
        }

        newObject.setTypeEnum(this.getTypeEnum());

        return newObject;
    }
}
