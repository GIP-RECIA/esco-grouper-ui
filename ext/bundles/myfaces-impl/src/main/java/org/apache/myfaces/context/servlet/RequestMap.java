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
package org.apache.myfaces.context.servlet;

import java.util.Enumeration;
import java.util.Map;

import javax.servlet.ServletRequest;


/**
 * ServletRequest attributes Map.
 * 
 * @author Anton Koinov (latest modification by $Author: grantsmith $)
 * @version $Revision: 472618 $ $Date: 2006-11-08 21:06:54 +0100 (Mi, 08 Nov 2006) $
 */
public class RequestMap extends AbstractAttributeMap
{
    final ServletRequest _servletRequest;

    RequestMap(ServletRequest servletRequest)
    {
        _servletRequest = servletRequest;
    }

    protected Object getAttribute(String key)
    {
        return _servletRequest.getAttribute(key);
    }

    protected void setAttribute(String key, Object value)
    {
        _servletRequest.setAttribute(key, value);
    }

    protected void removeAttribute(String key)
    {
        _servletRequest.removeAttribute(key);
    }

    protected Enumeration getAttributeNames()
    {
        return _servletRequest.getAttributeNames();
    }

    public void putAll(Map t)
    {
        throw new UnsupportedOperationException();
    }


    public void clear()
    {
        throw new UnsupportedOperationException();
    }    
}
