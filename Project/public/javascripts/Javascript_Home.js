$(document).ready(function(){
	var hash = window.location.hash;
	$('#myTab a[href="' + hash + '"]').tab('show');
	var title1 = hash.substr(1);

	if(title1 == ""){
		title1="Dashboard";
	}
	document.title = title1;
	$("#Title_tab").text(title1);
	$("#update_exp").hide();
	//$("#recent_report").delay(15000).show();
	//setTimeout('$("#recent_report").show()',15000);
	//setTimeout(function () {$("#recent_report").show()}, 10000);
	
	
	

$("ul.nav-tabs.head > li > a").click(function(e){
	
	var id = $(e.target).attr("href").substr(1);
	window.location.hash = id;
	window.location.reload();

});

$("#addexpense").click(function(){

	$("#Title_tab").text("Add Expenses");
});

var temp = $("#lblData").text();
var temp1 = temp.substr(0,temp.indexOf(' '));
if(temp1.localeCompare("Jaykumar") != 0){
	$('#generatevoucher').prop("disabled",true);
	$('#approve').prop("disabled",true);
	$('#reject').prop("disabled",true);
	$("#cash").remove();
}
/*	$("#unameinput_navigation1").val(temp1);
		$("#unameinput_navigation1").prop("disabled", true);
	$("#unameinput_navigation2").val(temp1);
		$("#unameinput_navigation2").prop("disabled", true);	
			$("#unameinput_navigation3").val(temp1);
	$("#unameinput_navigation3").prop("disabled", true);
	$("#unameinput_exp").val(temp1);
	$("#unameinput_exp").prop("disabled",true);




$("#submit_navigation1").click(function(){
	
	if($("#unameinput_navigation1").val().localeCompare("- Select Employee -")==0 || $("#unameinput_navigation1").val().localeCompare("? undefined:undefined ?")==0 ){
		
		$("#navigation1_form_span").text("Select any one employee");
		event.preventDefault();
	}

});
$("#submit_navigation2").click(function(){
	
	var text,date,yearn,monthn,dayn,start,end;
	start = new Date();
	end = new Date();
	start = document.getElementById("startdateinput_navigation2").value;
	//yearn = Number(date.slice(0,4));
	//monthn = Number(date.slice(5,7)) - 1;
	//dayn = Number(date.slice(8));
	//start.setFullYear(yearn,monthn,dayn);
	end = document.getElementById("enddateinput_navigation2").value;
	//yearn = Number(date.slice(0,4));
	//monthn = Number(date.slice(5,7)) - 1;
	//dayn = Number(date.slice(8));
	//end.setFullYear(yearn,monthn,dayn);

	if($("#unameinput_navigation2").val().localeCompare("- Select Employee -")==0 || $("#unameinput_navigation2").val().localeCompare("? undefined:undefined ?")==0){
		
		$("#navigation2_form_span").text("Select any one employee");
		event.preventDefault();
	}	
	else if(start.toString().length==0){
		$("#navigation2_form_span").text("Start date is mendatory");
		event.preventDefault();
	}
	else if(end.toString().length==0){
		$("#navigation2_form_span").text("End date is mendatory");
		event.preventDefault();
	}
	else if(end < start){
	    $("#navigation2_form_span").text("Starting date must be before Ending date");
		event.preventDefault();
	}
});
$("#unameinput_navigation3").on('change',function(){
	if($("#unameinput_navigation3").val().localeCompare("- Select Employee -")==0 || $("#unameinput_navigation3").val().localeCompare("? undefined:undefined ?")==0){
		
		$("#navigation3_form_span").text("Select any one employee");
		event.preventDefault();
	}
});*/
$("#add_amount_submit").click(function(){
	if($("#unameinput_cash").val().localeCompare("- Select Employee -")==0 || $("#unameinput_cash").val().localeCompare("? undefined:undefined ?")==0){
		
		$("#cash_form_span").text("Select any one employee");
		event.preventDefault();
	}
	
	else if($("#amountinput_receivedcash").val().length==0){
		$("#cash_form_span").text("Amount is mendatory");
		event.preventDefault();
	}
	else{
		$("#confirmation_add").modal({
			show: true
		});
	}

});
var max_amount;
$("#categoryinput_exp").on('change',function(){
	if($("#categoryinput_exp").val() == 'Food Expense'){
		$("#food_div").show();
		$("#other_div").hide();
	}
	else if($("#categoryinput_exp").val() == 'Other'){
		$("#other_div").show();
		$("#food_div").hide();
	}
	else{
		$("#food_div").hide();
		$("#other_div").hide();
	}
});


$("#bill_checkbox").click(function(){
	$("#attached_file_form").toggle();
});


/*$("#delete_confirmation_expense").click(function(){
	$("#confirmation_delete_modal").modal({
		show: true
	});
}); */
$("#deduct_amount_submit").click(function(){
	if($("#unameinput_cash").val().localeCompare("- Select Employee -")==0|| $("#unameinput_cash").val().localeCompare("? undefined:undefined ?")==0){
		
		$("#cash_form_span").text("Select any one employee");
		event.preventDefault();
	}
	
	else if($("#amountinput_Expcash").val().length==0){
		$("#cash_form_span").text("Amount is mendatory");
		event.preventDefault();
	}
	else{$("#confirmation_deduct").modal({
		show: true
	});}
});







$("#addreport").click(function(){

	var temp = $("#lblData").text();
	var temp1 = temp.substr(0,temp.indexOf(' '));
	
	if(temp1.localeCompare("Jaykumar") != 0){
		$("#unameinput_rep").val(temp1);
	
		$("#unameinput_rep").prop("disabled", true);

	}
	$("#Report").modal({
		show: true
	});	
});
$("#addexpense").click(function(){

	var temp = $("#lblData").text();
	var temp1 = temp.substr(0,temp.indexOf(' '));
	if(temp1.localeCompare("Jaykumar") != 0){
		$("#unameinput_exp").val(temp1);
		$("#unameinput_exp").prop("disabled", true);

	}
	
});
$("#cancel_exp").click(function(){
	
	//$('#myTab a[href="#Expenses"]').tab('show');
	window.location.reload();
});
$("#requestvoucher").click(function(){

	var temp = $("#lblData").text();
	var temp1 = temp.substr(0,temp.indexOf(' '));
	if(temp1.localeCompare("Jaykumar") != 0){
		$("#unameinput_vou").val(temp1);
		$("#unameinput_vou").prop("disabled", true);

	}
	$("#Voucher").modal({
		show: true
	});	
});
$(".analysis1").click(function(){
	
	var temp = $("#lblData").text();
	var temp1 = temp.substr(0,temp.indexOf(' '));
	if(temp1.localeCompare("Jaykumar") != 0){
$("#unameinput_navigation1").val(temp1);
		$("#unameinput_navigation1").prop("disabled", true);
		$("#unameinput_navigation2").val(temp1);
		$("#unameinput_navigation2").prop("disabled", true);
		$("#unameinput_navigation3").val(temp1);
		$("#unameinput_navigation3").prop("disabled", true);
		$("#unameinput_navigation4").val(temp1);
		$("#unameinput_navigation4").prop("disabled", true);
}
});


});

