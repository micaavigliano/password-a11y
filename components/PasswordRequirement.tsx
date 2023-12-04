import React, {
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
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
}

const PasswordRequirements: React.FC<RequirementsProps> = ({
  requirement,
  password,
  setAllChecked,
  idInput,
}) => {
  const isArray = Array.isArray(requirement);
  const uniqueReq = !isArray && password.match(requirement.matchRegex);

  const checkIfAllAreChecked = useCallback(
    (requirement: Requirement[] | Requirement) => {
      if (Array.isArray(requirement)) {
        requirement.forEach((req: Requirement) => {
          const matchResult = password?.match(req.matchRegex);
          setAllChecked(true);

          if (!matchResult) {
            setAllChecked(false);
          }
        });
      }

      if (uniqueReq) {
        setAllChecked(true);
      } else {
        setAllChecked(false);
      }
    },
    [password, setAllChecked, uniqueReq]
  );

  useEffect(() => {
    checkIfAllAreChecked(requirement);
  }, [password, checkIfAllAreChecked, requirement]);

  return (
    <div data-testid="requirement-id" className="my-4">
      {isArray ? (
        requirement.map((req: Requirement) => (
          <div
            key={req.id}
            role="status"
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
        ))
      ) : (
        <div data-testid="text-container">
          <div role="status" className="flex flex-row gap-2 items-center">
            <div
              data-testid="icon-container"
              className={uniqueReq ? `text-green-500` : `text-red-500`}
            >
              {uniqueReq ? <CheckCircle /> : <Cancel />}
            </div>
            <>
              {!uniqueReq && (
                <div
                  aria-live="assertive"
                  data-testid="hidden-msg"
                  className="overflow-hidden hidden"
                >
                  {requirement.error}
                </div>
              )}
            </>
            <p className={uniqueReq ? `text-green-500` : `text-red-500`}>
              {requirement.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordRequirements;
