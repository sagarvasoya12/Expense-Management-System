var app = angular.module('myVoucher',[]);

app.controller('voucherCtrl', function($scope,$http,$filter) {

	console.log("hello from  vouchercontroller");
	var fname1 = $("#lblData").text();
	var fname = fname1.substr(0,fname1.indexOf(' '));
	var tb3;
//$scope.load_empname=function(){
										console.log("hello employee... ")
										$http.get('/home/emp_name').success(function(response){
											console.log("got employname...")
											console.log(response);
											$scope.employname=response;
										});

								//	}
								//	$scope.load_empname();

	var refresh_voucher_list=	function(){
		$scope.voucher="";
		$http.get('/home/voucher',{params:{"namee":fname} }).success(function(response){

			$scope.vouchers=response;
			var voucher_data=response;
			for(var i=0;i<voucher_data.length;i++){
														voucher_data[i].Date=$filter('date')(voucher_data[i].Date, 'dd/MM/yyyy');
														
													}
			if(fname=="Jaykumar"){								
			  tb3 =	$("#example3").DataTable(
			{
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"aaData": voucher_data,

    													
    														"order": [],
				 "aoColumns": [
				
				{ "sTitle": "Sr. No","mData":"srno",'orderable': false },
				{ "sTitle": "Employee Name","mData": "Username" },
				{ "sTitle": "Tittle","mData": "Report" },
				{ "sTitle": "Category","mData": "Category" },
				{ "sTitle": "Amount","mData": "Amount" },
				{ "sTitle": "Date","mData": "Date" },
					{
         'targets': 0,
         'searchable': false,
         'orderable': false,
         'className': 'dt-body-center',
         "mData":null,
          mRender: function ( data, type, row ) {
          	
             return '<button type="submit" class="btn btn-default generate_voucher" onclick="angular.element(this).scope().generate_vou(\''+row.srno+'\', \''+row.Username+'\', \''+row.Amount+'\')">Generate</button>';
         }
     }

      
				
				]
   });
			}else{
				 tb3 =	$("#example3").DataTable(
			{
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"aaData": voucher_data,

    													
    														"order": [],
				 "aoColumns": [
				
				{ "sTitle": "Sr. No","mData":"srno",'orderable': false },
				{ "sTitle": "Employee Name","mData": "Username" },
				{ "sTitle": "Tittle","mData": "Report" },
				{ "sTitle": "Category","mData": "Category" },
				{ "sTitle": "Amount","mData": "Amount" },
				{ "sTitle": "Date","mData": "Date" }
				]
			});

			}
			  

			console.log(response);
		});
	}
	refresh_voucher_list();

/*
	$scope.voucher_submit=function(){
		var today,enter,date,text,yearn,monthn,dayn;
	today = new Date();
	enter = new Date();
	date = document.getElementById("dateinput_vou").value;
	yearn = Number(date.slice(0,4));
	monthn = Number(date.slice(5,7)) - 1;
	dayn = Number(date.slice(8));
	enter.setFullYear(yearn,monthn,dayn);

	if (enter > today) {
		$("#voucher_form_span").text("Future date is selected");
		event.preventDefault();
	}
	else if(date.toString().length==0){
		$("#voucher_form_span").text("Date is mendatory");
		event.preventDefault();
	}
	else if($("#amountinput_vou").val().length==0){
		$("#voucher_form_span").text("Amount is mendatory");
		event.preventDefault();
	}
	else if($("#unameinput_vou").val().localeCompare("- Select Employee name -")==0 || $("#unameinput_vou").val().localeCompare("? undefined:undefined ?")==0){
		$("#voucher_form_span").text("Select any one employee");
		event.preventDefault();
	}
	else if($("#voutitleinput_vou").val().length==0){
		$("#voucher_form_span").text("Voucher title should not be blank");
		event.preventDefault();
	}
	else if($("#voutitleinput_vou").val().length>20){
		$("#voucher_form_span").text("Voucher title should not be greater than 100 characters");
		event.preventDefault();
	}
	else if($("#description_vou").val().length>100){
		$("#voucher_form_span").text("Description should not be greater than 100 characters");
		event.preventDefault();
	}
		else{	console.log($scope.voucher);
			
			
			$scope.voucher.Username=document.getElementById("unameinput_vou").value;
			console.log($scope.voucher.Username);

			console.log($scope.voucher);
			$http.post('/home/addvoucher',$scope.voucher);
			
			$('#Voucher').modal('hide');
		//	window.location.reload();
		tb3.destroy();
		refresh_voucher_list();
		}
	}
	*/
	$scope.generate_vou=function(srno,emp_name,amt){

sessionStorage.setItem("infor1",srno);
sessionStorage.setItem("infor2", emp_name);
sessionStorage.setItem("infor3", amt);

	window.open("sample.html");

	}
});