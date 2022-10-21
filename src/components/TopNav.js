import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";

const TopNav = ({ dispatch, authedUserId, authedUserAvatarURL }) => {
  const logout = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
  };

  return (
    <nav className="flex justify-center space-x-4">
      <Link
        to="/"
        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        Home
      </Link>
      <Link
        to="/leaderboard"
        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        Leaderboard
      </Link>
      <Link
        to="/new"
        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        New
      </Link>
      <div className="m-1 mr-2 w-7 h-7 relative flex justify-center items-center rounded-full bg-gray-500">
        <img src={authedUserAvatarURL} className="rounded-full" alt=""></img>
        <div className="absolute right-0 bottom-0 w-2 h-2 rounded-full bg-green-500"></div>
      </div>
      <span
        className="font-medium px-1 py-2 text-slate-700"
        data-testid="user-information"
      >
        {authedUserId}
      </span>
      <button
        onClick={logout}
        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        Logout
      </button>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUserId: authedUser.id,
  authedUserAvatarURL: authedUser.avatarURL,
});

export default connect(mapStateToProps)(TopNav);
