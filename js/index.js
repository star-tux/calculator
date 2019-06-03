$(document).ready(function() {
	var dot = ".",
			del = "C",
			back = "CE",
			equal = "=",
	    operators = ["+","-","*","/","x²"],
			numbers = ["0","1","2","3","4","5","6","7","8","9"],
	    arr = [],
			sumVal = 0;

			function addToArr(val) {
				"use strict";
				arr.push(val);
			}
			function emptyArr(arr) {
				"use strict";
				var j;
				if (arr.length > 0) {
					for (j = arr.length; j > 0; j--) {
						arr.pop();
					}
				}
			}
			function backspace() {
			  if (arr.length > 0) {
			    arr.pop();
			  }
			}
			function intoNum(n) { //prevent multiple zero and multiple dot
				"use strict";
				return parseFloat(n);
			}
			function total(arr) {
				"use strict";
				var i, value=0;
				if (arr.length > 1) {
					value = arr.join('');
				}else{
					value = intoNum(arr[0]);
				}
				return eval(value);
			}
			function countDot(str) {
				var letter = '\\.';
				return ( str.match( RegExp(letter,'g') ) || [] ).length;
			}
			function roundTotal(str) {
					if (countDot(str) === 1) {
						return intoNum(parseFloat(str).toFixed(2)); //prevents 2.2+2.1 = 4.300000000000001
					} else {
						return str;
					}
			}

	$('.btn').click(function() {
			var lcd = $("#lcd").val(); //actual value of screen
					val = $(this).attr("value"); //value of clicked button

				if (jQuery.inArray(val, numbers) > -1) {
					sumVal += val;
					if (countDot(sumVal) === 0) {
							sumVal = intoNum(sumVal);  //delete zero in front of number
					}
					$("#lcd").val(sumVal);
				}else if (jQuery.inArray(val, operators) > -1) {
					if (val === "x²") {
						 sumVal = lcd * lcd;
						 $("#lcd").val(roundTotal(sumVal.toString()));
					 }else{
						 addToArr(lcd);
						 addToArr(val);
						 sumVal = 0;
					 }
				}else if (val === dot) {
					sumVal += val;
					if (countDot(sumVal) === 1) {
							$("#lcd").val(sumVal);
					}else if (countDot(sumVal) > 1) {
							sumVal = sumVal.slice(0,sumVal.length-1); //prevents more than one deciminal in a number (delete last dot)
							$("#lcd").val(sumVal);
					}
				}else if (val === del) {
					emptyArr(arr);
					$("#lcd").val("0");
					sumVal = 0;
				}else if (val === back) {
					$("#lcd").val("0");
					sumVal = 0;
				}else if (val === equal) {
					addToArr(lcd);					
					$("#lcd").val(roundTotal(total(arr).toString()));
					emptyArr(arr);
				}
		}); //end .btn
}); //end document ready
