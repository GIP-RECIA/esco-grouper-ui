package org.esco.grouperui.web.beans.search;

/**
 * The SearchSubjectEnum class. The enumeration of the different search.
 * Requirement(s):[RECIA-ESCO-L1-001],[RECIA-ESCO-L1-021]
 * 
 * @author aChesneau
 */
public enum SearchSubjectEnum {

    /**
     * The different items of the enumeration.
     */
    SEARCH_GROUP(0, "SEARCH_GROUP"), SEARCH_PERSON_IN_A_GROUP(2, "SEARCH_PERSON_IN_A_GROUP"), SEARCH_PERSON(1,
            "SEARCH_PERSON");

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
    private SearchSubjectEnum() {

    }

    /**
     * The constructor.
     * 
     * @param theId
     *            the id of the enum object.
     * @param theLabel
     *            the label of the enum object.
     */
    SearchSubjectEnum(final int theId, final String theLabel) {
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
