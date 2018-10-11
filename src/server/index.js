import getPropsGenerator from './props';
import rendererGenerator from './render';
import handlerGenerator from './handler';

import routesPriority from '../config/routes-priority';

import App from '../components/app';

const addHandlers = (app, template) => {
	const getProps = getPropsGenerator(),
		render = rendererGenerator(template, App),
		handler = handlerGenerator(getProps, render);
	routesPriority.forEach(route => app.get(route, handler));
};

export { addHandlers };

// for template prerender uncomment exporting App as default
// export default App;
