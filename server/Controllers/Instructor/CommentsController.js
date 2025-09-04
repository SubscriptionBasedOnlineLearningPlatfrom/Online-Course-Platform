import { supabase } from "../../Database/SupabaseClient.js";


export const viewStudentsComments = async (req,res) => {
    try {
        // const instructor_id = req.instructorId;
        const {instructor_id} = req.body;
        
        const {data : comments , commentError} =await  supabase
                            .from('students_comments_for_instructor')
                            .select('*')
                            .eq('instructor_id', instructor_id);
        
        if(commentError){
            return res.status().json({error : error.message})
        }
        

        const {data : replies , repliesError } = await supabase
                                                        .from('instructor_replies_for_comments')
                                                        .select('*')
                                                        // .eq('instructor_id', instructor_id)
                                                        .order("updated_at", {ascending : false});
                                                    
        if(repliesError){
            return res.status(500).json({error : error.message})
        }
        // console.log(replies);
        const repliesByComment = (replies || []).reduce((acc, reply) => {
            (acc[reply.comment_id] ||= []).push(reply);
            return acc;
        },{})

        // console.log(repliesByComment)

        const withReplies = (comments || []).reduce((acc,comment) => {
            acc[comment.comment_id]  = {
                ...comment,
                replies : repliesByComment[comment.comment_id] || []
            }
            return acc[comment.comment_id];
            
        })
        console.log(withReplies);
        return res.status(200).json(withReplies);


    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error : ", details: error.message})
    }
}