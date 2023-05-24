export interface HeaderLinkInterface {
  link: string
  text: string
}

export interface HeaderInterface {
  links?: Array<HeaderLinkInterface>;
}