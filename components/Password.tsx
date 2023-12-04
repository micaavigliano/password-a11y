"use client";

import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordRequirements from "./PasswordRequirement";
import { requirementsArray, testRequirement } from "../helpers/requirements";

const PasswordComponent = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [password, setPassword] = useState<string | null>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="m-auto flex flex-col items-center">
      <h1>Componente accesible para validar contraseñas</h1>
      <form onSubmit={handleSubmit} id="form-id" className="py-2">
        <label htmlFor="password-input-id">Password</label>
        <div className="rounded-full border-solid border-2 border-white px-3 py-1">
          <input
            type={seePassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            autoComplete="off"
            aria-label="type your password"
            className="text-white bg-transparent placeholder:text-slate-400"
            id="password-input-id"
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
          requirement={testRequirement}
          password={password!}
          setAllChecked={setAllChecked}
        />
        <button
          type="submit"
          className={`rounded-full border-solid border-2 border-white px-3 py-1 mt-3 ${
            !allChecked ? "bg-gray-300 text-gray-400" : "bg-transparent"
          }`}
          disabled={!allChecked}
        >
          Log in
        </button>
      </form>
    </section>
  );
};

export default PasswordComponent;
