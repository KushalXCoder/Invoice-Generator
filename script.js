let button = document.querySelector(".add-item");
let newItems = document.querySelector(".new-items");
let i = 0;
let array = [];

function updateArray() {
    array = [];
    for(let j = 0; j < i; j++) {
        array.push(document.querySelector(`.amount-${j}`).innerText);
    }
    console.log(array);
}

function addArray() {
    let sum = 0;
    for(let k = 0; k < i; k++) {
        sum += parseInt(array[k]);
    }
    return sum;
}

function addItem() {
    let newRow = document.createElement('tr');
    newRow.className = `row-${i+1}`;

    newRow.innerHTML = `
        <th scope="row">${i+1}</th>
        <td class="col-6"><input type="text" class="col-12 form-control item-${i}"></td>
        <td class="col-2 rate-${i}"><input type="text" class="col-12 form-control rate-${i}"></td>
        <td class="col-2 quantity-${i}"><input type="text" class="col-12 form-control quantity-${i}"></td>
        <td><p class="amount-${i}"></p></td>
    `;

    newItems.append(newRow);

    let rate_i = document.querySelector(`.rate-${i} input`);
    let quantity_i = document.querySelector(`.quantity-${i} input`);
    let totalAmount_i = document.querySelector(`.amount-${i}`);

    let calcTotal_i = () => {
        let total = parseInt(rate_i.value) * parseInt(quantity_i.value);
        totalAmount_i.innerText = total;
        updateArray();
        updateSubTotal();
    };

    let alertMessage = () => {
        alert("Please enter a positive number");
    }

    let checkValues_i = () => {
    let rate1_i = parseInt(rate_i.value);
    let quantity1_i = parseInt(quantity_i.value);
    
    if(rate1_i < 0) {
        alertMessage();
    }
    else if (quantity1_i < 0) {
        alertMessage();
    }   
};

    rate_i.addEventListener("input",calcTotal_i);
    quantity_i.addEventListener("input",calcTotal_i);
    rate_i.addEventListener("input",checkValues_i);
    quantity_i.addEventListener("input",checkValues_i);

    i++;
}

button.addEventListener("click",addItem);

function updateSubTotal() {
    let subTotal = document.querySelector(".sub-box");
    let subTotal_val = addArray();
    subTotal.value = subTotal_val;
    updateFinalTotal();
}

let tax = document.querySelector(".tax input");
let discount = document.querySelector(".discount input");
let shipping = document.querySelector(".shipping input");
let subTotal = document.querySelector(".sub-box");

function updateFinalTotal() {
    let final = document.querySelector(".sub-box1");
    let tax1 = parseInt(tax.value) || 0;
    let discount1 = parseInt(discount.value) || 0;
    let shipping1 = parseInt(shipping.value) || 0;
    let subTotal_val = parseInt(subTotal.value);
    let finaltotal = subTotal_val + tax1 - discount1 + shipping1;
    final.value = finaltotal;
}

tax.addEventListener("input",updateFinalTotal);
discount.addEventListener("input",updateFinalTotal);
shipping.addEventListener("input",updateFinalTotal);

let button1 = document.querySelector(".delete-item");

function deleteItem() {
    let lastRow = document.querySelector(`.row-${i}`);
    if(lastRow.className == "row-1") {
        alert("No more items to delete");
    }
    else {
        lastRow.remove();
        i--;
        updateArray();
        updateSubTotal();
    }
}

button1.addEventListener("click",deleteItem);