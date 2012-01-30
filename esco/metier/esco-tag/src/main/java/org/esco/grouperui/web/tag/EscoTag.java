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
