class ProductPage {
    PageUrl = {
        "homepage": "/",
    }

    // ---------------------------------------------------------
    // Locators - (Encapsulation) 
    // ---------------------------------------------------------

    _getProductTitle() { return cy.get('h1.product-title, #product-title, .product-name'); }
    _getProductAuthor() { return cy.get('#model-title > span, .product-author, .author-name'); }
    _getProductPublisher() { return cy.get('#brand-title, .product-publisher, .publisher-name'); }
    _getProductPrice() { return cy.get('.product-current-price, .current-price, span.price'); }
    _getProductInfoSection() { return cy.get('.product-details-content, .tab-content, .info-title, table'); }
    _getAddToCartButton() { return cy.get('[id^="product-addcart-button"], #addToCartBtn, .add-to-cart-btn'); }
    _getCartIcon() { return cy.get('#header-cart-btn, .cart-icon, header .cart'); }
    _getCartIconCount() { return cy.get('.cart-soft-count, .cart-count, .badge-count'); }
    _getAddToCartSuccessMessage() { return cy.get('[id^="popup-cart"], .fancybox-content, .modal-body, .success-popup'); }
    _getCloseModalButton() { return cy.get('[id^="t-modal-close"], .fancybox-close, .modal-close'); }
    _getGoToCartButton() { return cy.get('#cart-popup-go-cart, a.go-to-cart, .btn-go-cart, .cart-popup-continue-shopping');}
    
    // ---------------------------------------------------------
    // Actions & Verifications 
    // ---------------------------------------------------------

    
    verifyProductPage() {
        this._getProductTitle().first().should('be.visible').and('not.be.empty');
    }

    verifyProductBasicInfo() {
        this._getProductTitle().first().should('be.visible');
        this._getProductAuthor().first().should('be.visible');
        this._getProductPublisher().first().should('be.visible');
        this._getProductPrice().first().should('be.visible');
    }

    verifyProductDetailedInfo(productType, isbn, pageCount, paperType, publicationYear) {
        this._getProductInfoSection().first().should('be.visible');
        this._getProductInfoSection().first().should('contain', productType);
        this._getProductInfoSection().first().should('contain', isbn);
        this._getProductInfoSection().first().should('contain', pageCount);
        this._getProductInfoSection().first().should('contain', paperType);
        this._getProductInfoSection().first().should('contain', publicationYear);
    }

    clickAddToCartButton() {
        this._getAddToCartButton().first().should('be.visible').scrollIntoView().click({ force: true });
    }

    verifySuccessfulAddToCartMessage() {
        this._getAddToCartSuccessMessage().first().should('be.visible').and('contain', 'Sepet');
    }

    closeAddToCartModal() {
        this._getCloseModalButton().first().click({ force: true });
    }

    verifyCartIconCount(expectedCount) {
        this._getCartIconCount().first().should('be.visible');
        this._getCartIconCount().first().invoke('text').then((cartText) => {
            const currentCount = parseInt(cartText.trim(), 10);
            expect(currentCount).to.equal(expectedCount);
        });
    }

    clickGoToCartButton() {
        this._getGoToCartButton().first().should('be.visible').click({ force: true });
    }
}


export default new ProductPage();
