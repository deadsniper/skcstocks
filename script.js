// Check if the user is already logged in
function checkLogin() {
    if (localStorage.getItem("loggedIn") === "true") {
      showInventoryForm();
      loadInventory();
    }
  }
  
  // Handle login
  function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Perform authentication
    // Replace this with your own authentication logic
    if (username === "admin" && password === "password") {
      // Login successful
      localStorage.setItem("loggedIn", "true");
      showInventoryForm();
      loadInventory();
    } else {
      alert("Invalid username or password.");
    }
  }
  
  // Show inventory form
  function showInventoryForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("inventoryForm").style.display = "block";
  }
  
  // Add an item to inventory
  function addItem() {
    var name = document.getElementById("name").value;
    var category = document.getElementById("category").value;
    var subcategory = document.getElementById("subcategory").value;
    var quantity = document.getElementById("quantity").value;
  
    // Validate input fields
    if (name === "" || category === "" || subcategory === "" || quantity === "") {
      alert("Please fill in all fields.");
      return;
    }
  
    // Create a new row in the inventory table
    var table = document.getElementById("inventoryTable");
    var row = table.insertRow(-1);
    var nameCell = row.insertCell(0);
    var categoryCell = row.insertCell(1);
    var subcategoryCell = row.insertCell(2);
    var quantityCell = row.insertCell(3);
    var actionsCell = row.insertCell(4);
    nameCell.innerHTML = name;
    categoryCell.innerHTML = category;
    subcategoryCell.innerHTML = subcategory;
    quantityCell.innerHTML = quantity;
    actionsCell.innerHTML = '<button onclick="editItem(this)">Edit</button><button onclick="deleteItem(this)">Delete</button>';
  
    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("subcategory").value = "";
    document.getElementById("quantity").value = "";
  
    // Save the inventory data to local storage
    saveInventory();
  }
  
  // Edit an item in the inventory
  function editItem(button) {
    var row = button.parentNode.parentNode;
    var nameCell = row.cells[0];
    var categoryCell = row.cells[1];
    var subcategoryCell = row.cells[2];
    var quantityCell = row.cells[3];
    var actionsCell = row.cells[4];
  
    // Create input fields with current values
    var nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = nameCell.innerHTML;
    nameCell.innerHTML = "";
    nameCell.appendChild(nameInput);
  
    var categoryInput = document.createElement("select");
    categoryInput.innerHTML = '<option value="">Select Category</option><option value="Taxable">Taxable</option><option value="Non-taxable">Non-taxable</option>';
    categoryInput.value = categoryCell.innerHTML;
    categoryCell.innerHTML = "";
    categoryCell.appendChild(categoryInput);
  
    var subcategoryInput = document.createElement("select");
    subcategoryInput.innerHTML = '<option value="">Select Subcategory</option><option value="Edible">Edible</option><option value="Cosmetics">Cosmetics</option><option value="Liquor">Liquor</option><option value="Others">Others</option>';
    subcategoryInput.value = subcategoryCell.innerHTML;
    subcategoryCell.innerHTML = "";
    subcategoryCell.appendChild(subcategoryInput);
  
    var quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = quantityCell.innerHTML;
    quantityCell.innerHTML = "";
    quantityCell.appendChild(quantityInput);
  
    // Create save button
    var saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.onclick = function () {
      saveItem(row);
    };
    actionsCell.innerHTML = "";
    actionsCell.appendChild(saveButton);
  }
  
  // Save an item in the inventory
  function saveItem(row) {
    var nameCell = row.cells[0];
    var categoryCell = row.cells[1];
    var subcategoryCell = row.cells[2];
    var quantityCell = row.cells[3];
    var actionsCell = row.cells[4];
  
    var nameInput = nameCell.firstChild;
    var categoryInput = categoryCell.firstChild;
    var subcategoryInput = subcategoryCell.firstChild;
    var quantityInput = quantityCell.firstChild;
  
    // Validate input fields
    if (nameInput.value === "" || categoryInput.value === "" || subcategoryInput.value === "" || quantityInput.value === "") {
      alert("Please fill in all fields.");
      return;
    }
  
    // Update the table cells with the new values
    nameCell.innerHTML = nameInput.value;
    categoryCell.innerHTML = categoryInput.value;
    subcategoryCell.innerHTML = subcategoryInput.value;
    quantityCell.innerHTML = quantityInput.value;
  
    // Restore the actions cell with edit and delete buttons
    actionsCell.innerHTML = '<button onclick="editItem(this)">Edit</button><button onclick="deleteItem(this)">Delete</button>';
  
    // Save the inventory data to local storage
    saveInventory();
  }
  
  // Delete an item from the inventory
  function deleteItem(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  
    // Save the inventory data to local storage
    saveInventory();
  }
  
  // Save the inventory data to local storage
  function saveInventory() {
    var table = document.getElementById("inventoryTable");
    var inventoryData = [];
  
    // Iterate through each row of the table
    for (var i = 1; i < table.rows.length; i++) {
      var rowData = [];
      var cells = table.rows[i].cells;
  
      // Iterate through each cell of the row
      for (var j = 0; j < cells.length - 1; j++) {
        rowData.push(cells[j].innerHTML);
      }
  
      inventoryData.push(rowData);
    }
  
    // Store the inventory data in local storage
    localStorage.setItem("inventoryData", JSON.stringify(inventoryData));
  }
  
  // Load the inventory data from local storage
  function loadInventory() {
    var inventoryData = localStorage.getItem("inventoryData");
  
    if (inventoryData) {
      inventoryData = JSON.parse(inventoryData);
  
      // Clear the inventory table
      var table = document.getElementById("inventoryTable");
      table.innerHTML = "";
  
      // Iterate through each row of the inventory data
      for (var i = 0; i < inventoryData.length; i++) {
        var row = table.insertRow(-1);
  
        // Iterate through each cell of the row
        for (var j = 0; j < inventoryData[i].length; j++) {
          var cell = row.insertCell(j);
          cell.innerHTML = inventoryData[i][j];
        }
  
        // Add the actions cell for edit and delete buttons
        var actionsCell = row.insertCell(inventoryData[i].length);
        actionsCell.innerHTML = '<button onclick="editItem(this)">Edit</button><button onclick="deleteItem(this)">Delete</button>';
      }
    }
  }
  
  // Call the checkLogin function when the page loads
  window.onload = checkLogin;
  