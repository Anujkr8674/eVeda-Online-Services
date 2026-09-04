"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users2, FileText, Ticket, BarChart3,
  FolderOpen, Megaphone, UserCog, Settings, LogOut,
  ChevronLeft, ChevronRight, Zap, MapPin, PhoneCall, Camera,
  Receipt, CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCRM } from "@/lib/crm-context";
import type { UserRole } from "@/types/crm";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  roles?: UserRole[];
}

const NAV: NavItem[] = [
  { label: "Dashboard",   href: "/dashboard",              icon: LayoutDashboard },
  { label: "Leads",       href: "/dashboard/leads",        icon: Users2,     roles: ["superadmin","admin","telecaller"] },
  { label: "Follow-ups",  href: "/dashboard/followups",    icon: PhoneCall,  roles: ["superadmin","admin","telecaller"] },
  { label: "Quotations",  href: "/dashboard/quotations",   icon: FileText,   roles: ["superadmin","admin","telecaller"] },
  { label: "Invoices",    href: "/dashboard/invoices",     icon: Receipt,    roles: ["superadmin","admin","telecaller"] },
  { label: "Payments",    href: "/dashboard/payments",     icon: CreditCard, roles: ["superadmin","admin","telecaller"] },
  { label: "Tickets",     href: "/dashboard/tickets",      icon: Ticket },
  { label: "Projects",    href: "/dashboard/projects",     icon: FolderOpen, roles: ["superadmin","admin","developer","designer","cloud_engineer","seo_expert","marketer"] },
  { label: "Marketing",   href: "/dashboard/marketing",    icon: Megaphone,  roles: ["superadmin","admin","marketing"] },
  { label: "Field Sales", href: "/dashboard/field-sales",  icon: MapPin,     roles: ["superadmin","admin","field_sales"] },
  { label: "Reports",     href: "/dashboard/reports",      icon: BarChart3,  roles: ["superadmin","admin"] },
  { label: "Users",       href: "/dashboard/users",        icon: UserCog,    roles: ["superadmin","admin"] },
  { label: "Settings",    href: "/dashboard/settings",     icon: Settings,   roles: ["superadmin","admin"] },
];

const WEBSITE_NAV: NavItem[] = [
  { label: "Blogs",       href: "/dashboard/website/blogs",      icon: FileText,   roles: ["superadmin","admin"] },
  { label: "Portfolio",   href: "/dashboard/website/portfolio",  icon: FolderOpen, roles: ["superadmin","admin"] },
  { label: "Team",        href: "/dashboard/website/team",       icon: Users2,     roles: ["superadmin","admin"] },
  { label: "Gallery",     href: "/dashboard/website/gallery",    icon: Camera,     roles: ["superadmin","admin"] },
  { label: "Web Settings",href: "/dashboard/website/settings",   icon: Settings,   roles: ["superadmin","admin"] },
];

const ROLE_LABELS: Record<UserRole, string> = {
  superadmin: "Super Admin", admin: "Admin", telecaller: "Telecaller",
  field_sales: "Field Sales", marketing: "Marketing", developer: "Developer",
  designer: "Designer", cloud_engineer: "Cloud Engineer", seo_expert: "SEO Expert", marketer: "Marketer"
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout } = useCRM();
  const pathname = usePathname();
  const role = user?.role ?? "admin";

  const visibleNav = NAV.filter((item) => !item.roles || item.roles.includes(role));
  const visibleWebsiteNav = WEBSITE_NAV.filter((item) => !item.roles || item.roles.includes(role));
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const active = isActive(item.href);
      return (
        <Link key={item.href} href={item.href}>
          <motion.div
            className={cn(
              "relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 group",
              collapsed && "justify-center px-0 w-10 mx-auto"
            )}
            style={{
              background: active ? "rgba(91,91,214,0.08)" : "transparent",
              color: active ? "var(--crm-primary)" : "var(--crm-text-muted)",
            }}
            whileHover={{
              backgroundColor: active ? "rgba(91,91,214,0.10)" : "var(--crm-surface-hover)",
              x: collapsed ? 0 : 1,
            }}
            transition={{ duration: 0.12 }}
          >
            <item.icon className="w-[17px] h-[17px] shrink-0" strokeWidth={active ? 2.2 : 1.8} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  className="text-[13px] font-medium whitespace-nowrap"
                  style={active ? { color: "var(--crm-primary)" } : { color: "var(--crm-text)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            {active && !collapsed && (
              <motion.div
                layoutId="sidebar-indicator"
                className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full"
                style={{ background: "var(--crm-primary)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            {/* Tooltip when collapsed */}
            {collapsed && (
              <div
                className="absolute left-full ml-3 px-2.5 py-1.5 rounded-md text-[12px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
                style={{
                  background: "var(--crm-text-strong)",
                  color: "#fff",
                  boxShadow: "var(--crm-shadow-lg)",
                }}
              >
                {item.label}
              </div>
            )}
          </motion.div>
        </Link>
      );
    });
  };

  return (
    <motion.aside
      className="fixed left-0 top-0 bottom-0 z-30 flex flex-col select-none"
      style={{
        background: "var(--crm-surface)",
        borderRight: "1px solid var(--crm-border)",
      }}
      animate={{ width: collapsed ? 68 : 244 }}
      transition={{ type: "spring", stiffness: 380, damping: 36 }}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-2.5 px-4 py-4 border-b",
        collapsed && "justify-center px-0"
      )}
      style={{ borderColor: "var(--crm-border-faint)" }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, #5b5bd6 0%, #7c3aed 100%)",
            boxShadow: "0 4px 12px -2px rgba(91,91,214,0.35)",
          }}
        >
          <Zap className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <p className="text-[13px] font-semibold leading-tight" style={{ color: "var(--crm-text-strong)" }}>
                eVeda CRM
              </p>
              <p className="text-[10px] tracking-wider uppercase font-medium" style={{ color: "var(--crm-text-subtle)" }}>
                {ROLE_LABELS[role]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-4">
        <div>
          {!collapsed && (
            <p className="text-[10px] font-semibold tracking-wider uppercase px-3 mb-2 mt-1"
              style={{ color: "var(--crm-text-faint)" }}>
              Workspace
            </p>
          )}
          <div className="space-y-0.5">
            {renderNavItems(visibleNav)}
          </div>
        </div>

        {visibleWebsiteNav.length > 0 && (
          <div>
            {!collapsed && (
              <p className="text-[10px] font-semibold tracking-wider uppercase px-3 mb-2 mt-1"
                style={{ color: "var(--crm-text-faint)" }}>
                Website CMS
              </p>
            )}
            <div className="space-y-0.5">
              {renderNavItems(visibleWebsiteNav)}
            </div>
          </div>
        )}
      </nav>

      {/* User card + collapse + logout */}
      <div className="border-t p-2 space-y-1" style={{ borderColor: "var(--crm-border-faint)" }}>
        <motion.button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-1.5 rounded-lg transition-colors"
          style={{ color: "var(--crm-text-subtle)" }}
          whileHover={{ backgroundColor: "var(--crm-surface-hover)" }}
          whileTap={{ scale: 0.95 }}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </motion.button>

        {!collapsed && user && (
          <div
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg"
            style={{ background: "var(--crm-surface-muted)", border: "1px solid var(--crm-border-faint)" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white shrink-0"
              style={{ background: "linear-gradient(135deg,#5b5bd6,#7c3aed)" }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium truncate" style={{ color: "var(--crm-text)" }}>
                {user.name}
              </p>
              <p className="text-[10px] truncate" style={{ color: "var(--crm-text-subtle)" }}>
                {ROLE_LABELS[user.role]}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors",
            collapsed && "justify-center px-0 w-10 mx-auto"
          )}
          style={{ color: "var(--crm-text-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--crm-danger)";
            e.currentTarget.style.background = "rgba(220,38,38,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--crm-text-muted)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <LogOut className="w-[15px] h-[15px] shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
