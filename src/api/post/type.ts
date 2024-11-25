export interface MediaUrls {
  full: string;
  large: string;
  medium: string;
  small: string;
  thumb: string;
}

export interface ProfilePicture {
  id: string;
  url: string;
  width: number | null;
  height: number | null;
  dominantColorHex: string | null;
  dpi: number | null;
  cropHeight: number | null;
  cropWidth: number | null;
  cropX: number;
  cropY: number;
  cropZoom: number;
  urls: MediaUrls;
}

export interface Member {
  displayName: string | null;
  name: string;
  id: string;
  locale: string;
  profilePictureId: string;
  status: string;
  username: string;
  email: string;
  emailStatus: string;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
  profilePicture: ProfilePicture;
}

export interface Owner {
  member: Member;
}

export interface ReactionParticipant {
  id: string;
  name: string;
}

export interface Reaction {
  count: number;
  reacted: boolean;
  reaction: string;
  participants: {
    nodes: Array<{ participant: ReactionParticipant }>;
  };
}

export interface MappingField {
  key: string;
  type: string;
  value: string | null;
}

export interface Field {
  key: string;
  value: string;
  relationEntities: null | unknown; // Adjust as needed based on relation entities
}

export interface CustomSeoDetail {
  description: string | null;
  noIndex: boolean | null;
  thumbnail: string | null;
  thumbnailId: string | null;
  title: string | null;
  canonicalUrl: string | null;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  slug: string;
  type: string;
  layout: string;
  relativeUrl: string;
  url: string;
}

export interface ServerPost {
  id: string;
  slug: string;
  mappingFields: MappingField[];
  fields: Field[];
  subscribersCount: number;
  postTypeId: string;
  reactionsCount: number;
  hasMoreContent: boolean;
  isAnonymous: boolean;
  isHidden: boolean;
  shortContent: string;
  createdAt: string;
  publishedAt: string;
  ownerId: string;
  createdById: string;
  status: string;
  spaceId: string;
  imageIds: string[];
  pinnedInto: string[];
  repliesCount: number;
  totalRepliesCount: number;
  locked: boolean;
  repliedToIds: string[];
  repliedToId: string | null;
  title: string;
  description: string;
  thumbnail: string | null;
  embedIds: string[];
  mentionedMembers: string[];
  primaryReactionType: string;
  lastActivityAt: string;
  language: string;
  customSeoDetail: CustomSeoDetail;
  relativeUrl: string;
  url: string;
  attachments: string[];
  owner: Owner;
  space: Space;
  reactions: Reaction[];
}

export interface Reply {
  id: string;
  content: string;
  createdAt: string;
  owner: Owner;
}

export interface ServerPostList {
  totalCount: number;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  nodes: ServerPost[];
}

export interface Post {
  id: string;
  slug: string;
  mappingFields: MappingField[];
  fields: Field[];
  subscribersCount: number;
  postTypeId: string;
  reactionsCount: number;
  hasMoreContent: boolean;
  isAnonymous: boolean;
  isHidden: boolean;
  shortContent: string;
  createdAt: string;
  publishedAt: string;
  ownerId: string;
  createdById: string;
  status: string;
  spaceId: string;
  imageIds: string[];
  pinnedInto: string[];
  repliesCount: number;
  totalRepliesCount: number;
  locked: boolean;
  repliedToIds: string[];
  repliedToId: string | null;
  title: string;
  description: string;
  thumbnail: string | null;
  embedIds: string[];
  mentionedMembers: string[];
  primaryReactionType: string;
  lastActivityAt: string;
  language: string;
  customSeoDetail: CustomSeoDetail;
  relativeUrl: string;
  url: string;
  attachments: string[];
  owner: Owner;
  space: Space;
  reactions: Reaction[];
}

export interface PostList {
  totalCount: number;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  nodes: ServerPost[];
}