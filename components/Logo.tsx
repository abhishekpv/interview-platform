import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-row gap-2 justify-center">
      <Image src={"./logo.svg"} alt="logo" height={32} width={38} />
      <h2 className="text-primary-100">InterVox</h2>
    </div>
  );
};

export default Logo;
