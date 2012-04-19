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
package org.apache.myfaces.application;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.faces.application.Application;
import javax.faces.application.ApplicationFactory;

/**
 * @author Manfred Geiler (latest modification by $Author: grantsmith $)
 * @author Thomas Spiegl
 * @version $Revision: 472618 $ $Date: 2006-11-08 21:06:54 +0100 (Mi, 08 Nov 2006) $
 */
public class ApplicationFactoryImpl
    extends ApplicationFactory
{
    private static final Log log = LogFactory.getLog(ApplicationFactoryImpl.class);

    /**
     * Application is thread-safe (see Application javadoc)
     * "Application represents a per-web-application singleton object..."
     * FactoryFinder has a ClassLoader-Factory Map. Since each webapp has it's
     * own ClassLoader, each webapp will have it's own private factory instances.
     */
    private Application _application;

    public ApplicationFactoryImpl()
    {
        _application = new ApplicationImpl();
        if (log.isTraceEnabled()) log.trace("New ApplicationFactory instance created");
    }

    public Application getApplication()
    {
        return _application;
    }

    public void setApplication(Application application)
    {
        if (application == null)
        {
            throw new NullPointerException("Cannot set a null application in the ApplicationFactory");
        }
        _application = application;
    }

}
