/// <reference types="cypress" />

Cypress.Commands.add('waitTextToBeVisible', (text) => {
    cy.contains(`${text}`).should('be.visible')
})

Cypress.Commands.add('loginViaApi', (userType = 'beneficiary') => {
    cy.session(userType, () => {
        cy.fixture("login.json").then(credentials => {
            username = credentials[`${userType}`]
            password = credentials.password
            token = credentials.loginToken
            cy.request({
                method: 'POST',
                url: 'https://dev-auth.waffyapp.com/oauth/token',
                form: true,
                body: {
                    username: username,
                    password: password,
                    grant_type: "password"
                },
                headers: { Authorization: token }
            }).then(({ body }) => {
                window.localStorage.setItem('userToken', body.access_token)
                window.localStorage.setItem('userRefreshToken', body.refresh_token)
                window.localStorage.setItem('userInfo', JSON.stringify(body.user))
                window.localStorage.setItem('apc_local_id', body.jti)
                cy.writeFile("cypress/fixtures/accessToken.json",
                    { "access_token": `Bearer ${body.access_token}` })


                // Getting ZENDESK Token for some actions to pass in some tests
                cy.request({
                    method: 'GET',
                    url: `https://dev-auth.waffyapp.com/api/users/${body.user.id}/tokens/ZENDESK`,
                    headers: { Authorization: `Bearer ${body.access_token}` }
                }).then(({ body }) => {
                    cy.writeFile("cypress/fixtures/zendeskToken.json",
                        { "zendesk_token": `Basic ${body.data.token}` })
                })
            })
        })
    })
})


Cypress.Commands.add('payViaApi', () => {
    let userInfo = window.localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    let userId = userInfo.id
    let token = window.localStorage.getItem('userToken')
    cy.readFile("cypress/fixtures/contractDetails.json").then(contract => {
        let reqBody = {
            "contractId": contract['id'],
            "userId": userId,
            "actorRole": "CUSTOMER",
            "receiverId": userId,
            "senderId": contract['senderId'],
            "contractAction": "CUSTOMER_FUND",
            "transactionId": "42425551whatever"
        }
        cy.request({
            method: 'POST',
            url: 'https://dev-api.waffyapp.com/contract-actions/',
            body: reqBody,
            headers: { Authorization: `Bearer ${token}` }
        }).then(({ body }) => {
            expect(body).to.include(
                { "sent": true }
            )
        })
    })
})


Cypress.Commands.add('newContractViaApi', () => {
    cy.loginViaApi('beneficiary')
    cy.fixture("newContractRequest.json").then(reqBody => {
        let token = window.localStorage.getItem('userToken')
        cy.request({
            method: 'POST',
            url: 'https://dev-api.waffyapp.com/api/contracts',
            body: reqBody,
            headers: { Authorization: `Bearer ${token}` }
        }).then(({ body }) => {
            expect(body).to.include(
                {
                    "status": 201,
                    "successful": true
                }
            )
            cy.writeFile('cypress/fixtures/contractDetails.json', body['data'])
        })
    })
})
