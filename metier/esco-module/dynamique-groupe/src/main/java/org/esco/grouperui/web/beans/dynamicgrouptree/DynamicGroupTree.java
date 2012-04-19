/**
 * Copyright (C) 2009 GIP RECIA http://www.recia.fr
 * @Author (C) 2009 GIP RECIA <contact@recia.fr>
 * @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 * @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
