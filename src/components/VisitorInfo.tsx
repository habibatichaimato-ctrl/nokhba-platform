import React, { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

interface VisitorLocation {
  country: string;
  city: string;
  timezone: {
    id: string;
  };
}

export const VisitorInfo: React.FC = () => {
  const [visitor, setVisitor] = useState<VisitorLocation | null>(null);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadVisitorInfo = async () => {
      try {
        const response = await fetch('https://ipwho.is/');
        if (!response.ok) return;

        const data: VisitorLocation = await response.json();
        if (isMounted) setVisitor(data);
      } catch {
        // Location details are optional and should not affect the header.
      }
    };

    loadVisitorInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!visitor?.timezone.id) return;

    const updateLocalTime = () => {
      try {
        setLocalTime(new Intl.DateTimeFormat('ar-MA', {
          timeZone: visitor.timezone.id,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).format(new Date()));
      } catch {
        setLocalTime('');
      }
    };

    updateLocalTime();
    const intervalId = window.setInterval(updateLocalTime, 1000);
    return () => window.clearInterval(intervalId);
  }, [visitor?.timezone.id]);

  if (!visitor) return null;

  return (
    <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400" dir="rtl">
      <span className="flex items-center gap-1.5" title="موقعك التقريبي">
        <MapPin className="w-3.5 h-3.5 text-amber-400" />
        <span>{visitor.city}، {visitor.country}</span>
      </span>
      {localTime && (
        <span className="flex items-center gap-1.5 border-r border-slate-700 pr-3" title="الساعة المحلية">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span dir="ltr">{localTime}</span>
        </span>
      )}
    </div>
  );
};
