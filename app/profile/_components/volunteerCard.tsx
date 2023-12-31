"use client";

import { linkedinProfilePrefix } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "יש להזין שם באורך של לפחות 2 תווים ועד 50")
    .max(50, "יש להזין שם באורך של לפחות 2 תווים ועד 50"),
  role: z
    .string()
    .trim()
    .min(2, "יש להזין שם באורך של לפחות 2 תווים ועד 50")
    .max(50, "יש להזין שם באורך של לפחות 2 תווים ועד 50"),
  experienceYears: z.coerce
    .number({ invalid_type_error: "יש להזין מספר תקין גדול מ-0" })
    .positive("יש להזין מספר תקין גדול מ-0")
    .max(99, "לא נסחפנו?"),
  isEnabled: z.boolean().default(true),
  linkedinUrl: z
    .string()
    .trim()
    .min(3, "יש להזין שם באורך של לפחות 3 תווים ועד 100")
    .max(100, "יש להזין שם באורך של לפחות 3 תווים ועד 100"),
});

interface Props {
  name: string;
  role: string;
  experienceYears: number;
  isEnabled?: boolean;
  linkedinUrl: string;
  email: string;
  id: string;
  onSubmit: (values: any) => void;
}

const VolunteerCard = ({
  name = "",
  role = "",
  experienceYears = 1,
  isEnabled = true,
  linkedinUrl = "",
  email,
  id,
  onSubmit,
}: Props) => {
  const [editMode, setEditMode] = useState(!role);
  console.log("profile link", linkedinUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    // reValidateMode: 'onChange',
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      role,
      experienceYears,
      isEnabled,
      linkedinUrl,
    },
  });

  useEffect(() => {
    if (editMode) {
      form.reset({
        name,
        role,
        experienceYears,
        isEnabled,
        linkedinUrl,
      });
    }
  }, [editMode, form.reset]);

  async function onSubmitClick(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    if (
      name === values.name &&
      role === values.role &&
      experienceYears === values.experienceYears &&
      isEnabled === values.isEnabled &&
      linkedinUrl === values.linkedinUrl
    ) {
      // no changes were made
      // TODO: toast - changes saved sucessfully
      toast.success("השינויים נשמרו בהצלחה");
      setEditMode(false);
      return;
    }
    // TODO: need to check here if the volunteer has an id
    // if so, then use - axious.put (update), else - post (new)
    let updateValuesPromise;
    if (id) {
      updateValuesPromise = axios.put("/api/volunteer", { ...values, id });
    } else {
      updateValuesPromise = axios.post("/api/volunteer", { ...values, email });
    }
    toast.promise(updateValuesPromise, {
      loading: "שומר...",
      success: "השינויים נשמרו בהצלחה",
      error: "חלה שגיאה בשמירה",
    });
    const newID = await updateValuesPromise;
    console.log("newID", newID);
    onSubmit({ ...values, email, id: id ? id : newID.data.id });
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
            <div className="flex flex-col">
              <span className="font-semibold">קישור לפרופיל לינקדאין:</span>
              <a
                // className="text-sm"
                className="text-blue-600 dark:text-blue-500 hover:underline"
                href={`https://${linkedinProfilePrefix}${linkedinUrl}`}
                target="_blank"
              >{`${linkedinProfilePrefix}${linkedinUrl}`}</a>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">אפשר לאחרים למצוא אותך:</span>
              <span className="text-sm">{isEnabled ? "כן" : "לא"}</span>
            </div>
          </div>
        </>
      )}
      {editMode && (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitClick)}
              className="space-y-4"
            >
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
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-base">
                      קישור לפרופיל לינקדאין:
                    </FormLabel>
                    <FormControl>
                      <div className="text-sm flex items-center gap-1 [direction:ltr] ">
                        <div>{linkedinProfilePrefix}</div>
                        <Input {...field} />
                      </div>
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
                <Button variant="outline" onClick={onCancel} disabled={!role}>
                  ביטול
                </Button>
                <Button type="submit">שמור</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default VolunteerCard;
