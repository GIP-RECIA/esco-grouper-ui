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
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
*/
package javax.faces.convert;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;

/**
 * see Javadoc of <a href="http://java.sun.com/j2ee/javaserverfaces/1.1_01/docs/api/index.html">JSF Specification</a>
 *
 * @author Thomas Spiegl (latest modification by $Author: grantsmith $)
 * @version $Revision: 472555 $ $Date: 2006-11-08 18:30:58 +0100 (Mi, 08 Nov 2006) $
 */
public class IntegerConverter
        implements Converter
{
    private static final String CONVERSION_MESSAGE_ID = "javax.faces.convert.IntegerConverter.CONVERSION";

    // FIELDS
    public static final String CONVERTER_ID = "javax.faces.Integer";

    // CONSTRUCTORS
    public IntegerConverter()
    {
    }

    // METHODS
    public Object getAsObject(FacesContext facesContext, UIComponent uiComponent, String value)
    {
        if (facesContext == null) throw new NullPointerException("facesContext");
        if (uiComponent == null) throw new NullPointerException("uiComponent");

        if (value != null)
        {
            value = value.trim();
            if (value.length() > 0)
            {
                try
                {
                    return Integer.valueOf(value);
                }
                catch (NumberFormatException e)
                {
                    throw new ConverterException(_MessageUtils.getErrorMessage(facesContext,
                                                                               CONVERSION_MESSAGE_ID,
                                                                               new Object[]{uiComponent.getId(),value}), e);
                }
            }
        }
        return null;
    }

    public String getAsString(FacesContext facesContext, UIComponent uiComponent, Object value)
    {
        if (facesContext == null) throw new NullPointerException("facesContext");
        if (uiComponent == null) throw new NullPointerException("uiComponent");

        if (value == null)
        {
            return "";
        }
        if (value instanceof String)
        {
            return (String)value;
        }
        try
        {
            return Integer.toString(((Number)value).intValue());
        }
        catch (Exception e)
        {
            throw new ConverterException(e);
        }
    }
}
