import { Award, Calendar, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export const CertificatePreview = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="relative w-full max-w-2xl mx-auto aspect-[4/3] p-12 shadow-certificate bg-gradient-to-br from-certificate-background via-white to-certificate-background/90 border-2 border-certificate-border overflow-hidden">
      {/* Elegant border pattern */}
      <div className="absolute inset-3 border-2 border-certificate-primary/20 rounded-lg"></div>
      <div className="absolute inset-5 border border-certificate-accent/30 rounded-md"></div>

      {/* Top decorative line */}
      <div className="absolute top-8 left-12 right-12 h-0.5 bg-gradient-to-r from-transparent via-certificate-primary to-transparent"></div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-8 left-12 right-12 h-0.5 bg-gradient-to-r from-transparent via-certificate-accent to-transparent"></div>

      {/* Corner ornaments */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-certificate-primary/40"></div>
      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-certificate-primary/40"></div>
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-certificate-primary/40"></div>
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-certificate-primary/40"></div>

      {/* Decorative stars */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
        <Star className="w-4 h-4 text-certificate-accent" fill="currentColor" />
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        <Star className="w-4 h-4 text-certificate-accent" fill="currentColor" />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full text-center space-y-5">
        {/* Company branding */}
        <div className="space-y-3 mb-4">
          <div className="relative p-2 bg-white/60 rounded-full shadow-sm">
            <img
              src="/lovable-uploads/3909375f-ebd0-4708-b13d-7c8624dbd74f.png"
              alt="ProLearnX Logo"
              className="w-14 h-14 mx-auto object-contain"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-certificate-primary tracking-[0.3em]">
              PROLEARNX
            </h2>
            <p className="text-xs text-certificate-text/60 font-medium tracking-[0.2em] uppercase">
              Learn Smart. Grow Fast
            </p>
          </div>
        </div>

        {/* Elegant divider */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-certificate-accent"></div>
          <Star className="w-3 h-3 text-certificate-accent" fill="currentColor" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-certificate-accent"></div>
        </div>

        {/* Header */}
        <div className="space-y-2 mb-6">
          <h1 className="text-5xl font-bold text-certificate-text tracking-[0.15em] font-serif">
            CERTIFICATE
          </h1>
          <p className="text-lg text-certificate-text/70 font-medium tracking-[0.3em] uppercase">
            of Completion
          </p>
        </div>

        {/* Student section */}
        <div className="space-y-4 mb-6">
          <p className="text-certificate-text/60 text-sm font-medium tracking-[0.2em] uppercase">
            This is to certify that
          </p>
          <div className="relative">
            <h2 className="text-3xl font-bold text-certificate-primary font-serif px-6 py-2 bg-white/40 rounded-lg shadow-sm border border-certificate-primary/20">
              {data.studentName || "Student Name"}
            </h2>
          </div>
        </div>

        {/* Course section */}
        <div className="space-y-3 mb-6">
          <p className="text-certificate-text/60 text-sm font-medium tracking-[0.2em] uppercase">
            has successfully completed the course
          </p>
          <h3 className="text-xl font-semibold text-certificate-text font-serif px-4 py-1 bg-white/30 rounded border border-certificate-accent/20">
            {data.courseName || "Course Name"}
          </h3>
        </div>

        {/* Date with elegant styling */}
        <div className="flex items-center justify-center gap-3 mb-8 px-6 py-2 bg-white/30 rounded-full border border-certificate-border/20">
          <Calendar className="w-4 h-4 text-certificate-primary" />
          <p className="text-certificate-text/70 text-sm font-medium tracking-wide">
            Issued on {formatDate(data.issueDate)}
          </p>
        </div>

        {/* Elegant signature section */}
        <div className="space-y-3">
          <p className="text-xl font-bold text-certificate-primary italic font-serif tracking-wide">
            Dr. Sarah Mitchell
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-certificate-primary/40"></div>
            <Star className="w-2 h-2 text-certificate-accent" fill="currentColor" />
            <div className="w-16 h-px bg-certificate-primary/40"></div>
          </div>
          <p className="text-xs text-certificate-text/50 font-medium tracking-[0.2em] uppercase">
            Academic Director
          </p>
        </div>
      </div>
    </Card>
  );
};
