INSERT INTO modules (course_id, module_title, module_order) VALUES
(1, 'HTML Basics', 1),
(1, 'CSS Fundamentals', 2),
(2, 'Async JS', 1),
(3, 'Python Intro', 1),
(4, 'Regression Models', 1),
(5, 'AWS Overview', 1),
(6, 'Docker Essentials', 1),
(7, 'Network Security', 1),
(8, 'Kali Linux Tools', 1),
(9, 'AI Concepts', 1),
(10, 'TensorFlow Setup', 1);

INSERT INTO courses (course_title, course_description, instructor_id, creation_date, last_update, price, category, language) VALUES
('Intro to Web Development', 'Learn HTML, CSS, and JavaScript from scratch.', 1, NOW(), NOW(), 49.99, 'Web Development', 'English'),
('Advanced JavaScript', 'Deep dive into JS ES6+, async programming, and more.', 1, NOW(), NOW(), 69.99, 'Web Development', 'English'),

('Data Science Fundamentals', 'Introduction to Python, statistics, and data wrangling.', 2, NOW(), NOW(), 59.99, 'Data Science', 'English'),
('Machine Learning Basics', 'Supervised and unsupervised learning with hands-on labs.', 2, NOW(), NOW(), 79.99, 'Data Science', 'English'),

('Cloud Computing Essentials', 'Understand AWS, Azure, and cloud architecture.', 3, NOW(), NOW(), 64.99, 'Cloud Computing', 'English'),
('DevOps Practices', 'CI/CD, containerization, and deployment strategies.', 3, NOW(), NOW(), 74.99, 'DevOps', 'English'),

('Cybersecurity 101', 'Learn security basics, threats, and defenses.', 4, NOW(), NOW(), 39.99, 'Cybersecurity', 'English'),
('Ethical Hacking', 'Hacking tools, penetration testing, and countermeasures.', 4, NOW(), NOW(), 89.99, 'Cybersecurity', 'English'),

('Introduction to AI', 'Get started with artificial intelligence and its applications.', 5, NOW(), NOW(), 59.99, 'AI', 'English'),
('Deep Learning with TensorFlow', 'Neural networks and DL models using TensorFlow.', 5, NOW(), NOW(), 99.99, 'AI', 'English');
