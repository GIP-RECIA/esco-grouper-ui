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
import org.esco.grouperui.derby.generator.DerbyLangGenerator;
import org.esco.grouperui.derby.log.ESCOLoggerFactory;
import org.esco.grouperui.derby.log.IESCOLogger;

/**
 * Robot for the generation of SQL property files.
 * 
 * @author sDupuis
 */
public class DerbyNoGlobalTypeUtils {

    /**
     * LOGGER : Logger sources.
     */
    public static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(DerbyNoGlobalTypeUtils.class);

    /**
     * Management attributes the colonne type.
     * 
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribute.
     * @param nbOfAttributes
     *            : The nbOfAttributes.
     * @param mappingKey
     *            : The mappingKey.
     */
    public static SqlAdd gestionOfAttributColumnType(final String key, final String attribut,
            final int nbOfAttributes, final String mappingKey) {

        DerbyNoGlobalTypeUtils.LOGGER
                .debug("Start - gestionOfAttributColonneType(final String key, final String attribut)");

        String pkey = null, paramValue = null, paramComment = null;
        StringBuffer paramKey = new StringBuffer();

        // PKEY
        pkey = "cols";

        // PGROUP
        String pgroup = mappingKey;

        // PARAM_KEY
        if (nbOfAttributes == 1) {
            paramKey.append(ESCOConstantes.COLS_ATTRIBUT_ATTR_DEBUT);
            paramKey.append(attribut);
            paramKey.append(ESCOConstantes.COLS_ATTRIBUT_ATTR_FIN);
        } else {
            String[] attributes = attribut.split(ESCOConstantes.COLS_ATTRIBUT_SEPARATOR);
            for (int i = 0; i < attributes.length; i++) {
                paramKey.append(ESCOConstantes.COLS_ATTRIBUT_ATTR_DEBUT);
                paramKey.append(attributes[i].trim());
                paramKey.append(ESCOConstantes.COLS_ATTRIBUT_ATTR_FIN);
                if (i + 1 < attributes.length) {
                    paramKey.append(ESCOConstantes.COLS_ATTRIBUT_ATTR_MILLIEU);
                }
            }
        }

        // PARAM_VALUE
        paramValue = paramKey.toString();

        // PARAM_COMMENT
        paramComment = ESCOConstantes.DEFAULT_DESCRIPTION;
        DerbyNoGlobalTypeUtils.LOGGER
                .debug("End - gestionOfAttributColonneType(final String key, final String attribut)");

        // It adds the line in the SQL file
        return new SqlAdd(pkey, pgroup.toString(), paramKey.toString(), paramValue, paramComment);

    }

    /**
     * Management attributes the map type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param valueOfKey
     *            : The valueOfKey.
     * @param sort
     *            : The sort.
     * @param mappingKey
     *            : The mappingKey.
     * @param derbyLangGenerator
     *            : The derbyLangGenerator.
     */
    public static ArrayList < SqlAdd > manageOfAttributTypeMaps(final Properties properties, final String key,
            final String valueOfKey, final boolean sort, final String mappingKey,
            final DerbyLangGenerator derbyLangGenerator) {
        return DerbyNoGlobalTypeUtils.manageOfAttributTypeAttributes(properties, key, valueOfKey, false,
                mappingKey, derbyLangGenerator);
    }

    /**
     * Management attributes the rights type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param valueOfKey
     *            : The valueOfKey.
     * @param sort
     *            : The sort.
     * @param mappingKey
     *            : The mappingKey.
     * @param derbyLangGenerator
     *            : The derbyLangGenerator.
     */
    public static ArrayList < SqlAdd > manageOfAttributTypeRights(final Properties properties, final String key,
            final String valueOfKey, final boolean sort, final String mappingKey,
            final DerbyLangGenerator derbyLangGenerator) {
        return DerbyNoGlobalTypeUtils.manageOfAttributTypeAttributes(properties, key, valueOfKey, true,
                mappingKey, derbyLangGenerator);
    }

    /**
     * Management attributes the custom type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param valueOfKey
     *            : The valueOfKey.
     * @param sort
     *            : The sort.
     * @param mappingKey
     *            : The mappingKey.
     * @param derbyLangGenerator
     *            : The derbyLangGenerator.
     */
    public static ArrayList < SqlAdd > manageOfAttributTypeCusomtypes(final Properties properties,
            final String key, final String valueOfKey, final boolean sort, final String mappingKey,
            final DerbyLangGenerator derbyLangGenerator) {
        ArrayList < SqlAdd > theSqlAdds = new ArrayList < SqlAdd >();

        theSqlAdds.addAll(DerbyNoGlobalTypeUtils.manageOfAttributTypeAttributes(properties, key, valueOfKey, true,
                mappingKey, derbyLangGenerator));

        // PKEY
        String pkey = "default";

        // PGROUP
        String pgroup = "org.esco.grouperui.group.custom.default";

        // PARAM_KEY
        String paramKey = "default";

        // PARAM_VALUE
        StringBuffer nameOfPropertieParamValue = new StringBuffer();
        nameOfPropertieParamValue.append(key.substring(0, key.length() - 1));
        nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
        nameOfPropertieParamValue.append("default");
        String paramValue = properties.getProperty(nameOfPropertieParamValue.toString(), paramKey);

        // PARAM_COMMENT
        String paramComment = "Edition de groupe - Attributs - Types personnalises - defaut type";

        // It adds the line in the SQL file
        theSqlAdds.add(new SqlAdd(pkey, pgroup, paramKey, paramValue, paramComment));

        return theSqlAdds;

    }

    /**
     * Management attributes the contexts type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param valueOfKey
     *            : The valueOfKey.
     * @param sort
     *            : The sort.
     * @param mappingKey
     *            : The mappingKey.
     * @param derbyLangGenerator
     *            : The derbyLangGenerator.
     */
    public static ArrayList < SqlAdd > manageOfAttributTypeContexts(final Properties properties, final String key,
            final String valueOfKey, final boolean sort, final String mappingKey,
            final DerbyLangGenerator derbyLangGenerator) {
        ArrayList < SqlAdd > theSqlAdds = new ArrayList < SqlAdd >();

        theSqlAdds.addAll(DerbyNoGlobalTypeUtils.manageOfAttributTypeAttributes(properties, key, valueOfKey, true,
                mappingKey, derbyLangGenerator));

        String[] keysContexts = properties.getProperty("group.edition.customTypes").split(
                ESCOConstantes.ATTRIBUT_LIST_SEPARATOR);

        for (String keyContext : keysContexts) {

            keyContext = keyContext.trim();

            // PKEY
            String pkey = keyContext;

            // PGROUP
            String pgroup = "org.esco.grouperui.group.context." + keyContext;

            // PARAM_KEY
            String paramKey = keyContext;

            // PARAM_VALUE
            StringBuffer nameOfPropertieParamValue = new StringBuffer();
            nameOfPropertieParamValue.append(key.substring(0, key.length() - 1));
            nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamValue.append(keyContext);
            String paramValue = properties.getProperty(nameOfPropertieParamValue.toString(), null);

            // PARAM_COMMENT
            String paramComment = "Edition de groupe - Attributs - Association types personnalises et contextes utilisation - "
                    + keyContext;

            if (paramValue != null) {

                // It adds the line in the SQL file
                theSqlAdds.add(new SqlAdd(pkey, pgroup, paramKey, paramValue, paramComment));

                // PKEY
                pkey = keyContext;

                // PGROUP
                pgroup = "org.esco.grouperui.group.context.incompatibilities." + keyContext;

                // PARAM_KEY
                paramKey = keyContext;

                // PARAM_VALUE
                nameOfPropertieParamValue = new StringBuffer();
                nameOfPropertieParamValue.append(key.substring(0, key.length() - 1));
                nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                nameOfPropertieParamValue.append(keyContext);
                nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                nameOfPropertieParamValue.append("incompatibilities");
                String paramValues = properties.getProperty(nameOfPropertieParamValue.toString(), null);

                if (paramValues != null) {

                    String[] myParamValue = paramValues.split(ESCOConstantes.ATTRIBUT_LIST_SEPARATOR);

                    // PARAM_COMMENT
                    paramComment = "Edition de groupe - Attributs - Association types personnalises et contextes utilisation - "
                            + keyContext;

                    for (String string : myParamValue) {
                        // PARAM_VALUE
                        paramValue = string.trim();
                        // It adds the line in the SQL file
                        theSqlAdds.add(new SqlAdd(pkey, pgroup, paramKey, paramValue, paramComment));
                    }

                }

            }

        }

        return theSqlAdds;

    }

    /**
     * Management attributes the attributes type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param valueOfKey
     *            : The valueOfKey.
     * @param sort
     *            : The sort.
     * @param mappingKey
     *            : The mappingKey.
     * @param derbyLangGenerator
     *            : The derbyLangGenerator.
     */
    public static ArrayList < SqlAdd > manageOfAttributTypeAttributes(final Properties properties,
            final String key, final String valueOfKey, boolean sort, final String mappingKey,
            final DerbyLangGenerator derbyLangGenerator) {
        ArrayList < SqlAdd > theSqlAdds = new ArrayList < SqlAdd >();

        String[] valuesOfAttributes = valueOfKey.split(ESCOConstantes.ATTRIBUT_LIST_SEPARATOR);

        for (String attribut : valuesOfAttributes) {

            String attributTrim = attribut.trim();
            String keyOfAttribute = key.substring(0, key.length() - 1);

            String langDefined = null;
            StringBuffer containsKeyOfLang = new StringBuffer();

            // On supprime le 's' du pluriel
            containsKeyOfLang.append(keyOfAttribute);

            containsKeyOfLang.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            containsKeyOfLang.append(attributTrim);
            containsKeyOfLang.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            containsKeyOfLang.append(ESCOConstantes.ATTRIBUT_LABEL);
            containsKeyOfLang.append(ESCOConstantes.ATTRIBUT_SEPARATOR);

            for (String lang : derbyLangGenerator.getLangOfApplications()) {
                if (properties.containsKey(containsKeyOfLang.toString() + lang)) {
                    langDefined = lang;
                    break;
                }
            }

            if (langDefined != null) {
                // Attribute label type

                // PKEY
                String pkey = attributTrim;

                // PGROUP
                String pgroup = mappingKey;

                // PARAM_KEY
                String paramKey = attributTrim;

                // PARAM_VALUE
                StringBuffer paramValue = new StringBuffer();
                paramValue.append(attributTrim);
                paramValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                paramValue.append(ESCOConstantes.ATTRIBUT_LABEL);

                // PARAM_COMMENT
                String paramComment = properties.getProperty(DerbyUtils.getParamCommentKeyOfPropertie(
                        keyOfAttribute, attributTrim), ESCOConstantes.DEFAULT_DESCRIPTION);

                // It adds the line in the SQL file
                theSqlAdds.add(new SqlAdd(pkey, pgroup, paramKey, paramValue.toString(), paramComment));

                for (String lang : derbyLangGenerator.getLangOfApplications()) {

                    // Label
                    String labelKey = derbyLangGenerator.getKeyOfPropertieParamLabel(attributTrim);
                    String labelValue = properties.getProperty(derbyLangGenerator.getNameOfPropertieParamLabel(
                            keyOfAttribute, attributTrim, lang), attributTrim);

                    // Title
                    String titleKey = derbyLangGenerator.getKeyOfPropertieParamTitle(keyOfAttribute, attributTrim);
                    String titleValue = properties.getProperty(derbyLangGenerator.getNameOfPropertieParamTitle(
                            keyOfAttribute, attributTrim, lang), ESCOConstantes.VIDE);

                    // Added message properties
                    derbyLangGenerator.addMessageProperties(lang, labelKey, labelValue);
                    derbyLangGenerator.addMessageProperties(lang, titleKey, titleValue);

                }
            } else {
                // Type attribute key / value or regexp
                if (!attributTrim.equals(ESCOConstantes.OBJECTCLASS)) {

                    // PKEY
                    String pkey = attributTrim;

                    // PGROUP
                    String pgroup = mappingKey;

                    // PARAM_KEY
                    StringBuffer nameOfPropertieParamKey = new StringBuffer();
                    nameOfPropertieParamKey.append(keyOfAttribute);
                    nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieParamKey.append(attributTrim);
                    nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_KEY);
                    String paramKey = properties.getProperty(nameOfPropertieParamKey.toString(),
                            ESCOConstantes.VIDE);

                    // PARAM_VALUE
                    StringBuffer nameOfPropertieParamValue = new StringBuffer();
                    nameOfPropertieParamValue.append(keyOfAttribute);
                    nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieParamValue.append(attributTrim);
                    nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_VALUE);
                    StringBuffer paramValue = new StringBuffer();
                    paramValue.append(properties.getProperty(nameOfPropertieParamValue.toString(), paramKey));

                    // Regexp or Key value with no declaration of key
                    if (paramKey.equals(ESCOConstantes.VIDE)) {
                        sort = false;

                        // PARAM_KEY
                        nameOfPropertieParamKey = new StringBuffer();
                        nameOfPropertieParamKey.append(keyOfAttribute);
                        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                        nameOfPropertieParamKey.append(attributTrim);
                        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_REGEXP);
                        paramKey = properties.getProperty(nameOfPropertieParamKey.toString(), ESCOConstantes.VIDE);

                        // Key value with no declaration of key
                        if (paramKey.equals(ESCOConstantes.VIDE)) {
                            sort = false;

                            // PARAM_KEY
                            paramKey = attributTrim;

                            // PARAM_VALUE
                            paramValue = new StringBuffer();
                            paramValue.append(attributTrim);
                            paramValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                            paramValue.append(ESCOConstantes.ATTRIBUT_LABEL);
                        } else {

                            // PARAM_VALUE
                            nameOfPropertieParamValue = new StringBuffer();
                            nameOfPropertieParamValue.append(keyOfAttribute);
                            nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                            nameOfPropertieParamValue.append(attributTrim);
                            nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                            nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_VALUE);
                            paramValue = new StringBuffer();
                            paramValue.append(keyOfAttribute.toUpperCase().replace(
                                    ESCOConstantes.ATTRIBUT_SEPARATOR, ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR));
                            paramValue.append(ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR);
                            paramValue.append(attributTrim.toUpperCase());
                            paramValue.append(ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR);
                            paramValue.append(ESCOConstantes.ATTRIBUT_ERROR.toUpperCase());
                            paramValue.append(ESCOConstantes.ATTRIBUT_TITLE_SEPARATOR);
                            paramValue.append(ESCOConstantes.ATTRIBUT_LABEL.toUpperCase());

                            for (String lang : derbyLangGenerator.getLangOfApplications()) {

                                // Error
                                String errorValue = properties.getProperty(derbyLangGenerator
                                        .getNameOfPropertieParamError(keyOfAttribute, attributTrim, lang),
                                        attributTrim);

                                // Added message properties
                                derbyLangGenerator.addMessageProperties(lang, paramValue.toString(), errorValue);

                            }

                        }
                    }

                    // PARAM_COMMENT
                    StringBuffer nameOfPropertieParamComment = new StringBuffer();
                    nameOfPropertieParamComment.append(keyOfAttribute);
                    nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieParamComment.append(attributTrim);
                    nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_DESCRIPTION);
                    String paramComment = properties.getProperty(nameOfPropertieParamComment.toString(),
                            ESCOConstantes.DEFAULT_DESCRIPTION);

                    // It adds the line in the SQL file
                    theSqlAdds.add(new SqlAdd(pkey, pgroup.toString(), paramKey, paramValue.toString(),
                            paramComment));

                } else {

                    // PKEY
                    String pkey = mappingKey;

                    // PGROUP
                    String pgroup = mappingKey;

                    // PARAM_KEY
                    String paramKey = ESCOConstantes.OBJECTCLASS;

                    // PARAM_VALUE
                    StringBuffer nameOfPropertieParamValue = new StringBuffer();
                    nameOfPropertieParamValue.append(keyOfAttribute);
                    nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieParamValue.append(attributTrim);
                    nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_VALUE);
                    String paramValue = properties.getProperty(nameOfPropertieParamValue.toString(), paramKey);

                    // PARAM_COMMENT
                    StringBuffer nameOfPropertieParamComment = new StringBuffer();
                    nameOfPropertieParamComment.append(keyOfAttribute);
                    nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieParamComment.append(attributTrim);
                    nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieParamComment.append(ESCOConstantes.ATTRIBUT_DESCRIPTION);
                    String paramComment = properties.getProperty(nameOfPropertieParamComment.toString(),
                            ESCOConstantes.DEFAULT_DESCRIPTION);

                    // It adds the line in the SQL file
                    theSqlAdds.add(new SqlAdd(pkey.toString(), pgroup.toString(), paramKey, paramValue,
                            paramComment));

                }
            }

        }

        if (sort) {

            // //////////////////
            // MANAGEMENT OF SORT
            // //////////////////

            // PKEY
            String pkey = ESCOConstantes.ATTRIBUT_SORT;

            // PGROUP
            StringBuffer pgroup = new StringBuffer();
            pgroup.append(mappingKey);
            pgroup.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            pgroup.append(ESCOConstantes.ATTRIBUT_SORT);

            // PARAM_KEY
            String paramKey = ESCOConstantes.ATTRIBUT_SORT;

            // PARAM_VALUE
            String paramValue = valueOfKey.replace(ESCOConstantes.ATTRIBUT_LIST_SEPARATOR,
                    ESCOConstantes.ATTRIBUT_SORT_LIST_SEPARATOR).replace(" ", "");

            // PARAM_COMMENT
            String paramComment = ESCOConstantes.SORT_DESCRIPTION;

            // It adds the line in the SQL file
            theSqlAdds.add(new SqlAdd(pkey, pgroup.toString(), paramKey, paramValue, paramComment));

        }

        return theSqlAdds;
    }
}
