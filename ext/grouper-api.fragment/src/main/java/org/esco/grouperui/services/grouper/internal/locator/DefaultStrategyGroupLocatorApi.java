package org.esco.grouperui.services.grouper.internal.locator;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.services.application.filters.SearchGroupEnum;
import org.esco.grouperui.services.application.filters.SearchTypeEnum;
import org.esco.grouperui.services.grouper.strategy.search.IStrategyGroupSearch;
import org.esco.grouperui.services.grouper.strategy.search.locator.IStrategyGroupSearchLocator;
import org.esco.grouperui.services.strategy.IExpressionEvaluator;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * <b>Default locator strategy.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001]
 * 
 * @author SopraGroup
 */
public class DefaultStrategyGroupLocatorApi implements IStrategyGroupSearchLocator {

    /** Logger for this class. */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(DefaultStrategyGroupLocatorApi.class);

    /** Strategies. **/
    private Map                      defaultSearchStrategies;

    /** Evaluator. **/
    private IExpressionEvaluator     evaluator;

    /**
     * Default constructor.
     */
    public DefaultStrategyGroupLocatorApi() {

    }

    /**
     * Getter for attribute <b>evaluator</b>.
     * 
     * @return the evaluator
     */
    public IExpressionEvaluator getEvaluator() {
        return this.evaluator;
    }

    /**
     * Setter for attribute <b>evaluator</b>.
     * 
     * @param theEvaluator
     *            the evaluator to set
     */
    public void setEvaluator(final IExpressionEvaluator theEvaluator) {
        this.evaluator = theEvaluator;
    }

    /**
     * Getter for attribute <b>defaultSearchStrategies</b>.
     * 
     * @return the defaultSearchStrategies
     */
    public Map getDefaultSearchStrategies() {
        return this.defaultSearchStrategies;
    }

    /**
     * Setter for attribute <b>defaultSearchStrategies</b>.
     * 
     * @param theDefaultSearchStrategies
     *            the defaultSearchStrategies to set
     */
    public void setDefaultSearchStrategies(final Map theDefaultSearchStrategies) {
        this.defaultSearchStrategies = theDefaultSearchStrategies;
    }

    /**
     * {@inheritDoc}
     */
    public IStrategyGroupSearch locate(final SearchGroupEnum field, final SearchTypeEnum type, final String path,
            final String term, final String subject) {

        DefaultStrategyGroupLocatorApi.LOGGER.debug("locate(final SearchFieldEnum field, final SearchTypeEnum type, "
                + "final String path, final String term, final String subject) - start");

        Validate.notNull(field, "The field is undefined");
        Validate.notNull(type, "The type is undefined");
        Validate.notNull(path, "The path is undefined");
        Validate.notNull(term, "The term is undefined");
        Validate.notNull(subject, "The subject is undefined");

        Map < String, Object > parameters = new HashMap < String, Object >();

        parameters.put("evaluator", this.getEvaluator());

        parameters.put("field", field);
        parameters.put("type", type);
        parameters.put("path", path);
        parameters.put("term", term);
        parameters.put("subject", subject);

        IStrategyGroupSearch strategy = null;

        try {
            for (Object expression : this.getDefaultSearchStrategies().keySet()) {
                if (this.evaluator.evaluate(expression.toString(), parameters)) {
                    strategy = (IStrategyGroupSearch) this.defaultSearchStrategies.get(expression);
                    break;
                }
            }
        } catch (final Exception e) {
            throw new ESCOTechnicalException("Error while trying to retrieve the strategy.", e);
        }

        DefaultStrategyGroupLocatorApi.LOGGER.debug("locate(final SearchFieldEnum field, final SearchTypeEnum type, "
                + "final String path, final String term, final String subject) - end");

        return strategy;
    }
}
