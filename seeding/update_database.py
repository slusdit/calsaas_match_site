from slusdlib import aeries, core
import asyncio
from prisma import Prisma
import pandas as pd
from icecream import ic

async def update_teachers():
    pass

async def update_courses():
    pass

async def update_state_auth_codes(db):
    await db.connect()
    data = pd.read_excel('in/coursecodes_to_authorizations.xlsx')
    ic(data)
    for key, row in data.iterrows():
        
        new_row = db.StateCourseAuth.create(
            {

                'courseCode' : row['Course Code'],
                'authType' : row['Auth Type'],
                'docTitle' : row['Document Title'],
                'authTitle' : row['Authorization Title'],
                'authCode' : row['Authorization Code'],
                'subjectCode' : row['Subject Code'],
                'subject' : row['Subject'],
                'notes': row['Notes or Restrictions'],
            }
        )
        ic(f'created auto code entry: {new_row}')

    db.disconnect()

def main(db):
    # update_teachers(db)
    # update_courses(db)
    asyncio.run(update_state_auth_codes(db))

if __name__ == '__main__':
    db = Prisma()
    engine = ''
    main(db)