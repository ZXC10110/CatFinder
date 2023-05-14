import { supabase } from "../supabase"

/**
 * @swagger
* /api/adopt/createAdopt:
*    post:
*      tags:
*        - adopt
*      summary: create adopt for user
*      description: create adopt for user
*      operationId: createAdopt
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/AdoptCreateRequest'
*      responses:
*        '200':
*          description: Create Successful
*        '400':
*          description: Create Failed Due to Incorrect Input
* components:
*  schemas:
*    AdoptCreateRequest:
*      type: object
*      properties:
*        queue_id:
*          type: integer
*          example: 1
*        adopt_date:
*          type: string
*          format: date-time
*          example: '2022-12-23'
*/    

export default async function handler(req, res) {

  //call parameter from body
  const { queue_id, adopt_date } = req.body

  let createStatus

  //check already adopt
  const checkAdopt = await checkAlreadyAdopt(queue_id)
  if (!checkAdopt) {

    createStatus = false
    console.log("Already Create Adopt!")
    res.status(400).json(createStatus)
  } else {
    //check queue_id exist
    var queueID = await checkQueueId(queue_id)

    if (!queueID) {
      // if queue_id does not exist
      createStatus = false
      console.log("Queue ID not found!")
      res.status(400).json(createStatus)
    } else {
      var shelter_id = await getShelterID(queue_id)
      var user_id = await getUserID(queue_id)
      var cat_id = await getCatID(queue_id)
      await supabase.from('adopt').insert([{
        create_date: new Date(),
        update_date: new Date(),
        adopt_date: adopt_date,
        queue_id: queue_id,
        adopt_status: false,
        shelter_id: shelter_id,
        user_id: user_id,
        cat_id: cat_id,
      }])

      createStatus = true
      console.log("Queue ID not found!")
      res.status(200).json(createStatus)
    }
  }
}

//cehck already create adopt
async function checkAlreadyAdopt(queue_id, response) {
  const { data, error } = await supabase.from('adopt').select().eq('queue_id', queue_id)
  if (data == "" || data == null) {
    //no exist of adopt 
    response = true
  } else {
    response = false
  }
  return response
}

//check queue_id exist
async function checkQueueId(queue_id, response) {
  //query
  const { data, error } = await supabase.from('queue').select().eq('queue_id', queue_id)
  if ( data == "" || data == null) {
    //queue_id does not exist
    response = false
  } else {
    //queue_id exist
    response = true
  }

  //print result
  return response
}

function toString (req) {
  const jsonString = JSON.stringify(req)
  const toString = jsonString.split(':')[1].split('}]')[0].split('"')[1]
  return toString
}

//check already create adopt
async function getShelterID(queue_id, shelterID) {
  const { data, error } = await supabase.from('queue').select().eq('queue_id', queue_id)
  const query = data?.map(({ shelter_id }) => ({ shelter_id }))
  if (query == "" || query == null) {
    return null
  } 

  const json = JSON.stringify(query)
  shelterID = json.split(':')[1].split('}]')[0]
  console.log("shelter id : ", shelterID)
  return shelterID
}

//check already create adopt
async function getUserID(queue_id, userID) {
  const { data, error } = await supabase.from('queue').select().eq('queue_id', queue_id)
  const query = data?.map(({ user_id }) => ({ user_id }))
  if (query == "" || query == null) {
    return null
  } 

  const json = JSON.stringify(query)
  userID = json.split(':')[1].split('}]')[0]
  console.log("user id : ", userID)
  return userID
}

//check already create adopt
async function getCatID(queue_id, catID) {
  const { data, error } = await supabase.from('queue').select().eq('queue_id', queue_id)
  const query = data?.map(({ cat_id }) => ({ cat_id }))
  if (query == "" || query == null) {
    return null
  } 

  const json = JSON.stringify(query)
  catID = json.split(':')[1].split('}]')[0]
  console.log("cat id : ", catID)
  return catID
}