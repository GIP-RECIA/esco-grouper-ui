package org.esco.grouperui.web.tag;

import javax.faces.context.FacesContext;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.Tag;

import org.apache.commons.lang.Validate;

/**
 * Class EscoGroupTag. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau TODO
 */
public class EscoGroupTag extends EscoTag {

    /**
     *
     */
    private static final long serialVersionUID = 4236563966447435320L;

    /**
     * The name corresponding to the group name.
     */
    private String            name;

    /**
     * Default constructor.
     */
    public EscoGroupTag() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int doStartTag() throws JspException {
        FacesContext context = FacesContext.getCurrentInstance();

        Validate.notEmpty(this.name);

        context.getExternalContext().getRequestMap().put(EscoTag.GROUP, this.name);

        return Tag.EVAL_BODY_INCLUDE;
    }

    /**
     * Setter for name.
     * 
     * @param theName
     *            the name to set.
     */
    public final void setName(final String theName) {
        this.name = theName;
    }

}
