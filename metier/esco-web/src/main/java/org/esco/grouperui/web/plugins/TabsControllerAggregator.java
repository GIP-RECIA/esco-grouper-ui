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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.Validate;
import org.springframework.beans.factory.InitializingBean;

/**
 * Class for associate id of bean spring group controller and all child. <br />
 * 
 * <pre>
 *         &lt;bean class=&quot;org.esco.grouperui.web.plugins.TabsControllerAggregator&quot;&gt;
 *                 &lt;property name=&quot;parent&quot; value=&quot;groupController&quot; /&gt;
 *                 &lt;property name=&quot;children&quot;&gt;
 *                         &lt;list&gt;
 *                                 &lt;value&gt;groupPropertiesController&lt;/value&gt;
 *                                 &lt;value&gt;groupMembersController&lt;/value&gt;
 *                                 &lt;value&gt;groupMembershipsController&lt;/value&gt;
 *                                 &lt;value&gt;groupPrivilegesController&lt;/value&gt;
 *                                 &lt;value&gt;groupPrivilegesGroupController&lt;/value&gt;
 *                                 &lt;value&gt;groupPrivilegesStemController&lt;/value&gt;
 *                         &lt;/list&gt;
 *                 &lt;/property&gt;
 *         &lt;/bean&gt;
 * </pre>
 * 
 * for one grouper controller you can define multiple TabsControllerAggregator
 * with multiple child.
 * 
 * @author dMoulron
 */
public class TabsControllerAggregator implements InitializingBean {

    /**
     * Map for associate controller to groupController.
     */
    private static Map < String, List < String > > tabsController;

    /**
     * id of bean spring groupCOntroller.
     */
    private String                                 parent;

    /**
     * ids of all bean spring children.
     */
    private List < String >                        children;

    /**
     * Default constructor.
     */
    public TabsControllerAggregator() {
    }

    /**
     * setter for property parent.
     * 
     * @param theParent
     *            the parent to set
     */
    public void setParent(final String theParent) {
        this.parent = theParent;
    }

    /**
     * setter for property children.
     * 
     * @param theChildren
     *            the children to set
     */
    public void setChildren(final List < String > theChildren) {
        this.children = theChildren;
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {
        if (this.parent == null) {
            throw new IllegalArgumentException("the property parent can not be null.");
        }
        if (this.children == null) {
            throw new IllegalArgumentException("the property children can not be null.");
        }
        if (this.children.isEmpty()) {
            throw new IllegalArgumentException("the property children can not be empty.");
        }

        if (TabsControllerAggregator.tabsController == null) {
            TabsControllerAggregator.tabsController = new HashMap < String, List < String > >();
        }

        if (TabsControllerAggregator.tabsController.containsKey(this.parent)) {
            List < String > childForSpecifiqueParent = TabsControllerAggregator.tabsController.get(this.parent);

            // add all new children for one existing parent.
            childForSpecifiqueParent.addAll(this.children);
            TabsControllerAggregator.tabsController.put(this.parent, childForSpecifiqueParent);
        } else {
            TabsControllerAggregator.tabsController.put(this.parent, this.children);
        }

    }

    /**
     * @param theTabsControllerId
     *            id of bean spring groupCOntroller
     * @return all list of child for bean spring identify by theTabsControllerId
     */
    public static List < String > getChild(final String theTabsControllerId) {
        if (!TabsControllerAggregator.tabsController.containsKey(theTabsControllerId)) {
            Validate.isTrue(false, theTabsControllerId + " can't be find in map of controller.");
        }

        return TabsControllerAggregator.tabsController.get(theTabsControllerId);
    }
}
