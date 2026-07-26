import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  BarChart3,
  Eye,
  FileText,
  Send,
} from "lucide-react";


import DashboardHeader from "@/components/dashboard/dashboard-header";
import StatsCard from "@/components/dashboard/stats-card";
import AnalyticsOverview from "@/components/dashboard/analytics-overview";
import QuickActions from "@/components/dashboard/quick-actions";
import RecentForms from "@/components/dashboard/recent-forms";
import RecentResponses from "@/components/dashboard/recent-responses";


import { auth } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard/get-dashboard-data";
import { getOrCreateWorkspace } from "@/lib/workspace/get-or-create-workspace";







export default async function DashboardPage() {



  const session =

    await auth.api.getSession({

      headers: await headers(),

    });






  if(!session){

    redirect("/login");

  }







  await getOrCreateWorkspace({

    id:session.user.id,

    name:session.user.name,

    email:session.user.email,

  });







  const data =

    await getDashboardData({

      userId:session.user.id,

    });








  return (

    <main

      className="
        space-y-8
        pb-10
      "

    >





      {/* Header */}

      <section

        className="
          rounded-[32px]
          border
          bg-card
          p-8
          shadow-sm
        "

      >

        <DashboardHeader

          workspaceName={

            data.workspace?.name ??

            "Personal Workspace"

          }

        />


      </section>









      {/* Stats */}

      <section

        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "

      >



        <StatsCard

          title="Total Forms"

          value={
            data.stats.totalForms
          }

          subtitle={
            `${data.stats.publishedForms} Published`
          }

          icon={FileText}

        />





        <StatsCard

          title="Responses"

          value={
            data.stats.totalResponses
          }

          subtitle="Total submissions"

          icon={Send}

        />





        <StatsCard

          title="Views"

          value={
            data.stats.totalViews
          }

          subtitle="Total visits"

          icon={Eye}

        />





        <StatsCard

          title="Draft Forms"

          value={
            data.stats.draftForms
          }

          subtitle="Need publishing"

          icon={BarChart3}

        />



      </section>









      {/* Analytics */}

      <section

        className="
          rounded-[32px]
          border
          bg-card
          p-8
          shadow-sm
        "

      >

        <div

          className="
            mb-6
          "

        >

          <h2

            className="
              text-xl
              font-bold
            "

          >

            Overview


          </h2>


          <p

            className="
              mt-1
              text-sm
              text-muted-foreground
            "

          >

            Track your form performance and growth.


          </p>


        </div>





        <AnalyticsOverview

          totalForms={
            data.stats.totalForms
          }

          totalResponses={
            data.stats.totalResponses
          }

          totalViews={
            data.stats.totalViews
          }

          publishedForms={
            data.stats.publishedForms
          }

        />


      </section>









      {/* Quick Actions */}

      <section

        className="
          rounded-[32px]
          border
          bg-card
          p-8
          shadow-sm
        "

      >

        <div

          className="
            mb-5
          "

        >

          <h2

            className="
              text-xl
              font-bold
            "

          >

            Quick Actions


          </h2>


        </div>



        <QuickActions />


      </section>









      {/* Recent Data */}

      <section

        className="
          grid
          gap-6
          xl:grid-cols-2
        "

      >



        <div

          className="
            rounded-[32px]
            border
            bg-card
            p-8
            shadow-sm
          "

        >

          <RecentForms

            forms={
              data.recentForms
            }

          />


        </div>







        <div

          className="
            rounded-[32px]
            border
            bg-card
            p-8
            shadow-sm
          "

        >

          <RecentResponses

            responses={
              data.recentResponses
            }

          />


        </div>



      </section>






    </main>

  );


}