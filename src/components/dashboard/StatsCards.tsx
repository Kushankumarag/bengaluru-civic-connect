
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Reports',
      value: '12',
      change: '+3 this month',
      icon: TrendingUp,
      color: 'text-civic-accent',
      bgColor: 'bg-civic-accent/10'
    },
    {
      title: 'Pending',
      value: '3',
      change: '2 in review',
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      title: 'In Progress',
      value: '1',
      change: 'Updated today',
      icon: AlertCircle,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      title: 'Resolved',
      value: '8',
      change: '67% success rate',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card hover:glow-hover transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
            <div>
              <h3 className="text-civic-light font-semibold mb-1">{stat.title}</h3>
              <p className="text-gray-400 text-sm">{stat.change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
