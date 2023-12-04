//here you can find a mock arrays or objets simulating the list of password requirements to pass as props in the Password Requirement component.
//Every object has four properties which are id, text, matchRegex and error.

export const requirementsArray = [
  {
    id: 1,
    text: "Has a number 0-9",
    matchRegex: /[0-9]/,
    error:
      "Your password is not ready yet! You need to use at least one number from 0 to 9",
  },
  {
    id: 2,
    text: "Has a special char !@#$%^&",
    matchRegex: /^(?=.*[!@#$%^&])[a-zA-Z\d!@#$%^&]*$/,
    error:
      "Your password is not ready yet! You have to use at least one special character !@#$%^&",
  },
  {
    id: 3,
    text: "Has uppercase letter",
    matchRegex: /[A-Z]/,
    error:
      "Your password is not ready yet! You need at least one uppercase letter",
  },
  {
    id: 4,
    text: "Has no consecutive letters",
    matchRegex: /^(?!.*(\S)\1)[\S\s]*\S[\S\s]*$/,
    error:
      "Your password is not ready yet! The letters can not be consecutive!",
  },
  {
    id: 5,
    text: "8 characters length",
    matchRegex: /(?=.{8,})/,
  },
];

export const requirementsShorterArray = [
  {
    id: 1,
    text: "Has a number 0-9",
    matchRegex: /[0-9]/,
    error:
      "Your password is not ready yet! You need to use at least one number from 0 to 9",
  },
  {
    id: 2,
    text: "Has a special char !@#$%^&",
    matchRegex: /^(?=.*[!@#$%^&])[a-zA-Z\d!@#$%^&]*$/,
    error:
      "Your password is not ready yet! You have to use at least one special character !@#$%^&",
  },
  {
    id: 3,
    text: "Has uppercase letter",
    matchRegex: /[A-Z]/,
    error:
      "Your password is not ready yet! You need at least one uppercase letter",
  },
  {
    id: 4,
    text: "8 characters length",
    matchRegex: /(?=.{8,})/,
  },
];

//example if there's an unique requirement
export const testRequirement = {
  id: 1,
  text: "Has a number 0-9",
  matchRegex: /[0-9]/,
  error:
    "Your password is not ready yet! You need to use at least one number from 0 to 9",
};
