import {
  ClipboardList,
  Home,
  MessageCircle,
  Stethoscope,
} from "lucide-react";

export const MAIN_NAV = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/symptoms", label: "Symptoms", icon: ClipboardList },
  { href: "/dashboard/brief", label: "Doctor brief", icon: Stethoscope },
  { href: "/dashboard/chat", label: "AI assistant", icon: MessageCircle },
] as const;
