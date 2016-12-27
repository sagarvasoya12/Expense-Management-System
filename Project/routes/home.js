var express = require('express');
var router = express.Router();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongojs=require('mongojs');
var db=mongojs('Expensemanagement',['report']);
var db1=mongojs('Expensemanagement',['exp']);
var db2=mongojs('Expensemanagement',['voucher']);
var db3=mongojs('Expensemanagement',['employee']);
var db4=mongojs('Expensemanagement',['cash']);
var db5=mongojs('Expensemanagement',['counters']);
var util = require("util");
var fs = require('fs'); 

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload_images')
  },
  filename: function (req, file, cb) {

   // cb(null, file.originalname+ '-' + Date.now())
   var d=new Date();
   cb(null, file.originalname.split('.',1) + '-' +d.getHours()+ d.getMinutes() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})
var upload = multer({ storage: storage })


router.get('/', function(req, res, next) {
  res.render('home', { title1 : 'Dashboard' });
});

router.post("/upload", upload.single('file'), function(req, res, next){
  console.log("hello image");
  console.log(req.body);
  console.log (req.file);


  if (req.file) {
    console.log(util.inspect(req.file));
    if (req.file.size === 0) {
                return next(new Error("Hey, first would you select a file?"));
    }
    fs.exists(req.file.path, function(exists) {
      if(exists) {
        res.end("Got your file!");
        console.log("path:"+req.file.path);
        

      } else {
        res.end("Well, there is no magic for those who don’t believe in it!");
      }
    });
  } 
});



router.get('/reports',function(req,res){
    console.log("I receive a get request");
    if(req.query.namee != 'Jaykumar')
    {
    db.report.find({UserName:req.query.namee}).sort({"_id":-1},function(err,docs){
      console.log(docs);
      res.json(docs);

    });
    
    }
    else{
      db.report.find().sort({"_id":-1},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }

  });

router.get('/emp_name',function(req,res){

  db3.employee.find(function(err,docs){
    res.json(docs);
  });

});

router.get('/user_report',function(req,res){
    console.log("I receive a get reportname");
   
    db.report.find({UserName:req.query.namee},function(err,docs){
      console.log(docs);
      res.json(docs);

    });

  });

  router.get('/reportamount',function(req,res){
  //  console.log("I receive a get request");
  
    db.report.find({ReportTittle:req.query.reportname},function(err,docs){
      console.log(docs);
      res.json(docs);

    });
  });


  router.get('/report_total',function(req,res){
      console.log("successful aggregate req");
    db1.exp.aggregate([{$match:{"status":"Approved"}}, {$group: { "_id": "$Report_id", "count": { $sum: "$Amount" } } }],function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        res.json(result);

  });
  });
  router.get('/addamount',function(req,res){
    console.log("I receive a get request5");
    console.log(req.query.reportname);
  console.log(req.query.totalexp);  
    db.report.update({ReportTittle:req.query.reportname},{$set: { total:req.query.totalexp}},function(err,updated){
      if(err || !updated)
      console.log("User not updated");
    else
      console.log("user updated5");
    

    });
  });

  router.post('/addreport',function(req,res){
    console.log(req.body);
    db.report.insert(req.body,function(err,docs){
      res.json(docs);
    })
  });





  router.get('/exp',function(req,res){
    console.log("I receive a get request 2");
    
    if(req.query.namee != 'Jaykumar')
    {
    db1.exp.find({Username:req.query.namee}).sort({"_id":-1},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find().sort({"_id":-1},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
  });



router.get('/chart_month_total',function(req,res){
  db1.exp.aggregate([{$group:{"_id":{$substr:["$Date",0,7]},"count":{$sum:"$Amount"}}}],function(err,docs){
console.log("chart");
console.log(docs);
res.json(docs);
});
});



router.get('/edt_exp',function(req,res){
  var id=req.query.e_id;
  console.log(id);
  console.log("hello");
  db1.exp.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
    console.log(docs);
    res.json(docs);
  });
});

router.put('/updt/:id',function(req,res){
  var id=req.params.id;
  console.log(req.body.Username);
  db1.exp.findAndModify({query:{_id:mongojs.ObjectId(id)},
update: {$set:{Username:req.body.Username,Report:req.body.Report,status:req.body.status,Payment:req.body.Payment,Amount:req.body.Amount,Category:req.body.Category,Date:req.body.Date,Report_id:req.body.Report_id,img_path:req.body.img_path,no_of_person:req.body.no_of_person}},  
  new:true },function(err,docs){
  res.json(docs);
});
});


  /*
 router.get('/exp_sortby_cat',function(req,res){
    console.log("I receive a get request 2");
    
    if(req.query.namee != 'Jaykumar')
    {
    db1.exp.find({Username:req.query.namee}).sort({"Category":1},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find().sort({"Category":1},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
  });

 router.get('/exp_sortby_employee',function(req,res){
    console.log("I receive a get request 2");
    
    if(req.query.namee != 'Jaykumar')
    {
    db1.exp.find({Username:req.query.namee}).sort({"Username":1},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find().sort({"Username":1},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
  });

 router.get('/exp_sortby_report',function(req,res){
    
    if(req.query.namee != 'Jaykumar')
    {
    db1.exp.find({Username:req.query.namee}).sort({"Report":1},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find().sort({"Report":1},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
  });

 router.get('/exp_sortby_status',function(req,res){
    
    if(req.query.namee != 'Jaykumar')
    {
    db1.exp.find({Username:req.query.namee}).sort({"status":1},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find().sort({"status":1},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
  });

router.get('/exp_sortby_rupees',function(req,res){
    
    if(req.query.namee != 'Jaykumar')
    {
    db1.exp.find({Username:req.query.namee}).sort({"Amount":1},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find().sort({"Amount":1},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
  });
*/
  router.post('/addexp',function(req,res){
    
    console.log(req.body);
    db1.exp.insert(req.body);
   
  });

  router.get('/report_date',function(req,res){
    console.log("hello how r u ??");
     var id=req.query.namee;
     console.log(req.params.namee);
    db.report.find({_id:mongojs.ObjectId(id)},function(err,docs){
   // db.report.find({ReportTittle:id},function(err,docs){
      console.log("i m fine...and u ??");
    console.log(docs);
    res.json(docs);
  });
  });



  router.delete('/exp/:id',function(req,res){
    var id=req.params.id;
   // db1.exp.remove({_id:mongojs.ObjectId(id)});
     db1.exp.findAndModify({query:{_id:mongojs.ObjectId(id)},
update: {$set:{is_deleted:"1"}} },function(err,docs){
  res.json(docs);
});
    console.log(id);
  });

 router.get('/approve_exp',function(req,res){
    
    console.log(req.query.id);
  
    db1.exp.update({_id:mongojs.ObjectId(req.query.id)},{$set: { status:"Approved"}},function(err,updated){
      if(err || !updated)
      console.log("User not updated");
    else
      console.log("user updated5");
    

    });
  });

 router.get('/reject_exp',function(req,res){
    
    console.log(req.query.id);
  
    db1.exp.update({_id:mongojs.ObjectId(req.query.id)},{$set: { status:"Rejected"}},function(err,updated){
      if(err || !updated)
      console.log("User not updated");
    else
      console.log("user updated5");
    

    });
  });



router.post('/addvoucher',function(req,res){

  console.log(req.body.Username);
 
function getNextSequence(name) {
  console.log("enter");
  db5.counters.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
          },
           function(err,ret) {
     // work here
                console.log("before return");
                req.body.srno= ret.seq;
    console.log("get4");
    console.log(req.body.srno);
    console.log(req.body);
    db2.voucher.insert(req.body,function(err,docs){
      res.json(docs);
                 console.log(ret.seq);
                 return ret.seq;

          }
   );

 

})
    }
    getNextSequence("userid");
  });

router.get('/voucher',function(req,res){
    console.log("voucherctrl");
    if(req.query.namee != 'Jaykumar')
    {
    db2.voucher.find({Username:req.query.namee}).sort({"_id":-1},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db2.voucher.find().sort({"_id":-1},function(err,docs){
        console.log("hello");
      console.log(docs);
      res.json(docs);
      });
    }
  });

router.get('/logout_page', function(req, res) 
{
    console.log("logging out ......");
    req.session.distory();
    req.logout();
    res.redirect('/index.ejs');
    res.send(200);
});

router.get('/find_mon',function(req,res){
  console.log("month");
 var month=req.query.month;
  var m="-"+month+"-";
    console.log(req.query.month);
    //console.log(m);
    if(req.query.namee != 'All')
    {
    db1.exp.find({$and:[{"Date":{$regex:m}},{"Username":req.query.namee}]},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find({"Date":{$regex:m}},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
  });


router.get('/find_mon_year',function(req,res){
  console.log("year");
 // month=req.query.mon;
  //var m="-"+month+"-";
  console.log(req.query.month);
    console.log(req.query.year);
 var mon_year=req.query.year+"-"+req.query.month;
  console.log(mon_year);
    //console.log(m);
    if(req.query.namee != 'All')
    {
    db1.exp.find({$and:[{"Date":{$regex:mon_year}},{"Username":req.query.namee}]},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find({"Date":{$regex:mon_year}},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
  });


router.get('/find_year',function(req,res){
  console.log("year");
 // month=req.query.mon;
  //var m="-"+month+"-";

    console.log(req.query.year);
// var mon_year=req.query.year+"-"+req.query.month;
    //console.log(m);
    if(req.query.namee != 'All')
    {
    db1.exp.find({$and:[{"Date":{$regex:req.query.year}},{"Username":req.query.namee}]},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find({"Date":{$regex:req.query.year}},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
  });
 
 router.get('/two_date',function(req,res){

if(req.query.namee != 'All')
    {
  db1.exp.find({$and:[{Date:{$gte:(req.query.s_date),$lt:(req.query.e_date)}},{"Username":req.query.namee}]},function(err,docs){
    console.log(docs);
    res.json(docs);
  });
}else{
   db1.exp.find({Date:{$gte:(req.query.s_date),$lt:(req.query.e_date)}},function(err,docs){
    console.log(docs);
    res.json(docs);
  });
}
 });

 router.get('/exp_status_total',function(req,res){
      
    
       if(req.query.namee != 'All')
    {
    db1.exp.aggregate([{$match:{"Username":req.query.namee}}, {$group: { "_id": null, "count": { $sum: "$Amount" } } }],function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
      
        res.json(result);

  });
  }else{
     db1.exp.aggregate([{$group: { "_id": null,  "count": { $sum: "$Amount" }} }],function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
      
        console.log(result);
        res.json(result);

  });

  }
});




router.get('/exp_status',function(req,res){
      console.log("successful aggregate req");
      if(req.query.namee != 'All')
    {
    db1.exp.aggregate([{$match:{"Username":req.query.namee}}, {$group: { "_id": "$status", "count": { $sum: "$Amount" } } }],function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("exp approve status: "+result);
        res.json(result);

  });
  }else{
     db1.exp.aggregate([{$group: { "_id": "$status",  "count": { $sum: "$Amount" }} }],function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("exp approve status: ");
        console.log(result);
        res.json(result);

  });

  }
  });

router.get('/analysis_Category_month_year',function(req,res){
  console.log("month");
 var month=req.query.month;
 var mon_year=req.query.year+"-"+req.query.month;
 // var m="-"+month+"-";
    console.log(req.query.month);
    //console.log(m);
    
    if(req.query.namee != 'All')
    {
    db1.exp.find({$and:[{"Date":{$regex:mon_year}},{"Username":req.query.namee},{"Category":req.query.Category}]},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find({$and:[{"Date":{$regex:mon_year}},{"Category":req.query.Category}]},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
    
  });

router.get('/analysis_Category_year',function(req,res){
   console.log(req.query.year);
// var mon_year=req.query.year+"-"+req.query.month;
    //console.log(m);
    if(req.query.namee != 'All')
    {
    db1.exp.find({$and:[{"Date":{$regex:req.query.year}},{"Username":req.query.namee},{"Category":req.query.Category}]},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find({$and:[{"Date":{$regex:req.query.year}},{"Category":req.query.Category}]},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
    
  });

router.get('/analysis_Category_month',function(req,res){
  console.log("month");
 var month=req.query.month;
  var m="-"+month+"-";
    console.log(req.query.month);
    console.log(m);
    console.log(req.query.namee);
    console.log(req.query.Category);
    if(req.query.namee != 'All')
    {
    db1.exp.find({$and:[{"Date":{$regex:m}},{"Username":req.query.namee},{"Category":req.query.Category}]},function(err,docs){
      console.log(docs);
      res.json(docs);
    });
    }
    else{
      db1.exp.find({$and:[{"Date":{$regex:m}},{"Category":req.query.Category}]},function(err,docs){
      console.log(docs);
      res.json(docs);
      });
    }
  });





router.post('/cashflow',function(req,res){
    console.log(req.body);
    db4.cash.insert(req.body,function(err,docs){
      res.json(docs);
    });
  });

router.get('/cash_avail',function(req,res){
  db4.cash.aggregate([{$group: { "_id": null,  "count": { $sum: "$amt" }} }],function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
      
        console.log(result);
        res.json(result);

  });
});

router.get('/cashflow',function(req,res){
  db4.cash.find(function(err,docs){
    res.json(docs);
  });
});

module.exports = router;



