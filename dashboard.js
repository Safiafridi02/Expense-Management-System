const title = document.getElementsByTagName("title")[0];
title.innerText = document.title.text = "Signup | Expense Managment System";
let WelcomeUser = document.getElementById("user");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
WelcomeUser.innerText = currentUser ? `Welcome: ${currentUser[0].userName}` : "";
let allExpense = JSON.parse(localStorage.getItem("allExpense")) || [];
let allCategories = JSON.parse(localStorage.getItem("allCategories")) || [];
let filterExpense = allExpense?.filter(expense => expense.currentUserId == currentUser[0].userId);
showTotal();
function logout() {
	localStorage.removeItem("currentUser");
	location.href = "./index.html";
}

function showExpenseInput() {
	let expenseInput = document.getElementById("expenses");
	expenseInput.style.display = "block";
}

function generateReport() {
	window.print();
}

function HideExpenseInput() {
	let expenseInput = document.getElementById("expenses");
	expenseInput.style.display = "none";
}

function showCategories() {
	let filteredCategories = allCategories?.filter(function (category) {
		return category.userId == currentUser[0].userId;
	});

	for (let i = 0; i < filteredCategories.length; i++) {
		let category = filteredCategories[i].category;
		let option = document.createElement("option");
		let optionText = document.createTextNode(category);
		option.appendChild(optionText);
		document.getElementById("expCategory").appendChild(option);
	}
}

showCategories();

function showExpense() {
	for (let i = 0; i < filterExpense.length; i++) {
		let tableRow = document.createElement("tr");
		let expId = filterExpense[i].expenseId;
		let expIdCloumn = document.createElement("td");
		let expIdText = document.createTextNode(expId);
		expIdCloumn.appendChild(expIdText);
		tableRow.appendChild(expIdCloumn);
		let expCat = filterExpense[i].expCategory;
		let expCatCloumn = document.createElement("td");
		let expCatText = document.createTextNode(expCat);
		expCatCloumn.appendChild(expCatText);
		tableRow.appendChild(expCatCloumn);
		let expDesc = filterExpense[i].expDes;
		let expDescCloumn = document.createElement("td");
		expDescCloumn.className = "d-flex justify-content-between";
		let descSpan = document.createElement("span");
		let expDescText = document.createTextNode(expDesc);
		let supCat = document.createElement("sup");
		let catSup = document.createElement("i");
		catSup.className = 'fa fa-edit mt-3';
		catSup.onclick = () => editEntry(2,expDesc, expId, tableRow);
		descSpan.appendChild(expDescText);
		expDescCloumn.appendChild(descSpan);
		supCat.appendChild(catSup);
		expDescCloumn.appendChild(supCat);
		tableRow.appendChild(expDescCloumn);
		let expAmount = filterExpense[i].expAmount;
		let expAmountCloumn = document.createElement("td");
		let expAmountText = document.createTextNode(`Rs ${expAmount}/-`);
		expAmountCloumn.appendChild(expAmountText);
		tableRow.appendChild(expAmountCloumn);
		let expTime = filterExpense[i].time;
		let expDate = filterExpense[i].date;
		let expCreatedAtCloumn = document.createElement("td");
		let expCreatedAtText = document.createTextNode(`${expDate} ${expTime}`);
		expCreatedAtCloumn.appendChild(expCreatedAtText);
		tableRow.appendChild(expCreatedAtCloumn);

		let actionColumn = document.createElement("td");
		let delBtn = document.createElement("button");
		let btnText = document.createTextNode("Remove");
		delBtn.appendChild(btnText);
		delBtn.className = "btn btn-danger my-2 w-100";
		delBtn.onclick = function () {
			swal({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				console.log(result)
				if (result.value) {
					deleteItem(expId);
					tableRow.remove();
					swal(
						'Deleted!',
						'Your file has been deleted.',
						'success'
					)
					showTotal();
				} else {
					swal("Your Entry is Safe!")
				}

			})
		}
		actionColumn.appendChild(delBtn);
		// tableRow.appendChild(actionColumn);
		tableRow.appendChild(actionColumn);
		document.getElementById("expenseTable").appendChild(tableRow);
		// console.log(tableRow.cells[2].children[0]);
	}

}

showExpense();

function addCategory() {
	swal({
		title: "Add New Category!",
		input: "text",
	})
		.then((result) => {
			console.log(result.value);
			let newVal = result.value
			let newCategory = {
				userId: currentUser[0].userId,
				Id: Math.floor(Math.random() * 100001 + 1001),
				category: newVal,
			}

			let categories = document.getElementById("expCategory");
			let option = document.createElement("option");
			let optionText = document.createTextNode(newVal);
			option.appendChild(optionText);
			categories.appendChild(option);
			allCategories.push(newCategory)
			let updatedCategories = JSON.stringify(allCategories);
			localStorage.setItem("allCategories", updatedCategories);
			swal("Category added Sucessfully!", "", "success")
			// setCategory(newCategory);
		})
		.catch((err) => {
			console.log(err);
		});
}



function addExpense() {
	let date = new Date();
	let currentDate = date.toLocaleDateString();
	let currentTime = date.toLocaleTimeString("en-US");
	let expDes = document.getElementById("expName");
	let expAmount = document.getElementById("expAmount");
	let expCategory = document.getElementById("expCategory");

	console.log(expAmount.value + " " + expName.value + " " + expCategory.value);
	let expenseDetails = {
		currentUserId: currentUser[0].userId,
		expenseId: Math.floor(Math.random() * 100001) + 1001,
		expDes: expDes.value,
		expAmount: expAmount.value,
		expCategory: expCategory.value,
		time: currentTime,
		date: currentDate,
	}
	allExpense.push(expenseDetails);
	let newExpense = JSON.stringify(allExpense);
	localStorage.setItem("allExpense", newExpense);
	expAmount.value = "";
	// console.log(expAmount);
	expName.value = "";
	expCategory.value = "";

	let tableRow = document.createElement("tr");
	let expId = expenseDetails.expenseId;
	let expIdCloumn = document.createElement("td");
	let expIdText = document.createTextNode(expId);
	expIdCloumn.appendChild(expIdText);
	tableRow.appendChild(expIdCloumn);
	let expCat = expenseDetails.expCategory;
	let expCatCloumn = document.createElement("td");
	let expCatText = document.createTextNode(expCat);
	expCatCloumn.appendChild(expCatText);
	tableRow.appendChild(expCatCloumn);
	let expDesc = expenseDetails.expDes;
	let expDescCloumn = document.createElement("td");
	let descSpan = document.createElement("span");
	let expDescText = document.createTextNode(expDesc);
	let supCat = document.createElement("sup");
	let catSup = document.createElement("i");
	catSup.className = 'fa fa-edit';
	catSup.onclick = function () {
		swal({
			title: 'Are you sure?',
			text: "You want to Edit Your Expense",
			type: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			input: "text",
			inputValue: expDesc,
		}).then((result) => {
			console.log(result)
			if (result.value) {

				editItem(expId, result.value);
				tableRow.cells[2].innerText = result.value;
				console.log(tableRow.cells[2]);
				swal(
					'Edited!',
					'Your file has been changed.',
					'success'
				)

				showTotal();
			} else {
				swal("Your Entry is unchanged!")
			}

		})
	}
	descSpan.appendChild(expDescText);
	expDescCloumn.appendChild(descSpan);
	supCat.appendChild(catSup);
	expDescCloumn.appendChild(supCat);
	tableRow.appendChild(expDescCloumn);
	let expAmn = expenseDetails.expAmount;
	let expAmountCloumn = document.createElement("td");
	let expAmountText = document.createTextNode(`Rs ${expAmn}/-`);
	expAmountCloumn.appendChild(expAmountText);
	tableRow.appendChild(expAmountCloumn);
	let expTime = expenseDetails.time;
	let expDate = expenseDetails.date;
	let expCreatedAtCloumn = document.createElement("td");
	let expCreatedAtText = document.createTextNode(`${expDate} ${expTime}`);
	expCreatedAtCloumn.appendChild(expCreatedAtText);
	tableRow.appendChild(expCreatedAtCloumn);
	let actionColumn = document.createElement("td");
	let delBtn = document.createElement("button");
	let EditBtn = document.createElement("button");
	let btnText = document.createTextNode("Remove");
	let EditText = document.createTextNode("Edit");
	delBtn.appendChild(btnText);
	delBtn.className = "btn btn-danger my-2 w-100";
	delBtn.onclick = function () {
		swal({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			console.log(result)
			if (result.value) {
				deleteItem(expenseDetails.expenseId);
				tableRow.remove();
				swal(
					'Deleted!',
					'Your file has been deleted.',
					'success'
				)
				showTotal();
			} else {
				swal("Your Entry is Safe!")
			}

		})
	}
	actionColumn.appendChild(delBtn);

	tableRow.appendChild(actionColumn);
	EditBtn.appendChild(EditText);
	EditBtn.className = "btn btn-primary w-100";
	EditBtn.onclick = function () {
		swal({
			title: 'Are you sure?',
			text: "You want to Edit Your Expense",
			type: 'warning',
			input: "text",
			inputValue: expenseDetails.expDes,
			// showCancelButton: true,
			// confirmButtonColor: '#3085d6',
			// cancelButtonColor: '#d33',
			// confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			console.log(result)
			if (result.value) {

				editItem(expenseDetails.expenseId, result.value);
				tableRow.cells[2].innerText = result.value;
				swal(
					'Edited!',
					'Your file has been changed.',
					'success'
				)

				showTotal();
			} else {
				swal("Your Entry is unchanged!")
			}

		})
	}
	actionColumn.appendChild(EditBtn);
	tableRow.appendChild(actionColumn);

	document.getElementById("expenseTable").appendChild(tableRow);
	swal("Expense Added Successfully", "", "success")
	showTotal()
}
function showTotal() {

	let filterExpense1 = allExpense?.filter(expense => expense.currentUserId == currentUser[0].userId);
	let amounts = filterExpense1.map(function (expense) {
		return +expense.expAmount;
	});
	console.log(amounts);
	let total = amounts.reduce(function (acc, curr) {
		return acc += curr
	}, 0);
	console.log(total);
	document.getElementById("total").innerText = `Total: Rs.${total}/-`
}


function editItem(id, value) {
	let current = id;
	for (let i = 0; i < allExpense.length; i++) {
		if (current == allExpense[i].expenseId) {
			let index = allExpense.indexOf(allExpense[i]);
			// allExpense.splice(index, 0);
			// let deletedItem = JSON.stringify(allExpense);
			// localStorage.setItem("allExpense", deletedItem);
			let expenseDetails = {
				currentUserId: currentUser[0].userId,
				expenseId: allExpense[i].expenseId,
				expDes: value,
				expAmount: allExpense[i].expAmount,
				expCategory: allExpense[i].expCategory,
				time: allExpense[i].time,
				date: allExpense[i].date,
			}
			allExpense.splice(index, 1, expenseDetails);
			let deletedItem = JSON.stringify(allExpense);
			localStorage.setItem("allExpense", deletedItem);
		}

	}

}


function deleteItem(id) {
	let current = id
	// let filtered = allExpense.filter(function(expense){
	// 	return expense.expenseID == id
	// });
	// let index
	for (let i = 0; i < allExpense.length; i++) {
		if (current == allExpense[i].expenseId) {
			let index = allExpense.indexOf(allExpense[i]);
			allExpense.splice(index, 1);
			let deletedItem = JSON.stringify(allExpense);
			localStorage.setItem("allExpense", deletedItem);
		}
	}
	// allExpense.push(filtered);
	// let stringifyExpense = JSON.stringify(allExpense);
	// localStorage.setItem("allExpense", stringifyExpense);
}


function search() {
	let input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("search");
	filter = input.value.toUpperCase();
	table = document.getElementById("expenseTable");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[1];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}

function editEntry(index, previousValue, id, row) {
	console.log(previousValue)
	swal({
		title: 'Are you sure?',
		text: "You want to Edit Your Expense",
		type: 'warning',
		showCancelButton: true,
		cancelButtonColor: '#d33',
		input: "text",
		inputValue: previousValue,
	}).then((result) => {
		console.log(result)
		if (result.value) {

			editItem(id, result.value);
			row.cells[index].children[0].innerText = result.value;
			// console.log(tableRow.cells[2]);
			if(result.value != previousValue){
				swal(
					'Edited!',
					'Your file has been changed.',
					'success'
				)
			}

			showTotal();
		} else {
			swal("Your Entry is unchanged!")
		}

	})
}