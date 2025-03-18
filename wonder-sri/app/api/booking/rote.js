export async function POST(request) {
    const { name, email, phone, pax, date, timeSlot, activity, recaptchaToken } = await request.json();
  
    // Verify reCAPTCHA (example using Google's API)
    const secretKey = "6LfWUfYqAAAAAN56jEw9KWql-HOpCP_aKSqroaEa"; // Replace with your actual reCAPTCHA secret key
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const recaptchaData = await recaptchaResponse.json();
  
    if (!recaptchaData.success) {
      return new Response(JSON.stringify({ success: false, message: "reCAPTCHA verification failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    // Process the booking (e.g., save to a database)
    console.log("Booking Data:", { name, email, phone, pax, date, timeSlot, activity });
  
    // Example: Return success response (replace with your database logic)
    return new Response(JSON.stringify({ success: true, message: "Booking submitted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }