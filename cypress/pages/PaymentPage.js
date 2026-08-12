class PaymentPage{

    paymentPageUrl = {
     "payment": "/order/payment",
    }

 
    // ---------------------------------------------------------
    // Locators - (Encapsulation) 
    // ---------------------------------------------------------   

_getBuyButton() {return cy.get('#cart-buy-btn');} 
_getProceedToPaymentButton() {return cy.get('.col-7 > .btn');}
_getCargoList() {return cy.get('.payment-cargo-list > .p-2');}
_getAdressInfo() {return cy.get('#order-nav > .row > :nth-child(1)');}
_getPTTCargoSection() {return cy.get(':nth-child(2) > .h-100');}
_getIzycoSection() {return cy. get('#iyz-tab-payWithIyzico');}
_getCreditCardSection() {return cy.get('#iyz-tab-credit-card');}
_getCardHolderInput() {return cy.get('#ccname');}
_getNumberInput() {return cy.get('#ccnumber');}
_getExpiryDateInput() {return cy.get('#iyz-expire-date');}
_getCvvInput() {return cy.get('#iyz-cvc');}
_getPayButton() { return cy.get('#iyz-payment-button'); }
_getEmptyFieldError() { return cy.get('.css-1gwypqx-BaseTextBlock-BaseTextStyle').contains('Lütfen tüm alanları doldurunuz'); }
_getOrderSummaryBox() {return cy.get('#order-products')}
_getSummaryCartTotal() {return cy.get('#order-summary > :nth-child(1) > :nth-child(2)');}
_getSummaryShippingFee() {return cy.get('#order-summary > :nth-child(2) > :nth-child(2)');}
_getSummaryGeneralTotal() {return cy.get('.fw-bold > :nth-child(2)')}


    // ---------------------------------------------------------
    // Actions & Verifications 
    // ---------------------------------------------------------

displayAdress(){
    this._getAdressInfo().should('be.visible')
}

clickBuyButton() {
 this._getBuyButton().click({ force: true });

   // cy.url().should('include', '/siparis');}
}

// TC20 Assertions
clickProceedToPaymentButton() {
    this._getProceedToPaymentButton().click({ force: true })
}

cargoSection() {
   this._getCargoList().should('be.visible')
}

cargoSectionForPTT() {
    this._getPTTCargoSection().click().should('be.visible')
}

// TC21 Assertions

verifyPaymentSections() {
    this._getIzycoSection().should('be.visible')
    this._getCreditCardSection().should('be.visible')
}

clickToCreditCardButton() {
    this._getCreditCardSection().click({force: true})
}
 
verifyCreditCardFormInfo() {
    this._getCardHolderInput().should('be.visible')
    this._getNumberInput().should('be.visible')
    this._getExpiryDateInput().should('be.visible')
    this._getCvvInput().should('be.visible')
}

// TC22 Assertions

fillCreditCardForm() {
    this._getCardHolderInput();
    this._getNumberInput();
    this._getExpiryDateInput();
    this._getCvvInput();
}

verifyPayButtonIsEnabled() {
        // Önce butonun DOM’a geldiğinden emin ol
    this._getPayButton().should("exist").and("be.visible").and("not.have.attr", "disabled");

        // İçerik kontrolü: “ÖDE” kelimesini içermeli
    this._getPayButton().invoke("text").then((text) => {
        cy.log("Buton texti:", text.trim());
        expect(text).to.include("ÖDE");
    });
}

// TC23 Assertions

clickPayButton(){
    this._getPayButton().click({force: true}).should('have.css', 'background-color', 'rgb(206, 212, 218)')
}


verifyEmptyFieldsError() {
    this._getEmptyFieldError().should('have.css', 'background-color', 'rgb(240, 62, 62)')
}


// TC24 Assertions
verifyOrderSummary() {
    this._getOrderSummaryBox().should('be.visible');

}

verifyOrderSummaryTotal() {
    let cartTotal = 0;
    let shipping = 0;

    this._getSummaryCartTotal().invoke('text').then((text) => {cartTotal = parseFloat(text.replace('.', '').replace(',', '.'));});
    this._getSummaryShippingFee().invoke('text').then((text) => {shipping = parseFloat(text.replace('.', '').replace(',', '.'));});
    this._getSummaryGeneralTotal().invoke('text').then((text) => {const total = parseFloat(text.replace('.', '').replace(',', '.'));expect(total).to.be.closeTo(cartTotal + shipping, 0.01);});
}

}
export default new PaymentPage();