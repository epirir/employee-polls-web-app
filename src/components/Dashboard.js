import { connect } from "react-redux";
import Card from "./CardQuestion";

const Dashboard = ({ authedUser, questions, users }) => {
  const questionUnanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const questionAnswered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  return (
    <div className="container mx-auto" data-testid="heading">
      <h2 className="text-2xl text-center font-bold mt-6">New Questions</h2>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {questions.filter(questionUnanswered).map((question) => (
          <li key={question.id}>
            <Card question={question} author={users[question.author]} />
          </li>
        ))}
      </ul>
      <h2 className="text-2xl text-center font-bold mt-6">
        Answered Questions
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {questions.filter(questionAnswered).map((question) => (
          <li key={question.id}>
            <Card question={question} author={users[question.author]} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);
