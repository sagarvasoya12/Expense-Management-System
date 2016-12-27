var app = angular.module('myCash',[]);

app.controller('cashCtrl', function($scope,$http,$filter) {
	
	$http.get('/home/emp_name').success(function(response){
		console.log("got employname...")
		console.log(response);
		$scope.employname=response;
	})
 	$http.get('/home/cash_avail').success(function(response){
 		console.log("Available balance:");
 		console.log(response);
 		$scope.avilable_cash= response[0].count;
 	})

	$scope.add_amt=function()
	{	

		$scope.cashflow.status="Add";
		$scope.cashflow.Exp_amt="";
		$scope.cashflow.Bill_invoiceNo="";
		if($scope.cashflow.Particulars==null){
			$scope.cashflow.Particulars="";
		}
		if($scope.cashflow.Remarks==null){
			$scope.cashflow.Remarks="";
		}
		$scope.cashflow.amt=$scope.cashflow.Received_cash;
		if($scope.avilable_cash==null){
			$scope.avilable_cash=0;		
			}
	//$scope.avilable_cash=$scope.avilable_cash+$scope.amt;
		$http.post('/home/cashflow',$scope.cashflow);
		window.location.reload();

	}
	$scope.deduct_amt=function()
	{	

		$scope.cashflow.Received_cash="";
		if($scope.cashflow.Particulars==null){
			$scope.cashflow.Particulars="";
		}
		if($scope.cashflow.Remarks==null){
			$scope.cashflow.Remarks="";
		}
		if($scope.avilable_cash==null){
			$scope.avilable_cash=0;		
			}
	$scope.cashflow.amt= -$scope.cashflow.Exp_amt;
		$http.post('/home/cashflow',$scope.cashflow);

		window.location.reload();
	}

$http.get('/home/cashflow').success(function(response){
										console.log("i got data Pastagia");
										
										var a=response;
										for(var i=0;i<a.length;i++){
											a[i].date=$filter('date')(a[i].date, 'dd/MM/yyyy');

										}
								var tb=			$("#cash_data").DataTable(
										{

											
									/*	 dom: 'T<"clear">lfrtip',
        tableTools: {
            "aButtons": [ "copy", "print" ]  lrtip     lBftip
        }, */

        


										 dom: "<'row'<'col-sm-2'B>>" +"<'row'<'col-sm-6'l><'col-sm-6'f>>" +
"<'row'<'col-sm-12'tr>>" + 
"<'row'<'col-sm-5'i><'col-sm-7'p>>",
        										buttons: [
           										 'excel'
        												], 
        												
        											
											"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
											"aaData": a,
											"destroy": true,
											"order":[],
											"aoColumns": [
											 {"sTitle": "Sr No.","mData": null, "defaultContent": "<i>Not set</i>","width": "10%",'orderable': false},
											{ "sTitle": "Date","mData": "date" },
											{ "sTitle": "Name","mData": "employ_name" },
											{ "sTitle": "Particulars","mData": "Particulars" },
											{ "sTitle": "Expense Amount","mData": "Exp_amt" },
											{ "sTitle": "Balance","mData": "Received_cash" },
											{ "sTitle": "Bill/invoice No.","mData": "Bill_invoiceNo" },
											{ "sTitle": "Remarks","mData": "Remarks" }
										
									]
   
								});
tb.on( 'order.dt search.dt', function () {
        tb.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
											
});



}); 

