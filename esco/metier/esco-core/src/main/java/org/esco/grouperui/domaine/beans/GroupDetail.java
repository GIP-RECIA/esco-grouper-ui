package org.esco.grouperui.domaine.beans;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;

import org.esco.grouperui.services.application.filters.CompositeTypeEnum;

/**
 * <b>Class GroupDetail.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001] [RECIA-ESCO-L1-007]
 * 
 * @author SopraGroup
 */
public class GroupDetail implements Serializable, Cloneable {

    /**
     * The serial uid.
     */
    private static final long      serialVersionUID = 3602743015651170802L;

    /**
     * Attribute names, not including the ones listed in the group result or
     * detail.
     */
    private String[]               attributeNames;

    /**
     * Attribute values, not including ones listed in the group result or
     * detail.
     */
    private String[]               attributeValues;

    /** Types names. */
    private String[]               typeNames;

    /** createdTime. */
    private Date                   createdTime;

    /** modifyTime. */
    private Date                   modifyTime;

    /** creatorID. */
    private String                 creatorID;

    /** modifierID. */
    private String                 modifierID;

    /** compositeType. */
    private CompositeTypeEnum      compositeType;

    /** hasComposite. */
    private Boolean                hasComposite;

    /** isCompositeFactor. */
    private Boolean                isCompositeFactor;

    /** leftGroup. */
    private Group                  leftGroup;

    /** rightGroup. */
    private Group                  rightGroup;

    /** modifySource. */
    private String                 modifySource;

    /** Parameters. **/
    private Map < String, String > parameters;

    /**
     * Default constructor.
     */
    public GroupDetail() {
    }

    /**
     * Getter for attribute <b>parameters</b>.
     * 
     * @return the parameters
     */
    public Map < String, String > getParameters() {
        return this.parameters;
    }

    /**
     * Setter for attribute <b>parameters</b>.
     * 
     * @param theParameters
     *            the parameters to set
     */
    public void setParameters(final Map < String, String > theParameters) {
        this.parameters = theParameters;
    }

    /**
     * Getter for attribute <b>typeNames</b>.
     * 
     * @return the typeNames
     */
    public String[] getTypeNames() {
        return this.typeNames;
    }

    /**
     * Setter for attribute <b>typeNames</b>.
     * 
     * @param theTypeNames
     *            the typeNames to set
     */
    public void setTypeNames(final String[] theTypeNames) {
        this.typeNames = theTypeNames;
    }

    /**
     * Getter for attribute <b>createdTime</b>.
     * 
     * @return the createdTime
     */
    public Date getCreatedTime() {
        return this.createdTime;
    }

    /**
     * Setter for attribute <b>createdTime</b>.
     * 
     * @param theCreatedTime
     *            the createdTime to set
     */
    public void setCreatedTime(final Date theCreatedTime) {
        this.createdTime = theCreatedTime;
    }

    /**
     * Getter for attribute <b>modifyTime</b>.
     * 
     * @return the modifyTime
     */
    public Date getModifyTime() {
        return this.modifyTime;
    }

    /**
     * Setter for attribute <b>modifyTime</b>.
     * 
     * @param theModifyTime
     *            the modifyTime to set
     */
    public void setModifyTime(final Date theModifyTime) {
        this.modifyTime = theModifyTime;
    }

    /**
     * Getter for attribute <b>creatorID</b>.
     * 
     * @return the creatorID
     */
    public String getCreatorID() {
        return this.creatorID;
    }

    /**
     * Setter for attribute <b>creatorID</b>.
     * 
     * @param theCreatorID
     *            the creatorID to set
     */
    public void setCreatorID(final String theCreatorID) {
        this.creatorID = theCreatorID;
    }

    /**
     * Getter for attribute <b>modifierID</b>.
     * 
     * @return the modifierID
     */
    public String getModifierID() {
        return this.modifierID;
    }

    /**
     * Setter for attribute <b>modifierID</b>.
     * 
     * @param theModifierID
     *            the modifierID to set
     */
    public void setModifierID(final String theModifierID) {
        this.modifierID = theModifierID;
    }

    /**
     * Getter for attribute <b>compositeType</b>.
     * 
     * @return the compositeType
     */
    public CompositeTypeEnum getCompositeType() {
        return this.compositeType;
    }

    /**
     * Setter for attribute <b>compositeType</b>.
     * 
     * @param theCompositeType
     *            the compositeType to set
     */
    public void setCompositeType(final CompositeTypeEnum theCompositeType) {
        this.compositeType = theCompositeType;
    }

    /**
     * Getter for attribute <b>hasComposite</b>.
     * 
     * @return the hasComposite
     */
    public Boolean getHasComposite() {
        return this.hasComposite;
    }

    /**
     * Setter for attribute <b>hasComposite</b>.
     * 
     * @param theHasComposite
     *            the hasComposite to set
     */
    public void setHasComposite(final Boolean theHasComposite) {
        this.hasComposite = theHasComposite;
    }

    /**
     * Getter for attribute <b>isCompositeFactor</b>.
     * 
     * @return the isCompositeFactor
     */
    public Boolean getIsCompositeFactor() {
        return this.isCompositeFactor;
    }

    /**
     * Setter for attribute <b>isCompositeFactor</b>.
     * 
     * @param theIsCompositeFactor
     *            the isCompositeFactor to set
     */
    public void setIsCompositeFactor(final Boolean theIsCompositeFactor) {
        this.isCompositeFactor = theIsCompositeFactor;
    }

    /**
     * Getter for attribute <b>leftGroup</b>.
     * 
     * @return the leftGroup
     */
    public Group getLeftGroup() {
        return this.leftGroup;
    }

    /**
     * Setter for attribute <b>leftGroup</b>.
     * 
     * @param theLeftGroup
     *            the leftGroup to set
     */
    public void setLeftGroup(final Group theLeftGroup) {
        this.leftGroup = theLeftGroup;
    }

    /**
     * Getter for attribute <b>rightGroup</b>.
     * 
     * @return the rightGroup
     */
    public Group getRightGroup() {
        return this.rightGroup;
    }

    /**
     * Setter for attribute <b>rightGroup</b>.
     * 
     * @param theRightGroup
     *            the rightGroup to set
     */
    public void setRightGroup(final Group theRightGroup) {
        this.rightGroup = theRightGroup;
    }

    /**
     * Getter for attribute <b>modifySource</b>.
     * 
     * @return the modifySource
     */
    public String getModifySource() {
        return this.modifySource;
    }

    /**
     * Setter for attribute <b>modifySource</b>.
     * 
     * @param theModifySource
     *            the modifySource to set
     */
    public void setModifySource(final String theModifySource) {
        this.modifySource = theModifySource;
    }

    /**
     * Getter for attributeNames.
     * 
     * @return the attributeNames to get.
     */
    public final String[] getAttributeNames() {
        return this.attributeNames;
    }

    /**
     * Setter for attributeNames.
     * 
     * @param theAttributeNames
     *            the attributeNames to set.
     */
    public final void setAttributeNames(final String[] theAttributeNames) {
        this.attributeNames = theAttributeNames;
    }

    /**
     * Getter for attributeValues.
     * 
     * @return the attributeValues to get.
     */
    public final String[] getAttributeValues() {
        return this.attributeValues;
    }

    /**
     * Setter for attributeValues.
     * 
     * @param theAttributeValues
     *            the attributeValues to set.
     */
    public final void setAttributeValues(final String[] theAttributeValues) {
        this.attributeValues = theAttributeValues;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public GroupDetail clone() throws CloneNotSupportedException {
        return (GroupDetail) super.clone();
    }

}
