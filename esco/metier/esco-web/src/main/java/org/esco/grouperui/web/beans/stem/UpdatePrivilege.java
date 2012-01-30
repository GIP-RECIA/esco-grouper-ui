package org.esco.grouperui.web.beans.stem;

/**
 * Class UpdatePrivilege. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-004] <br/>
 * [RECIA-ESCO-L1-005]
 * 
 * @author ctrimoreau
 */
public class UpdatePrivilege {

    /** The group uuid. */
    private String  elementUuid;

    /** The possibility to subscribe. */
    private Boolean hasStem;

    /** The possibility to unsubscribe. */
    private Boolean hasCreate;

    /**
     *
     */
    public UpdatePrivilege() {
    }

    /**
     * Getter for elementUuid.
     * 
     * @return the elementUuid to get.
     */
    public final String getElementUuid() {
        return this.elementUuid;
    }

    /**
     * Setter for elementUuid.
     * 
     * @param theElementUuid
     *            the elementUuid to set.
     */
    public final void setElementUuid(final String theElementUuid) {
        this.elementUuid = theElementUuid;
    }

    /**
     * Getter for hasStem.
     * 
     * @return the hasStem to get.
     */
    public final Boolean getHasStem() {
        return this.hasStem;
    }

    /**
     * Setter for hasStem.
     * 
     * @param theHasStem
     *            the hasStem to set.
     */
    public final void setHasStem(final Boolean theHasStem) {
        this.hasStem = theHasStem;
    }

    /**
     * Getter for hasCreate.
     * 
     * @return the hasCreate to get.
     */
    public final Boolean getHasCreate() {
        return this.hasCreate;
    }

    /**
     * Setter for hasCreate.
     * 
     * @param theHasCreate
     *            the hasCreate to set.
     */
    public final void setHasCreate(final Boolean theHasCreate) {
        this.hasCreate = theHasCreate;
    }

}
