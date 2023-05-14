import { supabase } from "../supabase"

/**
 * @swagger
* /api/shelter/getShelter:
*    post:
*      tags:
*        - shelter
*      summary: get shelter for both user shelter
*      description: get shelter for both user shelter
*      operationId: getShelter
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/ShelterGetRequest'
*      responses:
*        '200':
*          description: Get Successful
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ShelterGetResponse'
*        '400':
*          description: Get Failed Due to Incorrect Input
* components:
*  schemas:
*    ShelterGetRequest:
*      type: object
*      properties:
*        login_id:
*          type: string
*          example: "fadadb65-080e-4be8-a3dc-163df80e0918"
*    ShelterGetResponse:
*      type: object
*      properties:
*        adopt_id:
*          type: integer
*          example: 0
*        queue_id:
*          type: integer
*          example: 0
*        cat_id:
*          type: integer
*          example: 0
*        shelter_id:
*          type: integer
*          example: 0
*        user_id:
*          type: integer
*          example: 0
*        create_date:
*          type: string
*          format: date-time
*          example: '2022-12-07 19:00:30.540431+00'
*        update_date:
*          type: string
*          format: date-time
*          example: '2022-12-07 19:00:30.540431+00'
*        adopt_date:
*          type: string
*          format: date-time
*          example: '2022-12-23'
*        adopt_status:
*          type: boolean
*          example: true
*/

export default async function handler(req, res) {

  //call parameter from body
  const { login_id } = req.body

  var shelter_id = await getShelterID(login_id)

  //check shelter_id exist 
  var shelter = await checkShelterId(shelter_id)
  if (shelter) {
    //query
    const { data } = await supabase.from('shelter_profile').select()
    .eq('shelter_id', shelter_id)
    console.log("SELECT SHELTER SUCESS")
    res.status(200).json(data)
  } else {
    res.status(400).json("Shelter ID Not Found")
  }
}
  
//check shelter_id exist
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
  console.log("Shelter Found")
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
