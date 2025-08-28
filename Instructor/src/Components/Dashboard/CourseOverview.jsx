import { Card } from "../Dashboard1/ui/card.jsx";
import { Button } from "../Dashboard1/ui/button.jsx";
import { Progress } from "../Dashboard1/ui/progress.jsx";
import { Users, BookOpen, Star, Plus } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link



const courses = [
  {
    id: '1',
    title: 'React Development Basics',
    students: 47,
    progress: 85,
    rating: 4.8,
    status: 'published'
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    students: 32,
    progress: 65,
    rating: 4.9,
    status: 'published'
  },
  {
    id: '3',
    title: 'Web Design Fundamentals',
    students: 23,
    progress: 40,
    rating: 4.7,
    status: 'draft'
  }
];

export const CourseOverview = () => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Your Courses</h3>
          <Link to="/create-course">
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Course
          </Button>
        </Link>
        </div>
        
        <div className="space-y-4">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-blue rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">{course.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {course.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
