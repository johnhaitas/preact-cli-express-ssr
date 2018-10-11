import getPropsGenerator from './props';
import rendererGenerator from './render';
import handlerGenerator from './handler';

import routesPriority from '../config/routes-priority';

import App from '../components/app';

const AppPlaceholder = () => (<div id="app" />);

const addHandlers = (app, template) => {
	const getProps = getPropsGenerator(),
		render = rendererGenerator(template, App, AppPlaceholder),
		handler = handlerGenerator(getProps, render);
	routesPriority.forEach(route => app.get(route, handler));
};

export { addHandlers };

// will pre-render with a placeholder
export default AppPlaceholder;
