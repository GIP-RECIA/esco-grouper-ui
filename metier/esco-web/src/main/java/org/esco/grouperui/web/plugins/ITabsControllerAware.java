package org.esco.grouperui.web.plugins;

import javax.faces.context.FacesContext;

/**
 * @author dMoulron
 */
public interface ITabsControllerAware {

    /**
     * method can be override by parent class to add variable in face context
     * that can be used in evaluation of tabs.
     * 
     * @param theFacesContext
     *            The face context.
     */
    void doAddVariableToContext(final FacesContext theFacesContext);
}
