import { baseIMG } from "@/lib/constants/GlobalURL";
import { UserCardType } from "@/lib/types/sales/shopInfo";
import GlobalSubmitButton from "../buttons/GlobalSubmitButton";

const UserCard = ({ operator, onDisable }: UserCardType) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <img
        src={
          typeof operator.photo === "string"
            ? `${baseIMG}${operator.photo}`
            : "https://via.placeholder.com/100"
        }
        alt="User Avatar"
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h4 className="text-lg font-semibold">
          {operator.first_name} {operator.last_name}
        </h4>
        <p className="text-sm text-gray-600 flex my-1 gap-2 font-bold text-pretty">
          <img className="hover:cursor-pointer" src="/mail_24dp.svg" alt="" />
          {operator.email}
        </p>
        <p className="text-sm text-gray-600 flex my-1 gap-2">
          <img className="hover:cursor-pointer" src="/call_24dp.svg" alt="" />
          {operator.phone_number}
        </p>
      </div>
      <GlobalSubmitButton handleSubmit={() => onDisable(operator.id)}>
        Disable User
      </GlobalSubmitButton>
    </div>
  );
};

export default UserCard;
