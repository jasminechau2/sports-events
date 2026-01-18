import { PageSkeleton, FormCardSkeleton } from "@/components/layout";

export default function EditEventLoading() {
  return (
    <PageSkeleton maxWidth="2xl">
      <FormCardSkeleton titleWidth="w-32" />
    </PageSkeleton>
  );
}
