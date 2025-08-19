import { useState } from "react";
import { CertificateForm } from "@/components/CertificateForm";
import { CertificatePreview } from "@/components/CertificatePreview";
import { generateCertificatePDF } from "@/services/pdfGenerator";
import { GraduationCap, Award, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [certificateData, setCertificateData] = useState({
    studentName: "",
    courseName: "",
    issueDate: new Date().toISOString().split('T')[0]
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCertificate = async (data) => {
    setIsGenerating(true);
    setCertificateData(data);

    try {
      toast.success("Generating your certificate...");
      await generateCertificatePDF(data);
      toast.success("Certificate generated successfully!");
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast.error("Failed to generate certificate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
        <div className="container mx-auto px-4 py-16 text-center relative">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-primary p-4 rounded-full">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              CertiVibe Forge
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Create beautiful, professional certificates for your online learning achievements. 
            Generate and download personalized certificates instantly.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Professional Design
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              Instant Download
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              PDF Format
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold mb-2">Create Your Certificate</h2>
              <p className="text-muted-foreground">
                Fill in your details below to generate a professional certificate
              </p>
            </div>

            <CertificateForm 
              onGenerateCertificate={handleGenerateCertificate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold mb-2">Certificate Preview</h2>
              <p className="text-muted-foreground">
                See how your certificate will look before generating
              </p>
            </div>

            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <CertificatePreview data={certificateData} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            Made with ❤️ for online learners everywhere
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
