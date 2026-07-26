"use client";

import {
  useEffect,
  useState,
  useTransition,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Search } from "lucide-react";


const FormStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;



type FormsToolbarProps = {
  search: string;
  status: string;
};



export function FormsToolbar({
  search,
  status,
}: FormsToolbarProps) {


  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();



  const currentParams =
    searchParams.toString();




  const [searchValue, setSearchValue] =
    useState(search);



  const [statusValue, setStatusValue] =
    useState(status);




  const [, startTransition] =
    useTransition();





  useEffect(() => {

    setSearchValue(search);

  }, [search]);





  useEffect(() => {

    setStatusValue(status);

  }, [status]);






  useEffect(() => {


    const timeout = setTimeout(() => {


      const params =
        new URLSearchParams(
          currentParams
        );




      if (searchValue.trim()) {

        params.set(
          "search",
          searchValue.trim()
        );

      } else {

        params.delete("search");

      }






      if (statusValue) {

        params.set(
          "status",
          statusValue
        );

      } else {

        params.delete("status");

      }






      params.delete("page");






      const query =
        params.toString();





      const nextUrl =
        query
          ? `${pathname}?${query}`
          : pathname;






      const currentUrl =
        `${pathname}${
          currentParams
            ? `?${currentParams}`
            : ""
        }`;






      if (nextUrl === currentUrl) {

        return;

      }






      startTransition(() => {

        router.replace(nextUrl);

      });



    }, 300);





    return () => {

      clearTimeout(timeout);

    };



  }, [
    currentParams,
    pathname,
    router,
    searchValue,
    startTransition,
    statusValue,
  ]);







  return (

    <div
      className="
        flex
        flex-col
        gap-4
        rounded-xl
        border
        bg-card
        p-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >



      <div
        className="
          relative
          flex-1
        "
      >



        <Search
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-muted-foreground
          "
        />




        <input

          type="search"

          value={searchValue}

          onChange={(e) =>
            setSearchValue(
              e.target.value
            )
          }

          placeholder="Search forms..."

          className="
            h-10
            w-full
            rounded-lg
            border
            bg-background
            pl-10
            pr-4
            text-sm
            outline-none
            transition
            focus:ring-2
            focus:ring-primary
          "

        />


      </div>







      <select

        value={statusValue}

        onChange={(e) =>
          setStatusValue(
            e.target.value
          )
        }

        className="
          h-10
          rounded-lg
          border
          bg-background
          px-3
          text-sm
        "

      >



        <option value="">

          All Status

        </option>




        <option value={FormStatus.DRAFT}>

          Draft

        </option>





        <option value={FormStatus.PUBLISHED}>

          Published

        </option>





        <option value={FormStatus.ARCHIVED}>

          Archived

        </option>



      </select>





    </div>

  );

}