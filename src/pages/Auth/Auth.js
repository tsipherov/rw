import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import BackendErrorMessage from "../../components/BackendErrorMessage/BackendErrorMessage";
import { useLocalStorage } from "../../hooks/useLocalStogage";
import "./main.css";
import { UserContext } from "../../contexts/userContext";
import { authSessionId, authUser } from "../../store/actions/auth.actions";
import { useDispatch } from "react-redux";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSaccessSubmit, setIsSaccessSubmit] = useState(false);
  const [currentUser, setCurrentUser, getUserDetails] = useContext(UserContext);
  const [token, setToken] = useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLogin = pathname === "/login";
  const pageTitle = isLogin ? "Sign In" : "Sign Up";
  const descriptionLink = isLogin ? "/register" : "/login";
  const descriptionText = isLogin ? "Need an account?" : "Have an account?";
  const [sessionId, setSessionId] = useLocalStorage("session_id");

  const [{ isLoading, response, error }, createFetchRequest] = useFetch();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading && !response && !error)
      createFetchRequest("getAuthentication");
    if (response?.request_token) {
      setToken(response.request_token);
    }
    if (!error && response?.validateLogin) {
      createFetchRequest(
        "createSession",
        [],
        {
          request_token: token,
        },
        "POST"
      );
    }
    if (response?.session_id) {
      dispatch(authSessionId(response.session_id));
      setSessionId(response.session_id);
    }
    if (sessionId) {
      getUserDetails(sessionId).then((user) => dispatch(authUser(user)));
      navigate("/");
    }
    // eslint-disable-next-line
  }, [response, error, isLoading]);

  const submitHandler = (e) => {
    e.preventDefault();

    // const user = isLogin ? { email, password } : { username, email, password };

    createFetchRequest(
      "validateLogin",
      [],
      {
        username: "tsipherov",
        password: "ih5jA5qCykHM.x8",
        // username,
        // password,
        request_token: token,
      },
      "POST"
    );
  };

  if (isSaccessSubmit) {
  }

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
              {error && <BackendErrorMessage backendError={error} />}
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                  />
                </fieldset>

                <fieldset className="form-group">
                  {!isLogin && (
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  )}
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
                    required
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
