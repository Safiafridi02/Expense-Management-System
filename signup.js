const title = document.getElementsByTagName("title")[0];
title.innerText = document.title.text = "Signup | Expense Managment System";
let userData = JSON.parse(localStorage.getItem("Users")) || [];

let form = document.getElementById("form");
let email = document.getElementById("email");
let userName = document.getElementById("userName");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let passError = document.getElementById("passwordError");
let confirmPassError = document.getElementById("confirmPasswordError")
let pass = false;

password.onkeyup = () => {
	if (password.value.length < 8) {
		passError.style.color = "red";
		passError.innerText = "Password must be greater than 8 characters";
		// return false;
	} else {
		pass = true;
		passError.innerText = "";
		
}

}

confirmPassword.onkeyup = () => {
	if (password.value !== confirmPassword.value) {
		confirmPassError.style.color = "red";
		confirmPassError.innerText = "Password not matched";
		// return false;
	} else {
		confirmPassError.innerText = "";
	}
}


form.addEventListener("submit", function signup(e) {
	e.preventDefault();
	
	if (userName.value == "") {
		swal("")
		return false;
	}

	let filtered = userData?.find(function (user) {
		return user.email == email;
	});
	if(pass == false) return false;
	

	if (filtered) {
		alert("Email already Exists");
		return false;
	} else {
		let user = {
			email: email.value,
			userName: userName.value,
			password: password.value,
			userId: Math.floor(Math.random() * 100001) + 1001,
		}

		userData.push(user);
		localStorage.setItem("Users", JSON.stringify(userData));


		form.reset();
		
		swal("", "Account Created Successfully", "success");
		setTimeout(() => {
			location.href = "./index.html";
		}, 2000);

	}
}
);

// single =
// let a = "safi"; single equal(=) means storing safi in a
// let b = "bahu"; single equal(=) means storing bahu in b

// double ==

// a == b dobule equals means comparing the value of a and b

// triple ===
// a === b triple equals means comparing the value and data type of a and b 

