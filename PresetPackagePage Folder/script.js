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

let dataValue = document.querySelectorAll('.product').length + 1; // Get the number of products and add 1 to get the next data-value

document.getElementById('new-product-form').addEventListener('submit', function(event) { // When the new product form is submitted, run this function
    event.preventDefault();

    const productName = document.getElementById('product-name').value; // Get the product name value
    const productSpecs = document.getElementById('product-specs').value; // Get the product specs value
    const productImage = document.getElementById('product-image').value; // Get the product image value
    const productLink = document.getElementById('product-link').value; // Get the product link value
    const productCategory = document.getElementById('product-category').value; // Get the product category value
    const productContainer = document.querySelector('.product-container'); // Get the product container element
    const newProduct = document.createElement('div'); // Create a new product element
    newProduct.classList.add('new-product'); // Add the new-product class to the new product element
    newProduct.setAttribute('id', productCategory); // Set the id attribute of the new product element to the product category
    newProduct.setAttribute('data-value', dataValue++); // Set the data-value attribute of the new product element to the dataValue variable

    // Set the inner HTML of the new product element
    newProduct.innerHTML = ` 
        <img id="laptop-photo" src="${productImage}" alt="Product Image">
        <p class="product-name">${productName}</p>
        <p class="product-specs">${productSpecs}</p>
        <a href="${productLink}" class="buy-btn">
            <img src="https://freepnglogo.com/images/all_img/1715487998amazon-logo-transparent.png" alt="Amazon Logo">
        </a>
        <p>Now Available!</p>
    `;

    productContainer.appendChild(newProduct); // Append the new product element to the product container element
 
    document.getElementById('new-product-form').reset(); // Reset the new product form
});
    window.addEventListener('beforeunload', function() { // When the window is about to unload, run this function
        const newProducts = document.querySelectorAll('.new-product'); // Get all the new product elements
        const productsArray = []; // Create an empty array to store the product data

        newProducts.forEach(product => { // Loop through each new product
            const productData = { // Create an object with the product data
                category: product.getAttribute('id'), // Get the category attribute of the product
                value: product.getAttribute('data-value'), // Get the data-value attribute of the product
                image: product.querySelector('img').src, // Get the image source of the product
                name: product.querySelector('.product-name').textContent, // Get the product name of the product
                specs: product.querySelector('.product-specs').textContent, // Get the product specs of the product
                link: product.querySelector('a').href // Get the link of the product
            };
            productsArray.push(productData); // Push the product data object to the products array
        });

        localStorage.setItem('newProducts', JSON.stringify(productsArray)); // Store the products array in local storage
    });

    window.addEventListener('load', function() { // When the window loads, run this function
        const savedProducts = JSON.parse(localStorage.getItem('newProducts'));
        if (savedProducts) { // If there are saved products in local storage, run this code
            const productContainer = document.querySelector('.product-container');
            savedProducts.forEach(productData => { // Loop through each saved product
                const newProduct = document.createElement('div'); // Create a new product element
                newProduct.classList.add('new-product'); // Add the new-product class to the new product element
                newProduct.setAttribute('id', productData.category); // Set the id attribute of the new product element to the product category
                newProduct.setAttribute('data-value', productData.value); // Set the data-value attribute of the new product element to the product value
                
                // Set the inner HTML of the new product element
                newProduct.innerHTML = ` 
                    <img id="laptop-photo" src="${productData.image}" alt="Product Image">
                    <p class="product-name">${productData.name}</p>
                    <p class="product-specs">${productData.specs}</p>
                    <a href="${productData.link}" class="buy-btn">
                        <img src="https://freepnglogo.com/images/all_img/1715487998amazon-logo-transparent.png" alt="Amazon Logo">
                    </a>
                    <p>Now Available!</p>
                `;

                productContainer.appendChild(newProduct); // Append the new product element to the product container element
            });
        }
    });

    document.getElementById('delete-product-btn').addEventListener('click', function() { // When the delete product button is clicked, run this function
        const productId = document.getElementById('delete-product-id').value; // Get the product id value
        if (productId) { // If the product id value is not empty, run this code
            const productElement = document.querySelector(`.new-product[data-value="${productId}"]`); // Get the product element with the data-value attribute equal to the product id
            if (productElement) { // If the product element exists, run this code
                productElement.remove(); // Remove the product element
                alert(`Product with data-value ${productId} has been deleted.`); 
            } else {
                alert(`No product found with data-value ${productId}.`);
            }
        }
    });
