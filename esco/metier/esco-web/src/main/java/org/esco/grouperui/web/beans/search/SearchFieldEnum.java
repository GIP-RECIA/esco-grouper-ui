package org.esco.grouperui.web.beans.search;

/**
 * The SearchFieldEnum class. The enumeration of the different search.
 * Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
public enum SearchFieldEnum implements SearchableEnum {

    /**
     * The different items of the enum.
     */
    DISPLAY_EXTENSION(3, "DISPLAY_EXTENSION"), NAME(2, "NAME"), DISPLAY_NAME(4, "DISPLAY_NAME");

    /**
     * The id property.
     */
    private int    idEnum;

    /**
     * The label property.
     */
    private String label;

    /**
     * Default constructor.
     */
    private SearchFieldEnum() {
    }

    /**
     * The constructor.
     * 
     * @param theId
     *            the id of the enum object.
     * @param theLabel
     *            the label of the enum object.
     */
    SearchFieldEnum(final int theId, final String theLabel) {
        this.idEnum = theId;
        this.label = theLabel;
    }

    /**
     * Get the SearchTypeEnum from the value.
     * 
     * @param theLabel
     *            the label of the SearchTypeEnum item
     * @return the SearchTypeEnum
     */
    public static SearchFieldEnum fromValue(final String theLabel) {

        return SearchFieldEnum.valueOf(theLabel);
    }

    /**
     * The equals function.
     * 
     * @param theSearchTypeEnum
     *            the other SearchTypeEnum to compare
     * @return true if equals else false.
     */
    public boolean eq(final SearchFieldEnum theSearchTypeEnum) {
        return this.idEnum == theSearchTypeEnum.getId();
    }

    /**
     * Get the id property.
     * 
     * @return the id
     */
    public int getId() {
        return this.idEnum;
    }

    /**
     * Get the label property.
     * 
     * @return the label
     */
    public String getLabel() {
        return this.label;
    }

}
