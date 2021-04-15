//Dom elements

const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

// rnadomFunc that are already decleared
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  numbers: getRandomNumbers,
  symbols: getRandomSymbol,
};

// Generated Event listener
generateEl.addEventListener("click", (e) => {
  e.preventDefault();
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumbers = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;
  //   const hasLower = lowercaseEl.checked;
  resultEl.innerText = generatePassword(
    length,
    hasLower,
    hasUpper,
    hasNumbers,
    hasSymbols
  );
});

// Generate password function

function generatePassword(length, lower, upper, numbers, symbols) {
  //1. Init pw var
  //2. filter our unchecked types
  //3. loop over length call generated function
  //4. Add final pw to the pw var and return

  let generatedPwd = "";

  const typesCounts = lower + upper + numbers + symbols;

  const typesArr = [{ lower }, { upper }, { numbers }, { symbols }].filter(
    (item) => Object.values(item)[0]
  );

  // console.log(typesArr);

  if (typesCounts === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCounts) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      // console.log(funcName);
      generatedPwd += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPwd.slice(0, length);

  return finalPassword;
}

// Generator functions - https://www.net-comber.com/charset.html

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumbers() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbol = "@!$%^&*()_+{}[]<>/,.?";

  return symbol[Math.floor(Math.random() * symbol.length)];
}

//Copy password to clipBoard

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;

  document.body.appendChild(textarea);
  textarea.select();

  document.execCommand("copy");
  textarea.remove();

  alert("password is copied to clipboard");
});

// console.log(getRandomUpper());
// console.log(getRandomLower());
// console.log(getRandomNumbers());
// console.log(getRandomSymbol());
