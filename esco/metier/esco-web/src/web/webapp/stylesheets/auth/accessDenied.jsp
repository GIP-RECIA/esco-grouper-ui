<%@ page import="org.springframework.security.ui.AccessDeniedHandlerImpl"%>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="cache-control" content="no-store" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<div id="contenu">
<h1>ACCES NON AUTORISE</h1>
VOTRE PROFIL NE PERMET PAS D'ACCEDER A CETTE FONCTIONNALITE.
<p><%=request.getAttribute(AccessDeniedHandlerImpl.SPRING_SECURITY_ACCESS_DENIED_EXCEPTION_KEY)%></p>
<br />
<a href="javascript:back()">Retour</a></div>
</body>
</html>