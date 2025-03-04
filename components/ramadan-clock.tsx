"use client";

import { useEffect, useState } from "react";
import { formatTimeLeft, parseTimeToDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";

interface RamadanClockProps {
  sehriTime: string;
  iftarTime: string;
}

export default function RamadanClock({ sehriTime, iftarTime }: RamadanClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState("");
  const [nextEvent, setNextEvent] = useState<"sehri" | "iftar">("iftar");
  
  useEffect(() => {
    if (!sehriTime || !iftarTime) return;
    
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const sehriDate = parseTimeToDate(sehriTime);
      const iftarDate = parseTimeToDate(iftarTime);
      
      // Determine which event is next
      const isSehriNext = now.getHours() >= 18 || now.getHours() < 5;
      
      if (isSehriNext) {
        setNextEvent("sehri");
        // If after midnight, sehri is today, otherwise it's tomorrow
        if (now.getHours() < 5) {
          const timeRemaining = sehriDate.getTime() - now.getTime();
          setTimeLeft(formatTimeLeft(timeRemaining));
        } else {
          // Sehri is tomorrow
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          const tomorrowSehri = parseTimeToDate(sehriTime, tomorrow);
          const timeRemaining = tomorrowSehri.getTime() - now.getTime();
          setTimeLeft(formatTimeLeft(timeRemaining));
        }
      } else {
        setNextEvent("iftar");
        const timeRemaining = iftarDate.getTime() - now.getTime();
        setTimeLeft(formatTimeLeft(timeRemaining));
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [sehriTime, iftarTime]);
  
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  
  return (
    <Card className="w-full bg-gradient-to-br from-primary/5 to-primary/10 border-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-2xl font-bold">
          {nextEvent === "iftar" ? (
            <div className="flex items-center justify-center gap-2">
              <Sun className="h-6 w-6 text-amber-500" />
              <span>Iftar Countdown</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Moon className="h-6 w-6 text-indigo-500" />
              <span>Sehri Countdown</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-5xl font-bold tracking-tighter mb-2 font-mono">
          {formattedTime}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold tracking-wider text-primary mb-2 font-mono">
            {timeLeft}
          </div>
          <p className="text-muted-foreground">
            {nextEvent === "iftar" 
              ? `Iftar at ${iftarTime}` 
              : `Sehri ends at ${sehriTime}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}