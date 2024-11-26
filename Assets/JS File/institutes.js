// Function to fetch and process CSV data
function fetchAndProcessCSV(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const rows = data.split('\n').filter(row => row.trim() !== '');
            const headers = rows[0].split(',');
            const table = document.getElementById('instituteTable');
            const pagination = document.getElementById('pagination');
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');

            // List of allowed city names
            const allowedCities = [
                "Agra", "Ahmedabad", "Aizawl", "Aligarh", "Ambala", "Amritapuri", "Amritsar", 
                "Anand", "Anantapur", "Aurangabad", "Ballari", "Bardhaman", "Bareilly", "Belgaum", 
                "Bhagalpur", "Bhilai", "Bhopal", "Bhubaneswar", "Bilaspur", "Bokaro Steel City", 
                "Coimbatore", "Cuttack", "Dhanbad", "Dibrugarh", "Dimapur", "Dharwad", "Durg", 
                "Durgapur", "Eluru", "Erode", "Faridabad", "Faizabad", "Gadarwara", "Gandhinagar", 
                "Gangtok", "Gaya", "Ghaziabad", "Ghatkesar", "Gopalpur", "Gorakhpur", "Greater Noida", 
                "Guwahati", "Hajipur", "Hamirpur", "Haridwar", "Hisar", "Hubli", "Hyderabad", 
                "Idukki", "Imphal", "Itanagar", "Jabalpur", "Jajpur", "Jammu", "Jamshedpur", 
                "Jind", "Jodhpur", "Junagadh", "Kaithal", "Kakinada", "Karnataka - Other", 
                "Karur", "Kasargode", "Khandwa", "Khammam", "Kochi", "Kolkata", "Kolhapur", 
                "Kollam", "Lucknow", "Ludhiana", "Madurai", "Mahasamund", "Malappuram", "Mangalore", 
                "Mathura", "Meerut", "Mehsana", "Midnapore", "Mohali", "Mumbai", "Mysore", 
                "Nagapattinam", "Nagpur", "Nanded", "Nashik", "Navsari", "Noida", "Odisha - Other", 
                "Palakkad", "Panchkula", "Panipat", "Patiala", "Patna", "Pudukkottai", "Pune", 
                "Raigarh", "Raipur", "Rajkot", "Ranchi", "Rewa", "Rourkela", "Saharanpur", "Salem", 
                "Sangli", "Satara", "Secunderabad", "Shimla", "Shillong", "Silchar", "Silvassa", 
                "Solapur", "Surat", "Thane", "Thiruvananthapuram", "Tirupati", "Tirunelveli", "Udaipur", 
                "Ujjain", "Una", "Vapi", "Vellore", "Vijayawada", "Visakhapatnam", "Warangal", 
                "West Bengal - Other", "Yamuna Nagar", "Yavatmal", "Zira"
            ];

            // Extract unique cities from the data
            const cities = Array.from(new Set(rows.slice(1).map(row => {
                const cells = row.split(',');
                return cells[5].trim(); // Extracting only the city name
            })));

            // Filter cities against allowed cities
            const filteredCities = cities.filter(city => allowedCities.includes(city));
            filteredCities.unshift('All'); // Add 'All' option

            // Populate the city filter dropdown
            const cityFilterSelect = document.getElementById('cityFilter');
            filteredCities.forEach(city => {
                const opt = document.createElement('option');
                opt.value = city;
                opt.textContent = city;
                cityFilterSelect.append (opt);
            });

            // Store all rows for filtering
            const allRows = rows.slice(1);

            // Create table header
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header.trim();
                headerRow.appendChild(th);
            });

            // Initialize variables for pagination
            let currentPage = 0;
            const entriesPerPage = 100;
            let filteredRows = allRows;

            // Function to filter rows by rating
            function filterByRating(rating) {
                if (rating === 'All') {
                    filteredRows = allRows;
                } else {
                    const minRating = parseFloat(rating);
                    filteredRows = allRows.filter(row => {
                        const cells = row.split(',');
                        const collegeRating = parseFloat(cells[1]);
                        return collegeRating >= minRating;
                    });
                }
                currentPage = 0;
                displayPage();
            }

            // Function to filter rows by city
            function filterByCity(city) {
                if (city === 'All') {
                    filteredRows = allRows;
                } else {
                    filteredRows = allRows.filter(row => {
                        const cells = row.split(',');
                        const collegeCity = cells[5].trim();
                        return collegeCity === city;
                    });
                }
                currentPage = 0;
                displayPage();
            }

            // Function to display current page
            function displayPage() {
                table.innerHTML = '';
                table.appendChild(headerRow);

                const totalEntries = filteredRows.length;
                const totalPages = Math.ceil(totalEntries / entriesPerPage);
                const startIndex = currentPage * entriesPerPage;
                const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);

                for (let i = startIndex; i < endIndex; i++) {
                    const cells = filteredRows[i].split(',');
                    if (cells.length === headers.length) {
                        const row = document.createElement('tr');
                        cells.forEach(cell => {
                            const td = document.createElement('td');
                            td.textContent = cell.trim();
                            row.appendChild(td);
                        });
                        table.appendChild(row);
                    }
                }

                prevButton.disabled = currentPage === 0;
                nextButton.disabled = currentPage === totalPages - 1;
            }

            // Add event listeners for rating filter
            const ratingFilterSelect = document.getElementById('ratingFilter');
            ratingFilterSelect.addEventListener('change', (e) => {
                const selectedRating = e.target.value.replace('+', '');
                filterByRating(selectedRating);
            });

            // Add event listener for city filter
            cityFilterSelect.addEventListener('change', (e) => {
                const selectedCity = e.target.value;
                filterByCity(selectedCity);
            });

            // Add event listener for clear filters button
            const clearFiltersButton = document.getElementById('clearFiltersButton');
            clearFiltersButton.addEventListener('click', () => {
                ratingFilterSelect.value = 'All';
                cityFilterSelect.value = 'All';
                filteredRows = allRows; // Reset to all rows
                displayPage();
            });

            // Display the first page
            displayPage();

            // Add event listeners for pagination buttons
            prevButton.addEventListener('click', () => {
                currentPage--;
                displayPage();
            });

            nextButton.addEventListener('click', () => {
                currentPage++;
                displayPage();
            });
        })
        .catch(error => {
            console.error('Error:', error);
            const table = document.getElementById('instituteTable');
            table.innerHTML = '<tr><td colspan="6">Error loading data: ' + error.message + '. Please check the console for details.</td></tr>';
        });
}

// Call the function when the page loads
window.onload = function() {
    fetchAndProcessCSV('../Data Files/colleges.csv');
};





