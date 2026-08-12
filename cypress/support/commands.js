// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//import './commands'

//Cypress.Commands.add("loginViaApi", () => {
  //  cy.session("userSession", () => {
//        cy.request({
//            method: "POST",
//            url: "https://www.kitapsepeti.com/api/v1/authentication/login/?language=tr",
//            form: true,
//            body: {
//                email: Cypress.env("email"),
//                password: Cypress.env("password"),
//                rememberMe: 0,
//            },
 //          failOnStatusCode: false, // hata olsa bile response görebilmek için
//        }).then((response) => {
//            expect(response.status).to.eq(200);
//        });
//    });
//});

//Cypress.Commands.add("loginViaApi", () => {
  //  cy.session("userSession", () => {
    //    cy.request({
      //      method: "POST",
        //    url: "https://www.kitapsepeti.com/api/v1/authentication/login/?language=tr",
          //  headers: {
    //            "Content-Type": "application/json",
      //          "Accept": "application/json"
        //    },
       //     body: {
         //       email: Cypress.env("VALID_EMAIL"),     
          //      password: Cypress.env("VALID_PASSWORD"),
           //     rememberMe: 0,
   //         },
   //         failOnStatusCode: false,
  //      }).then((response) => {
   //         // Status kodunu konsola yazdırarak dönen hatayı net görebilirsiniz
   //         cy.log(JSON.stringify(response.body));
  //          expect(response.status).to.eq(200);
   //     });
  //  });
//});
// cypress/support/e2e.js dosyasının içine doğrudan ekleyebilirsin:

beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
});