async function getProduct(barcode) {
    let url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

    let res = await fetch(url);
    let data = await res.json();

    return data;  
}

document.querySelector("#searchBtn").addEventListener("click", async () => {
    let barcode = document.querySelector("#codeInput").value.trim();

    if (!barcode) {
        alert("Please enter a barcode");
        return;
    }

    let data = await getProduct(barcode);
    console.log(data);

    if (data.status === 0) {
        alert("Product not found");
        return;
    }

    let p = data.product;

    document.querySelector("#result").classList.remove("hidden");

    
    document.querySelector("#productImg").src = p.image_url || "";

    
    document.querySelector("#productName").innerText =
        p.product_name || "No name available";

    
    document.querySelector("#brand").innerText =
        p.brands || "Not available";

    
    let ingList = document.querySelector("#ingredientsList");
    ingList.innerHTML = "";

    if (p.ingredients && p.ingredients.length > 0) {
        for (let ing of p.ingredients) {
            let li = document.createElement("li");
            li.innerText = ing.text || ing.id;  
            ingList.appendChild(li);
        }
    } else {
        ingList.innerHTML = "<li>No ingredients available</li>";
    }
});
