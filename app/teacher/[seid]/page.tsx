import { Prisma, PrismaClient } from '@prisma/client';

// import { useState, useEffect } from 'react';

const SectionPage = (seid: string) => {
    const prisma = new PrismaClient()
    return (
        <div>
            <h1>SEID: {seid}</h1>
        <h1>Section Details</h1>

        </div>
    );
};

export default SectionPage;
