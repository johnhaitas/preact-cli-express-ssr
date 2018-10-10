import { h, render } from 'preact';
import createHistory from 'history/createBrowserHistory';

import './style';
import App from './components/app';

const getProps = () => {
		const history = createHistory();
		return { history };
	},
	props = getProps(),
	Entry = () => (<App {...props} />);

export default Entry;
