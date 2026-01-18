import { PageSkeleton, DashboardSkeleton } from "@/components/layout";

export default function DashboardLoading() {
  return (
    <PageSkeleton>
      <DashboardSkeleton />
    </PageSkeleton>
  );
}
