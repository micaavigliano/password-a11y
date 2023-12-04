"use client";

import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordRequirements from "./PasswordRequirement";
import { requirementsArray, testRequirement } from "../helpers/requirements";

const PasswordComponent = () => {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [password, setPassword] = useState<string | null>("");
  const [isDirty, setIsDirty] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="m-auto flex flex-col items-center rounded-md border-solid border-2 border-white p-6 box-border">
      <h1 aria-describedby="must-have">La contraseña debe tener:</h1>
      <div
        id="must-have"
        data-testid="hidden-msg"
        className="overflow-hidden hidden"
      >
        <ul>
          {requirementsArray.map((req) => (
            <li key={req.id}>{req.text}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} id="form-id" className="py-2">
        <label htmlFor="password-input-id">Password</label>
        <div
          className="rounded-full border-solid border-2 border-white px-3 py-1 flex flex-row justify-between"
          aria-label="this component include an input and a button to see the password"
        >
          <input
            type={seePassword ? "text" : "password"}
            onChange={(e) => {
              const newPassword = e.target.value;
              if (newPassword !== "") {
                setPassword(newPassword);
              } else if (newPassword === "") {
                setIsDirty(null);
              }
            }}
            placeholder="Type your password"
            autoComplete="new-password"
            aria-label="type your password"
            className="text-white bg-transparent placeholder:text-slate-400"
            id="password-input-id"
            aria-describedby="password-requirement"
            required
          />
          <button
            onClick={() => {
              setSeePassword(!seePassword);
            }}
            role="switch"
            aria-checked={seePassword}
            aria-label={
              seePassword ? `esconder contraseña` : `mostrar contraseña`
            }
          >
            {seePassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>
        <PasswordRequirements
          id="password-requirement"
          idInput="password-input-id"
          requirement={requirementsArray}
          password={password!}
          setIsDirty={setIsDirty}
          isDirty={isDirty}
        />

        <button
          type="submit"
          className={`rounded-full border-solid border-2 border-white px-3 py-1 mt-3 ${
            !isDirty ? "bg-gray-300 text-gray-400" : "bg-transparent"
          }`}
          disabled={!isDirty}
        >
          Log in
        </button>
      </form>
    </section>
  );
};

export default PasswordComponent;
