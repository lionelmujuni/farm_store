const url = "https://farm-store.onrender.com";

function fetchAndDisplayProductsForAdmin() {
  fetch(url +"/api/products")
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("product-list");
      productList.innerHTML = "";
  
      products.forEach((product) => {
        let box = document.createElement("div");
        box.classList.add("box");
  
        let productDetails = document.createElement("p");
        productDetails.innerHTML = `<strong>${product.name}</strong> - $${product.price.toFixed(2)}`;
        box.appendChild(productDetails);
  
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("button", "is-danger", "is-small");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteProduct(product.id);
        box.appendChild(deleteButton);
  
        productList.appendChild(box);
      });
    })
    .catch((error) => console.error("Error fetching products for admin:", error));
  }
  
function addProduct(event) {
  event.preventDefault();
  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    availability: document.getElementById("availability").checked,
    image_url: document.getElementById("image").value,
  };
  fetch(url +"/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  })
  .then(() => {
    alert("Product added successfully!");
    fetchAndDisplayProductsForAdmin();
  })
  .catch((error) => console.error("Error adding product:", error));
}
  
function deleteProduct(productId) {
  fetch(url +`/api/products/${productId}`, { method: "DELETE" })
    .then(() => fetchAndDisplayProductsForAdmin())
    .catch((error) => console.error("Error deleting product:", error));
}

window.onload = function () { 
    fetchAndDisplayProductsForAdmin();
};