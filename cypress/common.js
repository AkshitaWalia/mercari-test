export const appUrl = "https://jp.mercari.com/en";

export const elementSelectors = {
  searchBar: '[data-testid="search-autocomplete"]',
  searchModal: "#search-bar-autocomplete",
  searchHistoryModal: '[data-testid="search-history"]',
  browsingEntryButton: '[data-testid="merListItem-container"]',
  searchByCategoryButton: 'a[href="/en/categories"]',
  tier1CategoryButton: 'a[href="/en/categories?category_id=5"]',
  tier2CategoryButton: 'a[href="/en/categories?category_id=72"]',
  tier3CategoryButton: 'a[href="/en/search?category_id=674"]',
  filterDropdown: '[data-testid="facet-item-dropdown"] select',
  filterCheckbox: '[data-testid="check-item"][value="674"]',
};

export const generateCategoryButtonSelector = (id) => {
  return `a[href="/en/categories?category_id=${id}"]`;
};

export const generateSearchButtonSelector = (id) => {
  return `a[href="/en/search?category_id=${id}"]`;
};

export const urlSelectors = {
  allCategoriesPage: "/en/categories",
  tier1CategoryPage: "/en/categories?category_id=5",
  tier2CategoryPage: "/en/categories?category_id=72",
  searchPage: "/en/search",
};

export const filtersApplied = {
  tier1: {
    text: "Books, Magazines, Manga",
    value: "5",
  },
  tier2: {
    text: "Book",
    value: "72",
  },
  tier3: {
    text: "Computer It",
    value: "674",
  },
};

export function createSearchHistory(
  tier1CategoryId,
  tier2CategoryId,
  tier3CategoryId
) {
  cy.visit(appUrl);
  cy.get(elementSelectors.searchBar).click();
  cy.get(elementSelectors.searchModal).within(() => {
    cy.get(elementSelectors.searchByCategoryButton).click();
  });
  cy.get(generateCategoryButtonSelector(tier1CategoryId)).click();
  cy.get(generateCategoryButtonSelector(tier2CategoryId)).click();
  cy.get(generateSearchButtonSelector(tier3CategoryId)).click();
}
