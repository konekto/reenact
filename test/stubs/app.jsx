import React from 'react';
import Layout from './layout';

export default function App(props) {

	return (
		<Layout>
			<Content {...props}/>
		</Layout>
	)
}

function Content(props) {

	return (

		<h1>{props.headline}</h1>
	)
}
