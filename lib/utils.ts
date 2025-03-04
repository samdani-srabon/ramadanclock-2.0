import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTo24Hour(timeStr: string): string {
  if (!timeStr) return '';
  
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'pm') {
    hours = String(parseInt(hours, 10) + 12);
  }
  
  return `${hours}:${minutes}`;
}

export function parseTimeToDate(timeStr: string, today = new Date()): Date {
  if (!timeStr) {
    return new Date();
  }
  
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (modifier.toLowerCase() === 'pm' && hours < 12) {
    hours += 12;
  }
  if (modifier.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }
  
  const date = new Date(today);
  date.setHours(hours, minutes, 0, 0);
  
  return date;
}

export function formatTimeLeft(milliseconds: number): string {
  if (milliseconds <= 0) {
    return "00:00:00";
  }

  // Convert to seconds, minutes, hours
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));

  // Format with leading zeros
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function getCurrentRamadanDay(startDate: Date = new Date(2025, 2, 2)): number {
  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  // Return day number if within Ramadan (1-30), otherwise return 1 as default
  return diffDays > 0 && diffDays <= 30 ? diffDays : 1;
}

export function formatBanglaDate(date: string): string {
  if (!date) return '';
  
  const months: Record<string, string> = {
    'January': 'জানুয়ারি',
    'February': 'ফেব্রুয়ারি',
    'March': 'মার্চ',
    'April': 'এপ্রিল',
    'May': 'মে',
    'June': 'জুন',
    'July': 'জুলাই',
    'August': 'আগস্ট',
    'September': 'সেপ্টেম্বর',
    'October': 'অক্টোবর',
    'November': 'নভেম্বর',
    'December': 'ডিসেম্বর'
  };
  
  const days: Record<string, string> = {
    'Sunday': 'রবিবার',
    'Monday': 'সোমবার',
    'Tuesday': 'মঙ্গলবার',
    'Wednesday': 'বুধবার',
    'Thursday': 'বৃহস্পতিবার',
    'Friday': 'শুক্রবার',
    'Saturday': 'শনিবার'
  };
  
  // Example: "02 March Sunday"
  const parts = date.split(' ');
  if (parts.length < 3) return date;
  
  const day = parts[0];
  const month = parts[1];
  const dayName = parts[2];
  
  return `${day} ${months[month] || month} ${days[dayName] || dayName}`;
}

export function convertToBanglaNumber(num: number): string {
  if (num === undefined || num === null) return '';
  
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(digit => 
    isNaN(parseInt(digit)) ? digit : banglaDigits[parseInt(digit)]
  ).join('');
}