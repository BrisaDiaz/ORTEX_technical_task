/// <reference types="cypress" />
it("send reset password instructions to registered users", () => {
  cy.visit("/");
  cy.intercept("/api/resetPassword").as("resetPassword");
  cy.get('form[name="login"]').find("p").as("resetPasswordTrigger").click();
  cy.get('form[name="reset password"]')
    .as("form")
    .find('[name="emailAddress"]')
    .type("emailAddress@email.com");
  cy.get("@form").find("button").click();
  cy.get('[aria-label="loading"]').should("be.visible");
  cy.wait("@resetPassword").then((intersection) => {
    expect(intersection.response.statusCode).to.eq(200);
  });

  cy.get('[test-id="notification"]').should(
    "have.text",
    "An email has been sent to youPlease check your inbox for the instructions to keep in order to reset your password. If there is't set your email address again to send you a new email."
  );
  cy.get('[aria-label="loading"]').should("not.be.visible");
});
it("doesn't send reset password instructions to unregistered users", () => {
  cy.visit("/");
  cy.intercept("/api/resetPassword").as("resetPassword");
  cy.get('form[name="login"]').find("p").as("resetPasswordTrigger").click();
  cy.get('form[name="reset password"]')
    .as("form")
    .find('[name="emailAddress"]')
    .type("unregistredUser@email.com");
  cy.get("@form").find("button").click();
  cy.get('[aria-label="loading"]').should("be.visible");
  cy.wait("@resetPassword").then((intersection) => {
    expect(intersection.response.statusCode).to.eq(404);
  });

  cy.get('[test-id="notification"]').should(
    "have.text",
    "Email could't be sendNo user with the email unregistredUser@email.com could be found, please make sure your set the correct email or try to signup."
  );
  cy.get('[aria-label="loading"]').should("not.be.visible");
});
it("handle exceptions correctly", () => {
  cy.visit("/");
  cy.intercept("POST", "/api/resetPassword", {
    statusCode: 500,
  }).as("resetPassword");
  cy.get('form[name="login"]').find("p").as("resetPasswordTrigger").click();
  cy.get('form[name="reset password"]')
    .as("form")
    .find('[name="emailAddress"]')
    .type("unregistredUser@email.com");
  cy.get("@form").find("button").click();

  cy.wait("@resetPassword").then((intersection) => {
    expect(intersection.response.statusCode).to.eq(500);
  });

  cy.get('[test-id="notification"]').should(
    "have.text",
    "Email could't be sendSorry, something went wrong. An error has occurred on the server.Please retry again."
  );
  cy.get('[aria-label="loading"]').should("not.be.visible");
});
