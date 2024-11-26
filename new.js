











































// const csvFilePath = './new.csv'; // Path to your CSV file
// const entriesPerPage = 50; // Number of entries to display per page
// let currentPage = 0;
// let scholarships = [];
// let filteredScholarships = [];

// // Fetch the CSV file
// fetch(csvFilePath)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.text();
//     })
//     .then(data => parseCSV(data))
//     .catch(error => {
//         console.error('Error loading CSV file:', error);
//         document.getElementById('tableBody').innerHTML = '<tr><td colspan="10">Error loading scholarship data. Please try again later.</td></tr>';
//     });

// // Function to parse CSV data
// function parseCSV(data) {
//     const lines = data.split('\n').map(line => line.trim()).filter(line => line);
//     scholarships = []; // Clear existing data

//     // Skip the header and parse the remaining lines
//     for (let i = 1; i < lines.length; i++) {
//         const line = lines[i];
//         const columns = line.split(/","/).map(col => col.replace(/(^"|"$)/g, '').trim()); // Split by '","' and trim quotes

//         if (columns.length === 10) { // Ensure we have 10 columns
//             scholarships.push({
//                 serialNumber: columns[0],
//                 scholarshipName: columns[1],
//                 educationQualification: columns[2],
//                 scholarshipType: columns[3],
//                 gender: columns[4],
//                 description: columns[5],
//                 eligibilityEducationalCriteria: columns[6],
//                 eligibilityFamilyIncome: columns[7],
//                 applicationStart: columns[8],
//                 applicationDeadline: columns[9]
//             });
//         }
//     }

//     filteredScholarships = [...scholarships]; // Initially, all scholarships are filtered
//     displayScholarships();
// }

// // Function to extract income value from string
// function extractIncomeValue(incomeString) {
//     const match = incomeString.match(/Below ₹([\d,]+)/);
//     return match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
// }

// // Function to filter scholarships based on family income
// function filterScholarships() {
//     const selectedValue = document.getElementById('incomeFilter').value;

//     if (selectedValue === "0") {
//         filteredScholarships = [...scholarships]; // Show all if "All" is selected
//     } else {
//         const selectedIncome = parseInt(selectedValue);
//         filteredScholarships = scholarships.filter(scholarship => {
//             const scholarshipIncome = extractIncomeValue(scholarship.eligibilityFamilyIncome);
//             return scholarshipIncome !== null && scholarshipIncome <= selectedIncome; // Filter based on income
//         });
//     }

//     currentPage = 0; // Reset to first page after filtering
//     displayScholarships();
// }

// // Function to display scholarships in the table
// function displayScholarships() {
//     const tableBody = document.getElementById('tableBody');
//     tableBody.innerHTML = ''; // Clear previous entries

//     if (filteredScholarships.length === 0) {
//         tableBody.innerHTML = '<tr><td colspan="10">No scholarships found matching the selected criteria.</td></tr>';
//         return;
//     }

//     const start = currentPage * entriesPerPage;
//     const end = Math.min(start + entriesPerPage, filteredScholarships.length);
    
//     for (let i = start; i < end; i++) {
//         const scholarship = filteredScholarships[i];
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${scholarship.serialNumber}</td>
//             <td>${scholarship.scholarshipName}</td>
//             <td>${scholarship.educationQualification}</td>
//             <td>${scholarship.scholarshipType}</td>
//             <td>${scholarship.gender}</td>
//             <td>${scholarship.description}</td>
//             <td>${scholarship.eligibilityEducationalCriteria}</td>
//             <td>${scholarship.eligibilityFamilyIncome}</td>
//             <td>${scholarship.applicationStart}</td>
//             <td>${scholarship.applicationDeadline}</td>
//         `;
//         tableBody.appendChild(row);
//     }

//     // Update pagination buttons
//     const prevBtn = document.getElementById('prevBtn');
//     const nextBtn = document.getElementById('nextBtn');
    
//     prevBtn.disabled = currentPage === 0;
//     nextBtn.disabled = (currentPage + 1) * entriesPerPage >= filteredScholarships.length;
// }

// // Event listeners for pagination buttons
// document.getElementById('prevBtn').addEventListener('click', prevPage);
// document.getElementById('nextBtn').add// Event listeners for pagination buttons
// document.getElementById('prevBtn').addEventListener('click', prevPage);
// document.getElementById('nextBtn').addEventListener('click', nextPage);
// document.getElementById('incomeFilter').addEventListener('change', filterScholarships);

// // Function to go to the next page
// function nextPage() {
//     if (currentPage < Math.ceil(filteredScholarships.length / entriesPerPage) - 1) {
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

// // Initialize the display on page load
// document.addEventListener('DOMContentLoaded', () => {
//     displayScholarships();
// });
















// const csvFilePath = './new.csv'; // Specify the path to your CSV file
// const entriesPerPage = 100; // Number of entries to display per page
// let currentPage = 0;
// let scholarships = [];
// let filteredScholarships = []; // Array to hold filtered scholarships

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
//             // Use a regex to match quoted strings and split correctly
//             const regex = /"([^"]*)"/g;
//             const matches = [];
//             let match;
//             while ((match = regex.exec(line)) !== null) {
//                 matches.push(match[1]);
//             }

//             // Ensure we have the correct number of matches
//             if (matches.length === 10) { // Updated to 10 to match the new dataset
//                 const [
//                     serialNumber,
//                     scholarshipName,
//                     educationQualification,
//                     scholarshipType,
//                     gender, // New column for Gender
//                     description,
//                     eligibilityEducationalCriteria, // Updated to match new column
//                     eligibilityFamilyIncome, // Updated to match new column
//                     applicationStart,
//                     applicationDeadline
//                 ] = matches;

//                 // Push the parsed data into the scholarships array
//                 scholarships.push({
//                     serialNumber: serialNumber.trim(),
//                     scholarshipName: scholarshipName.trim(),
//                     educationQualification: educationQualification.trim(),
//                     scholarshipType: scholarshipType.trim(),
//                     gender: gender.trim(), // Store gender information
//                     description: description.trim(),
//                     eligibilityEducationalCriteria: eligibilityEducationalCriteria.trim(), // Store eligibility based on educational criteria
//                     eligibilityFamilyIncome: eligibilityFamilyIncome.trim(), // Store eligibility based on family income
//                     applicationStart: applicationStart.trim(),
//                     applicationDeadline: applicationDeadline.trim()
//                 });
//             }
//         }
//     }
//     filteredScholarships = scholarships; // Initially, all scholarships are filtered
//     displayScholarships();
// }

// // Function to filter scholarships based on family income
// function filterScholarships() {
//     const incomeFilter = document.getElementById('incomeFilter').value;
//     filteredScholarships = [];

//     // Define income ranges for filtering
//     const incomeRanges = {
//         "150000": (scholarship) => scholarship.eligibilityFamilyIncome.includes("Below ₹1,50,000"),
//         "300000": (scholarship) => scholarship.eligibilityFamilyIncome.includes("Below ₹3,00,000") || scholarship.eligibilityFamilyIncome.includes("Below ₹1,50,000"),
//         "500000": (scholarship) => scholarship.eligibilityFamilyIncome.includes("Below ₹5,00,000") || scholarship.eligibilityFamilyIncome.includes("Below ₹3,00,000") || scholarship.eligibilityFamilyIncome.includes("Below ₹1,50,000"),
//         "200000": (scholarship) => scholarship.eligibilityFamilyIncome.includes("Above ₹2,00,000"),
//         "400000": (scholarship) => scholarship.eligibilityFamilyIncome.includes("Above ₹4,00,000") || scholarship.eligibilityFamilyIncome.includes("Above ₹2,00,000")
//     };

//     if (incomeFilter === "0") { // If "All" is selected
//         filteredScholarships = scholarships;
//     } else {
//         // Filter scholarships based on the selected income range
//         const filterFunction = incomeRanges[incomeFilter];
//         if (filterFunction) {
//             filteredScholarships = scholarships.filter(filterFunction);
//         }
//     }

//     currentPage = 0; // Reset to first page after filtering
//     displayScholarships();
// }

// // Function to display scholarships in the table
// function displayScholarships() {
//     const tableBody = document.getElementById('tableBody');
//     tableBody.innerHTML = ''; // Clear previous entries
//     const start = currentPage * entriesPerPage;
//     const end = start + entriesPerPage;
//     const paginatedScholarships = filteredScholarships.slice(start, end);

//     paginatedScholarships.forEach(scholarship => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${scholarship.serialNumber}</td>
//             <td>${scholarship.scholarshipName}</td>
//             <td>${scholarship.educationQualification }</td>
//             <td>${scholarship.scholarshipType}</td>
//             <td>${scholarship.gender}</td>
//             <td>${scholarship.description}</td>
//             <td>${scholarship.eligibilityEducationalCriteria}</td>
//             <td>${scholarship.eligibilityFamilyIncome}</td>
//             <td>${scholarship.applicationStart}</td>
//             <td>${scholarship.applicationDeadline}</td>
//         `;
//         tableBody.appendChild(row);
//     });

//     // Update pagination
//     const pagination = document.getElementById('pagination');
//     const totalPages = Math.ceil(filteredScholarships.length / entriesPerPage);
//     pagination.innerHTML = '';
//     for (let i = 0; i < totalPages; i++) {
//         const pageLink = document.createElement('a');
//         pageLink.href = '#';
//         pageLink.textContent = i + 1;
//         pageLink.onclick = () => {
//             currentPage = i;
//             displayScholarships();
//         };
//         pagination.appendChild(pageLink);
//     }
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


























// const csvFilePath = './new.csv'; // Specify the path to your CSV file
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
//             // Use a regex to match quoted strings and split correctly
//             const regex = /"([^"]*)"/g;
//             const matches = [];
//             let match;
//             while ((match = regex.exec(line)) !== null) {
//                 matches.push(match[1]);
//             }

//             // Ensure we have the correct number of matches
//             if (matches.length === 10) { // Updated to 10 to match the new dataset
//                 const [
//                     serialNumber,
//                     scholarshipName,
//                     educationQualification,
//                     scholarshipType,
//                     gender, // New column for Gender
//                     description,
//                     eligibilityEducationalCriteria, // Updated to match new column
//                     eligibilityFamilyIncome, // Updated to match new column
//                     applicationStart,
//                     applicationDeadline
//                 ] = matches;

//                 // Push the parsed data into the scholarships array
//                 scholarships.push({
//                     serialNumber: serialNumber.trim(),
//                     scholarshipName: scholarshipName.trim(),
//                     educationQualification: educationQualification.trim(),
//                     scholarshipType: scholarshipType.trim(),
//                     gender: gender.trim(), // Store gender information
//                     description: description.trim(),
//                     eligibilityEducationalCriteria: eligibilityEducationalCriteria.trim(), // Store eligibility based on educational criteria
//                     eligibilityFamilyIncome: eligibilityFamilyIncome.trim(), // Store eligibility based on family income
//                     applicationStart: applicationStart.trim(),
//                     applicationDeadline: applicationDeadline.trim()
//                 });
//             }
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
//             <td>${scholarship.educationQualification}</td>
//             <td>${scholarship.scholarshipType}</td>
//             <td>${scholarship.gender}</td> <!-- Display the gender eligibility -->
//             <td>${scholarship.description}</td>
//             <td>${scholarship.eligibilityEducationalCriteria}</td> <!-- Correctly display eligibility based on educational criteria -->
//             <td>${scholarship.eligibilityFamilyIncome}</td> <!-- Correctly display eligibility based on family income -->
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







