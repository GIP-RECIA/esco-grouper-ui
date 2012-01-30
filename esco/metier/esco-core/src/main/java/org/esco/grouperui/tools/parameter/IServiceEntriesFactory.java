package org.esco.grouperui.tools.parameter;

import java.util.Map;

import org.esco.grouperui.tools.parameter.internal.module.ParameterModuleDescription;

/**
 * interface for define parameter entry in modular environnement.
 * 
 * @author dMoulron
 */
public interface IServiceEntriesFactory {

    /**
     * setter for property modules.
     * 
     * @param theModules
     *            the modules to set
     */
    void setModules(final Map < String, ParameterModuleDescription > theModules);

}
