import {
  appUrl,
  elementSelectors,
  filtersApplied,
  urlSelectors,
} from "../common";

describe("Verify search conditions are set correctly", () => {
  beforeEach(() => {
    cy.visit(appUrl);
  });

  it("Verify search conditions are set correctly", () => {
    // Verify search bar is visible
    const searchBar = cy.get(elementSelectors.searchBar);
    searchBar.should("be.visible");
    searchBar.click();

    // Verify search modal is open and search by category button is visible
    cy.get(elementSelectors.searchModal).within(() => {
      const searchByCategoryButton = cy.get(
        elementSelectors.searchByCategoryButton
      );
      searchByCategoryButton.should("be.visible");
      searchByCategoryButton.click();
    });

    // Verify all categories are visible and the page contains button for tier 1 category selection
    cy.url().should("contain", urlSelectors.allCategoriesPage);
    const tier1CategoryButton = cy.get(elementSelectors.tier1CategoryButton);
    tier1CategoryButton
      .should("be.visible")
      .and("contain.text", filtersApplied.tier1.text);
    tier1CategoryButton.click();

    // Verify sub-categories of previous selected category are visible and the page contains button for tier 2 category selection
    cy.url().should("contain", urlSelectors.tier1CategoryPage);
    const tier2CategoryButton = cy.get(elementSelectors.tier2CategoryButton);
    tier2CategoryButton
      .should("be.visible")
      .and("contain.text", filtersApplied.tier2.text);
    tier2CategoryButton.click();

    // Verify sub-categories of previous selected sub-category are visible and the page contains button for tier 3 category selection
    cy.url().should("contain", urlSelectors.tier2CategoryPage);
    const tier3CategoryButton = cy.get(elementSelectors.tier3CategoryButton);
    tier3CategoryButton
      .should("be.visible")
      .and("contain.text", filtersApplied.tier3.text);
    tier3CategoryButton.click();

    // Verify search page is visible
    cy.url().should("contain", urlSelectors.searchPage);

    // Verify select box contains value and text as per the selected tier 1 category
    const tier1Filter = cy.get(elementSelectors.filterDropdown).eq(0);
    tier1Filter
      .should("be.visible")
      .and("contain.value", filtersApplied.tier1.value)
      .and("contain.text", filtersApplied.tier1.text);

    // Verify select box contains value and text as per the selected tier 2 category
    const tier2Filter = cy.get(elementSelectors.filterDropdown).eq(1);
    tier2Filter
      .should("be.visible")
      .and("contain.value", filtersApplied.tier2.value)
      .and("contain.text", filtersApplied.tier2.text);

    // Verify checkbox is checked for selected tier 3 category
    const tier3Filter = cy.get(elementSelectors.filterCheckbox);
    tier3Filter.should("be.visible").and("be.checked");
  });
});
