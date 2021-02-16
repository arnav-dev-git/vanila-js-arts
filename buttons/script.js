const buttons = document.querySelectorAll("button");
const turbulence = document.querySelector("feTurbulence");
let verticalFrequency = 0.000001;
let horizontalFrequency = 0.00001;
turbulence.setAttribute(
  "baseFrequency",
  `${verticalFrequency} ${horizontalFrequency}`
);
const steps = 10;
const interval = 10;

buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    verticalFrequency = 0.000001;
    horizontalFrequency = 0.000001;
    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        verticalFrequency += 0.007;
        horizontalFrequency += 0.007;
        turbulence.setAttribute(
          "baseFrequency",
          `${verticalFrequency} ${horizontalFrequency}`
        );
      }, i * interval);

      setTimeout(() => {
        verticalFrequency = 0.000001;
        horizontalFrequency = 0.00001;
        turbulence.setAttribute(
          "baseFrequency",
          `${verticalFrequency} ${horizontalFrequency}`
        );
      }, steps * 3 * interval);
    }
  });
});
