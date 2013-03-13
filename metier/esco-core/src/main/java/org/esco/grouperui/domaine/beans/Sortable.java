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

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.esco.grouperui.services.ESCOConstantes;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * Class Sortable. <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-008]
 * 
 * @author aChesneau
 */
public abstract class Sortable implements Serializable {

    /**
     * the logger of this class.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(Sortable.class);
    /**
     * The serial uid.
     */
    private static final long        serialVersionUID = -6027803081055707453L;

    /**
     * Map for mapping a jQGrid column and a property.
     */
    private Map < String, String >   mappingFieldCol  = new HashMap < String, String >();

    /**
     * The sourceTypeEnum property.
     */
    private SourceTypeEnum           sourceTypeEnum;

    /**
     * If the child class is selected or not.
     */
    private Boolean                  selected         = Boolean.FALSE;

    /** Is that an added group to something ? */
    private Boolean                  added            = Boolean.FALSE;

    /** Is that group was saved successfully ? */
    private Boolean                  saved            = Boolean.FALSE;

    /**
     * Get the value for the column name.
     * 
     * @param theIndexCol
     *            The index column.
     * @return the value of column at index.
     */
    public abstract String getValueFormCol(String theIndexCol);

    /**
     * @return Set of all key in attribut mapping.
     */
    public Set < String > getKeysOfMapping() {
        return this.mappingFieldCol.keySet();
    }

    /**
     * @param theKey
     *            the key, name of attribut
     * @param theValue
     *            the value of attribute
     */
    public void addMappingFieldCol(final String theKey, final String theValue) {
        // Sortable.LOGGER.debug("Add atrribut : " + theKey + "=" + theValue);
        if (theValue == null) {
            this.mappingFieldCol.put(theKey, ESCOConstantes.NULL_DATA_IN_THIS_MAPPING_FIELD_COL);
        } else {
            this.mappingFieldCol.put(theKey, theValue);
        }
    }

    /**
     * getter for property mappingFieldCol.
     * 
     * @return the mappingFieldCol
     */
    public Map < String, String > getMappingFieldCol() {
        return this.mappingFieldCol;
    }

    /**
     * Setter for mappingFieldCol.
     * 
     * @param theMappingFieldCol
     *            the mappingFieldCol to set.
     */
    public final void setMappingFieldCol(final Map < String, String > theMappingFieldCol) {
        this.mappingFieldCol = theMappingFieldCol;
    }

    /**
     * Get the typeEnum property.
     * 
     * @return the typeEnum
     */
    public SourceTypeEnum getTypeEnum() {
        return this.sourceTypeEnum;
    }

    /**
     * Get a boolean to indicate if the key exists.
     * 
     * @param theKey
     *            The key to test.
     * @return True if key exist else False.
     */
    public boolean getIsKeyExist(final String theKey) {
        return this.mappingFieldCol.keySet().contains(theKey);
    }

    /**
     * Setter of the sourceTypeEnum property.
     * 
     * @param theTypeEnum
     *            the sourceTypeEnum to set
     */
    public void setTypeEnum(final SourceTypeEnum theTypeEnum) {
        this.sourceTypeEnum = theTypeEnum;
        this.mappingFieldCol.put("typeSubject", this.sourceTypeEnum.getType());
    }

    /**
     * Get the selected property.
     * 
     * @return the selected
     */
    public Boolean getSelected() {
        return this.selected;
    }

    /**
     * Setter of the selected property.
     * 
     * @param theSelected
     *            the selected to set
     */
    public void setSelected(final Boolean theSelected) {
        this.selected = theSelected;
        this.mappingFieldCol.put("selected", theSelected.toString());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int hashCode() {
        return super.hashCode();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean equals(final Object theObj) {

        Sortable sortable = (Sortable) theObj;
        boolean find = false;
        try {
            Set < Entry < String, String >> entrysObj = sortable.getMappingFieldCol().entrySet();
            Set < Entry < String, String >> entrysThis = this.getMappingFieldCol().entrySet();

            for (Entry < String, String > entryThis : entrysThis) {
                find = false;
                for (Entry < String, String > entryObj : entrysObj) {

                    String entryThisKey = entryThis.getKey();
                    String entryThisValue = entryThis.getValue();

                    String entryObjKey = entryObj.getKey();
                    String entryObjValue = entryObj.getValue();

                    if (entryThisKey.equals(entryObjKey) && entryThisValue.equals(entryObjValue)) {
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    break;
                }
            }
        } catch (NullPointerException e) {
            // If an attribute is null
            if (this.getTypeEnum() == SourceTypeEnum.GROUP) {
                find = this.getValueFormCol("id").equals(sortable.getValueFormCol("id"));
            } else
                if (this.getTypeEnum() == SourceTypeEnum.PERSON) {
                    find = this.getValueFormCol("uuid").equals(sortable.getValueFormCol("uuid"));
                } else {
                    // Folder
                    find = this.getValueFormCol("id").equals(sortable.getValueFormCol("id"));
                }
        }
        return find;
    }
    
    /**
     * Gives the value of the attribute used as identifier.
     * @return The attribute used as identifier depending of the kind of sortable.
     */
    public String getId() {
    	return (SourceTypeEnum.PERSON.equals(sourceTypeEnum)) ? getValueFormCol("id") : getValueFormCol("uuid");
    }

    /**
     * Getter for added.
     * 
     * @return the added to get.
     */
    public final Boolean isAdded() {
        return this.added;
    }

    /**
     * Setter for added.
     * 
     * @param theAdded
     *            the added to set.
     */
    public final void setAdded(final boolean theAdded) {
        this.added = theAdded;
        this.addMappingFieldCol("added", Boolean.toString(this.added));
    }

    /**
     * Getter for saved.
     * 
     * @return the saved to get.
     */
    public final Boolean isSaved() {
        return this.saved;
    }

    /**
     * Setter for saved.
     * 
     * @param theSaved
     *            the saved to set.
     */
    public final void setSaved(final Boolean theSaved) {
        this.saved = theSaved;
    }
}
