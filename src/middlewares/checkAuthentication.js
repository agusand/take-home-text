const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		req.session._garbage = Date();
		req.session.touch();
		next();
	} else {
		res.status(200).send({ user: false });
	}
};

export default checkAuthentication;
