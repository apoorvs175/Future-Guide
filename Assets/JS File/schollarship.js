const csvFilePath = '../Data Files/schollarship.csv'; // Path to your CSV file
const entriesPerPage = 50; // Number of entries to display per page
let currentPage = 0;
let scholarships = [];
let filteredScholarships = [];

// Fetch the CSV file
fetch(csvFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => parseCSV(data))
    .catch(error => {
        console.error('Error loading CSV file:', error);
        document.getElementById('tableBody').innerHTML = '<tr><td colspan="10">Error loading scholarship data. Please try again later.</td></tr>';
    });

// Function to parse CSV data
function parseCSV(data) {
    const lines = data.split('\n').map(line => line.trim()).filter(line => line);
    scholarships = []; // Clear existing data

    // Skip the header and parse the remaining lines
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const columns = line.split(/","/).map(col => col.replace(/(^"|"$)/g, '').trim()); // Split by '","' and trim quotes

        if (columns.length === 10) { // Ensure we have 10 columns
            scholarships.push({
                serialNumber: columns[0],
                scholarshipName: columns[1],
                educationQualification: columns[2],
                scholarshipType: columns[3],
                gender: columns[4],
                description: columns[5],
                eligibilityEducationalCriteria: columns[6],
                eligibilityFamilyIncome: columns[7],
                applicationStart: columns[8],
                applicationDeadline: columns[9]
            });
        }
    }

    filteredScholarships = [...scholarships]; // Initially, all scholarships are filtered
    displayScholarships();
}

// Function to extract income value from string
function extractIncomeValue(incomeString) {
    const match = incomeString.match(/Below ₹([\d,]+)/);
    return match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
}

// Function to filter scholarships based on selected criteria
function filterScholarships() {
    const selectedIncome = document.getElementById('incomeFilter').value;
    const selectedQualification = document.getElementById('qualificationFilter').value;
    const selectedType = document.getElementById('typeFilter').value;
    const selectedGender = document.getElementById('genderFilter').value;

    // Define income ranges
    const incomeRanges = {
        "150000": 150000, // Below ₹1,50,000
        "200000": 200000, // Below ₹2,00,000
        "250000": 250000, // Below ₹2,50,000
        "300000": 300000, // Below ₹3                "400000": 400000, // Below ₹4,00,000
    };

    filteredScholarships = scholarships.filter(scholarship => {
        let matches = true;

        // Filter by family income
        if (selectedIncome) {
            const incomeValue = extractIncomeValue(scholarship.eligibilityFamilyIncome);
            if (incomeValue !== null && incomeValue >= incomeRanges[selectedIncome]) {
                matches = false;
            }
        }

        // Filter by educational qualification
        if (selectedQualification && selectedQualification !== scholarship.educationQualification) {
            matches = false;
        }

        // Filter by type
        if (selectedType && selectedType !== scholarship.scholarshipType) {
            matches = false;
        }

        // Filter by gender
        if (selectedGender && selectedGender !== scholarship.gender) {
            matches = false;
        }

        return matches;
    });

    currentPage = 0; // Reset to the first page after filtering
    displayScholarships();
}

// Function to display scholarships in the table
function displayScholarships() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    const start = currentPage * entriesPerPage;
    const end = start + entriesPerPage;
    const scholarshipsToDisplay = filteredScholarships.slice(start, end);

    scholarshipsToDisplay.forEach(scholarship => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${scholarship.serialNumber}</td>
            <td>${scholarship.scholarshipName}</td>
            <td>${scholarship.educationQualification}</td>
            <td>${scholarship.scholarshipType}</td>
            <td>${scholarship.gender}</td>
            <td>${scholarship.description}</td>
            <td>${scholarship.eligibilityEducationalCriteria}</td>
            <td>${scholarship.eligibilityFamilyIncome}</td>
            <td>${scholarship.applicationStart}</td>
            <td>${scholarship.applicationDeadline}</td>
        `;
        tableBody.appendChild(row);
    });

    // Update pagination buttons
    document.getElementById('prevBtn').disabled = currentPage === 0;
    document.getElementById('nextBtn').disabled = end >= filteredScholarships.length;
}

// Function to go to the previous page
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayScholarships();
    }
}

// Function to go to the next page
function nextPage() {
    if ((currentPage + 1) * entriesPerPage < filteredScholarships.length) {
        currentPage++;
        displayScholarships();
    }
}

// Event listeners for filter changes
document.getElementById('incomeFilter').addEventListener('change', filterScholarships);
document.getElementById('qualificationFilter').addEventListener('change', filterScholarships);
document.getElementById('typeFilter').addEventListener('change', filterScholarships);
document.getElementById('genderFilter').addEventListener('change', filterScholarships);

// Clear Filters Button functionality
document.getElementById('clearFiltersBtn').addEventListener('click', () => {
    document.getElementById('incomeFilter').value = '';
    document.getElementById('qualificationFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('genderFilter').value = '';
    filteredScholarships = [...scholarships]; // Reset to all scholarships
    currentPage = 0; // Reset to the first page
    displayScholarships(); // Display all scholarships
});




