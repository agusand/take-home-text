import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [page, setPage] = useState("");
	const [userLogged, setUserLogged] = useState({});

	return (
		<AuthContext.Provider
			value={{
				isError,
				setIsError,
				isSuccess,
				setIsSuccess,
				page,
				setPage,
				userLogged,
				setUserLogged,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
