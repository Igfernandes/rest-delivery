export type UserProps = {
  object_id: string;
  name: string;
  birthdate: Date;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
};

export type UserStatus = 'ACTIVE' | 'INACTIVE'