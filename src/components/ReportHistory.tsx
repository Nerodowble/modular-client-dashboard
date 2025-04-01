
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

interface Report {
  id: string;
  date: string;
  title: string;
  downloadUrl?: string;
}

interface ReportHistoryProps {
  reports: Report[];
  onViewReport: (reportId: string) => void;
}

const ReportHistory = ({ reports, onViewReport }: ReportHistoryProps) => {
  return (
    <ScrollArea className="h-[300px] w-full pr-4">
      <div className="space-y-4">
        {reports.map((report) => (
          <div 
            key={report.id} 
            className="flex items-center justify-between p-3 border rounded-md"
          >
            <div>
              <p className="font-medium text-sm">{report.title}</p>
              <p className="text-xs text-muted-foreground">{report.date}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onViewReport(report.id)}
              >
                <Eye className="h-3.5 w-3.5 mr-1" />
                Ver
              </Button>
              {report.downloadUrl && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                >
                  <a href={report.downloadUrl} download>
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Baixar
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ReportHistory;
