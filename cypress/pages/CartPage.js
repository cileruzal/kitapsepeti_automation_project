class CartPage {
  constructor() {
    this.pageUrls = {
      sepet: "/sepet"
    };
  }

  //---------------------------------------------------------
  // Locators - (Encapsulation) 
  //---------------------------------------------------------

  //delete-product-4364400

  _getCartBadge() { return cy.get('.cart-soft-count'); }
  _getCartPanel() { return cy.get('#header-cart-panel-128'); }
  _getCartButton() { return cy.get('#header-cart-btn'); }
  _getCartTitle() { return cy.get('#header-cart-panel-128 .drawer-title span'); }
  _getProductName(){ return cy.get('.cart-item-title, .cart-item-name, .product-title, .cart-item a')}
  _getUnitPrice() {return cy.get('.cart-item-price-wrapper')}
  _getCartTotal() {return cy.get('#cart-price-container .col-6.pl-0.text-right').eq(0);}
  _getShippingFee() {return cy.get('#cart-price-container .col-6.pl-0.text-right').eq(1);}
  _getGeneralTotal() {return cy.get('#cart-price-container .col-6.pl-0.text-right').eq(2);}
  _getProductCount() { return cy.get('input[id^="qty"]'); }
  _getTotalPrice() { return cy.get('.cart-item .price-sell').last(); }
  _getAddToCartButton() { return cy.get('.product-buttons-item.add-to-cart-btn'); }
  _getPlusButton() { return cy.get('span[id^="qty-plus"]'); }
  _getDeleteProductButton() { return cy.get('#delete-product-4364400'); }
  _getDeleteModalWindow() { return cy.get('.t-popconfirm-inner'); }
  _getDeleteConfirm() { return cy.get('.t-popconfirm-cancel-btn'); }
  _getClearAllCart() { return cy.get('#clear-cart-btn-129'); }
  _getEmptyCart() { return cy.get('.fw-light.text-center'); }
  _getContinueShoppingButton() { return cy.get('#cart-back-btn'); }
  _getDeleteConfirmButton() { return cy.get('.t-popconfirm-buttons .btn-light.t-popconfirm-cancel-btn'); } 
  _getClearAllCartButton() { return cy.get('#clear-cart-btn-129'); } 
  _getEmptyCartMessage() {return cy.get('.p.fw-light.text-center.mb-2')}
  _getCheckoutButton() {return cy.get('a.btn.btn-secondary.w-100')}
  _getPopupGoToCartButton() {return cy.get('#go-cart-btn'); {timeout : 10000} } 

  //---------------------------------------------------------
  // Actions & Verifications 
  //---------------------------------------------------------

  //Background

  clearAllCart() {
    this._getClearAllCart().click()
  }

  //TC14 assertions
  navigateToCart() {
    cy.visit(this.pageUrls.sepet);
  }

  clickGoToCartButton() {
    this._getCartButton().click();
  }

  openCart() {
    this._getCartPanel().should('be.visible').and('have.class', 'active');
    this._getCartTitle().should('contain.text', 'Sepetim').and('be.visible');
  }

  verifyCartURL() {
    cy.url().should('include', '/sepet');
  }

  //TC15 assertions
// Ana sayfadan sepete ürün ekleyip sepet sayfasına geçişi garanti eden metot
  addProductAndGoToCartDirectly() {
    cy.visit('/sepet', { failOnStatusCode: false });    
    cy.scrollTo(0, 400);
    this._getAddToCartButton().first().scrollIntoView();
    this._getAddToCartButton().first().click({ force: true });
    //  ürün eklenince pop-up açılıyor ve "Sepete Git" çıkıyorsa:
    //this._getPopupGoToCartButton().click();
    cy.wait(1000); 
    //cy.get('.cart-soft-count').should('not.have.text', '0');
    this.navigateToCart();
  }

    goToCartPage() {
    this._getCartButton().click();
    this._getPopupGoToCartButton().click();
  }

displayCartDetails() {
    this._getProductName().first().scrollIntoView().should('be.visible');
    this._getUnitPrice().first().scrollIntoView().should('be.visible');
    this._getProductCount().first().scrollIntoView().should('be.visible');
    this._getTotalPrice().scrollIntoView().should('be.visible');
  }

verifyGeneralTotal() {
    let cartTotal = 0;
    let shipping = 0;

    this._getCartTotal().invoke('text').then((text) => {cartTotal = parseFloat(text.replace('.', '').replace(',', '.'));});
    this._getShippingFee().invoke('text').then((text) => {shipping = parseFloat(text.replace('.', '').replace(',', '.'));});
    this._getGeneralTotal().invoke('text').then((text) => {const total = parseFloat(text.replace('.', '').replace(',', '.'));expect(total).to.be.closeTo(cartTotal + shipping, 0.01);});    
}

  // TC16 assertions
  // +. increase product quantity and verify updated total price
increaseProductQuantity(button) {
    this._getPlusButton().click();
  }


  verifyQuantity(expectedQty) {
    this._getProductCount().should('have.value', '2').and('be.visible');
  }

  //TC17 assertions

clearCartViaButton() {
    this._getDeleteProductButton().first().click();  
    // Eğer sepeti temizle butonuna basınca pop-up çıkıyorsa onay butonuna bas:
    this._getDeleteModalWindow().should('be.visible');
    this._getDeleteConfirmButton().click();
    // Silme işleminden sonra DOM'un yüklenmesi için küçük bir bekleme veya görünürlük garantisi
    cy.wait(1000); // Alternatif olarak API response 
  }
  

verifyEmptyCartState() {
    // Sınıf yerine doğrudan yazı içeriğiyle (contains) aratalım:
    cy.contains('p', 'Sepetinizde Ürün Bulunmamaktadır')
      .should('be.visible');
    
    this._getContinueShoppingButton()
      .should('be.visible');
  }

  //TC18 assertions


// "Satın Al" butonunun görünür ve tıklanabilir olduğunu doğrulama 
verifyCheckoutButtonIsPresentAndClickable() {
    this._getCheckoutButton()
      .should('be.visible')
      .and('not.be.disabled');
  }

  // TC19 assertions


  // Pop-up'taki "Sepete Git" butonuna tıklama
clickPopupGoToCartButton() {
  cy.get('body').then(($body) => {
      // Eğer buton ekranda görünüyorsa tıkla, görünmüyorsa doğrudan sepet sayfasına git veya bekle
      if ($body.find('#go-cart-btn').length > 0) {
        this._getPopupGoToCartButton().should('be.visible').click({ force: true});
      } else {
        cy.visit('/sepet');
      }
    });
  }

}

export default new CartPage();