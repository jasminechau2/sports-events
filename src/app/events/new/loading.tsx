import { PageSkeleton, FormCardSkeleton } from "@/components/layout";

export default function NewEventLoading() {
  return (
    <PageSkeleton maxWidth="2xl">
      <FormCardSkeleton titleWidth="w-48" />
    </PageSkeleton>
  );
}
