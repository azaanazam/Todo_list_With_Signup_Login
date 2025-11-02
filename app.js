const signupForm = document.getElementById("signup");
const loginForm = document.getElementById("login");
const wel = document.getElementById("wel");
wel.style.display = "none";

let addTask = document.getElementById("addTask");
let task = document.getElementById("task");
let list = document.getElementById("list");

let currentUser = null; 


window.onload = function () {
  const loggedIn = localStorage.getItem("loggedIn");
  const email = localStorage.getItem("currentUser");

  if (loggedIn === "true" && email) {
    currentUser = email;
    showWelcome();
    loadTasks(); 
  } else {
    wel.style.display = "none";
    signupForm.style.display = "flex";
    loginForm.style.display = "none";
  }
};


function toggleForm() {
  if (signupForm.style.display === "none") {
    signupForm.style.display = "flex";
    loginForm.style.display = "none";
  } else {
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
  }
}


function Signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("signupEmail").value;
  const number = document.getElementById("number").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !number || !password) {
    alert("Please fill all fields");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  
  if (users.some(u => u.email === email)) {
    alert("This email is already registered!");
    return;
  }

  users.push({ name, email, number, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("SignUp Successful!");

  document.getElementById("name").value = "";
  document.getElementById("signupEmail").value = "";
  document.getElementById("number").value = "";
  document.getElementById("signupPassword").value = "";

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("currentUser", email);
  currentUser = email;
  showWelcome();
  loadTasks();
}


function Login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const match = users.find(u => u.email === email && u.password === password);

  if (match) {
    alert("Login Successful!");
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", email);
    currentUser = email;
    showWelcome();
    loadTasks();
  } else {
    alert("Invalid Email or Password");
  }
}


function showWelcome() {
  signupForm.style.display = "none";
  loginForm.style.display = "none";
  wel.style.display = "block";

  
  if (!document.getElementById("logoutBtn")) {
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logoutBtn";
    logoutBtn.textContent = "Logout";
    logoutBtn.style.marginTop = "15px";
    logoutBtn.onclick = logout;
    wel.appendChild(logoutBtn);
  }

  
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === currentUser);
  if (user) {
    wel.querySelector(".boss").innerText = `WELCOME ${user.name.toUpperCase()}`;
  }
}


function logout() {
  localStorage.setItem("loggedIn", "false");
  localStorage.removeItem("currentUser");
  currentUser = null;
  wel.style.display = "none";
  signupForm.style.display = "flex";
  loginForm.style.display = "none";
  list.innerHTML = ""; 
  alert("You have been logged out!");
}




addTask.addEventListener("click", () => {
  if (task.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  const newTask = task.value.trim();
  addTaskToUI(newTask);
  saveTaskToStorage(newTask);
  task.value = "";
});


function addTaskToUI(taskText) {
  const div = document.createElement("div");
  div.classList.add("main");
  div.innerHTML = `
    <li>${taskText}</li> 
    <div> 
      <button onclick="edit(this)">Edit</button> 
      <button onclick="del(this)">Delete</button>
    </div> 
  `;
  list.appendChild(div);
}


function saveTaskToStorage(taskText) {
  if (!currentUser) return;
  let allTasks = JSON.parse(localStorage.getItem("userTasks")) || {};
  let tasks = allTasks[currentUser] || [];
  tasks.push(taskText);
  allTasks[currentUser] = tasks;
  localStorage.setItem("userTasks", JSON.stringify(allTasks));
}


function loadTasks() {
  list.innerHTML = "";
  if (!currentUser) return;
  const allTasks = JSON.parse(localStorage.getItem("userTasks")) || {};
  const tasks = allTasks[currentUser] || [];
  tasks.forEach(taskText => addTaskToUI(taskText));
}


function edit(element) {
  const liText = element.parentNode.parentNode.querySelector("li").innerText;
  task.value = liText;
  del(element);
}


function del(element) {
  const liText = element.parentNode.parentNode.querySelector("li").innerText;
  element.parentNode.parentNode.remove();

  if (!currentUser) return;
  let allTasks = JSON.parse(localStorage.getItem("userTasks")) || {};
  let tasks = allTasks[currentUser] || [];
  tasks = tasks.filter(t => t !== liText);
  allTasks[currentUser] = tasks;
  localStorage.setItem("userTasks", JSON.stringify(allTasks));
}



// function Assignment(){
//   const Assignment = createElement(div)
//   Assignment.innerHTML("Created By Azan")
// }

// Assignment()


function create(){
  alert("Create_By_Azan");
}