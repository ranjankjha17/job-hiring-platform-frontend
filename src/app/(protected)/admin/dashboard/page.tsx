"use client";

import { useState } from "react";
import { useDashboard } from "@/features/admin/hooks/useDashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartType = "bar" | "line";

export default function AdminDashboardPage() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [chartType, setChartType] = useState<ChartType>("bar");

  const { data, loading, error } = useDashboard(
    range?.from,
    range?.to
  );

  // 📅 PRESET HANDLER
  const applyPreset = (days: number) => {
    setRange({
      from: subDays(new Date(), days),
      to: new Date(),
    });
  };

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  if (error || !data) {
    return (
      <div className="p-6 text-red-500">
        {error || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

        <div className="flex flex-wrap gap-2">
          {/* 📅 PRESETS */}
          <Button variant="outline" onClick={() => applyPreset(7)}>
            Last 7 Days
          </Button>
          <Button variant="outline" onClick={() => applyPreset(30)}>
            Last 30 Days
          </Button>
          <Button variant="outline" onClick={() => applyPreset(90)}>
            Last 90 Days
          </Button>

          {/* DATE RANGE PICKER */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[260px] justify-start">
                {range?.from ? (
                  range.to ? (
                    <>
                      {format(range.from, "PPP")} –{" "}
                      {format(range.to, "PPP")}
                    </>
                  ) : (
                    format(range.from, "PPP")
                  )
                ) : (
                  "Select date range"
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={data.totalUsers} />
        <StatCard title="Total Jobs" value={data.totalJobs} />
        <StatCard title="Applications" value={data.totalApplications} />
      </div>

      {/* JOB STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Open Jobs" value={data.jobStatus.open} />
        <StatCard title="Closed Jobs" value={data.jobStatus.closed} />
        <StatCard title="Paused Jobs" value={data.jobStatus.paused} />
      </div>

      {/* 📈 CHART WITH TOGGLE */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Applications Trend</CardTitle>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={chartType === "bar" ? "default" : "outline"}
              onClick={() => setChartType("bar")}
            >
              Bar
            </Button>
            <Button
              size="sm"
              variant={chartType === "line" ? "default" : "outline"}
              onClick={() => setChartType("line")}
            >
              Line
            </Button>
          </div>
        </CardHeader>

        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={data.applicationsByMonth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            ) : (
              <LineChart data={data.applicationsByMonth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  strokeWidth={2}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
