;( function() {
 	function Calendardata(year,month){

		this.year = year;
		this.month = month;

		if(!year || !month){
			var nowtime = new Date();
			this.year = nowtime.getFullYear();
			this.month = nowtime.getMonth() + 1;
			this.date =nowtime.getDate();
			if(this.date < 10) {
				this.date = '0'+this.date;
			}

		}

		this.Datelist = [];
	}
	Calendardata.prototype.getData= function() {

		var year = this.year;
		var month = this.month -1 ;

		//开始日
		var startDate = new Date(year, month, 1);
		var startDateDate = startDate.getDate();
		var startDateDay = startDate.getDay();
		if(startDateDay === 0){
			startDateDay = 7;
		}
		//结束日
		var endDate = new Date(year, month + 1, 0);
		var endDateDate = endDate.getDate();
		//上月最后一天
		var lastMonth = new Date(year, month , 0);
		var lastMonthDate = lastMonth.getDate()
		//
		var dateCount = endDateDate;
		this.lastCount=startDateDay - 1;//前几天
		this.overCount= this.lastCount + dateCount//后几天

		for (var i = 1; i < 43; i++){
			var obj = {};
			//年
			var thisyear = year;
			//月
			var thismonth = month + 1 ;

			var thisdate = i-this.lastCount;
			//上一月
			if(i<=this.lastCount) {
				thismonth = thismonth -1;
				thisdate = lastMonthDate-this.lastCount + i;
			}
			//下一月
			if(i > this.lastCount + dateCount) {
				thisdate = i-this.lastCount - dateCount;
				thismonth = thismonth + 1;
			}
			// + 0
			if(thisdate<10){
				thisdate = '0'+thisdate;
			}
			var obj = {
				thisyear,
				thismonth,
				thisdate
			};

			this.Datelist.push(obj);

		}
	}
	Calendardata.prototype.biuldDate = function () {
		var html = 
			'<div class="Calendar-head">'+ this.year+ '-' + this.month +
				'<a href="#" class="prev-btn">'+ '<' +'</a>'+
				'<a href="#" class="next-btn">'+ '>' +'</a>'+
			'</div>'+
			'<div class="Calendar-body">'+
				'<table>'+
					'<tr>'+
						'<th>'+'Mon'+'</th>'+
						'<th>'+'Tues'+'</th>'+
						'<th>'+'Web'+'</th>'+
						'<th>'+'Thur'+'</th>'+
						'<th>'+'Fri'+'</th>'+
						'<th>'+'Sat'+'</th>'+
						'<th>'+'Sun'+'</th>'+
					'</tr>';
		for (var i = 0; i < this.Datelist.length; i++){
			if(i%7 === 0) {
				html += '<tr>';
			}
			if(this.Datelist[i].thisdate === this.date && this.Datelist[i].thismonth===this.month){
				html += '<td class= "light">'+this.Datelist[i].thisdate+'</td>';
				continue ;
			}
			if(i<this.lastCount || i>=this.overCount){
				html += '<td class="not">'+this.Datelist[i].thisdate+'</td>';
				continue;
			}else{
				html += '<td>'+this.Datelist[i].thisdate+'</td>';
			}
			if(i%7 === 6) {
				html += '</th>';
			}
		}
		html +=
				'</table>'+
			'</div>';
		return  html;
	}
	Calendardata.prototype.init = function ($dom) {
		this.getData();
		var html = this.biuldDate();
		var dom = document.querySelector($dom);
		dom.innerHTML=html;
		this.change($dom,dom);
	}
	Calendardata.prototype.change = function($dom,dom){
			var _this = this;
			var dom = document.querySelector(".Calendar-head");
			dom.addEventListener('click',function(e){
			_this.Datelist.splice(0,_this.Datelist.length)
			var target = e.target;
			if(target.className==='prev-btn'){
				_this.month = _this.month-1;
				if(_this.month === 0){
					_this.month = 12;
					_this.year = _this.year - 1;
				}
				_this.init($dom);	
			}
			if(target.className==='next-btn'){
				_this.month = _this.month+1;
				if(_this.month === 13){
					_this.month = 1;
					_this.year = _this.year + 1;
				}
				_this.init($dom);
			}
		},false)
	}
var  calendar = new Calendardata();
window.calendar =calendar;

 })()