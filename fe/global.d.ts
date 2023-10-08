declare module '*.jpeg' {
  const image: any;
  export default image;
}

declare module '*.less' {
  const styles: Record<string, string>;
  export default styles;
}