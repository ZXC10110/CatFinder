import { supabase } from "../supabase"
import { useEffect, useState } from 'react'

/**
* @swagger
* /api/cat/homepageCat:
*    post:
*      tags:
*        - cat
*      summary: get homepage cat
*      description: get homepage cat
*      operationId: homepageCat
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/HomepageCatRequest'
*      responses:
*        '200':
*          description: Get Successful
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/HomepageCatResponse'
*        '400':
*          description: Get Failed Due to Incorrect Input
* components:
*  schemas:
*    HomepageCatRequest:
*      type: object
*      properties:
*        number:
*          type: integer
*          example: 3
*    HomepageCatResponse:
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
*        status:
*          type: boolean
*          example: false
*        shelter_name:
*          type: string
*          example: mixed
*
 */
export default async function handler(req, res) {
    //show 3 in home page
    const { number } = req.body

    let query = supabase
        .from('cat_profile')
        .select('cat_id, cat_name, detail, sex, breed, color, cat_picture, status, shelter_id, shelter_profile(shelter_name)')
        .eq("status", true)
        .order("cat_id")
        .limit(number)

    const { data, error } = await query

    if (error) {
        throw error
    }

    console.log("Homepage Cat Show")
    console.log(data)
    res.status(200).json(data)

}