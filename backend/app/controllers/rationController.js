import Responder from '../../lib/expressResponder';
import Ration from '../models/ration';
import async from 'async';
import _ from 'lodash';
import validator from 'validator';


export default class RationController { 

  // Add Ration detail to db 
  static addRation(req,res){
        var data = req.body
        console.log(data)
        if(!data.pack_id){
            return  Responder.success(res,{msg: "Please enter Pack id. Ex. F1,W1"})
          }
      
          if(data.type == 'Water' && !data.qty_ltr){
            return  Responder.success(res,{data : {} , msg: "Please enter water quantity in liters."})
          }
          if(data.type){
              if(data.type != 'Water' && data.type != 'Food')
            return  Responder.success(res,{data : {} , msg: "Selected Packet type is not valid."})
          }
          if(data.type === 'Food'){
  
            if(!data.packet_content){
              return  Responder.success(res,{data : {} , msg: "Please enter Packet content."})
            }
            if(!data.type){
              return  Responder.success(res,{data : {} , msg: "Please select Packet type."})
            }
            if(!data.calories){
              return  Responder.success(res,{data : {} , msg: "Please enter calories."})
            }
            if(!data.packet_exp_date){
              return  Responder.success(res,{data : {} , msg: "Please select expiry date."})
            }
          }
        Ration.create(data)
        .then((resp) =>{
            if(resp != null && resp != undefined){
                Responder.success(res,{data : resp , msg: "Ration is added successfully."})
            }else{
              Responder.success(res,{data : {} , msg: "Ration is  not added to db."})
            }
        })
    }

 // Get all Ration detail
  static getAllRation(req,res){
      Ration.find({})
      .then((allRation) =>{
          if(allRation != null && allRation != undefined){
            Responder.success(res,{data : allRation})
          }else{
            Responder.success(res,{data : [] , msg: "Ration is Not found."})
          }
      })
  }

// Delete Ration 
  static deleteRation(req,res){

    if(!req.params.id)
     return  Responder.success(res,{data : {} , msg: "Please provide ration id."})
     
    Ration.deleteOne({_id : req.params.id})
    .then((resp) =>{
      Responder.success(res,{msg: "Ration successfully deleted."})
    })
    .catch((err) =>{
      Responder.operationFailed(res,err);
    })
}

 // Get Ration schedule date
 static scheduledRation(req,res){
   
  if(!req.params.date)
   return  Responder.success(res,{data : {} , msg: "Please provide date."})
  let foodPackets;
  let waterPackets;
  let schedule = [];
  var temp = 0;
  var date  = req.params.date;
  console.log("--------------",new Date(date))
  let scheduledArr =[];
  async.series({
    foodPackets: function(callback){
      Ration.find({ packet_exp_date :{$gte : new Date(date)}}).sort({packet_exp_date : 1,calories :-1}).select({qty_ltr : 0 ,__v :0})
      .then((resp) =>{
        foodPackets =  resp;
        callback(null,resp)
      })
      .catch((err) =>{
        callback(err,null)
      })
    },
    waterPackets: function(callback){
      Ration.find({$and :[{type : "Water"}]}).sort({qty_ltr :-1}).select({qty_ltr : 1 , pack_id :1,type : 1})
      .then((resp) =>{
        waterPackets = resp;
        callback(null,resp)
      })
      .catch((err) =>{
       // callback(err,null)
      })
    },
    scheduleForFoodPackete: function(callback){
      if(foodPackets.length < 1){
        callback();
      }
      foodPackets.forEach((element,index) => {
     //   console.log("element",element)
        if(element != null){
          if(element.calories >= 2500){
            let date = new Date(req.params.date);
            date.setDate(date.getDate() + (schedule.length + 1));
            var main_obj= {
              id : (schedule.length + 1),
              date :date, 
              packets : [element],
              is_done : true
            }
            schedule.push(main_obj);
            foodPackets[index] = null
            console.log("schedul1111===========================")
          }else{
            if(schedule.length > 0){
              schedule.forEach((value1,index2) =>{
                //console.log(value1)
                var total_cal = _.sumBy(value1.packets, function(o) { return o.calories; });
                console.log(total_cal)
                if(!value1.is_done){
                  console.log("schedule.length > 0",total_cal < 2500)
                  let tempc = total_cal + element.calories;
                  if(tempc >=2500){
                  schedule[index2].is_done = true;                
                  }
                  schedule[index2].packets.push(element);
                  foodPackets[index] = null
                }else{
          
                }
              })
              if( foodPackets[index] != null){
                let date = new Date(req.params.date);
                date.setDate(date.getDate() + (schedule.length + 1));
                var main_obj= {
                  id : (schedule.length + 1),
                  date :date, 
                  packets : [element],
                  is_done : false
                }
                schedule.push(main_obj);
                foodPackets[index] = null
                console.log("schedule222===========================")
              }
              

            }else{
              let date = new Date(req.params.date);
              date.setDate(date.getDate() + (schedule.length + 1));
              var main_obj= {
                id : (schedule.length + 1),
                date :date, 
                packets : [element],
                is_done : false
              }
              schedule.push(main_obj);
              console.log("schedule===========================")
              foodPackets[index] = null
            }
      
            //schedule.push(main_obj);
            //foodPackets[index] = null
          }
          
        }
        
        
        if(foodPackets.length == index + 1){
          callback();
        }
      
      });

    },
    scheduleForWaterPackete : function(callback){
      if(schedule.length < 1 || waterPackets.length < 1){
        callback();
      }
      schedule.forEach((sch,schIndex) =>{
        if(sch.is_done){
          waterPackets.forEach((w1, index2) =>{
            // var total_water = 0
            if(w1 != null){
             var total_water = _.sumBy(sch.packets, function(val) {return val.qty_ltr?val.qty_ltr:0;});
            // console.log("total_water",total_water)  
             if(total_water < 2){
               if(w1.qty_ltr > 1 || total_water > 1){
                 schedule[schIndex].is_done = true;
               }else{
                 schedule[schIndex].is_done = false;
               }
               schedule[schIndex].packets.push(w1);
               waterPackets[index2] = null;
              // console.log("total_water", schedule)  
              if(sch.is_done){
                scheduledArr.push(schedule[schIndex])
              }
             }
            }
          
       
           })
          
          }
      
        if(schedule.length == schIndex + 1){
          callback();
        }
      })
    }

},
function(err, results) {

  if(err){
    Responder.operationFailed(res ,err)
  }
  if(results){
    Responder.success(res, scheduledArr)
  }




});

}
}



