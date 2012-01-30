package org.esco.grouperui.domaine.beans;

import org.esco.grouperui.services.application.filters.ScopeEnum;

/**
 * <b>The Privilege bean class.</b> <br/>
 * 
 * @author SopraGroup
 */
public class Privilege extends Sortable {

    /**
     * The serial uid.
     */
    private static final long  serialVersionUID = 8814605004115109770L;

    /** The privilege name. */
    private String             privilegeName;

    /** The privilege type. */
    private String             privilegeType;

    /** The privilege owner. */
    private Person             owner;

    /** The type: IMMEDIATE, EFFECTIVE, ALL. */
    private ScopeEnum type;

    /** The group. */
    private Group              group;

    /** the stem. */
    private Stem               stem;

    /** Allowed, or not. */
    private Boolean            allowed;

    /** The subject. */
    private Person             subject;

    /** The subject. */
    private Person             personTarget;

    /** The subject. */
    private Group              groupTarget;

    /**
     * Default constructor.
     */
    public Privilege() {

    }

    /**
     * Contructor with all fields.
     * 
     * @param thePrivilegeName
     *            : the privilege name
     * @param thePrivilegeType
     *            : the privilege type
     * @param theOwner
     *            : the owner
     * @param theType
     *            : the type
     * @param theGroup
     *            : the group
     * @param theStem
     *            : the stem
     * @param isAllowed
     *            : allowed or not.
     * @param theSubject
     *            : the subject.
     */
    public Privilege(final String thePrivilegeName, final String thePrivilegeType, final Person theOwner,
            final ScopeEnum theType, final Group theGroup, final Stem theStem, final Boolean isAllowed,
            final Person theSubject) {

        this.privilegeName = thePrivilegeName;
        this.privilegeType = thePrivilegeType;
        this.owner = theOwner;
        this.type = theType;
        this.group = theGroup;
        this.stem = theStem;
        this.allowed = isAllowed;
        this.subject = theSubject;
    }

    /**
     * Getter for attribute <b>personTarget</b>.
     * 
     * @return the personTarget
     */
    public Person getPersonTarget() {
        return this.personTarget;
    }

    /**
     * Setter for attribute <b>personTarget</b>.
     * 
     * @param thePersonTarget
     *            the personTarget to set
     */
    public void setPersonTarget(final Person thePersonTarget) {
        this.personTarget = thePersonTarget;
    }

    /**
     * Getter for attribute <b>groupTarget</b>.
     * 
     * @return the groupTarget
     */
    public Group getGroupTarget() {
        return this.groupTarget;
    }

    /**
     * Setter for attribute <b>groupTarget</b>.
     * 
     * @param theGroupTarget
     *            the groupTarget to set
     */
    public void setGroupTarget(final Group theGroupTarget) {
        this.groupTarget = theGroupTarget;
    }

    /**
     * Getter for attribute <b>privilegeName</b>.
     * 
     * @return the privilegeName
     */
    public String getPrivilegeName() {
        return this.privilegeName;
    }

    /**
     * Setter for attribute <b>privilegeName</b>.
     * 
     * @param thePrivilegeName
     *            : the privilegeName to set
     */
    public void setPrivilegeName(final String thePrivilegeName) {
        this.privilegeName = thePrivilegeName;
        this.addMappingFieldCol("privilegeName", this.privilegeName);
    }

    /**
     * Getter for attribute <b>privilegeType</b>.
     * 
     * @return the privilegeType
     */
    public String getPrivilegeType() {
        return this.privilegeType;
    }

    /**
     * Setter for attribute <b>privilegeType</b>.
     * 
     * @param thePrivilegeType
     *            : the privilegeType to set
     */
    public void setPrivilegeType(final String thePrivilegeType) {
        this.privilegeType = thePrivilegeType;
        this.addMappingFieldCol("privilegeType", this.privilegeType);
    }

    /**
     * Getter for attribute <b>owner</b>.
     * 
     * @return the owner
     */
    public Person getOwner() {
        return this.owner;
    }

    /**
     * Setter for attribute <b>owner</b>.
     * 
     * @param theOwner
     *            : the owner to set
     */
    public void setOwner(final Person theOwner) {
        this.owner = theOwner;
    }

    /**
     * Getter for attribute <b>type</b>.
     * 
     * @return the type
     */
    public ScopeEnum getType() {
        return this.type;
    }

    /**
     * Setter for attribute <b>type</b>.
     * 
     * @param theType
     *            : the type to set
     */
    public void setType(final ScopeEnum theType) {
        this.type = theType;
    }

    /**
     * Getter for attribute <b>group</b>.
     * 
     * @return the group
     */
    public Group getGroup() {
        return this.group;
    }

    /**
     * Setter for attribute <b>group</b>.
     * 
     * @param theGroup
     *            : the group to set
     */
    public void setGroup(final Group theGroup) {
        this.group = theGroup;
    }

    /**
     * Getter for attribute <b>stem</b>.
     * 
     * @return the stem
     */
    public Stem getStem() {
        return this.stem;
    }

    /**
     * Setter for attribute <b>stem</b>.
     * 
     * @param theStem
     *            : the stem to set
     */
    public void setStem(final Stem theStem) {
        this.stem = theStem;
    }

    /**
     * Getter for attribute <b>allowed</b>.
     * 
     * @return the allowed
     */
    public Boolean getAllowed() {
        return this.allowed;
    }

    /**
     * Setter for attribute <b>allowed</b>.
     * 
     * @param theAllowed
     *            : the allowed to set
     */
    public void setAllowed(final Boolean theAllowed) {
        this.allowed = theAllowed;
        this.addMappingFieldCol("allowed", this.allowed.toString());
    }

    /**
     * Getter for attribute <b>subject</b>.
     * 
     * @return the subject
     */
    public Person getSubject() {
        return this.subject;
    }

    /**
     * Setter for attribute <b>subject</b>.
     * 
     * @param theSubject
     *            : the subject to set
     */
    public void setSubject(final Person theSubject) {
        this.subject = theSubject;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getValueFormCol(final String theIndexCol) {
        return this.getMappingFieldCol().get(theIndexCol);
    }

}
