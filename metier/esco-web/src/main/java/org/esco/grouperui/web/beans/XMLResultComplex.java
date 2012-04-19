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
package org.esco.grouperui.web.beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Class XMLResultString. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-007] <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author oFages
 */
@XmlRootElement(name = "result")
@XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
public class XMLResultComplex {

    /**
     * The status.
     */
    private Boolean status = Boolean.FALSE;

    /**
     * The id of the component.
     */
    private String  idOfComponent;

    /**
     * Default constructor.
     */
    public XMLResultComplex() {
    }

    /**
     * minimal constructor.
     * 
     * @param theStatus
     *            the status to be set
     * @param theIdOfComponent
     *            the id to be set
     */
    public XMLResultComplex(final Boolean theStatus, final String theIdOfComponent) {
        this.status = theStatus;
        this.idOfComponent = theIdOfComponent;
    }

    /**
     * getter for property status.
     * 
     * @return the status
     */
    @XmlElement
    public Boolean getStatus() {
        return this.status;
    }

    /**
     * Getter for idOfComponent.
     * 
     * @return the idOfComponent to get.
     */
    @XmlElement
    public final String getIdOfComponent() {
        return this.idOfComponent;
    }

}
