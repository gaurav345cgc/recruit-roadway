import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Trophy, Target, Calendar } from "lucide-react";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  totalDays: number;
}

export function StreakTracker() {
  const [streakData] = useState<StreakData>({
    currentStreak: 7,
    longestStreak: 12,
    weeklyGoal: 5,
    weeklyProgress: 4,
    totalDays: 45
  });

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-badge-gold";
    if (streak >= 14) return "text-badge-silver";
    if (streak >= 7) return "text-streak-fire";
    return "text-primary";
  };

  const getStreakBadge = (streak: number) => {
    if (streak >= 30) return { text: "🔥 Legend", variant: "default" as const };
    if (streak >= 14) return { text: "⭐ Champion", variant: "secondary" as const };
    if (streak >= 7) return { text: "🚀 Rockstar", variant: "outline" as const };
    return { text: "📚 Getting Started", variant: "outline" as const };
  };

  const weeklyPercentage = Math.round((streakData.weeklyProgress / streakData.weeklyGoal) * 100);

  return (
    <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className={`h-5 w-5 ${getStreakColor(streakData.currentStreak)} animate-streak-pulse`} />
          Study Streak
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Streak */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-1">
            {streakData.currentStreak}
          </div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
          <Badge {...getStreakBadge(streakData.currentStreak)} className="mt-2">
            {getStreakBadge(streakData.currentStreak).text}
          </Badge>
        </div>

        {/* Weekly Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              <span>Weekly Goal</span>
            </div>
            <span className="font-medium">{streakData.weeklyProgress}/{streakData.weeklyGoal}</span>
          </div>
          <Progress 
            value={weeklyPercentage} 
            className="h-2 animate-progress-fill"
            style={{ '--progress-width': `${weeklyPercentage}%` } as React.CSSProperties}
          />
          <div className="text-xs text-muted-foreground text-center">
            {weeklyPercentage}% completed this week
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-lg font-semibold text-primary">{streakData.longestStreak}</div>
            <div className="text-xs text-muted-foreground">Longest Streak</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-lg font-semibold text-primary">{streakData.totalDays}</div>
            <div className="text-xs text-muted-foreground">Total Days</div>
          </div>
        </div>

        {/* Achievement Hint */}
        {streakData.currentStreak === 6 && (
          <div className="text-center p-2 bg-primary/5 rounded-lg animate-bounce-in">
            <div className="text-xs text-primary font-medium">
              🎯 One more day for your week streak badge!
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}