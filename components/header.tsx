import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const Header: React.FunctionComponent<{ hideLogo?: boolean }> = ({
  hideLogo = false,
}) => {
  const { ref, inView, entry } = useInView();
  return (
    <>
      <div ref={ref} className="absolute top-0 left-0 h-px w-px z-50" />
      <header
        className={`${
          inView ? "" : "shadow-xl"
        } z-40 bg-white sticky top-0 transition-shadow`}
      >
        <div className="mx-auto max-w-screen-md flex items-center">
          <div>
            <Link href="/">
              <a
                className={`p-6 px-4  flex transition-opacity ${
                  hideLogo && inView ? "opacity-0" : "opacity-100"
                }`}
              >
                <Image
                  src="/logo.png"
                  height="32"
                  width="133"
                  layout="intrinsic"
                  alt='Lemon OS'
                />
                {/* <img src='/logo.png' className='h-12'/> */}
              </a>
            </Link>
          </div>
          <div className="flex-1"></div>
          <Link href="/about">
            <a className="flex items-center p-6 font-semibold h-20 hover:bg-gray-100">
              About
            </a>
          </Link>
          <a
            href="https://github.com/LemonOSProject/LemonOS"
            className="flex w-20 h-20 p-6 hover:bg-gray-100"
            title='View on GitHub'
          >
            <img src="/github.svg" alt='GitHub Icon'/>
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
