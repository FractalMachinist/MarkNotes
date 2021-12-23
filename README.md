# What is MarkNotes?
MarkNotes is a project for displaying the historical content of reused headers in a semi-formatted Markdown journal setting.

## What are the success criteria?
- [ ] Write and edit a Markdown entry
- [ ] Live-display formatted Markdown (in-editor or beside-editor)
- [ ] Live-display matching historical headers next to more recent ones
- [ ] Parse and Save the Markdown Entry to the DB, to be included as historical later

### What does 'Matching' mean?
Given some header of Markdown:
- [ ] Provide exact last-n-level header matches


### What does 'Live-display headers' mean?
- [ ] Show the relevant heading trail
- [ ] Show the immediate body text exclusive to that heading
- [ ] Hint to the sub-headers which were used
- [ ] Ensure that text is always chronologically ordered with the right of the screen heading into the past

## What are some future features?
- [ ] Text Searching
    - For matching on features other than header
- [ ] Provide predictive Autofill
    - [ ] Pre-suggest common sub-headings in response to a heading
    - [ ] Suggest common heading completions by semantic similarity

# Requirements
## Database
- [ ] MUST be able to automatically persist to disk

### Data Model
#### Matching Requirements
- [ ] Given a heading-sequence R, get all DB entries where their heading-sequences end-intersect with R; ordered by submission date
- [ ] (Future) Given a heading-sequence R, get likely headings which go below R

#### Content Requirements
- [ ] Having matched an entry E, get it's immediate body text
- [ ] Having matched an entry E, get all its sub-headings

#### Proposed 'Schema'
- MDBlob
    - [String]: Header Sequence
        - Indexed
        - NOT unique
    - [ID]: MongoDB child IDs
    - Date: Date Submitted
        - Indexed
        - Sortable!
    - String: MD Text
        - Preferably searchable
### Candidate DBs
- ~~RedisJSON~~
    - RedisJSON tied MongoDB on every feature mentioned here.
    - However, in the longest term, MongoDB has better support for RBAC and ACL and SSL, so if this project gets a public server, MongoDB is a slightly more useful choice.
- MongoDB


## Browser
### Editing
- Editable Text Field
- Display live MD

### Live Context
- Pull historical content
- Display next to new content

### Saving
- Divide into MDBlobs
- Write to DB
- Reset state