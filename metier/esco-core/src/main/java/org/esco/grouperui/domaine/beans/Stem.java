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
package org.esco.grouperui.domaine.beans;

import org.esco.grouperui.services.ESCOConstantes;

/**
 * Class Stem. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author SopraGroup
 */
public class Stem extends Sortable implements Cloneable {

    /**
     *
     */
    private static final long serialVersionUID = -2007734542828504139L;

    /** Description. */
    private String            description;

    /** Name. */
    private String            name;

    /** Display name. */
    private String            displayName;

    /** Extension. */
    private String            extension;

    /** Display extension. */
    private String            displayExtension;

    /** uuid. **/
    private String            uuid;

    /** has create? */
    private Boolean           hasCreate        = Boolean.FALSE;

    /** Has stem? */
    private Boolean           hasStem          = Boolean.FALSE;

    /** is Empty? */
    private Boolean           isEmpty          = Boolean.FALSE;

    /**
     * Default constructor.
     * 
     * @param theDescription
     *            : the description.
     * @param theName
     *            : the name.
     * @param theDisplayName
     *            : the display name.
     * @param theExtension
     *            : the extension.
     * @param theDisplayExtension
     *            : the display extension.
     * @param theUuid
     *            : the uuid.
     */
    public Stem(final String theDescription, final String theName, final String theDisplayName,
            final String theExtension, final String theDisplayExtension, final String theUuid) {

        this.description = theDescription;
        this.addMappingFieldCol("description", this.description);

        this.name = theName;
        this.addMappingFieldCol("name", this.name);

        this.displayName = theDisplayName;
        this.addMappingFieldCol("displayName", this.displayName);

        this.extension = theExtension;
        this.addMappingFieldCol("extension", this.extension);

        this.displayExtension = theDisplayExtension;
        this.addMappingFieldCol("displayExtension", this.displayExtension);

        this.uuid = theUuid;
        this.addMappingFieldCol("uuid", this.uuid);
    }

    /**
     * Default constructor.
     */
    public Stem() {
        this.description = "";
        this.addMappingFieldCol("description", this.description);

        this.name = "";
        this.addMappingFieldCol("name", this.name);

        this.displayName = "";
        this.addMappingFieldCol("displayName", this.displayName);

        this.extension = "";
        this.addMappingFieldCol("extension", this.extension);

        this.displayExtension = "";
        this.addMappingFieldCol("displayExtension", this.displayExtension);

        this.uuid = "";
        this.addMappingFieldCol("uuid", this.uuid);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Stem clone() throws CloneNotSupportedException {
        Stem result = (Stem) super.clone();
        result.setHasCreate(this.hasCreate);
        result.setHasStem(this.hasStem);
        return result;
    }

    /**
     * Getter for attribute <b>hasCreate</b>.
     * 
     * @return the hasCreate
     */
    public Boolean getHasCreate() {
        return Boolean.valueOf(this.getValueFormCol("hasCreate"));
    }

    /**
     * Setter for attribute <b>hasCreate</b>.
     * 
     * @param theHasCreate
     *            the hasCreate to set
     */
    public void setHasCreate(final Boolean theHasCreate) {
        this.hasCreate = theHasCreate;
        this.addMappingFieldCol("hasCreate", this.hasCreate.toString());
    }

    /**
     * Getter for attribute <b>hasStem</b>.
     * 
     * @return the hasStem
     */
    public Boolean getHasStem() {
        return Boolean.valueOf(this.getValueFormCol("hasStem"));
    }

    /**
     * Setter for attribute <b>hasStem</b>.
     * 
     * @param theHasStem
     *            the hasStem to set
     */
    public void setHasStem(final Boolean theHasStem) {
        this.hasStem = theHasStem;
        this.addMappingFieldCol("hasStem", this.hasStem.toString());
    }

    /**
     * Getter for attribute <b>description</b>.
     * 
     * @return the description
     */
    public String getDescription() {
        return this.getValueFormCol("description");
    }

    /**
     * Setter for attribute <b>description</b>.
     * 
     * @param theDescription
     *            : the description to set
     */
    public void setDescription(final String theDescription) {
        this.description = theDescription;
        this.addMappingFieldCol("description", this.description);
    }

    /**
     * Getter for attribute <b>name</b>.
     * 
     * @return the name
     */
    public String getName() {
        return this.getValueFormCol("name");
    }

    /**
     * Setter for attribute <b>name</b>.
     * 
     * @param theName
     *            : the name to set
     */
    public void setName(final String theName) {
        this.name = theName;
        this.addMappingFieldCol("name", this.name);
    }

    /**
     * Getter for attribute <b>displayName</b>.
     * 
     * @return the displayName
     */
    public String getDisplayName() {
        return this.getValueFormCol("displayName");
    }

    /**
     * Setter for attribute <b>displayName</b>.
     * 
     * @param theDisplayName
     *            : the displayName to set
     */
    public void setDisplayName(final String theDisplayName) {
        this.displayName = theDisplayName;
        this.addMappingFieldCol("displayName", this.displayName);
    }

    /**
     * Getter for attribute <b>extension</b>.
     * 
     * @return the extension
     */
    public String getExtension() {
        return this.getValueFormCol("extension");
    }

    /**
     * Setter for attribute <b>extension</b>.
     * 
     * @param theExtension
     *            : the extension to set
     */
    public void setExtension(final String theExtension) {
        this.extension = theExtension;
        this.addMappingFieldCol("extension", this.extension);
    }

    /**
     * Getter for attribute <b>displayExtension</b>.
     * 
     * @return the displayExtension
     */
    public String getDisplayExtension() {
        return this.getValueFormCol("displayExtension");
    }

    /**
     * Setter for attribute <b>displayExtension</b>.
     * 
     * @param theDisplayExtension
     *            : the displayExtension to set
     */
    public void setDisplayExtension(final String theDisplayExtension) {
        this.displayExtension = theDisplayExtension;
        this.addMappingFieldCol("displayExtension", this.displayExtension);
    }

    /**
     * Getter for attribute <b>uuid</b>.
     * 
     * @return the uuid
     */
    public String getUuid() {
        return this.getValueFormCol("uuid");
    }

    /**
     * Setter for attribute <b>uuid</b>.
     * 
     * @param theUuid
     *            : the uuid to set
     */
    public void setUuid(final String theUuid) {
        this.uuid = theUuid;
        this.addMappingFieldCol("uuid", this.uuid);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getValueFormCol(final String theIndexCol) {
        if (ESCOConstantes.NULL_DATA_IN_THIS_MAPPING_FIELD_COL.equals(this.getMappingFieldCol().get(theIndexCol))) {
            return "";
        } else {
            return this.getMappingFieldCol().get(theIndexCol);
        }
    }

    /**
     * Get the original name.
     */
    public String getOriginalName() {
        return this.name;
    }

    /**
     * Get the isEmpty property.
     * 
     * @return the isEmpty
     */
    public Boolean getIsEmpty() {
        return Boolean.valueOf(this.getValueFormCol("isEmpty"));
    }

    /**
     * Setter of the isEmpty property.
     * 
     * @param theIsEmpty
     *            the isEmpty to set
     */
    public void setIsEmpty(final Boolean theIsEmpty) {
        this.isEmpty = theIsEmpty;
        this.addMappingFieldCol("isEmpty", this.isEmpty.toString());
    }

    public Stem getCopy() {
        Stem newStem = new Stem();
        newStem.setAdded(this.isAdded());
        newStem.setDescription(this.description);
        newStem.setDisplayExtension(this.displayExtension);
        newStem.setDisplayName(this.displayName);
        newStem.setExtension(this.extension);
        newStem.setHasCreate(this.hasCreate);
        newStem.setHasStem(this.hasStem);
        newStem.setName(this.name);
        newStem.setSelected(this.getSelected());
        // newStem.setTypeEnum(this.getTypeEnum());
        newStem.setUuid(this.uuid);
        return newStem;
    }
}
