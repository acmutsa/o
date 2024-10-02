"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// type Props = {};

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("searchKey", term);
    } else {
      params.delete("searchKey");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="flex gap-x-1 items-center">
      <Search />
      <Input
        type="search"
        className="max-w-sm"
        placeholder="John Doe"
        defaultValue={searchParams.get("searchKey")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      ></Input>
    </div>
  );
}
