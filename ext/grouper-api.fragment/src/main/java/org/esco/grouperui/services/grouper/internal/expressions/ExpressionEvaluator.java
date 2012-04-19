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
package org.esco.grouperui.services.grouper.internal.expressions;

import java.util.Map;
import java.util.regex.Pattern;

import org.apache.commons.jexl.Expression;
import org.apache.commons.jexl.ExpressionFactory;
import org.apache.commons.jexl.JexlContext;
import org.apache.commons.jexl.JexlHelper;
import org.esco.grouperui.services.strategy.IExpressionEvaluator;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * <b>Expression evaluator.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001]
 * 
 * @author SopraGroup
 */
public final class ExpressionEvaluator implements IExpressionEvaluator {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(ExpressionEvaluator.class);

    /**
     * Default constructor.
     */
    public ExpressionEvaluator() {

    }

    /**
     * {@inheritDoc}
     */
    public Boolean evaluate(final String expression, final Map < String, Object > parameters) throws Exception {

        ExpressionEvaluator.LOGGER.debug("evaluate(final String expression, "
                + "final Map < String, Object > parameters) throws Exception - debut");

        Expression exp1 = ExpressionFactory.createExpression(expression.toString());

        JexlContext context = JexlHelper.createContext();

        if (parameters != null && !parameters.isEmpty()) {
            for (String key : parameters.keySet()) {
                context.getVars().put(key, parameters.get(key));
            }
        }

        ExpressionEvaluator.LOGGER.debug("evaluate(final String expression, "
                + "final Map < String, Object > parameters) throws Exception - fin");

        return (Boolean) exp1.evaluate(context);

    }

    /**
     * {@inheritDoc}
     */
    public Boolean regexp(final String expression, final String match) {
        ExpressionEvaluator.LOGGER.debug("regexp(final String expression, final String match) - start/end");
        return Pattern.compile(expression.replace("\\\\", "\\")).matcher(match).matches();
    }
}
