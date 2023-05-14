import { supabase } from "../supabase"

/**
 * @swagger
* /api/queue/deleteQueue:
*    post:
*      tags:
*        - queue
*      summary: delete queue for user
*      description: delete queue for user
*      operationId: deleteQueue
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/QueueDeleteRequest'
*      responses:
*        '200':
*          description: Delete Successful
*        '400':
*          description: Delete Failed Due to Incorrect Input
* components:
*  schemas:
*    QueueDeleteRequest:
*      type: object
*      properties:
*        queue_id:
*          type: integer
*          example: 1
*        login_id:
*          type: string
*          example: "0fb8be3d-e566-4c87-8f1b-553d6dcf2ca3"
 */

//delete for user
export default async function handler(req, res) {

  //call parameter from body
  const { queue_id, login_id } = req.body

  let deleteStatus 

  //check userID exist 
  var userID = await checkUserId(login_id)
  if (!userID) {
    deleteStatus = false
    console.log("User ID Not Found!")
    res.status(400).json(deleteStatus)

  } else {
    //check if queue id exist 
    var queueID = await checkQueueId(queue_id)
    if (!queueID) {
      deleteStatus = false
      console.log("ID Not Found!")
      res.status(400).json("Queue ID Not Found!")

    } else {
      console.log(login_id)
      var user_id = await getUserId(login_id)
      //delete
      await supabase.from('queue').delete().eq('queue_id', queue_id).eq('user_id', user_id)
      const { data } = await supabase.from('queue').select().eq('queue_id', queue_id).eq('user_id', user_id)

      //checl exist
      if (data != "" && data != null) {
        res.status(400).json("Delete Queue Failed!")
      }

      deleteStatus = true
      console.log("Delete Queue Success!")
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
async function checkQueueId(queue_id, response) {
  //query
  const { data, error } = await supabase.from('queue').select().eq('queue_id', queue_id)
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