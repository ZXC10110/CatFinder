import { supabase } from "../../supabase"

export default async function handler(req, res) {

    //add edit delete

    //call parameter from body
    //"queue_date": "2022-12-09T07:36:58.793+00:00"
    const {
        cat_id, status
    } = req.body

    //check shelter id
    var catID = await checkCatId(cat_id)
    if (!catID) {
        console.log("Cat ID not found!")
        res.status(200).json("Cat ID not found!")
    } else {
        console.log("Cat ID Found!")
        const { er } = await supabase.from('cat_profile')
            .update([{
                status: status,
                update_date: new Date()
            }]).eq('cat_id', cat_id)

        //print data
        res.status(200).json("Update Data Success!")

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
