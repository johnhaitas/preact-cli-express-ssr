import getPropsGenerator from './props';
import { AppPlaceholder, rendererGenerator } from './render';
import handlerGenerator from './handler';

import routesPriority from '../config/routes-priority';

import App from '../components/app';

const addHandlers = (expressApp, template) => {
	const getProps = getPropsGenerator(),
		render = rendererGenerator(template, App),
		handler = handlerGenerator(getProps, render);
	routesPriority.forEach(route => expressApp.get(route, handler));
};

export {
	App,
	addHandlers
};

// will pre-render with a placeholder
export default AppPlaceholder;
