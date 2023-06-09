import { supabase } from "../../supabase"
import { useEffect, useState } from 'react'

export default async function handler(req, res) {
    //get profile cat in shelter view per cat id
    //select by shelter_id

    const { login_id, cat_id, sex, breed, color, status, page_number} = req.body

    var shelter_id = await getShelterID(login_id)

    const { count, err } = await supabase
        .from('cat_profile')
        .select('*', { count: 'exact', head: true })
        .match({ shelter_id: shelter_id })
        
    if (!shelter_id) {
        console.log("Shelter ID not found!")
        res.status(200).json("Shelter ID not found!")
    } else {
        console.log("Shelter ID Found!")
        let query = supabase
        .from('cat_profile')
        .select('cat_id, cat_name, sex, breed, color, cat_picture, status, create_date')
        .eq('shelter_id', shelter_id)
        .range(6*(page_number-1), (6*page_number)-1)
    
        if (cat_id) { query = query.eq('cat_id', cat_id) }
        if (sex) { query = query.eq('sex', sex) }
        if (breed) { query = query.eq('breed', breed) }
        if (color) { query = query.eq('color', color) }
        if (status) {
            if (status == "ว่าง") {
                query = query.eq('status', true)
            } else if (status == "มีบ้าน") {
                query = query.eq('status', false)
            }
            else {
                query = query.eq('status', status)
            }
        }
        
        const { data, error } = await query

        if (error) {
            throw error
        }

        console.log(count)
        console.log(data)
        console.log("Show My Cat SUCCESS!")
        res.status(200).json(data)
    }

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



