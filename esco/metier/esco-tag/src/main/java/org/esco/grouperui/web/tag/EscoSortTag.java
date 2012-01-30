package org.esco.grouperui.web.tag;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.faces.context.FacesContext;
import javax.faces.el.ValueBinding;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.Tag;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.web.beans.Attribute;

/**
 * Class EscoSortTag. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau
 */
public class EscoSortTag extends EscoTag {

    /**
     *
     */
    private static final long        serialVersionUID = -8444230209957087752L;

    /** The tag for creating the parameter group name. */
    private static final String      SORT             = "sort";

    /** Logger. */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(EscoSortTag.class);

    /** The var where the list is stored. */
    private String                   var;

    /** The list to sort. */
    private String                   list;

    /**
     * Default constructor.
     */
    public EscoSortTag() {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int doEndTag() throws JspException {
        FacesContext context = FacesContext.getCurrentInstance();
        String group = (String) context.getExternalContext().getRequestMap().get(EscoTag.GROUP);
        Validate.notEmpty(group);

        List < Attribute > listAtts = (List < Attribute >) context.getApplication().createValueBinding(this.list)
                .getValue(context);

        IParameterService parameterService = (IParameterService) context.getApplication().createValueBinding(
                "#{parameterService}").getValue(context);

        List < Parameter > parametersSort = parameterService.findParametersById(group + "." + EscoSortTag.SORT,
                EscoSortTag.SORT);

        // If the parameter for sorting the list doesn't exist.
        if (parametersSort.isEmpty()) {
            EscoSortTag.LOGGER.info("No parameters for sorting have been found.");
        } else
            // If more than one parameter for sorting have been found.
            if (parametersSort.size() > 1) {
                EscoSortTag.LOGGER.info("More than one parameters for sorting have been found.");
            } else {
                // If the parameter for sorting exist (not empty) and if there
                // is only one parameter, we sort the list.
                EscoSortTag.LOGGER.info("Parameters for sorting have been found.");

                final String[] attrSort = parametersSort.get(0).getValue().split("\\|");

                // Sorting the list of Attribute.
                Collections.sort(listAtts, new Comparator < Attribute >() {
                    public int compare(final Attribute theO1, final Attribute theO2) {
                        int posAttrLeft = EscoSortTag.this.findPosInAttrsSort(attrSort, theO1.getKey());
                        int posAttrRight = EscoSortTag.this.findPosInAttrsSort(attrSort, theO2.getKey());

                        if (posAttrLeft > posAttrRight) {
                            return 1;
                        }
                        if (posAttrLeft < posAttrRight) {
                            return -1;
                        }

                        return 0;
                    }
                });
            }

        // update the new sorted list.
        ValueBinding valueBinding = context.getApplication().createValueBinding("#{" + this.var + "}");
        valueBinding.setValue(context, listAtts);

        return Tag.EVAL_PAGE;
    }

    /**
     * Allow to find the index of an element in the parameter sort order.
     * 
     * @param theAttrSort
     *            the array of sort order.
     * @param theAtrt
     *            the element to find position.
     * @return the position of the element.
     */
    private int findPosInAttrsSort(final String[] theAttrSort, final String theAtrt) {
        Validate.notEmpty(theAtrt);

        int index = 0;
        for (String attr : theAttrSort) {
            if (theAtrt.equals(attr)) {
                return index;
            }
            index++;
        }

        // the element is not present in the sort order, index is set to the
        // highest possible
        return Integer.MAX_VALUE;
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

    /**
     * Setter for list.
     * 
     * @param theList
     *            the list to set.
     */
    public final void setList(final String theList) {
        this.list = theList;
    }

}
