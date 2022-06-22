var groupChargeButton = document.getElementById('group_charge_button')
var addUserButton = document.getElementById('add_user_button')


var userDictArray = [{}, {}, {}, {}]
selectedUser = null


assignDictionaries(document.getElementsByClassName('user').length)


groupChargeButton.addEventListener('click', function () {
	if (selectedUser == null) {
		console.log("Must select a user")
		return
	}
	var numUsers = document.getElementsByClassName('user').length
	if (numUsers < 2) {
		console.log ("Must be 2 or more users.")
		return
	}
	var total = document.getElementById('group_charge_amount').value
	groupOwes = (total / numUsers)
	chargeGroup(groupOwes)
	console.log(userDictArray)
	userSelectedTrue(selectedUser)
})

addUserButton.addEventListener('click', function () {
	var name = document.getElementById('add_user_input').value
	addUser(name)
	// console.log(document.getElementsByClassName("user"))
	// const text = (userButtons)[document.getElementsByClassName('user').length -1].innerHTML

})

function getCurrUserNames() {
	var currNumUsers = document.getElementsByClassName('user').length
	var userNames = []
	for (var i = 0; i < currNumUsers; i++){
		userName = document.getElementsByClassName("user")[i].textContent
		userNames.push(userName)
	}
	return userNames
}

function addUser(name) {	
	if (name == '') {
		console.log("No name found")
		return
	}
	if (document.getElementsByClassName('user').length== 4) {
		console.log("Max number of users is 4")
		return
	}
	var btn = document.createElement("button")
	var currNumUsers = document.getElementsByClassName('user').length
	btn.classList.add("user")
	btn.id = name + "_button"
	btn.value = "false"
	btn.classList.add("user" + (currNumUsers+1))
	btn.innerHTML = name
	document.getElementById('user_names').appendChild(btn)
	btn.addEventListener('click', function () {
		userClicked(btn.id)
	})
	addUserResultsInfo(name, currNumUsers+1)
}

function addUserResultsInfo(name, num) {
	var ul = document.createElement("ul")
	ul.id = name + "_owes"
	ul.classList.add("user_owes")
	ul.classList.add("user" + num + "_owes")
	ul.innerHTML = name + " Owes:"
	document.getElementById('results_section').appendChild(ul)
	userNames = getCurrUserNames()
	addUserLi(ul.id, num)
	for (var i = 0; i < num - 1; i++){
		var temp = getCurrUserNames()[i]
//		console.log(document.getElementById(temp + "_owes"))
		var tempLi = temp + "_owes"
		addUserLi(tempLi, num)
	}

	//	 <li id="owes_Ib" value ="0">Ib</li>

}

function addUserLi(ul_id, num){
	ul = document.getElementById(ul_id)
	kyleTemp = document.getElementById("Kyle_owes")

	var items = ul.querySelectorAll('li')
	var itemArray = new Array();
    	for (var i = 0; i < items.length; i++){
    	itemArray.push(items[i].id);
  	}

	for (var i = 0; i < num; i++){
		if ((ul.id.includes(userNames[i]) == false) && itemArray.includes("owes_" + userNames[i]) == false && ul.querySelectorAll('li').length < 3){
			var userLi = document.createElement("li")
			userLi.id = "owes_" + userNames[i]
			userLi.innerHTML = userNames[i]
			ul.appendChild(userLi)
		}
	}

	assignDictionaries(num)

}

function assignDictionaries(numUsers) {

	for (var i = 0; i < numUsers; i++){
		temp = document.getElementsByClassName('user')[i].textContent
		for (var j = 0; j < numUsers; j++){
			temp2 = document.getElementsByClassName('user')[j].textContent
			if (temp2 != temp){
				if (isNaN(userDictArray[i][temp2])) {
					userDictArray[i][temp2] = 0
				} else {
					userDictArray[i][temp2] += 0
				}
 			}
		}
	}
}

function chargeGroup(groupOwes){
	num = document.getElementsByClassName('user').length
	index = parseInt(selectedUser.className.split(' ')[1].replace('user', '')) - 1
	name = (selectedUser.textContent).toString()
	for (var i = 0; i < num; i++){
		temp = document.getElementsByClassName('user')[i].textContent
		if ((i) == index) { 
			console.log("Skipping this cause " + i + "   " + selectedUser.className)
			continue
		}
		// console.log(userDictArray[i][name])
		// console.log("temp = " + temp)
		// console.log(userDictArray[index][name])
		// owes = userDictArray[i][name] + groupOwes
		userDictArray[i][name] += groupOwes
	//	console.log(temp + " now owes " + name + " " + userDictArray[i][name])
	//	console.log(i + " owes  " + index + " " + owes)

	//	console.log(index + " owes  " + i + " " + userDictArray[index][temp])

		// console.log(i + " owes  " + index + " " + (owes - userDictArray[index][temp]))

		// console.log(index + " owes  " + i + " " + (userDictArray[index][temp] - owes))
		// tempOwed = userDictArray[index][temp]
		// console.log("tempOwed = " + tempOwed)
		// console.log("owes = " + owes)
		userDictArray[index][temp] = userDictArray[index][temp] - groupOwes
		// console.log(name + " now owes " + temp + " " + userDictArray[index][temp])
		// userDictArray[i][name] = owes - tempOwed // should be 20 - 0


		for (var j = 0; j < num - 1; j++) {
			var userLi = document.getElementById(temp + '_owes').querySelectorAll('li')[j]
			var owes = userDictArray[i][name].toFixed(2)
			if (userLi.id.includes(name)) {
				// userLi.innerText = name + ' $' + userDictArray[i][name].toFixed(2)
				if (owes < 0){
					userLi.innerText = name + ' $0.00' 
				} else {
					userLi.innerText = name + ' $' + owes
				}
			}
		}


	}

	for (var i = 0; i < num - 1; i++) {
		var selectedLi = document.getElementById(name + '_owes').querySelectorAll('li')[i]
	//	selectedLi.innerText = name + ' $' + userDictArray[i][name].toFixed(2)
		var tempName = selectedLi.id.replace('owes_', '')
		console.log(selectedLi)
		console.log(tempName)
		var owes = userDictArray[index][tempName].toFixed(2)
		console.log(owes)
		if (owes < 0){
			console.log("negative")
			selectedLi.innerText = tempName + ' $0.00' 
		} else {
			selectedLi.innerText = tempName + ' $' + owes
		}
	}	

	/*

	for (var i = 0; i < num; i++){
		temp = document.getElementsByClassName('user')[i].textContent
		name = (selectedUser.textContent).toString()
		index = parseInt(selectedUser.className.split(' ')[1].replace('user', '')) - 1
		if ((i) == index) { 
			console.log("Skipping this also cause " + i + "   " + selectedUser.className)
			continue
		}
	
		for (var j = 0; j < num - 1; j++) {
			var userLi = document.getElementById(temp + '_owes').querySelectorAll('li')[j]
			console.log(temp + "  " + userLi.id)
			if (userLi.id.includes(name)) {
				console.log("includes " + name + " " + i)
				console.log(userDictArray[i][name])
				console.log(userDictArray[index][temp])
				// owes = (userDictArray[i][name] - userDictArray[index][temp])
				userLi.innerText = selectedUser.textContent + ' $' + userDictArray[i][name].toFixed(2)
			}
		}
	} */
}

function userClicked(id) {
	element = document.getElementById(id)
	name = element.innerText
	// console.log(element.value)
	if (element.value == "true") {
		userSelectedTrue(element)
		return
	}
	if (selectedUser != null) {
	//	console.log("User already selected")
	//	console.log(selectedUser)
		return
	}
	userSelectedFalse(element)
}

function userSelectedTrue(element) {
//	console.log("Here in true")
	element.classList.remove("user_selected")
	element.value = false
	selectedUser = null
	console.log(selectedUser)
}

function userSelectedFalse(element) {
//	console.log("Here in false")
	element.classList.add("user_selected")
	element.value = "true"
	selectedUser = element
//	console.log(selectedUser)
//	console.log(parseInt(selectedUser.className.split(' ')[1].replace('user', '')))
}



