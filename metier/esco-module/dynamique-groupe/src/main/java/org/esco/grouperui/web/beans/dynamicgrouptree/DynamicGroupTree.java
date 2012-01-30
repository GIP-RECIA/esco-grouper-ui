package org.esco.grouperui.web.beans.dynamicgrouptree;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * DynamicGroupTree Class. Requirement(s) : [RECIA-ESCO-L2-001],
 * [RECIA-ESCO-L2-002]
 * 
 * @author oFages
 */

@XmlRootElement(name = "dynamicGroupTree")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class DynamicGroupTree {

    /** The operation from the node request. */
    private Operation operation;

    /**
     * Default Constructor.
     */
    public DynamicGroupTree() {
    }

    /**
     * Constructor.
     * 
     * @param theOperation
     *            the root operation of the tree
     */
    public DynamicGroupTree(final Operation theOperation) {
        super();
        this.operation = theOperation;
    }

    /**
     * Getter for operation.
     * 
     * @return the operation to get.
     */
    @XmlElement(name = "operation", type = Operation.class)
    public final Operation getOperation() {
        return this.operation;
    }

    /**
     * Setter for operation.
     * 
     * @param theOperation
     *            the operation to set.
     */
    public final void setOperation(final Operation theOperation) {
        this.operation = theOperation;
    }

}
