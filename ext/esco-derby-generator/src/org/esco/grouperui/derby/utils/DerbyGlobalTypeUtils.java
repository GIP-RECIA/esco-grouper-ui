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
package org.esco.grouperui.derby.utils;

import java.util.ArrayList;
import java.util.Properties;

import org.esco.grouperui.derby.constantes.ESCOConstantes;
import org.esco.grouperui.derby.log.ESCOLoggerFactory;
import org.esco.grouperui.derby.log.IESCOLogger;

/**
 * Robot for the generation of SQL property files.
 * 
 * @author sDupuis
 */
public class DerbyGlobalTypeUtils {

    /**
     * LOGGER : Logger sources.
     */
    public static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(DerbyGlobalTypeUtils.class);

    /**
     * Management attributes the colonne type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribute.
     * @param mappingKey
     *            : The mappingKey.
     */
    public static ArrayList < SqlAdd > gestionOfAttributListType(final Properties properties, final String key,
            final String attribut, final String mappingKey) {

        DerbyGlobalTypeUtils.LOGGER
                .debug("Start - gestionOfAttributListType(final String key, final String attribut)");

        ArrayList < SqlAdd > sqlAdd = new ArrayList < SqlAdd >();

        String attributSansSeparateur = attribut.substring(0, attribut
                .indexOf(ESCOConstantes.COLS_ATTRIBUT_SEPARATOR));
        int numberOfElement = Integer.valueOf(
                attribut.substring(attribut.indexOf(ESCOConstantes.COLS_ATTRIBUT_SEPARATOR) + 1)).intValue();

        String pkey = null, paramKey = null, paramValue = null, paramComment = null;
        StringBuffer nameOfPropertieParamKey = null, nameOfPropertieParamValue = null, nameOfPropertieParamComment = null;

        for (int i = 1; i <= numberOfElement; i++) {

            // PKEY
            pkey = attributSansSeparateur;

            // PGROUP
            String pgroup = mappingKey;

            // PARAM_KEY
            nameOfPropertieParamKey = new StringBuffer();
            nameOfPropertieParamKey.append(key);
            nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamKey.append(attributSansSeparateur);
            nameOfPropertieParamKey.append(i);
            nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_KEY);
            paramKey = properties.getProperty(nameOfPropertieParamKey.toString(), ESCOConstantes.VIDE);

            // PARAM_VALUE
            nameOfPropertieParamValue = new StringBuffer();
            nameOfPropertieParamValue.append(key);
            nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamValue.append(attributSansSeparateur);
            nameOfPropertieParamValue.append(i);
            nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_VALUE);
            paramValue = properties.getProperty(nameOfPropertieParamValue.toString(), paramKey);

            // PARAM_COMMENT
            nameOfPropertieParamComment = new StringBuffer();
            nameOfPropertieParamComment.append(key);
            nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamComment.append(attributSansSeparateur);
            nameOfPropertieParamComment.append(i);
            nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_DESCRIPTION);
            paramComment = properties.getProperty(nameOfPropertieParamComment.toString(),
                    ESCOConstantes.DEFAULT_DESCRIPTION);

            // It adds the line in the SQL file
            sqlAdd.add(new SqlAdd(pkey, pgroup, paramKey, paramValue, paramComment));

        }

        DerbyGlobalTypeUtils.LOGGER
                .debug("End - gestionOfAttributListType(final String key, final String attribut)");

        return sqlAdd;

    }

    /**
     * Management attributes the regexp type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribute.
     * @param mappingKey
     *            : The mappingKey.
     */
    public static SqlAdd gestionOfAttributRegexpType(final Properties properties, final String key,
            final String attribut, final String mappingKey) {

        DerbyGlobalTypeUtils.LOGGER
                .debug("Start - gestionOfAttributRegexpType(final String key, final String attribut)");

        // PKEY
        String pkey = attribut;

        // PGROUP
        String pgroup = mappingKey;

        // PARAM_KEY
        StringBuffer nameOfPropertieParamKey = new StringBuffer();
        nameOfPropertieParamKey.append(key);
        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamKey.append(attribut);
        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_REGEXP);
        String paramKey = properties.getProperty(nameOfPropertieParamKey.toString(), ESCOConstantes.VIDE);

        // PARAM_VALUE
        String paramValue = DerbyUtils.getParamValueKeyOfPropertieError(key, attribut);

        // PARAM_COMMENT
        String paramComment = properties.getProperty(DerbyUtils.getParamCommentKeyOfPropertie(key, attribut),
                ESCOConstantes.DEFAULT_DESCRIPTION);

        DerbyGlobalTypeUtils.LOGGER
                .debug("End - gestionOfAttributRegexpType(final String key, final String attribut)");

        // It adds the line in the SQL file
        return new SqlAdd(pkey, pgroup, paramKey, paramValue, paramComment);

    }

    /**
     * Management attributes the key/value type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribute.
     * @param mappingKey
     *            : The mappingKey.
     */
    public static SqlAdd gestionOfAttributKeyValueType(final Properties properties, final String key,
            final String attribut, final String mappingKey) {

        DerbyGlobalTypeUtils.LOGGER
                .debug("Start - gestionOfAttributKeyValueType(final String key, final String attribut)");

        if (!attribut.equals(ESCOConstantes.OBJECTCLASS)) {

            // PKEY
            String pkey = attribut;

            // PGROUP
            String pgroup = mappingKey;

            // PARAM_KEY
            String paramKey = properties.getProperty(DerbyUtils.getParamKeyKeyOfPropertie(key, attribut),
                    ESCOConstantes.VIDE);

            // PARAM_VALUE
            String paramValue = properties.getProperty(DerbyUtils.getParamValueKeyOfPropertie(key, attribut),
                    paramKey);

            // PARAM_COMMENT
            String paramComment = properties.getProperty(DerbyUtils.getParamCommentKeyOfPropertie(key, attribut),
                    ESCOConstantes.DEFAULT_DESCRIPTION);

            DerbyGlobalTypeUtils.LOGGER
                    .debug("End - gestionOfAttributKeyValueType(final String key, final String attribut)");

            // It adds the line in the SQL file
            return new SqlAdd(pkey, pgroup, paramKey, paramValue, paramComment);

        } else {

            // PKEY
            StringBuffer pkey = new StringBuffer();
            pkey.append(ESCOConstantes.GROUPERUI);
            pkey.append(key);

            // PGROUP
            String pgroup = mappingKey;

            // PARAM_KEY
            String paramKey = ESCOConstantes.OBJECTCLASS;

            // PARAM_VALUE
            String paramValue = properties.getProperty(DerbyUtils.getParamValueKeyOfPropertie(key, attribut),
                    paramKey);

            // PARAM_COMMENT
            String paramComment = properties.getProperty(DerbyUtils.getParamCommentKeyOfPropertie(key, attribut),
                    ESCOConstantes.DEFAULT_DESCRIPTION);

            DerbyGlobalTypeUtils.LOGGER
                    .debug("End - gestionOfAttributKeyValueType(final String key, final String attribut)");

            // It adds the line in the SQL file
            return new SqlAdd(pkey.toString(), pgroup, paramKey, paramValue, paramComment);

        }

    }

    /**
     * Management attributes the label type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribute.
     * @param mappingKey
     *            : The mappingKey.
     */
    public static SqlAdd gestionOfAttributLabelType(final Properties properties, final String key,
            final String attribut, final String mappingKey) {

        DerbyGlobalTypeUtils.LOGGER
                .debug("Start - gestionOfAttributLabelType(final String key, final String attribut)");

        // PKEY
        String pkey = attribut;

        // PGROUP
        String pgroup = mappingKey;

        // PARAM_KEY
        String paramKey = attribut;

        // PARAM_VALUE
        StringBuffer paramValue = new StringBuffer();
        paramValue.append(attribut);
        paramValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        paramValue.append(ESCOConstantes.ATTRIBUT_LABEL);

        // PARAM_COMMENT
        String paramComment = properties.getProperty(DerbyUtils.getParamCommentKeyOfPropertie(key, attribut),
                ESCOConstantes.DEFAULT_DESCRIPTION);

        DerbyGlobalTypeUtils.LOGGER
                .debug("End - gestionOfAttributLabelType(final String key, final String attribut)");

        // It adds the line in the SQL file
        return new SqlAdd(pkey, pgroup, paramKey, paramValue.toString(), paramComment);

    }
}
