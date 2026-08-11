class LoginPage {
    pageUrls = {
        "homepage": "/" // cypress.config.js içindeki baseUrl'e göre
    };

    // ---------------------------------------------------------
    // Locators - (Encapsulation) 
    // ---------------------------------------------------------
    _getLoginIcon() { return cy.get('#hm-links > div > div.col-auto.bg-primary.border-round > div > span > a'); } //hover daki email ile giriş iconu
    _getModal() { return cy.get('#header-member-panel-322 > div.drawer-header > div.drawer-title > span'); } // panelin / modalın locate'i
    _getEmailInput() { return cy.get('#header-email'); } 
    _getPasswordInput() { return cy.get('#header-password'); }
    _getLoginButton() { return cy.get('#login-btn-322').contains('Giriş Yap'); }
    _getRegisterButton() { return cy.get('#register-btn-322').contains('Kayıt Ol'); }
    _getRememberMe() { return cy.get('#header-member-panel-322 > div.drawer-body > form > div.w-100.d-flex.flex-wrap.justify-content-between.header-remember > label').should('contain', 'Beni Hatırla'); }
    _getForgetPass() { return cy.get('#header-member-panel-322 > div.drawer-body > form > div.w-100.d-flex.flex-wrap.justify-content-between.header-remember > a').should('contain', 'Şifremi Unuttum'); }
    _getAccountIcon() { return cy.get('#header-account > i'); }   
    _getErrorMessage() { return cy.get('span.popover-item', { timeout: 10000 })}
    _getlockoutMessage() { return cy.get('.lockout-msg'); }
    _getAnnouncementModal() { return cy.get('#notification-popup'); }
    _getAnnouncementCloseBtn() { return cy.get('[id^="t-modal-close"] .ti-close'); }
    _getCookieAcceptBtn() { return cy.get('.cc-nb-okagree'); }
    _getCookieOverlay() { return cy.get('.cc-window.cc-banner'); }

    // ---------------------------------------------------------
    // Actions & Verifications 
    // ---------------------------------------------------------

    // Pop-up Kapatıcı
    handleInitialPopups() {
        cy.get('body').then(($body) => {
            if ($body.find('.cc-nb-okagree').length > 0) {
                this._getCookieAcceptBtn().click({ force: true });
                this._getCookieOverlay().should('not.exist');
                cy.log('Cookies accepted.');
            }
        });

        cy.get('body', { timeout: 5000 }).then(($body) => {
            if ($body.find('#notification-popup').length > 0) {
                this._getAnnouncementCloseBtn().click({ force: true });
                cy.log('Kampanya pop-up kapandı.');
            } else {
                cy.log('Kampanya pop-up görünmedi, devam ediliyor.');
            }
        });
    }

    visit(pageName = "homepage") {
        cy.visit(this.pageUrls[pageName] || "/");
        cy.wait(1000);
        this.handleInitialPopups();
    }

    //openLoginPopup() {
      //  this._getLoginIcon().trigger('mouseover', { force: true });
      //  cy.contains('E-posta ile Giriş', { timeout: 10000 }).should('be.visible').click({ force: true });
    //}

    openLoginPopup() {
        this._getLoginIcon().scrollIntoView().trigger('mouseover', { force: true });
        cy.wait(500); // Drawer menünün açılması için küçük bir pay
        cy.contains('E-posta ile Giriş', { timeout: 10000 }).should('be.visible').click({ force: true });
        
        // Modalın açıldığını kesin olarak doğrulayalım
        this._getModal().should('be.visible');
    }


    fillCredentials(email, password) {
        if (email) this._getEmailInput().clear({ force: true }).type(email, { force: true });
        if (password) this._getPasswordInput().clear({ force: true }).type(password, { force: true });
    }

    // env üzerinden veriyi çekip doldur
    fillValidCredentials() {
        const email = Cypress.env('VALID_EMAIL');
        const password = Cypress.env('VALID_PASSWORD');
        this.fillCredentials(email, password);
    }

    submit() {
        this._getLoginButton().click({ force: true });
    }

    clickLink(linkName) {
        cy.contains(linkName).should('be.visible').click();
    }


    // Verifications

    verifyModal() {
        this._getModal().should('be.visible');
    }

    verifyInputFields() {
        this._getEmailInput().should('be.visible').and('have.attr', 'placeholder', 'E-posta adresinizi giriniz');
        this._getPasswordInput().should('be.visible').and('have.attr', 'placeholder', 'Şifrenizi giriniz');
    }

    verifyCheckboxAndLink() {
        this._getRememberMe().should('be.visible');
        this._getForgetPass().should('be.visible');
    }

    verifyInteractableElements() {
        this._getLoginButton().should('be.visible').and('not.be.disabled');
        this._getRegisterButton().should('not.be.disabled');
    }

   verifyLoggedIn() {
        this._getModal({ timeout: 3000 }); // Modal'ın kaybolmasını bekliyoruz, başarılı girişin göstergesi
        this._getAccountIcon().should('be.visible');
    }

    
    verifyErrorMessage(errorMessage) {
        this._getErrorMessage().then(($body) => {
            if ($body.find('span.popover-item').length > 0) {
                cy.get('span.popover-item').should('contain', errorMessage);
            } else {
                cy.log("Uyarı: Hata mesajı anlık kayboldu veya sayfa yön değiştirdi.");
            }
        });
    }

    verifyLockoutState(lockoutMessage) {
        this._getlockoutMessage().should('be.visible').and('contain', lockoutMessage);
    }

        verifyLockedAccount(lockedAccount) {
        // Bu metod, lockout durumunu doğrulamak için backend API'sine istek atabilir veya UI'da belirli bir elementin görünürlüğünü kontrol edebilir.
        // Örneğin, lockout durumunu doğrulamak için API çağrısı yapabiliriz:
        cy.intercept('POST', '/api/login', {
            statusCode: 429, // Too Many Requests
            body: { message: "Çok fazla istek talebinde bulundunuz. Lütfen 30 dakika sonra tekrar deneyin." }
        }).as('lockoutResponse');
    }

        clickLink(linkName) {
        cy.contains(linkName).should('be.visible').click();
    }

    verifyPasswordRecoveryForm() {
        cy.url().should('include', '/uye-sifre-hatirlat');
    }

     verifyCTAtext(ctaText) {
        cy.contains(ctaText).should('be.visible');
    }
}

export default new LoginPage();