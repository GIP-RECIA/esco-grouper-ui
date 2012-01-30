package org.esco.grouperui.services.grouper.internal.wrapper;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.GroupDetail;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.services.ESCOConstantes;
import org.esco.grouperui.services.application.filters.CompositeTypeEnum;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouper.Attribute;
import edu.internet2.middleware.grouper.GroupType;

/**
 * <b>Subject wrapper.</b><br/>
 * <br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * [RECIA-ESCO-L1-007]<br/>
 * 
 * @author SopraGroup
 */
public class GroupAPIWrapper implements IWrapper < edu.internet2.middleware.grouper.Group, Group > {

    /** UID. */
    private static final long        serialVersionUID = 4790047087091384950L;

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(GroupAPIWrapper.class);

    /**
     * Default constructor.
     */
    public GroupAPIWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public Group wrap(final edu.internet2.middleware.grouper.Group theObjectSource) throws ESCOWrapperException {

        // GroupAPIWrapper.LOGGER
        // .debug("wrap(final edu.internet2.middleware.grouper.Group theObjectSource) throws Exception - debut");

        Group newGroup = new Group();

        newGroup.setDescription(theObjectSource.getDescription());

        GroupDetail groupDetail = new GroupDetail();

        Set < String > aux = new HashSet < String >();

        for (GroupType type : theObjectSource.getTypes()) {
            if (!ESCOConstantes.BASE_TYPE.equals(type.getName())) {
                aux.add(type.getName());
            }
        }

        groupDetail.setTypeNames(aux.toArray(new String[aux.size()]));

        groupDetail.setCreatorID(theObjectSource.getCreatorUuid());
        groupDetail.setCreatedTime(theObjectSource.getCreateTime());

        Map < String, Attribute > attributes = theObjectSource.getAttributesMap(false);

        int cpt = 0;
        String[] attributesNames = new String[attributes.size()];
        String[] attributesValues = new String[attributes.size()];

        for (String name : attributes.keySet()) {
            attributesNames[cpt] = name;
            attributesValues[cpt++] = attributes.get(name).getValue();
        }

        groupDetail.setAttributeNames(attributesNames);
        groupDetail.setAttributeValues(attributesValues);

        groupDetail.setIsCompositeFactor(theObjectSource.isComposite());
        groupDetail.setHasComposite(theObjectSource.hasComposite());

        if (theObjectSource.hasComposite()) {
            groupDetail.setCompositeType(CompositeTypeEnum.getFromValue(theObjectSource.getComposite(false)
                    .getType().getName()));
        }

        newGroup.setDescription(theObjectSource.getDescription());
        newGroup.setDetail(groupDetail);
        newGroup.setDisplayExtension(theObjectSource.getDisplayExtension());
        newGroup.setDisplayName(theObjectSource.getDisplayName());
        newGroup.setExtension(theObjectSource.getExtension());
        newGroup.setName(theObjectSource.getName());
        newGroup.setIdGroup(theObjectSource.getUuid());

        // GroupAPIWrapper.LOGGER
        // .debug("wrap(final edu.internet2.middleware.grouper.Group theObjectSource) throws Exception - fin");

        return newGroup;
    }
}
