import { ArrowRight, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";
import { PasswordStrength } from "./components/password-strength";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import { Slider } from "./components/ui/slider";

export interface GeneratePasswordProps {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

function App() {
  function generatePassword({
    length,
    uppercase,
    numbers,
    symbols,
  }: GeneratePasswordProps) {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    const charNumbers = "0123456789";
    const charUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charSymbols = "!@#$%^&*()_+{}/?.~<>";

    let regex = "/^";
    if (uppercase) {
      regex += "(?=(.*[A-Z]){1,})";
    }

    if (uppercase) {
      charset += charUpper;
    }
    if (numbers) {
      charset += charNumbers;
    }
    if (symbols) {
      charset += charSymbols;
    }

    regex += "/gm";

    function gen() {
      let result = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        let char = charset.charAt(Math.floor(Math.random() * n));
        result += char;
      }

      return result;
    }

    let retVal = gen();
    // while (!retVal.match(regex)?.[0]) {
    //   console.log(regex);

    //   console.log(retVal);
    //   retVal = gen();
    // }

    return retVal;
  }

  async function handleCopyPassword() {
    navigator.clipboard.writeText(password);
  }

  const initialParameters = {
    length: 10,
    lowercase: true,
    numbers: true,
    symbols: true,
    uppercase: true,
  };

  const [parameters, setParameters] =
    useState<GeneratePasswordProps>(initialParameters);
  const [firstRender, setFirstRender] = useState(true);
  const [password, setPassword] = useState(generatePassword(initialParameters));

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    const genPasswd = generatePassword(parameters);
    setPassword(genPasswd);
  }, [parameters]);
  return (
    <div className="h-screen w-full bg-neutral-800 flex items-center justify-center">
      <div className="flex flex-col w-1/2 gap-6">
        <h1 className="text-neutral-300 text-center font-mono text-2xl">
          Password Generator
        </h1>
        <div className="p-6 bg-neutral-600 text-white text-3xl flex justify-between items-center">
          {password}
          <Button
            onClick={handleCopyPassword}
            variant="ghost"
            size="icon"
            className="text-emerald-500"
          >
            <Copy />
          </Button>
        </div>
        <div className="p-6 bg-neutral-600 text-white flex flex-col gap-6 justify-between items-center">
          <div className="flex items-center justify-between w-full">
            <p className="text-lg">Character lenght</p>
            <span className="text-emerald-500 text-3xl">
              {parameters.length}
            </span>
          </div>
          <Slider
            min={1}
            max={20}
            value={[parameters.length]}
            onValueChange={(e) =>
              setParameters((state) => ({ ...state, length: e[0] }))
            }
          />
          <div className="self-start">
            <Label className="cursor-pointer flex items-center gap-3">
              <Checkbox
                checked={parameters.uppercase}
                onCheckedChange={(e) =>
                  setParameters((state) => ({
                    ...state,
                    uppercase: e as boolean,
                  }))
                }
              />
              Include Uppercase Letters
            </Label>
          </div>
          <div className="self-start">
            <Label className="cursor-pointer flex items-center gap-3">
              <Checkbox
                checked={parameters.lowercase}
                onCheckedChange={(e) =>
                  setParameters((state) => ({
                    ...state,
                    lowercase: e as boolean,
                  }))
                }
              />
              Include Lowercase Letters
            </Label>
          </div>
          <div className="self-start">
            <Label className="cursor-pointer flex items-center gap-3">
              <Checkbox
                checked={parameters.numbers}
                onCheckedChange={(e) =>
                  setParameters((state) => ({
                    ...state,
                    numbers: e as boolean,
                  }))
                }
              />
              Include Numbers
            </Label>
          </div>
          <div className="self-start">
            <Label className="cursor-pointer flex items-center gap-3">
              <Checkbox
                checked={parameters.symbols}
                onCheckedChange={(e) =>
                  setParameters((state) => ({
                    ...state,
                    symbols: e as boolean,
                  }))
                }
              />
              Include Symbols
            </Label>
          </div>

          <div className="items-center justify-between bg-neutral-800 p-4 flex w-full">
            <span className="pl-4 text-neutral-400">STRENGTH</span>
            <PasswordStrength {...parameters} />
          </div>

          <div className="w-full">
            <Button
              onClick={() => setPassword(generatePassword(parameters))}
              className="w-full"
            >
              Generate <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
