import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addNewEvent, selectSelDay } from "@/store/daysSlice";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import type { Event } from "@/utils/types";

const schema = z.object({
  description: z.string().nonempty({ error: "Please provide a description" }),
  startTime: z.iso.time({ error: "Invalid time format" }),
  durationMin: z
    .int({ error: "Please provide the duration in minutes" })
    .positive({ error: "The duration must be a positive number" }),
});

type FormFields = z.infer<typeof schema>;

export default function CreateEntry() {
  const selDay = useAppSelector(selectSelDay);
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (!selDay) return;
    const [hours, minutes] = data.startTime.split(":").map((s) => Number(s));
    const newEvent: Event = {
      description: data.description,
      startTimestamp: new Date(selDay.date).setUTCHours(hours, minutes, 0, 0),
      durationMin: data.durationMin,
      //TODO implement tag selection
      tagID: 2,
    };
    dispatch(addNewEvent(newEvent));
    reset();
  };

  const handleCancel = () => {
    reset();
    setIsCreating(false);
  };

  useEffect(handleCancel, [selDay, reset]);

  if (!isCreating) {
    return (
      <div
        onClick={() => {
          setIsCreating(true);
        }}
        className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-sm cursor-pointer min-h-24 content-center font-bold text-xl"
      >
        Create new entry
      </div>
    );
  }

  //TODO add labels
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {...register("description")} placeholder="Description" />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <input
          {...register("startTime")}
          type="time"
          placeholder="Start Time"
        />
        {errors.startTime && (
          <p className="text-red-500">{errors.startTime.message}</p>
        )}
        <input
          {...register("durationMin", { valueAsNumber: true })}
          type="number"
          placeholder="Duration in Minutes"
        />
        {errors.durationMin && (
          <p className="text-red-500">{errors.durationMin.message}</p>
        )}
        <div className="flex flex-row justify-evenly gap-4">
          <Button type="submit">Submit</Button>
          <Button type="danger" action={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
