"use client";

import React, { useState, useRef, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordRequirements from "./PasswordRequirement";
import { requirementsArray, testRequirement } from "../helpers/requirements";

const PasswordComponent = () => {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string | null>("");
  const [isDirty, setIsDirty] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const passwordRequirements = requirementsArray.map((req) => req.text);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section className="m-auto flex flex-col items-center rounded-md border-solid border-2 border-white p-6 box-border">
      <h1>Validación accessible de contraseñas</h1>
      <form onSubmit={handleSubmit} id="form-id" className="pb-2 pt-6">
        <label htmlFor="password-input-id">Contraseña</label>
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
            placeholder="Escribí tu contraseña"
            autoComplete="new-password"
            className="text-white bg-transparent placeholder:text-slate-400 w-11/12"
            id="password-input-id"
            aria-describedby="password-requirement"
            required
            ref={inputRef}
          />
          <p
            id="password-requirement"
            className="absolute w-1 h-1 -m-1 overflow-hidden clip-hidden"
          >
            tu contraseña debe incluir {passwordRequirements}
          </p>
          <button
            onClick={() => {
              setSeePassword(!seePassword);
            }}
            role="switch"
            aria-checked={seePassword}
            aria-label={
              seePassword ? `esconder contraseña` : `mostrar contraseña`
            }
            className="hover:shadow-lg hover:bg-pink-300 hover:text-black"
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
            !isDirty
              ? "bg-gray-300 text-gray-400 cursor-not-allowed"
              : "bg-transparent shadow-md hover:shadow-lg hover:bg-pink-300 hover:text-black"
          }`}
          disabled={!isDirty}
        >
          Crear contraseña
        </button>
      </form>
    </section>
  );
};

export default PasswordComponent;
