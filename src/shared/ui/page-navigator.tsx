import { FC } from "react";

interface PageNavigationProps {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
}

export const PageNavigation: FC<PageNavigationProps> = ({
    currentPage,
    totalPages,
    goToPage,
}) => {
    return (
        <div className="flex items-center text-lg">
            <span className="flex items-center gap-1">
                <span>Page</span>
                <strong>
                    {currentPage} of {totalPages}
                </strong>
                &nbsp;
            </span>
            <span className="flex items-center gap-1">
                | Go to page:
                <input
                    type="number"
                    min={1}
                    max={totalPages}
                    onChange={(e) => {
                        const page = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                        goToPage(page);
                    }}
                    className="w-16 rounded border px-2 py-1"
                />
            </span>
        </div>
    );
};
