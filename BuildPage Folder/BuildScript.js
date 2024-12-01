$(document).ready(function () {
  // Data for available PC parts
  const pcParts = {
    cpu: [
      { name: "Intel Core i9", price: 500 },
      { name: "Intel Core i7", price: 350 },
      { name: "Intel Core i5", price: 250 },
      { name: "AMD Ryzen 9", price: 500 },
      { name: "AMD Ryzen 7", price: 300 },
      { name: "AMD Ryzen 5", price: 200 },
    ],
    gpu: [
      { name: "RTX 40 Series", price: 700 },
      { name: "RTX 30 Series", price: 500 },
      { name: "GTX 10 Series", price: 350 },
      { name: "GTX 16 Series", price: 200 },
      { name: "AMD R9", price: 0 },
      { name: "AMD R7", price: 0 },
      { name: "AMD R5", price: 0 },
      { name: "AMD R3", price: 0 },
    ],
    ram: [
      { name: "16GB", price: 0 },
      { name: "32GB", price: 0 },
      { name: "64GB", price: 0 },
      { name: "128GB", price: 0 },
    ],
    cooler: [
      { name: "Cooler Master", price: 0 },
      { name: "NZXT Kraken", price: 0 },
      { name: "Corsair iCUE", price: 0 },
    ],
    motherboard: [
      { name: "MSI B500", price: 0 },
      { name: "ASUS ROG", price: 0 },
      { name: "Gigabyte", price: 0 },
      { name: "Aorus Elite", price: 0 },
      { name: "MSI MAG", price: 0 },
    ],
    storage: [
      { name: "500GB HDD", price: 0 },
      { name: "1TB SSD", price: 0 },
      { name: "2TB SSD", price: 0 },
      { name: "500GB HDD", price: 0 },
      { name: "1TB HDD", price: 0 },
      { name: "2TB SSD", price: 0 },
    ],
    case: [
      { name: "NZXT H510", price: 0 },
      { name: "Corsair iCUE 4000X", price: 0 },
      { name: "GAMEPOWER Warcry", price: 0 },
      { name: "Phanteks P400A", price: 0 },
      { name: "Asus TUF GT301", price: 0 },
    ],
    powerSupply: [
      { name: "650W", price: 0 },
      { name: "750W", price: 0 },
      { name: "1000W", price: 0 },
    ],
  };

  // Variable to store selected filters
  let selectedFilters = {
    budget: null,
    parts: [],
  };

  // Handle adding new part selection
  $("#add-part").on("click", function () {
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
    $("#part-container").append(partSelectHTML);
  });

  // Handles types for each part
  $(document).on("change", ".part-type", function () {
    const partType = $(this).val();
    const partValueSelect = $(this)
      .closest(".part-container")
      .find(".part-value");
    partValueSelect.empty();

    if (partType && pcParts[partType]) {
      partValueSelect.removeAttr("disabled");
      pcParts[partType].forEach((item) => {
        const optionText = `${item.name} - $${item.price}`;
        partValueSelect.append(new Option(optionText, JSON.stringify(item)));
        //I'm going to include a check so that an item will not display if it puts the cost over the budget - Fahad
      });
    } else {
      partValueSelect.attr("disabled", true);
      partValueSelect.append(new Option("Select Part First", ""));
    }
  });

  // Remove parts part on click
  $(document).on("click", ".remove-part", function () {
    $(this).closest(".part-container").remove();
  });

  // Handle search submission
  //Should probably handle budget beforehand, so that we can have it dynamically update while adding stuff
  $("#filter-form").on("submit", function (e) {
    e.preventDefault();

    const budget = $("#budget").val();
    const parts = [];

    // make sure budget is a number
    if (!budget || isNaN(budget) || budget <= 0) {
      alert("Please enter a valid budget");
      return;
    }

    // Collect selected parts
    $(".part-container").each(function () {
      const partType = $(this).find(".part-type").val();
      const partValue = $(this).find(".part-value").val();
      if (partType && partValue) {
        const selectedPart = JSON.parse(partValue);
        parts.push({
          partType,
          name: selectedPart.name,
          price: selectedPart.price,
        });
      }
    });

    // Store the selected filters
    selectedFilters = { budget, parts };

    //When we do the filter part we can add it here
    console.log("Filters applied:", selectedFilters);

    // For now, filter parts are a message
    if (parts.length > 0) {
      $("#pc-cards").html(
        `<p>Filtered by Budget: $${
          selectedFilters.budget
        } and Parts: ${JSON.stringify(selectedFilters.parts)}</p>`
      );
    } else {
      $("#pc-cards").html(
        `<p>No parts selected. Please add parts to filter the products.</p>`
      );
    }

    for (const part of parts) {
      console.log(part);
    }
  });
});
