package org.esco.grouperui.services.dynamicgroup.internal;

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
    public Boolean evaluate(final String expression, final Map < String, Object > parameters)
            throws Exception {

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

        Boolean result = (Boolean) exp1.evaluate(context);
        if (result == null) {
            result = Boolean.FALSE;
        }

        return result;

    }

    /**
     * {@inheritDoc}
     */
    public Boolean regexp(final String expression, final String match) {
        ExpressionEvaluator.LOGGER.debug("regexp(final String expression, final String match) - start/end");
        return Pattern.compile(expression.replace("\\\\", "\\")).matcher(match).matches();
    }
}
