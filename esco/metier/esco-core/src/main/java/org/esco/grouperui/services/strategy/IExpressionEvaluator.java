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
