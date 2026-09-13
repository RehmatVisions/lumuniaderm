// Hybrid approach - Local storage + manual Google Sheet sync

export async function saveBooking(bookingData) {
  try {
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push({
      ...bookingData,
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    console.log("✅ Booking saved to browser storage!");
    console.log("Total bookings:", bookings.length);

    // Try to sync with Google Sheet (optional)
    try {
      await syncToGoogleSheet(bookingData);
    } catch (syncError) {
      console.log("⚠️ Google Sheet sync failed, data saved locally");
    }

    return { success: true, data: bookingData };
  } catch (error) {
    console.error("❌ Error:", error);
    return { success: false, error: error.message };
  }
}

async function syncToGoogleSheet(bookingData) {
  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycbwcRMHQAMqH8zaHIi0dPUQz5jNIQIeoNx1Pk6s0fg2PeHWcQZ5R9EmvZoGD-goZvrKZ/exec";

  const response = await fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify(bookingData),
  });

  const result = await response.json();
  if (result.success) {
    console.log("✅ Also synced to Google Sheet!");
  }
}
