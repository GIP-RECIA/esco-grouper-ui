package org.esco.grouperui.web.security;

import org.esco.grouperui.web.beans.User;

/**
 * @author dMoulron
 */
public interface SecurityContextFinder {

    /**
     * @return information of user logged
     */
    public User getUserSecurity();
}
