(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})();

setTheme(getStoredTheme());

// Add event listener for theme switches
document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
    element.addEventListener('click', function(event) {
        const theme = event.target.getAttribute('data-bs-theme-value');
        setTheme(theme);
    });
});

// Function to get stored theme
function getStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'auto';
}

// Function to set theme
function setTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark');

    if (theme === 'auto') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }

    localStorage.setItem('theme', theme);
}

// scrolling banner
const a = [
    "/openagent/assets/banner2.png",
    "/openagent/assets/banner3.png",
    "/openagent/assets/banner4.png",
    "/openagent/assets/banner5.png",
    "/openagent/assets/banner6.png",
    "/openagent/assets/banner7.png"
  ];
  const next = document.querySelector(".r");
  const prev = document.querySelector(".l");
  const img = document.querySelector(".bannerimg");
  const circle = document.querySelectorAll(".bannercircle");
  var i = 0;
  let colorcircleimg = i =>{
    img.src = a[i];
    circle.forEach((e) => {
      e.style.background = "rgb(216,209,209)";
    });
    circle[i].style.background = "rgba(80, 80, 80, 0.819)";
 }
  img.addEventListener("load",()=>{
    setTimeout(()=>{
    i= i>=a.length-1 ? 0 : i+1;
    colorcircleimg(i);
  },5000)
  })
  next.addEventListener("click", function () {
   i= i >=a.length-1 ? 0 : i+1;
   colorcircleimg(i);
  });
  prev.addEventListener("click", function () {
    i = i <=0 ? 5 : i-1;
    colorcircleimg(i);
  });


// Function to create item boxes
function createItemBoxes(itemData) {
    const itemContainer = document.getElementById('productcontainer');
    itemContainer.innerHTML = '';
  
    itemData.forEach(item => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product','col','d-flex', 'flex-column');
  
      // Create the product image element
      const img = document.createElement('img');
      img.classList.add('product-img');
      img.src = item.thumbnail;
      img.alt = item.title;
  
      // Create the product info div
      const productInfoDiv = document.createElement('div');
      productInfoDiv.classList.add('product-info', 'd-flex', 'flex-column');
  
      // Create the title element
      const title = document.createElement('h4');
      title.classList.add('mb-2');
      title.textContent = item.title;
  
      // Create the price element
      const price = document.createElement('h6');
      price.classList.add('mb-2', 'text-muted');
      price.innerHTML = `<i class="fa fa-tag"></i> Price: ${item.price}`;
  
      // Create the description element
      const description = document.createElement('p');
      description.classList.add('mt-3', 'mb-3');
      description.innerHTML = `<i class="fa fa-info-circle"></i> Description: ${item.snippet}`;
  
      // Create the "Buy Now" button
      const buyNowButton = document.createElement('a');
      buyNowButton.href = ''; // Add your URL here
      buyNowButton.classList.add('btn', 'btn-primary', 'mt-auto');
      buyNowButton.innerHTML = `<i class="fa fa-shopping-cart"></i> Buy Now`;
  
      // Append all elements to the main product div
      productInfoDiv.appendChild(title);
      productInfoDiv.appendChild(price);
      productDiv.appendChild(img);
      productDiv.appendChild(productInfoDiv);
      productDiv.appendChild(description);
      productDiv.appendChild(buyNowButton);
  
      // Append the item box to the container
      itemContainer.appendChild(productDiv);
    });
  }
  
  // Fetch data from a JSON file
  fetch('giftitems.json')
    .then(response => response.json())
    .then(data => {
      createItemBoxes(data);
    })
    .catch(error => console.error('Error fetching data:', error));
  