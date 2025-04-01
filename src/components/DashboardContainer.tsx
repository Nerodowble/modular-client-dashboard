
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from '@/lib/utils';

interface DashboardContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
  onEdit?: () => void;
  collapsible?: boolean;
}

const DashboardContainer = ({ 
  title, 
  children, 
  className, 
  onEdit,
  collapsible = false 
}: DashboardContainerProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="flex space-x-2">
          {onEdit && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {collapsible && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? 'Expandir' : 'Recolher'}
            </Button>
          )}
        </div>
      </CardHeader>
      {!isCollapsed && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export default DashboardContainer;
