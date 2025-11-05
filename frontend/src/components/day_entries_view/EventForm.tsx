import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addNewEvent,
  selectSelDay,
  updateEvent,
  updateMonth,
} from "@/store/monthSlice";
import {
  Controller,
  useForm,
  type FieldError,
  type SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import type { Event } from "@/utils/types";
import TagSelectList from "../tag_select/TagSelectList";
import { setSelTagId } from "@/store/tagsSlice";

//TODO only single form open

// Helper functions
const durationToEndTime = (startTime: string, durationMin: number): string => {
  if (startTime === "") return "";
  const [startHours, startMinutes] = startTime.split(":");
  const endTime = Number(startHours) * 60 + Number(startMinutes) + durationMin;
  const endHours = Math.floor(endTime / 60);
  const endMinutes = endTime % 60;
  if (endHours >= 24) return "23:59";
  return `${endHours.toString().padStart(2, "0")}:${endMinutes
    .toString()
    .padStart(2, "0")}`;
};

const endTimeToDuration = (startTime: string, endTime: string): number => {
  if (startTime === "" || endTime === "") return 0;
  const [startHours, startMinutes] = startTime.split(":");
  const [endHours, endMinutes] = endTime.split(":");
  const durationMin =
    Number(endHours) * 60 +
    Number(endMinutes) -
    (Number(startHours) * 60 + Number(startMinutes));
  return durationMin > 0 ? durationMin : 0;
};

// Form schema
const schema = z.object({
  description: z.string().nonempty({ error: "Please provide a description" }),
  startTime: z.iso.time({ error: "Define a start time" }),
  endTime: z.iso.time({ error: "Define an end time" }),
  durationMin: z
    .number({ error: "Invalid input type" })
    .int({ error: "Invalid number type" })
    .positive({ error: "Provide a valid duration" }),
  tagId: z.number({ error: "Please select a tag" }),
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

  // Default states for controlled inputs
  const defaultStartTime: string | "" = defaultEvent
    ? new Date(defaultEvent.startTimestamp).toISOString().substring(11, 16)
    : "";
  const defaultEndTime: string | "" = durationToEndTime(
    defaultStartTime,
    defaultEvent?.durationMin || 0
  );
  const defaultDurationMin: number | undefined =
    defaultEvent?.durationMin || undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
    clearErrors,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: defaultEvent?.description ?? "",
      startTime: defaultStartTime,
      endTime: defaultEndTime,
      durationMin: defaultDurationMin,
    },
  });

  useEffect(() => {
    dispatch(setSelTagId(defaultEvent?.tagID || null));
    clearErrors();
  }, []);

  // Watch inputs
  const startTime = watch("startTime", defaultStartTime);
  const endTime = watch("endTime", defaultEndTime);
  const durationMin = watch("durationMin", defaultDurationMin);

  // // Controlled input states
  const [useDuration, setUseDuration] = useState(false);

  useEffect(() => {
    if (useDuration) {
      setValue("endTime", durationToEndTime(startTime, durationMin), {
        shouldValidate: true,
      });
    } else if (endTime !== "") {
      setValue("durationMin", endTimeToDuration(startTime, endTime), {
        shouldValidate: true,
      });
    }
  }, [startTime, endTime, durationMin]);

  const handleCancel = () => {
    if (closeFn) closeFn();
    reset();
    clearErrors();
  };

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

    handleCancel();
  };

  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
        noValidate
      >
        <div className="flex flex-col">
          <label htmlFor="">Description</label>
          <input
            className="border-2 px-2 rounded-sm"
            {...register("description")}
            defaultValue={defaultEvent?.description}
          />
          <Err field={errors.description} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Start time</label>
          <input
            className="border-2 px-2 rounded-sm"
            {...register("startTime")}
            type="time"
          />
          <Err field={errors.startTime} />
        </div>
        <div>
          <div hidden={useDuration} className="flex flex-col">
            <label htmlFor="">End time</label>
            <input
              className="border-2 px-2 rounded-sm"
              {...register("endTime")}
              type="time"
            />
            <Err field={errors.endTime} />
          </div>
          <div hidden={!useDuration} className="flex flex-col">
            <label htmlFor="">Duration in minutes</label>
            <input
              className="border-2 px-2 rounded-sm"
              {...register("durationMin", { valueAsNumber: true })}
              type="number"
            />
          </div>
          <Err field={errors.durationMin} />
        </div>
        <span>
          <input
            type="checkbox"
            checked={useDuration}
            onChange={(e) => setUseDuration(e.target.checked)}
          />
          <span className="pl-2">Use duration</span>
        </span>

        <Controller
          name="tagId"
          control={control}
          defaultValue={defaultEvent?.tagID}
          render={({ field }) => (
            <>
              <TagSelectList {...field} />
              <Err field={errors.tagId} />
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

const Err = ({ field }: { field?: FieldError }) => {
  return field && <div className="text-red-500 text-sm">{field?.message}</div>;
};

export default CreateEntry;
