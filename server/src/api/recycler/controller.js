const prisma = require('../../utils/prisma');

const getPickups = async (req, res, next) => {
    try {
        const { user } = req;

        // Check if the user is a recycler
        if (user.type !== 'RECYCLERS') {
            throw new Error('Only recyclers can view pickups');
        }

        // get recyclerId
        const recycler = await prisma.recycler.findUnique({
            where: {
                userId: user.sys_id
            }
        });
        // Fetch all pickups
        const pickups = await prisma.collectionRequest.findMany({
            where: { recyclerId: recycler.id },
            include: {
                items: {
                    include: {
                        item: true,
                    }
                }
            }
        });

        res.status(200).json({ pickups });
    } catch (err) {
        next({ path: '/recycler/pickups', status: 400, message: err.message, extraData: err });
    }
}

module.exports = {
    getPickups
};
