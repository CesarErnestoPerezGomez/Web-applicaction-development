function addSchedule() {
    // Get values from form fields
    const date = document.getElementById('date').value;
    const timeStart = document.getElementById('time_start').value;
    const timeEnd = document.getElementById('time_end').value;
    const activity = document.getElementById('activity').value;
    const place = document.getElementById('place').value;
    const type = document.getElementById('type').value;
    const notes = document.getElementById('notes').value;
    const flagColor = document.getElementById('flag').value;
    const isBusy = document.getElementById('free_busy').checked ? "Busy" : "Free";

    // Check that required fields are filled
    if (date && timeStart && timeEnd && activity && place && type) {
        // Select the table body
        const tableBody = document.getElementById('scheduleTable').querySelector('tbody');

        // Create a new row
        const newRow = document.createElement('tr');

        // Create cells for each field and append them to the row
        newRow.appendChild(createCell(date));
        newRow.appendChild(createCell(timeStart));
        newRow.appendChild(createCell(timeEnd));
        newRow.appendChild(createCell(activity));
        newRow.appendChild(createCell(place));
        newRow.appendChild(createCell(type));
        newRow.appendChild(createCell(notes));

        // Create cell for the flag color
        const flagCell = document.createElement('td');
        const flagDiv = document.createElement("div");
        flagDiv.style.width = "50px";
        flagDiv.style.height = "20px";
        flagDiv.style.backgroundColor = flagColor;
        flagCell.appendChild(flagDiv);
        newRow.appendChild(flagCell);

        // Create cell for the free/busy status
        const statusCell = document.createElement('td');
        const statusImg = document.createElement("img");
        statusImg.width = 50;
        statusImg.height = 50;
        statusImg.src = isBusy === "Busy" 
            ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."  // Replace with actual Busy image
            : "data:image/jpeg;base64,...";  // Replace with actual Free image
        statusCell.appendChild(statusImg);
        newRow.appendChild(statusCell);

        // Append the new row to the table body
        tableBody.appendChild(newRow);

        // Clear form fields
        document.getElementById('scheduleForm').reset();
    } else {
        alert("Please fill in all required fields.");
    }
}

// Helper function to create a table cell with text content
function createCell(content) {
    const cell = document.createElement('td');
    cell.textContent = content;
    return cell;
}
