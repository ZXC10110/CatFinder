import { supabase } from "../supabase"

export default async function handler(req, res) {

  //call parameter from body
  const { adopt_id, login_id } = req.body
  
  var query = supabase.from('adopt').select()

  //check role
  var user_id = await getUserId(login_id)
  var shelter_id = await getShelterID(login_id)

  //role = shelter
  if (shelter_id != null) {
    if (adopt_id == null && login_id != null) {
      //get all
      query = query.eq('shelter_id', shelter_id)
    } else if (adopt_id != null && login_id != null) {
      //get one
      query = query.eq('shelter_id', shelter_id).eq('adopt_id', adopt_id)
    } else {
      res.status(400).json("Data Not Found")
    }
  } 
  
  //role = user
  if (user_id != null) {
    if (adopt_id == null && login_id != null) {
      //get all
      query = query.eq('user_id', user_id)
    } else if (adopt_id != null && login_id != null) {
      //get one
      query = query.eq('user_id', user_id).eq('adopt_id', adopt_id)
    } else {
      res.status(400).json("Data Not Found")
    }
  }

  //print data
  const { data } = await query
  if (data == "") {
    res.status(400).json("Data Not Found")
  }
  res.status(200).json(data)
}
  
//check user_id exist
async function getUserId(login_id, user_id) {
  //query
  const { data } = await supabase.from('user_profile').select().eq('login_id', login_id)
  console.log(data)
  if ( data == "" || data == null) {
    //user_id does not exist
    user_id = null
  } else {
    const query = data?.map(({ user_id }) => ({ user_id }))
    const json = JSON.stringify(query)
    user_id = json.split(':')[1].split('}]')[0]
  }
  console.log("user id ", user_id)
  return user_id
}

//check shelter_id exist
async function getShelterID(login_id, shelter_id) {
  //query
  const { data } = await supabase.from('shelter_profile').select().eq('login_id', login_id)
  console.log(data)
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



