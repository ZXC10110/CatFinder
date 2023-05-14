import { supabase } from "../supabase"
import { useEffect, useState } from 'react'

//ไม่ได้ใช้ เอาไว้เทสเรียกจากจำนวนหน้า
export default async function handler(req, res) {
//per cat_id
    const { page_number} = req.body

    const { count, err } = await supabase
        .from('cat_profile')
        .select('*', { count: 'exact', head: true })
    
    let query = supabase
        .from('cat_profile')
        .select('cat_id, cat_name, detail, sex, breed, color, cat_picture, shelter_id')
        .lte('cat_id', page_number)
    //if (page_number == 1) { query = query.lte('cat_id', 9); }
    //if (page_number >= 1) { query = query.gte('cat_id', page_number*9); }
        

        //more ช่องทางการบริจาค





    const { data, error } = await query

    if (error) {
        throw error
    }

    console.log(count+" "+data)
    res.status(200).json(data)

}


