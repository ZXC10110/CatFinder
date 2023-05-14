import { supabase } from "../supabase"

/**
 * @swagger
* /api/shelter/createShelter:
*    post:
*      tags:
*        - shelter
*      summary: create shelter for user
*      description: create shelter for user
*      operationId: createShelter
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/ShelterCreateRequest'
*      responses:
*        '200':
*          description: Create Successful
*        '400':
*          description: Create Failed Due to Incorrect Input
* components:
*  schemas:
*    ShelterCreateRequest:
*      type: object
*      properties:
*        login_id:
*          type: string
*          example: "fadadb65-080e-4be8-a3dc-163df80e0918"
*/

export default async function handler(req, res) {

    //call parameter from body
    const { login_id } = req.body

    let createStatus

    //check login id
    var LoginID = await checkLoginId(login_id)
    if (!LoginID) {
        createStatus = false
        console.log("Login ID not matched!")
        res.status(200).json(createStatus)
    } else {
        console.log("Login ID matched!")
        const { error } = await supabase.from('shelter_profile').insert([
            {
              login_id: login_id,
            }
          ])
        //print data
        createStatus = true
        console.log("Add Shelter Success!")
        res.status(200).json(createStatus)
    }

}


//check login_id exist
async function checkLoginId(login_id, response) {
    //query
    const { data, error } = await supabase.from('user_profile').select()
    .not('login_id', login_id)
    if (data == "") {
        //Login_id does not exist
        response = false
    } else {
        //Login_id exist
        response = true
    }

    //print result
    console.log(data)
    return response
}

