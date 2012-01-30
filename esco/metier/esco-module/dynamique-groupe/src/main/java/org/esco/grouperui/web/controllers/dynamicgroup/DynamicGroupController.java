package org.esco.grouperui.web.controllers.dynamicgroup;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.faces.context.FacesContext;
import javax.faces.el.ReferenceSyntaxException;

import org.apache.commons.lang.StringUtils;
import org.esco.dynamicgroups.domain.beans.DisabledI18NManager;
import org.esco.dynamicgroups.domain.beans.II18NManager;
import org.esco.dynamicgroups.domain.definition.AtomicProposition;
import org.esco.dynamicgroups.domain.definition.AtomicPropositionValidatorFromList;
import org.esco.dynamicgroups.domain.definition.Conjunction;
import org.esco.dynamicgroups.domain.definition.DecodedPropositionResult;
import org.esco.dynamicgroups.domain.definition.Disjunction;
import org.esco.dynamicgroups.domain.definition.IAtomicPropositionValidator;
import org.esco.dynamicgroups.domain.definition.IProposition;
import org.esco.dynamicgroups.domain.definition.Negation;
import org.esco.dynamicgroups.domain.definition.PropositionCodec;
import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupDetail;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.SimpleValue;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.ESCOBusinessException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.services.dynamicgroup.IGroupDynamicService;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterService;
import org.esco.grouperui.tools.parameter.Parameter;
import org.esco.grouperui.tools.parameter.ParameterGroup;
import org.esco.grouperui.tools.parameter.ParameterUtils;
import org.esco.grouperui.tools.property.PropertyManager;
import org.esco.grouperui.web.ESCOConstantes;
import org.esco.grouperui.web.beans.DropDown;
import org.esco.grouperui.web.beans.DropDownAttribute;
import org.esco.grouperui.web.beans.DropDownValues;
import org.esco.grouperui.web.beans.Operator;
import org.esco.grouperui.web.beans.Status;
import org.esco.grouperui.web.beans.dynamicgrouptree.DynamicGroupTree;
import org.esco.grouperui.web.beans.dynamicgrouptree.LdapRequestResult;
import org.esco.grouperui.web.beans.dynamicgrouptree.Member;
import org.esco.grouperui.web.beans.dynamicgrouptree.Operation;
import org.esco.grouperui.web.beans.summary.Resume;
import org.esco.grouperui.web.beans.table.TableData;
import org.esco.grouperui.web.beans.table.TableDataDynamicFactory;
import org.esco.grouperui.web.beans.table.TableDataFactory;
import org.esco.grouperui.web.controllers.GroupModificationController;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.plugins.AbstractControllerAware;
import org.esco.grouperui.web.utils.FaceContextUtils;
import org.esco.grouperui.web.utils.XmlProducer;

/**
 * Class DynamicGroupController. Requirement(s) : [RECIA-ESCO-L2-001],
 * [RECIA-ESCO-L2-002]
 * 
 * @author oFages
 */
public class DynamicGroupController extends AbstractControllerAware {

    /** serialVersionUID. */
    private static final long                          serialVersionUID                      = -2206805160235371049L;

    /** Logger. */
    private static final IESCOLogger                   LOGGER                                = ESCOLoggerFactory
                                                                                                     .getLogger(DynamicGroupController.class);

    /** The key for the attribute of dynamic group in Grouper. */
    private static final String                        ATTRIBUTE_DYNAMIC_GROUP               = "dynamic.key.attribute.ldaprequest";
    /** The key for the search base object. */
    private static final String                        DYNAMIC_GROUP_SEARCH_BASE             = "org.esco.grouperui.group.dynamic.ldap.search";
    /** The key for the left dropDown attribute's name. */
    private static final String                        DYNAMIC_GROUP_ATTRIBUTES              = "org.esco.grouperui.group.dynamic.leftdrop.name";
    /** The generic key for the right dropDown. */
    private static final String                        DYNAMIC_GROUP_RIGHTDROP               = "org.esco.grouperui.group.dynamic.rightdrop";
    /** The key for the right dropDown attribute's type. */
    private static final String                        DYNAMIC_GROUP_ATTRIBUTE_TYPE          = "org.esco.grouperui.group.dynamic.rightdrop.type";
    /** The value for the wildcard parameter. */
    private static final String                        DYNAMIC_GROUP_ATTRIBUTE_TYPE_WILDCARD = "wildcard";
    /** The value for the editable parameter. */
    private static final String                        DYNAMIC_GROUP_ATTRIBUTE_TYPE_EDITABLE = "editable";
    /** The value for the type "input". */
    private static final String                        DYNAMIC_GROUP_ATTRIBUTE_TYPE_INPUT    = "input";
    /** The value for the type "list". */
    private static final String                        DYNAMIC_GROUP_ATTRIBUTE_TYPE_LIST     = "list";
    /** The value for the type "request". */
    private static final String                        DYNAMIC_GROUP_ATTRIBUTE_TYPE_REQUEST  = "request";

    /** The key for the "and" operation. */
    private static final String                        OPERATION_AND                         = "and";
    /** The key for the "or" operation. */
    private static final String                        OPERATION_OR                          = "or";
    /** The key for the "not" operation. */
    private static final String                        OPERATION_NOT                         = "not";
    /** The key for the condition. */
    private static final String                        OPERATION_CONDITION                   = "condition";

    /** The key for the left member of a condition. */
    private static final String                        OPERATION_CONDITION_LEFT              = "left";
    /** The key for the operator of a condition. */
    private static final String                        OPERATION_CONDITION_OPERATOR          = "operator";
    /** The key for the right member of a condition. */
    private static final String                        OPERATION_CONDITION_RIGHT             = "right";

    /** The key for a conjunction. */
    private static final String                        CONJUNCTION                           = "conjunction";
    /** The key for a disjunction. */
    private static final String                        DISJUNCTION                           = "disjunction";
    /** The key for a negation. */
    private static final String                        NEGATION                              = "negation";

    /** The key of the different operators in the parameter database derby. */
    private static final String                        DYNAMIC_GROUP_LDAP_OPERATOR           = "org.esco.grouperui.group.dynamic.ldap.operator";

    /** The data in the table data. */
    private final transient LdapRequestResult          ldapRequestResult;

    /** Parameter service. */
    private transient IParameterService                parameterService;

    /** service for group dynamic interaction. */
    private transient IGroupDynamicService             groupDynamicService;

    /** wrapper for generate json from obejct. */
    private transient IWrapper < XmlProducer, String > jsonWrapper;

    /** The current ldap request. */
    private String                                     ldapRequest;

    /**
     * If the contoller has been modify.
     */
    private boolean                                    isModified;
    /**
     * If the controller is already load before and does not need to reload the
     * default strategy.
     */
    private boolean                                    alreadyLaod;

    /**
     * Default constructor.
     */
    public DynamicGroupController() {
        this.ldapRequestResult = new LdapRequestResult();
    }

    /**
     * Initialize the controller when the corresponding jsf is load.
     * 
     * @return the result of the initialize action.
     */
    public boolean getInitDynamicGroupController() {
        // Test if is the creation mode.
        if (!this.alreadyLaod) {
            this.ldapRequest = this.getInitialLdapRequest();
            this.alreadyLaod = true;
        }
        return true;
    }

    /**
     * return the initial ldap request load from strategy or from group detail.
     * 
     * @return the initial ldap request.
     */
    private String getInitialLdapRequest() {
        String initLdapRequest = null;
        if (this.getGroupController().getIsCreation()) {
            initLdapRequest = this.getApplyStrategy();
        } else {
            // We affect to the ldap request the grouper value.
            String[] attributes = this.getGroupController().getGroup().getDetail().getAttributeNames();
            String[] values = this.getGroupController().getGroup().getDetail().getAttributeValues();

            if (attributes != null && values != null) {
                int indexRequest = 0;
                for (int i = 0; i < attributes.length; i++) {
                    if (attributes[i].equals(PropertyManager.find(DynamicGroupController.ATTRIBUTE_DYNAMIC_GROUP)
                            .deType(String.class))) {
                        indexRequest = i;
                        break;
                    }
                }
                if (values.length == 0 || values[indexRequest].equals("")) {
                    initLdapRequest = this.getApplyStrategy();
                } else {
                    initLdapRequest = values[indexRequest];
                }
            }
        }
        return initLdapRequest;
    }

    /**
     * Set the ldap request thanks to the http parameter.
     * 
     * @return the result of the operation.
     */
    public String setLdapRequest() {
        String theRequest = this.getParam("ldapRequest");

        this.ldapRequest = theRequest;

        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(true));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Get the LDAP operators.
     * 
     * @return The json of the ldap operators allowed.
     */
    public String getLdapOperators() {
        List < Operator > operators = new ArrayList < Operator >();

        // Required services
        ParameterGroup parametersDynamicGroup = this.parameterService
                .findParametersByGroup(DynamicGroupController.DYNAMIC_GROUP_LDAP_OPERATOR);

        for (Parameter parameter : parametersDynamicGroup.getParameters()) {
            operators.add(new Operator(parameter.getValue(), parameter.getKey()));
        }

        XmlProducer producer = new XmlProducer();
        producer.setTarget(operators);

        return this.jsonWrapper.wrap(producer);
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
     * @return one strategy construct with group, stem and person.
     */
    public String getApplyStrategy() {

        Group group = this.getGroupController().getGroup();
        Person person = null;
        try {
            person = PersonController.getConnectedPerson();
        } catch (ESCOSubjectNotFoundException e) {
        } catch (ESCOSubjectNotUniqueException e) {
        }
        Stem stem = this.getGroupController().getParentStem();

        return this.groupDynamicService.findApplyStrategy(person, group, stem);
    }

    /**
     * Get the left dropDown which contains the list of the attributes.
     * 
     * @return the dropDown object
     */
    public String getDropDownList() {

        DropDown dropDown = new DropDown();

        List < DropDownAttribute > dropDownAttributes = new ArrayList < DropDownAttribute >();
        Parameter parameter = null;

        // Required services
        ParameterGroup parametersDynamicGroup = this.parameterService
                .findParametersByGroup(DynamicGroupController.DYNAMIC_GROUP_ATTRIBUTES);

        // Iterate on the attributes read from database
        Iterator < Parameter > itParameter = parametersDynamicGroup.getParameters().iterator();
        while (itParameter.hasNext()) {
            parameter = itParameter.next();
            dropDownAttributes.add(this.getDropDownAttribute(parameter.getKey(), this.getString(parameter
                    .getValue())));
        }

        // Result to return
        dropDown.setDropDownAttributes(dropDownAttributes);

        XmlProducer producer = new XmlProducer();
        producer.setTarget(dropDown);
        producer.setTypesOfTarget(DropDown.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Get the dropDownAttribute which contains the list of possible values for
     * the given attribute.
     * 
     * @param attributeKey
     *            the key of the attribute
     * @param attributeValue
     *            the value of the attribute
     * @return the dropDownAttribute object
     */
    public DropDownAttribute getDropDownAttribute(final String attributeKey, final String attributeValue) {

        DropDownAttribute dropDownAttribute = new DropDownAttribute(attributeKey, attributeValue);

        Parameter parameter = null;
        // Default value for the attribute type : "input"
        String attributeType = DynamicGroupController.DYNAMIC_GROUP_ATTRIBUTE_TYPE_INPUT;
        // Default value for the wildcard : true
        boolean wildcard = true;
        // Default value for editable : true
        boolean editable = true;
        List < SimpleValue > listAttributeValues = new ArrayList < SimpleValue >();
        StringBuffer keyType = new StringBuffer();

        // Required services
        List < Parameter > parametersDynamicGroup = this.parameterService.findParametersById(
                DynamicGroupController.DYNAMIC_GROUP_ATTRIBUTE_TYPE, dropDownAttribute.getKey());

        // Iterate on the attributes read from database
        Iterator < Parameter > itParameter = parametersDynamicGroup.iterator();
        while (itParameter.hasNext()) {
            parameter = itParameter.next();
            if (DynamicGroupController.DYNAMIC_GROUP_ATTRIBUTE_TYPE_WILDCARD.equals(parameter.getKey())) {
                if (ESCOConstantes.TRUE.equals(parameter.getValue())) {
                    wildcard = true;
                } else
                    if (ESCOConstantes.FALSE.equals(parameter.getValue())) {
                        wildcard = false;
                    }
            } else
                if (DynamicGroupController.DYNAMIC_GROUP_ATTRIBUTE_TYPE_EDITABLE.equals(parameter.getKey())) {
                    if (ESCOConstantes.TRUE.equals(parameter.getValue())) {
                        editable = true;
                    } else
                        if (ESCOConstantes.FALSE.equals(parameter.getValue())) {
                            editable = false;
                        }
                } else
                    if (ESCOConstantes.TRUE.equals(parameter.getValue())) {
                        attributeType = parameter.getKey();
                    }
        }

        // If the attribute is a list, we need to read the values associated
        if (null != attributeType
                && DynamicGroupController.DYNAMIC_GROUP_ATTRIBUTE_TYPE_LIST.equals(attributeType)) {

            // Construct the name of the PGROUP parameter,
            // happening "list" to the DYNAMIC_GROUP_RIGHTDROP constant
            keyType.append(DynamicGroupController.DYNAMIC_GROUP_RIGHTDROP).append(".");
            keyType.append(attributeType);

            // Read parameters in the database
            parametersDynamicGroup = this.parameterService.findParametersById(keyType.toString(),
                    dropDownAttribute.getKey());

            // Iterate on the attributes read from database
            itParameter = parametersDynamicGroup.iterator();
            while (itParameter.hasNext()) {
                parameter = itParameter.next();
                listAttributeValues.add(new SimpleValue(parameter.getKey(), this.getString(parameter.getValue())));
            }
        }

        // Result to return
        dropDownAttribute.setWildcard(wildcard);
        dropDownAttribute.setEditable(editable);
        dropDownAttribute.setType(attributeType);
        dropDownAttribute.setValues(new DropDownValues(listAttributeValues));

        return dropDownAttribute;
    }

    /**
     * Get values associated to a LDAP request.
     * 
     * @return the DropDown object with the result of the LDAP request only
     */
    public String getDropDownRequest() {

        String attributeKey = this.getParam("attribute");

        Group group = this.getGroupController().getGroup();

        DropDown dropDown = new DropDown();
        List < DropDownAttribute > dropDownAttributes = new ArrayList < DropDownAttribute >();
        List < SimpleValue > listAttributeValues = new ArrayList < SimpleValue >();
        Parameter parameter = null;
        String ldapRequest = null;

        FacesContext theFacesContext = FacesContext.getCurrentInstance();

        FaceContextUtils.addVariableToContext(theFacesContext, ESCOConstantes.ATTR_EL_ATTRIBUT, group
                .getMappingFieldCol());

        // Construct the name of the PGROUP parameter,
        // happening "request" to the DYNAMIC_GROUP_RIGHTDROP constant
        StringBuffer keyType = new StringBuffer();
        keyType.append(DynamicGroupController.DYNAMIC_GROUP_RIGHTDROP).append(".");
        keyType.append(DynamicGroupController.DYNAMIC_GROUP_ATTRIBUTE_TYPE_REQUEST);

        // Read the LDAP request from database
        List < Parameter > parametersDynamicGroup = this.parameterService.findParametersById(keyType.toString(),
                attributeKey);

        // Take the unique attribute read from database to find the ldap request
        if (parametersDynamicGroup != null && parametersDynamicGroup.size() == 1) {
            parameter = parametersDynamicGroup.get(0);
            if (parameter != null && parameter.getKey() != null && !"".equals(parameter.getKey())) {
                // regexp representing a EL expression.
                String elRegexp = ".*#\\{(.*)\\}.*";

                if (parameter.getKey().matches(elRegexp)) {
                    // Replace in the request the parameters
                    try {
                        ldapRequest = ParameterUtils.executeELFromParameter(theFacesContext, parameter);
                    } catch (ReferenceSyntaxException e) {
                        DynamicGroupController.LOGGER.debug(e);
                    }
                } else {
                    ldapRequest = parameter.getKey();
                }
            }

            // Interrogate the LDAP
            if (null != ldapRequest && !"".equals(ldapRequest)) {
                // Type of search
                String searchBaseObject = null;
                ParameterGroup parameterGroup = this.parameterService
                        .findParametersByGroup(DynamicGroupController.DYNAMIC_GROUP_SEARCH_BASE);
                if (parameterGroup != null && parameterGroup.getParameters() != null
                        && parameterGroup.getParameters().size() == 1) {
                    searchBaseObject = parameterGroup.getParameters().get(0).getValue();
                }

                // The attribute of the type of search
                String attribute = parameter.getValue();

                // Execute the LDAP request
                if (null != searchBaseObject && null != attribute && !"".equals(attribute)) {
                    listAttributeValues.addAll(this.groupDynamicService.executeRequest(ldapRequest, attribute,
                            searchBaseObject));
                }
            }
        }

        // Result to return
        DropDownAttribute dropDownAttribute = new DropDownAttribute();
        dropDownAttribute.setKey(attributeKey);
        dropDownAttribute.setType(DynamicGroupController.DYNAMIC_GROUP_ATTRIBUTE_TYPE_LIST);
        dropDownAttribute.setValues(new DropDownValues(listAttributeValues));

        dropDownAttributes.add(dropDownAttribute);

        // Result to return
        dropDown.setDropDownAttributes(dropDownAttributes);

        XmlProducer producer = new XmlProducer();
        producer.setTarget(dropDown);
        producer.setTypesOfTarget(DropDown.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Getter for the dynamic group tree.
     * 
     * @return the tree for the dynamic group
     */
    public String getDynamicGroupTree() {

        Operation operation = null;
        List < Operation > operations = new ArrayList < Operation >();

        Parameter parameter = null;

        // Required services
        ParameterGroup parametersDynamicGroup = this.parameterService
                .findParametersByGroup(DynamicGroupController.DYNAMIC_GROUP_ATTRIBUTES);

        // List the allowed attributes
        String[] validAttributes = new String[parametersDynamicGroup.getParameters().size()];

        // Iterate on the attributes read from database
        int count = 0;
        Iterator < Parameter > itParameter = parametersDynamicGroup.getParameters().iterator();
        while (itParameter.hasNext()) {
            parameter = itParameter.next();
            validAttributes[count] = parameter.getKey();
            count++;
        }

        II18NManager i18nManager = new DisabledI18NManager(true);
        IAtomicPropositionValidator atomValidator = new AtomicPropositionValidatorFromList(validAttributes,
                i18nManager);
        PropositionCodec codec = new PropositionCodec(atomValidator, i18nManager);

        // Decode LDAP request
        DecodedPropositionResult decodedProposition = codec.decode(this.ldapRequest);
        // Check if the ldap request is valid
        if (decodedProposition.isValid()) {
            operations.addAll(this.getOperation(decodedProposition.getProposition(), null));
            // We get only the root element
            if (operations.size() > 0) {
                operation = operations.get(0);
            }
        } else {
            DynamicGroupController.LOGGER.error("Error while decoding the ladp request : " + this.ldapRequest);
        }

        // Result to return
        DynamicGroupTree dynamicGroupTree = new DynamicGroupTree(operation);

        XmlProducer producer = new XmlProducer();
        producer.setTarget(dynamicGroupTree);
        producer.setTypesOfTarget(DynamicGroupTree.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Check the request.
     * 
     * @return the result of the check action/
     */
    public String checkLdapRequest() {

        String ldapRequest = this.getParam("ldapRequest");
        Boolean result = Boolean.FALSE;

        if (!ldapRequest.contains("undefined")) {

            Parameter parameter = null;

            // Required services
            ParameterGroup parametersDynamicGroup = this.parameterService
                    .findParametersByGroup(DynamicGroupController.DYNAMIC_GROUP_ATTRIBUTES);

            // List the allowed attributes
            String[] validAttributes = new String[parametersDynamicGroup.getParameters().size()];

            // Iterate on the attributes read from database
            int count = 0;
            Iterator < Parameter > itParameter = parametersDynamicGroup.getParameters().iterator();
            while (itParameter.hasNext()) {
                parameter = itParameter.next();
                validAttributes[count] = parameter.getKey();
                count++;
            }

            II18NManager i18nManager = new DisabledI18NManager(true);
            IAtomicPropositionValidator atomValidator = new AtomicPropositionValidatorFromList(validAttributes,
                    i18nManager);
            PropositionCodec codec = new PropositionCodec(atomValidator, i18nManager);

            // Decode LDAP request
            DecodedPropositionResult decodedProposition = codec.decode(ldapRequest);
            // Check if the ldap request is valid
            if (decodedProposition.isValid()) {
                result = Boolean.TRUE;
            }
        }
        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(result));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Getter for a list of operations depending on the nature of the
     * proposition.
     * 
     * @param proposition
     *            The proposition
     * @param parent
     *            The parent of the proposition
     * @return the list of operations for the proposition
     */
    private List < Operation > getOperation(final IProposition proposition, final String parent) {

        List < Operation > operations = new ArrayList < Operation >();

        if (proposition instanceof AtomicProposition) {
            operations.add(this.getCondition((AtomicProposition) proposition));
        } else
            if (proposition instanceof Conjunction) {
                operations.addAll(this.getConjunctiveOperation(proposition, parent));
            } else
                if (proposition instanceof Disjunction) {
                    operations.addAll(this.getDisjunctiveOperation(proposition, parent));
                } else
                    if (proposition instanceof Negation) {
                        operations.addAll(this.getNegativeOperation(proposition, parent));
                    }

        return operations;
    }

    /**
     * Getter for the operation associated with the atomic proposition.
     * 
     * @param atomicProposition
     *            the atomic proposition
     * @return the operation associated with the atomic proposition
     */
    private Operation getCondition(final AtomicProposition atomicProposition) {

        Operation operation = new Operation(DynamicGroupController.OPERATION_CONDITION);
        List < Member > members = new ArrayList < Member >();

        members.add(new Member(DynamicGroupController.OPERATION_CONDITION_LEFT, atomicProposition.getAttribute()));
        members.add(new Member(DynamicGroupController.OPERATION_CONDITION_OPERATOR, "="));
        members.add(new Member(DynamicGroupController.OPERATION_CONDITION_RIGHT, atomicProposition.getValue()));

        operation.setListOfMember(members);

        return operation;
    }

    /**
     * Getter for the list of operations associated with the conjunctive
     * proposition.
     * 
     * @param proposition
     *            the proposition
     * @param parent
     *            the parent of the proposition
     * @return the list of operations associated with the proposition.
     */
    private List < Operation > getConjunctiveOperation(final IProposition proposition, final String parent) {

        Operation operation = new Operation(DynamicGroupController.OPERATION_AND);
        List < Operation > operations = new ArrayList < Operation >();
        List < Operation > childOperations = new ArrayList < Operation >();

        List < IProposition > conjunctions = proposition.getConjunctivePropositions();
        for (IProposition conjunction : conjunctions) {
            IProposition firstConjunction = ((Conjunction) conjunction).getFirst();
            childOperations.addAll(this.getOperation(firstConjunction, DynamicGroupController.CONJUNCTION));

            IProposition secondConjunction = ((Conjunction) conjunction).getSecond();
            childOperations.addAll(this.getOperation(secondConjunction, DynamicGroupController.CONJUNCTION));
        }

        if (!DynamicGroupController.CONJUNCTION.equals(parent)) {
            operation.setListOfOperation(childOperations);
            operations.add(operation);
        } else {
            operations.addAll(childOperations);
        }

        return operations;
    }

    /**
     * Getter for the list of operations associated with the disjunctive
     * proposition.
     * 
     * @param proposition
     *            the proposition
     * @param parent
     *            the parent of the proposition
     * @return the list of operations associated with the proposition.
     */
    private List < Operation > getDisjunctiveOperation(final IProposition proposition, final String parent) {

        Operation operation = new Operation(DynamicGroupController.OPERATION_OR);
        List < Operation > operations = new ArrayList < Operation >();
        List < Operation > childOperations = new ArrayList < Operation >();

        List < IProposition > disjunctions = proposition.getDisjunctivePropositions();
        for (IProposition disjunction : disjunctions) {
            IProposition firstDisjunction = ((Disjunction) disjunction).getFirst();
            childOperations.addAll(this.getOperation(firstDisjunction, DynamicGroupController.DISJUNCTION));

            IProposition secondDisjunction = ((Disjunction) disjunction).getSecond();
            childOperations.addAll(this.getOperation(secondDisjunction, DynamicGroupController.DISJUNCTION));
        }

        if (!DynamicGroupController.DISJUNCTION.equals(parent)) {
            operation.setListOfOperation(childOperations);
            operations.add(operation);
        } else {
            operations.addAll(childOperations);
        }

        return operations;
    }

    /**
     * Getter for the list of operations associated with the negative
     * proposition.
     * 
     * @param proposition
     *            the proposition
     * @param parent
     *            the parent of the proposition
     * @return the list of operations associated with the proposition.
     */
    private List < Operation > getNegativeOperation(final IProposition proposition, final String parent) {

        Operation operation = new Operation(DynamicGroupController.OPERATION_NOT);
        List < Operation > operations = new ArrayList < Operation >();
        List < Operation > childOperations = new ArrayList < Operation >();

        List < AtomicProposition > negations = proposition.getAtomicPropositions();
        for (AtomicProposition negation : negations) {
            childOperations.addAll(this.getOperation(negation, DynamicGroupController.NEGATION));
        }

        if (!DynamicGroupController.NEGATION.equals(parent)) {
            operation.setListOfOperation(childOperations);
            operations.add(operation);
        } else {
            operations.addAll(childOperations);
        }

        return operations;
    }

    /**
     * Getter for the result of the LDAP request.
     * 
     * @return the result of the execution of the LDAP request
     */
    public String getLdapRequestResult() {

        final String thePage = this.getParam("page");
        final String theSortBy = this.getParam("sidx");
        final String theSortType = this.getParam("sord");

        this.ldapRequestResult.cleanListOfSortable();

        Parameter parameter = null;
        String searchBaseObject = null;

        // Required services
        ParameterGroup parametersDynamicGroup = this.parameterService
                .findParametersByGroup(DynamicGroupController.DYNAMIC_GROUP_SEARCH_BASE);

        // Iterate on the attributes read from database
        Iterator < Parameter > itParameter = parametersDynamicGroup.getParameters().iterator();
        while (itParameter.hasNext()) {
            parameter = itParameter.next();
            searchBaseObject = parameter.getValue();
        }

        // List the attributes
        List < String > attributes = new ArrayList < String >();
        attributes.add("uid");

        parametersDynamicGroup = this.parameterService.findParametersByGroup("org.esco.grouperui.ldap.person.col");

        // Iterate on the attributes read from database
        itParameter = parametersDynamicGroup.getParameters().iterator();
        while (itParameter.hasNext()) {
            parameter = itParameter.next();
            attributes.add(parameter.getKey());
        }

        // Decode and execute the request
        List < List < SimpleValue >> result = this.groupDynamicService.decodeAndExecuteRequest(this.ldapRequest,
                attributes, searchBaseObject);

        Iterator < List < SimpleValue >> itListLdapResult = result.iterator();
        Iterator < SimpleValue > itLdapResult;
        SimpleValue ldapResult;

        while (itListLdapResult.hasNext()) {
            itLdapResult = itListLdapResult.next().iterator();

            Person person = new Person();
            while (itLdapResult.hasNext()) {
                ldapResult = itLdapResult.next();
                if (ldapResult.getValue() != null) {
                    person.addMappingFieldCol("attribute." + ldapResult.getKey(), ldapResult.getValue());
                }
            }
            this.ldapRequestResult.addRowDataResult(person);
        }

        this.ldapRequestResult.setNbResultDisplay(Integer.toString(this.ldapRequestResult.getListOfSortable()
                .size()));

        this.ldapRequestResult.setCurrentPage(thePage);

        TableData tableData = TableDataDynamicFactory.populate(this.ldapRequestResult,
                this.sortableRowDataWrapper, theSortBy, theSortType);

        return this.xmlProducerWrapper.wrap(TableDataFactory.getProducer(tableData));
    }

    /**
     * Notify to the controller that the data has change.
     * 
     * @return the xml value of the state true.
     */
    public String notifyOneChange() {
        this.isModified = true;
        XmlProducer producer = new XmlProducer();
        producer.setTarget(new Status(true));
        producer.setTypesOfTarget(Status.class);

        return this.xmlProducerWrapper.wrap(producer);
    }

    /**
     * Setter of the xmlProducerWrapper property.
     * 
     * @param theXmlProducerWrapper
     *            the xmlProducerWrapper to set
     */
    @Override
    public void setXmlProducerWrapper(final IWrapper < XmlProducer, String > theXmlProducerWrapper) {
        this.xmlProducerWrapper = theXmlProducerWrapper;
    }

    /**
     * Setter for parameterService.
     * 
     * @param theParameterService
     *            the parameterService to set.
     */
    public final void setParameterService(final IParameterService theParameterService) {
        this.parameterService = theParameterService;
    }

    /**
     * setter for property groupDynamicService.
     * 
     * @param theGroupDynamicService
     *            the groupDynamicService to set
     */
    public void setGroupDynamicService(final IGroupDynamicService theGroupDynamicService) {
        this.groupDynamicService = theGroupDynamicService;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isModified() {
        return this.isModified;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void clear() {
        this.isModified = false;
        this.alreadyLaod = false;
        this.ldapRequest = null;
    }

    /**
     * {@inheritDoc}
     */
    public void applyModification(final String theIndex, final String theNewValue) {
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
        List < Resume > listResume = new ArrayList < Resume >();
        Resume resume = new Resume();
        String orignalRequest = this.getInitialLdapRequest();
        if (orignalRequest == null) {
            orignalRequest = "";
        }
        if (StringUtils.isNotEmpty(this.ldapRequest) && this.isModified) {
            List < List < String > > data = new ArrayList < List < String > >();
            List < String > cells = new ArrayList < String >();
            cells.add(this.ldapRequest);
            data.add(cells);
            resume.setData(data);
        }
        resume.setTitle("dynamic_group.label");
        resume.setControllerClass(DynamicGroupController.class.getName());
        resume.setJsp("/stylesheets/dynamicGroup/dynamiqueGroupResumeFragment.jsp");
        listResume.add(resume);
        return listResume;
    }

    /**
     * {@inheritDoc}
     */
    public Status save() {

        if (this.ldapRequest != null) {

            Person userConnected = null;
            try {
                userConnected = PersonController.getConnectedPerson();
            } catch (ESCOSubjectNotFoundException e) {
            } catch (ESCOSubjectNotUniqueException e) {
            }

            String[] attributeNames = null;
            String[] attributeValues = null;

            Group group = this.getGroupController().getGroup();
            GroupDetail groupDetail = group.getDetail();

            if (groupDetail.getAttributeNames() == null) {
                attributeNames = new String[0];
                attributeValues = new String[0];
            } else {
                attributeNames = groupDetail.getAttributeNames();
                attributeValues = groupDetail.getAttributeValues();
            }

            String attrToFind = PropertyManager.find(DynamicGroupController.ATTRIBUTE_DYNAMIC_GROUP).deType(
                    String.class);

            Boolean added = true;
            int indexAttr = 0;
            for (String attributeName : attributeNames) {
                if (attributeName.equals(attrToFind)) {
                    added = false;
                    break;
                }
                indexAttr++;
            }
            if (!added) {
                attributeValues[indexAttr] = this.ldapRequest;
            } else {
                String[] newAttributeNames = new String[attributeNames.length + 1];
                String[] newAttributeValues = new String[attributeValues.length + 1];

                System.arraycopy(attributeNames, 0, newAttributeNames, 0, attributeNames.length);
                System.arraycopy(attributeValues, 0, newAttributeValues, 0, attributeValues.length);

                newAttributeNames[attributeNames.length] = attrToFind;
                newAttributeValues[attributeNames.length] = this.ldapRequest;

                attributeNames = newAttributeNames;
                attributeValues = newAttributeValues;
            }

            groupDetail.setAttributeNames(attributeNames);
            groupDetail.setAttributeValues(attributeValues);

            group.setDetail(groupDetail);

            try {
                // Call the service that will modify the group
                this.getGroupController().getGrouperService().groupUpdate(userConnected, group);
                this.getGroupController().getGroup().setDetail(groupDetail);
            } catch (ESCOBusinessException ebe) {
                this.handleException(ebe, group.getIdGroup());
            }
        }

        return new Status(Boolean.TRUE);
    }

    /**
     * Get the ldapRequest perty.
     * 
     * @return the ldapRequest
     */
    public String getLdapRequest() {
        return this.ldapRequest;
    }

    /**
     * setter for property jsonWrapper.
     * 
     * @param theJsonWrapper
     *            the jsonWrapper to set
     */
    public void setJsonWrapper(final IWrapper < XmlProducer, String > theJsonWrapper) {
        this.jsonWrapper = theJsonWrapper;
    }

}
