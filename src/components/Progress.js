import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, numOfQuestions, points, totalPoints, answer } = useQuiz();

  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question {index + 1} / {numOfQuestions}
      </p>
      <p>
        {points} / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
