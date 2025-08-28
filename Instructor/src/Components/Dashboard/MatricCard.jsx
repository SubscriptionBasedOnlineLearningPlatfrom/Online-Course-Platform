import { Card } from "../Dashboard1/ui/card.jsx";
// import { LucideIcon } from "lucide-react";

export const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  gradient = 'blue' 
}) => {
  const gradientClasses = {
    blue: 'bg-gradient-blue',
    green: 'bg-gradient-green',
    orange: 'bg-gradient-orange',
    purple: 'bg-gradient-purple'
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <div className="flex items-center gap-1">
                <span 
                  className={`text-xs font-medium ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
        </div>
        
        <div className={`p-3 rounded-xl ${gradientClasses[gradient]}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );
};
