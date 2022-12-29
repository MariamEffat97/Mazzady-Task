class NewContract {

    itemDetails = {
        get itemName() {
            return cy.contains('اسم المنتج/الخدمة')
                .parent().siblings('textarea')
        },
        get itemDescription() {
            return cy.contains('وﺻﻒ اﻟﻤﻨﺘﺞ/اﻟﺨﺪﻣﺔ')
                .parent().siblings('textarea')
        },
        get itemImage() { return cy.get('input[type=file]'); },
        get itemPrice() { return cy.get('[class*=textArea_text_area]'); }
    }

    get deliverySwitchBtn() { return cy.get('.MuiSwitch-root'); }
    get termsCheckBox() { return cy.get('[data-indeterminate="false"]'); }

    get deliveryFees() {
        return cy.contains('رسوم التوصيل')
            .parent().siblings('textarea')
    }

    get submitBtn() {
        return cy.get('[class*=newTransaction_left]')
            .find('button');
    }


}

export default new NewContract();