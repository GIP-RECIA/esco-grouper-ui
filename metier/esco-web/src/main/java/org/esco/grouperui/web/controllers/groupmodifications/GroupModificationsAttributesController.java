package org.esco.grouperui.web.controllers.groupmodifications;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.faces.context.FacesContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupDetail;
import org.esco.grouperui.domaine.beans.GroupPrivilegeEnum;
import org.esco.grouperui.domaine.beans.GroupType;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Privilege;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.exceptions.business.ESCOAttributeException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.application.filters.PrivilegeTypeEnum;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterGroup;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.Attribute;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.XMLResultString;
import org.esco.grouperui.web.beans.group.RadioButtonItem;
import org.esco.grouperui.web.beans.summary.ColInfo;
import org.esco.grouperui.web.beans.summary.DataTypeEnum;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.summary.TypeDataSmmary;
import org.esco.grouperui.web.controllers.GroupModificationController;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.controllers.groupProperties.PrivilegeDisplayUtils;
import org.esco.grouperui.web.plugins.AbstractControllerAware;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class GroupModificationsAttributesController. <br/>
 * Requirement(s): <br/>
 * [RECIA-ESCO-L1-009] [RECIA-ESCO-L1-010]
 * 
 * @author Sopra Group
 */
public class GroupModificationsAttributesController extends AbstractControllerAware {

    /** the serial uid. */
    private static final long                         serialVersionUID = -8590403241391323372L;

    /** Logger. */
    private static final IESCOLogger                  LOGGER           = ESCOLoggerFactory
                                                                               .getLogger(GroupModificationsAttributesController.class);

    /** The group sort. */
    private static final String                       SORT             = "sort";

    /** The current list of group (attributes) of the said group. */
    private final List < String >                     groupAttributes;

    /** The updated group default privileges. */
    private final Map < GroupPrivilegeEnum, Boolean > updatedGroupRights;

    /** The updated group attributes. */
    private final Map < String, String >              updatedGroupAttributes;

    /** The updated group types. */
    private final Map < String, Boolean >             updatedGroupTypes;

    /** The original group types. */
    private final Map < String, Boolean >             originalGroupTypes;

    /** The attributes of the group that raised an error. */
    private final List < String >                     errorAttributes;

    /** parameter service access. */
    private IParameterService                         parameterService;

    /** The xmlProducer wrapper. */
    private IWrapper < XmlProducer, String >          xmlProducerWrapper;

    /**
     * Default constructor.
     */
    public GroupModificationsAttributesController() {
        super();
        this.groupAttributes = new ArrayList < String >();
        this.updatedGroupAttributes = new HashMap < String, String >();
        this.updatedGroupRights = new HashMap < GroupPrivilegeEnum, Boolean >();
        this.updatedGroupTypes = new HashMap < String, Boolean >();
        this.originalGroupTypes = new HashMap < String, Boolean >();
        this.errorAttributes = new ArrayList < String >();
    }

    /**
     * get TabsController for this tab and cast it in appropriate class.
     * 
     * @return GroupController.
     */
    public GroupModificationController getGroupController() {
        return (GroupModificationController) super.getTabsController();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void clear() {
        this.groupAttributes.clear();
        this.updatedGroupAttributes.clear();
        this.updatedGroupRights.clear();
        this.updatedGroupTypes.clear();
        this.originalGroupTypes.clear();
        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorAttributes.clear();
        super.clear();
    }

    /**
     * {@inheritDoc}
     */
    public List < Resume > getListResume() {
        List < Resume > listResume = new ArrayList < Resume >();

        // Modifications made on the attributes
        listResume.add(this.getResumeAttributes());
        // Modifications made on the rights
        listResume.add(this.getResumeRights());
        // Modifications made on the types
        listResume.add(this.getResumeTypes());
        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorAttributes.clear();
        return listResume;
    }

    /**
     * Getter for the resume of modifications made on the attributes of the
     * group.
     * 
     * @return a resume of the modifications made on the attributes
     */
    private Resume getResumeAttributes() {
        Resume resume = new Resume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        List < List < String >> datas = new ArrayList < List < String > >();
        List < String > typeData = new ArrayList < String >();
        List < String > indexs = new ArrayList < String >();

        List < String > cells = null;

        colNames.add(new ColInfo("GROUP.ATTRIBUTE.NAME"));
        colNames.add(new ColInfo("GROUP.ATTRIBUTE.VALUE", Boolean.FALSE, DataTypeEnum.INPUT));

        resume.setColInfos(colNames);

        // Iterate on the updated stems.
        if (!this.updatedGroupAttributes.isEmpty()) {
            for (String key : this.updatedGroupAttributes.keySet()) {
                cells = new ArrayList < String >();

                // Key
                indexs.add(key);
                cells.add(this.getString(key + ".label"));
                // Value of the attribute
                cells.add(this.updatedGroupAttributes.get(key));

                // If an error occurred while saving the stem
                if (this.errorAttributes.contains(key)) {
                    typeData.add(TypeDataSmmary.ERROR.name());
                } else
                    // If the stem has been saved successfully
                    if (this.getGroupController().getGroup().isSaved()) {
                        typeData.add(TypeDataSmmary.SAVED.name());
                    } else
                        // If the stem has to be created
                        if (this.getGroupController().getIsCreation()) {
                            typeData.add(TypeDataSmmary.ADDED.name());
                        } else {
                            // If the stem has to be updated
                            typeData.add(TypeDataSmmary.UPDATED.name());
                        }

                datas.add(cells);
            }
        }

        resume.setTitle("ATTRIBUTE.OF.GROUP");
        resume.setIndex(indexs);
        resume.setControllerClass(GroupModificationsAttributesController.class.getName());
        resume.setData(datas);
        resume.setTypeData(typeData);
        resume.setSaved(typeData.contains(TypeDataSmmary.SAVED.name()) && this.errorData.size() == 0);

        return resume;
    }

    /**
     * Getter for the resume of modifications made on the rights of the group.
     * 
     * @return a resume of the modifications made on the group rights
     */
    private Resume getResumeRights() {
        Resume resume = new Resume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        List < List < String >> datas = new ArrayList < List < String > >();
        List < List < String >> originals = new ArrayList < List < String > >();
        List < String > typeData = new ArrayList < String >();
        List < String > indexs = new ArrayList < String >();

        List < String > cells = null;
        List < String > origins = null;

        colNames.add(new ColInfo("GROUP.RIGHT.NAME"));
        colNames.add(new ColInfo("GROUP.RIGHT.VALUE", Boolean.FALSE, DataTypeEnum.CHECKBOX));

        resume.setColInfos(colNames);

        // Iterate on the updated groups.
        if (!this.updatedGroupRights.isEmpty()) {
            for (GroupPrivilegeEnum key : this.updatedGroupRights.keySet()) {
                cells = new ArrayList < String >();
                origins = new ArrayList < String >();

                // Key
                indexs.add(key.getName());
                List < Parameter > parameters = this.parameterService.findParametersById(
                        ESCOConstantes.GROUP_GROUP_PRIVILEGES, key.getName());

                if (parameters.isEmpty()) {
                    cells.add(this.getString(key + ".label"));
                    origins.add(this.getString(key + ".label"));
                } else {
                    cells.add(this.getString(parameters.iterator().next().getValue()));
                    origins.add(this.getString(parameters.iterator().next().getValue()));
                }

                // Value of the attribute
                cells.add(PrivilegeDisplayUtils.getDisplayPrivilege(this.updatedGroupRights.get(key)));
                origins.add(PrivilegeDisplayUtils.getDisplayPrivilege(!this.updatedGroupRights.get(key)));

                // If an error occurred while saving the group
                if (this.errorAttributes.contains(key.getName())) {
                    typeData.add(TypeDataSmmary.ERROR.name());
                } else
                    // If the group has been saved successfully
                    if (this.getGroupController().getGroup().isSaved()) {
                        typeData.add(TypeDataSmmary.SAVED.name());
                    } else
                        // If the group has to be created
                        if (this.getGroupController().getIsCreation()) {
                            typeData.add(TypeDataSmmary.ADDED.name());
                        } else {
                            // If the stem has to be updated
                            typeData.add(TypeDataSmmary.UPDATED.name());
                        }

                datas.add(cells);
                originals.add(origins);
            }
        }

        resume.setTitle("DEFAULT.PRIVILEGES.OF.GROUP");
        resume.setIndex(indexs);
        resume.setControllerClass(GroupModificationsAttributesController.class.getName());
        resume.setData(datas);
        resume.setOriginals(originals);
        resume.setTypeData(typeData);
        resume.setSaved(typeData.contains(TypeDataSmmary.SAVED.name()) && this.errorData.size() == 0);

        return resume;
    }

    /**
     * Getter for the resume of the modifications made on the types of the
     * group.
     * 
     * @return a resume of the modifications made on the group types
     */
    private Resume getResumeTypes() {
        Resume resume = new Resume();

        List < ColInfo > colNames = new ArrayList < ColInfo >();
        List < List < String >> datas = new ArrayList < List < String > >();
        List < List < String >> originals = new ArrayList < List < String > >();
        List < String > typeData = new ArrayList < String >();
        List < String > indexs = new ArrayList < String >();

        List < String > cells = null;
        List < String > origins = null;

        String typeValue = null;
        Boolean customTypesOrignal = null;
        Boolean customTypesUpdated = null;
        Boolean same = null;
        Boolean create = null;

        Map < String, Boolean > customTypes = this.getOriginalCustumType();

        colNames.add(new ColInfo("GROUP.TYPE.NAME"));
        colNames.add(new ColInfo("GROUP.TYPE.VALUE", Boolean.FALSE, DataTypeEnum.CHECKBOX));

        resume.setColInfos(colNames);

        // Iterate on the updated groups.
        if (!this.updatedGroupTypes.isEmpty()) {
            for (String key : this.updatedGroupTypes.keySet()) {

                customTypesOrignal = customTypes.get(key);
                customTypesUpdated = this.updatedGroupTypes.get(key);

                create = customTypesOrignal == null && customTypesUpdated;
                same = true;
                if (customTypesOrignal != null) {
                    same = customTypesOrignal.booleanValue() == customTypesUpdated.booleanValue();
                }

                if (create || !same) {
                    cells = new ArrayList < String >();
                    origins = new ArrayList < String >();

                    // Key
                    indexs.add(key);

                    List < Parameter > parameters = this.parameterService.findParametersById(
                            ESCOConstantes.TYPE_GROUP_CONTEXT, key);
                    if (parameters.isEmpty()) {
                        parameters = this.parameterService.findParametersById(ESCOConstantes.TYPE_GROUP_CUSTOM,
                                key);
                    }

                    if (parameters.isEmpty()) {
                        typeValue = this.getString(key + ".label");
                    } else {
                        typeValue = this.getString(parameters.iterator().next().getValue());
                    }

                    cells.add(typeValue);
                    origins.add(typeValue);

                    // Value of the attribute
                    cells.add(PrivilegeDisplayUtils.getDisplayPrivilege(customTypesUpdated));
                    origins.add(PrivilegeDisplayUtils.getDisplayPrivilege(!customTypesUpdated));

                    // If an error occurred while saving the group
                    if (this.errorAttributes.contains(key)) {
                        typeData.add(TypeDataSmmary.ERROR.name());
                    } else
                        // If the group has been saved successfully
                        if (this.getGroupController().getGroup().isSaved()) {
                            typeData.add(TypeDataSmmary.SAVED.name());
                        } else
                            // If the group has to be created
                            if (this.getGroupController().getIsCreation()) {
                                typeData.add(TypeDataSmmary.ADDED.name());
                            } else {
                                // If the stem has to be updated
                                typeData.add(TypeDataSmmary.UPDATED.name());
                            }

                    datas.add(cells);
                    originals.add(origins);
                }
            }
        }

        resume.setTitle("GROUP.TYPES.OF.GROUP");
        resume.setIndex(indexs);
        resume.setControllerClass(GroupModificationsAttributesController.class.getName());
        resume.setData(datas);
        resume.setOriginals(originals);
        resume.setTypeData(typeData);
        resume.setSaved(typeData.contains(TypeDataSmmary.SAVED.name()) && this.errorData.size() == 0);

        return resume;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isModified() {
        boolean result = false;

        Boolean customTypesOrignal = null;
        Boolean customTypesUpdated = null;

        Map < String, Boolean > customTypes = this.getOriginalCustumType();
        for (String key : this.updatedGroupTypes.keySet()) {

            customTypesOrignal = customTypes.get(key);
            customTypesUpdated = this.updatedGroupTypes.get(key);
            if (customTypesOrignal != null
                    && customTypesOrignal.booleanValue() != customTypesUpdated.booleanValue()) {
                result = true;
                break;
            }
        }
        if (!this.getGroupController().getIsCreation()) {
            if (!this.updatedGroupAttributes.isEmpty() || !this.updatedGroupRights.isEmpty()) {
                result = true;
            }
        } else {
            for (String key : this.updatedGroupAttributes.keySet()) {
                if (!this.updatedGroupAttributes.get(key).equals("")) {
                    result = true;
                }
            }
            if (!this.updatedGroupRights.isEmpty()) {
                result = true;
            }
        }

        return result;
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {

        Boolean status = null;
        boolean error = false;

        // Reinitialize the error list
        this.errorClassesNames.clear();
        this.errorAttributes.clear();

        // If the group and its privileges have already been saved successfully,
        // there is nothing to do
        if (!this.getGroupController().getGroup().isSaved()) {

            error = this.saveGroupAttributes();

            // If no error happened while modifying/creating the group
            if (!error) {
                this.saveGroupPrivileges();
            }
        }

        // Errors or not ?
        if (this.errorClassesNames.isEmpty()) {
            // Switch to the state Update if is in creation because the group is
            // create and if there is some errors in others controllers, then he
            // not create again the group.
            if (this.getGroupController().getIsCreation()) {
                this.getGroupController().setCreation(Boolean.FALSE);
            }
            status = Boolean.TRUE;
        } else {
            status = Boolean.FALSE;
        }

        return new Status(status);
    }

    /**
     * save all attribute from group (attribute and custom type).
     * 
     * @return true if there are no error, false otherwise.
     */
    private boolean saveGroupAttributes() {
        boolean error = false;
        List < String > typeNamesList = new ArrayList < String >();
        String groupID = this.getGroupController().getGroup().getIdGroup();

        Person userConnected = null;
        try {
            userConnected = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e) {
            GroupModificationsAttributesController.LOGGER.error(e, "Subject not found");
        } catch (ESCOSubjectNotUniqueException e) {
            GroupModificationsAttributesController.LOGGER.error(e, "Subject not unique");
        }

        // Create/Modify the group and its types
        if (!this.updatedGroupAttributes.isEmpty() || !this.updatedGroupTypes.isEmpty()) {
            Group updatedGroup = null;
            if (this.getGroupController().getGroup() == null) {
                updatedGroup = new Group();
            } else {
                try {
                    updatedGroup = this.getGroupController().getGroup().clone();
                } catch (CloneNotSupportedException e) {
                }
            }

            // We need to apply modifications on the
            // original attributes of the group
            for (Entry < String, String > updatedAttribute : this.updatedGroupAttributes.entrySet()) {
                updatedGroup.addMappingFieldCol(updatedAttribute.getKey(), updatedAttribute.getValue());
            }

            // Apply the modifications on the types of the group
            for (Entry < String, Boolean > updatedType : this.updatedGroupTypes.entrySet()) {
                if (updatedType.getValue()) {
                    typeNamesList.add(updatedType.getKey());
                }
            }

            if (null == updatedGroup.getDetail()) {
                updatedGroup.setDetail(new GroupDetail());
            }
            updatedGroup.getDetail().setTypeNames(typeNamesList.toArray(new String[] {}));

            try {

                Stem parentStem = this.getGroupController().getGrouperService().findStemByUuid(userConnected,
                        this.getGroupController().getParentStem().getUuid());

                if (StringUtils.isEmpty(parentStem.getDisplayName())) {
                    updatedGroup.addMappingFieldCol(ESCOConstantes.DISPLAY_NAME, updatedGroup
                            .getDisplayExtension());
                } else {
                    updatedGroup.addMappingFieldCol(ESCOConstantes.DISPLAY_NAME, parentStem.getDisplayName()
                            + ESCOConstantes.STEM_NAME_SEPARATOR + updatedGroup.getDisplayExtension());
                }

                if (StringUtils.isEmpty(parentStem.getName())) {
                    updatedGroup.addMappingFieldCol(ESCOConstantes.NAME, updatedGroup.getExtension());
                } else {
                    updatedGroup.addMappingFieldCol(ESCOConstantes.NAME, parentStem.getName()
                            + ESCOConstantes.STEM_NAME_SEPARATOR + updatedGroup.getExtension());
                }

                // If the stem is created
                if (this.getGroupController().getIsCreation()) {
                    // Call the service that will create the group
                    groupID = this.getGroupController().getGrouperService().groupCreate(userConnected,
                            updatedGroup);
                    // Update the group with his new ID
                    this.getGroupController().setGroup(updatedGroup);
                    this.getGroupController().getGroup().setIdGroup(groupID);
                } else {
                    // Call the service that will modify the group
                    this.getGroupController().getGrouperService().groupUpdate(userConnected, updatedGroup);
                    this.getGroupController().setGroup(updatedGroup);
                }
            } catch (ESCOBusinessException ebe) {
                this.handleException(ebe, groupID);
            } finally {
                if (this.errorClassesNames.isEmpty()) {
                    // If the group was saved successfully
                    this.getGroupController().getGroup().setSaved(Boolean.TRUE);
                } else {
                    // If an error occurs
                    error = true;
                }
            }
        }
        return error;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void doSpecificException(final ESCOBusinessException theEbe, final String theSubjectId) {
        if (theEbe instanceof ESCOAttributeException) {
            this.errorAttributes.addAll(((ESCOAttributeException) theEbe).getAttributes());
        }
    }

    /**
     * save all privilege from group .
     */
    private void saveGroupPrivileges() {
        String groupID = this.getGroupController().getGroup().getIdGroup();

        Person userConnected = null;
        try {
            userConnected = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e) {
        } catch (ESCOSubjectNotUniqueException e) {
        }

        Privilege privilege = new Privilege();
        privilege.setPrivilegeType(PrivilegeTypeEnum.ACCESS.getValue());

        List < GroupPrivilegeEnum > aux = new ArrayList(this.updatedGroupRights.keySet());

        Collections.sort(aux, new Comparator < GroupPrivilegeEnum >() {
            public int compare(final GroupPrivilegeEnum theO1, final GroupPrivilegeEnum theO2) {
                Boolean result = theO1.gt(theO2);
                if (result) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });

        // Modify the default rights of the group
        if (!this.updatedGroupRights.isEmpty()) {
            for (GroupPrivilegeEnum key : aux) {
                try {
                    // Update the rights of the group
                    privilege.setPrivilegeName(key.getName());
                    if (this.updatedGroupRights.get(key)) {
                        // Call the service that will assign privilege on the
                        // group
                        this.getGroupController().getGrouperService().assignGroupPrivileges(userConnected,
                                "GrouperAll", groupID, privilege);
                    } else {
                        // Call the service that will remove privilege on the
                        // group
                        this.getGroupController().getGrouperService().removeGroupPrivileges(userConnected,
                                "GrouperAll", groupID, privilege);
                    }
                } catch (ESCOBusinessException ebe) {
                    this.handleException(ebe, groupID);
                } finally {
                    // If an error occurred while saving the modifications
                    if (this.errorClassesNames.isEmpty()) {
                        this.getGroupController().getGroup().setSaved(Boolean.TRUE);
                    } else {
                        this.errorAttributes.add(key.getName());
                        this.getGroupController().getGroup().setSaved(Boolean.FALSE);
                    }
                }
            }
        }
    }

    /**
     * Allow to retrieve attributes information from a group.
     * 
     * @return the list of attributes.
     */
    public List < Attribute > getGroupAttributes() {
        List < Attribute > attributes = new ArrayList < Attribute >();
        String value = null;

        // Check if the current group is null, ie: no group found with uuid from
        // parameter
        if (this.getGroupController().getGroup() != null) {
            Set < String > extension = null;

            Map < String, String > mappingFieldCol = this.getGroupController().getGroup().getMappingFieldCol();
            for (Entry < String, String > mapField : mappingFieldCol.entrySet()) {
                // recovery of the value of the map of modifications
                value = this.updatedGroupAttributes.get(mapField.getKey());
                // if the value is null, recovery original value
                if (null == this.updatedGroupAttributes.get(mapField.getKey())) {
                    value = mapField.getValue();
                }
                GroupModificationsAttributesController.LOGGER.debug("Add field for value : " + mapField.getKey()
                        + " -> " + value);
                extension = new HashSet < String >();
                if (org.esco.grouperui.services.ESCOConstantes.NULL_DATA_IN_THIS_MAPPING_FIELD_COL.equals(value)) {
                    extension.add("");
                } else {
                    extension.add(value);
                }
                attributes.add(new Attribute(mapField.getKey(), extension));
            }
        }

        return attributes;
    }

    /**
     * Allow to retrieve default rights information from a group.
     * 
     * @return the list of rights.
     */
    public List < RadioButtonItem > getGroupRights() {
        List < RadioButtonItem > attributes = new ArrayList < RadioButtonItem >();
        Boolean value;
        List < Privilege > listPrivileges = null;
        Privilege privilege = null;
        String label = null;

        // Check if the current group is null, ie: no group found with uuid from
        // parameter
        if (this.getGroupController().getGroup() != null) {

            Person userConnected = null;
            try {
                userConnected = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e) {
                GroupModificationsAttributesController.LOGGER.error(e, "Subject not found");
            } catch (ESCOSubjectNotUniqueException e) {
                GroupModificationsAttributesController.LOGGER.error(e, "Subject not unique");
            }

            String currentGroupName = this.getGroupController().getGroup().getName();
            // In creation mode, the name of the current group is empty
            if (!"".equals(currentGroupName)) {
                listPrivileges = this.getGroupController().getGrouperService().findDefaultGroupPrivileges(
                        userConnected, currentGroupName);
            }

            List < Parameter > listParameters = this.parameterService.findParametersByGroup(
                    ESCOConstantes.GROUP_GROUP_PRIVILEGES).getParameters();

            if (null != listParameters) {
                for (GroupPrivilegeEnum privilegeName : GroupPrivilegeEnum.values()) {
                    // Verification that the privilege is set
                    label = null;
                    for (Parameter parameter : listParameters) {
                        if (privilegeName.getName().equals(parameter.getKey())) {
                            label = parameter.getValue();
                        }
                    }

                    // if label different to null, means that the privilege is
                    // found
                    if (null != label) {
                        // recovery of the value of the map of modifications
                        value = this.updatedGroupRights.get(privilegeName);
                        // if the value is null, recovery original value
                        if (null == value) {
                            // if the privilege is contained in the list
                            privilege = new Privilege();
                            privilege.setPrivilegeName(privilegeName.getName());
                            if (null != listPrivileges && listPrivileges.contains(privilege)) {
                                value = true;
                            } else {
                                value = false;
                            }
                        }
                        GroupModificationsAttributesController.LOGGER.debug("Add field for value : "
                                + privilegeName.getName() + " -> " + value);

                        attributes.add(new RadioButtonItem(privilegeName.name().toLowerCase(), this
                                .getString(label), value));
                    } else {
                        // if the privilege is not set, it is not add to the
                        // list
                    }
                }
                // sort of the list
                attributes = this.sort(attributes, ESCOConstantes.GROUP_GROUP_PRIVILEGES);

            } else {
                // there is no parameter
                // do nothing
            }
        }

        return attributes;
    }

    /**
     * getter for property updatedGroupTypes.
     * 
     * @return the updatedGroupTypes
     */
    public Map < String, Boolean > getCustomTypesOfLocalGroup() {
        if (this.updatedGroupTypes.isEmpty()) {

            Map < String, Boolean > customTypeGroup = this.getOriginalCustumType();

            return customTypeGroup;
        } else {
            return this.updatedGroupTypes;
        }
    }

    /**
     * @return the original custom type from group.
     */
    private Map < String, Boolean > getOriginalCustumType() {
        Map < String, Boolean > customTypeGroup = new HashMap < String, Boolean >();

        if (!this.getGroupController().getIsCreation()) {

            List < RadioButtonItem > customTypes = this
                    .getCustomTypesFromParameter(ESCOConstantes.TYPE_GROUP_CUSTOM);
            List < RadioButtonItem > customTypesContext = this
                    .getCustomTypesFromParameter(ESCOConstantes.TYPE_GROUP_CONTEXT);

            for (RadioButtonItem radioButtonItem : customTypesContext) {
                customTypeGroup.put(radioButtonItem.getValue(), radioButtonItem.getDisabled());
            }
            for (RadioButtonItem radioButtonItem : customTypes) {
                customTypeGroup.put(radioButtonItem.getValue(), radioButtonItem.getDisabled());
            }
        }
        this.originalGroupTypes.putAll(customTypeGroup);

        return customTypeGroup;
    }

    /**
     * @param theParameterName
     *            the name of parameter group for find information about custom
     *            type like name, label, sort ...
     * @return the list of all custom type corresponding to the parameter group.
     */
    private List < RadioButtonItem > getCustomTypesFromParameter(final String theParameterName) {

        List < RadioButtonItem > customTypeGroupRadios = new ArrayList < RadioButtonItem >();
        List < GroupType > listGroupType = null;
        List < Parameter > listCustomType = null;
        GroupType groupType = null;

        // Check if the current group is null, ie: no group found with uuid from
        // parameter
        if (this.getGroupController().getGroup() != null) {
            if (null != this.getGroupController().getGroup().getDetail()) {
                // get all data
                String[] typeGroups = this.getGroupController().getGroup().getDetail().getTypeNames();
                // find custom type group detail for current group
                listGroupType = this.getGroupController().getGrouperService().findListTypes(typeGroups);
            }

            listCustomType = this.parameterService.findParametersByGroup(theParameterName).getParameters();

            List < Parameter > defaultTypeCustom = this.parameterService.findParametersById(
                    ESCOConstantes.TYPE_CUSTOM_DEFAULT, ESCOConstantes.TYPE_CUSTOM_DEFAULT_KEY);

            GroupType type = new GroupType();
            if (defaultTypeCustom.isEmpty()) {
                type.setName("base");
            } else {
                type.setName(defaultTypeCustom.iterator().next().getValue());
            }

            boolean oneSelected = false;
            RadioButtonItem baseRadio = null;
            RadioButtonItem itemRadio = null;
            Boolean value = null;

            for (Parameter parameter : listCustomType) {

                // if the type is contained in the list
                groupType = new GroupType();
                groupType.setName(parameter.getKey());
                if (null != listGroupType && listGroupType.contains(groupType)) {
                    value = true;
                    oneSelected = true;
                } else {
                    value = false;
                }

                itemRadio = new RadioButtonItem(parameter.getKey(), this.getString(parameter.getValue()), value);

                if (type.equals(groupType)) {
                    baseRadio = itemRadio;
                }

                customTypeGroupRadios.add(itemRadio);
            }

            if (!oneSelected && ESCOConstantes.TYPE_GROUP_CUSTOM.equals(theParameterName)) {
                baseRadio.setDisabled(true);
            }
        }

        return customTypeGroupRadios;
    }

    /**
     * Allow to retrieve custom type information from a group.
     * 
     * @return the list of custom type.
     */
    public List < RadioButtonItem > getGroupCustomTypes() {
        List < Parameter > listContexts = null;
        String contexts = null;
        List < RadioButtonItem > customTypeGroupRadios = this
                .getCustomTypesFromParameter(ESCOConstantes.TYPE_GROUP_CUSTOM);

        for (RadioButtonItem customTypeGroupRadio : customTypeGroupRadios) {

            listContexts = this.parameterService.findParametersById(ESCOConstantes.TYPE_GROUP_CONTEXT
                    + ESCOConstantes.GROUP_NAME_SEPARATOR + customTypeGroupRadio.getValue(), customTypeGroupRadio
                    .getValue());

            // recovery of the value of the map of modifications
            Boolean value = this.updatedGroupTypes.get(customTypeGroupRadio.getValue());
            if (value != null) {
                customTypeGroupRadio.setDisabled(value);
            }

            // the list should contain one element
            if (null != listContexts && listContexts.size() == 1) {
                contexts = listContexts.get(0).getValue();
                customTypeGroupRadio.setContexts(contexts);
            }
        }
        return customTypeGroupRadios;
    }

    /**
     * Allow to retrieve context information from a group.
     * 
     * @return the list of context.
     */
    public List < RadioButtonItem > getGroupContexts() {

        List < RadioButtonItem > customTypeGroupRadios = this
                .getCustomTypesFromParameter(ESCOConstantes.TYPE_GROUP_CONTEXT);

        for (RadioButtonItem customTypeGroupRadio : customTypeGroupRadios) {
            // recovery of the value of the map of modifications
            Boolean value = this.updatedGroupTypes.get(customTypeGroupRadio.getValue());
            if (value != null) {
                customTypeGroupRadio.setDisabled(value);
            }
        }
        return customTypeGroupRadios;
    }

    /**
     * Allow to retrieve incompatibilities of a context for a custom type from a
     * group.
     * 
     * @return the XML data.
     */
    public String getIncompatibilities() {
        StringBuffer buffer = new StringBuffer();
        String incompatibilities = null;
        String customType = this.getParam("customType");
        String useContext = this.getParam("context");
        String value = null;
        List < String > listContext = null;

        FacesContext context = FacesContext.getCurrentInstance();
        IParameterService parameterService = (IParameterService) context.getApplication().createValueBinding(
                ESCOConstantes.PARAMETER_SERVICE).getValue(context);

        List < Parameter > listParameters = parameterService.findParametersByGroup(
                ESCOConstantes.GROUP_GROUP_CONTEXT_INCOMPATIBILITIES + ESCOConstantes.GROUP_NAME_SEPARATOR
                        + customType).getParameters();

        if (null != listParameters) {
            for (Parameter parameter : listParameters) {
                value = parameter.getValue();
                listContext = Arrays.asList(value.split("[|]+"));
                int index = listContext.indexOf(useContext);
                switch (index) {
                    case -1:
                        // context is not in this rule
                        // do nothing
                        break;
                    case 0:
                        // context is the first element, so the second element
                        // is incompatible
                        buffer.append(listContext.get(1));
                        buffer.append("|");
                        break;
                    case 1:
                        // context is the second element, so the first element
                        // is incompatible
                        buffer.append(listContext.get(0));
                        buffer.append("|");
                        break;
                    default:
                        // there are only two contexts by rule
                        // do nothing
                        break;
                }
            }
            if (buffer.length() > 0) {
                incompatibilities = buffer.substring(0, buffer.length() - 1);
            } else {
                incompatibilities = buffer.toString();
            }
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new XMLResultString(incompatibilities));
        producer.setTypesOfTarget(XMLResultString.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Allow to retrieve the group of inputs (modification or creation).
     * 
     * @return the group.
     */
    public String getGroupInput() {
        String result = null;
        boolean creation = this.getGroupController().getIsCreation();

        if (creation) {
            result = ESCOConstantes.CREATION;
        } else {
            // else we are in modification
            result = ESCOConstantes.MODIFICATION;
        }

        return result;
    }

    /**
     * Allow to update group attributes.
     * 
     * @return .
     */
    public String updateAttributes() {
        Boolean isCreation = this.getGroupController().getIsCreation();

        // Clear all the maps.
        this.updatedGroupAttributes.clear();
        this.updatedGroupRights.clear();
        this.updatedGroupTypes.clear();

        // Management of attributes
        ParameterGroup parameterGroupInput = this.parameterService
                .findParametersByGroup(ESCOConstantes.GROUP_GROUP_ATTRIBUT + ESCOConstantes.GROUP_NAME_SEPARATOR
                        + this.getGroupInput());

        List < Parameter > listParametersInput = parameterGroupInput.getParameters();

        for (Parameter parameterInput : listParametersInput) {
            String field = parameterInput.getKey();
            if (!isCreation) {
                if (this.getGroupController().getGroup().getValueFormCol(field).equals(this.getParam(field))) {
                    // NOTHING TO DO.
                } else {
                    this.updatedGroupAttributes.put(field, this.getParam(field));
                }
            } else {
                this.updatedGroupAttributes.put(field, this.getParam(field));
            }
        }

        // Management of privileges
        List < Privilege > listPrivileges = new ArrayList < Privilege >();
        if (!isCreation) {
            Person userConnected = null;
            try {
                userConnected = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e1) {
                GroupModificationsAttributesController.LOGGER.error(e1, "Subject not found");
            } catch (ESCOSubjectNotUniqueException e1) {
                GroupModificationsAttributesController.LOGGER.error(e1, "Subject not unique");
            }

            String currentGroupName = this.getGroupController().getGroup().getName();
            // In creation mode, the name of the current group is empty
            if (!"".equals(currentGroupName)) {
                listPrivileges = this.getGroupController().getGrouperService().findDefaultGroupPrivileges(
                        userConnected, currentGroupName);
            }
        }

        // checks if there is a change in the rights from the original list
        for (GroupPrivilegeEnum groupPrivilegeEnum : GroupPrivilegeEnum.values()) {
            boolean founded = false;
            String thePrivFromParamString = this.getParam("privilege_"
                    + groupPrivilegeEnum.getName().toLowerCase());
            if (StringUtils.isNotEmpty(thePrivFromParamString)) {
                Boolean thePrivFromParam = thePrivFromParamString.equals(ESCOConstantes.TRUE);
                for (Privilege privilege : listPrivileges) {
                    if (groupPrivilegeEnum.getName().toLowerCase().equals(
                            privilege.getPrivilegeName().toLowerCase())) {
                        if (!thePrivFromParam) {
                            this.updatedGroupRights.put(groupPrivilegeEnum, thePrivFromParam);
                        }
                        founded = true;
                        break;
                    }
                }
                if (!founded && thePrivFromParam) {
                    this.updatedGroupRights.put(groupPrivilegeEnum, thePrivFromParam);
                }
            }
        }
        // Management of custom types.
        this.getOriginalCustumType();

        // Custom type
        List < Parameter > customTypes = this.parameterService.findParametersByGroup(
                ESCOConstantes.TYPE_GROUP_CUSTOM).getParameters();
        for (Parameter parameter : customTypes) {
            this.updatedGroupTypes.put(parameter.getKey(), Boolean.parseBoolean(this.getParam("customType_"
                    + parameter.getKey())));
        }

        // Context
        List < Parameter > customTypesContext = this.parameterService.findParametersByGroup(
                ESCOConstantes.TYPE_GROUP_CONTEXT).getParameters();

        for (Parameter parameter : customTypesContext) {
            this.updatedGroupTypes.put(parameter.getKey(), Boolean.parseBoolean(this.getParam("groupContext_"
                    + parameter.getKey())));
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Allow to update group types.
     * 
     * @return .
     */
    @SuppressWarnings("unused")
    private String updateContexts() {

        String idContext = this.getParam(ESCOConstantes.ID_CONTEXT);
        Boolean checked = Boolean.valueOf(this.getParam(ESCOConstantes.CHECKED));

        this.updatedGroupTypes.put(idContext, checked);

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(Boolean.TRUE));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Setter for xmlProducerWrapper.
     * 
     * @param theXmlProducerWrapper
     *            the xmlProducerWrapper to set.
     */
    @Override
    public final void setXmlProducerWrapper(final IWrapper < XmlProducer, String > theXmlProducerWrapper) {
        this.xmlProducerWrapper = theXmlProducerWrapper;
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
    public void discardModification(final String index) {
        // Look for the attribute in the updated attributes list
        if (null != this.updatedGroupAttributes.get(index)) {
            // Discard modification on the attribute
            this.updatedGroupAttributes.remove(index);
            // Remove the attribute from the error list
            if (this.errorAttributes.contains(index)) {
                this.errorAttributes.remove(index);
            }
        }

        // Look for the attribute in the updated rights list
        if (null != this.updatedGroupRights.get(GroupPrivilegeEnum.fromValue(index))) {
            // Discard modification on the attribute
            this.updatedGroupRights.remove(GroupPrivilegeEnum.fromValue(index));
            // Remove the right from the error list
            if (this.errorAttributes.contains(index)) {
                this.errorAttributes.remove(index);
            }
        }

        // Look for the attribute in the updated types list
        if (null != this.updatedGroupTypes.get(index)) {
            // Discard modification on the attribute
            this.updatedGroupTypes.remove(index);
            // Remove the type from the error list
            if (this.errorAttributes.contains(index)) {
                this.errorAttributes.remove(index);
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    public void applyModification(final String index, final String newValue) {

        int iteration = 0;
        int idAttribute = Integer.parseInt(index);

        // Iterate on the updated attributes
        for (String key : this.updatedGroupAttributes.keySet()) {
            // Check the index of the attribute
            if (iteration == idAttribute) {
                // Replace the value of the attribute
                this.updatedGroupAttributes.put(key, newValue);
                // Remove the attribute from the error list
                if (this.errorAttributes.contains(key)) {
                    this.errorAttributes.remove(key);
                }
                break;
            }
            iteration++;
        }
    }

    /**
     * {@inheritDoc}
     */
    public String getAttributeKey(final String index) {

        int iteration = 0;
        int idAttribute = Integer.parseInt(index);
        String attributeKey = null;

        // Iterate on the updated groups.
        for (String key : this.updatedGroupAttributes.keySet()) {
            // Check the index of the attribute
            if (idAttribute == iteration) {
                // Get the attribute key
                attributeKey = key;
                break;
            }
            iteration++;
        }

        return attributeKey;
    }

    /**
     * {@inheritDoc}
     */
    public List < String > getErrorClassesNames() {
        List < String > errors = new ArrayList < String >();
        String errorName = null;

        // Iterate on the list to drop the errors that appear more than once.
        Iterator < String > itErrors = this.errorClassesNames.iterator();
        while (itErrors.hasNext()) {
            errorName = itErrors.next();
            if (!errors.contains(errorName)) {
                errors.add(errorName);
            }
        }
        return errors;
    }

    /**
     * Can sort the list according to the sort of the group.
     * 
     * @param listSort
     *            list to sort
     * @param group
     *            group of the sort
     * @return the sorted list
     */
    public List < RadioButtonItem > sort(final List < RadioButtonItem > listSort, final String group) {

        List < Parameter > parametersSort = this.parameterService.findParametersById(group + "."
                + GroupModificationsAttributesController.SORT, GroupModificationsAttributesController.SORT);

        // If the parameter for sorting the list doesn't exist.
        if (parametersSort.isEmpty()) {
            GroupModificationsAttributesController.LOGGER.info("No parameters for sorting have been found.");
        } else
            // If more than one parameter for sorting have been found.
            if (parametersSort.size() > 1) {
                GroupModificationsAttributesController.LOGGER
                        .info("More than one parameters for sorting have been found.");
            } else {
                // If the parameter for sorting exist (not empty) and if there
                // is only one parameter, we sort the list.
                GroupModificationsAttributesController.LOGGER.info("Parameters for sorting have been found.");

                final String[] attrSort = parametersSort.get(0).getValue().split("\\|");

                // Sorting the list of Attribute.
                Collections.sort(listSort, new Comparator < RadioButtonItem >() {
                    public int compare(final RadioButtonItem theO1, final RadioButtonItem theO2) {
                        int posAttrLeft = GroupModificationsAttributesController.this.findPosInAttrsSort(attrSort,
                                theO1.getValue());
                        int posAttrRight = GroupModificationsAttributesController.this.findPosInAttrsSort(
                                attrSort, theO2.getValue());

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

        return listSort;
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

}
