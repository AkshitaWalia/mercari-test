import {
  appUrl,
  elementSelectors,
  filtersApplied,
  urlSelectors,
  createSearchHistory,
} from "../common";

describe("Verify search conditions are set correctly from the latest browsing history", () => {
  beforeEach(() => {
    createSearchHistory(5, 72, 668);
    createSearchHistory(
      filtersApplied.tier1.value,
      filtersApplied.tier2.value,
      filtersApplied.tier3.value
    );
    cy.visit(appUrl);
  });

  it("Verify search conditions are set correctly from the latest browsing history", () => {
    // Verify search bar is visible
    const searchBar = cy.get(elementSelectors.searchBar);
    searchBar.should("be.visible");
    searchBar.click();

    // Verify search history is visible and 2 browsing entries are present
    cy.get(elementSelectors.searchHistoryModal).within(() => {
      cy.get(elementSelectors.browsingEntryButton)
        .should("be.visible")
        .and("have.length", 2);

      const latestEntry = cy.get(elementSelectors.browsingEntryButton).eq(0);
      latestEntry.should("contain.text", filtersApplied.tier3.text);

      latestEntry.click();
    });

    // Verify search page is visible and filters are applied correctly as per the latest entry
    cy.url().should("contain", urlSelectors.searchPage);
    const tier1Filter = cy.get(elementSelectors.filterDropdown).eq(0);
    tier1Filter
      .should("be.visible")
      .and("contain.value", filtersApplied.tier1.value)
      .and("contain.text", filtersApplied.tier1.text);
    const tier2Filter = cy.get(elementSelectors.filterDropdown).eq(1);
    tier2Filter
      .should("be.visible")
      .and("contain.value", filtersApplied.tier2.value)
      .and("contain.text", filtersApplied.tier2.text);
    const tier3Filter = cy.get(elementSelectors.filterCheckbox);
    tier3Filter.should("be.visible").and("be.checked");

    // Type keyword in search bar
    cy.get(elementSelectors.searchBar).within(() => {
      cy.get("input").type("JavaScript{enter}");
    });

    // Verify there are 3 browsing histories and the latest entry should be the one we searched using keyword
    cy.visit(appUrl);
    cy.get(elementSelectors.searchBar).click();
    cy.get(elementSelectors.searchHistoryModal).within(() => {
      cy.get(elementSelectors.browsingEntryButton)
        .should("be.visible")
        .and("have.length", 3);

      const latestEntry = cy.get(elementSelectors.browsingEntryButton).eq(0);
      latestEntry.should(
        "contain.text",
        "JavaScript, " + filtersApplied.tier3.text
      );
    });
  });
});
