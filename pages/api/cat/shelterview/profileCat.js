import { supabase } from "../../supabase"
import { useEffect, useState } from 'react'

/**
* @swagger
* /api/cat/shelterview/profileCat:
*    post:
*      tags:
*        - cat-shelter
*      summary: get profile cat shelterview
*      description: get profile cat shelterview
*      operationId: profileCat Shelterview
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/ProfileCatShelterviewRequest'
*      responses:
*        '200':
*          description: Get Successful
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ProfileCatShelterviewResponse'
*        '400':
*          description: Get Failed Due to Incorrect Input
* components:
*  schemas:
*    ProfileCatShelterviewRequest:
*      type: object
*      properties:
*        cat_id:
*          type: integer
*          example: 0
*    ProfileCatShelterviewResponse:
*      type: object
*      properties:
*        cat_id:
*          type: integer
*          example: 0
*        cat_name:
*          type: string
*          example: meow
*        detail:
*          type: string
*          example: meow
*        sex:
*          type: string
*          example: male
*        breed:
*          type: string
*          example: mixed
*        color:
*          type: string
*          example: mixed
*        cat_picture:
*          type: string
*          example: mixed
*        sterile:
*          type: boolean
*          example: true
*        vacccine:
*          type: boolean
*          example: true
*        congenital_desease:
*          type: string
*          example: nothing
*        age:
*          type: integer
*          example: 0
*        shelter_name:
*          type: string
*          example: love
*        location_url:
*          type: string
*          example: www
*        address:
*          type: string
*          example: www
*        donate_name1:
*          type: string
*          example: www
*        donate_number1:
*          type: string
*          example: 09x-xxx-xxx
*        donate_name2:
*          type: string
*          example: www
*        donate_number2:
*          type: string
*          example: 09x-xxx-xxx
*        queue_date:
*          type: string
*          format: date-time
*          example: '2022-12-23'
*        queue_time:
*          type: string
*          example: 09.00-10.00
*        user_id:
*          type: integer
*          example: 0
*        email:
*          type: string
*          example: email
*        queue_status:
*          type: boolean
*          example: true
*/


export default async function handler(req, res) {
    //get profile cat in shelter view per cat id
    //select by cat_id
    const { cat_id } = req.body
    let query = supabase
        .from('cat_profile')
        .select('cat_id, cat_name, detail, age, sex, breed, color, sterile, vaccine, congenital_disease, status, cat_picture, shelter_id, shelter_profile(shelter_name, location_url, address, donate_name1, donate_number1, donate_name2, donate_number2), queue(queue_id, queue_date, queue_time, user_id, user_profile(email), queue_status)')
    if (cat_id) { query = query.eq('cat_id', cat_id) }

    const { data, error } = await query

    if (error) {
        throw error
    }
    console.log("Show Cat Profile")
    res.status(200).json(data)

}


