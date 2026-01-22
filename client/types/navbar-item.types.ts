export interface NavbarItem {
    icon: React.ReactNode;
    label: string;
}

export interface RightNavbarItem {
    href: string;
    label: string;
}

export type NavbarItems = NavbarItem[];
export type RightNavbarItems = RightNavbarItem[];