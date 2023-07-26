import { Role } from 'src/common/decorators/role.enum';

export class User {
  uid: string;
  email: string;
  emailVerified: boolean;
  disabled: boolean;
  roles: Role[];
}
