import { supabase } from "../supabase"

//delete for user
export default async function handler(req, res) {

  //call parameter from body
  const { adopt_id, login_id } = req.body

  let deleteStatus

  //check userID exist 
  var userID = await checkUserId(login_id)
  if (!userID) {

    deleteStatus = false
    console.log("User ID Not Found!")
    res.status(400).json(deleteStatus)
  } else {
    //check if queue id exist 
    var adoptID = await checkAdoptId(adopt_id)
    if (!adoptID) {

      deleteStatus = false
      console.log("Adopt ID Not Found!")
      res.status(400).json(deleteStatus)
    } else {
      console.log(login_id)
      var user_id = await getUserId(login_id)
      //delete
      await supabase.from('adopt').delete().eq('adopt_id', adopt_id).eq('user_id', user_id)
      const { data } = await supabase.from('adopt').select().eq('adopt_id', adopt_id).eq('user_id', user_id)
      //checl exist
      if (data != "" && data != null) {

        deleteStatus = false
        console.log("Adopt ID Not Found!")
        res.status(400).json(deleteStatus)
      }

      deleteStatus = true
      console.log("Delete Adopt Success!")
      res.status(200).json(deleteStatus)
    }
  }
}

//check user_id exist
async function checkUserId(login_id, response) {
  //query
  const { data, error } = await supabase.from('user_profile').select().eq('login_id', login_id)
  if ( data == "" || data == null ) {
    //user_id does not exist
    response = false
  } else {
    response = true
  }

  return response
}


//check queue_id exist
async function checkAdoptId(adopt_id, response) {
  //query
  const { data, error } = await supabase.from('adopt').select().eq('adopt_id', adopt_id)
  if ( data == "" || data == null ) {
    //queue_id does not exist
    response = false
  } else {
    //queue_id exist
    response = true
  }

  //print result
  return response
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