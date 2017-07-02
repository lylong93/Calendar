(function (){
	var Calendardata = {};
	var list = [];

	Calendardata.getdata= function() {
		var nowdate = new Date();
		var nowyear = date.getFullYear();
		var nowmonth = date.getMonth();
		var nowday = date.getDay();
		if(day===0){
			day=7;
		}
		// var startData = 
		// var endDate =
		// var lastDate =
		// var startData = new Date();
		var lastDate = new Date(year, month, 1);

		// console.log(startData);
		console.log(lastDate);
	}

	// function _getdata () {

	// }

	window.calendar = Calendardata;
})()

calendar.getdata();