import React from "react";

type TUserCardProps = {
  username: string;
};
const UserCard = ({ username }: TUserCardProps) => {
  return (
    <div className="px-4 py-2 bg-slate-100 rounded-sm w-full flex gap-x-4 items-center">
      <img
        className="rounded-full"
        src={`https://ui-avatars.com/api/?name=${username}`}
        alt="avatar"
        width={30}
        height={30}
      />
      <h6 className="font-medium">{username}</h6>
    </div>
  );
};

export default UserCard;
