import {
  ClipboardList,
  Home,
  MessageCircle,
  Stethoscope,
} from "lucide-react";

export const MAIN_NAV = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/symptoms", label: "Symptoms", icon: ClipboardList },
  { href: "/brief", label: "Doctor brief", icon: Stethoscope },
  { href: "/chat", label: "AI assistant", icon: MessageCircle },
] as const;
