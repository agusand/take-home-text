import { AuthContextProvider } from "../../contexts/AuthContext.js";
import { LoadingContextProvider, useLoadingContext } from "../../contexts/LoadingContext.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Loading from "./Loading.js";

import { CommitPageContextProvider } from "../../contexts/CommitPageContext.js";

function AppLayout({ children }) {
	const { isLoading } = useLoadingContext();

	return (
		<>
			<Header />
			<AuthContextProvider>
				<CommitPageContextProvider>
					<Main>{children}</Main>
				</CommitPageContextProvider>
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