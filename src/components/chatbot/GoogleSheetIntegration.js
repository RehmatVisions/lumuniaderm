// ============================================================================
// GOOGLE SHEETS INTEGRATION SERVICE
// ============================================================================

// Google Apps Script WebApp URL - UPDATED V3
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyDt7VmwAt2lJ4w-iffXIpu6rQHHrvD9hdRoMA7WcAL2v16yaSiP2nsTSQqJZ1/exec";

// ============================================================================
// BOOKING KO GOOGLE SHEET MEIN SAVE KARO
// ============================================================================

export async function saveBookingToSheet(bookingData) {
  try {
    const payload = {
      bookingId: bookingData.bookingId,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      treatment: bookingData.treatment,
    };

    console.log("📤 Sending booking to Google Sheet...");
    console.log("URL:", GOOGLE_APPS_SCRIPT_URL);
    console.log("Payload:", payload);

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(payload),
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    const text = await response.text();
    console.log("Response text:", text);

    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("JSON parse error:", e);
      result = { success: false, error: "Invalid response format" };
    }

    console.log("Parsed result:", result);

    if (result.success) {
      console.log("✅ SUCCESS! Booking saved:", result.bookingId);
      return { success: true, data: result };
    } else {
      console.error("❌ FAILED! Error:", result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error("❌ EXCEPTION:", error);
    console.error("Error stack:", error.stack);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// ALL BOOKINGS GET KARO GOOGLE SHEET SE
// ============================================================================

export async function getAllBookings() {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL);
    const bookings = await response.json();
    
    console.log("✅ Bookings fetched from Google Sheet:", bookings);
    return { success: true, data: bookings };
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// SPECIFIC BOOKING GET KARO
// ============================================================================

export async function getBookingById(bookingId) {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL);
    const bookings = await response.json();
    
    const booking = bookings.find(b => b.bookingId === bookingId);
    
    if (booking) {
      console.log("✅ Booking found:", booking);
      return { success: true, data: booking };
    } else {
      console.log("❌ Booking not found");
      return { success: false, error: "Booking not found" };
    }
  } catch (error) {
    console.error("❌ Error fetching booking:", error);
    return { success: false, error: error.message };
  }
}

// ============================================================================
// BOOKING STATUS UPDATE KARO
// ============================================================================

export async function updateBookingStatus(bookingId, newStatus) {
  try {
    const payload = {
      action: "updateStatus",
      bookingId: bookingId,
      newStatus: newStatus,
    };

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (result.success) {
      console.log("✅ Booking status updated:", result);
      return { success: true, data: result };
    } else {
      console.error("❌ Error updating status:", result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    return { success: false, error: error.message };
  }
}
