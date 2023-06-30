import { useMemo, FC, ReactElement } from "react";
// import { useFetch } from "shared/api/useFetch";
import { useFetch } from "../../../shared";
import { Car } from "../types";

interface FetchCarsProps {
    uri: string;
    renderSuccess: (data: Car[]) => ReactElement;
    loadingFallback?: ReactElement;
    renderError?: (error: string) => ReactElement;
}

export const FetchCars: FC<FetchCarsProps> = ({
    uri,
    renderSuccess,
    loadingFallback = <p>Loading...</p>,
    renderError = (error: string) => <pre>{error}</pre>,
}) => {
    const { data, error, status } = useFetch<Car[]>(uri);

    const memoizedData = useMemo(() => data, [data]);

    if (status === "pending") return loadingFallback;
    if (status === "rejected") return renderError(error || "");
    if (status === "fulfilled" && memoizedData)
        return renderSuccess(memoizedData);

    return <></>;
};

export default FetchCars;
