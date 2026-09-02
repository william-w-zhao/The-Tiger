import TigerWhite from "@/assets/TigerWhite.png";
import Link from "next/link";

function generateRandomTemperature() {
  return Math.floor(Math.random() * (100 - 70) + 70);
}

const Footer = () => {
  return (
    <div>
      <hr className="h-[1.5px] w-full bg-[#000000] mx-auto" />
      <footer className="bg-black">
        <div className="mx-auto py-2 lg:w-4/5">
          <div className="grid items-center gap-3 lg:grid-cols-2">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <Link href="/">
                <img
                  src={TigerWhite.src}
                  alt="Logo"
                  className="h-8 w-auto cursor-pointer"
                />
              </Link>
              <h2 className="px-4 text-base font-medium text-white hover:text-orange-400 transition-colors duration-300 text-center lg:text-left">
                Weather in Princeton: {generateRandomTemperature()}° ☀️ Sunny
              </h2>
            </div>
            <div className="hidden lg:flex items-center justify-end gap-4"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
