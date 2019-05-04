declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}
declare module '*.css' {
  const content: {[className: string]: string};
  export = content;
}
declare module "*.png" {
  const content: any;
  export = content;
}
declare module "*.jpg" {
  const content: any;
  export = content;
}
declare module "*.jpeg" {
  const content: any;
  export = content;
}
declare module "*.gif" {
  const content: any;
  export = content;
}
declare module "*.handlebars" {
  const content: (model: any) => string;
  export = content;
}