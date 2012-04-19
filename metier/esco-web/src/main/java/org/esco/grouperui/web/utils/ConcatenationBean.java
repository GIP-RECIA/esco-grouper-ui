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
package org.esco.grouperui.web.utils;

import java.util.HashMap;
import java.util.StringTokenizer;

import javax.faces.FactoryFinder;
import javax.faces.application.ApplicationFactory;
import javax.faces.context.FacesContext;

import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * @author sopragroup
 */
public class ConcatenationBean extends HashMap < String, String > {

    /**
     * the default serial uid.
     */
    private static final long        serialVersionUID = 5341227797491643275L;

    // log4j static Logger for this class
    private static final IESCOLogger LOGGER           = ESCOLoggerFactory.getLogger(ConcatenationBean.class);

    /**
     *
     */
    public ConcatenationBean() {
        super();
    }

    /**
     * Concat the string separated by a comma Evaluate JSF EL expression if
     * token begin by # or $
     * 
     * @param inObject
     *            : is the list of string to concat separated by a comma. return
     *            a String exemple : <h:outputText
     *            value="#{lang[concat['mpr.canton.,#offer.canton']]}"/>
     */
    @Override
    public String get(final Object inObject) {
        StringBuffer resultBuffer = new StringBuffer();
        try {
            String inToken = (String) inObject;

            StringTokenizer tok = new StringTokenizer(inToken, ",", false);
            while (tok.hasMoreTokens()) {
                String token = tok.nextToken().trim();
                ConcatenationBean.LOGGER.debug("inToken=" + token);

                if (token.startsWith("#{")) {

                    Object tokenEvaluated = this.getElValue(token);
                    // if (tokenEvaluated instanceof String)
                    // {
                    resultBuffer.append(String.valueOf(tokenEvaluated));
                    // }
                    // else
                    // {
                    // logger.error("#{...} EL expression is not a String : " +
                    // token);
                    // }
                } else
                    if (token.startsWith("${")) {
                        token = token.substring(2, token.length() - 1);
                        ConcatenationBean.LOGGER.debug("token $ =" + token);
                        Object tokenEvaluated = this.getElValue(this.getJsfEl(token));
                        // if (tokenEvaluated instanceof String)
                        // {
                        resultBuffer.append(String.valueOf(tokenEvaluated));
                        // }
                        // else
                        // {
                        // logger.error("${...} EL expression is not a String : "
                        // + token);
                        // }
                    } else
                        if (token.startsWith("#")) {
                            token = token.substring(1);
                            Object tokenEvaluated = this.getElValue(this.getJsfEl(token));

                            // if (tokenEvaluated instanceof String)
                            // {
                            resultBuffer.append(String.valueOf(tokenEvaluated));
                            // }
                            // else
                            // {
                            // logger.error("#... expression is not a String : "
                            // + token);
                            // }
                        } else {
                            resultBuffer.append(token);
                        }
            }
        } catch (Throwable e) {
            ConcatenationBean.LOGGER.error(e, null);
        }

        return resultBuffer.toString();
    }

    private Object getElValue(final String theEl) {
        ApplicationFactory appFactory = (ApplicationFactory) FactoryFinder
                .getFactory(FactoryFinder.APPLICATION_FACTORY);

        return appFactory.getApplication().createValueBinding(theEl).getValue(FacesContext.getCurrentInstance());
    }

    private String getJsfEl(final String value) {
        return "#{" + value + "}";

    }
}
