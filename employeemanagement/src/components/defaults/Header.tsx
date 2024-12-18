import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "./Header.css";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
const Header = () => {
  return (
    <div className="header-container">
      <div className="profile-section">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="profile-info">
          <h1 className="heading pl-3">Welcome Back!</h1>
        </div>
      </div>
      <div className="flex flex-row gap-x-3">
        <Button
          type="button"
          variant="outline"
          className="border-white w-[40px]"
        >
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Header;
