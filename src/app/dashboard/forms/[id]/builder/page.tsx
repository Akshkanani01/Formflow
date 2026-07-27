import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { getForm } from "@/lib/forms/get-form";
import { mapFormFieldToBuilder } from "@/lib/forms/form-field-to-builder";
import { getOrCreateWorkspace } from "@/lib/workspace/get-or-create-workspace";

import { BuilderProvider } from "@/components/forms/builder/builder-context";
import { BuilderHeader } from "@/components/forms/builder/builder-header";
import { BuilderSidebar } from "@/components/forms/builder/builder-sidebar";
import { BuilderCanvas } from "@/components/forms/builder/builder-canvas";
import { BuilderProperties } from "@/components/forms/builder/builder-properties";


type BuilderPageProps = {
  params: Promise<{
    id: string;
  }>;
};



export default async function BuilderPage({
  params,
}: BuilderPageProps) {


  const session =
    await auth.api.getSession({
      headers: await headers(),
    });



  if (!session) {
    redirect("/login");
  }





  const workspace =
    await getOrCreateWorkspace({

      id: session.user.id,

      name: session.user.name,

      email: session.user.email,

    });





  const { id } =
    await params;





  const form =
    await getForm({

      workspaceId: workspace.id,

      formId: id,

    });





  if (!form) {

    notFound();

  }





  const formFields =
    await prisma.formField.findMany({

      where: {

        formId: form.id,

      },


      orderBy: {

        position: "asc",

      },

    });







  const initialFields =

    formFields.map(

      (field) =>

        mapFormFieldToBuilder({

          id:

            field.id,


          type:

            String(field.type),


          label:

            field.label,


          placeholder:

            field.placeholder,


          helpText:

            field.helpText,


          required:

            field.required,

        })

    );







  return (

    <div

      className="
        flex
        h-[calc(100vh-4rem)]
        min-h-0
        flex-col
        overflow-hidden
        bg-background
      "

    >



      <BuilderProvider

        formId={form.id}

        initialFields={initialFields}

      >



        <BuilderHeader

          title={form.title}

          formId={form.id}

        />







        <div

          className="
            relative
            min-h-0
            flex-1
            overflow-hidden

            lg:grid
            lg:grid-cols-[260px_minmax(0,1fr)_320px]
          "

        >




          {/* Sidebar */}

          <BuilderSidebar />






          {/* Canvas */}

          <BuilderCanvas />






          {/* Properties */}

          <BuilderProperties />




        </div>




      </BuilderProvider>


    </div>

  );

}