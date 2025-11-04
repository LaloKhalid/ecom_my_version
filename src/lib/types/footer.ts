export type UpTo3<T> = [] | [T] | [T, T] | [T, T, T];

export type SubLogoKind = 'text' | 'email' | 'phone';

export interface SubLogoItem {
   type: SubLogoKind;
   content: string;
}

export interface NavItem {
   title: string;
   link: string;
}

export interface NavGroup {
   title: string;
   items: readonly NavItem[];
}

export interface NewsletterConfig {
   title: string;
   description: string;
   placeholder: string;
   button: string;
}

export interface FooterConfig {
   brandName: string;              
   year?: string | number;
   subLogoList: UpTo3<SubLogoItem>;
   navGroups: UpTo3<NavGroup>;
   newsLetter: NewsletterConfig;
}