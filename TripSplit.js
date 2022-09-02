let page = document.body.id

if (page == 'home_page'){
	// newTrip button from home page
	var newTripButton = document.getElementById('new_trip_button')

	newTripButton.addEventListener('click', function() {
		localStorage.clear()
		console.log("Cleared Storage")
	})
}

if (page == 'trip_page'){
	var groupChargeButton = document.getElementById('group_charge_button')
	var chargeIndividualButton = document.getElementById('charge_individual_button')
	var addUserButton = document.getElementById('add_user_button')
	var confirmChargeButton = document.getElementById('confirm_charge')
	var saveTripButton = document.getElementsByClassName('save_trip_button')[0]

	

	var userDictArray = [{}, {}, {}, {}]
	var individualChargeArray = []
	selectedUser = null



	assignDictionaries(document.getElementsByClassName('user').length)


	saveTripButton.addEventListener('click', function () {
		console.log("In save trip button")
		userNames = getCurrUserNames()
		numUsers = userNames.length
		console.log(userNames)
		for (var i = 0; i < numUsers; i++){
			localStorage.setItem(userNames[i], JSON.stringify(userDictArray[i]))
		}
	})


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
		document.getElementById('group_charge_amount').value = ''
	})

	chargeIndividualButton.addEventListener('click', function () {
		if (selectedUser == null) {
			console.log("Must select a user")
			return
		}
		var numUsers = document.getElementsByClassName('user').length
		if (numUsers < 2) {
			console.log ("Must be 2 or more users.")
			return
		}
		if (chargeIndividualButton.classList.length > 1) {
			chargeIndividualButton.classList.remove("charge_individual_selected")
			confirmChargeButton.style.display = 'none'
			individualChargeArray = []
			users_to_be_charged.innerText = individualChargeArray
		} else {
			chargeIndividualButton.classList.add("charge_individual_selected")
			confirmChargeButton.style.display = 'inline'
			console.log("Charge Individual - " + selectedUser.textContent + ", please select another user(s)")
		}
	})

	confirmChargeButton.addEventListener('click', function () {
		name = selectedUser.innerText
		var selectedUserIndex = parseInt(selectedUser.className.split(' ')[1].replace('user', '')) - 1
		var numUsers = document.getElementsByClassName('user').length
		len = individualChargeArray.length
		if (len == 0){
			return
		}
		amount = document.getElementById('individual_charge_amount').value
		groupOwes = amount / (len + 1)
		for (var i = 0; i < len; i++){
			var temp = individualChargeArray[i]
			tempButtonElement = document.getElementById(temp + '_button')
			tempIndex = parseInt(tempButtonElement.className.split(' ')[1].replace('user', '')) - 1
			console.log(tempIndex + " : tempIndex ")
			console.log(tempButtonElement)
			tempOwes = userDictArray[tempIndex][name] + groupOwes
			console.log(temp + " owes " + name + " " + tempOwes)
			userDictArray[tempIndex][name] = tempOwes
			userDictArray[selectedUserIndex][temp] = userDictArray[selectedUserIndex][temp] - groupOwes

			for (var j = 0; j < numUsers - 1; j++) {
				var userLi = document.getElementById(temp + '_owes').querySelectorAll('li')[j]
				console.log(userLi)
				if (userLi.id.includes(name)) {
					if (owes < 0){
						userLi.innerText = name + " $0.00" 
					} else {
						userLi.innerText = name + ' $' + tempOwes.toFixed(2)
					}
				}
			}
		}

		for (var i = 0; i < numUsers - 1; i++) {
			var selectedLi = document.getElementById(name + '_owes').querySelectorAll('li')[i]
			var tempName = selectedLi.id.replace('owes_', '')
			console.log(selectedLi)
			console.log(tempName)
			var owes = userDictArray[selectedUserIndex][tempName].toFixed(2)
			console.log(owes)
			if (owes < 0){
				console.log("negative")
				selectedLi.innerText = tempName + ' $0.00' 
			} else {
				selectedLi.innerText = tempName + ' $' + owes
			}
		}

		chargeIndividualButton.classList.remove("charge_individual_selected")
		confirmChargeButton.style.display = 'none'
		document.getElementById('individual_charge_amount').value = ''
		individualChargeArray = []
		users_to_be_charged.innerText = individualChargeArray


	})

	addUserButton.addEventListener('click', function () {
		var name = document.getElementById('add_user_input').value
		addUser(name)
		document.getElementById('add_user_input').value = ''
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
		btn.addEventListener('click', function () {
			chargeSelectedUser(btn.id)
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
			var tempLi = temp + "_owes"
			addUserLi(tempLi, num)
		}
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
				userLi.innerHTML = userNames[i] + " $0.00"
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
				continue
			}

			userDictArray[i][name] += groupOwes

			userDictArray[index][temp] = userDictArray[index][temp] - groupOwes
		


			for (var j = 0; j < num - 1; j++) {
				var userLi = document.getElementById(temp + '_owes').querySelectorAll('li')[j]
				var owes = userDictArray[i][name].toFixed(2)
				if (userLi.id.includes(name)) {
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
	}

	function userClicked(id) {
		element = document.getElementById(id)
		name = element.innerText
		if (element.value == "true") {
			userSelectedTrue(element)
			return
		}
		if (selectedUser != null) {
			return
		}
		userSelectedFalse(element)
	}

	function chargeSelectedUser(id) {
		element = document.getElementById(id)
		name = element.innerText
		var chargeIndSelected = (chargeIndividualButton.classList.length > 1)
		console.log(chargeIndSelected)
		if (individualChargeArray.includes(name)) {
			const index = individualChargeArray.indexOf(name)
			individualChargeArray.splice(index, 1)
			console.log("Removing " + name + " from list")
			console.log(individualChargeArray)
			users_to_be_charged.innerText = individualChargeArray
			return
		}
		if (chargeIndSelected) {
			console.log("adding " + name + " to the list")
			individualChargeArray.push(name)
			console.log(individualChargeArray)
			users_to_be_charged = document.getElementById('users_to_be_charged')
			users_to_be_charged.innerText = individualChargeArray
			return
		}
		return
	}

	function userSelectedTrue(element) {
		element.classList.remove("user_selected")
		element.value = false
		selectedUser = null
	}

	function userSelectedFalse(element) {
		element.classList.add("user_selected")
		element.value = "true"
		selectedUser = element
	}
}
