import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import BackendErrorMessage from "../../components/BackendErrorMessage/BackendErrorMessage";
import { useLocalStorage } from "../../hooks/useLocalStogage";
import { UserContext } from "../../contexts/userContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession, fetchUser } from "../../store/slices/auth.slice";
import "./main.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // const [{ isLoading, response, error }, createFetchRequest] = useFetch();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const { isAuthorize, user, session_id, error, loading } = useSelector(
    (state) => state.auth
  );

  const [sessionId, setSessionId] = useLocalStorage("session_id");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = pathname === "/login";
  const pageTitle = isLogin ? "Sign In" : "Sign Up";
  const descriptionLink = isLogin ? "/register" : "/login";
  const descriptionText = isLogin ? "Need an account?" : "Have an account?";

  useEffect(() => {
    if (isAuthorize) {
      setSessionId(session_id);
      dispatch(fetchUser(session_id));
      if (user) {
        setCurrentUser(user);
        navigate("/");
      }
      // getUserDetails(session_id).then((user) => dispatch(authUser(user)));
    }
    // eslint-disable-next-line
  }, [isAuthorize, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // const user = isLogin ? { email, password } : { username, email, password };
    dispatch(
      fetchSession({
        username: "tsipherov",
        password: "ih5jA5qCykHM.x8",
        // username,
        // password,
      })
    );
  };

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
                  disabled={loading === "pending"}
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
