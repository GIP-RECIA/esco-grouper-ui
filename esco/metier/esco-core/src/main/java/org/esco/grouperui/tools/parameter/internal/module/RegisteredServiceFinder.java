package org.esco.grouperui.tools.parameter.internal.module;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.Validate;
import org.esco.grouperui.exceptions.ESCOTechnicalException;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.parameter.IParameterFinder;
import org.esco.grouperui.tools.parameter.ParameterGroup;

import com.google.common.base.Predicate;
import com.google.common.collect.Maps;

/**
 * Manager for registered service. store, remove and find service. Find service
 * work with regular expression and descendent path axis. If JMX installed in
 * system, this class can be used to administer the register.
 * 
 * @author dMoulron
 */
public class RegisteredServiceFinder {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger               LOGGER     = ESCOLoggerFactory
                                                                      .getLogger(RegisteredServiceFinder.class);

    /**
     *
     */
    private static final String                    WILDCARD   = "*";

    /**
     * registered Services.
     */
    private final Map < String, IParameterFinder > rSInternal = new HashMap < String, IParameterFinder >();

    /**
     * Default constructor.
     */
    public RegisteredServiceFinder() {
    }

    /*******************************************************************************************************************
     * static method for proxy service
     ******************************************************************************************************************/

    /**
     * find service in registered map with regular expression. <br/>
     * if not find service for
     * <code>org.esco.grouperui.dossier.property.attribut</code> but there is
     * service for <code>org.esco.grouperui.dossier.property</code>, this method
     * return the {@link RegisteredService} for this group because is the direct
     * ascendent.
     * 
     * @param theGroup
     *            the associated services that can execute the request in the
     *            configuration
     * @return service corresponding to the group
     */
    public IParameterFinder getRegisteredServiceByRegexp(final String theGroup) {

        RegisteredServiceFinder.LOGGER.debug("search service by regexp.");

        IParameterFinder service = null;

        if (theGroup == null || RegisteredServiceFinder.WILDCARD.equals(theGroup)) {
            service = this.getDefaultService();
        } else {

            service = this.rSInternal.get(theGroup);
            if (service == null) {
                service = this.filteredService(theGroup);

            }
        }

        return service;
    }

    /**
     * @return all registered group in map
     */
    public final List < ParameterGroup > getRegisteredGroup() {

        RegisteredServiceFinder.LOGGER.debug("get all group of parameter.");

        List < ParameterGroup > resultat = new ArrayList < ParameterGroup >();
        String groupName = null;
        ParameterGroup group = null;

        Iterator < String > groups = this.rSInternal.keySet().iterator();
        while (groups.hasNext()) {
            groupName = groups.next();
            group = new ParameterGroup();
            group.setName(groupName);

            resultat.add(group);
        }
        return resultat;
    }

    /*******************************************************************************************************************
     * class method used by instance created by refresh
     ******************************************************************************************************************/

    /**
     * @param theGroup
     *            the associated services that can execute the request in the
     *            configuration
     * @param theParameterService
     *            the service which can execute request
     */
    public void addService(final String theGroup, final IParameterFinder theParameterService) {

        RegisteredServiceFinder.LOGGER.debug("registered service for : " + theGroup);

        Validate.notEmpty(theGroup);
        Validate.notNull(theParameterService);

        this.rSInternal.put(theGroup, theParameterService);
    }

    /**
     * @param theGroup
     *            the associated services that can execute the request in the
     *            configuration
     */
    public void removeService(final String theGroup) {

        Validate.notEmpty(theGroup);

        this.rSInternal.remove(theGroup);
    }

    /**
     * @return the default service if you find any register service
     *         corresponding to the group.
     */
    private IParameterFinder getDefaultService() {
        IParameterFinder service = null;
        // search service with wildcard regexp
        service = this.rSInternal.get(RegisteredServiceFinder.WILDCARD);
        if (service == null) {
            throw new ESCOTechnicalException(
                    "no service overall was found. A global service is a service whith * of group");
        }

        return service;
    }

    /**
     * @param theGroup
     *            the associated services that can execute the request in the
     *            configuration
     * @return the service corresponding to the group
     */
    private IParameterFinder filteredService(final String theGroup) {

        RegisteredServicePredicate predicate = new RegisteredServicePredicate(theGroup);
        Map < String, IParameterFinder > serviceMatch = this.filteredEntries(theGroup, predicate);

        if (serviceMatch.isEmpty()) {
            return this.getDefaultService();
        } else
            if (serviceMatch.size() > 1) {
                throw new ESCOTechnicalException("you must have a single service provided to the pattern");
            }

        return serviceMatch.values().iterator().next();
    }

    /**
     * @param theGroup
     *            the associated services that can execute the request in the
     *            configuration
     * @param thePredicate
     *            a predicate to find entries
     * @return all services corresponding to the group
     */
    private Map < String, IParameterFinder > filteredEntries(final String theGroup,
            final RegisteredServicePredicate thePredicate) {
        Map < String, IParameterFinder > serviceMatch = Maps.newHashMap();

        for (Map.Entry < String, IParameterFinder > service : this.rSInternal.entrySet()) {
            if (thePredicate.apply(service)) {
                serviceMatch.put(service.getKey(), service.getValue());
            }
        }

        if (serviceMatch.size() > 1) {
            serviceMatch = this.filteredEntries(theGroup, thePredicate);
        }

        return serviceMatch;
    }

    /**
     * Predicate for find service how can execute request.
     * 
     * @author dMoulron
     */
    private class RegisteredServicePredicate implements Predicate < Map.Entry < String, IParameterFinder > > {

        /**
         * the group where search service.
         */
        private final String group;

        /**
         * group match pattern.
         */
        private String       findedGroup;

        /**
         * deep declaration of service.
         */
        private int          deepName;

        /**
         * Default constructor.
         * 
         * @param theGroup
         *            the associated services that can execute the request in
         *            the configuration
         */
        public RegisteredServicePredicate(final String theGroup) {
            this.group = theGroup;
        }

        /**
         * {@inheritDoc}
         */
        public boolean apply(final Entry < String, IParameterFinder > theEntryService) {

            boolean matchAndCorespondingService = false;

            // the service name registered
            String serviceKey = theEntryService.getKey();
            if (serviceKey.contains(RegisteredServiceFinder.WILDCARD)) {
                matchAndCorespondingService = false;
            } else {

                // construct regexp to compare in search group
                serviceKey = "^(" + serviceKey.replaceAll("\\.", "\\.") + ")(.*)";

                Pattern pattern = Pattern.compile(serviceKey);
                Matcher matcher = pattern.matcher(this.group);

                if (matcher.find()) {
                    if (this.findedGroup == null) {
                        this.findedGroup = theEntryService.getKey();
                        this.deepName = theEntryService.getKey().split("\\.").length;
                        matchAndCorespondingService = true;
                    } else {

                        if (this.deepName < theEntryService.getKey().split("\\.").length) {
                            this.findedGroup = theEntryService.getKey();
                            this.deepName = theEntryService.getKey().split("\\.").length;
                            matchAndCorespondingService = true;
                        } else
                            if (this.findedGroup.equals(theEntryService.getKey())) {
                                matchAndCorespondingService = true;
                            }
                    }
                }
            }

            return matchAndCorespondingService;
        }
    }

}
