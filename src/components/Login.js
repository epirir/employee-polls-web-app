import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../actions/authedUser";

const Login = ({ dispatch, loggedIn }) => {
  const [username, setUsername] = useState("sarahedo");
  const [password, setPassword] = useState("password123");

  if (loggedIn) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirectToUrl = urlSearchParams.get("redirectTo");
    return <Navigate to={redirectToUrl ? redirectToUrl : "/"} />;
  }

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div className="bg-white shadow p-12 mt-32 max-w-sm mx-auto rounded">
      <h1
        className="text-3xl font-bold mt-9 text-center"
        data-testid="login-heading"
      >
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-700"
          >
            Username
          </label>
          <div className="mt-1">
            <input
              value={username}
              onChange={onChangeUsername}
              type="text"
              name="username"
              id="username"
              data-testid="username"
              placeholder="Type username..."
              className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-500 rounded border focus:border-teal-500 placeholder-italic"
            />
          </div>
        </div>
        <div className="mt-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              value={password}
              onChange={onChangePassword}
              type="password"
              name="password"
              id="password"
              data-testid="password"
              placeholder="Type password..."
              className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-500 rounded border focus:border-teal-500 placeholder-italic"
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            data-testid="submit"
            className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: Boolean(authedUser),
});

export default connect(mapStateToProps)(Login);
