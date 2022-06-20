var groupChargeButton = document.getElementById('group_charge_button')
var numUsers = document.getElementsByClassName('user').length
var user1Dict = {}
var user2Dict = {}
var user3Dict = {}
var user4Dict = {}


var userDictArray = [{}, {}, {}, {}]

const kyleObj = document.getElementsByClassName('user')[0]
const amraObj = document.getElementsByClassName('user')[1]
const chrisObj = document.getElementsByClassName('user')[2]
const ibObj = document.getElementsByClassName('user')[3]

var name1 = kyleObj.textContent
var name2 = amraObj.textContent
var name3 = chrisObj.textContent
var name4 = ibObj.textContent

assignDictionaries(numUsers)



groupChargeButton.addEventListener('click', function () {
	var total = document.getElementById('group_charge_amount').value
	groupOwes = (total / 4)
	chargeGroup(groupOwes)
	console.log(userDictArray)


})

function assignDictionaries(numUsers) {

	for (var i = 0; i < numUsers; i++){
		temp = document.getElementsByClassName('user')[i].textContent
		for (var j = 0; j < numUsers; j++){
			temp2 = document.getElementsByClassName('user')[j].textContent
			if (temp2 != temp){
				userDictArray[i][temp2] = 0
 			}
		}
	}
}



function chargeGroup(groupOwes){
	for (var i = 1; i < numUsers; i++){
		temp = document.getElementsByClassName('user')[0].textContent
		userDictArray[i][temp] += groupOwes
	}
	for (var i = 1; i < numUsers; i++){
		temp = document.getElementsByClassName('user')[i].textContent

		for (var j = 0; j < numUsers - 1; j++) {
			var userLi = document.getElementById(temp + '_owes').querySelectorAll('li')[j]
			if (userLi.id.includes('Kyle')) {
				userLi.innerText = 'Kyle' + ' $' + userDictArray[i].Kyle.toFixed(2)
			}
		}
	}
}


/* function chargeGroup(amount) {

	for (var i = 0; i < numUsers - 1; i++){
		var userLi = document.getElementById('user2_owes').querySelectorAll('li')[i]
		var userName = userLi.textContent
		console.log(userLi)
		if (userLi.id.includes('Kyle')) {
			user2Dict.user1['Kyle'] += amount
			userLi.innerText = 'Kyle' + ' $' + user2Dict.user1['Kyle'].toFixed(2)
			/*
			user2Dict.user1[userName] += amount
			userLi.value = user2Dict.user1[userName]
			console.log(userLi.value)
			userLi.innerText = userName + ' $' + user2Dict.user1[userName]
			console.log(userLi.value)
			
		}
	}

	for (var i = 0; i < numUsers - 1; i++){
		var userLi = document.getElementById('user3_owes').querySelectorAll('li')[i]
		var userName = userLi.textContent
		if (userLi.id.includes('Kyle')) {
			user3Dict.user1['Kyle'] += amount
			userLi.innerText = 'Kyle' + ' $' + user3Dict.user1['Kyle'].toFixed(2)
		}
	}

	for (var i = 0; i < numUsers - 1; i++){
		var userLi = document.getElementById('user4_owes').querySelectorAll('li')[i]
		var userName = userLi.textContent
		if (userLi.id.includes('Kyle')) {
			user4Dict.user1['Kyle'] += amount
			userLi.innerText = 'Kyle' + ' $' + user4Dict.user1['Kyle'].toFixed(2)
		}
	}


	console.log('user2 ' + JSON.stringify(user2Dict))	
	console.log('user3 ' + JSON.stringify(user3Dict))
	console.log('user4 ' + JSON.stringify(user4Dict))
}

*/
/*
	var Kyle = document.getElementById('owes_user1')
	for (var i = 2; i < numUsers + 1; i++){
		var list = document.getElementById('user'+i+'_owes')
		console.log('user' + i)
		console.log(list.innerHTML)
		Kyle.innerHTML = "Kyle $" + amount
	}
	*/



