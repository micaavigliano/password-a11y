//here you can find a mock arrays or objets simulating the list of password requirements to pass as props in the Password Requirement component.
//Every object has four properties which are id, text, matchRegex and error.

export const requirementsArray = [
  {
    id: 1,
    text: "un número de 0 a 9.",
    initialState: false,
    matchRegex: /[0-9]/,
  },
  {
    id: 2,
    text: "un carácter especial !@#$%^&.",
    initialState: false,
    matchRegex: /^(?=.*[!@#$%^&])[a-zA-Z\d!@#$%^&]*$/,
  },
  {
    id: 3,
    text: "una letra en mayúscula.",
    initialState: false,
    matchRegex: /[A-Z]/,
  },
  {
    id: 4,
    text: "no debe tener letras iguales consecutivas.",
    initialState: false,
    matchRegex: /^(?!.*(\S)\1)[\S\s]*\S[\S\s]*$/,
  },
  {
    id: 5,
    text: "una longitud de 8 caracteres.",
    initialState: false,
    matchRegex: /(?=.{8,})/,
  },
];

export const requirementsShorterArray = [
  {
    id: 1,
    text: "un número de 0 a 9.",
    initialState: false,
    matchRegex: /[0-9]/,
  },
  {
    id: 2,
    text: "un carácter especial !@#$%^&.",
    initialState: false,
    matchRegex: /^(?=.*[!@#$%^&])[a-zA-Z\d!@#$%^&]*$/,
  },
  {
    id: 3,
    text: "una letra en mayúscula..",
    initialState: false,
    matchRegex: /[A-Z]/,
  },
  {
    id: 4,
    text: "una longitud de 8 caracteres.",
    initialState: false,
    matchRegex: /(?=.{8,})/,
  },
];

//example if there's an unique requirement
export const testRequirement = [
  {
    id: 1,
    text: "un número de 0 a 9.",
    initialState: false,
    matchRegex: /[0-9]/,
  },
];
