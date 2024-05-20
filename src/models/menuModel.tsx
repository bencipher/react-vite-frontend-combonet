export interface ChildNavigationLink {
  label: string;
  to: string;
}

export interface NavigationLink {
  label: string;
  to: string;
  hasChildren?: boolean;
  children?: ChildNavigationLink[];
}
