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
package org.esco.grouperui.services.grouper.internal.wrapper;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.exceptions.technicals.ESCOWrapperException;
import org.esco.grouperui.tools.IWrapper;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

import edu.internet2.middleware.grouperClient.ws.beans.WsStem;

/**
 * <b>Wrapper for stem. Convert a WsStem into Stem.</b><br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-003]<br/>
 * [RECIA-ESCO-L1-004]<br/>
 * [RECIA-ESCO-L1-005]<br/>
 * [RECIA-ESCO-L1-007]<br/>
 * 
 * @author sopraGroup
 */
public class StemWrapper implements IWrapper < WsStem, Stem > {

    /** UID. */
    private static final long        serialVersionUID = -5348824117010595542L;

    /** Logger for this class. */
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(StemWrapper.class);

    /**
     * Default constructor.
     */
    public StemWrapper() {
    }

    /**
     * {@inheritDoc}
     */
    public Stem wrap(final WsStem theObjectSource) throws ESCOWrapperException {

        Validate.notNull(theObjectSource, "the source object is undefined");

        StemWrapper.LOGGER.debug("wrap(final WsGroup theObjectSource) - start");

        Stem stem = new Stem();

        stem.setDescription(theObjectSource.getDescription());
        stem.setDisplayExtension(theObjectSource.getDisplayExtension());
        stem.setDisplayName(theObjectSource.getDisplayName());
        stem.setExtension(theObjectSource.getExtension());
        stem.setName(theObjectSource.getName());
        stem.setUuid(theObjectSource.getUuid());

        StemWrapper.LOGGER.debug("wrap(final WsGroup theObjectSource) - end");

        return stem;
    }
}
