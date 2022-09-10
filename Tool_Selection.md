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