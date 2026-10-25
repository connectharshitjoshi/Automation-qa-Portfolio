// ====================================================
// TripEase Global State Engine & Automation Fixture
// ====================================================

const TRIPEASE_STORAGE_KEY = "tripease_booking_state";

const DEFAULT_STATE = {
  search: {
    origin: "New York, JFK Intl (JFK)",
    originCode: "JFK",
    destination: "London, Heathrow (LHR)",
    destinationCode: "LHR",
    depDate: "2025-10-14",
    retDate: "2025-10-24",
    tripType: "roundtrip",
    travelers: "1 Adult",
    cabinClass: "Economy",
    directOnly: true,
    flexibleDates: true
  },
  selectedFlight: {
    id: "BA-178",
    airline: "British Airways",
    flightNumber: "BA-178",
    aircraft: "Boeing 787-9 Dreamliner",
    depTime: "08:30 AM",
    arrTime: "20:25 PM",
    duration: "7h 55m",
    stops: "Non-stop",
    depAirport: "JFK",
    arrAirport: "LHR",
    depTerminal: "Terminal 8",
    arrTerminal: "Terminal 5",
    depGate: "Gate 14B",
    boardingGroup: "GROUP 3 (Priority Lane)",
    baseFare: 489.00
  },
  selectedSeat: {
    seatNumber: "14A",
    type: "Window - Extra Legroom",
    pitch: "34\"",
    surcharge: 45.00,
    cabin: "Premium Economy (World Traveller Plus)"
  },
  traveler: {
    title: "Mr",
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    dob: "1988-06-14",
    passportNumber: "T89124018",
    issuingCountry: "United States",
    passportExpiry: "2030-10-18",
    frequentFlyer: "BA #9948201 (Executive Club Silver)",
    hasProtection: true,
    protectionFee: 38.00,
    hasCarbonOffset: false,
    carbonFee: 4.50
  },
  booking: {
    pnr: "7X8K2M",
    eTicketNumber: "125-9948201844",
    totalFare: 572.00,
    status: "CONFIRMED",
    paymentMethod: "Apple Pay (•••• 4242)",
    issuedAt: "14 Oct 2025, 08:30 AM"
  }
};

// Initialize / Retrieve State
function getTripState() {
  try {
    const raw = localStorage.getItem(TRIPEASE_STORAGE_KEY);
    if (!raw) {
      saveTripState(DEFAULT_STATE);
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Storage fallback triggered:", e);
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveTripState(state) {
  try {
    localStorage.setItem(TRIPEASE_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Storage write failed:", e);
  }
}

// Global Toast System
function showTripToast(message, type = "success") {
  let toastEl = document.getElementById("tripease-toast");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "tripease-toast";
    toastEl.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #0f172a;
      color: #ffffff;
      padding: 0.85rem 1.25rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
      z-index: 9999;
      display: none;
      animation: fadeIn 0.2s ease-out;
      border-left: 4px solid #0284c7;
    `;
    document.body.appendChild(toastEl);
  }

  if (type === "error") {
    toastEl.style.borderLeftColor = "#ef4444";
  } else if (type === "gold") {
    toastEl.style.borderLeftColor = "#f59e0b";
  } else {
    toastEl.style.borderLeftColor = "#0284c7";
  }

  toastEl.textContent = message;
  toastEl.style.display = "block";

  setTimeout(() => {
    toastEl.style.display = "none";
  }, 3500);
}

// Reset / Seed for Automated Tests
window.resetTripState = function() {
  saveTripState(DEFAULT_STATE);
  showTripToast("TripEase test fixtures restored to baseline (JFK → LHR BA-178).");
};
