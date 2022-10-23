import { connect } from "react-redux";

const Leaderboard = ({ users, questions }) => {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-9">Leaderboard</h1>
      <table className="border-collapse table-auto w-full text-sm mt-6">
        <thead className="table-header-group">
          <tr className="table-row">
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">
              User
            </th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">
              Answered
            </th>
            <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-b border-slate-100 dark:border-slate-300 p-4 pl-8">
                <span className="font-bold">{user.name}</span>
                <br />
                {user.id}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-300 p-4 pl-8">
                {Object.keys(user.answers).length}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-300 p-4 pl-8">
                {
                  questions.filter((question) => question.author === user.id)
                    .length
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users, questions }) => ({
  users: Object.values(users).sort(
    (a, b) =>
      Object.keys(b.questions).length +
      Object.keys(b.answers).length -
      (Object.keys(a.questions).length + Object.keys(a.answers).length)
  ),

  questions: Object.values(questions),
});

export default connect(mapStateToProps)(Leaderboard);
