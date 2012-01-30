package org.esco.grouperui.tools.parameter;

import java.io.Serializable;
import java.util.List;

/**
 * Define all service to store, update and reader application parameter. <br/>
 * Requirement(s): [RECIA-ESCO-L1-012]
 * 
 * @author dMoulron
 */
public interface IParameterService extends Serializable {

    /**
     * @param theGroup
     *            the associated services that can execute the request in the
     *            configuration
     * @param theKey
     *            the key corresponding to the pkay in database
     * @return The list of all parameter in database corresponding to the group
     *         name and the key
     */
    List < Parameter > findParametersById(final String theGroup, final String theKey);

    /**
     * @return The list of all group in database
     */
    List < ParameterGroup > getRegisteredGroup();

    /**
     * @param theGroup
     *            the associated services that can execute the request in the
     *            configuration
     * @return one group parameter corresponding to the group name
     */
    ParameterGroup findParametersByGroup(final String theGroup);

    /**
     * @param theGroupSuffix
     *            the associated services that can execute the request in the
     *            configuration
     * @return the list of group parameter corresponding to the suffix of the
     *         group
     */
    List < ParameterGroup > findParametersByGroupSuffix(final String theGroupSuffix);
}
