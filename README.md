# Calsaas Early Warning


## Tests
CLI backend tests found in `/apiTest/` 
run `node fileName.mjs` 

## Notes

Utilizing [shadcn/ui](https://ui.shadcn.com/docs/components)

## TODO

- [ ] Frontend
    - [ ] Teacher List page
        - [ ] Add search / filter ability
        - [ ] Memoize initial data pull
        - [ ] CRUD for teacher demographics
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
- [ ] Backend
    - [ ] Build out `School` table
    - [x] Build out base prisma.schema
    - [ ] API
        - [ ] CRUD for TeacherCredentials
        - [ ] CRUD / update for state auth codes
        - [ ] Import for Teachers & Sections