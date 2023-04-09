export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  hashedPassword?: string;
  sharedEventIds?: string[];
  accounts?: Account[];
  sessions?: Session[];
  initiatedEvents?: Event[];
  sharedEvents?: Event[];
  notes?: Note[];
}

export interface Event {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  brochure_img?: string;
  isPublic?: boolean;
  favorite?: boolean;
  tag?: string;
  date?: Date;
  sharedUserIds?: string[];
  sharedUsers?: User[];
  userId: string;
  user: User;
  notes?: Note[];
  likedIds: string[];
}

export interface Note {
  id: string;
  content: string;
  eventId: string;
  event: Event;
  userId: string;
  user: User;
}

export interface VerificationToken {
  id: string;
  identifier: string;
  token: string;
  expires: Date;
}
