package org.esco.grouperui.web.tag;

import javax.faces.context.FacesContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.Tag;

import org.apache.commons.lang.Validate;

/**
 * Class EscoVisibleTag. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau
 */
public class EscoVisibleTag extends EscoTag {

    /**
     *
     */
    private static final long serialVersionUID = 8550813759148759365L;

    /** The role to access. */
    private String            roleName;

    /** The parameter key to access. */
    private String            keyName;

    /** The parameter variable. */
    private String            var;

    /**
     * Default constructor.
     */
    public EscoVisibleTag() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int doStartTag() throws JspException {
        FacesContext context = FacesContext.getCurrentInstance();
        String group = (String) context.getExternalContext().getRequestMap().get(EscoTag.GROUP);

        Validate.notEmpty(group);

        context.getExternalContext().getRequestMap().put(EscoTag.ROLE, this.roleName);
        context.getExternalContext().getRequestMap().put(EscoTag.KEY, this.keyName);
        context.getExternalContext().getRequestMap().put(EscoTag.VAR, this.var);

        return Tag.EVAL_BODY_INCLUDE;
    }

    /**
     * Setter for roleName.
     * 
     * @param theRoleName
     *            the roleName to set.
     */
    public final void setRoleName(final String theRoleName) {
        this.roleName = theRoleName;
    }

    /**
     * Setter for keyName.
     * 
     * @param theKeyName
     *            the keyName to set.
     */
    public final void setKeyName(final String theKeyName) {
        this.keyName = theKeyName;
    }

    /**
     * Setter for var.
     * 
     * @param theVar
     *            the var to set.
     */
    public final void setVar(final String theVar) {
        this.var = theVar;
    }

    /**
     * Getter for var.
     * 
     * @return the var to get.
     */
    public final String getVar() {
        return this.var;
    }

}
