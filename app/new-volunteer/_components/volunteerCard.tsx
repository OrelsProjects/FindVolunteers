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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
  isEnabled: z.boolean().default(true),
});

interface Props {
  name: string;
  role: string;
  experienceYears: number;
  isEnabled?: boolean;
}

const VolunteerCard = ({
  name = "",
  role = "",
  experienceYears = 1,
  isEnabled = true,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [profileEnabled, setProfileEnabled] = useState(isEnabled);

  const form = useForm<z.infer<typeof formSchema>>({
    // reValidateMode: 'onChange',
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      role,
      experienceYears,
      isEnabled,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    values.isEnabled = profileEnabled;
    await axios.put("/api/volunteer", values);
    setEditMode(false);
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
    <div
      className={`shadow-sm rounded-lg border border-[hsl(240_5.9%_90%)] w-[350px] p-6 flex flex-col gap-6 ${
        editMode ? "h-[500px]" : "h-[338px]"
      } transition-[height] duration-250 ease-in-out`}
    >
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
            <div className="flex flex-col">
              <span className="font-semibold">אפשר לאחרים למצוא אותך:</span>
              <span className="text-sm">{isEnabled ? "כן" : "לא"}</span>
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
              <FormField
                control={form.control}
                name="isEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        אפשר לאחרים למצוא אותך
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
