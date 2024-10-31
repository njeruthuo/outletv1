import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AddPrompt = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img src="/add_diamond.svg" alt="" className="" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 mt-2 px-4">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem>Add Brand</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Add Category</DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default AddPrompt;
