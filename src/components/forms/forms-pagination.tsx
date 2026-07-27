"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";


type FormsPaginationProps = {

  page: number;

  totalPages: number;

  total: number;

  pageSize: number;

};





export function FormsPagination({

  page,

  totalPages,

  total,

  pageSize,

}: FormsPaginationProps) {


  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();





  if (totalPages <= 1) {

    return null;

  }






  function goToPage(nextPage:number) {


    const params =

      new URLSearchParams(

        searchParams.toString()

      );



    params.set(

      "page",

      String(nextPage)

    );



    router.replace(

      `${pathname}?${params.toString()}`

    );


  }







  const start =

    total === 0

      ? 0

      : (page - 1) * pageSize + 1;






  const end = Math.min(

    page * pageSize,

    total

  );








  return (

    <div

      className="
        flex
        flex-col
        gap-4

        border-t

        pt-5

        sm:pt-6

        lg:flex-row
        lg:items-center
        lg:justify-between
      "

    >






      <p

        className="
          text-center
          text-sm
          text-muted-foreground

          lg:text-left
        "

      >

        Showing {start}–{end} of {total} forms

      </p>









      <div

        className="
          flex
          items-center
          justify-center
          gap-2
        "

      >





        <button

          onClick={() =>
            goToPage(page - 1)
          }

          disabled={page === 1}

          className="
            h-10
            rounded-xl
            border
            px-4
            text-sm
            transition

            hover:bg-muted

            disabled:cursor-not-allowed

            disabled:opacity-50
          "

        >

          Previous

        </button>








        <span

          className="
            flex
            h-10
            items-center
            rounded-xl
            border
            px-4
            text-sm
            font-medium
          "

        >

          {page} / {totalPages}

        </span>








        <button

          onClick={() =>
            goToPage(page + 1)
          }

          disabled={page === totalPages}

          className="
            h-10
            rounded-xl
            border
            px-4
            text-sm
            transition

            hover:bg-muted

            disabled:cursor-not-allowed

            disabled:opacity-50
          "

        >

          Next

        </button>






      </div>






    </div>

  );

}