'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { productDetailsSchema } from '@/schemas/products';
import { createProduct } from '@/server/actions/products';
import { toast } from 'sonner';
import { title } from 'process';


export function ProductDetailsForm() {
    const form = useForm<z.infer<typeof productDetailsSchema>>({
        resolver: zodResolver(productDetailsSchema),
        defaultValues: {
            name: '',
            url: '',
            description: ''
        }
    });

    async function onSubmit(values: z.infer<typeof productDetailsSchema>) {
        console.log(values);
        const data = await createProduct(values);

        if (data?.message) {
            if (data.error) {
                toast.error('Error');
            } else {
                toast.success('Success');
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-6 flex-col'>
                <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
                    <FormField
                        control={form.control}
                        name='url'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter your website URL</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Include the protocol (http/https) and the full path to the sales page
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Description</FormLabel>
                            <FormControl>
                                <Textarea className='min-h-20 resize-none' {...field} />
                            </FormControl>
                            <FormDescription>An optional description to help distinguish your product from other products</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='self-end'>
                    <Button disabled={form.formState.isSubmitting} type='submit'>Save</Button>
                </div>
            </form>
        </Form>
    );
}