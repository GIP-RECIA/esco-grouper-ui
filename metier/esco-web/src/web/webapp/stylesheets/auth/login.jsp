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
		<form name="f" action="<c:url value='../../j_spring_security_check'/>" method="POST">

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