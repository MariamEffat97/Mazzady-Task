class HomePage {
    open() {
        cy.visit('/')
    }

    get newContractPopup() { return cy.get('div[class*=modal_header]') }
    get profileIcon() { return cy.get('[class*=styles_profile_box]') }
    get logOutBtn() { return cy.get('button[aria-label="logout"]') }
}

export default new HomePage()