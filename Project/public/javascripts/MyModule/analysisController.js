var app = angular.module('myAnalysis',[]);

app.controller('analysisCtrl', function($scope,$http,$filter) {
	console.log("hello analysisCtrl")
	var fname1 = $("#lblData").text();
	var fname = fname1.substr(0,fname1.indexOf(' '));
	
	var table;
	$http.get('/home/emp_name').success(function(response){
		console.log("got employname...")
		console.log(response);
		$scope.employname=response;
	})


	$scope.year=function()
	{
		var year=$scope.yearly;
		if($("#unameinput_navigation1").val().localeCompare("- Select Employee -")==0 || $("#unameinput_navigation1").val().localeCompare("? undefined:undefined ?")==0 ){
		
		$("#navigation1_form_span").text("Select any one employee");
		event.preventDefault();
	}else{
		$("#navigation1_form_span").text("");
		$scope.emp_name=document.getElementById("unameinput_navigation1").value;
		
		
		var id=$("#monthinput_navigation1").prop('selectedIndex');
		var analysis_data;
		var mon,month;
		if(id>9){
			mon=id;
		}
		else{
			mon="0"+id;
		}
		
		if((mon!="00"   &&  year!=undefined) && (mon!="00"   &&  year!="- Select Year -"))
		{
			$http.get('/home/find_mon_year',{params:{"namee":$scope.emp_name,"month":mon,"year":year} }).success(function(response){
				$scope.exps=response;
				analysis_data=response;
				console.log(response);
				for(var i=0;i<analysis_data.length;i++){
														analysis_data[i].Date=$filter('date')(analysis_data[i].Date, 'dd/MM/yyyy');
														
													}


		console.log("analysistable:");
		console.log(analysis_data);
		  table =	$("#analysistable").DataTable(
			{
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"aaData": analysis_data,
				"bAutoWidth": false,
    														"order": [[ 1, 'asc' ]],
				 "aoColumns": [

				 {"sTitle": "Sr No.","mData": '_id',"width": "10%",'orderable': false},
				{ "sTitle": "Employee Name","mData": "Username","sWidth": "20%" },
				{ "sTitle": "Report","mData": "Report","sWidth": "20%" },
				{ "sTitle": "Category","mData": "Category","sWidth": "20%" },
				{ "sTitle": "Amount","mData": "Amount","sWidth": "10%" },
				{ "sTitle": "Date","mData": "Date","sWidth": "10%" },
				{ "sTitle": "status","mData": "status","sWidth": "10%" }
				
				]
   });
		  table.on( 'search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
			});
		}else if(mon=="00" || mon==undefined )
		{
			$http.get('/home/find_year',{params:{"namee":$scope.emp_name,"year":year} }).success(function(response){
				$scope.exps=response;
				analysis_data=response;
				console.log(response);
				for(var i=0;i<analysis_data.length;i++){
														analysis_data[i].Date=$filter('date')(analysis_data[i].Date, 'dd/MM/yyyy');
														
													}

		console.log("analysistable:");
		console.log(analysis_data);
		  table =	$("#analysistable").DataTable(
			{
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"aaData": analysis_data,
				"bAutoWidth": false,
    														"order": [[ 1, 'asc' ]],
				 "aoColumns": [

				 {"sTitle": "Sr No.","mData": '_id',"width": "10%",'orderable': false},
				{ "sTitle": "Employee Name","mData": "Username","sWidth": "20%" },
				{ "sTitle": "Report","mData": "Report","sWidth": "20%" },
				{ "sTitle": "Category","mData": "Category","sWidth": "20%" },
				{ "sTitle": "Amount","mData": "Amount","sWidth": "10%" },
				{ "sTitle": "Date","mData": "Date","sWidth": "10%" },
				{ "sTitle": "status","mData": "status","sWidth": "10%" }
				
				]
   });
		   table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
			});
		}else if(year=="- Select Year -" || year==undefined)
		{
			
			$http.get('/home/find_mon',{params:{"namee":$scope.emp_name,"month":mon} }).success(function(response){
				$scope.exps=response;
				analysis_data=response;
				console.log(response);
				for(var i=0;i<analysis_data.length;i++){
														analysis_data[i].Date=$filter('date')(analysis_data[i].Date, 'dd/MM/yyyy');
														
													}
		console.log("analysistable:");
		console.log(analysis_data);
		  table =	$("#analysistable").DataTable(
			{
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"aaData": analysis_data,
				"bAutoWidth": false,
    														"order": [[ 1, 'asc' ]],
				 "aoColumns": [

				 {"sTitle": "Sr No.","mData": '_id',"width": "10%",'orderable': false},
				{ "sTitle": "Employee Name","mData": "Username","sWidth": "20%" },
				{ "sTitle": "Report","mData": "Report","sWidth": "20%" },
				{ "sTitle": "Category","mData": "Category","sWidth": "20%" },
				{ "sTitle": "Amount","mData": "Amount","sWidth": "10%" },
				{ "sTitle": "Date","mData": "Date","sWidth": "10%" },
				{ "sTitle": "status","mData": "status","sWidth": "10%" }
				
				]
   });
			
			 table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
		});	
		}
		
		table.destroy();
	}
}

	$scope.two_date=function(startdate,enddate)
	{


		var text,date,yearn,monthn,dayn,start,end;
	start = new Date();
	end = new Date();
	start = document.getElementById("startdateinput_navigation2").value;
	//yearn = Number(date.slice(0,4));
	//monthn = Number(date.slice(5,7)) - 1;
	//dayn = Number(date.slice(8));
	//start.setFullYear(yearn,monthn,dayn);
	end = document.getElementById("enddateinput_navigation2").value;
	name=document.getElementById("unameinput_navigation2").value;
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
	}else{
		$("#navigation2_form_span").text("");
		$http.get('/home/two_date',{params:{"namee":name,"s_date":startdate,"e_date":enddate} }).success(function(response){
			$scope.exp=response;
			console.log(response);
			var a=response;
			for(var i=0;i<a.length;i++){
											a[i].Date=$filter('date')(a[i].Date, 'dd/MM/yyyy');
														
													}
			 table =	$("#analysis_date").DataTable(
			{
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"aaData": a,
				"bAutoWidth": false,
    														"order": [[ 1, 'asc' ]],
				 "aoColumns": [

				 {"sTitle": "Sr No.","mData": '_id',"width": "10%",'orderable': false},
				{ "sTitle": "Employee Name","mData": "Username","sWidth": "20%" },
				{ "sTitle": "Report","mData": "Report","sWidth": "20%" },
				{ "sTitle": "Category","mData": "Category","sWidth": "20%" },
				{ "sTitle": "Amount","mData": "Amount","sWidth": "10%" },
				{ "sTitle": "Date","mData": "Date","sWidth": "10%" },
				{ "sTitle": "status","mData": "status","sWidth": "10%" }
				
				]
   });
			  table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
			
		
		});
table.destroy();
	}
}
if(fname!="Jaykumar"){
	$http.get('/home/exp_status_total',{params:{"namee":fname}} ).success(function(response){
			if(response[0]!=null){
			$scope.totalexp=response[0].count;
			console.log($scope.totalexp);
			console.log(response);
}
});
	$http.get('/home/exp_status',{params:{"namee":fname}} ).success(function(response){
			console.log(response);
			for(var i=0;i<response.length;i++){
				if(response[i]._id=="Approved"){
					$scope.reimbursedexp=response[i].count;
				}
				else if(response[i]._id=="Rejected"){
					$scope.rejectedexp=response[i].count;
				}
				else if(response[i]._id=="Pending"){
					$scope.pendingexp=response[i].count;
				}
				}
			});	
}
	$scope.exp_status=function(){
	if($("#unameinput_navigation3").val().localeCompare("- Select Employee -")==0){
		
		$("#navigation3_form_span").text("Select any one employee");
		event.preventDefault();
	}else{
		$("#navigation3_form_span").text("");
		$scope.totalexp=null;
		$scope.reimbursedexp=null;
		$scope.rejectedexp=null;
		$scope.pendingexp=null;

		$http.get('/home/exp_status_total',{params:{"namee":$scope.employ_nm}} ).success(function(response){
			if(response[0]!=null){
			$scope.totalexp=response[0].count;
			console.log($scope.totalexp);
			console.log(response);
}
});



		$http.get('/home/exp_status',{params:{"namee":$scope.employ_nm}} ).success(function(response){
			console.log(response);
			for(var i=0;i<response.length;i++){
				if(response[i]._id=="Approved"){
					$scope.reimbursedexp=response[i].count;
				}
				else if(response[i]._id=="Rejected"){
					$scope.rejectedexp=response[i].count;
				}
				else if(response[i]._id=="Pending"){
					$scope.pendingexp=response[i].count;
				}
				}
			});	
}
}

	$scope.Category_wise=function()
	{
		var year=$scope.nav4_year;
		if($("#unameinput_navigation4").val().localeCompare("- Select Employee -")==0 || $("#unameinput_navigation4").val().localeCompare("? undefined:undefined ?")==0 ){
		
		$("#navigation4_form_span").text("Select any one employee");
		event.preventDefault();
	}else if($("#categoryinput_navigation4").val().localeCompare("- Select Employee -")==0 || $("#categoryinput_navigation4").val().localeCompare("? undefined:undefined ?")==0 ){
		
		$("#navigation4_form_span").text("Select any one Category");
		event.preventDefault();
	}else
	{
		$("#navigation4_form_span").text("");
		$scope.emp_name=document.getElementById("unameinput_navigation4").value;
		
		
		var id=$("#monthinput_navigation4").prop('selectedIndex');
		var analysis_data;
		var mon,month;
		
		
		if(id>9){
			mon=id;
		}
		else{
			mon="0"+id;
		}
		
		if((mon!="00"   &&  year!=undefined) && (mon!="00"   &&  year!="- Select Year -"))
		{
			
			$http.get('/home/analysis_Category_month_year',{params:{"namee":$scope.nav4_employ_nm,"month":mon,"year":year,"Category":$scope.nav4_category} }).success(function(response){
				//$scope.exps=response;
				analysis_data=response;
				console.log(response);
				for(var i=0;i<analysis_data.length;i++){
														analysis_data[i].Date=$filter('date')(analysis_data[i].Date, 'dd/MM/yyyy');
														
													}


		console.log("analysis_category:");
		console.log(analysis_data);
		  table =	$("#analysis_category").DataTable(
			{
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"aaData": analysis_data,
				"bAutoWidth": false,
    														"order": [[ 1, 'asc' ]],
				 "aoColumns": [

				 {"sTitle": "Sr No.","mData": '_id',"width": "10%",'orderable': false},
				{ "sTitle": "Employee Name","mData": "Username","sWidth": "20%" },
				{ "sTitle": "Report","mData": "Report","sWidth": "20%" },
				{ "sTitle": "Category","mData": "Category","sWidth": "20%" },
				{ "sTitle": "Amount","mData": "Amount","sWidth": "10%" },
				{ "sTitle": "Date","mData": "Date","sWidth": "10%" },
				{ "sTitle": "status","mData": "status","sWidth": "10%" }
				
				]
   });
		   table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
			
			});
		}else if(mon=="00" || mon==undefined )
		{
			
			$http.get('/home/analysis_Category_year',{params:{"namee":$scope.nav4_employ_nm,"year":year,"Category":$scope.nav4_category} }).success(function(response){
				
				analysis_data=response;
				console.log(response);
				for(var i=0;i<analysis_data.length;i++){
														analysis_data[i].Date=$filter('date')(analysis_data[i].Date, 'dd/MM/yyyy');
														
													}

		console.log("analysis_category:");
		console.log(analysis_data);
		  table =	$("#analysis_category").DataTable(
			{
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"aaData": analysis_data,
				"bAutoWidth": false,
    														"order": [[ 1, 'asc' ]],
				 "aoColumns": [

				 {"sTitle": "Sr No.","mData": '_id',"width": "10%",'orderable': false},
				{ "sTitle": "Employee Name","mData": "Username","sWidth": "20%" },
				{ "sTitle": "Report","mData": "Report","sWidth": "20%" },
				{ "sTitle": "Category","mData": "Category","sWidth": "20%" },
				{ "sTitle": "Amount","mData": "Amount","sWidth": "10%" },
				{ "sTitle": "Date","mData": "Date","sWidth": "10%" },
				{ "sTitle": "status","mData": "status","sWidth": "10%" }
				
				]
   });
		   table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
			});
		}else if($scope.nav4_year=="- Select Year -" || $scope.nav4_year==undefined )
		{	
			
			$http.get('/home/analysis_Category_month',{params:{"namee":$scope.nav4_employ_nm,"month":mon,"Category":$scope.nav4_category} }).success(function(response){
				
				analysis_data=response;
				console.log(response);
				for(var i=0;i<analysis_data.length;i++){
														analysis_data[i].Date=$filter('date')(analysis_data[i].Date, 'dd/MM/yyyy');
														
													}
		console.log("analysis_category:");
		console.log(analysis_data);
		  table =	$("#analysis_category").DataTable(
			{
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"aaData": analysis_data,
				"bAutoWidth": false,
    														"order": [[ 1, 'asc' ]],
				 "aoColumns": [

				 {"sTitle": "Sr No.","mData": '_id',"width": "10%",'orderable': false},
				{ "sTitle": "Employee Name","mData": "Username","sWidth": "20%" },
				{ "sTitle": "Report","mData": "Report","sWidth": "20%" },
				{ "sTitle": "Category","mData": "Category","sWidth": "20%" },
				{ "sTitle": "Amount","mData": "Amount","sWidth": "10%" },
				{ "sTitle": "Date","mData": "Date","sWidth": "10%" },
				{ "sTitle": "status","mData": "status","sWidth": "10%" }
				
				]
   });
		   table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
			});
			
		}
		
		table.destroy();
	}
}


});
