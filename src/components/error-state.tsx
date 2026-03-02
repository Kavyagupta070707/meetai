import { AlertCircleIcon } from "lucide-react";

interface Props{
    title: string;
    description: string;
}

export const ErrorState = ({title, description}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <AlertCircleIcon className="h-8 w-8 text-red-500" />
        <div className="flex flex-col gap-y-6 text-center">

            <h6 className="mt-4 text-gray-500">{title}</h6>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    </div>
    );
}
