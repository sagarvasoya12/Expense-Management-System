var app = angular.module('myReport',[]);


app.controller('addmodelCtrl', function($scope,$http,$filter,$rootScope) {
	console.log("hello from  addmodelcontroller");


//	report.EndDate = $filter('date')(report.EndDate, "dd/MM/yyyy");
var fname1 = $("#lblData").text();
var fname = fname1.substr(0,fname1.indexOf(' '));
var tb;
	var refresh_report_list=function(){
	$scope.reports="";
	$http.get('/home/reports',{params:{"namee":fname} }).success(function(response){

		console.log("i got data");
		var a=response;
		console.log("a:");
		console.log(a);

		$http.get('/home/report_total' ).success(function(response){
			console.log("aggregate:");
			var b=response;
			console.log(b);

			for(var i=0;i<a.length;i++){
				for(var j=0;j<b.length;j++){
					if(a[i]._id==b[j]._id){
						a[i].total=b[j].count;
					}
				}
			}
				for(var i=0;i<a.length;i++){
														a[i].StartDate=$filter('date')(a[i].StartDate, 'dd/MM/yyyy');
														a[i].EndDate=$filter('date')(a[i].EndDate, 'dd/MM/yyyy');
													}
			$scope.reports=a;
		tb=	$("#tb3").DataTable(
			{
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"aaData": a,
				"bAutoWidth": false,
    					//									"order": [[ 1, 'asc' ]],
    					"order": [],
				 "aoColumns": [
				 {"sTitle": "Sr No.","mData": '_id',"width": "10%",'orderable': false},
				{ "sTitle": "User Name","mData": 'UserName',"sWidth": "25%" },
				{ "sTitle": "Report Tittle","mData": 'ReportTittle',"sWidth": "25%" },
				{ "sTitle": "Start Date","mData": 'StartDate' ,"sWidth": "15%"},
				{ "sTitle": "End Date","mData": 'EndDate',"sWidth": "15%" },
				{ "sTitle": "Total","mData": "total","sWidth": "10%" },
				{
         'targets': 0,
         'searchable': false,
         'orderable': false,
         'className': 'dt-body-center',
         "mData":null,
          mRender: function ( data, type, row ) {
             
          return  ' <button class="btn btn-default " onclick="angular.element(this).scope().goto_addexp(\''+row.UserName+'\',\''+row.ReportTittle+'\')"><a href="#add_expense_tab" data-toggle="tab" >Add Expense</button>';
         }
      }
				]

			});  
		tb.on( 'search.dt', function () {
        tb.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
		});
	});
}
refresh_report_list();

$scope.goto_addexp=function(uname,title){
						
								$scope.nm=uname;
								$scope.ttle=title;
$("#Title_tab").text("Add Expenses");
	$("#unameinput_exp").val(uname);
	$("#unameinput_exp").prop("disabled", true);
$rootScope.$broadcast('update_parent', $scope.nm, $scope.ttle);

/*$scope.fill_exp=function(name){
	//console.log(name);
	
	$http.get('/home/user_report',{params:{"namee":name} }).success(function(response){
		console.log("i got fill");

		$scope.reports=response;
		report_detail=response;
		
		console.log(response);
		console.log(report_detail);
	});
}*/

//$scope.fill_exp(uname);


	

/*	$('#unameinput_exp').append($('<option>', {
    value: uname,
    text: uname
}));
*/	
	
	/*$('#reportinput_exp').append($('<option>', {
    value: title,
    text: title
})); */


}


//$scope.fill_report=function(){
	console.log("hello employee... ")
	$http.get('/home/emp_name').success(function(response){
		console.log("got employname...")
		console.log(response);
		$scope.employname=response;
	})

//}

$scope.addreport=function(){
	
	var start,end,today;
	today = new Date();
	var month = today.getMonth() + 1;
		
	var year = today.getFullYear();

	var day = today.getDate();
		
	var string= year + '/' + month + '/' + day;

	start = new Date();
	
	end = new Date();
	
	start = document.getElementById("startdateinput_rep").value;
	
	end = document.getElementById("enddateinput_rep").value;
	
	if($("#unameinput_rep").val().localeCompare("- Select Employee name -")==0 || $("#unameinput_rep").val().localeCompare("? undefined:undefined ?")==0 ){
		$("#report_form_span").text("Select at least one employee");
		event.preventDefault();
	}
	else if($("#reptitleinput_rep").val().length==0){
		$("#report_form_span").text("Report title is mendatory");
		event.preventDefault();
	}
	else if($("#reptitleinput_rep").val().length>20){
		$("#report_form_span").text("Report title is too long");
		event.preventDefault();
	}
	else if($("#purpose_rep").val().length>100){
		$("#report_form_span").text("Report purpose cannot be grater than 100 characters");
		event.preventDefault();
	}
    else if(start.toString().length==0){
		$("#report_form_span").text("Start date is missing");
		event.preventDefault();
	}
	else if(start > string){
		$("#report_form_span").text("Future start date is selected");
		event.preventDefault();
	}
	else if(end.toString().length==0){
		$("#report_form_span").text("End date is missing");
		event.preventDefault();
	}
	else if(end > string){
		$("#report_form_span").text("Future end date is selected");
		event.preventDefault();
	}
	else if(end < start){
	    $("#report_form_span").text("Starting date must be before Ending date");
		event.preventDefault();
	}
	
	else{

	
		$("#report_form_span").text("");
		console.log("hello from  addmodelcontroller2");
		console.log($scope.report);
		$scope.report.total=0;		

		$scope.report.UserName=document.getElementById("unameinput_rep").value;
		console.log($scope.report);
		$http.post('/home/addreport',$scope.report);

		$('#Report').modal('hide');
		tb.destroy();
		refresh_report_list();
	//	window.location.reload();
	
}
}

});