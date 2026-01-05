'use client'
import TrackingDashboard from '../TrackingDashboard';
import CargoTrackingCard from '../CargoTrackingCard';
import StatCard from '../StatCard';


const DashboardClient = () => {
  return (
         <div className="space-y-6 ">
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Active bookings" value={0} />
        <StatCard title="Total bookings" value={0} />
        <StatCard title="Requests" value={0} />
        <div className="bg-white rounded-lg border p-4">
          <div className="text-sm text-muted-foreground mb-2">
            Get instant, competitive rates for your shipments.
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded shadow-sm">
            Request a quote
          </button>
        </div>
      </div>

      <div className="bg-white p-4  h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 rounded bg-sky-600 text-white">
              Active bookings
            </button>
            <button className="px-3 py-1 rounded bg-slate-100">Requests</button>
          </div>
          <div className="text-sm text-muted-foreground">Filter</div>
        </div>
        <CargoTrackingCard
          trackingId="TRK-9X2A8K"
          status="In Transit"
          from="Manila, PH"
          to="Douala, CM"
        />
        <TrackingDashboard trackingCode="b6b2caf0-9f6f-46c0-847f-8fe884c73b33"/>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-4">Bookings overview</div>
        <div className="bg-white rounded-lg border p-4">Recent activity</div>
        <div className="bg-white rounded-lg border p-4">Notifications</div>
      </div>
    </div>
);
};

export default DashboardClient;