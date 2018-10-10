import {
	HOME_ROUTE_PATH,
	MY_PROFILE_ROUTE_PATH,
	USER_PROFILE_ROUTE_PATH
} from './constants';

// To be sure handlers are only added for the SSR paths and in the appropriate order
export default [
	HOME_ROUTE_PATH,
	MY_PROFILE_ROUTE_PATH,
	USER_PROFILE_ROUTE_PATH
];
