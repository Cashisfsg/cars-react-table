import { ReactNode } from "react";
import { forwardRef, useRef, useImperativeHandle } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    title: string;
    children: ReactNode;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
    ({ title, children, ...props }, ref) => {
        const dialogRef = useRef<HTMLDialogElement>(null);

        useImperativeHandle(
            ref,
            () => dialogRef.current as HTMLDialogElement,
            []
        );

        const closeModal = () => {
            if (dialogRef.current) dialogRef.current.close();
        };

        return (
            <dialog
                {...props}
                ref={dialogRef}
                className="min-w-[576px] rounded-xl p-5 shadow-xl"
            >
                <h4 className="flex justify-between border-b-4 border-double pb-4 text-2xl font-semibold">
                    {title}
                    <button
                        onClick={closeModal}
                        className="aspect-square w-8 rounded-full align-top hover:bg-neutral-200"
                    >
                        <IoMdClose className="m-auto block" />
                    </button>
                </h4>
                <section className="pt-4">{children}</section>
            </dialog>
        );
    }
);
