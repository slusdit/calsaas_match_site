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
        - [ ] Back to search button
        - [ ] CRUD for teacher credentials
        - [ ] Add demographics tab or card on top of Teacher Credentials
        - [ ] ?Add credential use counder
        - [x] Add highlighting to matching state auth to credentials
        - [x] Add highlighting to matching state auth row
- [ ] Backend
    - [ ] Build out `School` table
    - [x] Build out base prisma.schema