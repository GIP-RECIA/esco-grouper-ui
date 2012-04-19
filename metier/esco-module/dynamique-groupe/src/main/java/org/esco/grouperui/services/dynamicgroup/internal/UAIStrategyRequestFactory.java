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
package org.esco.grouperui.services.dynamicgroup.internal;

import java.util.Iterator;
import java.util.Set;

import org.esco.grouperui.domaine.beans.Group;
import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.domaine.beans.Stem;
import org.esco.grouperui.services.dynamicgroup.IStrategyRequestFactory;

/**
 * @author dMoulron
 */
public class UAIStrategyRequestFactory implements IStrategyRequestFactory {

    /** ESCOUAI. */
    private static final String ESCOUAI = "ESCOUAIRattachement";

    /**
     * Default constructor.
     */
    public UAIStrategyRequestFactory() {
    }

    /**
     * {@inheritDoc}
     */
    public String createRequest(final Person thePerson, final Group theGroup, final Stem theStem) {
        String defaultRequest = "";

        String firstEtabOfthePerson = "";
        Set < String > etablissements = thePerson.getAttributes().get(UAIStrategyRequestFactory.ESCOUAI);
        if (etablissements != null) {
            Iterator < String > etablissementIterator = etablissements.iterator();
            if (etablissementIterator.hasNext()) {
                firstEtabOfthePerson = etablissementIterator.next();
                defaultRequest = "AND(ESCOUAIRattachement=" + firstEtabOfthePerson + ",sn=*)";
            }
        }
        return defaultRequest;
    }

}
