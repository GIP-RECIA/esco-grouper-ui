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
import org.esco.grouperui.derby.constantes.ESCOConstantesPlugin;
import org.esco.grouperui.derby.generator.DerbyLangGenerator;
import org.esco.grouperui.derby.log.ESCOLoggerFactory;
import org.esco.grouperui.derby.log.IESCOLogger;

/**
 * Robot for the generation of SQL property files.
 * 
 * @author sDupuis
 */
public class DerbyPluginTypeUtils {

    /**
     * LOGGER : Logger sources.
     */
    public static final IESCOLogger LOGGER = ESCOLoggerFactory.getLogger(DerbyPluginTypeUtils.class);

    /**
     * Management attributes the group Dynamic plugin type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribute.
     * @param derbyLangGenerator
     *            : The derbyLangGenerator.
     */
    public static ArrayList < SqlAdd > gestionOfAttributPluginTypeGroupDynamic(final Properties properties,
            final String key, final String attribut, final DerbyLangGenerator derbyLangGenerator) {

        ArrayList < SqlAdd > theSqlAdds = new ArrayList < SqlAdd >();

        DerbyPluginTypeUtils.LOGGER
                .debug("Start - gestionOfAttributPluginTypeGroupDynamic(final String key, final String attribut)");

        if (key.equals(ESCOConstantesPlugin.KEY_GROUP_DYNAMIC)) {

            // //////////////////////////////////////////////////
            // Management ldap attribute and its label
            // //////////////////////////////////////////////////

            // PKEY
            String pkey = ESCOConstantesPlugin.ATTRIBUT_LDAP;

            // PGROUP
            StringBuffer pgroup = new StringBuffer();
            pgroup.append(ESCOConstantes.GROUPERUI);
            pgroup.append(ESCOConstantesPlugin.KEY_LEFTDROP_NAME);

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

            // It adds the line in the SQL file
            theSqlAdds.add(new SqlAdd(pkey, pgroup.toString(), paramKey, paramValue.toString(), paramComment));

            // //////////////////////////////////////////////////
            // Manage labels
            // //////////////////////////////////////////////////

            for (String lang : derbyLangGenerator.getLangOfApplications()) {

                // Label
                String labelKey = derbyLangGenerator.getKeyOfPropertieParamLabel(attribut);
                String labelValue = properties.getProperty(derbyLangGenerator.getNameOfPropertieParamLabel(key,
                        attribut, lang), attribut);

                // Added message properties
                derbyLangGenerator.addMessageProperties(lang, labelKey, labelValue);

            }

            // //////////////////////////////////////////////////
            // Management wildcard
            // //////////////////////////////////////////////////

            // PKEY
            pkey = attribut;

            // PGROUP
            pgroup = new StringBuffer();
            pgroup.append(ESCOConstantes.GROUPERUI);
            pgroup.append(ESCOConstantesPlugin.KEY_RIGHTDROP_TYPE);

            // PARAM_KEY
            paramKey = ESCOConstantesPlugin.ATTRIBUT_WILDCARD;

            // PARAM_VALUE
            StringBuffer nameOfPropertieParamValue = new StringBuffer();
            nameOfPropertieParamValue.append(key);
            nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamValue.append(attribut);
            nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamValue.append(ESCOConstantesPlugin.ATTRIBUT_WILDCARD);

            paramValue = new StringBuffer();
            paramValue.append(properties.getProperty(nameOfPropertieParamValue.toString(),
                    ESCOConstantesPlugin.DEFAULT_WILCARD));

            // PARAM_COMMENT
            StringBuffer paramCommentBis = new StringBuffer();
            paramCommentBis.append(paramComment);
            paramCommentBis.append(ESCOConstantesPlugin.WILCARD_DESCRIPTION);

            // It adds the line in the SQL file
            theSqlAdds.add(new SqlAdd(pkey, pgroup.toString(), paramKey, paramValue.toString(), paramCommentBis
                    .toString()));

            // //////////////////////////////////////////////////
            // Management type
            // //////////////////////////////////////////////////

            // PKEY
            pkey = attribut;

            // PGROUP
            pgroup = new StringBuffer();
            pgroup.append(ESCOConstantes.GROUPERUI);
            pgroup.append(ESCOConstantesPlugin.KEY_RIGHTDROP_TYPE);

            // PARAM_KEY
            StringBuffer nameOfPropertieParamKey = new StringBuffer();
            nameOfPropertieParamKey.append(key);
            nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamKey.append(attribut);
            nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
            nameOfPropertieParamKey.append(ESCOConstantesPlugin.ATTRIBUT_TYPE);

            paramKey = properties.getProperty(nameOfPropertieParamKey.toString(),
                    ESCOConstantesPlugin.DEFAULT_TYPE);

            // PARAM_VALUE
            paramValue = new StringBuffer();
            paramValue.append(ESCOConstantesPlugin.ATTRIBUT_TYPE_VALUE);

            // PARAM_COMMENT
            paramCommentBis = new StringBuffer();
            paramCommentBis.append(paramComment);
            paramCommentBis.append(ESCOConstantesPlugin.TYPE_DESCRIPTION);

            // It adds the line in the SQL file
            theSqlAdds.add(new SqlAdd(pkey, pgroup.toString(), paramKey, paramValue.toString(), paramCommentBis
                    .toString()));

            // //////////////////////////////////////////////////
            // Management suite style
            // //////////////////////////////////////////////////

            if (paramKey.equals(ESCOConstantesPlugin.ATTRIBUT_INPUT)) {
                // Nothing to do
            } else
                if (paramKey.equals(ESCOConstantesPlugin.ATTRIBUT_LIST)) {

                    StringBuffer nameOfPropertieListValues = new StringBuffer();
                    nameOfPropertieListValues.append(key);
                    nameOfPropertieListValues.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieListValues.append(attribut);
                    nameOfPropertieListValues.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieListValues.append(ESCOConstantesPlugin.ATTRIBUT_LIST);
                    nameOfPropertieListValues.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                    nameOfPropertieListValues.append(ESCOConstantesPlugin.ATTRIBUT_LIST_VALUES);

                    String paramListValues = properties.getProperty(nameOfPropertieListValues.toString(),
                            ESCOConstantes.VIDE);

                    String[] paramValues = paramListValues.split(ESCOConstantes.ATTRIBUT_LIST_SEPARATOR);

                    for (String param : paramValues) {

                        String paramTrim = param.trim();

                        // PKEY
                        pkey = attribut;

                        // PGROUP
                        pgroup = new StringBuffer();
                        pgroup.append(ESCOConstantes.GROUPERUI);
                        pgroup.append(ESCOConstantesPlugin.KEY_RIGHTDROP_LIST);

                        // PARAM_KEY
                        paramKey = paramTrim;

                        // PARAM_VALUE
                        paramValue = new StringBuffer();
                        paramValue.append(paramTrim);
                        paramValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                        paramValue.append(ESCOConstantes.ATTRIBUT_LABEL);

                        // PARAM_COMMENT
                        paramCommentBis = new StringBuffer();
                        paramCommentBis.append(paramComment);
                        paramCommentBis.append(ESCOConstantesPlugin.LIST_VALUES_DESCRIPTION);

                        // It adds the line in the SQL file
                        theSqlAdds.add(new SqlAdd(pkey, pgroup.toString(), paramKey, paramValue.toString(),
                                paramCommentBis.toString()));

                        for (String lang : derbyLangGenerator.getLangOfApplications()) {

                            // Label
                            String labelKey = derbyLangGenerator.getKeyOfPropertieParamLabel(paramTrim);

                            StringBuffer nameParamLabel = new StringBuffer();
                            nameParamLabel.append(attribut);
                            nameParamLabel.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                            nameParamLabel.append(ESCOConstantesPlugin.ATTRIBUT_LIST);
                            nameParamLabel.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                            nameParamLabel.append(paramTrim);

                            String labelValue = properties.getProperty(derbyLangGenerator
                                    .getNameOfPropertieParamLabel(key, nameParamLabel.toString(), lang), attribut);

                            // Added message properties
                            derbyLangGenerator.addMessageProperties(lang, labelKey, labelValue);

                        }

                    }

                } else
                    if (paramKey.equals(ESCOConstantesPlugin.ATTRIBUT_REQUEST)) {

                        // PKEY
                        pkey = attribut;

                        // PGROUP
                        pgroup = new StringBuffer();
                        pgroup.append(ESCOConstantes.GROUPERUI);
                        pgroup.append(ESCOConstantesPlugin.KEY_RIGHTDROP_REQUEST);

                        // PARAM_KEY
                        nameOfPropertieParamKey = new StringBuffer();
                        nameOfPropertieParamKey.append(key);
                        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                        nameOfPropertieParamKey.append(attribut);
                        nameOfPropertieParamKey.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                        nameOfPropertieParamKey.append(ESCOConstantesPlugin.ATTRIBUT_REQUEST);
                        paramKey = properties.getProperty(nameOfPropertieParamKey.toString(), ESCOConstantes.VIDE);

                        // PARAM_VALUE
                        nameOfPropertieParamValue = new StringBuffer();
                        nameOfPropertieParamValue.append(key);
                        nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                        nameOfPropertieParamValue.append(attribut);
                        nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                        nameOfPropertieParamValue.append(ESCOConstantesPlugin.ATTRIBUT_REQUEST);
                        nameOfPropertieParamValue.append(ESCOConstantes.ATTRIBUT_SEPARATOR);
                        nameOfPropertieParamValue.append(ESCOConstantesPlugin.ATTRIBUT_DISPLAY);
                        paramValue = new StringBuffer();
                        paramValue.append(properties.getProperty(nameOfPropertieParamValue.toString(),
                                ESCOConstantes.VIDE));

                        // PARAM_COMMENT
                        paramCommentBis = new StringBuffer();
                        paramCommentBis.append(paramComment);
                        paramCommentBis.append(ESCOConstantesPlugin.REQUEST_DESCRIPTION);

                        // It adds the line in the SQL file
                        theSqlAdds.add(new SqlAdd(pkey, pgroup.toString(), paramKey, paramValue.toString(),
                                paramCommentBis.toString()));

                    } else {
                        // Error of type
                        DerbyPluginTypeUtils.LOGGER.error(
                                "         GestionOfAttributPluginTypeGroupDynamic - This type is undifined : "
                                        + key + "-" + attribut, null);
                    }

        }

        DerbyPluginTypeUtils.LOGGER
                .debug("End - gestionOfAttributPluginTypeGroupDynamic(final String key, final String attribut)");

        return theSqlAdds;
    }

    /**
     * Management the plugins. Call all function for manage plugin type.
     * 
     * @param properties
     *            : The properties.
     * @param key
     *            : The key.
     * @param attribut
     *            : The attribute.
     * @param derbyLangGenerator
     *            : The derbyLangGenerator.
     */
    public static ArrayList < SqlAdd > gestionOfAttributPluginType(final Properties properties, final String key,
            final String attribut, final DerbyLangGenerator derbyLangGenerator) {
        ArrayList < SqlAdd > sqlAdd = new ArrayList < SqlAdd >();

        // We pass the script in case we have in the management of the types
        // associated with group dynamics.
        sqlAdd.addAll(DerbyPluginTypeUtils.gestionOfAttributPluginTypeGroupDynamic(properties, key, attribut,
                derbyLangGenerator));

        // We can then put the call to all plugins that have a particular
        // behavior ... if(sqlAdd==null){...}

        return sqlAdd;
    }
}
