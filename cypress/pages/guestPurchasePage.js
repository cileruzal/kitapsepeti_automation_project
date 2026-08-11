class guestPurchasePage{

    paymentPageUrl = {
     "payment": "/order/payment",
    }

    // ---------------------------------------------------------
    // Locators - (Encapsulation) 
    // ---------------------------------------------------------   

_getContinueAsGuestButton() {return cy.get('.w-100.btn.btn-dark.text-uppercase.fw-bold');}
_getAdresTitle() {return cy.get('a.d-flex.align-items-center.w-100.px-1.border-round.text-uppercase.fw-bold.active.disable').contains ('Adres Bilgileri');}
_getEmailInput() {return cy.get('#order-address-form input[name="email"]:visible');}
_getFullNameInput() {return cy.get('#order-address-form input[name="fullname"]:visible');}
_getProvinceSelect() {return cy.get('#order-address-form select[name="city_code"]:visible');}
_getDistrictSelect() {return cy.get('#order-address-form select[name="town_code"]');}
_getNeighborhoodSelect() {return cy.get('[name="district_code"]');} 
_getPhoneInput(){return cy.get('#order-address-form input[name="mobile_phone"]:visible');}
_getSaveAddressButton() {return cy.get('#order-address-form button[type="submit"]:visible');}
_getSaveAdressButton() {return cy.get('btn btn-primary w-100 text-uppercase');}
_getRedErrorMessage() {return cy.get('.popover-item');}
_getInvoiceTypeSelect() { return cy.get('name="is_company_active').eq(0); } 
_getAddressTextArea() { return cy.get('#order-address-form textarea[name="address"]:visible');}

    // ---------------------------------------------------------
    // Actions & Verifications 
    // ---------------------------------------------------------

// Background   
verifyRedirectToOrderLoginPage() {
    cy.url().should("include", "/siparis-uye-giris");
}

//TC25 Assertions
verifyContinueAsGuestButtonVisible() {
    this._getContinueAsGuestButton().should('be.visible')
}

//TC26 Assertions
clickContinueAsGuestButton() {
    this._getContinueAsGuestButton().click()
}

verifyAdressFormPage() {
    cy.url({ timeout: 10000 }).should('include', '/order/address');
    cy.contains('Adres Bilgileri', { matchCase: false }).should('be.visible');}

//TC27 Assertions
verifyAdressFormInput() {
    this._getAdresTitle();
    this._getEmailInput();
    this._getFullNameInput();
    this._getProvinceSelect();
    this._getDistrictSelect();
    this._getPhoneInput();
    this._getSaveAddressButton();
}


//TC28 Assertions
clickSaveAdressButton() {
    this._getSaveAddressButton().click();

}

verifyRedErrorMessage() {
    this._getRedErrorMessage().should('be.visible');
}

//TC29 Assertions
fillAdressForm() {
    cy.fixture("testdata.json").then((data) => {
    const address = data.address;
        // 1. Adım: Form açılır açılmaz Fatura Türünü "Bireysel Adres" yapıyoruz
    cy.get('#order-address-form').contains('Kurumsal Adres').click({ force: true });
    cy.get('li, option, .dropdown-item').contains('Bireysel Adres').click({ force: true });
    this._getFullNameInput().type(address.fullname);
    this._getEmailInput().type(address.email);
    this._getPhoneInput().type(address.phone);
            
    // İl seçimi
    this._getProvinceSelect().select(1); // Listebasindaki 1. ili seç       
    // İlçe seçimi
    cy.wait(1000);
    this._getDistrictSelect().select(1);
    this._getNeighborhoodSelect().select(1);
            
    // Adres metni
    this._getAddressTextArea().type(address.address);
            
    // Kaydet butonu
    this._getSaveAddressButton().click();
    });
}




}

export default new guestPurchasePage();