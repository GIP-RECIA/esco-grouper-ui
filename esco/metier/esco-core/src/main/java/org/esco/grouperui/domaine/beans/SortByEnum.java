package org.esco.grouperui.domaine.beans;

/**
 * @author aChesneau
 */
public enum SortByEnum {

    /** Ascendant sort. */
    ASC,
    /** descendant sort. */
    DESC;

    /**
     * Get the SortByEnum from value.
     * 
     * @param theType
     *            The type of the SortByEnum to get.
     * @return the SortByEnum.
     */
    public static SortByEnum fromValue(final String theType) {
        return SortByEnum.valueOf(theType.toUpperCase());
    }
}
