import { supabase } from "../supabase"

/**
 * @swagger
* /api/adopt/editAdopt:
*    post:
*      tags:
*        - adopt
*      summary: edit adopt for shelter
*      description: edit adopt for shelter
*      operationId: editAdopt
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/AdoptEditRequest'
*      responses:
*        '200':
*          description: Edit Successful
*        '400':
*          description: Edit Failed Due to Incorrect Input
* components:
*  schemas:
*    AdoptEditRequest:
*      type: object
*      properties:
*        adopt_id:
*          type: integer
*          example: 0
*        login_id:
*          type: string
*          example: "fadadb65-080e-4be8-a3dc-163df80e0918"
*        queue_status:
*          type: boolean
*          example: true
*/    

//edit for shelter
export default async function handler(req, res) {

  //call parameter from body
  const { adopt_id, adopt_status, login_id } = req.body
  console.log(adopt_id)
  console.log(adopt_status)
  console.log(login_id)

  let editStatus

  var shelter_id = await getShelterID(login_id)
  console.log("shelter id : ", shelter_id)

  var adoptID = await checkAdoptId(adopt_id)
  if (adoptID) {
    //update adopt
    var own = await checkAdoptOwner(adopt_id, shelter_id)
    if (own) {
      //update adopt
      await supabase.from('adopt').update([{
        update_date: new Date(),
        adopt_status: adopt_status
      }]).eq('adopt_id', adopt_id)

      //update cat 
      const { data } = await supabase.from('adopt').select().eq('adopt_id', adopt_id)
      const queryCat = data?.map(({ cat_id }) => ({ cat_id }))
      const stringCat = JSON.stringify(queryCat)
      const cat_id = stringCat.split(':')[1].split('}]')[0]
      console.log("cat id ", cat_id)
      //update 
      await supabase.from('cat_profile').update([{
        status: false,
        update_date: new Date(),
      }]).eq('cat_id', cat_id)

      editStatus = true
      console.log("Edit Successful!")
      res.status(200).json(editStatus)
    } else {
      //shelter id != shelter id in adopt
      editStatus = false
      console.log("This ShelterID Does Not Have Permission!")
      res.status(400).json(editStatus)
    }
  } else {
    //queue_id does not exist
    editStatus = false
    console.log("Adopt ID not found!")
    res.status(400).json(editStatus)
  }
}

//check queue_id exist
async function checkAdoptId(adopt_id, response) {
  //query
  const { data, error } = await supabase.from('adopt').select().eq('adopt_id', adopt_id)
  if ( data == "" ) {
    //queue_id does not exist
    response = false
  } else {
    //queue_id exist
    response = true
  }

  //print result
  return response
}

//check queue_id exist
async function checkAdoptOwner(adopt_id, shelter_id , response) {
  //query
  console.log(adopt_id)
  console.log(shelter_id)
  const { data, error } = await supabase.from('adopt').select().eq('adopt_id', adopt_id).eq('shelter_id', shelter_id)
  console.log(data)
  if ( data == "" || data == null) {
    //shelter_id not own this adopt id
    response = false
  } else {
   //shelter_id own this adopt id
    response = true
  }

  //print result
  return response
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
 
 
  