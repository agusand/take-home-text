import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext.js";
import { useLoadingContext } from "../../contexts/LoadingContext.js";

export default function LoginForm() {
	const { setIsError, setIsSuccess, setPage } = useAuthContext();
	const { setIsLoading } = useLoadingContext();

	const inputs = [
		{
			nombre_campo: "email",
			place_holder: "E-mail",
			tipo_campo: "email",
			orden: 1
		},
		{
			nombre_campo: "password",
			place_holder: "Password",
			tipo_campo: "password",
			orden: 2
		},
		{
			nombre_campo: "submit",
			place_holder: "Enviar",
			tipo_campo: "submit",
			orden: 3
		}
	]

	inputs.sort((a, b) => a.orden - b.orden);

	const navigate = useNavigate();

	const formSubmitHandle = async (event) => {
		try {
			setIsLoading(true);
			event.preventDefault();

			const formData = new FormData(event.target);

			const utilData = {
				username: formData.get("email"),
				password: formData.get("password"),
			};

			const response = await axios.post("/api/auth/login", utilData);

			if (response.data.loginOk) {
				setIsSuccess(true);
				setIsLoading(false);
				setTimeout(async () => {
					navigate("/");
					setPage("");
					setIsSuccess(false);
				}, 2000);
			} else {
				setIsError(true);
				setIsLoading(false);
				setTimeout(() => {
					setIsError(false);
				}, 2000);
			}
		} catch (error) {
			setIsError(true);
			setIsLoading(false);
			setTimeout(() => {
				setIsError(false);
			}, 2000);
			console.log(error.message);
		}
	};
	return (
		<form className="loginForm" onSubmit={formSubmitHandle}>
			<fieldset className="loginForm__fieldset">
				{inputs?.map((field) => {
					return field.tipo_campo === "submit" ? (
						<button className="loginForm__button" key={field.nombre_campo} type="submit">
							{field.place_holder}
						</button>
					) : (
						<input
							className="loginForm__input"
							key={field.nombre_campo}
							name={field.nombre_campo}
							placeholder={field.place_holder}
							type={field.tipo_campo}
							required
						/>
					);
				})}
			</fieldset>

		</form>
	);
};