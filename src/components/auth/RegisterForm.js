import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext.js";
import { useLoadingContext } from "../../contexts/LoadingContext.js";

export default function RegisterForm() {
	const { setIsError, setIsSuccess, setPage } = useAuthContext();
	const { setIsLoading } = useLoadingContext();
	const [imageInput, setImageInput] = useState("");

	const inputs = [
		{
			nombre_campo: "name",
			place_holder: "Nombre",
			tipo_campo: "text",
			orden: 1
		},
		{
			nombre_campo: "address",
			place_holder: "Dirección",
			tipo_campo: "text",
			orden: 2
		},
		{
			nombre_campo: "age",
			place_holder: "Edad",
			tipo_campo: "text",
			orden: 3
		},
		{
			nombre_campo: "phone",
			place_holder: "Teléfono",
			tipo_campo: "text",
			orden: 4
		},
		{
			nombre_campo: "email",
			place_holder: "E-mail",
			tipo_campo: "email",
			orden: 5
		},
		{
			nombre_campo: "password",
			place_holder: "Contraseña",
			tipo_campo: "password",
			orden: 6
		},
		{
			nombre_campo: "image",
			place_holder: "URL de imagen",
			tipo_campo: "file",
			orden: 7
		},
		{
			nombre_campo: "submit",
			place_holder: "Enviar",
			tipo_campo: "submit",
			orden: 8
		}
	]

	inputs.sort((a, b) => a.orden - b.orden);

	const navigate = useNavigate();

	const inputFileChangeHandle = (event) => {
		setImageInput(event.target?.files[0]?.name);
	};

	const formSubmitHandle = async (event) => {
		try {
			setIsLoading(true);
			event.preventDefault();
			const formData = new FormData(event.target);
			formData.append("extension", imageInput.slice(-4));

			const utilData = {
				name: formData.get("name"),
				address: formData.get("address"),
				age: formData.get("age"),
				phone: formData.get("phone"),
				username: formData.get("email"),
				password: formData.get("password"),
				image: formData.get("image"),
			};

			const uploadResponse = await axios.post("/api/users/upload", formData, {
				headers: {
					contentType: "multipart/form-data",
				},
			});

			if (uploadResponse.status === 200) {
				const signUpResponse = await axios.post("/api/auth/signup", utilData);
				if (signUpResponse.data.signupOk) {
					setIsLoading(false);
					setIsSuccess(true);
					setTimeout(async () => {
						navigate("/");
						setPage("");
						setIsSuccess(false);
					}, 2000);
					return true;
				}
			}

			setIsLoading(false);
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 2000);
		} catch (error) {
			setIsLoading(false);
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 2000);
			console.log(error.message);
		}
	};
	return (
		<form onSubmit={formSubmitHandle}>
			<fieldset>
				{inputs?.map((field) => {
					return field.tipo_campo === "submit" ? (
						<button key={field.nombre_campo} type="submit">
							{field.place_holder}
						</button>
					) : (
						<div key={field.nombre_campo}>
							<input
								name={field.nombre_campo}
								placeholder={field.place_holder}
								type={field.tipo_campo}
								multiple={field.tipo_campo === "file" ? false : null}
								id={field.nombre_campo}
								onChange={
									field.tipo_campo === "file" ? inputFileChangeHandle : null
								}
								required
							/>
							{field.tipo_campo === "file" ? (
								<label htmlFor={field.nombre_campo}>
									{imageInput || "Imágen"}
								</label>
							) : null}
						</div>
					);
				})}
			</fieldset>

		</form>
	);
};