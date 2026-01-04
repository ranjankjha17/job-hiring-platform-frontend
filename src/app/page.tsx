import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find Your Dream Job or Hire Top Talent
          </h1>

          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            A modern job hiring platform connecting job seekers with
            verified recruiters. Simple. Fast. Reliable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button size="lg" className="bg-white text-indigo-600">
                Find Jobs
              </Button>
            </Link>

            <Link href="/recruiter/post-job">
              <Button size="lg" variant="outline">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="10,000+" subtitle="Active Job Seekers" />
          <StatCard title="2,500+" subtitle="Verified Recruiters" />
          <StatCard title="18,000+" subtitle="Jobs Posted" />
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">
              Featured Jobs
            </h2>
            <p className="text-muted-foreground mt-2">
              Hand-picked opportunities for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <JobCard
              title="Frontend Developer"
              company="TechNova"
              location="Remote"
            />
            <JobCard
              title="Backend Engineer"
              company="CloudCore"
              location="Bangalore"
            />
            <JobCard
              title="UI/UX Designer"
              company="Designify"
              location="Mumbai"
            />
          </div>

          <div className="text-center">
            <Link href="/jobs">
              <Button variant="outline">View All Jobs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-semibold">
            Ready to Get Started?
          </h2>
          <p className="text-indigo-100">
            Create your profile, upload your resume, and apply in
            one click.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-indigo-600">
                Create Account
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function JobCard({
  title,
  company,
  location,
}: {
  title: string;
  company: string;
  location: string;
}) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {company}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">
          📍 {location}
        </p>
        <Button className="w-full">Apply Now</Button>
      </CardContent>
    </Card>
  );
}
