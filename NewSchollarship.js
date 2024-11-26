const csvFilePath = './new.csv'; // Specify the path to your CSV file
const entriesPerPage = 100; // Number of entries to display per page
let currentPage = 0;
let scholarships = [];

// Fetch the CSV file
fetch(csvFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => parseCSV(data))
    .catch(error => console.error('Error loading CSV file:', error));

// Function to parse CSV data
function parseCSV(data) {
    const lines = data.split('\n');
    for (let i = 1; i < lines.length; i++) { // Skip header
        const line = lines[i].trim();
        if (line) {
            const [
                serialNumber,
                scholarshipName,
                educationLevel,
                description,
                eligibilityMarks,
                eligibilityIncome,
                applicationStart,
                applicationDeadline
            ] = line.split(',');

            // Merge eligibility marks with description
            const combinedDescription = `${description.trim()} (Eligibility Marks: ${eligibilityMarks.trim()})`;

            // Push the parsed data into the scholarships array
            scholarships.push({
                serialNumber: serialNumber.trim(),
                scholarshipName: scholarshipName.trim(),
                educationLevel: educationLevel.trim(),
                description: combinedDescription, // Use the combined description
                eligibilityIncome: eligibilityIncome.trim(),
                applicationStart: applicationStart.trim(),
                applicationDeadline: applicationDeadline.trim()
            });
        }
    }
    displayScholarships();
}

// Function to display scholarships in the table
function displayScholarships() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear previous entries
    const start = currentPage * entriesPerPage;
    const end = start + entriesPerPage;
    const paginatedScholarships = scholarships.slice(start, end);

    paginatedScholarships.forEach(scholarship => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${scholarship.serialNumber}</td>
            <td>${scholarship.scholarshipName}</td>
            <td>${scholarship.educationLevel}</td>
            <td>${scholarship.description}</td> <!-- Use the combined description -->
            <td>${scholarship.eligibilityIncome}</td>
            <td>${scholarship.applicationStart}</td>
            <td>${scholarship.applicationDeadline}</td>
        `;
        tableBody.appendChild(row);
    });

    // Update button visibility
    document.getElementById('prevBtn').style.display = currentPage === 0 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = currentPage >= Math.ceil(scholarships.length / entriesPerPage) - 1 ? 'none' : 'inline-block';
}

// Function to go to the next page
function nextPage() {
    if (currentPage < Math.ceil(scholarships.length / entriesPerPage) - 1) {
        currentPage++;
        displayScholarships();
    }
}

// Function to go to the previous page
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayScholarships();
    }
}

































// const csvFilePath = './NewSchollarship.csv'; // Specify the path to your CSV file

// const entriesPerPage = 100; // Number of entries to display per page
// let currentPage = 0;
// let scholarships = [];

// // Fetch the CSV file
// fetch(csvFilePath)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.text();
//     })
//     .then(data => parseCSV(data))
//     .catch(error => console.error('Error loading CSV file:', error));

// // Function to parse CSV data
// function parseCSV(data) {
//     const lines = data.split('\n');
//     for (let i = 1; i < lines.length; i++) { // Skip header
//         const line = lines[i].trim();
//         if (line) {
//             const [
//                 serialNumber,
//                 scholarshipName,
//                 educationLevel,
//                 description,
//                 eligibilityMarks,
//                 eligibilityIncome,
//                 applicationStart,
//                 applicationDeadline
//             ] = line.split(',');

//             // Merge eligibility marks with description
//             const combinedDescription = `${description.trim()} (Eligibility Marks: ${eligibilityMarks.trim()})`;

//             // Push the parsed data into the scholarships array
//             scholarships.push({
//                 serialNumber: serialNumber.trim(),
//                 scholarshipName: scholarshipName.trim(),
//                 educationLevel: educationLevel.trim(),
//                 description: combinedDescription, // Use the combined description
//                 eligibilityIncome: eligibilityIncome.trim(),
//                 applicationStart: applicationStart.trim(),
//                 applicationDeadline: applicationDeadline.trim()
//             });
//         }
//     }
//     displayScholarships();
// }

// // Function to display scholarships in the table
// function displayScholarships() {
//     const tableBody = document.getElementById('tableBody');
//     tableBody.innerHTML = ''; // Clear previous entries
//     const start = currentPage * entriesPerPage;
//     const end = start + entriesPerPage;
//     const paginatedScholarships = scholarships.slice(start, end);

//     paginatedScholarships.forEach(scholarship => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${scholarship.serialNumber}</td>
//             <td>${scholarship.scholarshipName}</td>
//             <td>${scholarship.educationLevel}</td>
//             <td>${scholarship.description}</td> <!-- Use the combined description -->
//             <td>${scholarship.eligibilityIncome}</td>
//             <td>${scholarship.applicationStart}</td>
//             <td>${scholarship.applicationDeadline}</td>
//         `;
//         tableBody.appendChild(row);
//     });

//     // Update button visibility
//     document.getElementById('prevBtn').style.display = currentPage === 0 ? 'none' : 'inline-block';
//     document.getElementById('nextBtn').style.display = currentPage >= Math.ceil(scholarships.length / entriesPerPage) - 1 ? 'none' : 'inline-block';
// }

// // Function to go to the next page
// function nextPage() {
//     if (currentPage < Math.ceil(scholarships.length / entriesPerPage) - 1) {
//         currentPage++;
//         displayScholarships();
//     }
// }

// // Function to go to the previous page
// function prevPage() {
//     if (currentPage > 0) {
//         currentPage--;
//         displayScholarships();
//     }
// }