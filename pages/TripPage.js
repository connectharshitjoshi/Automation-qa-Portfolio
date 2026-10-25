// @ts-check
const { BasePage } = require('./BasePage');

class TripPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Header Navigation Locators
    this.navFlights = this.page.locator('[data-testid="nav-flights"]');
    this.navSeatSelection = this.page.locator('[data-testid="nav-seat-selection"]');
    this.navMyBookings = this.page.locator('[data-testid="nav-my-bookings"]');

    // Search Engine Locators
    this.inputOrigin = this.page.locator('#inputOrigin, [data-testid="input-origin"]');
    this.inputDestination = this.page.locator('#inputDestination, [data-testid="input-destination"]');
    this.inputDepDate = this.page.locator('#inputDepDate, [data-testid="input-departure-date"]');
    this.inputRetDate = this.page.locator('#inputRetDate, [data-testid="input-return-date"]');
    this.btnSearchFlights = this.page.locator('#btnSearchFlights, [data-testid="btn-search-flights"]');
    this.popularRouteJFK = this.page.locator('[data-testid="route-jfk-lhr"]');

    // Flight Results Feed Locators
    this.flightCardBA = this.page.locator('[data-testid="flight-card-ba178"]');
    this.flightCardVS = this.page.locator('[data-testid="flight-card-vs004"]');
    this.btnSelectBA178 = this.page.locator('[data-testid~="btn-select-ba178"], [data-testid~="btn-select-seat"]').first();
    this.filterNonstop = this.page.locator('#chk-nonstop, [data-testid="filter-stops-nonstop"]');
    this.fareCalendarGrid = this.page.locator('.fare-calendar-grid');

    // Seat Selection Cabin Locators
    this.seat14A = this.page.locator('#seat-14A, [data-testid="seat-14A"]');
    this.seat10D = this.page.locator('[data-testid="seat-10D"]');
    this.seat11A = this.page.locator('[data-testid="seat-11A"]');
    this.fareTotalDisplay = this.page.locator('#fareTotalDisplay, [data-testid="fare-total-display"]');
    this.btnConfirmSeat = this.page.locator('[data-testid="btn-confirm-seat"]');

    // Boarding Pass & Confirmation Locators
    this.pnrDisplay = this.page.locator('#pnrDisplay, [data-testid~="pnr-display"], [data-testid~="booking-pnr-code"]');
    this.statusConfirmedPill = this.page.locator('.status-confirmed-pill');
  }

  /**
   * Search for flights between cities
   * @param {string} origin
   * @param {string} destination
   */
  async searchFlights(origin = 'New York, JFK Intl (JFK)', destination = 'London, Heathrow (LHR)') {
    await this.inputOrigin.fill(origin);
    await this.inputDestination.fill(destination);
    await this.btnSearchFlights.click();
  }

  /**
   * Select the primary flight offer
   */
  async selectFirstFlight() {
    await this.btnSelectBA178.click();
  }

  /**
   * Pick an aircraft seat by test ID or selector
   * @param {string} seatId
   */
  async chooseSeat(seatId = '14A') {
    const seatLocator = this.page.locator(`[data-testid="seat-${seatId}"], #seat-${seatId}`);
    await seatLocator.click();
  }

  /**
   * Confirm chosen seat and advance to boarding pass
   */
  async confirmSeat() {
    await this.btnConfirmSeat.click();
  }
}

module.exports = { TripPage };
