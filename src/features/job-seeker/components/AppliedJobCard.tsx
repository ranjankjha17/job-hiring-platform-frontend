import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Application } from "../types/application";

export default function AppliedJobCard({ app }: { app: Application }) {
  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold">{app.job.title}</h3>
        <p className="text-sm text-muted-foreground">{app.job.company}</p>

        <Badge
          variant={
            app.status === "shortlisted"
              ? "default"
              : app.status === "rejected"
              ? "destructive"
              : "secondary"
          }
        >
          {app.status}
        </Badge>
      </CardContent>
    </Card>
  );
}
