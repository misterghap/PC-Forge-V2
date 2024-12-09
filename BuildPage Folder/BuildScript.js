$(document).ready(function () {
  // Data for available PC parts
  const pcParts = {
    cpu: [
      { name: "Intel Core i9", price: 500 },
      { name: "Intel Core i7", price: 350 },
      { name: "Intel Core i5", price: 250 },
      { name: "AMD Ryzen 9", price: 450 },
      { name: "AMD Ryzen 7", price: 325 },
      { name: "AMD Ryzen 5", price: 225 },
    ],
    gpu: [
      { name: "RTX 40 Series", price: 1000 },
      { name: "RTX 30 Series", price: 700 },
      { name: "GTX 10 Series", price: 350 },
      { name: "GTX 16 Series", price: 225 },
      { name: "AMD R9", price: 650 },
      { name: "AMD R7", price: 450 },
      { name: "AMD R5", price: 275 },
      { name: "AMD R3", price: 175 },
    ],
    ram: [
      { name: "16GB", price: 60 },
      { name: "32GB", price: 110 },
      { name: "64GB", price: 210 },
      { name: "128GB", price: 400 },
    ],
    cooler: [
      { name: "Cooler Master", price: 60 },
      { name: "NZXT Kraken", price: 120 },
      { name: "Corsair iCUE", price: 150 },
    ],
    motherboard: [
      { name: "MSI B500", price: 130 },
      { name: "ASUS ROG", price: 230 },
      { name: "Gigabyte", price: 180 },
      { name: "Aorus Elite", price: 200 },
      { name: "MSI MAG", price: 210 },
    ],
    storage: [
      { name: "500GB HDD", price: 40 },
      { name: "1TB SSD", price: 100 },
      { name: "2TB SSD", price: 200 },
      { name: "500GB HDD", price: 40 },
      { name: "1TB HDD", price: 60 },
      { name: "2TB SSD", price: 190 },
    ],
    case: [
      { name: "NZXT H510", price: 70 },
      { name: "Corsair iCUE 4000X", price: 130 },
      { name: "GAMEPOWER Warcry", price: 100 },
      { name: "Phanteks P400A", price: 80 },
      { name: "Asus TUF GT301", price: 90 },
    ],
    powerSupply: [
      { name: "650W", price: 80 },
      { name: "750W", price: 100 },
      { name: "1000W", price: 150 },
    ],
  };
  $(".flexContainer").hide();

  let parts = [];
  /*
  // Variable to store selected filters
  let selectedFilters = {
    budget: null,
    parts: [],
  };
*/
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

  $("#filter-form").on("submit", function (e) {
    e.preventDefault();

    $(".flexContainer").show();
    const budget = parseFloat($("#budget").val());
    let cost = 0;

    // make sure budget is a number
    if (!budget || isNaN(budget) || budget <= 0) {
      alert("Please enter a valid budget");
      return;
    }

    parts = [];
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
        cost += selectedPart.price;
      }
    });

    if (budget < cost) {
      $("#costTrack").css("color", "red");
    } else if (budget > cost) {
      $("#costTrack").css("color", "#39FF14");
    } else {
      $("#costTrack").css("color", "yellow");
    }
    $("#budgetTrack").text("Budget: " + budget);
    $("#costTrack").text("Cost: " + cost);

    //erases all previous outputs from the table
    $("#HelpOutput tr[id='productOutput']").remove();

    //iterates through each part in the array, creates new row in output table

    for (part of parts) {
      let newRow = document.createElement("tr");
      newRow.id = "productOutput";
      let formattedPartName = part.name.replace(/\s+/g, "+");
      const amazonUrl = `https://www.amazon.ca/s?k=${formattedPartName}&crid=2FZ784W9NJ9Z&sprefix=%2Caps%2C146&ref=nb_sb_ss_recent_1_0_recent&category=electronics`;
      const bestBuyurl = `https://www.bestbuy.ca/en-ca/search?search=${formattedPartName}`;
      const newEggUrl = `https://www.newegg.ca/p/pl?d=${formattedPartName}`;
      document.getElementById("HelpOutput").appendChild(newRow);
      newRow.innerHTML = `
     <td>${part.partType}</td>
     <td>${part.name}</td>
     <td>${part.price}</td>
     <td>
     <div><a href=${amazonUrl}>Amazon</a></div>
     <div><a href=${bestBuyurl}>BestBuy</a></div>
     <div><a href=${newEggUrl}>Newegg</a></div>
     </td>`;
    }

    // Call AI response for feedback based on filters
    AIResponse(parts, budget);

    // Show parts and recommendations
    showPCParts(parts, budget);
  });

  // AI Response function
  async function AIResponse(parts, budget) {
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB0LQnI2MGX8ASm4_ZO-1Y6Wf_gTzrF408";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Budget: $${budget}` },
                {
                  text: `Parts Selected: ${parts
                    .map((part) => part.name)
                    .join(", ")}`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        //Empties previous text if ran again in same instance
        $(".botContainer p[id='AIFeed']").remove();

        const feedback = data.candidates[0].content.parts[0].text.trim();
        let spacedText = feedback.replace(/\n/g, "<br>");
        let formattedText = spacedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        $(".botContainer").append(
          `<p id="AIFeed"><strong>AI Feedback:</strong> ${formattedText}</p>`
        );
      } else {
        $(".botContainer").append(
          `<p><strong>AI Feedback:</strong> Unable to generate feedback. Please try again later.</p>`
        );
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      $(".botContainer").append(
        `<p><strong>AI Feedback:</strong> There was an error retrieving the AI response. Please try again later.</p>`
      );
    }
  }
});
