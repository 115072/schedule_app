import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addNewEvent,
  selectSelDay,
  updateEvent,
  updateMonth,
} from "@/store/daysSlice";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import type { Event } from "@/utils/types";
import TagSelectList from "../tag_select/TagSelectList";
import { setSelTagId } from "@/store/tagsSlice";

const schema = z.object({
  description: z.string().nonempty({ error: "Please provide a description" }),
  startTime: z.iso.time({ error: "Invalid time format" }),
  durationMin: z
    .int({ error: "Please provide the duration in minutes" })
    .positive({ error: "The duration must be a positive number" }),
  tagId: z
    .number({ error: "Please select a tag" })
    .nonoptional({ error: "Please select a tag" }),
});

type FormFields = z.infer<typeof schema>;

const CreateEntry = ({
  defaultEvent = null,
  closeFn = null,
}: {
  defaultEvent?: Event | null;
  closeFn?: CallableFunction | null;
}) => {
  const selDay = useAppSelector(selectSelDay);
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(defaultEvent ? true : false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (!selDay) return;
    const [hours, minutes] = data.startTime.split(":").map((s) => Number(s));
    const newEvent: Event = {
      id: defaultEvent?.id,
      description: data.description,
      startTimestamp: new Date(selDay.date).setUTCHours(hours, minutes, 0, 0),
      durationMin: data.durationMin,
      tagID: data.tagId,
    };
    if (!defaultEvent)
      dispatch(addNewEvent(newEvent)).then(() => dispatch(updateMonth()));
    else dispatch(updateEvent(newEvent)).then(() => dispatch(updateMonth()));
    dispatch(setSelTagId(null));

    if (closeFn) closeFn();
    reset();
    if (!defaultEvent) setIsCreating(false);

    console.log("onSubmit ran");
  };

  const handleCancel = () => {
    if (closeFn) closeFn();
    reset();
    if (!defaultEvent) setIsCreating(false);
  };

  useEffect(handleCancel, [selDay?.date, reset]);

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
        <input
          className="border-2 px-2 rounded-sm"
          {...register("description")}
          placeholder="Description"
          defaultValue={defaultEvent?.description}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <input
          className="border-2 px-2 rounded-sm"
          {...register("startTime")}
          type="time"
          placeholder="Start Time"
          defaultValue={
            defaultEvent
              ? new Date(defaultEvent.startTimestamp)
                  .toISOString()
                  .substring(11, 16)
              : undefined
          }
        />
        {errors.startTime && (
          <p className="text-red-500">{errors.startTime.message}</p>
        )}
        <input
          className="border-2 px-2 rounded-sm"
          {...register("durationMin", { valueAsNumber: true })}
          type="number"
          placeholder="Duration in Minutes"
          defaultValue={defaultEvent?.durationMin}
        />
        {errors.durationMin && (
          <p className="text-red-500">{errors.durationMin.message}</p>
        )}
        <Controller
          name="tagId"
          control={control}
          defaultValue={defaultEvent?.tagID}
          render={({ field }) => (
            <>
              <TagSelectList {...field} />
              {errors.tagId && (
                <p className="text-red-500">{errors.tagId.message}</p>
              )}
            </>
          )}
        />
        <div className="flex flex-row justify-evenly gap-4">
          <Button type="submit">Submit</Button>
          <Button type="danger" action={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEntry;
