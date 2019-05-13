/**
 * URL to access the gradients
 */
const GRADIENT_URL =
  "https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json";

/**
 * Delay between updating the quote
 */
const delay = 4;

/**
 * List of gradients
 */
let gradients;

/**
 * Current gradient index
 */
let gradientsIndex;

/**
 * Zen coding quotes from https://api.github.com/zen
 */
const zen_quotes = [
  "You yourself are the best.",
  "Mind your words, they are important.",
  "Hello, I'm Toro.",
  "Nice to meet you.",
  "BeamerZG here.",
  "Wondering about life.",
  "Are you happy?",
  "Alright.",
  "How about you?",
  "Eh",
  "Encourage flow.",
  "Avoid administrative distraction.",
  "Approachable is better than simple."
];

/**
 * Possible prefixes for various CSS properties
 */
const prefixes = ["-o-", "-moz-", "-webkit-", "-ms-", ""];

/**
 *
 * Adds a gradient background to a DOMElement.
 *
 * @param {Element} element DOMElement to assign the gradient to
 * @param {Object} gradient Gradient object from uigradients
 */
const setGradient = (element, gradient) => {
  for (let prefix of prefixes) {
    const style = `background: ${prefix}${cssForGradient(gradient)};`;
    element.setAttribute("style", style);
  }
};

/**
 * Updates the background gradient
 */
const updateGradient = () => {
  const gradient = gradients[gradientsIndex];

  const body = document.body;
  setGradient(body, gradient);

  const gradientText = document.getElementById("gradient");
  const shortName = gradient.name.replace(/ +/g, "");

  gradientText.innerHTML = `<a style="text-decoration: underline;" href = "https://uigradients.com/#${shortName}" target="_blank">${
    gradient.name
  }</a><a style="text-decoration: underline;" href = "" target="_blank"></a>`;

  gradientsIndex++;
};

/**
 * Creates CSS property for a specific gradient
 *
 * @param {Object} gradient Gradient to create the CSS for
 */
const cssForGradient = gradient => {
  return `linear-gradient(to right, ${gradient.colors.join(", ")});`;
};

/**
 * DOMElement for the zen quote
 */
const zen = document.getElementById("zen");

/**
 * String index for typing animation
 */
let index = 0;

/**
 * Previous text in the element
 */
let text = [];

/**
 * Current quote to be put into the element
 */
let quote = "";

/**
 * Updates the zen quote
 */
const updateZen = () => {
  quote = zen_quotes[Math.floor(Math.random() * zen_quotes.length)];

  text = zen.innerHTML.split("");

  while (text.length > quote.length) {
    quote += " ";
  }

  index = 0;
  next();
};

/**
 * Inserts the next character in the quote
 */
const next = () => {
  text[index] = quote[index];
  zen.innerHTML = text.join("");
  if (index === quote.length) return;
  index++;
  setTimeout(() => {
    next();
  }, 50);
};

// Fetches the gradients from github
fetch(GRADIENT_URL).then(async _ => {
  gradients = await _.json();
  gradientsIndex = Math.floor(Math.random() * gradients.length);

  updateGradient();
  updateZen();

  setInterval(() => {
    updateZen();
  }, delay * 1000);
});
