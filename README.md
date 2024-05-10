# Calsaas Early Warning

[Authorization Sort Table](https://www.ctc.ca.gov/credentials/assignment-resources/authorization-sort-table)

[Appropriate Credentials for CALPADS Course Codes](https://www.ctc.ca.gov/credentials/calsaas-information/appropriate-credentials-for-calpads-course-codes)

[Documents Authorizing Departmentalized Teaching Assignments](https://www.ctc.ca.gov/credentials/assignment-resources/departmentalized-teaching-documents)

Utilizing [shadcn/ui](https://ui.shadcn.com/docs/components)

## Setup

Copy `env.local.example` to `.env.local` and fill out variables

## Tests

CLI backend tests found in `/apiTest/`
run `node fileName.mjs`

## Notes

- Unknown teacher credentials found in Escape:
  - STCB - Standard Secondary Credential?
  - COC - Certificate of Clearence?
  - SA12 - Same as `S12`? 
  - TC13 - Short Term Staff Permit?
  - C8 - Education Authorization? (is this `SC8`?)
  
- Unknown teacher auth codes found in Escape
  - 103
  - S16
  - S12

## Seed Order

- School
- Course
- Auth
- Teacher
- Sections
- Be sure to create `User` entry with `support@slusd.us` in the email before seeding teacher credentials
- Credentials

## TODO

- [ ] Frontend
  - [ ] Add filter
  - [ ] Replace `Loading...` with `<Skeleton />`

- [ ] DataTable
  - [ ] Replace SC col with school logo?

- [ ] Exporter
  - [ ] explode CALSASS Counts to columns
  - [ ] Export to CSV
  - [X] Take in filtered data
  - [X] Export to XLSX

  - [X] Fix `Loading...`
  - [X] Add search bar

  - Highlight Switch
  - [ ] CRUD for teacher demographics
  - [X] Teacher List page
  - [X] Add search / filter ability by school
  - [X] Teacher search
    - [X] SEID
    - [X] lastName
    - [X] firstName
    ~~- [ ] Memoize initial data pull~~
  - [ ] Teacher details page
    - [ ] CRUD for teacher credentials
      - [ ] Update
      - [ ] Delete
      - [X] Add
    - [ ] State Course Code link to State Course page
    - [ ] Add demographics tab or card on top of Teacher Credentials
    - [x] Top level highlighting on course list
    - [x] Add Credential form dialog on Teacher page
    - [x] Back to search button
    - [x] Add highlighting to matching state auth to credentials
    - [x] Add highlighting to matching state auth row
  - [ ] Course Page
    - [ ] `Exempt` switch for course codes, ie 'School Services'
    - [ ] List all course sections with that course code
    - [ ] Link on teacher name via SEID to teacher page
  - [ ] Components
    - [x] Teacher Card fix double line background gap
  - [x] Implement `zod`
  - [X] Auth
    - [X] Role based google auth
      - [X] Basic SLUSD only google auth
- [ ] Backend
  - [ ] API
    - [ ] CRUD for TeacherCredentials
      - [ ] Update
      - [ ] Delete
      - [X] Create
    - [ ] CRUD / update for state auth codes
    - [ ] Import for Teachers & Sections
  - [x] Build out `School` table
    - [x] Linked to `Section`
  - [x] Build out base prisma.schema
- [ ] Security
  - [X] Role based auth client and server side
  - [ ] API security
- [ ] Logic
  - [ ] What are valid combos for course `1000` & `School Service`
  