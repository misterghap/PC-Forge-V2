------------------HTML--------------------------------------------
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="styling.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  </head>
  <body>
    <section class="home">
      <div class="home-text">
        <h1> Performing with Excellence <br> <span>To do More for More</span></h1>
        <p>We are excellence with the pc parts compatibility to do more for you! <br>With the ever-changing tech, you'll always get the latest and most accurate compatibility.</p>
        <a href="#" class="home-btn">Create Now</a>
        <a href="#" class="home-btn2">Buy Pre-Build</a>
      </div>
    </section>

<!-- Filter Section -->
<div class="filter-section">
  <h4>Search by Budget and PC Parts</h4>
  <form id="filter-form">
      <!-- Budget Input -->
      <div class="form-group">
          <label for="budget">Your Budget</label>
          <input type="number" class="form-control" id="budget" placeholder="Enter your budget" required />
      </div>

      <!-- Part Selection Section -->
      <div class="form-group">
          <label for="part-type">Select PC Parts</label>
          <div id="part-container">
              <!-- Dynamically add part fields here -->
          </div>
          <button type="button" id="add-part" class="btn btn-secondary">Add Another Part</button>
      </div>

      <!-- Search Button -->
      <button type="submit" class="btn btn-primary">Search</button>
  </form>
</div>
        </div>
      </div>
    </section>
    <script src="BuildScript.js"></script>
  </body>
</html>
--------------------------------------------------JAVASCRIPT-------------------------------------------------------------------------------------------------
$(document).ready(function () {
    // Data for available PC parts
    const pcParts = {
        cpu: ["Intel Core i9", "Intel Core i7", "Intel Core i5", "AMD Ryzen 9", "AMD Ryzen 7", "AMD Ryzen 5"],
        gpu: ["RTX 40 Series", "RTX 30 Series", "RTX 20 Series", "GTX 10 Series", "GTX 16 Series", "AMD R9", "AMD R7", "AMD R5", "AMD R3"],
        ram: ["16GB", "32GB", "64GB", "128GB"],
        cooler: ["Cooler Master", "NZXT Kraken", "Corsair iCUE"],
        motherboard: ["MSI B500", "ASUS ROG", "Gigabyte", "Aorus Elite", "MSI MAG"],
        storage: ["500GB HDD", "1TB SSD", "2TB SSD", "500GB HDD", "1TB HDD", "2TB SSD"],
        case: ["NZXT H510" ,"Corsair iCUE 4000X", "GAMEPOWER Warcry", "Phanteks P400A", "Asus TUF GT301"],
        powerSupply: ["650W", "750W", "1000W"]
    };

    // Variable to store selected filters
    let selectedFilters = {
        budget: null,
        parts: []
    };

    // Handle adding new part selection
    $('#add-part').on('click', function () {
        const partSelectHTML = `
            <div class="form-group part-container">
                <label for="part-type">Choose Part Type</label>
                <select class="form-control part-type" required>
                    <option value="">Select Part</option>
                    <option value="cpu">CPU</option>
                    <option value="gpu">GPU</option>
                    <option value="ram">RAM</option>
                    <option value="cooler">Cooler</option>
                    <option value="motherboard">Motherboard</option>
                    <option value="storage">Storage</option>
                    <option value="case">Case</option>
                    <option value="powerSupply">Power Supply</option>
                </select>
                <label for="part-value">Choose Specific Item</label>
                <select class="form-control part-value" disabled required>
                    <option value="">Select Part First</option>
                </select>
                <button type="button" class="btn btn-danger remove-part">Remove Part</button>
            </div>
        `;
        $('#part-container').append(partSelectHTML);
    });

    // Handles types for each part
    $(document).on('change', '.part-type', function () {
        const partType = $(this).val();
        const partValueSelect = $(this).closest('.part-container').find('.part-value');
        partValueSelect.empty();

        if (partType && pcParts[partType]) {
            partValueSelect.removeAttr('disabled');
            pcParts[partType].forEach(item => {
                partValueSelect.append(new Option(item, item));
            });
        } else {
            partValueSelect.attr('disabled', true);
            partValueSelect.append(new Option('Select Part First', ''));
        }
    });

    // Remove parts part on click
    $(document).on('click', '.remove-part', function () {
        $(this).closest('.part-container').remove();
    });

    // Handle search submission
    $('#filter-form').on('submit', function (e) {
        e.preventDefault();

        const budget = $('#budget').val();
        const parts = [];

        // make sure budget is a number
        if (!budget || isNaN(budget) || budget <= 0) {
            alert("Please enter a valid budget");
            return;
        }

        // Collect selected parts
        $('.part-container').each(function () {
            const partType = $(this).find('.part-type').val();
            const partValue = $(this).find('.part-value').val();
            if (partType && partValue) {
                parts.push({ partType, partValue });
            }
        });

        // Store the selected filters
        selectedFilters = { budget, parts };

        //When we do the filter part we can add it here
        console.log('Filters applied:', selectedFilters);

        // For now, filter parts are a message
        if (parts.length > 0) {
            $('#pc-cards').html(`<p>Filtered by Budget: $${selectedFilters.budget} and Parts: ${JSON.stringify(selectedFilters.parts)}</p>`);
        } else {
            $('#pc-cards').html(`<p>No parts selected. Please add parts to filter the products.</p>`);
        }
    });
});
