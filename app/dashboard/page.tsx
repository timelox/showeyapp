"use client";

import { Card } from "@/components/ui/card";
import { useMediaStore } from "@/lib/store";

export default function DashboardPage() {
  const { currentMedia } = useMediaStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Media</h2>
          {currentMedia ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Media #{currentMedia.id}</p>
                <p className="text-sm text-gray-500">Status: {currentMedia.status}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No media uploaded yet</p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <p className="text-gray-500">No payments yet</p>
        </Card>
      </div>
    </div>
  );
}