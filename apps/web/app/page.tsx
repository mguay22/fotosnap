import { Stories } from "@/components/dashboard/stories";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Stories />
            <></>
          </div>
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <></>
          </div>
        </div>
      </div>
    </div>
  );
}
