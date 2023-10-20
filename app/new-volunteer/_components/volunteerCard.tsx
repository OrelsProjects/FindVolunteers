"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "יש להזין שם באורך של לפחות 2 תווים ועד 50")
    .max(50),
  role: z
    .string()
    .trim()
    .min(2, "יש להזין שם באורך של לפחות 2 תווים ועד 50")
    .max(50),
  experienceYears: z.coerce
    .number({ invalid_type_error: "יש להזין מספר תקין גדול מ-0" })
    .positive("יש להזין מספר תקין גדול מ-0")
    .max(99, "לא נסחפנו?"),
});

interface Props {
  name: string;
  role: string;
  experienceYears: number;
}

const VolunteerCard = ({ name = "", role = "", experienceYears = 1}: Props) => {
  const [editMode, setEditMode] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    // reValidateMode: 'onChange',
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      role,
      experienceYears,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const onEditModeClick = () => {
    console.log("edit mode clicked");
    setEditMode(true);
  };

  const onCancel = () => {
    form.reset();
    setEditMode(false);
  };

  return (
    <div className="shadow-sm rounded-lg border border-[hsl(240_5.9%_90%)] w-[350px] p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">כרטיס מתנדב</span>
        {!editMode && (
          <Button variant="ghost" onClick={onEditModeClick}>
            <Pencil className="ml-2 h-4 w-4" /> עריכה
          </Button>
        )}
      </div>
      {!editMode && (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-semibold">שם:</span>
              <span className="text-sm">{name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">תפקיד:</span>
              <span className="text-sm">{role}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">שנות ניסיון:</span>
              <span className="text-sm">{experienceYears}</span>
            </div>
          </div>
          {/* <div className="h-16" /> */}
        </>
      )}
      {editMode && (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-base">
                      שם:
                    </FormLabel>
                    <FormControl>
                      {/* <Input placeholder="" {...field} /> */}
                      <Input {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-base">
                      תפקיד:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experienceYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-base">
                      שנות ניסיון:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={onCancel}>
                  ביטול
                </Button>
                <Button type="submit">אישור</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default VolunteerCard;
