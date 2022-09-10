import { basicSetup } from '@codemirror/basic-setup'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { useMemo } from 'react'
import CodeMirror from 'rodemirror'
import {HighlightStyle, tags as t} from "@codemirror/highlight"

import "./Editor.css"

const chalky = "#e5c07b",
	coral = "#e06c75",
	cyan = "#56b6c2",
	invalid = "#ffffff",
	ivory = "#abb2bf",
	stone = "#7d8799", // Brightened compared to original to increase contrast
	malibu = "#61afef",
	sage = "#98c379",
	whiskey = "#d19a66",
	violet = "#c678dd",
	darkBackground = "#21252b",
	highlightBackground = "#2c313a",
	background = "#282c34",
	tooltipBackground = "#353a42",
	selection = "#3E4451",
	cursor = "#528bff"

// Why can't I write a derived HighlightStyle from OneDark? That seems unhelpful
// Anyway, this is just theme-one-dark's HighlightStyle with larger headings. I'm as upset as you are.
const ModHighlightStyle = HighlightStyle.define([
	{
		tag: t.keyword,
		color: violet
	},
	{
		tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
		color: coral
	},
	{
		tag: [t.function(t.variableName), t.labelName],
		color: malibu
	},
	{
		tag: [t.color, t.constant(t.name), t.standard(t.name)],
		color: whiskey
	},
	{
		tag: [t.definition(t.name), t.separator],
		color: ivory
	},
	{
		tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
		color: chalky
	},
	{
		tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
		color: cyan
	},
	{
		tag: [t.meta, t.comment],
		color: stone
	},
	{
		tag: t.strong,
		fontWeight: "bold"
	},
	{
		tag: t.emphasis,
		fontStyle: "italic"
	},
	{
		tag: t.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: t.link,
		color: stone,
		textDecoration: "underline"
	},
	{ tag: t.heading, fontWeight: "bold", color: coral, "font-size": "85%" },
	{ tag: t.heading1, fontWeight: "bold", color: coral, "font-size": "150%" },
	{ tag: t.heading2, fontWeight: "bold", color: coral, "font-size": "130%" },
	{ tag: t.heading3, fontWeight: "bold", color: coral, "font-size": "120%" },
	{ tag: t.heading4, fontWeight: "bold", color: coral, "font-size": "110%" },
	{ tag: t.heading5, fontWeight: "bold", color: coral, "font-size": "100%" },
	{ tag: t.heading6, fontWeight: "bold", color: coral, "font-size": "90%" },
	{
		tag: [t.atom, t.bool, t.special(t.variableName)],
		color: whiskey
	},
	{
		tag: [t.processingInstruction, t.string, t.inserted],
		color: sage
	},
	{
		tag: t.invalid,
		color: invalid
	},
])




export default function Editor({value, setValue}) {
	console.log("oneDark", oneDark[0])
	const extensions = useMemo(() => [basicSetup, [oneDark[0], ModHighlightStyle], markdown()], [])

	return <CodeMirror
        value={value}
        onUpdate={(v) => {
            if (v.docChanged) {
              setValue(v.state.doc.toString())
            }
          }}
        extensions={extensions}

    />
}