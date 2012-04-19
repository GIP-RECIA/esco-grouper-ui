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
package org.esco.grouperui.services.internal;

import java.util.HashMap;
import java.util.Map;

import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.springframework.beans.factory.InitializingBean;

/**
 * @author dMoulron
 */
public class GrouperServiceLocatorEntriesFactory implements InitializingBean {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger        LOGGER    = ESCOLoggerFactory
                                                              .getLogger(GrouperServiceLocatorEntriesFactory.class);

    /**
     * Grouper service locator. <br/>
     * this property can not be null.
     */
    private IServiceLocatorEntriesAware     grouperServiceLocator;

    /**
     * map to store reference in grouper service.<br/>
     * this property can not be null.
     */
    private Map < String, IGrouperService > methodRef = new HashMap < String, IGrouperService >();

    /**
     * Default constructor.
     */
    public GrouperServiceLocatorEntriesFactory() {
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {
        if (this.grouperServiceLocator == null) {
            throw new IllegalArgumentException("the property grouperServiceLocator can not be null.");
        }

        if (this.methodRef == null) {
            throw new IllegalArgumentException("the property methodRef can not be null.");
        }

        GrouperServiceLocatorEntriesFactory.LOGGER.info("Add " + this.methodRef.size()
                + " new methode(s) to service.");
        this.grouperServiceLocator.setMethodRef(this.methodRef);
    }

    /**
     * setter for property grouperServiceLocator.
     * 
     * @param theGrouperServiceLocator
     *            the grouperServiceLocator to set
     */
    public void setGrouperServiceLocator(final IServiceLocatorEntriesAware theGrouperServiceLocator) {
        this.grouperServiceLocator = theGrouperServiceLocator;
    }

    /**
     * setter for property methodRef.
     * 
     * @param theMethodRef
     *            the methodRef to set
     */
    public void setMethodRef(final Map < String, IGrouperService > theMethodRef) {
        this.methodRef = theMethodRef;
    }

}
