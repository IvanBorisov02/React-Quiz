import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
function QuizProvider({ children }) {
  const SECS_PER_QUESTION = 30;

  const initialState = {
    questions: [],

    //loading, error, ready, active, finished
    status: "loading",

    //Question Number
    index: 0,

    //index of given answer
    answer: null,
    points: 0,
    highestScore: 0,
    timeLeft: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataRecieved":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };

      case "dataFailed":
        return {
          ...state,
          status: "error",
        };

      case "start":
        return {
          ...state,
          status: "active",
          timeLeft: state.questions?.length * SECS_PER_QUESTION,
        };

      case "newAnswer":
        const question = state.questions.at(state.index);

        return {
          ...state,
          answer: action.payload,
          points:
            question.correctOption === action.payload
              ? state.points + question.points
              : state.points,
        };

      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };

      case "finish":
        const isHigher = state.highestScore < state.points;
        return {
          ...state,
          status: "finished",
          highestScore: isHigher ? state.points : state.highestScore,
        };

      case "restart":
        return {
          ...state,
          status: "ready",
          index: 0,
          points: 0,
          answer: null,
          timeLeft: 10,
        };

      case "tick":
        return {
          ...state,
          timeLeft: state.timeLeft - 1,
          status: state.timeLeft <= 0 ? "finished" : state.status,
        };

      default:
        throw new Error("Unknown action type");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer, points, highestScore, timeLeft } =
    state;

  const numOfQuestions = questions?.length;
  const totalPoints = state.questions?.reduce(
    (acc, question) => acc + question?.points,
    0
  );

  useEffect(function () {
    async function handleFetch() {
      try {
        const res = await fetch("http://localhost:9000/questions");

        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    handleFetch();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        dispatch,
        questions,
        status,
        numOfQuestions,
        index,
        points,
        totalPoints,
        answer,
        highestScore,
        timeLeft,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("You're outside the QuizProvider");
  }
  return context;
}
export { QuizProvider, useQuiz };
