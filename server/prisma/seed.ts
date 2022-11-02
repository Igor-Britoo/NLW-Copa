import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data:{
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/Igor212.png'
        }
    })

    const pool = await prisma.pool.create({
        data:{
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create:{
                    userId: user.id
                }
            }
        }
    })

    const game1 = await prisma.game.create({
        data:{
            date:'2022-11-02T12:00:00.339Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })

    const game2 = await prisma.game.create({
        data:{
            date:'2022-11-05T12:00:00.339Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR',

            guesses:{
                create:{
                    firstTeamPoints: 0,
                    secondTeamPoints: 2,

                    participant: {
                        connect:{
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
            
        }
    })



}

main()