"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { Assistant } from "@prisma/client";

// import { Modal } from "../ui/modal";
// import { useAssistantModal } from "@/hooks/use-assistant-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/image-upload";
import { Separator } from "@/components/ui/separator";

interface AssistantFormProps {
  initialData: Assistant | null;
}

const formSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(10),
  instructions: z.string().min(200),
  seed: z.string().min(200),
  image: z.string(),
});

export const AssistantForm = ({ initialData }: AssistantFormProps) => {
  const router = useRouter();
  //   const assistantModal = useAssistantModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      image: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/assistant/${initialData.id}`, values);
        toast.success("Assistant updated successfully!");
      } else {
        await axios.post("/api/assistant", values);
        toast.success("Assistant created successfully!");
      }
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create assistant");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <Modal
    //   title="New Assistant"
    //   description="Add a new assistant bot"
    //   isOpen={assistantModal.isOpen}
    //   onClose={assistantModal.onClose}
    //   className="w-[90%] h-[95%] p-4"
    // >
    <div className="p-8">
      <div className="pb-4">
        <h1 className="text-3xl font-semibold">
          {initialData ? "Update Assistant" : "New Assistant"}
        </h1>
        <h2 className="text-xl font-medium">
          {initialData
            ? "Edit your assistant instructions"
            : "Add a new assistant"}
        </h2>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 h-full pt-10"
        >
          <div className="flex justify-between items-start gap-4 h-full w-[90%]">
            <div className="flex flex-col gap-8 w-[80%]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} className="w-full" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        // placeholder="Descripción del nuevo depósito"
                        {...field}
                        disabled={loading}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.description?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="ml-20">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      onChange={field.onChange}
                      value={
                        field.value ||
                        "https://res.cloudinary.com/ddtpavjz2/image/upload/v1718825677/amhrd4eqw0kg1diufd5e.webp"
                      }
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.description?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-4 w-full">
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    {/* <Input
                    // placeholder="Instrucciones del nuevo depósito"
                    {...field}
                    disabled={loading}
                  /> */}
                    <Textarea
                      {...field}
                      disabled={loading}
                      className="resize-none w-full h-[30vh]"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.instructions?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seed"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Seed</FormLabel>
                  <FormControl>
                    {/* <Input
                    // placeholder="Semilla del nuevo depósito"
                    {...field}
                    disabled={loading}
                  /> */}
                    <Textarea
                      {...field}
                      disabled={loading}
                      className="resize-none w-full h-[30vh]"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.seed?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-1/3 self-end">
            {loading
              ? initialData
                ? "Updating assistant..."
                : "Creating new assistant..."
              : initialData
              ? "Update Assistant"
              : "Create Assistant"}
          </Button>
        </form>
      </Form>
    </div>
    // </Modal>
  );
};
