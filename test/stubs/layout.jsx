import React from 'react';

export default function Layout(props, context) {

	return (

		<html>
			<head>
				<title>Test</title>
				<link rel="stylesheet" href={context.stylesPath} />
			</head>
			<body>
				<div id="main">{props.children}</div>
			</body>
		</html>
	)
}
