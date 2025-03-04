"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentRamadanDay } from '@/lib/utils';
import { DistrictSelector } from '@/components/ui/district-selector';
import RamadanClock from '@/components/ramadan-clock';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ramadanData from '@/data/ramadanData.json';

export default function Home() {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Dhaka");
  const [mounted, setMounted] = useState(false);
  
  // Get all available districts
  const districts = Object.keys(ramadanData.districts || {});
  
  // Get current Ramadan day
  const currentDay = getCurrentRamadanDay();
  
  // Get today's schedule for the selected district
  const districtData = selectedDistrict ? ramadanData.districts?.[selectedDistrict] : null;
  const todaySchedule = districtData?.ramadan_schedule?.find(day => day.day === currentDay) || 
                        (districtData?.ramadan_schedule?.[0] || null);
  
  // Handle district change
  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
  };
  
  // Navigate to district page
  const navigateToDistrict = () => {
    if (selectedDistrict) {
      router.push(`/${encodeURIComponent(selectedDistrict)}`);
    }
  };
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Moon className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">রমজান ক্যালেন্ডার ২০২৫</h1>
          </div>
          <ThemeToggle />
        </header>
        
        <div className="grid gap-8">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to Ramadan Calendar 2025</CardTitle>
              <CardDescription>
                Select your district to see Sehri and Iftar timings for Ramadan 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <DistrictSelector 
                  districts={districts}
                  selectedDistrict={selectedDistrict}
                  onDistrictChange={handleDistrictChange}
                />
                
                <Button onClick={navigateToDistrict} className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Full Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {todaySchedule && (
            <div className="grid gap-6 md:grid-cols-2">
              <RamadanClock 
                sehriTime={todaySchedule.sehri_last_time}
                iftarTime={todaySchedule.iftar_time}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-bengali">
                    {selectedDistrict} - আজকের সেহরি ও ইফতার সময়সূচি
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium font-bengali">রমজান</span>
                      <span className="font-bold">{currentDay} Day</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium font-bengali">তারিখ</span>
                      <span className="font-bold">{todaySchedule.date}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium font-bengali">সেহরি শেষ</span>
                      <span className="font-bold">{todaySchedule.sehri_last_time}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium font-bengali">ফজর শুরু</span>
                      <span className="font-bold">{todaySchedule.fajr_start_time}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                      <span className="font-medium font-bengali">ইফতার</span>
                      <span className="font-bold">{todaySchedule.iftar_time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}