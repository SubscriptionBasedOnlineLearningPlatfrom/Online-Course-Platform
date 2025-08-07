const get_course_details =(courseId) => {
                            return `SELECT 
                                c.course_id,
                                c.course_title,
                                c.course_description,
                                c.creation_date,
                                c.last_update,
                                c.price,
                                c.category,
                                c.language,
                                u.username AS instructor_name, 
                                i.title AS instructor_title,
                                i.rating AS instructor_rating,
                                m.module_id,
                                m.module_title,
                                m.module_order
                            FROM courses c
                            LEFT JOIN instructors i ON c.instructor_id = i.instructor_id
                            JOIN users u ON i.user_id = u.user_id
                            LEFT JOIN modules m ON c.course_id = m.course_id
                            WHERE c.course_id = ${courseId}
                            ORDER BY c.course_id, m.module_order;
                            `;
}


export {get_course_details};