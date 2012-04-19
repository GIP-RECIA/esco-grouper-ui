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

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.esco.grouperui.services.ESCOConstantes;

/**
 * The Group class.
 * Requirement(s):[RECIA-ESCO-L1-012][RECIA-ESCO-L1-007][RECIA-ESCO-L1-008]
 * 
 * @author aChesneau
 */
public class Group extends Sortable implements Cloneable {

    /**
     * The UID of the class.
     */
    private static final long              serialVersionUID = 2854320193679612513L;

    /**
     * The group details.
     */
    private GroupDetail                    detail;

    /** Map of attributes. */
    private Map < String, Set < String > > attributes;

    /**
     * Default constructor.
     * 
     * @param theIdGroup
     *            The id of the group.
     * @param theExtension
     *            The extension(display name) of the group.
     * @param theName
     *            The name of the group.
     */
    public Group(final String theIdGroup, final String theExtension, final String theName) {
        super();

        this.addMappingFieldCol("id", theIdGroup);
        this.addMappingFieldCol("uuid", theIdGroup);
        this.addMappingFieldCol("extension", theExtension);
        this.addMappingFieldCol("name", theName);

        this.setTypeEnum(SourceTypeEnum.GROUP);
        this.attributes = new HashMap < String, Set < String > >();
    }

    /**
     * Default constructor.
     */
    public Group() {
        this.setTypeEnum(SourceTypeEnum.GROUP);
    }

    /**
     *
     */
    public void init() {
        this.setExtension("");
        this.setDisplayExtension("");
        this.setExtension("");
        this.setDescription("");
        this.setAdded(false);
        this.setCanOptin(false);
        this.setCanOptout(false);
        this.setIdGroup("");
        this.setName("");
        this.setDisplayName("");
        this.setUserRight(GroupPrivilegeEnum.NONE);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Group clone() throws CloneNotSupportedException {
        Group newGroup = (Group) super.clone();

        if (newGroup.getDetail() != null) {
            newGroup.setDetail(newGroup.getDetail().clone());
        }

        Map < String, String > map = this.getMappingFieldCol();
        Map < String, String > newMap = new HashMap < String, String >();
        newMap.putAll(map);
        newGroup.setMappingFieldCol(newMap);

        return newGroup;
    }

    /**
     * Get the idGroup property.
     * 
     * @return the idGroup
     */
    public String getIdGroup() {
        return this.getValueFormCol("id");
    }

    /**
     * Setter of the idGroup property.
     * 
     * @param theIdGroup
     *            the idGroup to set
     */
    public void setIdGroup(final String theIdGroup) {
        this.addMappingFieldCol("id", theIdGroup);
        this.addMappingFieldCol("uuid", theIdGroup);
    }

    /**
     * Get the extension property.
     * 
     * @return the extension
     */
    public String getExtension() {
        return this.getValueFormCol("extension");
    }

    /**
     * Setter of the extension property.
     * 
     * @param theExtension
     *            the extension to set
     */
    public void setExtension(final String theExtension) {
        this.addMappingFieldCol("extension", theExtension);
    }

    /**
     * Get the name property.
     * 
     * @return the name
     */
    public String getName() {
        return this.getValueFormCol("name");
    }

    /**
     * Setter of the name property.
     * 
     * @param theName
     *            the name to set
     */
    public void setName(final String theName) {
        this.addMappingFieldCol("name", theName);
    }

    /**
     * Get the userRight property.
     * 
     * @return the userRight
     */
    public GroupPrivilegeEnum getUserRight() {
        return GroupPrivilegeEnum.fromValue(this.getValueFormCol("userRight"));
    }

    /**
     * Setter of the userRight property.
     * 
     * @param theUserRight
     *            the userRight to set
     */
    public void setUserRight(final GroupPrivilegeEnum theUserRight) {
        if (theUserRight != null) {
            this.addMappingFieldCol("userRight", theUserRight.name());
        } else {
            this.addMappingFieldCol("userRight", GroupPrivilegeEnum.NONE.getName());
        }
    }

    /**
     * Get the canPotin property.
     * 
     * @return the canOptin
     */
    public boolean isCanOptin() {
        return "true".equals(this.getValueFormCol("canOptin"));
    }

    /**
     * Setter of the canOptin property.
     * 
     * @param theCanOptin
     *            the canOptin to set
     */
    public void setCanOptin(final boolean theCanOptin) {
        this.addMappingFieldCol("canOptin", Boolean.toString(theCanOptin));
    }

    /**
     * Get the canOptout property.
     * 
     * @return the canOptout
     */
    public boolean isCanOptout() {
        return "true".equals(this.getValueFormCol("canOptout"));
    }

    /**
     * Setter of the canOptout property.
     * 
     * @param theCanOptout
     *            the canOptout to set
     */
    public void setCanOptout(final boolean theCanOptout) {
        this.addMappingFieldCol("canOptout", Boolean.toString(theCanOptout));
    }

    /**
     * Getter for description.
     * 
     * @return the description to get.
     */
    public final String getDescription() {
        return this.getValueFormCol("description");
    }

    /**
     * Setter for description.
     * 
     * @param theDescription
     *            the description to set.
     */
    public final void setDescription(final String theDescription) {
        this.addMappingFieldCol("description", theDescription);
    }

    /**
     * Getter for detail.createSubjectId.
     * 
     * @return the detail.createSubjectId to get.
     */
    public final String getDetailCreateSubjectId() {
        String ret = null;
        if (this.detail != null) {
            ret = this.detail.getCreatorID();

            this.addMappingFieldCol("creatorID", ret);
        }
        return ret;
    }

    /**
     * Setter for detail.
     * 
     * @param theDetail
     *            the detail to set.
     */
    public final void setDetail(final GroupDetail theDetail) {
        this.detail = theDetail;
    }

    /**
     * Getter for displayExtension.
     * 
     * @return the displayExtension to get.
     */
    public final String getDisplayExtension() {
        return this.getValueFormCol("displayExtension");
    }

    /**
     * Setter for displayExtension.
     * 
     * @param theDisplayExtension
     *            the displayExtension to set.
     */
    public final void setDisplayExtension(final String theDisplayExtension) {
        this.addMappingFieldCol("displayExtension", theDisplayExtension);
        // For the table for group and person (Search).
        this.addMappingFieldCol("attribute.displayName", theDisplayExtension);
    }

    /**
     * Getter for displayName.
     * 
     * @return the displayName to get.
     */
    public final String getDisplayName() {
        return this.getValueFormCol("displayName");
    }

    /**
     * Setter for displayName.
     * 
     * @param theDisplayName
     *            the displayName to set.
     */
    public final void setDisplayName(final String theDisplayName) {
        this.addMappingFieldCol("displayName", theDisplayName);
        // For the table for group and person.(Search)
        this.addMappingFieldCol("attribute.mail", theDisplayName);
    }

    /**
     * Getter for attributes.
     * 
     * @return the attributes to get.
     */
    public final Map < String, Set < String > > getAttributes() {
        return this.attributes;
    }

    /**
     * Setter for attributes.
     * 
     * @param theAttributes
     *            the attributes to set.
     */
    public final void setAttributes(final Map < String, Set < String > > theAttributes) {
        this.attributes = theAttributes;

        for (Entry < String, Set < String >> attribute : theAttributes.entrySet()) {
            Iterator < String > itValues = attribute.getValue().iterator();
            String attrSet = "";
            while (itValues.hasNext()) {
                attrSet += itValues.next();

                if (itValues.hasNext()) {
                    attrSet += ", ";
                }
            }
            this.addMappingFieldCol("attribute." + attribute.getKey(), attrSet);
        }
        if (this.getValueFormCol("attribute.objectClass") == null
                || "".equals(this.getValueFormCol("attribute.objectClass"))) {
            Set < String > aux = new HashSet < String >();
            aux.add("group");
            this.attributes.put("objectClass", aux);
            this.addMappingFieldCol("attribute.objectClass", "group");
        }
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
     * Get the detail property.
     * 
     * @return the detail
     */
    public GroupDetail getDetail() {
        return this.detail;
    }

}
