esco-grouper-ui
===============

UI for interne2 grouper, more user-friendly and simplify access for non avanced user use.


## Installation Notes for version REL-2.7-patches

### Clone the project :
`git clone https://github.com/GIP-RECIA/esco-grouper-ui.git`

### Checkout the branch : 
`git checkout origin/rel-2.7-patches`

### Configuration of build.properties :
`cp build.example.properties build.properties`

You must configure here the properties file name (ESCOGrouper.properties by default), the maven directory location and the tomcat deploying mode.

### Configuration of properties/ESCOGrouper.properties :
`cp ESCOGrouper.example.properties properties/ESCOGrouper.properties`

You should configure the application context path of the App (ESCO-Grouper by default), the host name, the authentication informations, the LDAP and Databases configurations, the logging file pathes and the SMTP parameters.

### Compilation :
`ant clean init deploy`

Theorically all the dependencies you will need lays in the ESCO Nexus repository available at : http://www.esco-portail.org/nexus/content/repositories/ESCO-Grouper . This repository is already configured in the project pom, so You should not encouter a missing dependency problem. If it's not the case, you can report missing depencies to us by email.

### Tomcat configuration :
If your tomcat is not in auto deploy mode, you must declare the web app in the server.xml file like this :
`<Context docBase="/opt/webapps/ESCO-Grouper.war" path="/ESCO-Grouper" unpackWAR="true" />`
