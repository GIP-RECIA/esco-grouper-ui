<%--
 Copyright (C) 2009 GIP RECIA http://www.recia.fr
 @Author (C) 2009 GIP RECIA <contact@recia.fr>
 @Contributor (C) 2009 SOPRA http://www.sopragroup.com/
 @Contributor (C) 2011 Pierre Legay <pierre.legay@recia.fr>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
--%>
<%@include file="_commons-include.jsp"%>
<e:form id="exceptionForm" >
	<h:panelGroup>
		<h:panelGroup style="cursor: pointer" onclick="simulateLinkClick('exceptionForm:restartButton');" >
			<e:bold value="#{msgs['EXCEPTION.BUTTON.RESTART']} " />
			<t:graphicImage value="/media/images/restart.png"
				alt="#{msgs['EXCEPTION.BUTTON.RESTART']}" 
				title="#{msgs['EXCEPTION.BUTTON.RESTART']}" />
		</h:panelGroup>
		<e:commandButton style="display: none" id="restartButton" 
			action="#{exceptionController.restart}"
			value="#{msgs['EXCEPTION.BUTTON.RESTART']}" />
	</h:panelGroup>
</e:form>
