<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fn="http://www.w3.org/2005/xpath-functions">
 		<xsl:output method="xml" indent="yes" />

        <!--load the merge file -->
        <xsl:variable name="facesGen"
                select="document('../resources/properties/tags.xml')" />

        <!-- combine the files -->
        <xsl:template match="/">

			<beans
	xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">


			    <bean id="tagsConfigurator" class="org.esupportail.commons.web.tags.config.TagsConfigurator" parent="abstractApplicationAwareBean">
					<!-- and all the child nodes of the aplication tag in the merge file -->
					<xsl:for-each select="$facesGen//*[namespace-uri()='http://www.springframework.org/schema/beans' and local-name()='beans']/child::*/child::*[@name != 'scripts' and @name != 'stylesheets']">
						<xsl:copy-of select="." />
					</xsl:for-each>

					<!-- copy all the child nodes of the aplication tag in the main file -->
					<xsl:for-each select="/*[namespace-uri()='http://www.springframework.org/schema/beans' and local-name()='beans']/child::*/child::*[@name != 'scripts' and @name != 'stylesheets']">
							<xsl:copy-of select="." />
					</xsl:for-each>



			    	<!-- Scripts -->
			    	<property name="scripts" >
			    		<description>
			    			A list of URLs that will be automatically included in the head part
			    			of the output document as scripts. Absolute URLs are used as-is, relative
			    			URLs are prefixed by property portletMediaPath or servletMediaPath.
			    		</description>
			    		<list>
			    			<!-- and all the child nodes of the aplication tag in the merge file -->
							<xsl:for-each select="$facesGen//*[namespace-uri()='http://www.springframework.org/schema/beans' and local-name()='beans']/child::*/child::*[@name='scripts']/child::*/child::*">
								<xsl:copy-of select="." />
							</xsl:for-each>

							<xsl:for-each select="/*[namespace-uri()='http://www.springframework.org/schema/beans' and local-name()='beans']/child::*/child::*[@name='scripts']/child::*/child::*">
									<xsl:copy-of select="." />
							</xsl:for-each>
			    		</list>
			    	</property>

					<!-- Stylesheets -->
			    	<property name="stylesheets" >
			    		<description>
			    			A list of URLs that will be automatically included in the head part
			    			of the output document. Absolute URLs are used as-is, relative
			    			URLs are prefixed by property servletMediaPath.
			    			Warning: this tag is ignored for portlet installations.
			    		</description>
			    		<list>

			    			<!-- and all the child nodes of the aplication tag in the merge file -->
							<xsl:for-each select="$facesGen//*[namespace-uri()='http://www.springframework.org/schema/beans' and local-name()='beans']/child::*/child::*[@name='stylesheets']/child::*/child::*">
								<xsl:copy-of select="." />
							</xsl:for-each>

							<xsl:for-each select="/*[namespace-uri()='http://www.springframework.org/schema/beans' and local-name()='beans']/child::*/child::*[@name='stylesheets']/child::*/child::*">
									<xsl:copy-of select="." />
							</xsl:for-each>
			    		</list>
			    	</property>
				</bean>
			</beans>
		</xsl:template>
</xsl:stylesheet>