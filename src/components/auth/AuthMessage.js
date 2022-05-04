import { useEffect, useState } from "react";

import { useAuthContext } from "../../contexts/AuthContext.js";

export default function AuthMessage({ data }) {
	const [message, setMessage] = useState("");
	const { isError, isSuccess, page } = useAuthContext();

	useEffect(() => {
		const getCurrentMessage = () => {
			switch (page) {
				case "login":
					if (isError) {
						return data.failedToLogIn;
					}
					if (isSuccess) {
						return data.successfullyLoggedIn;
					}
					break;
				case "signup":
					if (isError) {
						return data.failedToRegister;
					}
					if (isSuccess) {
						return data.successfullyRegistered;
					}
					break;
				case "logout":
					if (isError) {
						return data.failedToLogOut;
					}
					if (isSuccess) {
						return data.successfullyLoggedOut;
					}
					break;
				default:
					break;
			}
		};

		setMessage(getCurrentMessage());
	}, [data, isError, isSuccess, page]);

	return (
		<div>
			<p>{message}</p>
		</div>
	);
};

