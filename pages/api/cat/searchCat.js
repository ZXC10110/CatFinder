import { supabase } from "../supabase"
import { useEffect, useState } from 'react'
import { stringify } from "querystring"

/**
* @swagger
* /api/cat/searchCat:
*    post:
*      tags:
*        - cat
*      summary: get search cat
*      description: get search cat
*      operationId: searchCat
*      requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/SearchCatRequest'
*      responses:
*       '200':
*         description: Get Successful
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/SearchCatResponse'
*       '400':
*         description: Get Failed Due to Incorrect Input
* components:
*  schemas:
*   SearchCatRequest:
*     type: object
*     properties:
*       page_number:
*         type: integer
*         example: 1
*       cat_id:
*         type: integer
*         example: 0
*       sex:
*         type: string
*         example: เมีย
*       breed:
*         type: string
*         example: ผสม
*       color:
*         type: string
*         example: ขาว
*       status:
*         type: boolean
*         example: false
*       shelter_name:
*         type: string
*         example: LoveWorldLoveCat
*   SearchCatResponse:
*     type: object
*     properties:
*       cat_id:
*         type: integer
*         example: 0
*       cat_name:
*         type: string
*         example: meow
*       detail:
*         type: string
*         example: meow
*       sex:
*         type: string
*         example: male
*       breed:
*         type: string
*         example: mixed
*       color:
*         type: string
*         example: mixed
*       cat_picture:
*         type: string
*         example: mixed
*       status:
*         type: boolean
*         example: false
*       shelter_name:
*         type: string
*         example: mixed
*
*/

export default async function handler(req, res) {
    //filtering cat 

    const { page_number, cat_id, sex, breed, color, 
            status, shelter_name } = req.body
    
    
    //check cat id
    var catID = await checkCatId(cat_id)
    if (!catID) {
        console.log("Cat ID not found!")
        res.status(200).json("Cat ID not found!")
    } else {
        console.log("Cat ID Found!")
        let query = supabase
            .from('cat_profile')
            .select('cat_id, cat_name, sex, breed, color, cat_picture, detail, status, shelter_id, shelter_profile(shelter_name)')
            .range(9 * (page_number - 1), (9 * page_number) - 1)
        
            if(cat_id) { query = query.eq('cat_id', cat_id)}
            if (sex) { query = query.eq('sex', sex) }
            if (breed) { query = query.eq('breed', breed) }
            if (color) { query = query.eq('color', color) } 
            if (status) { 
                if(status == "ว่าง"){
                    query = query.eq('status', true)
                } else if(status == "มีบ้าน"){
                    query = query.eq('status', false) 
                }
                else {
                    query = query.eq('status', status) 
                }
            }
            if (shelter_name) { query = query.eq('shelter_name', shelter_name) }
            
            const { data, error } = await query

        if (error) {
        throw error
        }

        console.log(data)
        res.status(200).json(data)
    }

}

//check user_id exist
async function checkCatId(cat_id, response) {
    //query
    const { data, error } = await supabase.from('cat_profile').select().eq('cat_id', cat_id)
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
