package org.esco.grouperui.domaine.beans;

/**
 * Class SourceTypeEnum. Requirement(s):[RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public enum SourceTypeEnum {

    /** The different kind of source. */
    GROUP("group"), PERSON("person"), STEM("stem");

    /** The type of the source. */
    private String type;

    /**
     * Default constructor.
     * 
     * @param theType
     *            the type of the source.
     */
    private SourceTypeEnum(final String theType) {
        this.type = theType;
    }

    /**
     * Get the SourceTypeEnum from value.
     * 
     * @param theType
     *            The type of the SourceTypeEnum to get.
     * @return the SourceTypeEnum.
     */
    public SourceTypeEnum fromValue(final String theType) {
        return SourceTypeEnum.valueOf(theType.toUpperCase());
    }

    /**
     * Getter for type.
     * 
     * @return the type to get.
     */
    public final String getType() {
        return this.type;
    }

}
