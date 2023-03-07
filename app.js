const express=require('express')
const app=new express()

const fs = require('fs');

const FILE_PATH = './db.json';

// Read the JSON file and parse the data into an object
function readDataFromFile() {
  const data = fs.readFileSync(FILE_PATH, 'utf8');
  return JSON.parse(data);
}

// Write the updated data object to the JSON file
function writeDataToFile(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data));
}

// Create a new hospital object and add it to the data
function createHospital(name, patientCount, location) {
  const data = readDataFromFile();
  const lastHospital = data.hospitals[data.hospitals.length - 1];
  const newHospital = {
    id: lastHospital.id + 1,
    name,
    patient_count: patientCount,
    location,
  };
  data.hospitals.push(newHospital);
  writeDataToFile(data);
  return newHospital;
}


// Get a hospital object by ID
function getHospitalById(id) {
  const data = readDataFromFile();
  return data.hospitals.find((hospital) => hospital.id === id);
}

// Update a hospital object by ID
function updateHospitalById(id, updateFields) {
  const data = readDataFromFile();
  const index = data.hospitals.findIndex((hospital) => hospital.id === id);
  if (index === -1) {
    return null;
  }
  data.hospitals[index] = { ...data.hospitals[index], ...updateFields };
  writeDataToFile(data);
  return data.hospitals[index];
}

// Delete a hospital object by ID
function deleteHospitalById(id) {
  const data = readDataFromFile();
  const index = data.hospitals.findIndex((hospital) => hospital.id === id);
  if (index === -1) {
    return null;
  }
  const deletedHospital = data.hospitals.splice(index, 1)[0];
  writeDataToFile(data);
  return deletedHospital;
}


// const newHospital = createHospital('New Hospital', 100, { city: 'AmericaJun',district:"kozhikod", country: 'india' });
// console.log('New hospital:', newHospital);
// const updatedHospital = updateHospitalById(2, { patient_count: 80 });

//..........get request
// console.log(getHospitalById(2))

//...........update
// console.log(updateHospitalById(2,{patient_count:100}))

//...........del
// console.log(deleteHospitalById(7))


//.......................// router

app.get('/',(req,res)=>{
  res.json(readDataFromFile())
})

app.listen(3000,()=>{
    console.log(`this server is working`)
})