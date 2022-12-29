import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import contractPage from '../pages/ContractPage'
import loginPage from '../pages/LoginPage'

Then("I should see {string}", (text) => {
    cy.waitTextToBeVisible(`${text}`)
})

When("I click on {string}", (Text) => {
    cy.contains(Text).click()
})

When("I go to Waffy Home page", () => {
    cy.visit("/")
})

Given("I login as a {string}", (userType) => {
    cy.loginViaApi(userType)
})

Given(/^I go to the contract page$/, () => {
    cy.readFile("cypress/fixtures/contractDetails.json").then(contract => {
        cy.visit(`/contract/${contract.id}`, { failOnStatusCode: false })
    })
})

Then("contract status should be {string}", (status) => {
    contractPage.contractStatus.should('contain.text', `${status}`)
});

Then("contract type is {string}", (type) => {
    contractPage.contractType.should('contain.text', "بيع")
});

When(/^I confirm my password$/, () => {
	loginPage.fillPassword()
	contractPage.confirmPasswordBtn.click()
});