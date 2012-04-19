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
package org.esco.grouperui.web.beans.group;

/**
 * Class UpdateStemPrivilege. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class UpdateStemPrivilege {

    /** The group uuid. */
    private String  StemUuid;

    /** The possibility to subscribe. */
    private Boolean hasStem;

    /** The possibility to unsubscribe. */
    private Boolean hasCreate;

    /**
     *
     */
    public UpdateStemPrivilege() {
    }

    /**
     * Getter for stemUuid.
     * 
     * @return the stemUuid to get.
     */
    public final String getStemUuid() {
        return this.StemUuid;
    }

    /**
     * Setter for stemUuid.
     * 
     * @param theStemUuid
     *            the stemUuid to set.
     */
    public final void setStemUuid(final String theStemUuid) {
        this.StemUuid = theStemUuid;
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
