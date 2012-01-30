package org.esco.grouperui.web.plugins.i18n;

import java.lang.reflect.Method;
import java.util.List;

import org.springframework.beans.factory.support.MethodReplacer;

/**
 * Class that permit to redefine the setBundleBasenames of the
 * AbstractI18nService class.
 * 
 * @author aChesneau
 */
public class I18nFilesAggregator implements MethodReplacer {

    /**
     * {@inheritDoc}
     */
    public Object reimplement(final Object theObj, final Method theMethod, final Object[] theArgs)
            throws Throwable {
        List < String > bundleBasenames = (List < String >) theArgs[0];
        I18nBaseNamesContainer.addBundleBasenames(bundleBasenames);
        return true;
    }

}
