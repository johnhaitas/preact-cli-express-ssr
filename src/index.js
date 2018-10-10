import { h, render } from 'preact';
import createHistory from 'history/createBrowserHistory';

import './style';
import App from './components/app';

let appRoot;
const getProps = () => {
		const history = createHistory();
		return { history };
	},
	init = () => {
		const props = getProps();
		appRoot = render(h(App, props), document.body, appRoot || document.body.firstElementChild);
	};
init();
