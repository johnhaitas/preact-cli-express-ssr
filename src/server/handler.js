export default (getProps, render) => (request, response) => {
	getProps(request, response)
		.then(props => {
			if (response.finished === true) {
				return;
			}
			const renderedTemplate = render(props);
			response.setHeader('Content-Type', 'text/html');
			response.send(renderedTemplate);
		})
		.catch(_ => {
			console.warn(`Error rendering page for ${request.url}`);
			response.setHeader('Content-Type', 'text/plain');
			response.status(500).send('Error');
		});
};
