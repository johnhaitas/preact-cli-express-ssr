import { h } from 'preact';
import render from 'preact-render-to-string';

const headRegExp = /(<head>)/i,
	bodyRegExp = /(<body[^>]*>).*?(?=<script)/i;

export default (template, rootComponentClass) => props => {
	const body = render(h(rootComponentClass, props)),
		head = '', // you could use something like Helmet here
		renderedTemplate = template
			.replace(headRegExp, `$1${head}`)
			.replace(bodyRegExp, `$1${body}`);

	return renderedTemplate;
};
