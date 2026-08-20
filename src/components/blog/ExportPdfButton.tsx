import { Download } from "lucide-react";

export function ExportPdfButton() {
  const handleExport = () => {
    const previousTitle = document.title;
    document.title = "Building an AI Interviewer to Help Students Practice Smarter";
    window.print();
    window.setTimeout(() => {
      document.title = previousTitle;
    }, 1000);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="print:hidden inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Download aria-hidden className="h-4 w-4" />
      Export as PDF
    </button>
  );
}
