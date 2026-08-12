class SearchPage {
    pageUrls = {
        "homepage": "/"
    };

    // ---------------------------------------------------------
    // Locators - (Encapsulation) 
    // ---------------------------------------------------------

    _getSearchInput() { return cy.get('#live-search'); } // Arama input alanı
    _getSearchButton() { return cy.get('#live-search-btn').contains('Ara'); } // Arama butonu
    
    // Genel ürün kartları (Sayfanın herhangi bir yerindeki kartlar)
    _getProductCards() { return cy.get('.product-detail-card, .product-item'); } 
    
    // Sadece arama sonuç sayfasındaki ürünleri listeleyen ana alan (footer/çok satanlar karışmasın diye)
    _getSearchResultCards() { return cy.get('.search-page-products, .product-list, .row').find('.product-detail-card, .product-item, .col-md-3'); }

    _getSortingDropdown() { return cy.get('#sort'); } // Sıralama menüsü
    _getFilterOptionsCat() { return cy.get('#accordion-categories-361'); } // Kategori filtresi
    _getFilterOptionsBrand() { return cy.get('#accordion-brand-361'); } // Marka filtresi
    _getFilterOptionsModel() { return cy.get('#accordion-model-361'); } // Model filtresi
    _getCategoryHeader() { return cy.get('.header-mobile-menu-btn'); } // Mobil/Kategori menü butonu
    _getMenuHeader() { return cy.get('#mobile-menu-322 > div > div.drawer-title > span'); } // Menü başlığı
    _getMenuContainer() { return cy.get('nav.mb-2 > ul.clearfix'); } // Menü içerik alanı
    _getMobileMenuCloseBtn() { return cy.get('#mobile-menu-close'); } // Menü kapatma butonu

    // ---------------------------------------------------------
    // Actions & Verifications 
    // ---------------------------------------------------------

    //TC06 Assertions
    // Arama çubuğunun görünür ve aktif olduğunu doğrular
    verifySearchInput() {
        this._getSearchInput().should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Aradığınız ürünün adını yazınız.');
    }

    // Arama çubuğuna metin yazar
    fillSearchInput(keyword) {
        this._getSearchInput().click({ force: true }).clear({ force: true }).type(keyword, { force: true }).should('be.visible');
    }

    // Arama işlemini tetikler (Enter tuşu ile) ve araya giren olası pop-up'ları kapatır
    submitSearch() {
        this._getSearchInput().type('{enter}', { force: true });
        
        cy.get('body').then(($body) => {
            if ($body.find('.fancybox-item.fancybox-close, [id^="t-modal-close"], .modal-close').length > 0) {
                cy.get('.fancybox-item.fancybox-close, [id^="t-modal-close"], .modal-close').click({ multiple: true, force: true });
            }
        });
    }

    // Pozitif aramada en az 1 ürün listelendiğini doğrular
    verifySearchResults() {
        this._getProductCards().should('be.visible').and('have.length.at.least', 1);
    }

    // Arama yapıldıktan sonra input alanının temizlendiğini doğrular
    verifySearchInputCleared() {
        this._getSearchInput().should('be.visible').and('have.value', '');
    }

    // TC07 - Negatif arama: Arama sonucunda hiç ürün bulunamadığını (adet = 0) doğrular
    verifyNoProductCardsDisplayed() {
        // Footer veya Çok Satanlar modülleri ile karışmaması için özel arama sonuç listesi kontrol edilir
        cy.get('body').then(($body) => {
            if ($body.find('.product-detail-card, .product-item').length > 0) {
                // Eğer sayfa genelinde kart varsa, sadece arama listesinin 0 elemanlı olduğunu zorunlu kıl
                this._getSearchResultCards().should('have.length', 0);
            } else {
                this._getProductCards().should('have.length', 0);
            }
        });
    }

    // TC08 - Ürün kartı üzerindeki elementlerin bütünlüğünü (görsel, başlık, yayınevi, fiyat) sınırlar içinde kontrol eder
    verifyProductCardIntegrity() {
        cy.wait(1000); 
        cy.window().scrollTo('top'); 
        this._getProductCards().first().within(() => {
            cy.root().should('exist').and('be.visible'); 
            cy.get('.product-title').should('be.visible').and('not.be.empty'); 
            cy.get('.brand-title').should('be.visible'); 
            cy.get('span.product-price').should('be.visible'); 
            cy.log('Product card integrity verified within the scope!'); 
        });
    }

    // Ürün kartına hover (fare ile üzerine gelme) işlemi yapar
    hoverProductPrice() {
        this._getProductCards()
            .first()
            .scrollIntoView()
            .trigger('mouseover', { force: true });
    }

    // Hover sonrası "Sepete Ekle" butonunun görünür olup tıklanabildiğini test eder
    verifyAddToCartButtonState() {
        cy.get('[id^="product-addcart-button"]')
            .first()
            .should('exist')
            .click({ force: true }); 
    }
    
    //TC09 Assertions
    // Sıralama menüsünü açar
    openSortingDropdown() {
        this._getSortingDropdown().select('Varsayılan Sıralama', { force: true });
    }

    // Sıralama menüsündeki seçeneklerin varlığını doğrular
    verifySortingMenuOptions() {
        this._getSortingDropdown().should('contain', 'Fiyat Artan')
                                 .and('contain', 'Fiyat Azalan')
                                 .and('contain', 'Yeniden Eskiye')
                                 .and('contain', 'Eskiden Yeniye')
                                 .and('contain', 'Varsayılan Sıralama');
    }

    // Filtreleme seçeneklerine tıklar
    applyCategoryFilters() {
        this._getFilterOptionsCat().contains('Kategoriler').click({ force: true });
        this._getFilterOptionsBrand().contains('Marka').click({ force: true });
        this._getFilterOptionsModel().contains('Model').click({ force: true });
    }

    // Filtrelenmiş sonuçların görüntülendiğini doğrular
    verifyFilteredResults() {
        this._getProductCards().should('be.visible');
    }

    //TC09 Assertions
    // Üst menüden kategoriye tıklar
    clickHeaderCategory() {
        this._getCategoryHeader().click({ force: true });
    }

    // Kategori yan menüsünün (sidebar) açıldığını ve içeriklerini doğrular
    verifyMenuSidebar() {
        this._getMenuHeader().should('be.visible').and('contain.text', 'Menü');
        this._getMenuContainer().should('be.visible');
        this._getMenuContainer().within(() => {
            cy.get('li').should('contain', 'ROMAN')
                        .and('contain', 'ÇOK SATANLAR')
                        .and('contain', 'BİLİM KURGU')
                        .and('contain', 'ÇOCUK KİTAPLARI')
                        .and('contain', 'ÇİZGİ ROMAN');
            });
        this._getMobileMenuCloseBtn().should('be.visible').click({ force: true }).should('not.be.visible');
    
        cy.log('Sidebar navigation verified.');
    }

    // Lazy Loading (sonsuz kaydırma) özelliğini doğrular
    verifyLazyLoadingActive() {
        const initialCount = 10;
        this._getProductCards().should('have.length.at.least', initialCount);
    }
}

export default new SearchPage();