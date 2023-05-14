import { supabase } from "../../supabase"

export default async function handler(req, res) {

  const {
    cat_name, login_id, sex, age_unit,
    breed, color, sterile, vaccine, congenital_disease,
    detail, cat_picture, status, age
  } = req.body

  var shelter_id = await getShelterID(login_id)

  //check shelter id
  var shelterID = await checkShelterId(shelter_id)
  if (!shelterID) {
    console.log("Shelter ID not found!")
    res.status(200).json("Shelter ID not found!")
  } else {
    console.log("Shelter ID Found!")
    const { er } = await supabase.from('cat_profile')
      .insert([{
        shelter_id: shelter_id,
        cat_name: cat_name,
        create_date: new Date(),
        update_date: new Date(),
        sex: sex,
        breed: breed,
        color: color,
        sterile: sterile,
        vaccine: vaccine,
        detail: detail,
        cat_picture: cat_picture,
        status: status,
        age: age,
        age_unit: age_unit,
        congenital_disease: congenital_disease

      }])

    //print data
    res.status(200).json("Insert Cat Success!")

  }

}

//check user_id exist
async function checkShelterId(shelter_id, response) {
  //query
  const { data, error } = await supabase.from('shelter_profile').select().eq('shelter_id', shelter_id)
  if (data == "") {
    //user_id does not exist
    response = false
  } else {
    //user_id exist
    response = true
  }

  //print result
  console.log(data)
  return response
}

//check ShelterID
async function getShelterID(login_id, shelter_id) {
  //query
  const { data } = await supabase.from('shelter_profile').select().eq('login_id', login_id)
  console.log(data)
  if (data == "" || data == null) {
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
