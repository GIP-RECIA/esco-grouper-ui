<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="org.esco.grouperui.web.controllers.SessionController"%><html>
	<head>
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="cache-control" content="no-store" />
		<meta http-equiv="expires" content="0" />
		<%
		   pageContext.setAttribute("url" ,response.encodeURL(request.getContextPath() +"/stylesheets/welcome.jsf") );
		%>
		<META HTTP-EQUIV="Refresh" CONTENT="0;URL=<%=pageContext.getAttribute("url")%>">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>
			RECIA - ESCO Grouper
		</title>
	</head>
	<body>
		Redirection vers la page d'accueil
	</body>
</html>