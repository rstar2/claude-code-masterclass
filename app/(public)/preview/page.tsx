// preview page for newly created UI components

import SkeletonCard from "@/components/SkeletonCard";
import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Avatar</h3>
        <p className="mb-4 text-body">
          Displays initials from first and last words (max 2)
        </p>
        <div className="flex gap-4">
          <Avatar name="Rumen Neshev" />
          <Avatar name="Alice Smith" />
          <Avatar name="Bob" />
          <Avatar name="John Middle Doe" />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">SkeletonCard</h3>
        <p className="mb-4 text-body">
          Loading placeholder with pulsating animation
        </p>
        <div className="flex flex-col gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Badge</h3>
        <p className="mb-4 text-body">Simple label badge with custom text</p>
        <div className="flex gap-4">
          <Badge>Active</Badge>
          <Badge>Pending</Badge>
          <Badge>New</Badge>
          <Badge />
        </div>
      </div>
    </div>
  );
}
