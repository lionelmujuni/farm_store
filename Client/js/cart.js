const url = "https://farm-store.onrender.com";

function fetchAndDisplayCartItems() {
    fetch(url +"/api/cart")
        .then((response) => response.json())
        .then((cartItems) => {
            const cartList = document.getElementById("cart-list");
            cartList.innerHTML = ""; // Clear existing content
  
            cartItems.forEach((item) => {
          
            let box = document.createElement("div");
            box.classList.add("box");
  
            let itemDetails = document.createElement("p");
            itemDetails.innerHTML = `<strong>${item.product.name}</strong> - $${item.product.price.toFixed(2)} x ${item.quantity}`;
            box.appendChild(itemDetails);
  
            let removeButton = document.createElement("button");
            removeButton.classList.add("button", "is-danger", "is-small");
            removeButton.textContent = "Remove";
            removeButton.onclick = () => removeCartItem(item.id);
            box.appendChild(removeButton);
  
            cartList.appendChild(box);
            });
        })
        .catch((error) => console.error("Error fetching cart items:", error));
}
  
function removeCartItem(itemId) {
    fetch(url +`/api/cart/${itemId}`, { method: "DELETE" })
        .then(() => fetchAndDisplayCartItems())
        .catch((error) => console.error("Error removing item:", error));
    }
  
window.onload = function () { 
    fetchAndDisplayCartItems();
};