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
package org.esco.grouperui.web.plugins;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

import org.esco.grouperui.web.controllers.AbstractContextAwareController;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * @author dMoulron
 */
public abstract class AbstractTabsControllerAware extends AbstractContextAwareController implements
        ITabsControllerAware, ApplicationContextAware {

    /**
     * The serial uid.
     */
    private static final long         serialVersionUID = 676330312169407184L;

    /** list of controller for summary. */
    protected List < ITabController > tabControllers;

    /** spring application context. */
    private ApplicationContext        applicationContext;

    /**
     * {@inheritDoc}
     */
    @Override
    public void afterPropertiesSetInternal() {
        super.afterPropertiesSetInternal();

        // find all bean according to this group bean.
        List < String > tabsControllers = TabsControllerAggregator.getChild(this.getTabsControllerId());

        for (String idController : tabsControllers) {

            ITabController tabController = (ITabController) this.applicationContext.getBean(idController);
            tabController.setParentController(this);

            if (this.tabControllers == null) {
                this.tabControllers = new ArrayList < ITabController >();
            }

            this.tabControllers.add(tabController);
        }
    }

    /**
     * @return the spring bean id of group controller.
     */
    public abstract String getTabsControllerId();

    /**
     * setter for property groupControllers.
     * 
     * @param theGroupControllers
     *            the groupControllers to set
     */
    public void setGroupControllers(final List < ITabController > theGroupControllers) {
        this.tabControllers = theGroupControllers;

        Iterator < ITabController > itGroupController = theGroupControllers.iterator();
        while (itGroupController.hasNext()) {
            ITabController iGroupController = itGroupController.next();

            iGroupController.setParentController(this);
        }
    }

    /**
     * @return list of all tabs for this group controller.
     */
    public List < TabInfo > getTabs() {
        List < TabInfo > tabInfos = new ArrayList < TabInfo >();

        for (ITabController controller : this.tabControllers) {
            TabInfo tabInfo = controller.calculateTabInfo();

            tabInfos.add(tabInfo);
        }

        this.desactivate(TypeEntryPlugin.RESUME);
        this.desactivate(TypeEntryPlugin.TAB);
        Collections.sort(tabInfos, new Comparator < TabInfo >() {

            public int compare(final TabInfo theO1, final TabInfo theO2) {
                int posO1 = -100;
                int posO2 = -100;

                try {
                    posO1 = Integer.parseInt(theO1.getOrder());
                } catch (NumberFormatException e) {
                }

                try {
                    posO2 = Integer.parseInt(theO2.getOrder());
                } catch (NumberFormatException e) {
                }

                return posO1 - posO2;
            }
        });

        return tabInfos;
    }

    /**
     * scan all sub controller for desactivate tab needed.
     * 
     * @param theTypeEntryPlugin
     *            the type of descativation.
     */
    private void desactivate(final TypeEntryPlugin theTypeEntryPlugin) {

        for (ITabController controller : this.tabControllers) {

            for (ITabController controller2 : this.tabControllers) {
                AbstractControllerAware groupController2 = (AbstractControllerAware) controller2;

                if (TypeEntryPlugin.RESUME.equals(theTypeEntryPlugin)
                        && controller.getTabInfo().getIsResume()) {
                    groupController2.desactivateIt(controller.getTabInfo().getDesactivate(),
                            theTypeEntryPlugin);
                } else
                    if (TypeEntryPlugin.TAB.equals(theTypeEntryPlugin)
                            && controller.getTabInfo().getisPresent()) {
                        groupController2.desactivateIt(controller.getTabInfo().getDesactivate(),
                                theTypeEntryPlugin);
                    }
            }
        }
    }

    /**
     * setter for property applicationContext.
     * 
     * @param theApplicationContext
     *            the applicationContext to set
     */
    public void setApplicationContext(final ApplicationContext theApplicationContext) {
        this.applicationContext = theApplicationContext;
    }

}
