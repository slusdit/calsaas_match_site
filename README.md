# Calsaas Early Warning

Copy `env.local.example` to `.env.local` and fill out variables

## Tests

CLI backend tests found in `/apiTest/` 
run `node fileName.mjs` 

## Notes

Utilizing [shadcn/ui](https://ui.shadcn.com/docs/components)

## Seed Order

- School
- Course
- Auth
- Teacher
- Sections
- Credentials

## TODO

- [ ] Frontend
  - [ ] Teacher List page
    - [ ] Implement `zod`
    - [ ] CRUD for teacher demographics
    - [X] Add search / filter ability by school
    - [X] Teacher search
      - [X] SEID
      - [X] lastName
      - [X] firstName
    ~~- [ ] Memoize initial data pull~~
  - [ ] Teacher details page
    - [ ] CRUD for teacher credentials
    - [ ] State Course Code link to State Course page
    - [ ] Top level highlighting on course list
    - [ ] Add demographics tab or card on top of Teacher Credentials
    - [ ] ?Add credential use counter
    - [x] Back to search button
    - [x] Add highlighting to matching state auth to credentials
    - [x] Add highlighting to matching state auth row
  - [ ] State Course Page
    - [ ] List all course sections with that course code
    - [ ] Link on teacher name via SEID to teacher page
  - [ ] Components
    - [ ] Teacher Card fix double line background gap
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
