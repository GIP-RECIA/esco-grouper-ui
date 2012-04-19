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
/**
 *
 */
package org.esco.grouperui.web.controllers.tree;

import java.util.Map;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.web.beans.tree.ContextMenuItem;
import org.springframework.beans.factory.InitializingBean;

/**
 * @author dMoulron
 */
public class ContextMenuEntriesFactory implements InitializingBean {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger        LOGGER = ESCOLoggerFactory.getLogger(ContextMenuEntriesFactory.class);

    /**
     * service for construct menu tree.<br/>
     * this property can not be null.
     */
    private IMenuTreeServiceInitialize      menuTreeService;

    /**
     * map for new entry in tree context menu.<br/>
     * this property can not be null
     */
    private Map < String, ContextMenuItem > menuEntries;

    /**
     * Default constuctor.
     */
    public ContextMenuEntriesFactory() {
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {

        if (this.menuEntries == null) {
            throw new IllegalArgumentException("the property menuEntries can not be null.");
        }
        if (this.menuTreeService == null) {
            throw new IllegalArgumentException("the property menuTreeService can not be null.");
        }

        ContextMenuEntriesFactory.LOGGER.info("Add " + this.menuEntries.size()
                + " new entry in tree context menu;");
        this.menuTreeService.setMenuEntry(this.menuEntries);
    }

    /**
     * setter for property menuTreeService.
     * 
     * @param theMenuTreeService
     *            the menuTreeService to set
     */
    public void setMenuTreeService(final IMenuTreeServiceInitialize theMenuTreeService) {
        this.menuTreeService = theMenuTreeService;
    }

    /**
     * setter for property menuEntries.
     * 
     * @param theMenuEntries
     *            the menuEntries to set
     */
    public void setMenuEntries(final Map < String, ContextMenuItem > theMenuEntries) {
        this.menuEntries = theMenuEntries;
    }

}
