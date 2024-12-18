import { useState, useEffect } from "react";

const words = [
  "apricot", 
  "dragonfruit", 
  "starfruit", 
  "lychee", 
  "longan", 
  "jackfruit", 
  "custardapple", 
  "persimmon", 
  "cantaloupe", 
  "honeydew", 
  "passionfruit", 
  "tamarind", 
  "kumquat", 
  "mulberry", 
  "gooseberry", 
  "quince", 
  "loquat", 
  "elderberry", 
  "lingonberry", 
  "redcurrant", 
  "blackcurrant", 
  "cranberry", 
  "rhubarb", 
  "damson", 
  "jambolan", 
  "clementine", 
  "calamondin", 
  "pomelo", 
  "yuzu", 
  "rambutan", 
  "satsuma"
   ];  
const HangmanLevelModerate = () => {
  const [selectedWord, setSelectedWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [correctPrediction, setCorrectPrediction] = useState(true);
  const [maxAttempts, setMaxAttempts] = useState(12);
  const [xp, setXp] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem("bestScore")) || 0;
  });

  const [usedWords, setUsedWords] = useState([]); // Track used words

  const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  const handleGuess = (letter) => {
    // Prevent guessing the same letter again
    if (guesses.includes(letter) || wrongGuesses.includes(letter)) return;

    if (selectedWord.includes(letter)) {
      setGuesses((prev) => [...prev, letter]);
      setXp((prev) => prev + 10); // Award 10 XP for a correct guess
      setScore((prev) => prev + 10); // Add to score
    } else {
      setWrongGuesses((prev) => [...prev, letter]);
      setXp((prev) => (prev > 5 ? prev - 5 : 0)); // Deduct 5 XP for a wrong guess
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
    // Reset the game state
    setGuesses([]);
    setWrongGuesses([]);
    setXp(0);

    if (isGameWon) {
      setScore((prev) => prev + 50); // Bonus for winning
      setUsedWords((prev) => [...prev, selectedWord]); // Add word to used words
    }

    // Update best score if the current score exceeds it
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score); // Store new best score in localStorage
    }
  };

  useEffect(() => {
    // Keyboard input functionality
    const handleKeyboardInput = (event) => {
      const letter = event.key.toLowerCase();
      if (letter.match(/[a-z]/) && letter.length === 1) {
        handleGuess(letter);
      }
    };

    // Add event listener on mount
    window.addEventListener("keydown", handleKeyboardInput);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, [guesses, wrongGuesses]);

  useEffect(() => {
    if (xp >= 100) {
      setLevel((prev) => prev + 1);
      setXp(0); // Reset XP after leveling up
      setMaxAttempts((prev) => prev + 1); // Increase attempts for higher levels
    }

    // Move to the next word if current word is guessed correctly
    if (isGameWon) {
      setTimeout(() => {
        // Get the next word, ensuring it has not been used before
        let nextWord;
        do {
          nextWord = words[Math.floor(Math.random() * words.length)];
        } while (usedWords.includes(nextWord));

        setSelectedWord(nextWord);
        setGuesses([]);
        setWrongGuesses([]);
      }, 1000); // Wait 1 second before moving to the next word
    }
  }, [xp, isGameWon, usedWords]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      <h1>Hangman Game</h1>
      <p>Level: {level} | XP: {xp}/100</p>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
      <p>Guess the word, one letter at a time!</p>
      <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>{getWordDisplay()}</h2>
      <p>Wrong Guesses: {wrongGuesses.join(", ")}</p>
      <p>Attempts Left: {maxAttempts - wrongGuesses.length}</p>

      {isGameOver && (
        <h3 style={{ color: "red" }}>You Lost! The word was: {selectedWord}</h3>
      )}
      {isGameWon && (
        <h2>Congratulations! You guessed the word!</h2>
      )}

      {maxAttempts > 0 && !isGameWon && !isGameOver && (
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
                    disabled={
                      guesses.includes(letter) || wrongGuesses.includes(letter)
                    }
                    style={{
                      margin: "7px",
                      width: "4rem",
                      height: "4rem",
                      fontSize: "30px",
                      background:
                        guesses.includes(letter) || wrongGuesses.includes(letter)
                          ? "#ccc"
                          : "white",
                      color: "#020202",
                      border: "none",
                      boxShadow:
                        guesses.includes(letter) || wrongGuesses.includes(letter)
                          ? "none"
                          : "5px 5px 0px gray",
                      borderRadius: "5px",
                      cursor:
                        guesses.includes(letter) || wrongGuesses.includes(letter)
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        guesses.includes(letter) || wrongGuesses.includes(letter)
                          ? 0.7
                          : 1,
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

      {(isGameOver) && (
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

export default HangmanLevelModerate ;
