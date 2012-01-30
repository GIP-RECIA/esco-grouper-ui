package org.esco.grouperui.web.beans.tree;

import javax.xml.bind.annotation.XmlRootElement;

import org.esco.grouperui.tools.property.PropertyManager;
import org.esupportail.commons.services.i18n.I18nService;

/**
 * ContextMenuItem class. Requirement(s):[RECIA-ESCO-L1-012]
 * 
 * @author aChesneau
 */
@XmlRootElement(name = "elements")
public class ContextMenuItem {

    /**
     * The default generated uid.
     */
    private static final long serialVersionUID = -6848182371977675079L;

    /**
     * The id property. For the tree construction, it is necessary to nominate
     * the property "id".
     */
    private String            id;

    /** The label property. */
    private String            label;

    /** The icon property. */
    private String            icon;

    /** The visible function JavaScript. */
    private String            visible;

    /** The action function JavaScript. */
    private String            action;

    /** If Make a separator before or not. */
    private boolean           separator_before;

    /** The i18n service. */
    private I18nService       i18nService;

    /**
     * Default constructor.
     */
    public ContextMenuItem() {
    }

    /**
     * Get the id property.
     * 
     * @return the id
     */
    public String getId() {
        return this.id;
    }

    /**
     * Setter of the id property.
     * 
     * @param theId
     *            the id to set
     */
    public void setId(final String theId) {
        this.id = theId;
    }

    /**
     * Get the label property.
     * 
     * @return the label
     */
    public String getLabel() {
        return this.i18nService.getString(this.label);
    }

    /**
     * Setter of the label property.
     * 
     * @param theLabel
     *            the label to set
     */
    public void setLabel(final String theLabel) {
        this.label = theLabel;
    }

    /**
     * Get the icon property.
     * 
     * @return the icon
     */
    public String getIcon() {
        return this.icon;
    }

    /**
     * Setter of the icon property.
     * 
     * @param theIcon
     *            the icon to set
     */
    public void setIcon(final String theIcon) {
        this.icon = theIcon;
    }

    /**
     * Get the visible property.
     * 
     * @return the visible
     */
    public String getVisible() {
        PropertyManager.getInstance();
        return PropertyManager.find(this.visible).deType(String.class);
    }

    /**
     * Setter of the visible property.
     * 
     * @param theVisible
     *            the visible to set
     */
    public void setVisible(final String theVisible) {
        this.visible = theVisible;
    }

    /**
     * Get the action property.
     * 
     * @return the action
     */
    public String getAction() {
        PropertyManager.getInstance();
        return PropertyManager.find(this.action).deType(String.class);
    }

    /**
     * Setter of the action property.
     * 
     * @param theAction
     *            the action to set
     */
    public void setAction(final String theAction) {
        this.action = theAction;
    }

    /**
     * Get the separator_before property.
     * 
     * @return the separator_before
     */
    public boolean getSeparator_before() {
        return this.separator_before;
    }

    /**
     * Setter of the separator_before property.
     * 
     * @param theSeparatorBefore
     *            the separator_before to set
     */
    public void setSeparator_before(final boolean theSeparatorBefore) {
        this.separator_before = theSeparatorBefore;
    }

    /**
     * Setter of the i18nService property.
     * 
     * @param theI18nService
     *            the i18nService to set.
     */
    public void setI18nService(final I18nService theI18nService) {
        this.i18nService = theI18nService;
    }

}
