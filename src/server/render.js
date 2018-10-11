import { h } from 'preact';
import render from 'preact-render-to-string';

export const AppPlaceholder = () => (<div id="app" />);

const appPlaceholder = render(h(AppPlaceholder)),
	appRegex = /<div id="app"[^>]*>.*?(?=<script)/i;

export const rendererGenerator = (template, rootComponentClass) => {
	const headTag = '<head>',
		templateApp = template.includes(appPlaceholder) ? appPlaceholder : appRegex;
	return props => {
		const app = render(h(rootComponentClass, props)),
			head = '', // you could use something like Helmet here
			renderedTemplate = template
				.replace(headTag, headTag + head)
				.replace(templateApp, app);

		return renderedTemplate;
	};
};
