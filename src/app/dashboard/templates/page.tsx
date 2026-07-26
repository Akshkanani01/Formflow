import {
  headers,
} from "next/headers";

import {
  redirect,
} from "next/navigation";


import {
  auth,
} from "@/lib/auth";


import {
  TemplateGallery,
} from "@/components/forms/templates/template-gallery";





export default async function TemplatesPage(){



  const session =

    await auth.api.getSession({

      headers:
        await headers(),

    });






  if(!session){

    redirect("/login");

  }








  return (

    <main
      className="
        space-y-8
        p-6
      "
    >

      <TemplateGallery />


    </main>

  );

}