import { supabase } from "../../supabase"
import { useEffect, useState } from 'react'

//เอามาเทสเฉย ๆ 
export default async function handler(req, res) {
    const { login_id, cat_id, sex, breed, color, 
            status } = req.body
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
        
            if(cat_id) { query = query.eq('queue.cat_profile.cat_id', cat_id)}
            if (sex) { query = query.eq('queue.cat_profile.sex', sex) }
            if (breed) { query = query.eq('queue.cat_profile.breed', breed) }
            if (color) { query = query.eq('queue.cat_profile.color', color) } 
            if (status) { 
                if(status == "ว่าง"){
                    query = query.eq('queue.cat_profile.status', true)
                } else if(status == "มีบ้านแล้ว"){
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
