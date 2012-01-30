package org.esco.grouperui.web.beans.search;

/**
 * Enumeration to specify all type of search.
 * Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
public enum SearchTypeEnum {
    /**
     * The different items of the enumeration.
     */
    SEARCH_SIMPLE(0, "SEARCH_SIMPLE"), SEARCH_FOR_ADDITION(1, "SEARCH_FOR_ADDITION");

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
    private SearchTypeEnum() {

    }

    /**
     * The constructor.
     * 
     * @param theId
     *            the id of the enum object.
     * @param theLabel
     *            the label of the enum object.
     */
    SearchTypeEnum(final int theId, final String theLabel) {
        this.idEnum = theId;
        this.label = theLabel;
    }

    /**
     * Get the SearchSubjectEnum from the value.
     * 
     * @param theLabel
     *            the label of the SearchSubjectEnum item
     * @return the SearchTypeEnum
     */
    public static SearchSubjectEnum fromValue(final String theLabel) {

        return SearchSubjectEnum.valueOf(theLabel);
    }

    /**
     * The equals function.
     * 
     * @param theSearchTypeEnum
     *            the other SearchTypeEnum to compare
     * @return true if equals else false.
     */
    public boolean eq(final SearchSubjectEnum theSearchTypeEnum) {
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
