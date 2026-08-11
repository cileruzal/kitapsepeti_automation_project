class PaymentPage{

    paymentPageUrl = {
     "payment": "/order/payment",
    }

 
    // ---------------------------------------------------------
    // Locators - (Encapsulation) 
    // ---------------------------------------------------------   

_getBuyButton() {return cy.get('#cart-buy-btn');} 
_getProceedToPaymentButton() {return cy.get('.button.btn.btn-primary.w-100.text-uppercase.order-next-btn');}
_getCargoList() {return cy.get('li.cargo-option-item.active');}
_getAdressInfo() {return cy.get('order-address-selection');}
_getPTTCargoSection() {return cy.get('cargo-item-input-1');}
_getIzycoSection() {return cy. get('#iyz-tab-payWithIyzico');}
_getCreditCardSection() {return cy.get('#iyz-tab-credit-card');}
_getCardHolderInput() {return cy.get('input[name="cardHolderName"]',)}
_getNumberInput() {return cy.get('input[name="cardHolderName"]');}
_getExpiryDateInput() {return cy.get('input[autocomplete="cc-exp"]');}
_getCvvInput() {return cy.get('input[autocomplete="cc-csc"]');}
//_getPayButton() {return cy.get('iyz-payment-button, have.css", "background-color", "rgb(30, 100, 255)"');}
_getPayButton() { return cy.get('iyz-payment-button'); }
//_getEmptyFieldError() {return cy.get('class="css-1gwypqx-BaseTextBlock-BaseTextStyle em9fzm32", have.css", "background-color, rgb(30, 100, 255)').contains('Lütfen tüm alanları doldurunuz')}
_getEmptyFieldError() { return cy.get('.em9fzm32').contains('Lütfen tüm alanları doldurunuz'); }
_getOrderSummaryBox() {return cy.get('')}

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
    this._getPTTCargoSection().should('be.visible')
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
    this._getCardHolderInput().type(card._getCardHolderInput, {force: true});
    this._getNumberInput().type(card._getNumberInput,{force: true});
    this._getExpiryDateInput().type(card._getExpiryDateInput, {force: true});
    this._getCvvInput().type(card._getCvvInput, {force: true})
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
    this._getPayButton().click({force: true})
}


verifyEmptyFieldsError() {
        this._getEmptyFieldError().should("be.visible")
}


// TC24 Assertions


verifyOrderSummary() {
    this._getOrderSummaryBox().should("exist");

        // Sepet toplamını al
    this._getOrderSummaryBox().subtotalAmount().invoke("text").then((text) => {
        subtotal = parseFloat(text.replace(/[^\d,]/g, "").replace(",", "."));
        cy.log("Sepet Toplamı: " + subtotal);
    });

        // --- TRY / CATCH ile kargo ücreti güvenli okuma ---
        cy.get("body").then(($body) => {
            try {
                if ($body.find("#priceCargo").length > 0) {
                    const text = $body.find("#priceCargo").text().trim();
                    if (text) {
                        shipping = parseFloat(text.replace(",", "."));
                        cy.log("Kargo Ücreti: " + shipping);
                    } else {
                        cy.log("Kargo Ücreti boş geldi, 0 kabul edildi");
                        shipping = 0;
                    }
                } else if (
                    $body
                        .find(".fw-bold.text-uppercase.text-primary")
                        .text()
                        .includes("BEDAVA")
                ) {
                    cy.log("İyzico ile Öde’de BEDAVA, kargo 0 kabul edildi");
                    shipping = 0;
                } else {
                    cy.log("Kargo elemanı bulunamadı, 0 kabul edildi");
                    shipping = 0;
                }
            } catch (err) {
                cy.log("Kargo alanı okunamadı, 0 kabul edildi");
                shipping = 0;
            }
        });

        // Genel toplamı al ve kontrol et
    this._getOrderSummaryBox().totalAmount().invoke("text").then((text) => {
        total = parseFloat(text.replace(/[^\d,]/g, "").replace(",", "."));
        cy.log("Genel Toplam: " + total);

        // Hesap kontrolü (kargo ücretsizse subtotal == total olmalı)
        const expectedTotal = parseFloat((subtotal + shipping).toFixed(2));
        cy.log(`Beklenen toplam: ${expectedTotal}`);

        expect(total).to.be.closeTo(expectedTotal, 0.1);
    });
    }



}

export default new PaymentPage();