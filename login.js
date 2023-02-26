const title = document.getElementsByTagName("title")[0];
title.innerText = document.title.text = "Login | Expense Managment System";
let userData = JSON.parse(localStorage.getItem("Users")) || [];
let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function login(e) {
	e.preventDefault();


	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;


	if (email == "" || password == "") {
		swal("", "Invalid credentials!", "warning");
		return false;
	}

	let filtered = userData?.filter(function (user) {
		return user.email == email;
	});
	// console.log(filtered);
	if (filtered && filtered[0]?.password !== password) {
		swal("", "Incorrect Password!", "warning");
		return false;

	} else {
		localStorage.setItem("currentUser", JSON.stringify(filtered));
		swal("", "Account Login Successfully", "success");
		setTimeout(() => {
			location.href = "./login.html";
		}, 1000);

	}
}
);