import { Image } from "next-sanity/image";
import type { JobType } from "@/types";
import { getJob } from "@/sanity/lib/sanity.query";

export default async function Job() {
  const job: JobType[] = await getJob();

  // - Current job (endDate = null) comes first
  const sortedJobs = [...job].sort((a, b) => {
    const dateA = a.endDate ? new Date(a.endDate) : new Date();
    const dateB = b.endDate ? new Date(b.endDate) : new Date();

    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section className="mt-32">
      <div className="mb-16">
        <h2 className="font-semibold text-4xl mb-4">Work Experience</h2>
      </div>

      <div className="flex flex-col gap-y-12">
        {sortedJobs.map((data) => (
          <div
            key={data._id}
            className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative
              before:absolute before:bottom-0 before:top-[4.5rem]
              before:left-7 before:w-[1px]
              before:h-[calc(100%-50px)]
              before:bg-zinc-800"
          >
            <a
              href={data.url}
              target="_blank"
              rel="noreferrer noopener"
              className="min-h-[60px] min-w-[60px] rounded-md overflow-clip relative"
            >
              <Image
                src={data.logo}
                alt={`${data.name} logo`}
                fill
                className="object-cover"
              />
            </a>

            <div className="flex flex-col items-start">
              <h3 className="text-xl font-bold">{data.name}</h3>
              <p>{data.jobTitle}</p>

              {/* ✅ SAFE DATE RENDERING */}
              <small className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                {new Date(data.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
                {" - "}
                {data.endDate
                  ? new Date(data.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Present"}
              </small>

              <p className="text-base text-zinc-400 my-4">{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
