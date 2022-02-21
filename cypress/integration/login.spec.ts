/// <reference types="cypress" />

it("works", () => {
  cy.visit("/");
});
it("login successfully with valid credentials", () => {
  cy.intercept("/api/login").as("login");
  cy.visit("/");
  cy.get('[aria-label="loading"]').should("not.be.visible");
  cy.get('[name="email"]').type("emailAddress@email.com");
  cy.get('[name="password"]').type("MyLongP@ssword8");
  cy.contains("Login").click();
  cy.get('[aria-label="loading"]').should("be.visible");
  cy.wait("@login").then((intersection) => {
    expect(intersection.response.statusCode).to.eq(200);
  });
  cy.get('[test-id="notification"]').should(
    "have.text",
    "Welcome back!!User credentials: emailAddress@email.com"
  );
  cy.get('[aria-label="loading"]').should("not.be.visible");
});
it("dose not login unregistered users", () => {
  cy.intercept("/api/login").as("login");
  cy.visit("/");
  cy.get('[aria-label="loading"]').should("not.be.visible");
  cy.get('[name="email"]').type("unregistredUser@email.com");
  cy.get('[name="password"]').type("MyLongP@ssword8");
  cy.contains("Login").click();
  cy.get('[aria-label="loading"]').should("be.visible");
  cy.wait("@login").then((intersection) => {
    expect(intersection.response.statusCode).to.eq(404);
  });

  cy.get('[test-id="notification"]').should(
    "have.text",
    "Login couldn't be completedNo user with the email unregistredUser@email.com could be found."
  );
  cy.get('[aria-label="loading"]').should("not.be.visible");
});
it("handle thrown exceptions", () => {
  cy.intercept("POST", "/api/login", {
    statusCode: 500,
  }).as("login");

  cy.visit("/");

  cy.get('[name="email"]').type("unregistredUser@email.com");
  cy.get('[name="password"]').type("MyLongP@ssword8");
  cy.contains("Login").click();

  cy.wait("@login").then((intersection) => {
    expect(intersection.response.statusCode).to.eq(500);
  });

  cy.get('[test-id="notification"]').should(
    "have.text",
    "Login couldn't be completedSorry, something went wrong. An error has occurred on the server.Please retry again."
  );
  cy.get('[aria-label="loading"]').should("not.be.visible");
});
