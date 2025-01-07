// To ingore webpage errors
Cypress.on("uncaught:exception", () => {
  return false;
});
