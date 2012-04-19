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
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="org.springframework.security.ui.AbstractProcessingFilter" %>
<%@ page import="org.springframework.security.ui.webapp.AuthenticationProcessingFilter" %>
<%@ page import="org.springframework.security.AuthenticationException" %>
<html>
<head>
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="cache-control" content="no-store" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Login</title>
</head>
<body>
	<div id="contenu">
		<form name="f" action="<c:url value='../../j_spring_security_check'/>" method="post">

				<c:if test="${not empty param.login_error}">
					<span class="err"><s:text name="echec.cnx"/>: ${SPRING_SECURITY_LAST_EXCEPTION.message}</span>
				</c:if>

				<fieldset>
					<legend>Ecran de connexion</legend>

					<div class="travail">

						<table>
							<tr>
								<td class="label">
									<label for="User">User :</label>
								</td>
								<td>
									<span>
										<input type="text" name="j_username"
												value='<c:if test="${not empty param.login_error}">${SPRING_SECURITY_LAST_USERNAME}</c:if>'
												id="j_spring_security_check_j_username" />
									</span>
								</td>
							</tr>
							<tr>
								<td class="label">
									<label for="Password">Password :</label>
								</td>
								<td>
									<span>
										<input type="password" name="j_password" id="j_spring_security_check_j_password" />
									</span>
								</td>
							</tr>
						</table>

					</div>


			        <div class="bouton">
						<div class="cbutton primaryAction">
      						<input type="submit" value="OK" />
    					</div>
				    </div>
				</fieldset>
			</form>
		</div>
</body>
</html>