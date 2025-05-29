import {
  LuLayoutDashboard,
  LuWalletMinimal,
  LuLogOut,
  LuCoins,
} from "react-icons/lu";
import { House ,Wallet, CircleDollarSign,LogOut} from "lucide-react";


export const SIDE_MENU_DATA = [
  {
    id:"01",
    label:"Dashboard",
    icon: House,
    path:"/dashboard"
  },
  {
    id:"02",
    label:"Income",
    icon: Wallet,
    path:"/income",
  },
  {
    id:"03",
    label:"Expense",
    icon: CircleDollarSign,
    path:"/expense",
  },
  {
    id:"06",
    label:"Logout",
    icon: LogOut,
    path:"logout",
  },
];