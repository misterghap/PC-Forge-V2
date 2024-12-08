document.getElementById('country').addEventListener('change', function() { // When the country select element changes, run this function
  var flag = document.getElementById('flag'); // Get the flag image element
  var selectedCountry = this.value; // Get the selected country
  if (selectedCountry === 'canada') { // If the selected country is Canada set the flag image to the Canada flag
      flag.src = '../PresetPackagePage Folder/Images/canada.jpg'; 
  } else if (selectedCountry === 'usa') { // If the selected country is USA set the flag image to the USA flag
      flag.src = '../PresetPackagePage Folder/Images/usa.jpg';
  } else if (selectedCountry === 'uk') { // If the selected country is UK set the flag image to the UK flag
      flag.src = '../PresetPackagePage Folder/Images/uk.jpg';
  }
});

document.getElementById('computer-category').addEventListener('change', function() { // When the computer category select element changes, run this function
  var selectedCategory = this.value;  // Get the selected category
  var prebuiltProducts = document.querySelectorAll('.product#prebuilt'); // Get all the prebuilt products
  var laptopProducts = document.querySelectorAll('.product#laptop'); // Get all the laptop products

  if (selectedCategory === 'all') { // If the selected category is all, show all the products
      prebuiltProducts.forEach(function(product) {
          product.style.display = 'block';
      });
      laptopProducts.forEach(function(product) {
          product.style.display = 'block';
      });
  } else if (selectedCategory === 'prebuilt') { // If the selected category is prebuilt, show only the prebuilt products
      prebuiltProducts.forEach(function(product) {
          product.style.display = 'block';
      });
      laptopProducts.forEach(function(product) {
          product.style.display = 'none';
      });
  } else if (selectedCategory === 'laptop') { // If the selected category is laptop, show only the laptop products
      prebuiltProducts.forEach(function(product) {
          product.style.display = 'none';
      });
      laptopProducts.forEach(function(product) {
          product.style.display = 'block';
      });
  }
});

document.addEventListener('DOMContentLoaded', function () { // When the page loads, run this function
  const searchInput = document.querySelector('.search-bar input'); // Get the search input element
  const products = document.querySelectorAll('.product'); // Get all the product elements

  searchInput.addEventListener('input', function () { // When the search input changes, run this function
      const searchTerm = searchInput.value.toLowerCase(); // Get the search input value and convert it to lowercase
      products.forEach(product => { // Loop through each product
          const productName = product.querySelector('.product-name').textContent.toLowerCase(); // Get the product name and convert it to lowercase
          const productSpecs = product.querySelector('.product-specs').textContent.toLowerCase(); // Get the product specs and convert it to lowercase
          if (productName.includes(searchTerm) || productSpecs.includes(searchTerm)) { // If the product name or specs includes the search term, show the product
              product.style.display = 'block'; // Show the product
          } else {
              product.style.display = 'none'; // Hide the product
          }
      });
  });
});

document.querySelector('.search-bar button').addEventListener('click', function() { // When the search button is clicked, run this function
  const searchInput = document.querySelector('.search-bar input'); // Get the search input element
  searchInput.value = ''; // Clear the search input
  searchInput.dispatchEvent(new Event('input')); // Trigger the input event on the search input
});



/*Wishlist*/

// Initialize an empty wishlist array
let wishlist = [];

// Function to update the wishlist display
function updateWishlistDisplay() {
    const wishlistContent = document.querySelector('.wishlistcontent');
    wishlistContent.innerHTML = ''; // Clear existing content

    wishlist.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img');
        const img = document.createElement('img');
        img.src = item.image; // Use the image URL from the item
        img.alt = "Product Image";
        imgDiv.appendChild(img);

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.textContent = item.name; // Use the name from the item

        const crossDiv = document.createElement('div');
        crossDiv.classList.add('cross');
        const removeSpan = document.createElement('span');
        removeSpan.classList.add('remove');
        removeSpan.textContent = 'X';
        removeSpan.onclick = () => removeFromWishlist(item.id); // Remove item from wishlist
        crossDiv.appendChild(removeSpan);

        itemDiv.appendChild(imgDiv);
        itemDiv.appendChild(nameDiv);
        itemDiv.appendChild(crossDiv);
        wishlistContent.appendChild(itemDiv);
    });

    // Update the wishlist count
    document.getElementById('wishlist').querySelector('span').textContent = wishlist.length;
}

// Function to add an item to the wishlist
function addToWishlist(id, name, image) {
    const itemExists = wishlist.find(item => item.id === id);
    if (!itemExists) {
        wishlist.push({ id, name, image });
        updateWishlistDisplay();
    } else {
        alert('Item is already in the wishlist!');
    }
}

// Function to remove an item from the wishlist
function removeFromWishlist(id) {
    wishlist = wishlist.filter(item => item.id !== id);
    updateWishlistDisplay();
}

// Add event listeners to the "Add to List" buttons
document.querySelectorAll('.but').forEach(button => {
    button.addEventListener('click', () => {
        const productDiv = button.closest('.product');
        const id = button.id;
        const name = productDiv.querySelector('.product-name').textContent;
        const image = productDiv.querySelector('img').src;

        addToWishlist(id, name, image);
    });
});

// Close button functionality for the wishlist
document.querySelector('.close').addEventListener('click', () => {
    document.body.classList.remove('showList'); // Hide the wishlist
});

// Show the wishlist when the heart icon is clicked
document.getElementById('wishlist').addEventListener('click', () => {
    document.body.classList.toggle('showList'); // Toggle the wishlist visibility
});



