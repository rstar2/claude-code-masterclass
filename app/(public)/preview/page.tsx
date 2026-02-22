// preview page for newly created UI components

import SkeletonCard from "@/components/SkeletonCard"
import Avatar from "@/components/Avatar"

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Avatar</h3>
        <p className="mb-4 text-body">Displays initials (max 2) from provided name</p>
        <div className="flex gap-4">
          <Avatar name="Rumen Neshev" />
          <Avatar name="Alice Smith" />
          <Avatar name="Bob" />
          <Avatar name="John Middle Doe" />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">SkeletonCard</h3>
        <p className="mb-4 text-body">Loading placeholder with pulsating animation</p>
        <div className="flex flex-col gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  )
}
