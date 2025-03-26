import Image from "next/image";

type UserCardProps = {
  userName: string;
};

const UserCard = ({ userName }: UserCardProps) => {
  return (
    <div className="card-border">
      <div className="card-content">
        <Image
          src={"/user-avatar.jpg"}
          alt="user avatar"
          width={540}
          height={540}
          className="rounded-full object-cover size-[120px]"
        />
        <h3>{userName}</h3>
      </div>
    </div>
  );
};

export default UserCard;
