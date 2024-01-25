document.addEventListener("DOMContentLoaded", function() {
    // Function to display the screenshot if available in local storage
    function displayScreenshot() {
        // Check if the image URL is available in local storage
        const screenshotUrl = localStorage.getItem("screenshotUrl");

        if (screenshotUrl) {
            console.log("Screenshot URL:", screenshotUrl);

            // Create an image element
            const img = document.createElement("img");

            // Set the source of the image to the screenshot URL
            img.src = screenshotUrl;

            // Set the onload event for the image
            img.onload = function() {
                console.log("Image loaded successfully");
                // Append the image to the imageContainer div
                const imageContainer = document.getElementById("imageContainer");
                if (imageContainer) {
                    imageContainer.appendChild(img);
                } else {
                    console.error("Element with ID 'imageContainer' not found.");
                }
            };

            // Set error handler for the image
            img.onerror = function() {
                console.error("Error loading image:", screenshotUrl);
            };
        } else {
            console.log("No screenshot found in local storage.");
        }
    }

    // Call the function to display the screenshot
    displayScreenshot();
});
