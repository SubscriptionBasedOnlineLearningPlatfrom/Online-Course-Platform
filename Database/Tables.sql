

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE,
    email VARCHAR(30) UNIQUE,
    password_hash VARCHAR(50),
    user_type VARCHAR(30),
    registration_date TIMESTAMP,
    last_login TIMESTAMP
);



CREATE TABLE IF NOT EXISTS instructors (
    instructor_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    bio TEXT,
    title VARCHAR(50),
    rating DECIMAL
);

CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_title VARCHAR(50),
    course_description TEXT,
    instructor_id INTEGER REFERENCES instructors(instructor_id),
    creation_date TIMESTAMP,
    last_update TIMESTAMP,
    price DECIMAL,
    category VARCHAR(50),
    language VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS modules (
    module_id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(course_id),
    module_title VARCHAR(50),
    module_order INTEGER
);

CREATE TABLE IF NOT EXISTS lessons (
    lesson_id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES modules(module_id),
    lesson_title VARCHAR(50),
    content TEXT,
    lesson_type VARCHAR(50),
    lesson_order INTEGER
);

CREATE TABLE IF NOT EXISTS quizzes (
    quiz_id SERIAL PRIMARY KEY,
    lesson_id INTEGER REFERENCES lessons(lesson_id),
    quiz_title VARCHAR(50),
    passing_score DECIMAL
);

CREATE TABLE IF NOT EXISTS questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(quiz_id),
    question_text TEXT,
    question_type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS answers (
    answer_id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(question_id),
    answer_text TEXT,
    is_correct BOOLEAN
);

CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(course_id),
    user_id INTEGER REFERENCES users(user_id),
    enrollment_date TIMESTAMP,
    completion_date TIMESTAMP,
    progress DECIMAL
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    course_id INTEGER REFERENCES courses(course_id),
    amount DECIMAL,
    payment_date TIMESTAMP,
    transaction_id VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS submissions (
    submission_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    lesson_id INTEGER REFERENCES lessons(lesson_id),
    submission_date TIMESTAMP,
    score DECIMAL,
    submission_content TEXT
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(course_id),
    user_id INTEGER REFERENCES users(user_id),
    rating INTEGER,
    comment_text TEXT,
    comment_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    notification_text TEXT,
    notification_date TIMESTAMP,
    type VARCHAR(50)
);
