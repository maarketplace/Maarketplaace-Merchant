

export interface BusinessInfoInterface {
    business_name: string,
    profession: string,
    bio: string,
    image: FileList | null;
    email: string;
    lastName: string;
    firstName: string;
    phoneNumber: string
    password: string;
    confirmPassword?: string;
}