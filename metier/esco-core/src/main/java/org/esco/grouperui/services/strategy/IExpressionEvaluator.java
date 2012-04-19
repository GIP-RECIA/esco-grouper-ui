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
package org.esco.grouperui.services.strategy;

import java.util.Map;

/**
 * <b>Interface for expression evaluator.</b><br/>
 * Requirements: <br/>
 * [RECIA-ESCO-L1-001]<br/>
 * 
 * @author SopraGroup
 */
public interface IExpressionEvaluator {

    /**
     * Evaluate the expression.
     * 
     * @param expression
     *            : the expression to evaluate.
     * @param parameters
     *            : parametres required for the evaluation.
     * @return true if the evalaution is correct, false else.
     * @throws Exception
     *             if error occurs
     */
    Boolean evaluate(String expression, Map < String, Object > parameters) throws Exception;

    /**
     * Evaluate regular expression.
     * 
     * @param expression
     *            : the regular expression.
     * @param test
     *            : the string to test.
     * @return true if the string to test match the pattern of the expression.
     */
    Boolean regexp(final String expression, final String test);
}
