const url = "https://farm-store.onrender.com";

function fetchAndDisplayProducts() {
    fetch(url +"/api/products")
      .then((response) => response.json())
      .then((products) => {
        const productList = document.getElementById("product-list");
        productList.innerHTML = "";
        products.forEach((product) => {
          let column = document.createElement("div");
          column.classList.add("column", "is-one-third");
                
          //card
          let card = document.createElement("div");
          card.classList.add("card");
        
          //card image
          let cardImage = document.createElement("div");
          cardImage.classList.add("card-image");
          let figure = document.createElement("figure");
          figure.classList.add("image", "is-4by3");
          let img = document.createElement("img");
          img.setAttribute("src", product.image_url);
          img.setAttribute("alt", product.name);
          figure.appendChild(img);
          cardImage.appendChild(figure);
        
          //card content
          let cardContent = document.createElement("div");
          cardContent.classList.add("card-content");
        
          let title = document.createElement("p");
          title.classList.add("title", "is-5");
          title.textContent = product.name;
        
          let description = document.createElement("p");
          description.textContent = product.description;
        
          let price = document.createElement("p");
          price.classList.add("subtitle", "is-6");
          price.textContent = `$${product.price.toFixed(2)}`;
        
          cardContent.appendChild(title);
          cardContent.appendChild(description);
          cardContent.appendChild(price);
        
          //button
          let button = document.createElement("button");
          button.classList.add("button", product.availability ? "is-primary" : "is-light");
          button.textContent = product.availability ? "Add to Cart" : "Unavailable";
          button.disabled = !product.availability;
          if (product.availability) {
            button.onclick = () => addToCart(product.id);
          }
        
          cardContent.appendChild(button);
        
          card.appendChild(cardImage);
          card.appendChild(cardContent);
          column.appendChild(card);
        
          productList.appendChild(column);
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }
  
  function addToCart(productId) {
    fetch(url +"/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
    })
      .then(() => {
        alert("Product added to cart!");
      })
      .catch((error) => console.error("Error adding product to cart:", error));
  }
  
  window.onload = function () {
   fetchAndDisplayProducts();
  }