// import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
  const { status, questions, index } = useQuiz();
  // const SECS_PER_QUESTION = 30;

  // const initialState = {
  //   questions: [],

  //   //loading, error, ready, active, finished
  //   status: "loading",

  //   //Question Number
  //   index: 0,

  //   //index of given answer
  //   answer: null,
  //   points: 0,
  //   highestScore: 0,
  //   timeLeft: null,
  // };

  // function reducer(state, action) {
  //   switch (action.type) {
  //     case "dataRecieved":
  //       return {
  //         ...state,
  //         questions: action.payload,
  //         status: "ready",
  //       };

  //     case "dataFailed":
  //       return {
  //         ...state,
  //         status: "error",
  //       };

  //     case "start":
  //       return {
  //         ...state,
  //         status: "active",
  //         timeLeft: state.questions?.length * SECS_PER_QUESTION,
  //       };

  //     case "newAnswer":
  //       const question = state.questions.at(state.index);

  //       return {
  //         ...state,
  //         answer: action.payload,
  //         points:
  //           question.correctOption === action.payload
  //             ? state.points + question.points
  //             : state.points,
  //       };

  //     case "nextQuestion":
  //       return {
  //         ...state,
  //         index: state.index + 1,
  //         answer: null,
  //       };

  //     case "finish":
  //       const isHigher = state.highestScore < state.points;
  //       return {
  //         ...state,
  //         status: "finished",
  //         highestScore: isHigher ? state.points : state.highestScore,
  //       };

  //     case "restart":
  //       return {
  //         ...state,
  //         status: "ready",
  //         index: 0,
  //         points: 0,
  //         answer: null,
  //         timeLeft: 10,
  //       };

  //     case "tick":
  //       return {
  //         ...state,
  //         timeLeft: state.timeLeft - 1,
  //         status: state.timeLeft <= 0 ? "finished" : state.status,
  //       };

  //     default:
  //       throw new Error("Unknown action type");
  //   }
  // }

  // const [state, dispatch] = useReducer(reducer, initialState);

  // const { questions, status, index, answer, points, highestScore, timeLeft } =
  //   state;

  // const numOfQuestions = questions?.length;
  // const totalPoints = state.questions?.reduce(
  //   (acc, question) => acc + question?.points,
  //   0
  // );

  // useEffect(function () {
  //   async function handleFetch() {
  //     try {
  //       const res = await fetch("http://localhost:9000/questions");

  //       const data = await res.json();
  //       dispatch({ type: "dataRecieved", payload: data });
  //     } catch (err) {
  //       dispatch({ type: "dataFailed" });
  //     }
  //   }

  //   handleFetch();
  // }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question question={questions[index]} />
            <Footer>
              <Timer />
              <Button />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
