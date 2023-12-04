import React, {
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import clsx from "clsx";
import { Cancel, CheckCircle } from "@mui/icons-material";

interface RequirementsProps {
  requirement: Requirement | Requirement[];
  password: string;
  setAllChecked: Dispatch<SetStateAction<boolean>>;
  id: string;
  idInput: string;
}

interface Requirement {
  id: number;
  text: string;
  matchRegex: RegExp;
  error?: string;
  initialState: boolean;
}

const PasswordRequirements: React.FC<RequirementsProps> = ({
  requirement,
  password,
  setAllChecked,
  idInput,
}) => {
  const isArray = Array.isArray(requirement);
  const [requirementState, setRequirementState] = useState(false);

  const updateState = useCallback(() => {
    setRequirementState(true);
  }, []);

  const checkIfAllAreChecked = useCallback(
    (requirement: Requirement[] | Requirement) => {
      if (Array.isArray(requirement)) {
        requirement.forEach((req: Requirement) => {
          const matchResult = password?.match(req.matchRegex);
          setAllChecked(true);
          updateState();

          if (!matchResult) {
            setAllChecked(false);
            updateState();
          }
        });
      }
    },
    [password, setAllChecked, updateState]
  );

  useEffect(() => {
    checkIfAllAreChecked(requirement);
  }, [password, checkIfAllAreChecked, requirement]);

  return (
    <div data-testid="requirement-id" className="my-4">
      {isArray &&
        requirement.map((req: Requirement) => (
          <div
            key={req.id}
            role="status"
            aria-live="assertive"
            data-testid="text-container"
            className="flex flex-row gap-2 items-center"
          >
            <div
              data-testid="icon-container"
              className={
                password.match(req.matchRegex)
                  ? `text-green-500`
                  : `text-red-500`
              }
            >
              {password.match(req.matchRegex) ? <CheckCircle /> : <Cancel />}
            </div>
            <p
              className={
                password.match(req.matchRegex)
                  ? `text-green-500`
                  : `text-red-500`
              }
              aria-describedby={idInput}
            >
              {req.text}
            </p>
            {!password.match(req.matchRegex) && (
              <div
                role="status"
                aria-live="assertive"
                data-testid="hidden-msg"
                className="overflow-hidden hidden"
              >
                {req.error}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default PasswordRequirements;
