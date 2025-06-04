import React from "react";
import { Skeleton } from "../../components/ui/skeleton.tsx";
import { Card } from "../../components/ui/card.tsx";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 w-full px-4">
      {/* Cards Skeleton */}
      <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="w-3/4 h-5 rounded-md" />
                  <Skeleton className="w-1/2 h-6 rounded-md" />
                </div>
              </div>
            </Card>
          ))}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-100 w-full rounded-lg" />
        <Card className="flex flex-col gap-4 p-4">
          <Skeleton className="w-32 h-6 rounded-md" />
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between w-full gap-3"
              >
                <section className="flex items-center gap-3 min-w-0">
                  <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <Skeleton className="w-32 sm:w-32 lg:w-40 h-4 rounded-md" />
                    <Skeleton className="w-52 sm:w-40 lg:w-60  h-4 rounded-md mt-2" />
                  </div>
                </section>
                <Skeleton className="w-16 h-5 rounded-md flex-shrink-0" />
              </div>
            ))}
        </Card>
      </section>
    </div>
  );
};

export default DashboardSkeleton;
