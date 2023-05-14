import { supabase } from "../supabase"

export default async function handler(req, res) {
    const { login_id } =  req.body
    const shelter_id = await getShelterID(login_id)
    //per day
    const perDay = await getdataPerDate(shelter_id)
    //per month 
    const perMonth = await getdataPerMonth(shelter_id)
    //per year
    const perYear = await getdataPerYear(shelter_id)

    const result = {
      perDay,
      perMonth,
      perYear
    }
    res.status(200).json(result)
}

//get data per date 
async function getdataPerDate( shelter_id, result ) {
  const date = new Date()
  const currentDate = getDate(date)

  const { data, count } = await supabase.from('adopt').select('adopt_id, cat_id, cat_profile(cat_name, breed, sex, create_date), user_id, user_profile(email), adopt_date,  shelter_id, shelter_profile(shelter_name)', { count: 'exact' }).eq('shelter_id', shelter_id).gte('adopt_date', currentDate).lte('adopt_date', currentDate)
  result = {
    data,
    count
  }
  console.log(currentDate)
  console.log("count : ", count)
  return result
}

//get data per month 
async function getdataPerMonth( shelter_id, result ) {
  const date = new Date()
  const currentDate = getDate(date)
  const currentMonth = getMonth(currentDate)
  const inCurrentMonth = getCurrentMonth(currentDate)
  
  //query data
  const { data, count } = await supabase.from('adopt').select('adopt_id, cat_id, cat_profile(cat_name, breed, sex, create_date), user_id, user_profile(email), adopt_date,  shelter_id, shelter_profile(shelter_name)', { count: 'exact'}).eq('shelter_id', shelter_id).gte( 'adopt_date', currentMonth).lte('adopt_date', inCurrentMonth)
  result = {
    data,
    count
  }

  const month = currentMonth.split('-')[1]
  console.log("month : ", month)
  console.log("count : ", count)
  console.log("data : ", data)
  return result
}


//get data per year
async function getdataPerYear(shelter_id, result) {
  const date = new Date()
  const currentYear = getYear(date)
  const inCurrentYear = getCurrentYear(date)

  //query data
  const { data, count } = await supabase.from('adopt').select('adopt_id, cat_id, cat_profile(cat_name, breed, sex, create_date), user_id, user_profile(email), adopt_date,  shelter_id, shelter_profile(shelter_name)', { count: 'exact' }).eq('shelter_id', shelter_id).gte('adopt_date', currentYear).lte('adopt_date', inCurrentYear)
  result = {
    data,
    count
  }

  const year = currentYear.split('-')[0]
  console.log("year : ", year)
  console.log("count : ", count)
  console.log("data : ", data)
  return result
}

//get adoptDate


//check shelter_id exist
async function getShelterID(login_id, shelter_id) {
    //query
    const { data } = await supabase.from('shelter_profile').select().eq('login_id', login_id)
    if ( data == "" || data == null) {
      //shelter_id does not exist
      shelter_id = null
    } else {
      const query = data?.map(({ shelter_id }) => ({ shelter_id }))
      const json = JSON.stringify(query)
      shelter_id = json.split(':')[1].split('}]')[0]
    }
    console.log("shelter id ", shelter_id)
    return shelter_id
  }
  
function getDate(date){
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-')
}

function getMonth(date){
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear()

  if (month.length < 2) 
      month = '0' + month;

  return [year, month, 1].join('-')
}

function getCurrentMonth(date){
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear()

  if (month.length < 2) 
      month = '0' + month;

  return [year, month, 31].join('-')
}


function getYear(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()
  
  if (day.length < 2)
    day = '0' + day;
  
  if (month.length < 2)
    month = '0' + month;
  
  if (year.length < 4)
    year = '0' + year;

  return [year, 1, 1].join('-')
}

function getCurrentYear(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()
  
  if (day.length < 2)
    day = '0' + day;
  
  if (month.length < 2)
    month = '0' + month;
  
  if (year.length < 4)
    year = '0' + year;

  return [year, 12, 31].join('-')
}