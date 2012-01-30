package org.esco.grouperui.services.grouper.internal.locator;

import java.util.HashMap;
import java.util.Map;

import org.esco.grouperui.domaine.beans.Person;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.services.grouper.internal.enums.SearchParametersEnum;
import org.esco.grouperui.services.grouper.strategy.search.IStrategySubjectSearch;
import org.esco.grouperui.services.grouper.strategy.search.locator.IStrategySubjectSearchLocator;
import org.esco.grouperui.services.strategy.IExpressionEvaluator;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;

/**
 * <b>Default locator strategy.</b><br/>
 * Requirements: [RECIA-ESCO-L1-001]
 * 
 * @author SopraGroup
 */
public class DefaultStrategySubjectLocator implements IStrategySubjectSearchLocator {

    /** Logger for this class. */
    private static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(DefaultStrategySubjectLocator.class);

    /** Strategies. **/
    private Map                      defaultSearchStrategies;

    /** Evaluator. **/
    private IExpressionEvaluator     evaluator;

    /**
     * Default constructor.
     */
    public DefaultStrategySubjectLocator() {

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
    public IStrategySubjectSearch locate(final Person person, final String path, final String term) {

        DefaultStrategySubjectLocator.LOGGER.debug("locate(Person person, String path, String term) - start");

        final Map < String, Object > parameters = new HashMap < String, Object >();

        parameters.put("evaluator", this.getEvaluator());

        parameters.put(SearchParametersEnum.PERSON.getValue(), person.getId());
        parameters.put(SearchParametersEnum.PATH.getValue(), path);
        parameters.put(SearchParametersEnum.TERM.getValue(), term);

        IStrategySubjectSearch strategy = null;
        try {
            for (Object expression : this.getDefaultSearchStrategies().keySet()) {
                if (this.evaluator.evaluate(expression.toString(), parameters)) {
                    strategy = (IStrategySubjectSearch) this.defaultSearchStrategies.get(expression);
                    DefaultStrategySubjectLocator.LOGGER.debug("Strategy found:" + strategy.toString());
                    break;
                }
            }
        } catch (final Exception e) {
            throw new ESCOTechnicalException("No strategy found", e);
        }

        DefaultStrategySubjectLocator.LOGGER.debug("locate(Person person, String path, String term) - end");
        return strategy;
    }

}
