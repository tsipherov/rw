import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
// import { UserContext } from "../../contexts/userContext";
import BackendErrorMessage from "../../components/BackendErrorMessage/BackendErrorMessage";
import "./main.css";
import { useLocalStorage } from "../../hooks/useLocalStogage";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSaccessSubmit, setIsSaccessSubmit] = useState(false);
  // const [currentUser, setCurrentUser] = useContext(UserContext);
  // console.log("currentUser: ", currentUser);

  const { pathname } = useLocation();
  console.log("pathname >>> ", pathname);
  const navigate = useNavigate();

  const isLogin = pathname === "/login";
  const pageTitle = isLogin ? "Sign In" : "Sign Up";
  const descriptionLink = isLogin ? "/register" : "/login";
  const descriptionText = isLogin ? "Need an account?" : "Have an account?";
  const apiUrl = isLogin ? "/users/login" : "/users";

  const [{ isLoading, response, error }, createFetchOptions] = useFetch(apiUrl);
  const [token, setToken] = useLocalStorage("token");

  useEffect(() => {
    if (!response) return;
    console.log("response >>> ", response);
    setToken(response.request_token);
    setIsSaccessSubmit(true);
    // setCurrentUser((state) => {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isLogedIn: true,
    //     currentUser: response,
    //   };
    // });
  }, [response, setToken, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    // const user = isLogin ? { email, password } : { username, email, password };

    // createFetchOptions({
    //   method: "POST",
    //   data: {
    //     user,
    //   },
    // });
  };

  // if (isSaccessSubmit) {
  //   return navigate("/");
  // }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={submitHandler}>
              {error && <BackendErrorMessage backendError={error.errors} />}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Your Name"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
