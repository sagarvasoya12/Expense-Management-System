
//var app = angular.module('myApp', []);

var app = angular.module('myModule',[ ]);
				app.controller('myCtrl', function($scope,$http,$filter) {
$scope.chart_exp_year=function(year){
var b=[];
var m=0;
var c;

$http.get('/home/chart_month_total').success(function(response){
		
		console.log("chart");
		
			for(var j=1;j<=12;j++){
				if(j<10){
				 c=year+"-0"+j;
			}else{
				 c=year+"-"+j;
			}
			
				m=0;
				for(var i=0;i<response.length;i++){
			
			if(c==response[i]._id){
				b.push(response[i].count);
				m=1;
				//break;
			}
		}
		if(m==0){
			b.push(0);
		}
	}
	console.log(b);
	
Highcharts.chart('container', {
					 chart: {
                                type: 'column'
                            },
                             title: {
                        text: 'Expense' + year
                    },
                     plotOptions: {
            column: {
                dataLabels: {
                    enabled: true
                }
            }
        },
				    xAxis: {
				    	 title: {
                text: 'Month'
            },
				        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
				            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				    },
				     yAxis: {
				    	 title: {
                text: 'Expense(Rs.)'
            }
        },
 
				    series: [{
				    	 name: year+ 'Monthly Exp.',
				        data:b
				    }]
				});
});

}
$scope.chart_exp_year("2016");

 




						console.log("hello from controller");
											var fname1;
											
										 if ($.cookie("username") != null ) {

										 	fname1 =  $.cookie("username")  ;
										 	$("#lblData").text(fname1);

										 } 

											console.log(fname);
										//	var temp = $("#lblData").text();
										var fname = fname1.substr(0,fname1.indexOf(' '));

											//var xyz='Jaykumar Pastagia';
											$http.get('/home/emp_name').success(function(response){
		console.log("got employname...")
		console.log(response);
		$scope.employname=response;
	});
											

/*
$scope.myJson = {
 "graphset":[
        {
            "type":"bar",
            "title":{
                "text":"Data Pulled from MongoDB"
            },
            "scale-x":{
                "labels":["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"]
            },
            "series":[
                {
                    "values":[24,68,48,70,40,15,30,25,30,20,40,50]
                }
            ]
        }
    ]
}; */


											var refresh_report_list=	function(){
												$scope.reports="";
												$http.get('/home/reports',{params:{"namee":fname} }).success(function(response){
													console.log("i got data");
														
													var a=response;
													
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
												var table=		$("#tb2").DataTable(
														{
															"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
															"aaData": a,
														
    														"bAutoWidth": false,
    														//"order": [[ 1, 'asc' ]],
    														"order": [],
				 											"aoColumns": [
				 											{ "sTitle": "Sr No.","mData": "_id","sWidth": "10%",'orderable': false },
															{ "sTitle": "User Name","mData": 'UserName',"sWidth": "25%" },
															{ "sTitle": "Report Tittle","mData": 'ReportTittle',"sWidth": "25%" },
															{ "sTitle": "Start Date","mData": 'StartDate',"sWidth": "15%" },
															{ "sTitle": "End Date","mData": 'EndDate',"sWidth": "15%" },
															{ "sTitle": "Total","mData": "total","sWidth": "10%" }
															]

														});  
														table.on( ' search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
									});
												});

}




var refresh_exp_list= function(){
	$scope.exp="";
	$http.get('/home/exp',{params:{"namee":fname} }).success(function(response){
		console.log("i got data 2");
		$scope.exp=response;

		console.log(response);
	});
}

refresh_exp_list();
refresh_report_list();

								}); 




//var app2 = angular.module('addmodelApp', []);


				
									





