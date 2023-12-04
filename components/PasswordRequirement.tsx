import React, {
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import clsx from "clsx";
import { Cancel, CheckCircle, RadioButtonChecked } from "@mui/icons-material";

interface RequirementsProps {
  requirement: Requirement | Requirement[];
  password: string;
  setIsDirty: Dispatch<SetStateAction<boolean | null>>;
  id: string;
  idInput: string;
  isDirty: boolean | null;
}

interface Requirement {
  id: number;
  text: string;
  matchRegex: RegExp;
  error?: string;
}

const PasswordRequirements: React.FC<RequirementsProps> = ({
  requirement,
  password,
  setIsDirty,
  idInput,
  isDirty,
}) => {
  const isArray = Array.isArray(requirement);

  const checkIfAllAreChecked = useCallback(
    (requirement: Requirement[] | Requirement) => {
      if (Array.isArray(requirement)) {
        requirement.forEach((req: Requirement) => {
          const matchResult = password?.match(req.matchRegex);
          setIsDirty(true);

          if (!matchResult) {
            setIsDirty(false);
          }
        });
      }
    },
    [password, setIsDirty]
  );

  useEffect(() => {
    checkIfAllAreChecked(requirement);
  }, [password, checkIfAllAreChecked, requirement, setIsDirty]);

  useEffect(() => {
    setIsDirty(null);
  }, [setIsDirty]);

  return (
    <div data-testid="requirement-id" className="my-4">
      {isArray &&
        requirement.map((req: Requirement) => (
          <div
            key={req.id}
            data-testid="text-container"
            className="flex flex-row gap-2 items-center"
          >
            {isDirty === null ? (
              <div className="text-gray-500">
                <RadioButtonChecked />
              </div>
            ) : (
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
            )}
            {isDirty === null ? (
              <p className="text-gray-500" aria-live="polite" id={idInput}>
                {req.text}
              </p>
            ) : (
              <>
                <p
                  className={
                    password.match(req.matchRegex)
                      ? `text-green-500`
                      : `text-red-500`
                  }
                  id={idInput}
                >
                  {req.text}
                </p>
              </>
            )}
            {!password.match(req.matchRegex) && (
              <div
                role="alert"
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
