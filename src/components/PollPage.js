import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import "./PollPage.css";
import Error404 from "./NotFound404";

const PollPage = ({ dispatch, authedUser, question, author }) => {
  if (!authedUser || !question || !author) {
    return <Error404 />;
  }

  const selectedOptionOne = question.optionOne.votes.includes(authedUser.id);
  const selectedOptionTwo = question.optionTwo.votes.includes(authedUser.id);
  const hasSelected = selectedOptionOne || selectedOptionTwo;

  const onClickOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionOne"));
  };

  const onClickOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionTwo"));
  };

  const getPercentage = (option, question) => {
    const totalVotes =
      question.optionOne.votes.length + question.optionTwo.votes.length;

    return `${Math.trunc(
      (question[option].votes.length / totalVotes) * 100
    )} %`;
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-9">
        Poll by {author.id}
      </h1>

      <div className="flex justify-center">
        <img src={author.avatarURL} alt="Profile" className="h-24 w-24" />
      </div>

      <div className="flex justify-center">
        <h2 className="text-2xl font-bold mt-6">Would you rather?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={onClickOptionOne}
          disabled={hasSelected}
          className={`p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition
            ${selectedOptionOne ? "bg-lime-400" : ""}`}
        >
          <div className={selectedOptionOne ? "chosen" : ""}>
            <p className="font-bold mb-2">{question.optionOne.text}</p>
            {!hasSelected && (
              <p className="underline underline-offset-4 mb-3 text-green-500">
                Click
              </p>
            )}
            {hasSelected && (
              <p className="text-xs">
                Votes: {question.optionOne.votes.length} (
                {getPercentage("optionOne", question)})
              </p>
            )}
          </div>
        </button>

        <button
          onClick={onClickOptionTwo}
          disabled={hasSelected}
          className={
            "p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " +
            (selectedOptionTwo ? "bg-lime-400" : "")
          }
        >
          <p className="font-bold mb-2">{question.optionTwo.text}</p>
          {!hasSelected && (
            <p className="underline underline-offset-4 mb-3 text-green-500">
              Click
            </p>
          )}
          {hasSelected && (
            <p className="text-xs">
              Votes: {question.optionTwo.votes.length} (
              {getPercentage("optionTwo", question)})
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  try {
    const question = Object.values(questions).find(
      (question) => question.id === useParams().id
    );
    const author = Object.values(users).find(
      (user) => user.id === question.author
    );

    return { authedUser, question, author };
  } catch (e) {
    return <Error404 />;
  }
};

export default connect(mapStateToProps)(PollPage);
