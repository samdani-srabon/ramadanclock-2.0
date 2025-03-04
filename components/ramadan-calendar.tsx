"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { convertToBanglaNumber, formatBanglaDate } from "@/lib/utils";

interface RamadanSchedule {
  day: number;
  date: string;
  day_name: string;
  sehri_last_time: string;
  fajr_start_time: string;
  iftar_time: string;
}

interface RamadanCalendarProps {
  schedule: RamadanSchedule[];
  currentDay: number;
}

export default function RamadanCalendar({ schedule = [], currentDay }: RamadanCalendarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSchedule = Array.isArray(schedule) ? schedule.filter(day => 
    day.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    day.day_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    day.day.toString().includes(searchTerm)
  ) : [];
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>রমজান ক্যালেন্ডার ২০২৫</span>
          <Input
            placeholder="Search..."
            className="max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">দিন</TableHead>
                <TableHead>তারিখ</TableHead>
                <TableHead>বার</TableHead>
                <TableHead>সেহরি শেষ</TableHead>
                <TableHead>ফজর শুরু</TableHead>
                <TableHead>ইফতার</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedule.map((day) => (
                <TableRow 
                  key={day.day}
                  className={day.day === currentDay ? "bg-primary/10" : ""}
                >
                  <TableCell className="font-medium">
                    {convertToBanglaNumber(day.day)}
                  </TableCell>
                  <TableCell>{formatBanglaDate(day.date)}</TableCell>
                  <TableCell>{day.day_name}</TableCell>
                  <TableCell>{day.sehri_last_time}</TableCell>
                  <TableCell>{day.fajr_start_time}</TableCell>
                  <TableCell>{day.iftar_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}