package org.esco.grouperui.derby.utils;

import org.esco.grouperui.derby.constantes.ESCOConstantes;
import org.esco.grouperui.derby.log.ESCOLoggerFactory;
import org.esco.grouperui.derby.log.IESCOLogger;

/**
 * Robot for the generation of SQL property files.
 * 
 * @author sDupuis
 */
public class DerbyUtils {

    /**
     * LOGGER : Logger sources.
     */
    public static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(DerbyUtils.class);

    /**
     * generated the param error.
     * 
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribut.
     * @param lang
     *            : The lang.
     */
    public static String getParamValueKeyOfPropertieError(final String key, final String attribut) {

        StringBuffer paramValue = new StringBuffer();
        paramValue.append(key.trim().toUpperCase().replace(ESCOConstantes.ATTRIBUT_SEPARATOR,
                ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR));
        paramValue.append(ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR);
        paramValue.append(attribut.trim().toUpperCase());
        paramValue.append(ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR);
        paramValue.append(ESCOConstantes.ATTRIBUT_ERROR.toUpperCase());
        paramValue.append(ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR);
        paramValue.append(ESCOConstantes.ATTRIBUT_LABEL.toUpperCase());

        return paramValue.toString();

    }

    /**
     * generated the param comment.
     * 
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribut.
     * @param lang
     *            : The lang.
     */
    public static String getParamCommentKeyOfPropertie(final String key, final String attribut) {

        StringBuffer nameOfPropertieParamComment = new StringBuffer();
        nameOfPropertieParamComment.append(key.trim());
        nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamComment.append(attribut.trim());
        nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_DESCRIPTION);

        return nameOfPropertieParamComment.toString();

    }

    /**
     * generated the param key.
     * 
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribut.
     * @param lang
     *            : The lang.
     */
    public static String getParamKeyKeyOfPropertie(final String key, final String attribut) {

        StringBuffer nameOfPropertieParamKey = new StringBuffer();
        nameOfPropertieParamKey.append(key.trim());
        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamKey.append(attribut.trim());
        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_KEY);

        return nameOfPropertieParamKey.toString();

    }

    /**
     * generated the param value.
     * 
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribut.
     * @param lang
     *            : The lang.
     */
    public static String getParamValueKeyOfPropertie(final String key, final String attribut) {

        StringBuffer nameOfPropertieParamValue = new StringBuffer();
        nameOfPropertieParamValue.append(key.trim());
        nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamValue.append(attribut.trim());
        nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_VALUE);

        return nameOfPropertieParamValue.toString();

    }

}
