var groupChargeButton = document.getElementById('group_charge_button')
var numUsers = document.getElementsByClassName('user').length

var userDictArray = [{}, {}, {}, {}]


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



