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
package org.esco.grouperui.web.tag;

import javax.servlet.jsp.tagext.TagSupport;

/**
 * Class EscoTag. Requirement(s) : [RECIA-ESCO-L1-002]
 * 
 * @author ctrimoreau
 */
public class EscoTag extends TagSupport {

    /** The group tag to retrieve parameter. */
    public static final Object GROUP            = "org.esco.grouperui.web.taglib.EscoTag.group";

    /** The key tag to retrieve parameter. */
    public static final Object KEY              = "org.esco.grouperui.web.taglib.EscoTag.key";

    /** The role tag to retrieve parameter. */
    public static final Object ROLE             = "org.esco.grouperui.web.taglib.EscoTag.role";

    /** The groupdb tag to retrieve parameter. */
    public static final Object GROUPDB          = "org.esco.grouperui.web.taglib.EscoTag.groupdb";

    /** The var tag to retrieve parameter. */
    public static final Object VAR              = "org.esco.grouperui.web.taglib.EscoTag.var";

    /**
     *
     */
    private static final long  serialVersionUID = -2406359548169116945L;

    /**
     * Default constructor.
     */
    public EscoTag() {

    }

}
