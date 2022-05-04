const saveFilePath = (filePath) => (req, res, next) => {
	req.session.filePath = filePath
		.replace("${email}", req.body.email)
		.replace(
			"${ext}",
			req.body.extension[0] === "."
				? req.body.extension
				: `.${req.body.extension}`
		);

	next();
};

export default saveFilePath;
