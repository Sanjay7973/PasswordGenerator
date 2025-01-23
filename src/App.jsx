import { useEffect, useState, useCallback,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [bothAllowed, setBothAllowed] = useState(false);


  const passwordRef = useRef()

  // Password Generator
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (characterAllowed) str += "!#$%^&*@-+*[]{}=_-";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  // Regenerate password when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  // Handle "Both" checkbox change
  const handleBothChange = () => {
    const newBothState = !bothAllowed;
    setBothAllowed(newBothState);
    setNumberAllowed(newBothState);
    setCharacterAllowed(newBothState);
  };

  // Handle "Numbers" checkbox change
  const handleNumberChange = () => {
    const newNumberState = !numberAllowed;
    setNumberAllowed(newNumberState);

    // Auto-check "Both" if both are enabled
    if (newNumberState && characterAllowed) {
      setBothAllowed(true);
    } else {
      setBothAllowed(false);
    }
  };

  // Handle "Characters" checkbox change
  const handleCharacterChange = () => {
    const newCharacterState = !characterAllowed;
    setCharacterAllowed(newCharacterState);

    // Auto-check "Both" if both are enabled
    if (newCharacterState && numberAllowed) {
      setBothAllowed(true);
    } else {
      setBothAllowed(false);
    }
  };

  // copy btn handler
  const copyBtnHandler =()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  return (
    <div className="w-full rounded-lg max-w-xl px-4 py-3 my-8 mx-auto bg-gray-700 text-orange-500">
      <h1 className="text-2xl text-white text-center">Password Generator</h1>
      <div className="mt-5 flex overflow-hidden mb-4">
        <input
          className="w-full py-1 px-3 outline-none rounded"
          type="text"
          value={password}
          ref={passwordRef}
          readOnly
        />
        <button
          className="bg-blue-600 py-0.5 px-3 hover:bg-blue-700 rounded shrink-0 text-white"
          onClick={copyBtnHandler}
        >
          Copy
        </button>
      </div>
      <div className=" grid md:flex gap-x-2 text-lg">
        <div className="flex gap-x-1 items-center">
          <input
            className="cursor-pointer"
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex gap-x-1">
          <input
            type="checkbox"
            checked={bothAllowed}
            onChange={handleBothChange}
            id="bothCheckId"
          />
          <label htmlFor="bothCheckId">Both</label>
        </div>
        <div className="flex gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={handleNumberChange}
            id="numberCheckId"
          />
          <label htmlFor="numberCheckId">Numbers</label>
        </div>
        <div className="flex gap-x-1">
          <input
            type="checkbox"
            checked={characterAllowed}
            onChange={handleCharacterChange}
            id="characterCheckId"
          />
          <label htmlFor="characterCheckId">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
