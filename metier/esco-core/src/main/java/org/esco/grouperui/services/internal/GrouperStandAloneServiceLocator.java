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
package org.esco.grouperui.services.internal;

import java.util.HashMap;
import java.util.Map;

import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.services.application.IGrouperService;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * @author dMoulron
 */
public class GrouperStandAloneServiceLocator implements IGrouperServiceLocator, IServiceLocatorEntriesAware {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger        LOGGER    = ESCOLoggerFactory
                                                              .getLogger(GrouperStandAloneServiceLocator.class);

    /**
     * map to store reference in grouper service.
     */
    private Map < String, IGrouperService > methodRef = new HashMap < String, IGrouperService >();

    /**
     * Default constructor.
     */
    public GrouperStandAloneServiceLocator() {
    }

    /**
     * {@inheritDoc}
     */
    public void setMethodRef(final Map < String, IGrouperService > theMethodRef) {
        if (this.methodRef == null) {
            this.methodRef = theMethodRef;
        } else {
            this.methodRef.putAll(theMethodRef);
        }
    }

    /**
     * {@inheritDoc}
     */
    public IGrouperService findServiceForMethod(final String theMethod) {
        GrouperStandAloneServiceLocator.LOGGER.debug("Find service for method : " + theMethod);

        IGrouperService serviceExt = this.methodRef.get(theMethod);

        if (serviceExt == null) {
            throw new ESCOTechnicalException("can't find service for method : " + theMethod);
        }

        return serviceExt;
    }

}
