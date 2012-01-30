package org.esco.grouperui.web.controllers.groupProperties;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.esco.grouperui.domaine.beans.Field;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupType;
import org.esco.grouperui.domaine.beans.SimpleValue;
import org.esco.grouperui.exceptions.business.ESCOGroupNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOGroupNotUniqueException;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterGroup;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Attribute;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.group.TypeGroup;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.controllers.GroupController;
import org.esco.grouperui.web.plugins.AbstractControllerAware;

/**
 * Class GroupController. Requirement(s) :
 * [RECIA-ESCO-L1-007][RECIA-ESCO-L1-008]
 * 
 * @author ctrimoreau
 */
public class GroupPropertiesController extends AbstractControllerAware {

    /**
     * The UID of the class.
     */
    private static final long        serialVersionUID = 7264200314055495520L;

    /** Logger. */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory
                                                              .getLogger(GroupPropertiesController.class);

    /**
     * list of dynamic group for this group.
     */
    private List < TypeGroup >       typeGroups;

    /** parameter service acces. */
    private IParameterService        parameterService;

    /**
     * Default constructor.
     */
    public GroupPropertiesController() {
    }

    /**
     * get TabsController for this tab and cast it in appropriate class.
     * 
     * @return GroupController.
     */
    public GroupController getGroupController() {
        return (GroupController) super.getTabsController();
    }

    /**
     * Allow to retrieve attributes information from a group.
     * 
     * @return the list of attributes.
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique.
     * @throws CloneNotSupportedException
     *             if the clone operation failed.
     */
    public List < Attribute > getGroupAttributes() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            CloneNotSupportedException {
        List < Attribute > attributes = new ArrayList < Attribute >();
        this.getGroupController().initGroupAttributes();

        // Check if the current group is null, ie: no group found with uuid from
        // parameter
        if (this.getGroupController().getGroup() != null) {
            Set < String > extension = null;

            Map < String, String > mappingFieldCol = this.getGroupController().getGroup().getMappingFieldCol();
            for (Entry < String, String > mapField : mappingFieldCol.entrySet()) {
                GroupPropertiesController.LOGGER.debug("Add field for value : " + mapField.getKey() + " -> "
                        + mapField.getValue());
                extension = new HashSet < String >();

                if (org.esco.grouperui.services.ESCOConstantes.NULL_DATA_IN_THIS_MAPPING_FIELD_COL.equals(mapField
                        .getValue())) {
                    extension.add(ESCOConstantes.EMPTY_DATA);
                } else {
                    extension.add(mapField.getValue());
                }

                attributes.add(new Attribute(mapField.getKey(), extension));
            }
        }

        return attributes;
    }

    /**
     * Allow to retrieve attributes information from a group.
     * 
     * @return the list of attributes.
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique.
     */
    public List < Attribute > getGroupAttributesFromRequest() throws ESCOGroupNotFoundException,
            ESCOGroupNotUniqueException {
        List < Attribute > attributes = new ArrayList < Attribute >();
        Group theGroup = this.getGroupController().getAGroup();

        this.getGroupController().setGroup(theGroup);

        if (theGroup != null) {
            Set < String > extension = null;

            Map < String, String > mappingFieldCol = theGroup.getMappingFieldCol();
            for (Entry < String, String > mapField : mappingFieldCol.entrySet()) {
                extension = new HashSet < String >();
                extension.add(mapField.getValue());
                attributes.add(new Attribute(mapField.getKey(), extension));
            }
        }
        return attributes;
    }

    /**
     * Allow to retrieve personalized attributes.
     * 
     * @return the personalized attributes list of the group.
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique.
     * @throws CloneNotSupportedException
     *             if the clone operation failed.
     */
    public List < TypeGroup > getGroupTypeAttributes() throws ESCOGroupNotFoundException,
            ESCOGroupNotUniqueException, CloneNotSupportedException {
        this.getGroupController().initGroupAttributes();

        if (this.getGroupController().getGroup() != null) {
            this.typeGroups = new ArrayList < TypeGroup >();

            // get all data
            String[] typeNames = this.getGroupController().getGroup().getDetail().getTypeNames();
            String[] attributes = this.getGroupController().getGroup().getDetail().getAttributeNames();
            String[] values = this.getGroupController().getGroup().getDetail().getAttributeValues();

            if (typeNames != null && typeNames.length > 0) {

                // find custom type group detail for current group
                Map < String, GroupType > groupTypes = this.getGroupController().getGrouperService()
                        .findGroupTypes(typeNames);

                TypeGroup type = null;
                List < SimpleValue > keyValueAttributes = null;
                List < Field > fields = null;
                String typeGroupName = null;
                for (Entry < String, GroupType > groupType : groupTypes.entrySet()) {

                    typeGroupName = this.findRealTypeGroupName(groupType);
                    type = new TypeGroup();
                    type.setKey(typeGroupName);

                    keyValueAttributes = new ArrayList < SimpleValue >();
                    fields = groupType.getValue().getFields();
                    for (Field field : fields) {

                        int index = -1;
                        for (int i = 0; attributes != null && i < attributes.length; i++) {
                            if (attributes[i].equals(field.getName())) {
                                index = i;
                                break;
                            }
                        }
                        // there is a value for this attribute.
                        if (index > -1) {
                            keyValueAttributes.add(new SimpleValue(field.getName(), values[index]));
                        } else {
                            keyValueAttributes.add(new SimpleValue(field.getName(), null));
                        }
                    }
                    type.setValues(keyValueAttributes);
                    this.typeGroups.add(type);
                }
            }
        }
        return this.typeGroups;
    }

    /**
     * getter for property updatedGroupTypes.
     * 
     * @return the updatedGroupTypes
     */
    public Map < String, Boolean > getCustomTypesOfLocalGroup() {
        Map < String, Boolean > customTypeOfLocalGroup = new HashMap < String, Boolean >();
        // get all data
        String[] typeGroups = this.getGroupController().getGroup().getDetail().getTypeNames();

        if (typeGroups != null && typeGroups.length > 0) {

            // find custom type group detail for current group
            Map < String, GroupType > groupTypes = this.getGroupController().getGrouperService().findGroupTypes(
                    typeGroups);

            for (Entry < String, GroupType > groupType : groupTypes.entrySet()) {
                customTypeOfLocalGroup.put(groupType.getValue().getName(), Boolean.TRUE);
            }
        }

        return customTypeOfLocalGroup;
    }

    /**
     * @param theGroupType
     *            information of group type.
     * @return the real name of type group .
     */
    private String findRealTypeGroupName(final Entry < String, GroupType > theGroupType) {
        String typeGroupName = null;

        ParameterGroup listTypeGroupContext = this.parameterService
                .findParametersByGroup(ESCOConstantes.TYPE_GROUP_CONTEXT);
        ParameterGroup listTypeGroupCustom = this.parameterService
                .findParametersByGroup(ESCOConstantes.TYPE_GROUP_CUSTOM);

        // search real name in parameter
        for (Parameter parameter : listTypeGroupContext.getParameters()) {
            if (parameter.getPkey().equals(theGroupType.getValue().getName())) {
                typeGroupName = parameter.getValue();
                break;
            }
        }
        // real name not find in list of type group context, search
        // in custom type
        if (typeGroupName == null) {
            // search real name in parameter
            for (Parameter parameter : listTypeGroupCustom.getParameters()) {
                if (parameter.getPkey().equals(theGroupType.getValue().getName())) {
                    typeGroupName = parameter.getValue();
                    break;
                }
            }
        }
        return typeGroupName;
    }

    /**
     * compute size of dynamic group.
     * 
     * @return the size of dynamic group
     * @throws ESCOGroupNotFoundException
     *             if the group is not found.
     * @throws ESCOGroupNotUniqueException
     *             if the group is not unique.
     * @throws CloneNotSupportedException
     *             if the clone operation failed.
     */
    public int getSizeOfDynamicGroups() throws ESCOGroupNotFoundException, ESCOGroupNotUniqueException,
            CloneNotSupportedException {
        int size = 0;
        if (this.typeGroups == null && this.getGroupController().getGroup() != null) {
            this.typeGroups = this.getGroupTypeAttributes();
            size = this.typeGroups.size();
        }
        return size;
    }

    /**
     * setter for property parameterService.
     * 
     * @param theParameterService
     *            the parameterService to set
     */
    public void setParameterService(final IParameterService theParameterService) {
        this.parameterService = theParameterService;
    }

    /**
     * {@inheritDoc}
     */
    public void applyModification(final String theIndex, final String theNewValue) {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void clear() {
        this.typeGroups = null;
    }

    /**
     * {@inheritDoc}
     */
    public void discardModification(final String theIndex) {
    }

    /**
     * {@inheritDoc}
     */
    public String getAttributeKey(final String theIndex) {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public List < String > getErrorClassesNames() {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public List < Resume > getListResume() {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isModified() {
        return false;
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {
        return new Status(Boolean.TRUE);
    }
}
