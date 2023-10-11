import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charectersAllowed, setCharectersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "1234567890";
    if (charectersAllowed) str += "!@#$%&*-=+";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * (str.length + 1));
      console.log(charIndex);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numbersAllowed, charectersAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // This is called the very first thing as soon as our page loads. If there are any changes made to any of the items in the dependency array, this will be run again
  useEffect(passwordGenerator, [
    length,
    numbersAllowed,
    charectersAllowed,
    passwordGenerator,
  ]);

  return (
    <>
      <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-center text-white py-2">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3 "
            readOnly
            placeholder="password"
            value={password}
            ref={passwordref}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-5 pb-3">
          <div className="flex items-center gap-x-1 ml-6 ">
            <input
              className="cursor-pointer"
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="numberInput"
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label>Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="charInput"
              onChange={() => setCharectersAllowed((prev) => !prev)}
            />
            <label>Include CHaracters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
