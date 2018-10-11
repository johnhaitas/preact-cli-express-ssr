import { h } from 'preact';
import render from 'preact-render-to-string';

const headTag = '<head>';

export default (template, rootComponentClass, placeholderComponentClass) => {
	const appPlaceholder = placeholderComponentClass
		? render(h(placeholderComponentClass))
		: /(<div id="app"[^>]*>).*?(?=<script)/i;
	return props => {
		const app = render(h(rootComponentClass, props)),
			head = '', // you could use something like Helmet here
			renderedTemplate = template
				.replace(headTag, headTag + head)
				.replace(appPlaceholder, app);

		return renderedTemplate;
	};
};
