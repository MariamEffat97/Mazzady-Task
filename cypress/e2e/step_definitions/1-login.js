import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../pages/LoginPage";
import homePage from "../pages/HomePage";
const API_URL = Cypress.env('apiUrl')

Given("I am not logged in", () => {
    return true;
})

When("I go to mazaady Website", () => {
    cy.visit("https://staging.mazaady.com/login",{ retryOnNetworkFailure: true })
})


When("I Enter My Mail {string}", (Email) => {
    
    
    cy.xpath("//input[@id='email']").type(Email)
})

When("I Enter My Password {string}", (Password) => {
    
    
    cy.xpath("//input[@id='password']").type(Password)
})

When("I click on Login button", () => {
    
    
    cy.xpath("//input[@type='submit']").click()
})
