import logoSvg from "../../assets/logo.svg";

export const Hero = () => (
  <>
    <div className="flex justify-center mt-31">
      <img src={logoSvg} alt="logo" />
    </div>
    <div className="font-manrope tracking-neg-5 text-[40px] text-[#2F2F2F] text-center capitalize">
      upload your <span className="text-[#8E949D]">files</span>
    </div>
  </>
);
