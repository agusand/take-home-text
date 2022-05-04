import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useLoadingContext } from "../../contexts/LoadingContext.js";

export default function Main({ children }) {
	const { setIsLoading } = useLoadingContext();

	const navigate = useNavigate();

	useEffect(() => {
		const checkLogin = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get("/api/users/logged");
				if (response?.data?.user) {
					navigate("/");
					setIsLoading(false);
				} else {
					navigate("/auth");
					setIsLoading(false);
				}
			} catch (error) {
				setIsLoading(false);
				console.log(error);
			}
		};

		checkLogin();
	}, [navigate, setIsLoading]);
	return <main>{children}</main>;
};
