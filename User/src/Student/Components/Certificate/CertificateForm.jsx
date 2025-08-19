import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, UserIcon, GraduationCapIcon, DownloadIcon } from "lucide-react";
import { toast } from "sonner";

export const CertificateForm = ({ onGenerateCertificate, isGenerating }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    courseName: "",
    issueDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.courseName.trim()) {
      toast.error("Please enter the course name");
      return;
    }

    onGenerateCertificate(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-elegant">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
          <GraduationCapIcon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Create Certificate
        </CardTitle>
        <p className="text-muted-foreground">
          Generate your course completion certificate
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentName" className="flex items-center gap-2 font-medium">
              <UserIcon className="w-4 h-4 text-primary" />
              Student Name
            </Label>
            <Input
              id="studentName"
              type="text"
              placeholder="Enter your full name"
              value={formData.studentName}
              onChange={(e) => handleInputChange("studentName", e.target.value)}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseName" className="flex items-center gap-2 font-medium">
              <GraduationCapIcon className="w-4 h-4 text-primary" />
              Course Name
            </Label>
            <Input
              id="courseName"
              type="text"
              placeholder="Enter the course name"
              value={formData.courseName}
              onChange={(e) => handleInputChange("courseName", e.target.value)}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issueDate" className="flex items-center gap-2 font-medium">
              <CalendarIcon className="w-4 h-4 text-primary" />
              Issue Date
            </Label>
            <Input
              id="issueDate"
              type="date"
              value={formData.issueDate}
              onChange={(e) => handleInputChange("issueDate", e.target.value)}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <Button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Generating Certificate...
              </>
            ) : (
              <>
                <DownloadIcon className="w-4 h-4 mr-2" />
                Generate Certificate
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
