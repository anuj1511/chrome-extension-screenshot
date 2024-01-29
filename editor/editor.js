document.addEventListener("DOMContentLoaded", function() {
    // Function to display the screenshot if available in local storage
    function displayScreenshot() {
        // Check if the image URL is available in local storage
        const screenshotUrl = localStorage.getItem("screenshotUrl");

        if (screenshotUrl) {
            console.log("Screenshot URL:", screenshotUrl);
            

            // Create an image element
            // const img = document.createElement("img");
            const img = document.getElementById("image");

            // Set the source of the image to the screenshot URL
            img.src = screenshotUrl;
            console.log(img);

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

    // Get input fields for image name and description
    // const imageNameInput = document.getElementById("imageName");
    const imageDescriptionInput = document.getElementById("imageDescription");

    // Get the post button
    const postButton = document.getElementById("postButton");

    // Add event listener for post button click
    postButton.addEventListener('click', function(event) {
        // Get the image name and description
        const imageDescription = imageDescriptionInput.value;

        // Get the image data
        const imageData = localStorage.getItem("screenshotUrl");

        // Retrieve the pageUrl from localStorage
        // const pageUrl = localStorage.getItem("pageUrl");
        const pageUrl = "anuj"

        // Construct the postData object
        const postData = {
            description: imageDescription,
            imagePath: imageData,
            // url: pageUrl
        };

        console.log(postData);

        // Clear the input fields after submission
        imageDescriptionInput.value = '';

        const url = "https://guide-data.onrender.com/upload/edit/site/?url=" + pageUrl;

        // Simulate sending data to a URL (for demonstration purposes)
        // Replace the URL with your actual endpoint
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            console.log('Data sent successfully');
            console.log("response: ", response);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    });

    let clickEnabled = false;
    let clickCount = 0;
    
    document.getElementById('enableButton').addEventListener('click', function() {
        clickEnabled = true;
    });
    
    document.getElementById('image').addEventListener('click', function(event) {
        if (clickEnabled) {
            clickCount++;
            const imageRect = event.target.getBoundingClientRect();
            const offsetX = event.clientX - imageRect.left + 10;
            const offsetY = event.clientY - imageRect.top - 730;
    
            const imageWrapper = document.getElementById('imageWrapper');

            const circle = document.createElement('div');
            circle.classList.add('circle');
            circle.innerText = clickCount;
            circle.style.left = offsetX + 'px';
            circle.style.top = offsetY + 'px';
            imageWrapper.appendChild(circle);

            const inputContainer = document.createElement('div');
            inputContainer.classList.add('inputContainer');
            inputContainer.style.left = (offsetX + 0) + 'px';
            inputContainer.style.top = (offsetY + 0) + 'px';

            imageWrapper.appendChild(inputContainer);

            // Update the sidebar content
            const sidebar = document.querySelector('.sidebar');

            const inputGroup = document.createElement('div');
            inputGroup.classList.add('input-group', 'input-group-sm', 'mb-3');

            const inputGroupText = document.createElement('span');
            inputGroupText.classList.add('input-group-text');
            inputGroupText.textContent = clickCount;

            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.classList.add('form-control');
            inputField.setAttribute('aria-label', 'Sizing example input');
            inputField.setAttribute('aria-describedby', 'inputGroup-sizing-sm');
            inputField.value = '';
            inputField.placeholder = "Write about element present at " + clickCount + ".";

            inputGroup.appendChild(inputGroupText);
            inputGroup.appendChild(inputField);

            // Append new content to the sidebar
            sidebar.appendChild(inputGroup);
        }
    });
    

});