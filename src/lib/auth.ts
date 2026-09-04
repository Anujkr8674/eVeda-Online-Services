import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import type { CRMUser, UserRole } from "@/types/crm";

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET ?? "fallback-dev-secret"
);

export const TOKEN_KEY = "crm-token";
const EXPIRY = "7d";

/* ── Dummy credential store (backed by .env) ─────────────────────── */
export function getStaticUsers(): Omit<CRMUser, "createdAt" | "updatedAt">[] {
  return [
    {
      _id: "su_001",
      name: "Super Admin",
      email: process.env.SUPERADMIN_EMAIL ?? "superadmin@evedaonlineservices.com",
      role: "superadmin",
      phone: "+91 9000000001",
      department: "Management",
      isActive: true,
    },
    {
      _id: "adm_001",
      name: "Admin User",
      email: process.env.ADMIN_EMAIL ?? "admin@evedaonlineservices.com",
      role: "admin",
      phone: "+91 9000000002",
      department: "Sales",
      isActive: true,
    },
    {
      _id: "tc_001",
      name: "Rahul Sharma",
      email: process.env.TELECALLER1_EMAIL ?? "telecaller1@evedaonlineservices.com",
      role: "telecaller",
      phone: "+91 9000000003",
      department: "Telecalling",
      isActive: true,
    },
    {
      _id: "tc_002",
      name: "Priya Verma",
      email: process.env.TELECALLER2_EMAIL ?? "telecaller2@evedaonlineservices.com",
      role: "telecaller",
      phone: "+91 9000000004",
      department: "Telecalling",
      isActive: true,
    },
    {
      _id: "dev_001",
      name: "Aarav Mehta",
      email: "developer1@evedaonlineservices.com",
      role: "developer",
      phone: "+91 9000000005",
      department: "Development",
      isActive: true,
    },
    {
      _id: "dev_002",
      name: "Neha Gupta",
      email: "developer2@evedaonlineservices.com",
      role: "developer",
      phone: "+91 9000000006",
      department: "Development",
      isActive: true,
    },
    {
      _id: "dsg_001",
      name: "Karan Malhotra",
      email: "designer@evedaonlineservices.com",
      role: "designer",
      phone: "+91 9000000007",
      department: "UI/UX & Brand Design",
      isActive: true,
    },
    {
      _id: "cld_001",
      name: "Aditya Sen",
      email: "cloud@evedaonlineservices.com",
      role: "cloud_engineer",
      phone: "+91 9000000008",
      department: "Cloud & AI Infrastructure",
      isActive: true,
    },
    {
      _id: "seo_001",
      name: "Rohan Das",
      email: "seo@evedaonlineservices.com",
      role: "seo_expert",
      phone: "+91 9000000009",
      department: "Search Optimization",
      isActive: true,
    },
    {
      _id: "mkt_001",
      name: "Shreya Sen",
      email: "marketing@evedaonlineservices.com",
      role: "marketer",
      phone: "+91 9000000010",
      department: "Growth Campaigns",
      isActive: true,
    },
  ];
}

export function validateCredentials(
  email: string,
  password: string
): Omit<CRMUser, "createdAt" | "updatedAt"> | null {
  const pairs: Record<string, string> = {
    [process.env.SUPERADMIN_EMAIL ?? "superadmin@evedaonlineservices.com"]:
      process.env.SUPERADMIN_PASSWORD ?? "SuperAdmin@123",
    [process.env.ADMIN_EMAIL ?? "admin@evedaonlineservices.com"]:
      process.env.ADMIN_PASSWORD ?? "Admin@123",
    [process.env.TELECALLER1_EMAIL ?? "telecaller1@evedaonlineservices.com"]:
      process.env.TELECALLER1_PASSWORD ?? "Tele@123",
    [process.env.TELECALLER2_EMAIL ?? "telecaller2@evedaonlineservices.com"]:
      process.env.TELECALLER2_PASSWORD ?? "Tele@456",
    ["developer1@evedaonlineservices.com"]: "Dev@123",
    ["developer2@evedaonlineservices.com"]: "Dev@456",
    ["designer@evedaonlineservices.com"]: "Design@123",
    ["cloud@evedaonlineservices.com"]: "Cloud@123",
    ["seo@evedaonlineservices.com"]: "Seo@123",
    ["marketing@evedaonlineservices.com"]: "Marketing@123",
  };

  if (pairs[email.toLowerCase()] !== password) return null;
  const user = getStaticUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  return user ?? null;
}

/* ── JWT helpers ─────────────────────────────────────────────────── */
export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

/* ── Server-side session ────────────────────────────────────────── */
export async function getSession(): Promise<CRMUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_KEY)?.value;
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload || !payload.sub) return null;

    const user = getStaticUsers().find((u) => u._id === payload.sub);
    if (!user) return null;

    return {
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as CRMUser;
  } catch {
    return null;
  }
}

/* ── Role guards ─────────────────────────────────────────────────── */
export function canAccess(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole);
}

export function isAdmin(role: UserRole): boolean {
  return role === "admin" || role === "superadmin";
}

export function isSuperAdmin(role: UserRole): boolean {
  return role === "superadmin";
}
