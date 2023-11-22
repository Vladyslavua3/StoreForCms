"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Button from "@/components/ui/button";
import axios from "axios";
import {toast} from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import Currency from "@/components/ui/currency";
import {useRouter} from "next/navigation";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);


const FormSchema = z.object({
    phone: z.string().regex(phoneRegex,'Invalid Number'),
    address: z.string().min(8, {
        message: "Address must be at least 8 characters.",
    }),
})

export function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            phone: "",
            address: ""
        },
    })

    const router = useRouter()
    const items = useCart((state) => state.items);
    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price)
    }, 0);
    const removeAll = useCart((state) => state.removeAll);

    async function onSubmit (data: z.infer<typeof FormSchema>) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id),
            phone:form.getValues("phone"),
            address:form.getValues("address")
        });

        if(response.status === 200){
            toast('We will contact you ')
            removeAll()
            router.push("/")
        }else{
            toast('Something went wrong')
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input placeholder="type your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="type your address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <div className="text-base font-medium text-gray-900">Order total</div>
                        <Currency value={totalPrice} />
                    </div>
                </div>
                <Button type={'submit'} disabled={items.length === 0} className="w-full mt-6">
                    Checkout
                </Button>
            </form>
        </Form>
    )
}
