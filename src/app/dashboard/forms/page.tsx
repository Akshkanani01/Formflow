import { headers } from "next/headers";
import { redirect } from "next/navigation";


import { auth } from "@/lib/auth";

import {
  getOrCreateWorkspace,
} from "@/lib/workspace/get-or-create-workspace";


import {
  getForms,
} from "@/lib/forms/get-forms";


import {
  FormsList,
} from "@/components/forms/forms-list";


import {
  CreateFormButton,
} from "@/components/forms/create-form-button";


import {
  FormsToolbar,
} from "@/components/forms/forms-toolbar";




const FormStatus = {

  DRAFT: "DRAFT",

  PUBLISHED: "PUBLISHED",

  ARCHIVED: "ARCHIVED",

} as const;



type FormStatus =
  (typeof FormStatus)[keyof typeof FormStatus];





type FormsPageProps = {

  searchParams: Promise<{

    search?: string;

    status?: FormStatus;

    page?: string;

  }>;

};







export default async function FormsPage({

  searchParams,

}: FormsPageProps) {



  const session =

    await auth.api.getSession({

      headers:

        await headers(),

    });





  if (!session) {

    redirect("/login");

  }







  const workspace =

    await getOrCreateWorkspace({

      id:

        session.user.id,


      name:

        session.user.name,


      email:

        session.user.email,


    });







  const params =

    await searchParams;







  const search =

    params.search?.trim()

      ||

    undefined;







  const status =

    params.status

      ||

    undefined;







  const page =

    Math.max(

      Number(

        params.page ?? "1"

      ),

      1

    );







  const result =

    await getForms({

      workspaceId:

        workspace.id,


      search,


      status,


      page,


    });







  return (

    <div className="space-y-8">



      <div

        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "

      >


        <div>


          <h1

            className="
              text-3xl
              font-bold
              tracking-tight
            "

          >

            Forms

          </h1>




          <p

            className="
              mt-2
              text-muted-foreground
            "

          >

            Create, manage and publish your forms.

          </p>



        </div>





        <CreateFormButton />



      </div>








      <FormsToolbar

        search={search ?? ""}

        status={status ?? ""}

      />








      <FormsList

        forms={result.forms}

        page={result.page}

        total={result.total}

        totalPages={result.totalPages}

        pageSize={result.pageSize}

      />



    </div>

  );

}