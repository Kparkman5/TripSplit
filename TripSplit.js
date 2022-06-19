var groupChargeButton = document.getElementById('group_charge_button')
var numUsers = document.getElementsByClassName('user').length
var user1Dict = {}
var user2Dict = {}
var user3Dict = {}
var user4Dict = {}

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
	groupOwes = total / 4
	chargeGroup(groupOwes)
})


function assignDictionaries(numUsers) {

	user1Dict.user2 = {}
	user1Dict.user3 = {}
	user1Dict.user4 = {}

	user1Dict.user2[name2] = 0
	user1Dict.user3[name3] = 0
	user1Dict.user4[name4] = 0

	user2Dict.user1 = {}
	user2Dict.user3 = {}
	user2Dict.user4 = {}

	user2Dict.user1[name1] = 0
	user2Dict.user3[name3] = 0
	user2Dict.user4[name4] = 0

	user3Dict.user1 = {}
	user3Dict.user2 = {}
	user3Dict.user4 = {}

	user3Dict.user1[name1] = 0
	user3Dict.user2[name2] = 0
	user3Dict.user4[name4] = 0

	user4Dict.user1 = {}
	user4Dict.user2 = {}
	user4Dict.user3 = {}

	user4Dict.user1[name1] = 0
	user4Dict.user2[name2] = 0
	user4Dict.user3[name3] = 0
}





function chargeGroup(amount) {

	for (var i = 0; i < numUsers - 1; i++){
		var userLi = document.getElementById('user2_owes').querySelectorAll('li')[i]
		var userName = userLi.textContent
		console.log(userLi)
		if (userLi.id.includes('Kyle')) {
			user2Dict.user1['Kyle'] += amount
			userLi.innerText = 'Kyle' + ' $' + user2Dict.user1['Kyle']
			/*
			user2Dict.user1[userName] += amount
			userLi.value = user2Dict.user1[userName]
			console.log(userLi.value)
			userLi.innerText = userName + ' $' + user2Dict.user1[userName]
			console.log(userLi.value)
			*/
		}
	}

	for (var i = 0; i < numUsers - 1; i++){
		var userLi = document.getElementById('user3_owes').querySelectorAll('li')[i]
		var userName = userLi.textContent
		if (userLi.id.includes('Kyle')) {
			user3Dict.user1['Kyle'] += amount
			userLi.innerText = 'Kyle' + ' $' + user3Dict.user1['Kyle']
		}
	}

	for (var i = 0; i < numUsers - 1; i++){
		var userLi = document.getElementById('user4_owes').querySelectorAll('li')[i]
		var userName = userLi.textContent
		if (userLi.id.includes('Kyle')) {
			user4Dict.user1['Kyle'] += amount
			userLi.innerText = 'Kyle' + ' $' + user4Dict.user1['Kyle']
		}
	}


	console.log('user2 ' + JSON.stringify(user2Dict))	
	console.log('user3 ' + JSON.stringify(user3Dict))
	console.log('user4 ' + JSON.stringify(user4Dict))
}


/*
	var Kyle = document.getElementById('owes_user1')
	for (var i = 2; i < numUsers + 1; i++){
		var list = document.getElementById('user'+i+'_owes')
		console.log('user' + i)
		console.log(list.innerHTML)
		Kyle.innerHTML = "Kyle $" + amount
	}
	*/



