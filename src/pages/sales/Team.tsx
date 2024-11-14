import { UserCard } from "@/components/reusable";
import { TeamProps } from "@/lib/types/sales/shopInfo";

const Team = ({ branch_name, team }: TeamProps) => {
  /**
   * This Tab is going to show the employees responsible for the selected shop
   * and how to disable, delete or create some.
   */

  console.log(branch_name);
  console.log(team);

  function handleDisableUser() {}

  return (
    <section style={{ width: "668px", height: "375px" }}>
      <h3 className="font-bold ">Team {branch_name}</h3>

      {team?.map((operator, index: number) => {
        return (
          <UserCard
            key={index}
            operator={operator}
            onDisable={handleDisableUser}
          />
        );
      })}
    </section>
  );
};
export default Team;
