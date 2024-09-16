import Container from "./container";
import cn from "classnames";
import { EXAMPLE_PATH } from "../lib/constants";
import { usePathname } from "next/navigation";

type Props = {
  preview?: boolean;
};

export default function Alert({ preview }: Props) {
  const pathname = usePathname();
  const exitPath = `/api/exit-preview?pathName=${pathname}`;

  return (
    <div
      className={cn("border-b", {
        "bg-accent-7 border-accent-7 text-white": preview,
        "bg-accent-1 border-accent-2": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This is a page preview.{" "}
              <a
                href={exitPath}
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                Click here
              </a>{" "}
              to exit preview mode.
            </>
          ) : (
            <>
              Nexusone Created - extened by the vercel{" "}
              <a
                href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
                className="underline hover:text-success duration-200 transition-colors"
              >
                available on GitHub
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
