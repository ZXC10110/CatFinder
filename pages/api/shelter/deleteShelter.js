import { supabase } from "../supabase"

/**
 * @swagger
* /api/shelter/deleteShelter:
*    post:
*      tags:
*        - shelter
*      summary: delete shelter for user
*      description: delete shelter for user
*      operationId: deleteShelter
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/ShelterDeleteRequest'
*      responses:
*        '200':
*          description: Delete Successful
*        '400':
*          description: Delete Failed Due to Incorrect Input
* components:
*  schemas:
*    ShelterDeleteRequest:
*      type: object
*      properties:
*        login_id:
*          type: string
*          example: "fadadb65-080e-4be8-a3dc-163df80e0918"
*/

export default async function handler(req, res) {

    //call parameter from body
    const { login_id } = req.body

    var shelter_id = await getShelterID(login_id)

    //check if shelter id exist 
    if (shelter_id != null) {
        //check if user id exist
        var shelterID = await checkShelterId(shelter_id)
        if (!shelterID) {
            // if user_id does not exist
            console.log("Shelter ID not found!")
            res.status(400).json("Shelter ID not found!")
        } else {
            //delete
            const { er } = await supabase
            .from('shelter_profile')
            .delete()
            .eq('shelter_id', shelter_id)
            console.log("DELETE SUCCESS")
            res.status(400).json("DELETE SUCCESS")
        }

    }
}


async function checkShelterId(shelter_id, response) {
    //query
    const { data, error } = await supabase.from('shelter_profile').select().eq('shelter_id', shelter_id)
    if (data == "") {
        //queue_id does not exist
        response = false
    } else {
        //queue_id exist
        response = true
    }

    //print result
    //console.log(data)
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