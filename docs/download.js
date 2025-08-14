document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const statusEl = document.getElementById("status");
    const downloadLink = document.getElementById("download-link");
  
    if (!sessionId) {
      statusEl.textContent = "No session ID provided.";
      const loadingSpinner = document.getElementById("loading-spinner");
      if (loadingSpinner) {
        loadingSpinner.style.display = "none";
      }
      return;
    }
  
    try {
      const res = await fetch(
        `https://fallinorg-download.roccemagneta.workers.dev/get-download?session_id=${sessionId}`
      );
  
      if (!res.ok) {
        const errorText = await res.text();
        statusEl.textContent = `Error verifying payment: ${errorText}`;
        const loadingSpinner = document.getElementById("loading-spinner");
        if (loadingSpinner) {
          loadingSpinner.style.display = "none";
        }
        return;
      }
  
      // Create a blob from the response
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
  
      // Update UI
      statusEl.textContent = "Your payment was verified!";
      downloadLink.href = url;
      downloadLink.download = "Fallinorg_v1.0.0-beta.zip";
      downloadLink.style.display = "inline-block";
      downloadLink.textContent = "Download Fallinorg";
      
            // Hide loading spinner
      const loadingSpinner = document.getElementById("loading-spinner");
      if (loadingSpinner) {
        loadingSpinner.style.display = "none";
      }

      // Optional: Auto-trigger download
      downloadLink.click();
      
      // Show home link after download starts
      const homeLink = document.getElementById("home-link");
      if (homeLink) {
        homeLink.style.display = "block";
      }
  
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Error verifying payment.";
      const loadingSpinner = document.getElementById("loading-spinner");
      if (loadingSpinner) {
        loadingSpinner.style.display = "none";
      }
    }
  });