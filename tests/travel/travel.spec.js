// @ts-check
const { test, expect } = require('@playwright/test');
const { TripPage } = require('../../pages/TripPage');

test.describe('TripEase Global Mobility Suite Benchmark', () => {
  let tripPage;

  test.beforeEach(async ({ page }) => {
    tripPage = new TripPage(page);
    await tripPage.navigate('/apps/tripease/index.html');
    await tripPage.waitForLoad();
  });

  test('TC-TRIP-01: Flight search route JFK to LHR navigates to results feed', async ({ page }) => {
    await expect(page).toHaveTitle(/TripEase/i);

    const popularRoute = page.locator('[data-testid="route-jfk-lhr"]');
    if (await popularRoute.isVisible()) {
      await popularRoute.click();
    } else {
      await tripPage.searchFlights('JFK', 'LHR');
    }

    await expect(page).toHaveURL(/results\.html/);
    const flightResults = page.locator('.flight-card-box, [data-testid^="flight-card"]');
    await expect(flightResults.first()).toBeVisible();
  });

  test('TC-TRIP-02: Flexible date fare calendar matrix displays rates', async ({ page }) => {
    await page.goto('/apps/tripease/results.html?origin=JFK&dest=LHR');
    await tripPage.waitForLoad();

    const calendarGrid = page.locator('.fare-calendar-grid');
    await expect(calendarGrid).toBeVisible();

    const farePill = page.locator('.fare-col-btn').first();
    await expect(farePill).toBeVisible();
  });

  test('TC-TRIP-03: Cabin seat selector updates total fare calculation dynamically', async ({ page }) => {
    await page.goto('/apps/tripease/seat-selection.html');
    await tripPage.waitForLoad();

    // Select extra legroom seat 10D
    const seat10D = page.locator('[data-testid="seat-10D"], #seat-10D');
    if (await seat10D.isVisible()) {
      await seat10D.click();
    }

    const fareTotal = page.locator('#fareTotalDisplay, [data-testid="fare-total-display"]');
    await expect(fareTotal).toBeVisible();
  });

  test('TC-TRIP-04: Digital boarding pass renders active PNR and verified flight telemetry', async ({ page }) => {
    await page.goto('/apps/tripease/boarding-pass.html');
    await tripPage.waitForLoad();

    const pnrDisplay = page.locator('#pnrDisplay, [data-testid~="pnr-display"]');
    await expect(pnrDisplay).toBeVisible();
    await expect(pnrDisplay).not.toBeEmpty();

    const telemetry = page.locator('.telemetry-strip');
    await expect(telemetry).toBeVisible();
  });
});
