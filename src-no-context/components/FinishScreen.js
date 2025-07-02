function FinishScreen({ points, totalPoints, highestScore, dispatch }) {
  const percent = Math.ceil((points / totalPoints) * 100);

  let emoji;

  if (points === totalPoints) emoji = "🥇";
  if (points < totalPoints) emoji = "🎉";
  if (points <= totalPoints - 20) emoji = "🙂";
  if (points <= totalPoints / 2) emoji = "🤨";
  if (points === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        {emoji} You scored {points} out of {totalPoints} ({percent}%)
      </p>
      <p className="highscore">
        Highest score: <strong>{highestScore}</strong>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
