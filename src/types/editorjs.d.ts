declare module '@editorjs/header' {
  import { BlockTool, BlockToolConstructable } from '@editorjs/editorjs';
  const Header: BlockToolConstructable;
  export default Header;
}

declare module '@editorjs/list' {
  import { BlockToolConstructable } from '@editorjs/editorjs';
  const List: BlockToolConstructable;
  export default List;
}

declare module '@editorjs/paragraph' {
  import { BlockToolConstructable } from '@editorjs/editorjs';
  const Paragraph: BlockToolConstructable;
  export default Paragraph;
}

declare module '@editorjs/image' {
  import { BlockToolConstructable } from '@editorjs/editorjs';
  const Image: BlockToolConstructable;
  export default Image;
}

declare module '@editorjs/quote' {
  import { BlockToolConstructable } from '@editorjs/editorjs';
  const Quote: BlockToolConstructable;
  export default Quote;
}

declare module '@editorjs/delimiter' {
  import { BlockToolConstructable } from '@editorjs/editorjs';
  const Delimiter: BlockToolConstructable;
  export default Delimiter;
}

declare module '@editorjs/embed' {
  import { BlockToolConstructable } from '@editorjs/editorjs';
  const Embed: BlockToolConstructable;
  export default Embed;
}
