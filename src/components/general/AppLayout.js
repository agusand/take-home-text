import { AuthContextProvider } from "../../contexts/AuthContext.js";
import { LoadingContextProvider, useLoadingContext } from "../../contexts/LoadingContext.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Loading from "./Loading.js";

function AppLayout({ children }) {
	const { isLoading } = useLoadingContext();

	return (
		<>
			<Header />
			<AuthContextProvider>
				<Main>{children}</Main>
			</AuthContextProvider>

			{isLoading ? <Loading /> : null}
		</>
	);
};

export default function AppWrapper({ children }) {
	return (
		<LoadingContextProvider>
			<AppLayout>{children}</AppLayout>
		</LoadingContextProvider>
	);
};