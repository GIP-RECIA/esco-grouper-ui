package org.esco.grouperui.domaine.beans;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.esco.grouperui.services.ESCOConstantes;

/**
 * Class to store subject informations.
 * Requirement(s):[RECIA-ESCO-L1-007][RECIA-ESCO-L1-008]
 * 
 * @author dMoulron
 */
public class Person extends Sortable {

    /**
     * The serial uid.
     */
    private static final long              serialVersionUID = 7108885483381658754L;

    /** Map of attributes. */
    private Map < String, Set < String > > attributes;

    /**
     * Default constructor.
     */
    public Person() {
        this.attributes = new HashMap < String, Set < String > >();
        this.setTypeEnum(SourceTypeEnum.PERSON);
    }

    /**
     * Get the idSubject property.
     * 
     * @return the idSubject
     */
    public String getId() {
        return this.getValueFormCol("id");
    }

    /**
     * Get the login of the person.
     * 
     * @return the login
     */
    public String getLogin() {
        return this.getValueFormCol("login");
    }

    /**
     * Setter of the idSubject property.
     * 
     * @param theIdSubject
     *            the idSubject to set
     */
    public void setId(final String theIdSubject) {
        this.addMappingFieldCol("id", theIdSubject);
    }

    /**
     * Get the description property.
     * 
     * @return the description
     */
    public String getDescription() {
        return this.getValueFormCol("description");
    }

    /**
     * Setter of the description property.
     * 
     * @param theDescription
     *            the description to set
     */
    public void setDescription(final String theDescription) {
        this.addMappingFieldCol("description", theDescription);
    }

    /**
     * Get the name property.
     * 
     * @return the name
     */
    public String getName() {
        return this.getValueFormCol("name");
    }

    /**
     * Setter of the name property.
     * 
     * @param theName
     *            the name to set
     */
    public void setName(final String theName) {
        this.addMappingFieldCol("name", theName);
    }

    /**
     * Get the source property.
     * 
     * @return the source
     */
    public String getSource() {
        return this.getValueFormCol("source");
    }

    /**
     * Setter of the source property.
     * 
     * @param theSource
     *            the source to set
     */
    public void setSource(final String theSource) {
        this.addMappingFieldCol("source", theSource);
    }

    /**
     * Get the type property.
     * 
     * @return the type
     */
    public String getType() {
        return this.getValueFormCol("type");
    }

    /**
     * Setter of the type property.
     * 
     * @param theType
     *            the type to set
     */
    public void setType(final String theType) {
        this.addMappingFieldCol("type", theType);
    }

    /**
     * Get the attributes property.
     * 
     * @return the attributes
     */
    public Map < String, Set < String >> getAttributes() {
        return this.attributes;
    }

    /**
     * Setter of the attributes property.
     * 
     * @param theAttributes
     *            the attributes to set
     */
    public void setAttributes(final Map < String, Set < String >> theAttributes) {
        this.attributes = theAttributes;
        for (Entry < String, Set < String >> attribute : theAttributes.entrySet()) {
            Iterator < String > itValues = attribute.getValue().iterator();
            String attrSet = "";
            while (itValues.hasNext()) {
                attrSet += itValues.next();

                if (itValues.hasNext()) {
                    attrSet += ";";
                }
            }

            this.addMappingFieldCol("attribute." + attribute.getKey(), attrSet);
        }

    }

    /**
     * Allow to retrieve attributes key from a user subject attributes.
     * 
     * @return the key from attributes.
     */
    public Set < String > getAttributesKey() {
        return this.attributes.keySet();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getValueFormCol(final String theIndexCol) {
        if (ESCOConstantes.NULL_DATA_IN_THIS_MAPPING_FIELD_COL.equals(this.getMappingFieldCol().get(theIndexCol))) {
            return "";
        } else {
            return this.getMappingFieldCol().get(theIndexCol);
        }
    }
}
