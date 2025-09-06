import z from "zod"
import { supabase } from "../../Database/SupabaseClient.js";

const QuizSchema = z.object({
    lesson_id: z.uuid(),
    quiz_title: z.string().min(1),
    questions: z.array({
        question: z.string(
            z.object({
                question: z.string().min(1),
                answers: z.array(z.string().min(1)).min(1),
                correctAnswer: z.number().int().nullable()
            })
        ).min(1)
    })
})

export const quizCreation = async (req, res) => {
    try {
        const parsed = QuizSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error });
        }

        const { lesson_id, quiz_title, questions } = parsed.data;

        const { data, error } = await supabase.rpc('create_quiz_with_Q_A', {
            lesson_id: lesson_id,
            quiz_title: quiz_title,
            questions: questions
        })

        if (error) {

            return res.status(500).json({ error: error.message });
        }

        return res.status(201).json({ quiz_id: data })
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error : ",details:error.message});
    }
}

export const loadQuiz = async (req,res) => {
    try {
        const {data:quiz, error:quizError} = await supabase
                                                    .from('quizzes')
                                                    .select('quiz_id, quiz_title')
                                                    .eq('lesson_id',req.params.lessonId);
        
        if(quizError){
            // console.log(quizError);
            return res.status(500).json({ error: quizError.message });
        }
        // console.log(quiz[0].quiz_id)

        const {data:questions, error:questionsError} = await supabase
                                                            .from('questions')
                                                            .select('question_id, question_text')
                                                            .eq('quiz_id',quiz[0].quiz_id)
                                                            .order('created_at', {ascending:true});

        console.log(questions)
        if(questionsError){
            console.log(questionsError);
            return res.status(500).json({ error: questionsError.message });
        }

        const questionsIds = questions.map(q => q.question_id);
        const {data:answers, error:answersError} = await supabase
                                                         .from('answers')
                                                         .select('answer_id,question_id,answer_text,is_correct')
                                                         .in('question_id',questionsIds);

        if(answersError){
            // console.log(answersError);
            return res.status(500).json({ error : answersError});
        }

        const full = questions.map(q => ({
            question:q.question_text,
            answers:(answers || []).filter(ans => ans.question_id === q.question_id).map(a => a.answer_text),
            correctAnswer: (answers || []).filter(a => a.question_id === q.question_id).findIndex(a => a.is_correct)
        }))
        
        return res.json(full);

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error : ",details:error.message});
    }
}