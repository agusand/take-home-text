import AuthMessage from "../components/auth/AuthMessage.js";
import LoginForm from "../components/auth/LoginForm.js";
import RegisterForm from "../components/auth/RegisterForm.js";

import { useAuthContext } from "../contexts/AuthContext.js";

export default function Auth() {
    const { isError, isSuccess, page, setPage } = useAuthContext();

    const loginTitleClickHandle = () => {
        if (page === "login") {
            setPage("");
        } else {
            setPage("login");
        }
    };
    const signUpTitleClickHandle = () => {
        if (page === "signup") {
            setPage("");
        } else {
            setPage("signup");
        }
    };

    return (
        <div>
            <section>
                {!isError && !isSuccess ? (
                    <article className="mainWrapper">
                        {page === "login" || page === "" ? (
                            <h2 onClick={loginTitleClickHandle}>Sign in</h2>
                        ) : null}
                        {page === "signup" || page === "" ? (
                            <h2 onClick={signUpTitleClickHandle}>Sign up</h2>
                        ) : null}
                        {page === "login" ? (
                            <LoginForm />
                        ) : null}
                        {page === "signup" ? (
                            <RegisterForm />
                        ) : null}
                    </article>
                ) : null}
                {isError || isSuccess ? (
                    <article className="messageWrapper">
                        <AuthMessage
                            data={{
                                successfullyLoggedIn: "Successfully logged in",
                                successfullyRegistered: "Successfully registered",
                                successfullyLoggedOut: "Successfully logged out",
                                failedToLogIn: "Failed to log in",
                                failedToRegister: "Failed to register",
                                failedToLogOut: "Failed to log out",
                            }}
                        />
                    </article>
                ) : null}
            </section>
        </div>
    );
}