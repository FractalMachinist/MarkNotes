# What is MarkNotes?
MarkNotes is a project for displaying the historical content of reused headers in a semi-formatted Markdown journal setting. This repo is a public portfolio presentation of MarkNotes, not prepared for or supporting general use.

MarkNotes gets displayed as a themed&highlighted Markdown editor (currently using CodeMirror). As headings get added to the markdown entry in progress, those headings are searched for in the MongoDB database and previous content under those headings are displayed next to the editor.

## What are the success criteria?
- [x] Write and edit a Markdown entry
- [x] Live-display formatted Markdown (in-editor or beside-editor)
- [x] Live-display matching historical headers next to more recent ones
- [x] Parse and Save the Markdown Entry to the DB, to be included as historical later.
- [x] Interact with the UI only by typing the notes entry and scrolling - no menus, selections, etc.

### What does 'Matching' mean?
Given some header of Markdown:
- [x] Provide exact last-n-level header matches


### What does 'Live-display headers' mean?
- [x] Show the relevant heading trail
- [x] Show the immediate body text exclusive to that heading
- [x] Hint to the sub-headers which were used
- [x] Ensure that text is always chronologically ordered with the right of the screen heading into the past

## What are some future features?
- [ ] Text Searching
    - For matching on features other than header
- [ ] Provide predictive Autofill
    - [ ] Pre-suggest common sub-headings in response to a heading
    - [ ] Suggest common heading completions by semantic similarity