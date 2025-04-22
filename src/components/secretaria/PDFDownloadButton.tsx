
import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Printer } from "lucide-react";
import PDFGenerator from "./PDFGenerator";
import { MemberType } from "@/types/member";

interface PDFDownloadButtonProps {
  members: MemberType[];
  filename: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ members, filename }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return (
      <button className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-2 sm:mt-0">
        <span>Preparazione PDF...</span>
      </button>
    );
  }

  return (
    <PDFDownloadLink 
      document={<PDFGenerator members={members} />} 
      fileName={filename}
      className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-2 sm:mt-0"
    >
      {({ loading }) => (
        loading ? 
          <span>Generazione PDF...</span> : 
          <span>
            <Printer className="mr-2 h-4 w-4" />
            Scarica PDF
          </span>
      )}
    </PDFDownloadLink>
  );
};

export default PDFDownloadButton;
