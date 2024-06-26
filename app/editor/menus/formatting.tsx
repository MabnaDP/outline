import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  BlockQuoteIcon,
  LinkIcon,
  StrikethroughIcon,
  OrderedListIcon,
  BulletedListIcon,
  TodoListIcon,
  InputIcon,
  HighlightIcon,
  CommentIcon,
  ItalicIcon,
  OutdentIcon,
  IndentIcon,
  CopyIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  Heading3Icon,
} from "outline-icons";
import { EditorState } from "prosemirror-state";
import { isInTable } from "prosemirror-tables";
import * as React from "react";
import isAttrActiveOnSelection from "@shared/editor/queries/isAttrActiveOnSelection";
import isInCode from "@shared/editor/queries/isInCode";
import isInList from "@shared/editor/queries/isInList";
import isMarkActive from "@shared/editor/queries/isMarkActive";
import isNodeActive from "@shared/editor/queries/isNodeActive";
import { MenuItem } from "@shared/editor/types";
import { Direction, TextAlign } from "@shared/types";
import LtrIcon from "~/components/Icons/LtrIcon";
import RtlIcon from "~/components/Icons/RtlIcon";
import { Dictionary } from "~/hooks/useDictionary";

export default function formattingMenuItems(
  state: EditorState,
  isTemplate: boolean,
  isMobile: boolean,
  dictionary: Dictionary,
  isCommentEditor?: boolean
): MenuItem[] {
  const { schema } = state;
  const isTable = isInTable(state);
  const isList = isInList(state);
  const isCode = isInCode(state);
  const isCodeBlock = isInCode(state, { onlyBlock: true });
  const allowBlocks = !isTable && !isList;

  return [
    {
      name: "placeholder",
      tooltip: dictionary.placeholder,
      icon: <InputIcon />,
      active: isMarkActive(schema.marks.placeholder),
      visible: isTemplate,
    },
    {
      name: "separator",
      visible: isTemplate,
    },
    {
      name: "strong",
      tooltip: dictionary.strong,
      icon: <BoldIcon />,
      active: isMarkActive(schema.marks.strong),
      visible: !isCode,
    },
    {
      name: "em",
      tooltip: dictionary.em,
      icon: <ItalicIcon />,
      active: isMarkActive(schema.marks.em),
      visible: !isCode,
    },
    {
      name: "strikethrough",
      tooltip: dictionary.strikethrough,
      icon: <StrikethroughIcon />,
      active: isMarkActive(schema.marks.strikethrough),
      visible: !isCode,
    },
    {
      name: "highlight",
      tooltip: dictionary.mark,
      icon: <HighlightIcon />,
      active: isMarkActive(schema.marks.highlight),
      visible: !isTemplate && !isCode,
    },
    {
      name: "code_inline",
      tooltip: dictionary.codeInline,
      icon: <CodeIcon />,
      active: isMarkActive(schema.marks.code_inline),
      visible: !isCodeBlock,
    },
    {
      name: "separator",
      visible: allowBlocks && !isCode,
    },
    {
      name: "heading",
      tooltip: dictionary.heading,
      icon: <Heading1Icon />,
      active: isNodeActive(schema.nodes.heading, { level: 1 }),
      attrs: { level: 1 },
      visible: allowBlocks && !isCode,
    },
    {
      name: "heading",
      tooltip: dictionary.subheading,
      icon: <Heading2Icon />,
      active: isNodeActive(schema.nodes.heading, { level: 2 }),
      attrs: { level: 2 },
      visible: allowBlocks && !isCode,
    },
    {
      name: "heading",
      tooltip: dictionary.subheading,
      icon: <Heading3Icon />,
      active: isNodeActive(schema.nodes.heading, { level: 3 }),
      attrs: { level: 3 },
      visible: allowBlocks && !isCode,
    },
    {
      name: "blockquote",
      tooltip: dictionary.quote,
      icon: <BlockQuoteIcon />,
      active: isNodeActive(schema.nodes.blockquote),
      attrs: { level: 2 },
      visible: allowBlocks && !isCode,
    },
    {
      name: "separator",
    },
    {
      name: "left_to_right",
      tooltip: dictionary.leftToRight,
      icon: <LtrIcon />,
      active: isAttrActiveOnSelection({ attr: Direction.LTR, attrKey: "dir" }),
    },
    {
      name: "right_to_left",
      tooltip: dictionary.rightToLeft,
      icon: <RtlIcon />,
      active: isAttrActiveOnSelection({ attr: Direction.RTL, attrKey: "dir" }),
    },
    {
      name: "separator",
      visible: !isCommentEditor,
    },
    {
      name: "align_left",
      tooltip: dictionary.alignLeft,
      icon: <AlignLeftIcon />,
      visible: !isCommentEditor,
      active: isAttrActiveOnSelection({
        attr: TextAlign.Left,
        attrKey: "textAlign",
      }),
    },
    {
      name: "align_center",
      tooltip: dictionary.alignCenter,
      icon: <AlignCenterIcon />,
      visible: !isCommentEditor,
      active: isAttrActiveOnSelection({
        attr: TextAlign.Center,
        attrKey: "textAlign",
      }),
    },
    {
      name: "align_right",
      tooltip: dictionary.alignRight,
      icon: <AlignRightIcon />,
      visible: !isCommentEditor,
      active: isAttrActiveOnSelection({
        attr: TextAlign.Right,
        attrKey: "textAlign",
      }),
    },
    {
      name: "separator",
      visible: (allowBlocks || isList) && !isCode,
    },
    {
      name: "checkbox_list",
      tooltip: dictionary.checkboxList,
      icon: <TodoListIcon />,
      keywords: "checklist checkbox task",
      active: isNodeActive(schema.nodes.checkbox_list),
      visible: (allowBlocks || isList) && !isCode,
    },
    {
      name: "bullet_list",
      tooltip: dictionary.bulletList,
      icon: <BulletedListIcon />,
      active: isNodeActive(schema.nodes.bullet_list),
      visible: (allowBlocks || isList) && !isCode,
    },
    {
      name: "ordered_list",
      tooltip: dictionary.orderedList,
      icon: <OrderedListIcon />,
      active: isNodeActive(schema.nodes.ordered_list),
      visible: (allowBlocks || isList) && !isCode,
    },
    {
      name: "outdentList",
      tooltip: dictionary.outdent,
      icon: <OutdentIcon />,
      visible: isList && isMobile,
    },
    {
      name: "indentList",
      tooltip: dictionary.indent,
      icon: <IndentIcon />,
      visible: isList && isMobile,
    },
    {
      name: "separator",
      visible: !isCode,
    },
    {
      name: "link",
      tooltip: dictionary.createLink,
      icon: <LinkIcon />,
      active: isMarkActive(schema.marks.link),
      attrs: { href: "" },
      visible: !isCode,
    },
    {
      name: "comment",
      tooltip: dictionary.comment,
      icon: <CommentIcon />,
      label: isCodeBlock ? dictionary.comment : undefined,
      active: isMarkActive(schema.marks.comment),
    },
    {
      name: "separator",
      visible: isCode && !isCodeBlock,
    },
    {
      name: "copyToClipboard",
      icon: <CopyIcon />,
      tooltip: dictionary.copy,
      visible: isCode && !isCodeBlock,
    },
  ];
}
