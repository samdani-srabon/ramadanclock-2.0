import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentRamadanDay } from '@/lib/utils';
import RamadanCalendar from '@/components/ramadan-calendar';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import ramadanData from '@/data/ramadanData.json';

export function generateStaticParams() {
  return Object.keys(ramadanData.districts || {}).map((district) => ({
    district,
  }));
}

export default function DistrictPage({ params }: { params: { district: string } }) {
  const { district } = params;
  const decodedDistrict = decodeURIComponent(district);
  
  // Check if district exists in data
  if (!ramadanData.districts || !ramadanData.districts[decodedDistrict]) {
    notFound();
  }
  
  const districtData = ramadanData.districts[decodedDistrict];
  const currentDay = getCurrentRamadanDay();
  const todaySchedule = districtData.ramadan_schedule.find(day => day.day === currentDay) || 
                        districtData.ramadan_schedule[0];
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{decodedDistrict} - রমজান ২০২৫</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold mb-4 text-center font-bengali">
            আজকের সেহরি ও ইফতার সময়সূচি ২০২৫
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-primary/5 rounded-lg">
              <h3 className="text-lg font-medium mb-2 font-bengali">সেহরি শেষ</h3>
              <p className="text-2xl font-bold">{todaySchedule.sehri_last_time}</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <h3 className="text-lg font-medium mb-2 font-bengali">ফজর শুরু</h3>
              <p className="text-2xl font-bold">{todaySchedule.fajr_start_time}</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <h3 className="text-lg font-medium mb-2 font-bengali">ইফতার</h3>
              <p className="text-2xl font-bold">{todaySchedule.iftar_time}</p>
            </div>
          </div>
        </div>
        
        <RamadanCalendar 
          schedule={districtData.ramadan_schedule}
          currentDay={currentDay}
        />
      </div>
    </main>
  );
}