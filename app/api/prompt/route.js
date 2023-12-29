import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/User";

export const GET = async (request) =>{
    const {searchParams} = new URL(request.url)
    const searchText = searchParams.get("search")
    try{
        await connectToDB();
        let prompts = null
        if (searchText === ""){
            prompts = await Prompt.find({}).populate('creator')
        }
        else{
            const creatorMatches = await User.find({username: {"$regex": searchText, "$options": "i"}})
            const userIds = creatorMatches.map((match) => match._id)

            prompts = await Prompt.find(
                {
                    $or:[
                            {"creator": {"$in": userIds}},
                            {"prompt": {"$regex": searchText, "$options": "i"}},
                            {"tag": {"$regex": searchText, "$options": "i"}}
                    ]
                }
                ).populate('creator')
        }
        return new Response(JSON.stringify(prompts), {status: 200})
    }catch(error){
        console.log("Error: ", error)
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}