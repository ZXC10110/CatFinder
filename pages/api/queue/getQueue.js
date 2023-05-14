import { supabase } from "../supabase"

/**
 * @swagger
* /api/queue/getQueue:
*    post:
*      tags:
*        - queue
*      summary: get queue for both user shelter
*      description: get queue for both user shelter
*      operationId: getQueue
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/QueueGetRequest'
*      responses:
*        '200':
*          description: Get Successful
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/QueueGetResponse'
*        '400':
*          description: Get Failed Due to Incorrect Input
* components:
*  schemas:
*    QueueGetRequest:
*      type: object
*      properties:
*        queue_id:
*          type: integer
*          example: 1
*        login_id:
*          type: string
*          example: "0fb8be3d-e566-4c87-8f1b-553d6dcf2ca3"
*    QueueGetResponse:
*      type: object
*      properties:
*        queue_id:
*          type: integer
*          example: 0
*        cat_id:
*          type: integer
*          example: 0
*        user_id:
*          type: integer
*          example: 0
*        shelter_id:
*          type: integer
*          example: 0
*        queue_date:
*          type: string
*          format: date-time
*          example: '2022-12-23'
*        queue_time:
*          type: string
*          example: 09.00-10.00
*        create_date:
*          type: string
*          format: date-time
*          example: '2022-12-07 19:00:30.540431+00'
*        update_date:
*          type: string
*          format: date-time
*          example: '2022-12-07 19:00:30.540431+00'
*        queue_status:
*          type: boolean
*          example: true
 */

export default async function handler(req, res) {

  //call parameter from body
  const { queue_id, login_id } = req.body
  
  var query = supabase.from('queue').select()

  //check role
  var user_id = await getUserId(login_id)
  var shelter_id = await getShelterID(login_id)

  //role = shelter
  if (shelter_id != null) {
    if (queue_id == null && login_id != null) {
      //get all
      query = query.eq('shelter_id', shelter_id)
    } else if (queue_id != null && login_id != null) {
      //get one
      query = query.eq('shelter_id', shelter_id).eq('queue_id', queue_id)
    } else {
      res.status(400).json("Data Not Found")
    }
  } 
  
  //role = user
  if (user_id != null) {
    if (queue_id == null && login_id != null) {
      //get all
      query = query.eq('user_id', user_id)
    } else if (queue_id != null && login_id != null) {
      //get one
      query = query.eq('user_id', user_id).eq('queue_id', queue_id)
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



