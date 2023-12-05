import React, {
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { Cancel, CheckCircle, RadioButtonChecked } from "@mui/icons-material";

interface RequirementsProps {
  requirement: Requirement[];
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
  const [total, setTotal] = useState(requirement.length);

  const unfulfilledRequirements = requirement.filter(
    (req) => !password.match(req.matchRegex)
  ).length;

  const checkIfAllAreChecked = useCallback(
    (requirement: Requirement[]) => {
      let fulfilledRequirements = 0;
      if (Array.isArray(requirement)) {
        requirement.forEach((req: Requirement) => {
          const matchResult = password?.match(req.matchRegex);
          setIsDirty(true);
          if (matchResult) {
            fulfilledRequirements++;
          }
        });
        setTotal(requirement.length - fulfilledRequirements);
      }
    },
    [password, setIsDirty]
  );

  useEffect(() => {
    checkIfAllAreChecked(requirement);
    setIsDirty(unfulfilledRequirements === 0);
  }, [
    password,
    checkIfAllAreChecked,
    requirement,
    setIsDirty,
    unfulfilledRequirements,
  ]);

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
                >
                  {req.text}
                </p>
              </>
            )}
            {!password.match(req.matchRegex) && (
              <div
                role="alert"
                aria-live="assertive"
                data-testid="hidden-msg"
                className="overflow-hidden hidden"
              >
                {req.error}
              </div>
            )}
          </div>
        ))}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="absolute w-1 h-1 -m-1 overflow-hidden clip-hidden"
        id={idInput}
      >
        <div>
          {total === 0 ? (
            <p>tu contrasenia esta lista!</p>
          ) : (
            <p>
              {total} requirements out of {requirement.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordRequirements;
