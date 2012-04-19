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
/**
 *
 */
package org.esco.grouperui.tools.parameter.internal.db;

import java.net.InetAddress;

import org.apache.derby.drda.NetworkServerControl;
import org.esco.grouperui.tools.log.ESCOLoggerFactory;
import org.esco.grouperui.tools.log.IESCOLogger;
import org.esco.grouperui.tools.property.PropertyManager;
import org.springframework.beans.factory.InitializingBean;

/**
 * Starter for embedded derby server. <br/>
 * TODO : fermer proprement le server � l'extinction du bundle
 * 
 * @author dMoulron
 */
public class EmbeddedDerbyServer implements InitializingBean {

    /**
     * Logger for this class.
     */
    private static final IESCOLogger LOGGER                   = ESCOLoggerFactory
                                                                      .getLogger(EmbeddedDerbyServer.class);
    /**
     * Derby Server port.
     */
    private String                   port                     = "1527";

    /**
     * Derby host connexion restriction.
     */
    private String                   hostConnexionRestriction = "0.0.0.0";

    /**
     * Derby Server instance.
     */
    private NetworkServerControl     server;

    /**
     * Default constructor.
     */
    public EmbeddedDerbyServer() {
    }

    /**
     * {@inheritDoc}
     */
    public void afterPropertiesSet() throws Exception {
        String portUsed = PropertyManager.find("parameter.db.port").deType(String.class);
        String hostUsed = PropertyManager.find("parameter.db.host").deType(String.class);

        String requireAuthentication = PropertyManager.find("derby.connection.requireAuthentication").deType(
                String.class);
        String user = PropertyManager.find("parameter.db.username").deType(String.class);
        String pwd = PropertyManager.find("parameter.db.password").deType(String.class);

        if (portUsed == null) {
            portUsed = this.port;
        }
        if (hostUsed == null) {
            hostUsed = this.hostConnexionRestriction;
        }

        if (requireAuthentication != null) {
            System.setProperty("derby.connection.requireAuthentication", requireAuthentication);
            System.setProperty("derby.authentication.provider", "BUILTIN");
        }
        if (user != null) {
            System.setProperty("derby.user." + user, pwd);
        }

        EmbeddedDerbyServer.LOGGER.info("start derby server ...");
        this.server = new NetworkServerControl(InetAddress.getByName(this.hostConnexionRestriction), Integer
                .parseInt(portUsed), user, pwd);
        this.server.start(null);
    }

    /**
     * Close derby server.
     */
    public void close() {
        if (this.server != null) {
            try {
                this.server.shutdown();
            } catch (Exception e) {
                EmbeddedDerbyServer.LOGGER.error(e, "Can not stop derby server ... ");
            }
        }
    }

    /**
     * setter for property port.
     * 
     * @param thePort
     *            the port to set
     */
    public void setPort(final String thePort) {
        this.port = thePort;
    }

    /**
     * setter for property hostConnexionRestriction.
     * 
     * @param theHostConnexionRestriction
     *            the hostConnexionRestriction to set
     */
    public void setHostConnexionRestriction(final String theHostConnexionRestriction) {
        this.hostConnexionRestriction = theHostConnexionRestriction;
    }

}
