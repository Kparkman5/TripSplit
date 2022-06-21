var groupChargeButton = document.getElementById('group_charge_button')
var addUserButton = document.getElementById('add_user_button')

var numUsers = document.getElementsByClassName('user').length

var userDictArray = [{}, {}, {}, {}]



assignDictionaries(numUsers)


groupChargeButton.addEventListener('click', function () {
	var total = document.getElementById('group_charge_amount').value
	groupOwes = (total / document.getElementsByClassName('user').length)
	chargeGroup(groupOwes)
	console.log(userDictArray)
})

addUserButton.addEventListener('click', function () {
	var name = document.getElementById('add_user_input').value
	addUser(name)
})

function getCurrUserNames() {
	var currNumUsers = document.getElementsByClassName('user').length
	var userNames = []
	for (var i = 0; i < currNumUsers; i++){
		userName = document.getElementsByClassName("user")[i].textContent
		console.log(document.getElementsByClassName("user")[i].textContent)
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
	btn.classList.add("user" + (currNumUsers+1))
	btn.innerHTML = name
	document.getElementById('user_names').appendChild(btn)
	addUserResultsInfo(name, currNumUsers+1)
	// for (var i = 0; i < currNumUsers - 1; i++){
	// 	var temp = getCurrUserNames()[i]
	// 	var ul_id = document.getElementById(temp + "_owes")
	// 	// addUserLi(ul_id, currNumUsers -1)
	// }
}

function addUserResultsInfo(name, num) {
	var ul = document.createElement("ul")
	ul.id = name + "_owes"
	ul.classList.add("user_owes")
	ul.classList.add("user" + num + "_owes")
	ul.innerHTML = name + " Owes:"
	document.getElementById('results_section').appendChild(ul)
	console.log(num)
	userNames = getCurrUserNames()
	addUserLi(ul.id, num)
	for (var i = 0; i < num - 1; i++){
		var temp = getCurrUserNames()[i]
		console.log(document.getElementById(temp + "_owes"))
		var tempLi = temp + "_owes"
		console.log(num)
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
		console.log(temp)
		for (var j = 0; j < numUsers; j++){
			temp2 = document.getElementsByClassName('user')[j].textContent
			if (temp2 != temp){
				if (isNaN(userDictArray[i][temp2])) {
					userDictArray[i][temp2] = 0
				} else {
					userDictArray[i][temp2] += 0
				}
				console.log(userDictArray[i])
 			}
		}
	}
}



function chargeGroup(groupOwes){
	num = document.getElementsByClassName('user').length
	for (var i = 1; i < num; i++){
		temp = document.getElementsByClassName('user')[0].textContent
		userDictArray[i][temp] += groupOwes
	}
	for (var i = 1; i < num; i++){
		temp = document.getElementsByClassName('user')[i].textContent
		console.log(userDictArray[i] + i)

		for (var j = 0; j < num - 1; j++) {
			var userLi = document.getElementById(temp + '_owes').querySelectorAll('li')[j]
			console.log("here now " + j + " out of " + num + "  " + userLi)
			if (userLi.id.includes('Kyle')) {
				userLi.innerText = 'Kyle' + ' $' + userDictArray[i].Kyle.toFixed(2)
			}
		}
	}
}



