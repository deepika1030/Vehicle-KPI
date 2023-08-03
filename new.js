import { log } from "console";
import csvToJson from "csvtojson"; 
import fs from 'fs'
import { CLIENT_RENEG_LIMIT } from "tls";


async function find() {
  let m = await csvToJson().fromFile("./DatasetNew.csv");

  //1.Coping the uniqueid column to array
  let uq=[];
  m.filter(item=>{
    uq.push(item['uniqueid'])
})
  //2. accesing only unique id of each vehicle
uq=[...new Set(uq)]
let total_veh=uq.length
console.log("total vechicle",total_veh)

//initializing array and count value
let speed=[];
let count=0;

for(let i=0;i<m.length;i++){
    if(m[i]['speed']>60){
        speed.push(m[i])
        count++
    }
}

//printing the list of vehicles who has crossed speed limit 60 ,with the vechicle unique id
console.log("Number of vechicles above-60:",count)

//printing the list of vehicles which have not crossed speed limit 60 ,with the vechicle unique id
let below60= total_veh- count
console.log("numb of vechicle below-60:",below60)

let arr={};

// logic to calculate percentage of vehicels crossed speed limit 60
 var c=(speed.length/uq.length)*100
  // console.log(Math.floor(c))
  // d.push(c)
  
  var a=100-c;
  // console.log(Math.ceil(a))
  // d.push(a)
  let d=[
  {
    'Name':'Speed Above 60',
    'value':Math.floor(c),
    'number':157
  },
  {
    'Name':'Speed Below 60',
    'value':Math.ceil(a),
    'number':813
  }
];

console.log(d)
  console.log("Writing File")
  fs.writeFile('speed_limit.json', JSON.stringify(d), 'utf8', function(err){
    if(err){
      console.log("Writing Failed")
    }
  })

  // arr["Name"]:'Above',

  // console.log(speed)
}
find();