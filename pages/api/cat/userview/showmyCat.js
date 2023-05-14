import { supabase } from "../../supabase"
import { useEffect, useState } from 'react'

/**
* @swagger
* /api/cat/userview/showmyCat:
*    post:
*      tags:
*        - cat-user
*      summary: get profile cat userview
*      description: get profile cat userview
*      operationId: showmyCat Userview
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/ShowMyCatUserviewRequest'
*      responses:
*        '200':
*          description: Get Successful
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ShowMyCatUserviewResponse'
*        '400':
*          description: Get Failed Due to Incorrect Input
*
* components:
*  schemas: 
*   ShowMyCatUserviewRequest:
*      type: object
*      properties:
*        login_id:
*          type: string
*          example: 113ccce3-1b58-4ce8-a5fd-cdd0426242a9
*        cat_id:
*          type: integer
*          example: 0
*        sex:
*          type: string
*          example: เมีย
*        breed:
*          type: string
*          example: ผสม
*        color:
*          type: string
*          example: ขาว
*   ShowMyCatUserviewResponse:
*      type: object
*      properties:
*        user_id:
*          type: integer
*          example: 0
*        queue_id:
*          type: integer
*          example: 0
*        cat_id:
*          type: integer
*          example: 0
*        cat_name:
*          type: string
*          example: mali
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
*          example: web-url
*        status:
*          type: boolean
*          example: true
*        shelter_name:
*          type: string
*          example: love
 */

export default async function handler(req, res) {
    const { login_id, cat_id, sex, breed, color, status } = req.body
    //check login id
    var user_id = await getUserID(login_id)

    if (!user_id) {
        console.log("User ID not found!")
        res.status(200).json("User ID not found!")
    } else {
        console.log("User ID Found!")
        let query = supabase
            .from('user_profile')
            //.select('user_id , cat_profile(cat_id, cat_name, sex, breed, color, cat_picture, detail, status, shelter_id, shelter_profile(shelter_name))')
            .select('user_id, queue(queue_id, cat_profile(cat_id, cat_name, sex, breed, color, detail,cat_picture, status, shelter_profile(shelter_name)))')
            .eq('user_id', user_id)

        if (cat_id) { query = query.eq('queue.cat_profile.cat_id', cat_id) }
        if (sex) { query = query.eq('queue.cat_profile.sex', sex) }
        if (breed) { query = query.eq('queue.cat_profile.breed', breed) }
        if (color) { query = query.eq('queue.cat_profile.color', color) }
        if (status) {
            if (status == "ว่าง") {
                query = query.eq('queue.cat_profile.status', true)
            } else if (status == "มีบ้าน") {
                query = query.eq('queue.cat_profile.status', false)
            }
            else {
                query = query.eq('queue.cat_profile.status', status)
            }
        }
        const { data, error } = await query

        if (error) {
            throw error
        }

        console.log(data)
        res.status(200).json(data)
    }

}

//check UserID
async function getUserID(login_id, user_id) {
    //query
    const { data } = await supabase.from('user_profile').select().eq('login_id', login_id)
    console.log(data)
    if (data == "" || data == null) {
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