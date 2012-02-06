/**
 *
 */
package org.esco.grouperui.web.plugins;

import javax.faces.context.FacesContext;

import org.esco.grouperui.exceptions.business.ESCOSubjectNotFoundException;
import org.esco.grouperui.exceptions.business.ESCOSubjectNotUniqueException;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.controllers.AbstractTableController;
import org.esco.grouperui.web.controllers.PersonController;
import org.esco.grouperui.web.utils.FaceContextUtils;

/**
 * @author dMoulron
 */
public abstract class AbstractGroupControllerAware extends AbstractTableController implements ITabController {

    /**
     * The serial uid.
     */
    private static final long        serialVersionUID = 7613510948484687036L;

    /**
     * Default logger.
     */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory
                                                              .getLogger(AbstractGroupControllerAware.class);

    /**
     * the group controller.
     */
    private ITabsControllerAware     tabsController;

    /**
     *
     */
    private final TabInfo            tabInfo          = new TabInfo();

    /**
     * Default constructor.
     */
    public AbstractGroupControllerAware() {
    }

    /**
     * getter for property groupController.
     * 
     * @return the groupController
     */
    public ITabsControllerAware getTabsController() {
        return this.tabsController;
    }

    /**
     * setter for property groupController.
     * 
     * @param theTabsController
     *            the groupController to set
     */
    public void setGroupController(final ITabsControllerAware theTabsController) {
        this.tabsController = theTabsController;
    }

    /**
     * setter for property name.
     * 
     * @param theName
     *            the name to set
     */
    public void setName(final String theName) {
        this.tabInfo.setName(theName);
    }

    /**
     * setter for property title.
     * 
     * @param theTitle
     *            the title to set
     */
    public void setTitle(final String theTitle) {
        this.tabInfo.setTitle(theTitle);
    }

    /**
     * setter for property url.
     * 
     * @param theUrl
     *            the url to set
     */
    public void setUrl(final String theUrl) {
        this.tabInfo.setUrl(theUrl);
    }

    /**
     * setter for property icone.
     * 
     * @param theIcone
     *            the icone to set
     */
    public void setIcone(final String theIcone) {
        this.tabInfo.setIcone(theIcone);
    }

    /**
     * setter for property regpresent. Support EL value. information can be used
     * in this EL : user, msgs and all information depend on parent controller.
     * 
     * @param theRegpresent
     *            the regpresent to set
     */
    public void setRegpresent(final String theRegpresent) {
        this.tabInfo.setRegpresent(theRegpresent);
    }

    /**
     * setter for property regresume. Support EL value. information can be used
     * in this EL : user, msgs and all information depend on parent controller.
     * 
     * @param theRegresume
     *            the regresume to set
     */
    public void setRegresume(final String theRegresume) {
        this.tabInfo.setRegresume(theRegresume);
    }

    /**
     * setter for property order.
     * 
     * @param theOrder
     *            the order to set
     */
    public void setOrder(final String theOrder) {
        this.tabInfo.setOrder(theOrder);
    }

    /**
     * setter for property id.
     * 
     * @param theId
     *            the id to set
     */
    public void setId(final String theId) {
        this.tabInfo.setIdTab(theId);
    }

    /**
     * setter for property desactivate.
     * 
     * @param theDesactivate
     *            the desactivate to set
     */
    public void setDesactivate(final String theDesactivate) {
        this.tabInfo.setDesactivate(theDesactivate);
    }

    /**
     * getter for property tabInfo..
     * 
     * @return the tabInfo
     */
    public TabInfo getTabInfo() {
        // add variable to context
        FacesContext theFacesContext = FacesContext.getCurrentInstance();
        FaceContextUtils.addVariableToContext(theFacesContext, "msgs", this.getI18nService().getStrings());
        try {
            FaceContextUtils.addVariableToContext(theFacesContext, "user", PersonController.getConnectedPerson());
        } catch (ESCOSubjectNotFoundException e) {
            AbstractGroupControllerAware.LOGGER.error(e, "Subject not found");
        } catch (ESCOSubjectNotUniqueException e) {
            AbstractGroupControllerAware.LOGGER.error(e, "Subject not unique");
        }
        this.tabsController.doAddVariableToContext(theFacesContext);

        String eLExpression = null;
        Object elResponse = null;
        // evaluate EL.
        // evaluate regpresent.
        eLExpression = this.tabInfo.getRegpresent();
        elResponse = FaceContextUtils.executeELExpression(theFacesContext, eLExpression);

        if (elResponse instanceof Boolean) {
            this.tabInfo.setTabpresent((Boolean) elResponse);
        } else {
            this.tabInfo.setTabpresent(Boolean.valueOf((String) elResponse));
        }

        // evaluate regresume.
        eLExpression = this.tabInfo.getRegresume();
        elResponse = FaceContextUtils.executeELExpression(theFacesContext, eLExpression);

        if (elResponse instanceof Boolean) {
            this.tabInfo.setResume((Boolean) elResponse);
        } else {
            this.tabInfo.setResume(Boolean.valueOf((String) elResponse));
        }

        return this.tabInfo;
    }

    /**
     * verify if this tab desactivate by an anther tab.
     * 
     * @param theDesactivate
     *            List of descactivated tab send by parent controller.
     * @param theTypeEntryPlugin
     *            the type of scan
     */
    public void desactivateIt(final String theDesactivate, final TypeEntryPlugin theTypeEntryPlugin) {

        if (this.tabInfo.getIdTab() != null && theDesactivate != null) {
            String[] listOfTabs = theDesactivate.split("\\|");

            for (String tab : listOfTabs) {
                String localIdTab = tab.substring(0, tab.indexOf("."));

                TypeEntryPlugin localEntry = TypeEntryPlugin.fromTab(tab);
                if (this.tabInfo.getIdTab().equals(localIdTab)) {
                    if (theTypeEntryPlugin.equals(localEntry)) {
                        this.desactivate(theTypeEntryPlugin);
                    }
                }
            }
        }
    }

    /**
     * setter to desactivate tab.
     * 
     * @param theTypeEntryPlugin
     *            the typ of desactivation.
     */
    private void desactivate(final TypeEntryPlugin theTypeEntryPlugin) {

        if (TypeEntryPlugin.RESUME.equals(theTypeEntryPlugin)) {
            this.tabInfo.setResume(false);
        } else
            if (TypeEntryPlugin.TAB.equals(theTypeEntryPlugin)) {
                this.tabInfo.setTabpresent(false);
            }

    }
}
