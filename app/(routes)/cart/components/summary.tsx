"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { toast } from "react-hot-toast";
import {InputForm} from "@/components/ui/contact-form";


const Summary = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('success')) {
            toast.success('Payment completed.');
        }

        if (searchParams.get('canceled')) {
            toast.error('Something went wrong.');
        }
    }, [searchParams]);


    return (
        <div
            className="flex items-center flex-col mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 sm:items-start"
        >
            <h2 className="text-lg font-medium text-gray-900">
                Order summary
            </h2>
            <InputForm/>
        </div>
    );
}

export default Summary