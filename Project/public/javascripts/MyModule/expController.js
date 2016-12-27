var app = angular.module('myExp',[]);



app.controller('addexpCtrl',function($scope,$http,fileUpload,$filter,$rootScope) {
	var fname1 = $("#lblData").text();
	var fname = fname1.substr(0,fname1.indexOf(' '));
	var tb2;



									var refresh_exp_list=function(){
									$scope.exps="";
									console.log("namee"+fname);
									$http.get('/home/exp',{params:{"namee":fname} }).success(function(response){
										
										$scope.exps=response;
										var a=response;
										for(var i=0;i<a.length;i++){
											a[i].Date=$filter('date')(a[i].Date, 'dd/MM/yyyy');

										}
										tb2 =	$("#tb1").DataTable(
										{
											"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
											"aaData": a,
											"destroy": true,
											"order": [],
											"aoColumns": [
											{
												'targets': 0,
												'searchable': false,
												'orderable': false,
												'className': 'dt-body-center',
												"mData":"_id",
												mRender: function ( data, type, row ) {
													return '<input type="checkbox" class="check_all" onclick="angular.element(this).scope().Click2(\''+row._id+'\', \''+row.Amount+'\', \''+row.Report+'\', \''+row.status+'\')"/>';
												}
											},
											{ "sTitle": "Username","mData": "Username" },
											{ "sTitle": "Report","mData": "Report" },
											{ "sTitle": "Category","mData": "Category" },
											{ "sTitle": "Amount","mData": "Amount" },
											{ "sTitle": "Date","mData": "Date" },
											{ "sTitle": "status","mData": "status" },
											{'targets': 0,
											'searchable': false,
											'orderable': false,

											'className': 'dt-body-center',
											"mData":"img_path",
											
											mRender: function ( data, type, row ) {
												if(row.img_path){
												return '<a href= \''+row.img_path+'\'  target="_blank" id="attach_file"> <i class=" glyphicon glyphicon-paperclip" id="attach_file"></i></a>';

											}else{
												return "";
											}
										}
										},
										{'targets': 0,
										'searchable': false,
										'orderable': false,
										'className': 'dt-body-center',
										"mData":null,
										mRender: function ( data, type, row ) {
											return '<a href= "#" class="edit_icon" onclick="angular.element(this).scope().edit_exp(\''+row._id+'\',\''+row.Username+'\',\''+row.status+'\',\''+row.Category+'\')" data-toggle="tab" id="attach_file"> <i class=" glyphicon glyphicon-edit" id="attach_file"></i></a>';

										}
									}
									]
								});
});

									}
									refresh_exp_list();


								var checkbox_selected=[];
										//	var Amount=[];
										$scope.Click2=function(id,amount,report,status){

											console.log("Click2");
											var f=1;
											for(var i=0;i<checkbox_selected.length;i++){
												if(checkbox_selected[i].id==id){
													checkbox_selected.splice(i,1);
													f=0;
													break;
												}
											}
											if(f==1){
												checkbox_selected.push({
													id:id,
													title:report,
													amt:amount,
													sts:status
												});


											}
										
										
									}

									$scope.select_all=function(){
										checkbox_selected=[];

										if(document.getElementById("check_all").checked == true){
											$(".check_all").prop("checked", true);
											$http.get('/home/exp',{params:{"namee":fname} }).success(function(response){
												console.log("i got data 2");
												
												for(var i=0;i<response.length;i++){
													checkbox_selected.push({
														id:response[i]._id,
														title:response[i].Report,
														amt:response[i].Amount,
														sts:response[i].status
													});
												}
												
												console.log(checkbox_selected);
											});
										}
										else{
											checkbox_selected=[];
											console.log(checkbox_selected);
											$(".check_all").prop("checked", false);

										}
									}

									$scope.check_item=function(){
											if(checkbox_selected.length==0){
											
											$("#blank_modal").modal({
											show: true
											}); 

										}else{
											$("#confirmation_delete_modal").modal({
		show: true
	});
									}

									$scope.delete_exp=function(){
										var msg=0;
									
										for(var i=0;i<checkbox_selected.length;i++){
											if(checkbox_selected[i].sts!="Approved"){
												console.log(checkbox_selected[i].id);
												$http.delete('/home/exp/'+checkbox_selected[i].id);
// $http.get('/home/report_date',{params:{"namee":$scope.exp.Report_id} })
												document.getElementById("check_all").checked = false;
											//	subtract_report_amount(Amount[i].title,Amount[i].amt);
										}
										else{
											msg=1;
										}
									}
									if(msg==1){
										
										$('#confirmation_delete_modal').modal('hide');
									/*	$("#confirmation_delete_modal").modal({
		show: false
	});*/		
										$("#Approved_edit_modal").modal({
											show: true
											}); 
									}else
									{
									$('#confirmation_delete_modal').modal('hide');
									tb2.destroy();
									refresh_exp_list();
							//	window.location.reload();
							$("#reject_alert").hide();
							$("#approve_alert").hide();
								$("#delete_alert").show();
							}
							console.log(checkbox_selected);
									checkbox_selected=[];
							}
						}

							$scope.approve_exp=function(){
								if(checkbox_selected.length==0){
											
											$("#blank_modal").modal({
											show: true
											}); 
										}else{

								for(var i=0;i<checkbox_selected.length;i++){
									console.log(checkbox_selected[i].id);

									$http.get('/home/approve_exp',{params:{"id":checkbox_selected[i].id} });
									document.getElementById("check_all").checked = false;

								}
								console.log(checkbox_selected);
								checkbox_selected=[];
								window.location.reload();
								
									//	tb2.destroy();
								//	refresh_exp_list();
									$("#reject_alert").hide();
									$("#delete_alert").hide();
									$("#approve_alert").show();


							}
						}

							$scope.reject_exp=function(){
								if(checkbox_selected.length==0){
										
											$("#blank_modal").modal({
											show: true
											}); 
										}else{

								for(var i=0;i<checkbox_selected.length;i++){
									console.log(checkbox_selected[i].id);

									$http.get('/home/reject_exp',{params:{"id":checkbox_selected[i].id} });
									document.getElementById("check_all").checked = false;
											//	subtract_report_amount(Amount[i].title,Amount[i].amt);
										}
									
										console.log(checkbox_selected);
										checkbox_selected=[];
										window.location.reload();
								
							//		tb2.destroy();
							//		refresh_exp_list();
									$("#delete_alert").hide();
									$("#approve_alert").hide();
									$("#reject_alert").show();
							}
						}

							$rootScope.edit_exp=function(id,name,status,Category){
								$scope.message =id;
								$scope.nm=name;
								 var element = $(this);
							if(Category=="Food Expense"){
									$("#food_div").show();
							}
								 

								if(status=="Approved")
								{
									 $(".edit_icon").attr("href", "#");
									 $("#Approved_edit_modal").modal({
									 	show: true
									 });
									
									
								}else{
									
									//window.location.href= "#add_expense_tab";
									$(".edit_icon").attr("href", "#add_expense_tab");
								$rootScope.$broadcast('update_parent_controller', $scope.message,$scope.nm);
									
							}
							/*	$scope.exp_id=id;
								
												console.log("please:");
												console.log($scope.exp);
												 console.log( "please");
												// $scope.exp.Username="jay";
												// $("#unameinput_exp").val(response[0].Username);

												//$scope.exp.Amount=response[0].Amount;
												 //$("#amountinput_exp").val(response[0].Amount);	
									$("#dateinput_exp").val(response[0].Date);	
									$('#reportinput_exp').append($('<option>', {
 										   value: response[0].Report,
 										   text: response[0].Report
										}));
									 $("#reportinput_exp").val(response[0].Report);		 
												console.log(response);
											
												$("#categoryinput_exp").val(response[0].Category);
									
												$("#paymodeinput_exp").val(response[0].Payment);	
									
									});
*/
} ;





});












app.controller('addexpCtrl2',function($scope,$http,fileUpload,$filter,$rootScope) {


	var fname1 = $("#lblData").text();
	var fname = fname1.substr(0,fname1.indexOf(' '));
	

var report_detail;
$scope.fill_exp=function(name){
	console.log(name);
	$http.get('/home/user_report',{params:{"namee":name} }).success(function(response){
		console.log("i got fill");
		$scope.reports=response;
		report_detail=response;
		
		console.log(response);
		console.log(report_detail);
	});
}




	console.log("hello from addexpctrlcontroller");
	$http.get('/home/emp_name').success(function(response){
		console.log("got employname...")
		console.log(response);
		$scope.employname=response;
	});
	if(fname!="Jaykumar"){
	
		$scope.fill_exp(fname);
			

		
	}




$rootScope.$on("update_parent", function(event, nm,ttle) {
	
	
		$scope.fill_exp(nm);
		if(fname!="Jaykumar"){
		$("#unameinput_exp").prop("disabled", true);
		
	}
	$("#reportinput_exp").val(ttle);
		});
	$rootScope.$on("update_parent_controller", function(event, message,nm) {
		$scope.exp_id = message;
		var id=message;
		$("#update_exp").show();
		$("#submit_exp").hide();

		$scope.fill_exp(nm);


		$http.get('/home/edt_exp',{params:{"e_id":id} }).success(function(response){
									
									$scope.exp=response;
											
										if(fname!="Jaykumar"){
		$("#unameinput_exp").prop("disabled", true);
		
	}					
								});

});

	

$scope.updateexp=function(){  




var today,enter,date,text,yearn,monthn,dayn,max_amount,st_date,end_date,exp_date;
	today = new Date();
	enter = new Date();
	date = document.getElementById("dateinput_exp").value;
	yearn = Number(date.slice(0,4));
	monthn = Number(date.slice(5,7)) - 1;
	dayn = Number(date.slice(8));
	enter.setFullYear(yearn,monthn,dayn);

	var a = $("#person_number_exp").val();
	
	max_amount = a*400;
	
	if (enter > today) {
		$("#expense_form_span").text("Future date is selected");
		event.preventDefault();
	}
	else if(date.toString().length==0){
		$("#expense_form_span").text("Date is mendatory");
	}
	else if($("#unameinput_exp").val().localeCompare("- Select Employee name -")==0 || $("#unameinput_exp").val().localeCompare("? undefined:undefined ?")==0){
		
		$("#expense_form_span").text("Select any one employee");
		event.preventDefault();
	}
	else if($("#reportinput_exp").val().localeCompare("- Select Report -")==0 || $("#reportinput_exp").val().localeCompare("? undefined:undefined ?")==0){
		$("#expense_form_span").text("Select any one report");
		event.preventDefault();
	}
	else if($("#categoryinput_exp").val().localeCompare("- Select Category -")==0 || $("#categoryinput_exp").val().localeCompare("? undefined:undefined ?")==0){
		$("#expense_form_span").text("Select any one category");
		event.preventDefault();
	}
	else if($("#amountinput_exp").val().length==0){
		$("#expense_form_span").text("Amount is mendatory");
		event.preventDefault();
	}
	else if(($scope.exp.Category=="Food Expense") && $("#amountinput_exp").val()>max_amount){
	$("#expense_form_span").text("Maximum reimbursed amount is : " + max_amount);
		event.preventDefault();	
	}
	else if($("#bill_checkbox").prop('checked') && $("#receiptinput_exp").val()==''){
		
			$("#expense_form_span").text("You have to select file");
			
			event.preventDefault();
		
	}
	/*else if(checkDecimal($("#amountinput_exp").val())){
		$("#expense_form_span").text("Amount must be up to 2 decimal");
		event.preventDefault();	
	}*/

	

	

	else{


		for(var i=0;i<report_detail.length;i++){
			if($scope.exp.Report==report_detail[i].ReportTittle){
				$scope.exp.Report_id=report_detail[i]._id;
			}
		} 
 $http.get('/home/report_date',{params:{"namee":$scope.exp.Report_id} }).success(function(response){
	
	st_date=response[0].StartDate;
	end_date=response[0].EndDate;
	exp_date=$scope.exp.Date;
	
	
	if(  (exp_date<st_date) || (exp_date>end_date) ){
			
		$("#expense_form_span").text("Expense Date should between Report's StartDate and EndDate");
		event.preventDefault();
		
	}
 


//lert(s + " " + e);
		else{

			$("#expense_form_span").text("");
		if($("#receiptinput_exp").val()==''){
			$scope.exp.Username=document.getElementById("unameinput_exp").value;
			console.log($scope.exp.Username);

		
			$http.post('/home/addvoucher',$scope.exp);
		}

		$("#expense_form_span").text("");
	$scope.exp.status="Pending";

		/*for(var i=0;i<report_detail.length;i++){
			if($scope.exp.Report==report_detail[i].ReportTittle){
				$scope.exp.Report_id=report_detail[i]._id;
			}
		} */

		if($scope.exp.Category!="Food Expense")
		{
			$scope.exp.no_of_person="";
		}
	
	
	if($scope.myFile!=undefined)
											{
												var file = $scope.myFile;
												console.log("file is " );
												console.dir(file);
												console.log($scope.myFile.name);
												var path=$scope.myFile.name;
												var d= new Date();
												var path_url="/"+"upload_images"+"/"+path.split('.',1) + '-' +d.getHours()+ d.getMinutes() + '.' + path.split('.')[path.split('.').length -1];
												console.log(path_url);

												$scope.exp.img_path=path_url;
												var uploadUrl = "/home/upload";
												fileUpload.uploadFileToUrl(file, uploadUrl);
											}


$http.put('/home/updt/' + $scope.exp._id,$scope.exp).success(function(response){
	window.location.reload();
})

}
});
}
}





$scope.addexp=function(){  


	var today,enter,date,text,yearn,monthn,dayn,flag,max_amount,st_date,end_date,exp_date;
	today = new Date();
	enter = new Date();

	date = document.getElementById("dateinput_exp").value;
	yearn = Number(date.slice(0,4));
	monthn = Number(date.slice(5,7)) - 1;
	dayn = Number(date.slice(8));
	enter.setFullYear(yearn,monthn,dayn);
	
	var a = $("#person_number_exp").val();
	
	max_amount = a*400;
	




	if (enter > today) {
		$("#expense_form_span").text("Future date is selected");
		event.preventDefault();
	}
	else if(date.toString().length==0){
		$("#expense_form_span").text("Date is mendatory");
	}
	else if($("#unameinput_exp").val().localeCompare("- Select Employee name -")==0 || $("#unameinput_exp").val().localeCompare("? undefined:undefined ?")==0){
		
		$("#expense_form_span").text("Select any one employee");
		event.preventDefault();
	}
	else if($("#reportinput_exp").val().localeCompare("- Select Report -")==0 || $("#reportinput_exp").val().localeCompare("? undefined:undefined ?")==0){
		$("#expense_form_span").text("Select any one report");
		event.preventDefault();
	}
	else if($("#categoryinput_exp").val().localeCompare("- Select Category -")==0 || $("#categoryinput_exp").val().localeCompare("? undefined:undefined ?")==0){
		$("#expense_form_span").text("Select any one category");
		event.preventDefault();
	}
	

	else if($("#amountinput_exp").val().length==0){
		
		$("#expense_form_span").text("Amount is mendatory");
		event.preventDefault();
	}
	else if( ($scope.exp.Category=="Food Expense") &&  $("#amountinput_exp").val()>max_amount){
	$("#expense_form_span").text("Maximum reimbursed amount is : " + max_amount);
		event.preventDefault();	
	}

	else if($("#bill_checkbox").prop('checked') && $("#receiptinput_exp").val()==''){
		
			$("#expense_form_span").text("you have to select file");
			alert("select file");
			event.preventDefault();
		
	}

	else {

		for(var i=0;i<report_detail.length;i++){
												if($scope.exp.Report==report_detail[i].ReportTittle){
													$scope.exp.Report_id=report_detail[i]._id;
												}
											}
											
   $http.get('/home/report_date',{params:{"namee":$scope.exp.Report_id} }).success(function(response){
	
	st_date=response[0].StartDate;
	end_date=response[0].EndDate;
	exp_date=$scope.exp.Date;
	
	
	//st = new Date(st_date);
	//end = new Date(end_date);
	//ex = new Date(exp_date);
	if(  (exp_date<st_date) || (exp_date>end_date) ){
			
		$("#expense_form_span").text("Expense Date should between Report's StartDate and EndDate");
		event.preventDefault();
		
	}
 


//lert(s + " " + e);
		else{
			$("#expense_form_span").text("");
	
			if($("#receiptinput_exp").val()==''){
			$scope.exp.Username=document.getElementById("unameinput_exp").value;
			console.log($scope.exp.Username);

		
			$http.post('/home/addvoucher',$scope.exp);
			}

		
		
		

		$scope.exp.status="Pending";
		$scope.exp.Username=document.getElementById("unameinput_exp").value;
		$scope.exp.Report=document.getElementById("reportinput_exp").value;

		console.log("report:"+$scope.exp.Report);
										/*	for(var i=0;i<report_detail.length;i++){
												if($scope.exp.Report==report_detail[i].ReportTittle){
													$scope.exp.Report_id=report_detail[i]._id;
												}
											} */
											console.log($scope.exp.Report_id);
											
											if($scope.myFile!=undefined)
											
											{
												var file = $scope.myFile;
												console.log("file is " );
												console.dir(file);
												console.log($scope.myFile.name);
												var path=$scope.myFile.name;
												var d= new Date();
												var path_url="/"+"upload_images"+"/"+path.split('.',1) + '-' +d.getHours()+ d.getMinutes() + '.' + path.split('.')[path.split('.').length -1];
												console.log(path_url);

												$scope.exp.img_path=path_url;
												var uploadUrl = "/home/upload";
												fileUpload.uploadFileToUrl(file, uploadUrl);
											}

											console.log($scope.exp);
											$http.post('/home/addexp',$scope.exp);

											var amount=$scope.exp.Amount;
											var report_name=$scope.exp.Report;
											window.location.reload();
											
								//			tb2.destroy();
								//	refresh_exp_list();
									//$('#myTab a[href="#Expenses"]').tab('show');
								
								$scope.reports="";
								$http.get('/home/reports',{params:{"namee":fname} }).success(function(response){
									console.log("i got data");
									$scope.reports=response;

									console.log(response);
								});


							}
						});
					}
} 
					});






app.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

app.service('fileUpload', ['$http', function ($http) {
	this.uploadFileToUrl = function(file, uploadUrl){
		var fd = new FormData();
		fd.append('file', file);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		})
		.success(function(){

		})
		.error(function(){
		});
	}
}]);