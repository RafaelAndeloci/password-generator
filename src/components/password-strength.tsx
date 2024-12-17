import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export function PasswordStrength({
  length,
  lowercase,
  numbers,
  symbols,
  uppercase,
}: PasswordStrengthProps) {
  function getStrengthLevel() {
    let strengthLevel = 1;
    if (length >= 12) {
      strengthLevel++;
    }
    if (lowercase) {
      strengthLevel++;
    }
    if (numbers) {
      strengthLevel++;
    }
    if (symbols) {
      strengthLevel++;
    }
    if (uppercase) {
      strengthLevel++;
    }
    return strengthLevel;
  }

  function getLabel(): "Weak" | "Medium" | "Strong" {
    let strengthLevel = getStrengthLevel();

    if (strengthLevel <= 3) {
      return "Weak";
    }
    if (strengthLevel <= 5) {
      return "Medium";
    } else return "Strong";
  }

  const label = getLabel();
  const background =
    label === "Weak"
      ? "bg-neutral-200"
      : label === "Medium"
      ? "bg-orange-400"
      : "bg-rose-500";

  const arrLength = label === "Weak" ? 1 : label === "Medium" ? 2 : 3;

  return (
    <div className="flex items-center gap-4">
      <p className="text-white">{label}</p>
      <div className="flex items-center gap-2 min-w-10 justify-end">
        {Array.from({ length: arrLength }).map((_, index) => {
          return (
            <div
              className={cn("h-6 w-2 outline outline-white", background)}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
