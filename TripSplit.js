var groupChargeButton = document.getElementById('group_charge_button')
var numUsers = document.getElementsByClassName('user')


groupChargeButton.addEventListener('click', function () {
	var total = document.getElementById('group_charge_amount').value
	groupOwes = total / 4
	chargeGroup(groupOwes)
})

function chargeGroup(amount) {
	var Kyle = document.getElementById('owes_user1')
	for (var i = 2; i < numUsers.length + 1; i++){
		var list = document.getElementById('user'+i+'_owes')
		console.log('user' + i)
		console.log(list.innerHTML)
		Kyle.innerHTML = "Kyle $" + amount
	}
	console.log('Amra owes ' + amount)
}

