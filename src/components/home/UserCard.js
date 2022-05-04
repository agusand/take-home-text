import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuthContext } from "../../contexts/AuthContext.js";
import { useLoadingContext } from "../../contexts/LoadingContext.js";

export default function UserCard() {
	const { setIsError, setIsSuccess, setPage, userLogged, setUserLogged } =
		useAuthContext();
	const { setIsLoading } = useLoadingContext();
	let navigate = useNavigate();

	useEffect(() => {
		const getUser = async () => {
			try {
				setIsLoading(true);
				const {
					data: { user },
				} = await axios.get("/api/users/logged");

				if (user) {
					setIsLoading(false);
					setUserLogged(user);
				} else {
					throw new Error("There isn't user logged.");
				}
			} catch (error) {
				setIsLoading(false);
				console.log(error);
			}
		};

		getUser();
	}, [setIsLoading, setUserLogged]);

	const logoutClickHandle = async () => {
		try {
			const { data } = await axios.get("/api/auth/logout");

			if (data.logoutOk) {
				setPage("logout");
				setIsSuccess(true);
				navigate("/auth");
				setTimeout(() => {
					setPage("");
					setIsSuccess(false);
				}, 2000);
			} else {
				setPage("logout");
				setIsError(true);
				navigate("/auth");
				setTimeout(async () => {
					navigate("/");
					setPage("");
					setIsError(false);
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<section className="userCard">
			<figure className="userCard__figure">
				<img className="userCard__image" alt="user avatar" src={userLogged?.image} />
			</figure>
			<p className="userCard__welcome">{`Welcome ${userLogged?.name}!`}</p>

			<button className="userCard__disconnectButton" onClick={logoutClickHandle}>Disconnect</button>
		</section>
	);
};
