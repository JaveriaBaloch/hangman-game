import { useState } from "react";

const words = ["javascript", "nextjs", "react", "hangman", "coding"];

const Hangman = () => {
  const [selectedWord, setSelectedWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [maxAttempts, setMaxAttempts] = useState(6);

  const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  const handleGuess = (letter) => {
    if (guesses.includes(letter) || wrongGuesses.includes(letter)) return;

    if (selectedWord.includes(letter)) {
      setGuesses([...guesses, letter]);
    } else {
      setWrongGuesses([...wrongGuesses, letter]);
    }
  };

  const getWordDisplay = () => {
    return selectedWord
      .split("")
      .map((letter) => (guesses.includes(letter) ? letter : "_"))
      .join(" ");
  };

  const isGameOver = wrongGuesses.length >= maxAttempts;
  const isGameWon = selectedWord.split("").every((letter) => guesses.includes(letter));

  const resetGame = () => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuesses([]);
    setWrongGuesses([]);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", color:'white' }}>
      <h1>Hangman Game</h1>
      <p>Guess the word, one letter at a time!</p>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>{getWordDisplay()}</h2>
      <p>Wrong Guesses: {wrongGuesses.join(", ")}</p>
      <p>Attempts Left: {maxAttempts - wrongGuesses.length}</p>

      {isGameOver && <h3 style={{ color: "red" }}>You Lost! The word was: {selectedWord}</h3>}
      {isGameWon && <h3 style={{ color: "green" }}>Congratulations! You guessed the word!</h3>}

      {!(isGameOver || isGameWon) && (
        <div>
          <h3>Pick a letter:</h3>
          <div style={{ display: "inline-block", marginTop: "20px" }}>
            {keyboardLayout.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                {row.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={guesses.includes(letter) || wrongGuesses.includes(letter)}
                    style={{
                      margin: "7px",
                      width:"4rem",
                      height:'4rem',
                      fontSize: "30px",
                      background: guesses.includes(letter) || wrongGuesses.includes(letter) ? "#ccc" : "white",
                      color: "#020202",
                      border: "none",
                      boxShadow:guesses.includes(letter) || wrongGuesses.includes(letter) ?'none': '5px 5px 0px gray',
                      borderRadius: "5px",
                      cursor: guesses.includes(letter) || wrongGuesses.includes(letter) ? "not-allowed" : "pointer",
                      opacity: guesses.includes(letter) || wrongGuesses.includes(letter) ? 0.7 : 1,
                      transition: "background 0.3s, transform 0.2s",
                    }}
                    onMouseDown={(e) => {
                      e.target.style.transform = "scale(0.9)";
                    }}
                    onMouseUp={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {(isGameOver || isGameWon) && (
        <button
          onClick={resetGame}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#005bb5";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#0070f3";
          }}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default Hangman;
